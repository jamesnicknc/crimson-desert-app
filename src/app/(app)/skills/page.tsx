'use client';

import { useState } from 'react';
import { SKILLS } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import SignInPrompt from '@/components/SignInPrompt';
import type { Character, Skill } from '@/types/game-data';

const CHARACTERS: Character[] = ['kliff', 'damiane', 'oongka'];

const BRANCH_CONFIG = {
  Stamina: {
    label: 'Stamina',
    borderClass: 'border-blue-500/40',
    headerBgClass: 'border-b border-blue-500/20',
    headerTextClass: 'text-blue-400',
    dotClass: 'bg-blue-500',
    badgeClass: 'bg-blue-500/20 text-blue-300',
    clusterClass: 'text-blue-500/70',
  },
  Spirit: {
    label: 'Spirit',
    borderClass: 'border-green-500/40',
    headerBgClass: 'border-b border-green-500/20',
    headerTextClass: 'text-green-400',
    dotClass: 'bg-green-500',
    badgeClass: 'bg-green-500/20 text-green-300',
    clusterClass: 'text-green-500/70',
  },
  Health: {
    label: 'Health',
    borderClass: 'border-red-500/40',
    headerBgClass: 'border-b border-red-500/20',
    headerTextClass: 'text-red-400',
    dotClass: 'bg-red-500',
    badgeClass: 'bg-red-500/20 text-red-300',
    clusterClass: 'text-red-500/70',
  },
} as const;

const BRANCH_SUBTITLES: Record<string, Record<Character, string>> = {
  Stamina: {
    kliff: 'Armed & Unarmed Combat, Archery',
    damiane: 'Rapier & Pistol Combat',
    oongka: 'Axe Mastery & Heavy Attacks',
  },
  Spirit: {
    kliff: "Nature's Arts, Force Palm & Focus",
    damiane: 'Shield Arts, Evasion & Abilities',
    oongka: 'Cannon Combat & Rage',
  },
  Health: {
    kliff: 'Elemental Arts, Axiom Force & Flight',
    damiane: 'Abyss Arts & Mobility',
    oongka: 'Fortitude & Endurance',
  },
};

type BranchName = keyof typeof BRANCH_CONFIG;

function groupByCluster(skills: Skill[]): Map<string, Skill[]> {
  const map = new Map<string, Skill[]>();
  for (const skill of skills) {
    const cluster = skill.cluster ?? 'General';
    if (!map.has(cluster)) map.set(cluster, []);
    map.get(cluster)!.push(skill);
  }
  return map;
}

export default function SkillsPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>('kliff');
  const { isCompleted, toggle, countCompleted, loading, isAuthenticated } = useProgress();

  const charSkills = SKILLS.filter(s => s.character === selectedCharacter);
  const completed = countCompleted('skill', charSkills.map(s => s.id));
  const total = charSkills.length;

  const skillsByBranch = charSkills.reduce((acc, skill) => {
    if (!acc[skill.branch]) acc[skill.branch] = [];
    acc[skill.branch].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getCharacterLabel = (char: Character) =>
    char.charAt(0).toUpperCase() + char.slice(1);

  const renderSkill = (skill: Skill) => (
    <div
      key={skill.id}
      className="group relative flex items-start gap-3 p-2 rounded hover:bg-pywel-card-hover transition"
    >
      <input
        type="checkbox"
        checked={isCompleted('skill', skill.id)}
        onChange={() => toggle('skill', skill.id)}
        className="mt-1 w-4 h-4 cursor-pointer accent-gold-400 shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-snug ${
          isCompleted('skill', skill.id) ? 'line-through text-gray-500' : 'text-gray-200'
        }`}>
          {skill.name}
        </p>
        <p className="text-xs text-gold-300">{skill.cost}</p>
        {skill.description && (
          <p className="text-xs text-gray-400 mt-1 hidden group-hover:block">
            {skill.description}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Skill Tree</h1>
        <p className="text-gray-400 text-sm">
          Three branches — Stamina, Spirit, and Health — each unlocking powerful abilities.
          Skills cost Abyss Artifacts. Watch enemies to learn some for free.
        </p>
      </div>

      {/* Character tabs */}
      <div className="flex gap-2 border-b border-pywel-border">
        {CHARACTERS.map(char => (
          <button
            key={char}
            onClick={() => setSelectedCharacter(char)}
            className={`px-4 py-3 font-cinzel font-semibold transition-colors ${
              selectedCharacter === char
                ? 'text-gold-400 border-b-2 border-gold-400'
                : 'text-gray-400 hover:text-gold-300'
            }`}
          >
            {getCharacterLabel(char)}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-sm font-semibold text-gold-300">Progress</h2>
          <span className="text-sm text-gold-400">{completed} / {total} skills unlocked</span>
        </div>
        <div className="w-full bg-pywel-bg rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
            style={{ width: total > 0 ? `${(completed / total) * 100}%` : '0%' }}
          />
        </div>
      </div>

      {!isAuthenticated && !loading && (
        <SignInPrompt message="Sign in to track your skill progress" compact />
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading skills...</div>
      ) : (
        <>
          {/* Three colored branches */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {(['Stamina', 'Spirit', 'Health'] as BranchName[]).map(branch => {
              const config = BRANCH_CONFIG[branch];
              const branchSkills = skillsByBranch[branch] ?? [];
              const clusters = groupByCluster(branchSkills);
              const branchCompleted = branchSkills.filter(s => isCompleted('skill', s.id)).length;

              return (
                <div key={branch} className={`bg-pywel-card rounded-lg border ${config.borderClass} flex flex-col`}>
                  {/* Branch header */}
                  <div className={`p-4 ${config.headerBgClass}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-3 h-3 rounded-full shrink-0 ${config.dotClass}`} />
                      <h3 className={`text-lg font-cinzel font-bold ${config.headerTextClass}`}>{branch}</h3>
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${config.badgeClass}`}>
                        {branchCompleted}/{branchSkills.length}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {BRANCH_SUBTITLES[branch]?.[selectedCharacter] ?? ''}
                    </p>
                  </div>

                  {/* Clusters */}
                  <div className="p-4 space-y-5 flex-1">
                    {Array.from(clusters.entries()).map(([clusterName, skills]) => (
                      <div key={clusterName}>
                        <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${config.clusterClass}`}>
                          {clusterName}
                        </h4>
                        <div className="space-y-0.5">
                          {skills.map(renderSkill)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ultimate ability */}
          {(skillsByBranch['Ultimate'] ?? []).length > 0 && (
            <div className="bg-pywel-card rounded-lg border border-gold-600/40 p-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-gold-400 shrink-0" />
                <h3 className="text-lg font-cinzel font-bold text-gold-400">Ultimate Ability</h3>
                <span className="ml-2 text-xs text-gray-500">Unlocks after completing any one branch</span>
              </div>
              <div className="space-y-1">
                {(skillsByBranch['Ultimate'] ?? []).map(renderSkill)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
