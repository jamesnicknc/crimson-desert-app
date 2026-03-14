"""
Scraper configuration and target URLs.
"""
import os
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv('NEXT_PUBLIC_SUPABASE_URL', '')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY', '')

# Scrape targets
TARGETS = {
    'wiki': [
        {
            'name': 'Fextralife Wiki',
            'url': 'https://crimsondesert.wiki.fextralife.com/Crimson+Desert+Wiki',
            'pages': [
                '/Bosses', '/Weapons', '/Skills', '/Armor', '/Items',
                '/Quests', '/NPCs', '/Locations', '/Crafting',
            ],
        },
        {
            'name': 'Game8 Guide',
            'url': 'https://game8.co/games/Crimson-Desert',
            'pages': ['/wiki/walkthrough', '/wiki/boss-guide', '/wiki/weapons'],
        },
    ],
    'news': [
        {
            'name': 'Pearl Abyss Official',
            'url': 'https://crimsondesert.pearlabyss.com/en-US/News',
            'selector': 'article, .news-item, .post-item',
        },
        {
            'name': 'PCGamer',
            'url': 'https://www.pcgamer.com/search/?searchTerm=crimson+desert',
            'selector': 'article, .search-result',
        },
    ],
    'guide': [
        {
            'name': 'Reddit Guides',
            'url': 'https://www.reddit.com/r/CrimsonDesert/top/?t=week',
            'selector': 'article, [data-testid="post-container"]',
        },
        {
            'name': 'Steam Guides',
            'url': 'https://steamcommunity.com/app/3321460/guides/',
            'selector': '.workshopBrowseItems .workshopItem',
        },
    ],
    'map': [
        {
            'name': 'MapGenie',
            'url': 'https://mapgenie.io/crimson-desert',
            'selector': '.location-marker, .map-marker',
        },
    ],
}

# How often to scrape (in hours)
SCRAPE_INTERVAL_HOURS = 6

# Max content length per scraped item (chars)
MAX_CONTENT_LENGTH = 5000
