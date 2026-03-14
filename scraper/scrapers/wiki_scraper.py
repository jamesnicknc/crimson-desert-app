"""
Wiki scraper - pulls game data from Fextralife, Game8, and other wiki sources.
Extracts structured info about bosses, weapons, skills, items, locations.
"""

from bs4 import BeautifulSoup
from .base import BaseScraper
from config import TARGETS


class WikiScraper(BaseScraper):
    async def scrape(self) -> list[dict]:
        items = []

        for wiki in TARGETS['wiki']:
            print(f"  Scraping wiki: {wiki['name']}")
            page = await self._get_page()

            for subpage in wiki.get('pages', []):
                url = wiki['url'].rstrip('/') + subpage
                print(f"    -> {url}")

                if not await self._safe_navigate(page, url):
                    continue

                # Get page HTML and parse with BeautifulSoup
                html = await page.content()
                soup = BeautifulSoup(html, 'lxml')

                # Extract main content area
                content_area = (
                    soup.find('div', class_='wiki-content') or
                    soup.find('div', id='wiki-content-block') or
                    soup.find('main') or
                    soup.find('article') or
                    soup.find('div', class_='entry-content')
                )

                if not content_area:
                    print(f"    No content found on {subpage}")
                    continue

                # Extract section headings and their content
                headings = content_area.find_all(['h2', 'h3'])
                if headings:
                    for heading in headings:
                        section_content = []
                        sibling = heading.find_next_sibling()
                        while sibling and sibling.name not in ['h2', 'h3']:
                            text = sibling.get_text(strip=True)
                            if text:
                                section_content.append(text)
                            sibling = sibling.find_next_sibling()

                        if section_content:
                            items.append({
                                'title': f"{subpage.strip('/')} - {heading.get_text(strip=True)}",
                                'content': '\n'.join(section_content)[:5000],
                                'url': url,
                                'metadata': {
                                    'wiki': wiki['name'],
                                    'page': subpage,
                                    'section': heading.get_text(strip=True),
                                },
                            })
                else:
                    # No headings, grab all text
                    full_text = content_area.get_text(separator='\n', strip=True)
                    if full_text:
                        items.append({
                            'title': subpage.strip('/').replace('+', ' '),
                            'content': full_text[:5000],
                            'url': url,
                            'metadata': {'wiki': wiki['name'], 'page': subpage},
                        })

                # Also extract any tables (common in wikis for stats)
                tables = content_area.find_all('table')
                for table in tables:
                    rows = table.find_all('tr')
                    if len(rows) < 2:
                        continue

                    headers = [th.get_text(strip=True) for th in rows[0].find_all(['th', 'td'])]
                    table_data = []
                    for row in rows[1:]:
                        cells = [td.get_text(strip=True) for td in row.find_all('td')]
                        if cells:
                            table_data.append(dict(zip(headers, cells)))

                    if table_data:
                        items.append({
                            'title': f"{subpage.strip('/')} - Data Table",
                            'content': str(table_data)[:5000],
                            'url': url,
                            'metadata': {
                                'wiki': wiki['name'],
                                'type': 'table',
                                'headers': headers,
                                'row_count': len(table_data),
                            },
                        })

            await page.close()

        await self._cleanup()
        return items
