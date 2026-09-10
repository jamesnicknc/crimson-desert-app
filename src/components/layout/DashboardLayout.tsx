'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import Sidebar from './Sidebar';
import GlobalSearch from '../GlobalSearch';
import { DISCLAIMER } from '@/lib/site';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-arc-bg">
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 md:ml-60 min-w-0">
        {/* Hero banner */}
        <div
          className="border-b border-arc-border relative overflow-hidden"
          style={{ background: 'linear-gradient(to right, #1a1410 0%, #14100d 40%, #0e1318 100%)' }}
        >
          <div className="absolute inset-y-0 right-0 w-1/2 hazard-stripe opacity-40 pointer-events-none" />
          <div className="relative pl-16 md:pl-8 pr-6 md:pr-8 py-8 md:py-10 flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-rust-300 tracking-wide">
                ARC RAIDERS
              </h1>
              <p className="text-gray-400 mt-1 text-sm md:text-base">
                Plan the raid. Loot the Rust Belt. Get topside and back alive.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <GlobalSearch />
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 bg-arc-card/50 hover:bg-arc-card border border-arc-border rounded-lg text-rust-300 hover:text-rust-200 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-display">Home</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <div className="px-4 sm:px-6 md:px-8 py-8">
          {children}
        </div>

        {/* Disclaimer */}
        <footer className="px-6 md:px-8 pb-6 text-center">
          <p className="text-xs text-gray-600 max-w-2xl mx-auto">{DISCLAIMER}</p>
        </footer>
      </main>
    </div>
  );
}
