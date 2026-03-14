"""
Community guide scraper - pulls tips, strategies, and builds from Reddit and Steam.
"""

from bs4 import BeautifulSoup
from .base import BaseScraper
from config import TARGETS


class GuideScraper(BaseScraper):
    async def scrape(self) -> list[dict]:
        items = []

        for source in TARGETS['guide']:
            print(f"  Scraping guides: {source['name']}")
            page = await self._get_page()

            if not await self._safe_navigate(page, source['url']):
                await page.close()
                continue

            # Handle Reddit's dynamic loading
            if 'reddit' in source['url']:
                items.extend(await self._scrape_reddit(page, source))
            elif 'steam' in source['url']:
                items.extend(await self._scrape_steam(page, source))
            else:
                # Generic extraction
                extracted = await self._extract_text(page, source.get('selector', 'article'))
                for e in extracted:
                    e['metadata'] = {'source': source['name'], 'type': 'guide'}
                items.extend(extracted)

            await page.close()

        await self._cleanup()
        return items

    async def _scrape_reddit(self, page, source: dict) -> list[dict]:
        """Scrape Reddit posts with Playwright (handles dynamic rendering)."""
        items = []

        # Wait for posts to load
        await page.wait_for_timeout(3000)

        # Scroll to load more posts
        for _ in range(3):
            await page.evaluate('window.scrollBy(0, window.innerHeight)')
            await page.wait_for_timeout(1000)

        html = await page.content()
        soup = BeautifulSoup(html, 'lxml')

        # Find post containers
        posts = soup.find_all('article', limit=25) or \
                soup.find_all('div', attrs={'data-testid': 'post-container'}, limit=25) or \
                soup.find_all('div', class_='Post', limit=25)

        for post in posts:
            # Title
            title_el = post.find(['h1', 'h2', 'h3', 'a'])
            if not title_el:
                continue
            title = title_el.get_text(strip=True)
            if not title or len(title) < 10:
                continue

            # Link
            link_el = post.find('a', href=True)
            link = ''
            if link_el:
                href = link_el.get('href', '')
                if '/comments/' in href:
                    link = f"https://www.reddit.com{href}" if href.startswith('/') else href

            # Score/upvotes
            score_el = post.find('span', attrs={'data-testid': 'score'}) or \
                       post.find('div', class_='score')
            score = score_el.get_text(strip=True) if score_el else '0'

            # Content preview
            body_el = post.find('div', attrs={'data-testid': 'post-rtjson-content'}) or \
                      post.find('div', class_='md')
            content = body_el.get_text(strip=True)[:2000] if body_el else ''

            # Flair/tag
            flair_el = post.find('span', class_='flair') or \
                       post.find('span', attrs={'data-testid': 'flair'})
            flair = flair_el.get_text(strip=True) if flair_el else ''

            items.append({
                'title': title[:200],
                'content': content,
                'url': link,
                'metadata': {
                    'source': 'Reddit',
                    'type': 'guide',
                    'score': score,
                    'flair': flair,
                },
            })

        return items

    async def _scrape_steam(self, page, source: dict) -> list[dict]:
        """Scrape Steam community guides."""
        items = []

        html = await page.content()
        soup = BeautifulSoup(html, 'lxml')

        guides = soup.select('.workshopItem, .workshopBrowseItem')[:20]

        for guide in guides:
            title_el = guide.find('div', class_='workshopItemTitle') or guide.find('a')
            if not title_el:
                continue
            title = title_el.get_text(strip=True)

            link_el = guide.find('a', href=True)
            link = link_el['href'] if link_el else ''

            # Rating
            rating_el = guide.find('div', class_='fileRating')
            rating = rating_el.get_text(strip=True) if rating_el else ''

            items.append({
                'title': title[:200],
                'content': '',  # Would need to navigate to each guide for full content
                'url': link,
                'metadata': {
                    'source': 'Steam Guides',
                    'type': 'guide',
                    'rating': rating,
                },
            })

        return items
