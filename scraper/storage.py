"""
Supabase storage layer for scraped content.
"""

from datetime import datetime, timedelta, timezone
from supabase import create_client
from config import SUPABASE_URL, SUPABASE_KEY, MAX_CONTENT_LENGTH


class SupabaseStorage:
    def __init__(self):
        if not SUPABASE_URL or not SUPABASE_KEY:
            print("WARNING: Supabase credentials not configured. Running in dry-run mode.")
            self.client = None
        else:
            self.client = create_client(SUPABASE_URL, SUPABASE_KEY)

    def store_items(self, source: str, items: list[dict]) -> int:
        """Store scraped items in the scraped_content table."""
        if not self.client:
            print(f"  [DRY RUN] Would store {len(items)} items for source '{source}'")
            for item in items[:3]:
                print(f"    - {item.get('title', 'Untitled')}")
            return len(items)

        stored = 0
        for item in items:
            try:
                # Truncate content if needed
                content = item.get('content', '')
                if len(content) > MAX_CONTENT_LENGTH:
                    content = content[:MAX_CONTENT_LENGTH] + '...'

                row = {
                    'source': source,
                    'source_url': item.get('url', ''),
                    'title': item.get('title', 'Untitled'),
                    'content': content,
                    'metadata': item.get('metadata', {}),
                    'scraped_at': datetime.now(timezone.utc).isoformat(),
                    'expires_at': (datetime.now(timezone.utc) + timedelta(hours=24)).isoformat(),
                }

                # Upsert based on source + url to avoid duplicates
                self.client.table('scraped_content').upsert(
                    row,
                    on_conflict='source,source_url'
                ).execute()
                stored += 1

            except Exception as e:
                print(f"    Error storing item '{item.get('title', '?')}': {e}")

        return stored

    def clean_expired(self) -> int:
        """Remove expired scraped content."""
        if not self.client:
            return 0

        try:
            now = datetime.now(timezone.utc).isoformat()
            result = self.client.table('scraped_content') \
                .delete() \
                .lt('expires_at', now) \
                .execute()
            return len(result.data) if result.data else 0
        except Exception as e:
            print(f"Error cleaning expired content: {e}")
            return 0

    def get_items(self, source: str | None = None, limit: int = 50) -> list[dict]:
        """Retrieve stored items (useful for testing)."""
        if not self.client:
            return []

        query = self.client.table('scraped_content').select('*')
        if source:
            query = query.eq('source', source)
        result = query.order('scraped_at', desc=True).limit(limit).execute()
        return result.data or []
