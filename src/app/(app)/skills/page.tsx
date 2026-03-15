'use client';

import { useState } from 'react';
import { getSkillBranches, SKILLS } from '@/lib/game-data';
import { useProgress } from '@/hooks/use-progress';
import SignInPrompt from '@/components/SignInPrompt';
import type { Character } from '@/types/game-data';

const CHARACTERS: Character[] = ['kliff', 'damiane', 'oongka'];

export default function SkillsPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>('kliff');
  const { isCompleted, toggle, countCompleted, loading, isAuthenticated } = useProgress();

  const skillBranches = getSkillBranches(selectedCharacter);
  const charSkills = SKILLS.filter(s => s.character === selectedCharacter);
  const completed = countCompleted('skill', charSkills.map(s => s.id));
  const total = charSkills.length;

  const getCharacterLabel = (char: Character): string => {
    return char.charAt(0).toUpperCase() + char.slice(1);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Skill Tree</h1>
        <p className="text-gray-400">Unlock and master skills for each character.</p>
      </div>

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

      <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold text-gold-300">Progress</h2>
            <span className="text-sm text-gold-400">{completed} / {total} skills unlocked</span>
          </div>
          <div className="w-full bg-pywel-bg rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-crimson-600 to-crimson-500 transition-all duration-300"
              style={{ width: `${(completed / total) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {!isAuthenticated && !loading && (
        <SignInPrompt message="Sign in to track your skill progress" compact />
      )}

      {loading ? (
        <div className="text-center text-gray-400">Loading skills...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from(skillBranches.entries()).map(([branchName, skills]) => (
            <div key={branchName} className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
              <h3 className="text-lg font-cinzel font-semibold text-gold-400 mb-4 pb-2 border-b border-gold-600/30">
                {branchName}
              </h3>

              <div className="space-y-2">
                {skills.map(skill => (
                  <div
                    key={skill.id}
                    className="flex items-start gap-3 p-2 rounded hover:bg-pywel-card-hover transition"
                  >
                    <input
                      type="checkbox"
                      checked={isCompleted('skill', skill.id)}
                      onChange={() => toggle('skill', skill.id)}
                      className="mt-1 w-4 h-4 cursor-pointer accent-gold-400"
                    />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${
                        isCompleted('skill', skill.id)
                          ? 'line-through text-gray-500'
                          : 'text-gray-200'
                      }`}>
                        {skill.name}
                      </p>
                      <p className="text-xs text-gold-300">{skill.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
