"""
Crimson Desert Companion - Web Scraper
Scrapes wikis, news, community guides, and map data using Playwright.
Stores results in Supabase for the dashboard to consume.

Usage:
  python main.py              # Run all scrapers once
  python main.py --schedule   # Run on a recurring schedule
  python main.py --source wiki  # Run specific source only
"""

import argparse
import asyncio
import json
import sys
import time
from datetime import datetime, timedelta, timezone

from scrapers import WikiScraper, NewsScraper, GuideScraper, MapScraper
from storage import SupabaseStorage
from config import SCRAPE_INTERVAL_HOURS


async def run_all(source_filter: str | None = None):
    """Run all scrapers and store results."""
    storage = SupabaseStorage()
    scrapers = {
        'wiki': WikiScraper,
        'news': NewsScraper,
        'guide': GuideScraper,
        'map': MapScraper,
    }

    if source_filter:
        scrapers = {k: v for k, v in scrapers.items() if k == source_filter}

    print(f"\n{'='*60}")
    print(f"  CRIMSON DESERT SCRAPER - {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"{'='*60}\n")

    total_items = 0

    for source_name, ScraperClass in scrapers.items():
        print(f"\n--- Scraping: {source_name.upper()} ---")
        scraper = ScraperClass()
        try:
            items = await scraper.scrape()
            print(f"  Found {len(items)} items from {source_name}")

            # Store in Supabase
            stored = storage.store_items(source_name, items)
            print(f"  Stored {stored} items in database")
            total_items += stored

        except Exception as e:
            print(f"  ERROR scraping {source_name}: {e}")

    # Clean up expired content
    cleaned = storage.clean_expired()
    print(f"\nCleaned {cleaned} expired entries")
    print(f"\nTotal: {total_items} items scraped and stored")
    print(f"{'='*60}\n")


def run_scheduled():
    """Run scrapers on a schedule using the schedule library."""
    import schedule as sched

    print(f"Starting scheduled scraper (every {SCRAPE_INTERVAL_HOURS} hours)")
    print("Press Ctrl+C to stop\n")

    # Run immediately on start
    asyncio.run(run_all())

    # Schedule recurring runs
    sched.every(SCRAPE_INTERVAL_HOURS).hours.do(
        lambda: asyncio.run(run_all())
    )

    while True:
        sched.run_pending()
        time.sleep(60)


def main():
    parser = argparse.ArgumentParser(description='Crimson Desert Companion Scraper')
    parser.add_argument('--schedule', action='store_true', help='Run on recurring schedule')
    parser.add_argument('--source', type=str, choices=['wiki', 'news', 'guide', 'map'],
                        help='Run specific source only')
    args = parser.parse_args()

    if args.schedule:
        run_scheduled()
    else:
        asyncio.run(run_all(args.source))


if __name__ == '__main__':
    main()
