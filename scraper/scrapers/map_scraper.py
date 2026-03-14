"""
Map data scraper - pulls collectible locations and POI coordinates
from community map projects like MapGenie.
"""

import json
from bs4 import BeautifulSoup
from .base import BaseScraper
from config import TARGETS


class MapScraper(BaseScraper):
    async def scrape(self) -> list[dict]:
        items = []

        for source in TARGETS['map']:
            print(f"  Scraping map data: {source['name']}")
            page = await self._get_page()

            # Re-enable image loading for maps (need tile info)
            await page.unroute('**/*.{png,jpg,jpeg,gif,svg,mp4,webm,woff,woff2}')

            if not await self._safe_navigate(page, source['url'], timeout=45000):
                await page.close()
                continue

            # Wait for map to fully load
            await page.wait_for_timeout(5000)

            # Try to intercept API calls that contain location data
            # Many interactive map sites load data via JSON APIs
            api_items = await self._intercept_api_data(page)
            if api_items:
                items.extend(api_items)
                print(f"    Found {len(api_items)} locations from API data")
            else:
                # Fallback: scrape visible markers from DOM
                dom_items = await self._scrape_dom_markers(page, source)
                items.extend(dom_items)
                print(f"    Found {len(dom_items)} locations from DOM")

            await page.close()

        await self._cleanup()
        return items

    async def _intercept_api_data(self, page) -> list[dict]:
        """Try to extract location data from network requests."""
        items = []

        # Check for data embedded in page scripts
        scripts = await page.evaluate('''() => {
            const data = [];
            // Look for common patterns in interactive map apps
            if (window.__NEXT_DATA__) data.push(JSON.stringify(window.__NEXT_DATA__));
            if (window.__INITIAL_STATE__) data.push(JSON.stringify(window.__INITIAL_STATE__));
            if (window.mapData) data.push(JSON.stringify(window.mapData));
            if (window.locations) data.push(JSON.stringify(window.locations));

            // Check script tags for JSON data
            document.querySelectorAll('script[type="application/json"]').forEach(s => {
                data.push(s.textContent);
            });

            return data;
        }''')

        for script_data in scripts:
            try:
                parsed = json.loads(script_data)
                locations = self._extract_locations_from_json(parsed)
                items.extend(locations)
            except (json.JSONDecodeError, Exception):
                continue

        return items

    def _extract_locations_from_json(self, data, path='') -> list[dict]:
        """Recursively search JSON for location-like data."""
        items = []

        if isinstance(data, dict):
            # Check if this dict looks like a location
            has_coords = ('lat' in data and 'lng' in data) or \
                         ('x' in data and 'y' in data) or \
                         ('latitude' in data and 'longitude' in data)
            has_name = 'name' in data or 'title' in data or 'label' in data

            if has_coords and has_name:
                lat = data.get('lat') or data.get('latitude') or data.get('y', 0)
                lng = data.get('lng') or data.get('longitude') or data.get('x', 0)
                name = data.get('name') or data.get('title') or data.get('label', 'Unknown')
                category = data.get('category') or data.get('type') or data.get('group', 'poi')

                items.append({
                    'title': str(name)[:200],
                    'content': data.get('description', ''),
                    'url': '',
                    'metadata': {
                        'type': 'map_location',
                        'lat': float(lat) if lat else 0,
                        'lng': float(lng) if lng else 0,
                        'category': str(category),
                        'raw': {k: str(v)[:100] for k, v in data.items()
                                if k not in ('lat', 'lng', 'latitude', 'longitude', 'x', 'y')},
                    },
                })

            # Recurse into nested dicts
            for key, value in data.items():
                items.extend(self._extract_locations_from_json(value, f'{path}.{key}'))

        elif isinstance(data, list):
            for i, item in enumerate(data):
                items.extend(self._extract_locations_from_json(item, f'{path}[{i}]'))

        return items

    async def _scrape_dom_markers(self, page, source: dict) -> list[dict]:
        """Fallback: extract marker info from DOM elements."""
        items = []

        selector = source.get('selector', '.marker, .location-marker')

        try:
            markers = await page.query_selector_all(selector)

            for marker in markers[:200]:  # Cap at 200 markers
                # Try to get data attributes
                data = await page.evaluate('''(el) => ({
                    title: el.getAttribute('title') || el.getAttribute('aria-label') || el.textContent?.trim() || '',
                    lat: el.getAttribute('data-lat') || el.style?.top || '',
                    lng: el.getAttribute('data-lng') || el.style?.left || '',
                    category: el.getAttribute('data-category') || el.className || '',
                })''', marker)

                if data['title']:
                    items.append({
                        'title': data['title'][:200],
                        'content': '',
                        'url': source['url'],
                        'metadata': {
                            'type': 'map_location',
                            'lat': data['lat'],
                            'lng': data['lng'],
                            'category': data['category'],
                            'source': source['name'],
                        },
                    })
        except Exception as e:
            print(f"    DOM marker extraction error: {e}")

        return items
