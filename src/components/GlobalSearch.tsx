'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import {
  WEAPONS,
  ENEMIES,
  MAPS,
  QUESTS,
  ITEMS,
  SKILLS,
  WORKSHOP_STATIONS,
  TRADERS,
  EXPEDITION_PROJECTS,
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

  const searchIndex = useMemo(() => {
    const items: SearchResult[] = [];

    WEAPONS.forEach((w) => items.push({ name: w.name, category: 'Weapon', href: `/weapons?q=${encodeURIComponent(w.name)}` }));
    ENEMIES.forEach((e) => items.push({ name: e.name, category: 'ARC', href: `/arc?q=${encodeURIComponent(e.name)}` }));
    MAPS.forEach((m) => {
      items.push({ name: m.name, category: 'Map', href: `/maps/${m.slug}` });
      m.pois.forEach((p) => items.push({ name: `${p.name} (${m.name})`, category: 'Location', href: `/maps/${m.slug}?poi=${p.id}` }));
    });
    QUESTS.forEach((q) => items.push({ name: q.name, category: 'Quest', href: `/quests?q=${encodeURIComponent(q.name)}` }));
    ITEMS.forEach((i) => items.push({ name: i.name, category: 'Item', href: `/items?q=${encodeURIComponent(i.name)}` }));
    SKILLS.forEach((s) => items.push({ name: s.name, category: 'Skill', href: '/skills' }));
    WORKSHOP_STATIONS.forEach((s) => items.push({ name: s.name, category: 'Workshop', href: '/workshop' }));
    TRADERS.forEach((t) => items.push({ name: t.name, category: 'Trader', href: '/traders' }));
    EXPEDITION_PROJECTS.forEach((p) => items.push({ name: p.name, category: 'Expedition', href: '/expeditions' }));

    const pages: [string, string][] = [
      ['New Raider Guide', '/guide'],
      ['Loadout Planner', '/planner'],
      ['Shared Loadouts', '/builds'],
      ['Squad', '/group'],
      ['Notes', '/notes'],
      ['Gear & Gadgets', '/gear'],
      ['Skill Tree', '/skills'],
      ['Workshop', '/workshop'],
      ['Expeditions', '/expeditions'],
    ];
    pages.forEach(([name, href]) => items.push({ name, category: 'Page', href }));

    return items;
  }, []);

  const groupedResults = useMemo<GroupedResults>(() => {
    if (!query.trim()) return {};
    const lowerQuery = query.toLowerCase();
    const groups: GroupedResults = {};

    searchIndex.forEach((item) => {
      if (!item.name.toLowerCase().includes(lowerQuery)) return;
      if (!groups[item.category]) groups[item.category] = { results: [], total: 0 };
      groups[item.category].total += 1;
      if (groups[item.category].results.length < MAX_PER_CATEGORY) {
        groups[item.category].results.push(item);
      }
    });

    return groups;
  }, [query, searchIndex]);

  const totalResults = useMemo(
    () => Object.values(groupedResults).reduce((sum, g) => sum + g.total, 0),
    [groupedResults]
  );

  const hasResults = Object.keys(groupedResults).length > 0;

  const openSearch = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, []);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeSearch();
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) closeSearch();
        else openSearch();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeSearch, openSearch]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeSearch]);

  const go = (href: string) => {
    closeSearch();
    router.push(href);
  };

  if (!isOpen) {
    return (
      <button
        onClick={openSearch}
        className="flex items-center gap-2 px-4 py-2 bg-arc-card/50 hover:bg-arc-card border border-arc-border rounded-lg text-rust-300 hover:text-rust-200 transition-colors"
        aria-label="Open search"
      >
        <Search className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-display">Search</span>
        <kbd className="hidden lg:inline text-[10px] text-gray-500 border border-arc-border rounded px-1">Ctrl K</kbd>
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" />
      <div ref={containerRef} className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search weapons, ARC, maps, quests, items..."
              className="w-full pl-12 pr-12 py-3 bg-arc-card border border-arc-border rounded-lg text-gray-100 placeholder-gray-500 focus:border-rust-400 focus:outline-none text-base"
            />
            <button
              onClick={closeSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-300"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {query.trim() && (
            <div className="mt-2 bg-arc-card border border-arc-border rounded-lg max-h-[60vh] overflow-y-auto shadow-2xl">
              {hasResults ? (
                <>
                  {Object.entries(groupedResults).map(([category, group]) => (
                    <div key={category} className="border-b border-arc-border last:border-b-0">
                      <div className="px-4 py-2 text-xs font-display uppercase tracking-wider text-signal-400 bg-arc-secondary/60">
                        {category} <span className="text-gray-600">({group.total})</span>
                      </div>
                      {group.results.map((r) => (
                        <button
                          key={`${r.category}-${r.name}`}
                          onClick={() => go(r.href)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-arc-card-hover hover:text-rust-300"
                        >
                          {r.name}
                        </button>
                      ))}
                    </div>
                  ))}
                  <div className="px-4 py-2 text-xs text-gray-500">{totalResults} results</div>
                </>
              ) : (
                <div className="px-4 py-6 text-center text-sm text-gray-500">No results for &ldquo;{query}&rdquo;</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
