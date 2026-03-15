'use client';

import { Package } from 'lucide-react';

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Inventory</h1>
        <p className="text-gray-400">Track and manage your collected items across Pywel.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-20">
        <Package className="w-16 h-16 text-gold-400/30 mb-6" />
        <h2 className="text-2xl font-cinzel font-bold text-gold-300 mb-2">Coming Soon</h2>
        <p className="text-gray-400 text-center max-w-md">
          Inventory tracking will be available once more game data is released.
        </p>
      </div>
    </div>
  );
}
