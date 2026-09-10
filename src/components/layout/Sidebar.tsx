'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  X,
  Compass,
  Map,
  Bot,
  Crosshair,
  Shield,
  Package,
  ClipboardList,
  GitBranch,
  Wrench,
  Rocket,
  Store,
  BookOpen,
  Layers,
  Share2,
  Users2,
  StickyNote,
  Coffee,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { createClient } from '@/lib/supabase/client';

interface NavSection {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: string;
  }[];
}

const navSections: NavSection[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <Compass className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Raid',
    items: [
      { label: 'Raid Maps', href: '/maps', icon: <Map className="w-5 h-5" /> },
      { label: 'ARC Bestiary', href: '/arc', icon: <Bot className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Arsenal',
    items: [
      { label: 'Weapons', href: '/weapons', icon: <Crosshair className="w-5 h-5" /> },
      { label: 'Gear & Gadgets', href: '/gear', icon: <Shield className="w-5 h-5" /> },
      { label: 'Items & Materials', href: '/items', icon: <Package className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Progression',
    items: [
      { label: 'Quests', href: '/quests', icon: <ClipboardList className="w-5 h-5" /> },
      { label: 'Skill Tree', href: '/skills', icon: <GitBranch className="w-5 h-5" /> },
      { label: 'Workshop', href: '/workshop', icon: <Wrench className="w-5 h-5" /> },
      { label: 'Expeditions', href: '/expeditions', icon: <Rocket className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Speranza',
    items: [
      { label: 'Traders', href: '/traders', icon: <Store className="w-5 h-5" /> },
      { label: 'New Raider Guide', href: '/guide', icon: <BookOpen className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Squad',
    items: [
      { label: 'Loadout Planner', href: '/planner', icon: <Layers className="w-5 h-5" /> },
      { label: 'Shared Loadouts', href: '/builds', icon: <Share2 className="w-5 h-5" /> },
      { label: 'Squad', href: '/group', icon: <Users2 className="w-5 h-5" /> },
      { label: 'Notes', href: '/notes', icon: <StickyNote className="w-5 h-5" /> },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isActive = (href: string): boolean => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-arc-card border border-arc-border p-2 rounded-lg text-rust-300 hover:bg-arc-card-hover"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-60 bg-arc-secondary border-r border-arc-border z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto flex flex-col`}
      >
        {/* Logo section */}
        <div className="p-6 border-b border-arc-border">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <div className="cursor-pointer flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg border-2 border-rust-400 flex items-center justify-center relative">
                <div className="w-5 h-5 rounded-full border-2 border-signal-400 border-dashed" />
                <div className="absolute w-1.5 h-1.5 rounded-full bg-rust-300" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-rust-300 leading-tight tracking-wide">
                  ARC RAIDERS
                </h1>
                <p className="text-[11px] text-gray-400 font-display uppercase tracking-widest">Companion</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 px-4 py-6">
          {navSections.map((section) => (
            <div key={section.label} className="mb-6">
              <h3 className="text-xs font-display font-semibold text-signal-400 uppercase tracking-widest mb-2 px-2">
                {section.label}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <li key={item.href}>
                      <Link href={item.href} onClick={() => setIsOpen(false)}>
                        <div
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                            active
                              ? 'bg-arc-card border-l-4 border-rust-400 text-rust-300'
                              : 'text-gray-300 hover:bg-arc-card hover:text-rust-300'
                          }`}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto text-[10px] font-semibold text-signal-300 bg-signal-400/10 px-1.5 py-0.5 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Support section */}
        <div className="border-t border-arc-border p-4 pb-2">
          <a
            href="https://buymeacoffee.com/crimsoncompanion"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-display font-semibold rounded-lg transition-all duration-200 bg-gradient-to-r from-rust-700/20 to-rust-900/20 hover:from-rust-700/30 hover:to-rust-900/30 border border-rust-600/30 hover:border-rust-500/50 text-rust-300 hover:text-rust-200"
          >
            <Coffee className="w-4 h-4" />
            Buy Me a Coffee
          </a>
        </div>

        {/* Footer section */}
        <div className="border-t border-arc-border/50 p-4">
          {userLoading ? (
            <div className="h-16 flex items-center justify-center text-gray-500 text-sm">Loading...</div>
          ) : user ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                {user.user_metadata?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.user_metadata.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rust-400 to-rust-600 flex items-center justify-center text-xs font-bold text-black">
                    {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'R').toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-rust-300 truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Raider'}
                  </p>
                  <p className="text-xs text-gray-400">Signed in</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full px-3 py-2 text-sm bg-arc-card hover:bg-arc-card-hover border border-arc-border text-gray-300 rounded-lg transition-colors duration-200 font-display flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">Sign in to save progress</p>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full px-3 py-2 text-sm bg-rust-500 hover:bg-rust-400 text-black font-semibold rounded-lg transition-colors duration-200 font-display flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
