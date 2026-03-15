'use client';

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
        <div className="bg-gradient-to-r from-crimson-900 to-black border-b border-pywel-border">
          <div className="px-6 md:px-8 py-8 md:py-12">
            <h1 className="font-cinzel text-3xl md:text-4xl font-bold text-gold-300">
              Crimson Desert
            </h1>
            <p className="text-gray-400 mt-2 font-crimson italic">
              Track your journey through the cursed lands
            </p>
          </div>
        </div>

        {/* Page content */}
        <div className="px-6 md:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
