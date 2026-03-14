"""
Base scraper class with shared Playwright logic.
"""

import asyncio
from abc import ABC, abstractmethod
from playwright.async_api import async_playwright, Page, Browser


class BaseScraper(ABC):
    """Base class for all scrapers. Handles Playwright browser lifecycle."""

    def __init__(self):
        self.browser: Browser | None = None

    async def _get_browser(self) -> Browser:
        """Launch or return existing browser instance."""
        if not self.browser:
            pw = await async_playwright().start()
            self.browser = await pw.chromium.launch(
                headless=True,
                args=['--no-sandbox', '--disable-setuid-sandbox']
            )
        return self.browser

    async def _get_page(self) -> Page:
        """Create a new page with common settings."""
        browser = await self._get_browser()
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent=(
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                'AppleWebKit/537.36 (KHTML, like Gecko) '
                'Chrome/120.0.0.0 Safari/537.36'
            ),
        )
        page = await context.new_page()
        # Block images and media for speed
        await page.route('**/*.{png,jpg,jpeg,gif,svg,mp4,webm,woff,woff2}',
                         lambda route: route.abort())
        return page

    async def _safe_navigate(self, page: Page, url: str, timeout: int = 30000) -> bool:
        """Navigate to URL with error handling."""
        try:
            await page.goto(url, wait_until='domcontentloaded', timeout=timeout)
            await page.wait_for_timeout(2000)  # Let JS render
            return True
        except Exception as e:
            print(f"    Navigation failed for {url}: {e}")
            return False

    async def _extract_text(self, page: Page, selector: str) -> list[dict]:
        """Extract text content from matching elements."""
        items = []
        try:
            elements = await page.query_selector_all(selector)
            for el in elements:
                title = await el.query_selector('h1, h2, h3, h4, a, .title, .name')
                title_text = await title.inner_text() if title else ''

                content = await el.inner_text()

                link = await el.query_selector('a')
                href = await link.get_attribute('href') if link else ''

                if title_text.strip():
                    items.append({
                        'title': title_text.strip()[:200],
                        'content': content.strip()[:5000],
                        'url': href or '',
                    })
        except Exception as e:
            print(f"    Extraction error: {e}")
        return items

    async def _cleanup(self):
        """Close browser."""
        if self.browser:
            await self.browser.close()
            self.browser = None

    @abstractmethod
    async def scrape(self) -> list[dict]:
        """Run the scraper. Must be implemented by subclasses."""
        ...
