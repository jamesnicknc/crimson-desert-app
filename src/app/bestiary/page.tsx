'use client';

import { BOSSES, REGIONS } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import type { Difficulty, Region } from '@/types/game-data';

export default function BestiaryPage() {
  const { isCompleted, toggle, loading } = useProgress();

  const getDifficultyColor = (difficulty: Difficulty): string => {
    const colors: Record<Difficulty, string> = {
      normal: 'bg-green-600/20 border-green-600 text-green-300',
      hard: 'bg-amber-600/20 border-amber-600 text-amber-300',
      extreme: 'bg-crimson-600/20 border-crimson-600 text-crimson-300',
      legendary: 'bg-purple-600/20 border-purple-600 text-purple-300',
    };
    return colors[difficulty];
  };

  const getRegionColor = (regionId: Region): string => {
    const colors: Record<Region, string> = {
      hernand: '#5BAA5B',
      pailune: '#5B8FA8',
      demeniss: '#8B7530',
      delesyia: '#7B5EA7',
      desert: '#C0392B',
      abyss: '#8B4789',
    };
    return colors[regionId];
  };

  const getRegionName = (regionId: Region): string => {
    const region = REGIONS.find(r => r.id === regionId);
    return region?.name || regionId;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Bestiary</h1>
        <p className="text-gray-400">Track defeated bosses and legendary creatures across Pywel.</p>
      </div>

      {loading ? (
        <div className="text-center text-gray-400">Loading bosses...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gold-600/50">
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400 w-8"></th>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Boss Name</th>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Region</th>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Type</th>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Difficulty</th>
                <th className="px-4 py-3 text-left text-xs font-cinzel font-bold text-gold-400">Reward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pywel-border">
              {BOSSES.map((boss, idx) => {
                const bossKey = `boss-${idx}`;
                const isDefeated = isCompleted('boss', bossKey);

                return (
                  <tr
                    key={bossKey}
                    className={`transition ${isDefeated ? 'bg-pywel-secondary/50' : 'hover:bg-pywel-card-hover'}`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isDefeated}
                        onChange={() => toggle('boss', bossKey)}
                        className="w-4 h-4 cursor-pointer accent-gold-400"
                      />
                    </td>
                    <td className={`px-4 py-3 font-semibold ${isDefeated ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                      {boss.name}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                        style={{ backgroundColor: getRegionColor(boss.region) }}
                      >
                        {getRegionName(boss.region)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{boss.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getDifficultyColor(boss.difficulty)}`}>
                        {boss.difficulty.charAt(0).toUpperCase() + boss.difficulty.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gold-300">{boss.reward}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
