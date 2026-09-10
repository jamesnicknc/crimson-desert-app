'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, MapPin, DoorOpen, KeyRound, Bot, Lightbulb, Compass, Plus, X, Users, Eye, EyeOff, Info } from 'lucide-react';
import { MAPS, ENEMIES, MAP_EVENTS, POI_TIER_CONFIG } from '@/lib/game-data';
import { useUser } from '@/hooks/use-user';
import { useMapPins, PIN_CATEGORIES } from '@/hooks/use-map-pins';
import Tag, { Unverified } from '@/components/ui/Tag';
import SignInPrompt from '@/components/SignInPrompt';
import type { PinCategory } from '@/types/game-data';

const RaidMapViewer = dynamic(() => import('@/components/map/RaidMapViewer'), {
  ssr: false,
  loading: () => (
    <div className="rounded-lg border border-arc-border bg-arc-card flex items-center justify-center" style={{ height: '70vh', minHeight: 480 }}>
      <div className="text-center"><div className="w-8 h-8 border-2 border-rust-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" /><p className="text-gray-500 text-sm font-display">Loading map...</p></div>
    </div>
  ),
});

type Tab = 'map' | 'pois' | 'extract' | 'arc' | 'tips';

export default function MapDetail({ slug }: { slug: string }) {
  const map = MAPS.find((m) => m.slug === slug)!;
  const params = useSearchParams();
  const { user } = useUser();
  const { myPins, groupPins, createPin, updatePin, deletePin } = useMapPins(user?.id ?? null, slug);
  const [tab, setTab] = useState<Tab>(params.get('poi') ? 'pois' : 'map');
  const [imageIdx, setImageIdx] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [pending, setPending] = useState<[number, number] | null>(null);
  const [saving, setSaving] = useState(false);
  const [showMine, setShowMine] = useState(true);
  const [showSquad, setShowSquad] = useState(true);
  const highlight = params.get('poi');

  const image = map.images[imageIdx];
  const pins = useMemo(() => [...(showMine ? myPins : []), ...(showSquad ? groupPins : [])], [myPins, groupPins, showMine, showSquad]);

  const handleCreate = useCallback(async (v: { label: string; category: PinCategory; notes: string; isShared: boolean }) => {
    if (!pending) return;
    setSaving(true);
    await createPin({ lat: pending[0], lng: pending[1], label: v.label, category: v.category, notes: v.notes || undefined, isShared: v.isShared, mapSlug: slug });
    setSaving(false); setPending(null); setPlacing(false);
  }, [pending, createPin, slug]);

  const enemiesHere = ENEMIES.filter((e) => e.maps.includes(slug));
  const eventsHere = MAP_EVENTS.filter((e) => e.maps.includes(slug) || e.maps.includes('all'));

  const tabs: [Tab, string, React.ReactNode][] = [
    ['map', 'Map & Pins', <Compass key="c" className="w-4 h-4" />],
    ['pois', `Points of Interest (${map.pois.length})`, <MapPin key="p" className="w-4 h-4" />],
    ['extract', 'Extraction & Keys', <DoorOpen key="d" className="w-4 h-4" />],
    ['arc', `ARC & Events (${enemiesHere.length})`, <Bot key="b" className="w-4 h-4" />],
    ['tips', 'Layout & Tips', <Lightbulb key="l" className="w-4 h-4" />],
  ];

  return (
    <div className="space-y-6">
      <div>
        <Link href="/maps" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-rust-300 mb-3"><ArrowLeft className="w-4 h-4" />All maps</Link>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{map.status === 'playable' ? map.size : 'Upcoming'}</Tag>
              <Tag className="border-current bg-transparent" ><span style={{ color: map.color }}>Danger {map.danger}/5</span></Tag>
              <span className="text-xs text-gray-500">{map.addedIn}</span>
            </div>
            <h1 className="text-3xl font-display font-bold text-rust-300 tracking-wide">{map.name}</h1>
            <p className="text-gray-400 mt-1 max-w-3xl">{map.description}</p>
          </div>
          <div className="text-xs text-gray-400 space-y-0.5 md:text-right">
            <p><span className="text-gray-500">Players:</span> {map.players}</p>
            <p><span className="text-gray-500">Level:</span> {map.recommendedLevel}</p>
          </div>
        </div>
        {map.conditions.length > 0 && <div className="flex flex-wrap gap-1 mt-3">{map.conditions.map((c) => <Tag key={c} className="text-signal-300 border-signal-500/40 bg-signal-500/10">{c}</Tag>)}</div>}
      </div>

      <div className="flex gap-1 border-b border-arc-border overflow-x-auto">
        {tabs.map(([t, label, icon]) => (
          <button key={t} onClick={() => setTab(t)} className={`flex items-center gap-2 px-4 py-2 text-sm font-display border-b-2 -mb-px whitespace-nowrap transition-colors ${tab === t ? 'text-rust-300 border-rust-400' : 'text-gray-400 border-transparent hover:text-gray-200'}`}>{icon}{label}</button>
        ))}
      </div>

      {tab === 'map' && (
        <div className="space-y-3">
          {map.images.length === 0 ? (
            <div className="map-grid rounded-lg border border-arc-border flex items-center justify-center text-gray-500 font-display" style={{ height: 320 }}>No map imagery yet for {map.name}.</div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2">
                {map.images.length > 1 && map.images.map((img, i) => (
                  <button key={img.src} onClick={() => setImageIdx(i)} className={`px-3 py-1.5 rounded-lg border text-xs font-display ${imageIdx === i ? 'bg-rust-500 text-black border-rust-400' : 'bg-arc-card text-gray-300 border-arc-border'}`}>{img.label}</button>
                ))}
                <div className="ml-auto flex items-center gap-2">
                  {user ? (
                    <>
                      <button onClick={() => setShowMine((v) => !v)} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs ${showMine ? 'text-signal-300 border-signal-500/40' : 'text-gray-500 border-arc-border'}`}>{showMine ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}Mine ({myPins.length})</button>
                      <button onClick={() => setShowSquad((v) => !v)} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs ${showSquad ? 'text-rust-300 border-rust-500/40' : 'text-gray-500 border-arc-border'}`}><Users className="w-3.5 h-3.5" />Squad ({groupPins.length})</button>
                      <button onClick={() => { setPlacing((p) => !p); setPending(null); }} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-display font-semibold ${placing ? 'bg-red-500/80 text-white' : 'bg-rust-500 text-black hover:bg-rust-400'}`}>{placing ? <><X className="w-3.5 h-3.5" />Cancel</> : <><Plus className="w-3.5 h-3.5" />Drop pin</>}</button>
                    </>
                  ) : (
                    <Link href="/login" className="text-xs text-signal-400 hover:text-signal-300">Sign in to drop pins</Link>
                  )}
                </div>
              </div>
              {placing && !pending && <p className="text-xs text-signal-300">Click anywhere on the map to place your pin.</p>}
              <RaidMapViewer
                image={image}
                pins={pins}
                userId={user?.id ?? null}
                placing={placing}
                onPlaced={setPending}
                pendingCoords={pending}
                onCreate={handleCreate}
                onCancelCreate={() => { setPending(null); setPlacing(false); }}
                onUpdate={(id, v) => { updatePin(id, v); }}
                onDelete={(id) => { deletePin(id); }}
                saving={saving}
              />
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                {(Object.keys(PIN_CATEGORIES) as PinCategory[]).map((c) => <span key={c} className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PIN_CATEGORIES[c].color }} />{PIN_CATEGORIES[c].label}</span>)}
                <span className="ml-auto">In-game map imagery. Scroll to zoom, drag to pan.</span>
              </div>
            </>
          )}
        </div>
      )}

      {tab === 'pois' && (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {(['red', 'yellow', 'green'] as const).map((t) => <span key={t} className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: POI_TIER_CONFIG[t].color }} />{POI_TIER_CONFIG[t].label}</span>)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {map.pois.map((p) => (
              <div key={p.id} id={p.id} className={`bg-arc-card border rounded-lg p-4 ${highlight === p.id ? 'border-rust-400' : 'border-arc-border'}`}>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: POI_TIER_CONFIG[p.tier].color }} />
                  <h3 className="font-display font-bold text-gray-100">{p.name}</h3>
                  {!p.verified && <Unverified />}
                </div>
                <p className="text-sm text-gray-400">{p.description}</p>
                {p.loot.length > 0 && <div className="flex flex-wrap gap-1 mt-2">{p.loot.map((l) => <Tag key={l} className="text-signal-300 border-signal-500/40 bg-signal-500/10">{l}</Tag>)}</div>}
              </div>
            ))}
          </div>
          {map.hotspots.length > 0 && (
            <div className="bg-arc-card border border-rust-500/30 rounded-lg p-4">
              <h3 className="font-display font-bold text-rust-300 mb-1">Loot hotspots</h3>
              <p className="text-sm text-gray-300">{map.hotspots.join(' · ')}</p>
            </div>
          )}
        </div>
      )}

      {tab === 'extract' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-rust-300 flex items-center gap-2"><DoorOpen className="w-4 h-4" />Extraction points</h3>
            {map.extractions.map((e) => (
              <div key={e.name} className="bg-arc-card border border-arc-border rounded-lg p-4">
                <div className="flex items-center gap-2 flex-wrap mb-1"><h4 className="font-display font-semibold text-gray-100">{e.name}</h4><Tag className="text-yellow-300 border-yellow-500/40 bg-yellow-500/10">{e.type}</Tag>{!e.verified && <Unverified />}</div>
                <p className="text-sm text-gray-400">{e.notes}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-bold text-rust-300 flex items-center gap-2"><KeyRound className="w-4 h-4" />Locked rooms & keys</h3>
            {map.lockedRooms.length === 0 && <p className="text-sm text-gray-500">No key data yet.</p>}
            {map.lockedRooms.map((k) => (
              <div key={k.key} className="bg-arc-card border border-arc-border rounded-lg p-4">
                <div className="flex items-center gap-2 flex-wrap mb-1"><h4 className="font-display font-semibold text-gray-100">{k.key}</h4>{!k.verified && <Unverified />}</div>
                <p className="text-sm text-gray-300">{k.opens}</p>
                <p className="text-xs text-gray-500 mt-1">{k.loot}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'arc' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-rust-300">Machines on this map</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {enemiesHere.map((e) => (
                <Link key={e.id} href={`/arc?q=${encodeURIComponent(e.name)}`} className="bg-arc-card border border-arc-border rounded-lg p-3 hover:border-red-500/50">
                  <p className="font-display font-semibold text-gray-100 text-sm">{e.name}</p>
                  <p className="text-[11px] text-gray-500">{e.sizeClass} · threat {e.threat}/5</p>
                </Link>
              ))}
            </div>
            {map.arcSpawns.length > 0 && <div className="bg-arc-card border border-arc-border rounded-lg p-4"><h4 className="text-xs font-display uppercase tracking-wider text-signal-400 mb-2">Known spawns</h4><ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">{map.arcSpawns.map((s) => <li key={s}>{s}</li>)}</ul></div>}
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-bold text-rust-300">Conditions & events</h3>
            {eventsHere.map((ev) => (
              <div key={ev.id} className="bg-arc-card border border-arc-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1"><h4 className="font-display font-semibold text-gray-100">{ev.name}</h4><Tag className="text-gray-300 border-gray-600/50 bg-gray-600/10">{ev.category}</Tag></div>
                <p className="text-sm text-gray-400">{ev.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'tips' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2"><h3 className="font-display font-bold text-rust-300">Layout</h3>{!map.layout.verified && <Unverified />}</div>
            <p className="text-sm text-gray-300 mb-3">{map.layout.summary}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {([['North', map.layout.north], ['South', map.layout.south], ['East', map.layout.east], ['West', map.layout.west], ['Center', map.layout.center]] as const).filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="bg-arc-bg/50 rounded p-2"><dt className="text-xs text-signal-400 font-display uppercase">{k}</dt><dd className="text-gray-300">{v}</dd></div>
              ))}
            </dl>
            <p className="text-xs text-gray-500 mt-3"><span className="text-gray-400">Difficulty:</span> {map.difficulty}</p>
          </div>
          <div className="bg-arc-card border border-arc-border rounded-lg p-4">
            <h3 className="font-display font-bold text-rust-300 mb-2 flex items-center gap-2"><Lightbulb className="w-4 h-4" />Community tips</h3>
            <ul className="text-sm text-gray-300 space-y-2 list-disc pl-5">{map.tips.map((t) => <li key={t}>{t}</li>)}</ul>
            {map.tips.length === 0 && <p className="text-sm text-gray-500">No tips yet.</p>}
          </div>
        </div>
      )}

      {!user && tab === 'map' && <SignInPrompt compact message="Sign in to drop pins on this map and share them with your squad." />}
      <p className="text-[11px] text-gray-600 flex items-center gap-1"><Info className="w-3 h-3" />POI descriptions are compiled from community guides and may lag behind the latest patch.</p>
    </div>
  );
}
