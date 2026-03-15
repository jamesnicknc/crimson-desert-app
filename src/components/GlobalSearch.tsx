'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import {
  BOSSES,
  WEAPONS,
  SKILLS,
  COLLECTIBLES,
  QUESTS,
  REGIONS,
  MOUNTS,
  RECIPES,
  ACTIVITIES,
  CAMP_FACILITIES,
  getAllCollectiblesWithKeys,
} from '@/lib/game-data';

interface SearchResult {
  name: string;
  category: string;
  href: string;
}

interface GroupedResults {
  [category: string]: {
    results: SearchResult[];
    total: number;
  };
}

const MAX_PER_CATEGORY = 5;

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Build a flat searchable index once
  const searchIndex = useMemo(() => {
    const items: SearchResult[] = [];

    BOSSES.forEach((b) => {
      items.push({ name: b.name, category: 'Boss', href: '/bestiary' });
    });

    WEAPONS.forEach((w) => {
      items.push({ name: w.name, category: 'Weapon', href: '/weapons' });
    });

    SKILLS.forEach((s) => {
      items.push({ name: s.name, category: 'Skill', href: '/skills' });
    });

    const allCollectibles = getAllCollectiblesWithKeys();
    allCollectibles.forEach(({ item }) => {
      items.push({ name: item.name, category: 'Collectible', href: '/collectibles' });
    });

    QUESTS.forEach((q) => {
      items.push({ name: q.name, category: 'Quest', href: '/quests' });
    });

    REGIONS.forEach((r) => {
      items.push({ name: r.name, category: 'Region', href: '/map' });
    });

    MOUNTS.forEach((m) => {
      items.push({ name: m.name, category: 'Mount', href: '/mounts' });
    });

    RECIPES.forEach((r) => {
      items.push({ name: r.name, category: 'Recipe', href: '/crafting' });
    });

    ACTIVITIES.forEach((a) => {
      items.push({ name: a.name, category: 'Activity', href: '/camp' });
    });

    CAMP_FACILITIES.forEach((f) => {
      items.push({ name: f.name, category: 'Camp Facility', href: '/camp' });
    });

    // Builds & Planner
    items.push({ name: 'Shared Builds', category: 'Build', href: '/builds' });
    items.push({ name: 'Top Rated Builds', category: 'Build', href: '/builds' });
    items.push({ name: 'My Builds', category: 'Build', href: '/builds' });
    items.push({ name: 'Group Builds', category: 'Build', href: '/builds' });
    items.push({ name: 'Build Planner', category: 'Build', href: '/planner' });

    // Pages (quick navigation)
    items.push({ name: 'New Player Guide', category: 'Page', href: '/guide' });
    items.push({ name: 'Greymane Camp', category: 'Page', href: '/camp' });
    items.push({ name: 'World Map', category: 'Page', href: '/map' });
    items.push({ name: 'Quest Log', category: 'Page', href: '/quests' });
    items.push({ name: 'Bestiary', category: 'Page', href: '/bestiary' });
    items.push({ name: 'Collectibles', category: 'Page', href: '/collectibles' });
    items.push({ name: 'Crafting Recipes', category: 'Page', href: '/crafting' });
    items.push({ name: 'Skill Trees', category: 'Page', href: '/skills' });
    items.push({ name: 'Characters', category: 'Page', href: '/characters' });
    items.push({ name: 'Notes', category: 'Page', href: '/notes' });
    items.push({ name: 'Inventory', category: 'Page', href: '/inventory' });
    items.push({ name: 'Group', category: 'Page', href: '/group' });

    return items;
  }, []);

  // Filter results based on query
  const groupedResults = useMemo<GroupedResults>(() => {
    if (!query.trim()) return {};

    const lowerQuery = query.toLowerCase();
    const groups: GroupedResults = {};

    searchIndex.forEach((item) => {
      if (!item.name.toLowerCase().includes(lowerQuery)) return;

      if (!groups[item.category]) {
        groups[item.category] = { results: [], total: 0 };
      }

      groups[item.category].total += 1;

      if (groups[item.category].results.length < MAX_PER_CATEGORY) {
        groups[item.category].results.push(item);
      }
    });

    return groups;
  }, [query, searchIndex]);

  const totalResults = useMemo(() => {
    return Object.values(groupedResults).reduce((sum, g) => sum + g.total, 0);
  }, [groupedResults]);

  const hasResults = Object.keys(groupedResults).length > 0;

  // Open the search bar
  const openSearch = useCallback(() => {
    setIsOpen(true);
    // Focus input on next tick after render
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  // Close the search bar and reset
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Keyboard: Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSearch]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeSearch]);

  // Collapsed: just the search button
  if (!isOpen) {
    return (
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-4 py-2 bg-pywel-card/50 hover:bg-pywel-card border border-pywel-border rounded-lg text-gold-300 hover:text-gold-200 transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-cinzel">Search</span>
      </button>
    );
  }

  // Expanded: overlay with search input + results
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Search container */}
      <div
        ref={containerRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-6"
      >
        <div className="max-w-2xl mx-auto">
          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bosses, weapons, skills, builds, quests..."
              className="w-full pl-12 pr-12 py-3 bg-pywel-card border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:border-gold-400 focus:outline-none font-crimson text-base"
            />
            <button
              onClick={closeSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gold-300 transition-colors"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results dropdown */}
          {query.trim() && (
            <div className="mt-2 bg-pywel-card border border-pywel-border rounded-lg max-h-[70vh] overflow-y-auto">
              {hasResults ? (
                <div className="p-3">
                  {/* Summary */}
                  <p className="text-xs text-gray-500 mb-3 px-1">
                    {totalResults} result{totalResults !== 1 ? 's' : ''} found
                  </p>

                  {/* Grouped results */}
                  {Object.entries(groupedResults).map(([category, group]) => (
                    <div key={category} className="mb-4 last:mb-0">
                      <h3 className="text-xs font-cinzel font-semibold text-gold-400 uppercase tracking-wider px-1 mb-2">
                        {category}
                        {group.total > MAX_PER_CATEGORY && (
                          <span className="text-gray-500 font-crimson normal-case tracking-normal ml-2">
                            ({group.total} total)
                          </span>
                        )}
                      </h3>
                      <ul className="space-y-0.5">
                        {group.results.map((result, idx) => (
                          <li key={`${result.name}-${idx}`}>
                            <Link
                              href={result.href}
                              onClick={closeSearch}
                              className="block px-3 py-2 rounded-md text-sm text-gray-200 hover:text-gold-300 hover:bg-pywel-bg/50 transition-colors"
                            >
                              {result.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <p className="text-sm text-gray-500">
                    No results for &quot;{query}&quot;
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
