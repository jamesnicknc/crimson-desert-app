"""
News scraper - pulls patch notes, announcements, and gaming news.
Sources: Pearl Abyss official site, PCGamer, etc.
"""

from bs4 import BeautifulSoup
from .base import BaseScraper
from config import TARGETS


class NewsScraper(BaseScraper):
    async def scrape(self) -> list[dict]:
        items = []

        for source in TARGETS['news']:
            print(f"  Scraping news: {source['name']}")
            page = await self._get_page()

            if not await self._safe_navigate(page, source['url']):
                await page.close()
                continue

            html = await page.content()
            soup = BeautifulSoup(html, 'lxml')

            # Find articles/news items
            selector = source.get('selector', 'article')
            articles = soup.select(selector)[:20]  # Cap at 20 articles

            for article in articles:
                # Extract title
                title_el = article.find(['h1', 'h2', 'h3', 'h4', 'a'])
                if not title_el:
                    continue
                title = title_el.get_text(strip=True)
                if not title or len(title) < 5:
                    continue

                # Extract link
                link_el = article.find('a', href=True)
                link = link_el['href'] if link_el else ''
                if link and not link.startswith('http'):
                    # Make relative URLs absolute
                    from urllib.parse import urljoin
                    link = urljoin(source['url'], link)

                # Extract date if available
                date_el = article.find(['time', '.date', '.timestamp', 'span'])
                date_text = ''
                if date_el:
                    date_text = date_el.get('datetime', '') or date_el.get_text(strip=True)

                # Extract summary/snippet
                summary_el = article.find(['p', '.summary', '.excerpt', '.description'])
                summary = summary_el.get_text(strip=True) if summary_el else ''

                items.append({
                    'title': title[:200],
                    'content': summary[:2000],
                    'url': link,
                    'metadata': {
                        'source': source['name'],
                        'date': date_text,
                        'type': 'news',
                    },
                })

            # If we got article links, optionally fetch full content from top articles
            top_items = [i for i in items[-5:] if i['url']]
            for item in top_items[:3]:
                try:
                    if await self._safe_navigate(page, item['url'], timeout=15000):
                        article_html = await page.content()
                        article_soup = BeautifulSoup(article_html, 'lxml')

                        # Try to find main article body
                        body = (
                            article_soup.find('article') or
                            article_soup.find('div', class_='article-body') or
                            article_soup.find('div', class_='entry-content')
                        )
                        if body:
                            paragraphs = body.find_all('p')
                            full_text = '\n\n'.join(p.get_text(strip=True) for p in paragraphs)
                            if full_text:
                                item['content'] = full_text[:5000]
                except Exception as e:
                    print(f"    Could not fetch full article: {e}")

            await page.close()

        await self._cleanup()
        return items
