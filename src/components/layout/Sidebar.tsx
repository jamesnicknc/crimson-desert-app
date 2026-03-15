'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Menu,
  X,
  Compass,
  Globe,
  Users,
  TreePine,
  Sparkles,
  Scroll,
  Sword,
  Skull,
  Hammer,
  Package,
  BookOpen,
  Users2,
  Wrench,
  Share2,
  Coffee,
  LogIn,
  LogOut,
  Footprints,
  Tent,
  HelpCircle,
} from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { createClient } from '@/lib/supabase/client';

interface NavSection {
  label: string;
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
    comingSoon?: boolean;
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
    label: 'World',
    items: [
      { label: 'World Map', href: '/map', icon: <Globe className="w-5 h-5" />, comingSoon: true },
      { label: 'Characters', href: '/characters', icon: <Users className="w-5 h-5" /> },
      { label: 'Mounts', href: '/mounts', icon: <Footprints className="w-5 h-5" /> },
      { label: 'Greymane Camp', href: '/camp', icon: <Tent className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Progress',
    items: [
      { label: 'Skill Trees', href: '/skills', icon: <TreePine className="w-5 h-5" /> },
      { label: 'Collectibles', href: '/collectibles', icon: <Sparkles className="w-5 h-5" /> },
      { label: 'Quest Log', href: '/quests', icon: <Scroll className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Guides',
    items: [
      { label: 'New Player Guide', href: '/guide', icon: <HelpCircle className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Combat',
    items: [
      { label: 'Bestiary', href: '/bestiary', icon: <Skull className="w-5 h-5" /> },
      { label: 'Weapons', href: '/weapons', icon: <Sword className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Resources',
    items: [
      { label: 'Crafting', href: '/crafting', icon: <Hammer className="w-5 h-5" /> },
      { label: 'Inventory', href: '/inventory', icon: <Package className="w-5 h-5" />, comingSoon: true },
      { label: 'Notes', href: '/notes', icon: <BookOpen className="w-5 h-5" /> },
    ],
  },
  {
    label: 'Social',
    items: [
      { label: 'Group', href: '/group', icon: <Users2 className="w-5 h-5" />, comingSoon: true },
      { label: 'Build Planner', href: '/planner', icon: <Wrench className="w-5 h-5" /> },
      { label: 'Shared Builds', href: '/builds', icon: <Share2 className="w-5 h-5" /> },
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
        className="fixed top-4 left-4 z-50 md:hidden bg-pywel-card border border-pywel-border p-2 rounded-lg text-gold-300 hover:bg-pywel-card-hover"
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
        className={`fixed left-0 top-0 h-screen w-60 bg-pywel-secondary border-r border-pywel-border z-40 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto`}
      >
        {/* Logo section */}
        <div className="p-6 border-b border-pywel-border">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            <div className="cursor-pointer">
              <h1 className="font-cinzel text-2xl font-bold text-gold-300 mb-1">
                CRIMSON
                <br />
                DESERT
              </h1>
              <p className="text-xs text-gray-400 font-cinzel">Companion Dashboard</p>
            </div>
          </Link>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 px-4 py-6">
          {navSections.map((section) => (
            <div key={section.label} className="mb-8">
              <h3 className="text-sm font-cinzel font-semibold text-gold-300 uppercase tracking-wider mb-3 px-2">
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
                              ? 'bg-pywel-card border-l-4 border-gold-400 text-gold-300'
                              : 'text-gray-300 hover:bg-pywel-card hover:text-gold-300'
                          }`}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                          {item.comingSoon && (
                            <span className="ml-auto text-[10px] font-semibold text-gold-400/70 bg-gold-400/10 px-1.5 py-0.5 rounded">
                              Soon
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
        <div className="border-t border-pywel-border p-4 pb-2">
          <a
            href="https://buymeacoffee.com/crimsoncompanion"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-cinzel font-semibold rounded-lg transition-all duration-200 bg-gradient-to-r from-amber-700/20 to-amber-900/20 hover:from-amber-700/30 hover:to-amber-900/30 border border-amber-600/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200"
          >
            <Coffee className="w-4 h-4" />
            Buy Me a Coffee
          </a>
        </div>

        {/* Footer section */}
        <div className="border-t border-pywel-border/50 p-4">
          {userLoading ? (
            <div className="h-16 flex items-center justify-center text-gray-500 text-sm">Loading...</div>
          ) : user ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="" className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-xs font-bold text-black">
                    {(user.user_metadata?.full_name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gold-300 truncate">
                    {user.user_metadata?.full_name || user.email?.split('@')[0] || 'Wanderer'}
                  </p>
                  <p className="text-xs text-gray-400">Signed in</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full px-3 py-2 text-sm bg-pywel-card hover:bg-pywel-card-hover border border-pywel-border text-gray-300 rounded-lg transition-colors duration-200 font-cinzel flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <p className="text-xs text-gray-400 mb-3">Sign in to save progress</p>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full px-3 py-2 text-sm bg-gold-600 hover:bg-gold-500 text-black font-semibold rounded-lg transition-colors duration-200 font-cinzel flex items-center justify-center gap-2">
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
