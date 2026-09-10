import Link from 'next/link';
import { Map as MapIcon, AlertTriangle, DoorOpen, KeyRound, MapPin } from 'lucide-react';
import { MAPS } from '@/lib/game-data';
import PageHeader from '@/components/ui/PageHeader';

export const metadata = { title: 'Raid Maps' };

export default function MapsPage() {
  return (
    <div className="space-y-6">
      <PageHeader icon={<MapIcon className="w-7 h-7" />} title="Raid Maps" subtitle="Every topside map with its points of interest, extraction points, locked rooms, ARC spawns and community tips. Sign in to drop pins and share them with your squad." />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {MAPS.map((m) => (
          <Link key={m.slug} href={`/maps/${m.slug}`} className="group bg-arc-card border border-arc-border rounded-lg overflow-hidden hover:border-rust-400/70 transition-colors">
            <div className="relative aspect-[16/10] bg-arc-bg overflow-hidden">
              {m.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.images[0].src} alt={m.name} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300" loading="lazy" />
              ) : (
                <div className="absolute inset-0 map-grid flex items-center justify-center text-gray-600 font-display">Map coming soon</div>
              )}
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-display font-semibold bg-black/70 text-gray-200 border border-white/10">{m.status === 'playable' ? m.size : 'Upcoming'}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-display font-semibold bg-black/70 border border-white/10 flex items-center gap-1" style={{ color: m.color }}><AlertTriangle className="w-3 h-3" />Danger {m.danger}/5</span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="font-display text-xl font-bold text-rust-300 group-hover:text-rust-200">{m.name}</h2>
              <p className="text-sm text-gray-400 mt-1">{m.tagline}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{m.pois.length} POIs</span>
                <span className="flex items-center gap-1"><DoorOpen className="w-3 h-3" />{m.extractions.length} extracts</span>
                <span className="flex items-center gap-1"><KeyRound className="w-3 h-3" />{m.lockedRooms.length} keys</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
