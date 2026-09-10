'use client';

import { useState } from 'react';
import { BookOpen, ChevronDown, Landmark, History, Home } from 'lucide-react';
import { GUIDE_SECTIONS, GAME_OVERVIEW, PATCHES } from '@/lib/game-data';
import PageHeader from '@/components/ui/PageHeader';
import Tag, { Unverified } from '@/components/ui/Tag';

export default function GuidePage() {
  const [open, setOpen] = useState<string | null>(GUIDE_SECTIONS[0]?.id ?? null);

  return (
    <div className="space-y-8">
      <PageHeader icon={<BookOpen className="w-7 h-7" />} title="New Raider Guide" subtitle="Everything you need before your first raid: the loop, extraction, the machines, etiquette, and how to spend your first coins and points." />

      {/* Overview */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-arc-card border border-arc-border rounded-lg p-5">
          <h2 className="font-display text-xl font-bold text-rust-300 mb-2">{GAME_OVERVIEW.title}</h2>
          <p className="text-sm text-gray-300 leading-relaxed">{GAME_OVERVIEW.premise}</p>
          <p className="text-sm text-gray-400 leading-relaxed mt-3">{GAME_OVERVIEW.lore}</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4">
            {GAME_OVERVIEW.eras.map((e, i) => (
              <div key={e.name} className="bg-arc-bg/50 rounded p-2">
                <p className="text-[10px] text-gray-600 font-mono">ERA {i + 1}</p>
                <p className="text-xs font-display font-semibold text-signal-300">{e.name}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">{e.summary}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-arc-card border border-arc-border rounded-lg p-5 text-sm space-y-2">
          <h3 className="font-display font-bold text-rust-300 mb-2">Fact sheet</h3>
          {[['Developer', GAME_OVERVIEW.developer], ['Publisher', GAME_OVERVIEW.publisher], ['Engine', GAME_OVERVIEW.engine], ['Released', GAME_OVERVIEW.releaseDate], ['Price', GAME_OVERVIEW.price], ['Genre', GAME_OVERVIEW.genre], ['Latest patch', GAME_OVERVIEW.latestPatch]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3"><span className="text-gray-500">{k}</span><span className="text-gray-200 text-right">{v}</span></div>
          ))}
          <div className="flex flex-wrap gap-1 pt-2">{GAME_OVERVIEW.platforms.map((p) => <Tag key={p} className="text-gray-300 border-arc-border bg-arc-bg/50">{p}</Tag>)}</div>
        </div>
      </section>

      {/* Guide sections */}
      <section className="space-y-2">
        {GUIDE_SECTIONS.map((s) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} id={s.id} className="bg-arc-card border border-arc-border rounded-lg overflow-hidden">
              <button onClick={() => setOpen(isOpen ? null : s.id)} className="w-full flex items-center justify-between px-5 py-3 text-left">
                <h2 className="font-display text-lg font-bold text-rust-300">{s.title}</h2>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-sm space-y-3">
                  {s.content && <p className="text-gray-300 leading-relaxed">{s.content}</p>}
                  {s.bullets && <ul className="space-y-1.5 list-disc pl-5 text-gray-300">{s.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                  {s.subsections && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {s.subsections.map((sub) => (
                        <div key={sub.title} className="bg-arc-bg/50 rounded-lg p-3">
                          <h3 className="font-display font-semibold text-signal-300 mb-1">{sub.title}</h3>
                          {sub.content && <p className="text-gray-300 text-xs leading-relaxed">{sub.content}</p>}
                          {sub.bullets && <ul className="text-xs text-gray-400 mt-1 space-y-0.5">{sub.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Speranza */}
      <section className="bg-arc-card border border-arc-border rounded-lg p-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-rust-300 mb-2"><Home className="w-5 h-5 text-signal-400" />{GAME_OVERVIEW.speranza.name}</h2>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{GAME_OVERVIEW.speranza.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {GAME_OVERVIEW.speranza.facilities.map((f) => (
            <div key={f.name} className="bg-arc-bg/50 rounded p-3"><p className="font-display font-semibold text-sm text-gray-100 flex items-center gap-2"><Landmark className="w-3.5 h-3.5 text-signal-400" />{f.name}</p><p className="text-xs text-gray-400 mt-1">{f.function}</p></div>
          ))}
        </div>
      </section>

      {/* Patch timeline */}
      <section id="patches" className="bg-arc-card border border-arc-border rounded-lg p-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-rust-300 mb-4"><History className="w-5 h-5 text-signal-400" />Update Timeline</h2>
        <ol className="relative border-l border-arc-border ml-2 space-y-5">
          {PATCHES.map((p) => (
            <li key={p.version + p.date} className="pl-5">
              <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-rust-400 border-2 border-arc-card" />
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-display font-semibold text-gray-100">{p.name}</span>
                <span className="text-xs font-mono text-signal-300">{p.version}</span>
                <span className="text-xs text-gray-500">{p.date}</span>
                {!p.verified && <Unverified />}
              </div>
              <ul className="text-xs text-gray-400 mt-1 space-y-0.5 list-disc pl-4">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
