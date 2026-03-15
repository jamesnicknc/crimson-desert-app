'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-pywel-bg">
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 md:ml-60">
        {/* Hero banner */}
        <div className="border-b border-pywel-border" style={{ background: 'linear-gradient(to right, #1A0305 0%, #1A0305 20%, #180305 28%, #160204 35%, #140204 42%, #120203 50%, #100103 58%, #0E0102 65%, #0C0102 72%, #0A0101 80%, #090101 88%, #080101 94%, #070101 100%)' }}>
          <div className="pl-16 md:pl-8 pr-6 md:pr-8 py-8 md:py-12 flex items-center justify-between">
            <div>
              <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-300">
                Crimson Desert
              </h1>
              <p className="text-gray-400 mt-2 font-crimson italic">
                Track your journey through the cursed lands
              </p>
            </div>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 bg-pywel-card/50 hover:bg-pywel-card border border-pywel-border rounded-lg text-gold-300 hover:text-gold-200 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-cinzel">Home</span>
            </Link>
          </div>
        </div>

        {/* Page content */}
        <div className="px-6 md:px-8 py-8">
          {children}
        </div>

        {/* Disclaimer */}
        <footer className="px-6 md:px-8 pb-6 text-center">
          <p className="text-xs text-gray-600">
            This is an unofficial fan companion and is not affiliated with Pearl Abyss.
          </p>
        </footer>
      </main>
    </div>
  );
}
