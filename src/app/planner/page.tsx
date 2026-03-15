'use client';

import { useState } from 'react';
import { SKILLS, WEAPONS, COLLECTIBLES, getSkillBranches } from '@/lib/game-data';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/use-user';
import SignInPrompt from '@/components/SignInPrompt';
import type { Character, Build } from '@/types/game-data';

const CHARACTERS: Character[] = ['kliff', 'damiane', 'oongka'];

export default function PlannerPage() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character>('kliff');
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());
  const [selectedWeapons, setSelectedWeapons] = useState<Set<string>>(new Set());
  const [selectedGears, setSelectedGears] = useState<Set<string>>(new Set());
  const [buildName, setBuildName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();
  const { user } = useUser();

  const charSkills = SKILLS.filter(s => s.character === selectedCharacter);
  const charWeapons = WEAPONS.filter(w => w.character === selectedCharacter);
  const gears = COLLECTIBLES.gear;

  // Calculate artifact cost
  const calculateArtifactCost = (): number => {
    let cost = 0;
    selectedSkills.forEach(skillId => {
      const skill = SKILLS.find(s => s.id === skillId);
      if (skill && skill.cost !== 'Observe') {
        const match = skill.cost.match(/\d+/);
        if (match) cost += parseInt(match[0]);
      }
    });
    return cost;
  };

  const toggleSkill = (skillId: string) => {
    const newSet = new Set(selectedSkills);
    if (newSet.has(skillId)) {
      newSet.delete(skillId);
    } else {
      newSet.add(skillId);
    }
    setSelectedSkills(newSet);
  };

  const toggleWeapon = (weaponName: string) => {
    const newSet = new Set(selectedWeapons);
    if (newSet.has(weaponName)) {
      newSet.delete(weaponName);
    } else {
      newSet.add(weaponName);
    }
    setSelectedWeapons(newSet);
  };

  const toggleGear = (gearName: string) => {
    const newSet = new Set(selectedGears);
    if (newSet.has(gearName)) {
      newSet.delete(gearName);
    } else {
      newSet.add(gearName);
    }
    setSelectedGears(newSet);
  };

  const saveBuild = async () => {
    if (!buildName.trim()) {
      alert('Please enter a build name');
      return;
    }

    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      return;
    }

    const build: Build = {
      id: `build-${Date.now()}`,
      name: buildName,
      character: selectedCharacter,
      skills: Array.from(selectedSkills),
      weapons: Array.from(selectedWeapons),
      gears: Array.from(selectedGears),
      isPublic,
    };

    await supabase.from('builds').insert([
      {
        user_id: user.id,
        name: build.name,
        character: build.character,
        skills: build.skills,
        weapons: build.weapons,
        gears: build.gears,
        is_public: build.isPublic,
      },
    ]);

    setSaving(false);
    alert('Build saved successfully!');
    setBuildName('');
  };

  const getCharacterLabel = (char: Character): string => {
    return char.charAt(0).toUpperCase() + char.slice(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Build Planner</h1>
        <p className="text-gray-400">Plan your character builds and save them to your collection.</p>
      </div>

      <div className="flex gap-2 mb-6 border-b border-pywel-border pb-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Skills */}
        <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
          <h2 className="text-lg font-cinzel font-bold text-gold-400 mb-4">Available Skills</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {charSkills.map(skill => (
              <label key={skill.id} className="flex items-start gap-2 p-2 hover:bg-pywel-card-hover rounded cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSkills.has(skill.id)}
                  onChange={() => toggleSkill(skill.id)}
                  className="mt-1 w-4 h-4 accent-gold-400"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200">{skill.name}</p>
                  <p className="text-xs text-gold-300">{skill.cost}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Right Panel - Weapons & Gears */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
            <h2 className="text-lg font-cinzel font-bold text-gold-400 mb-4">Available Weapons</h2>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {charWeapons.map(weapon => (
                <label key={weapon.name} className="flex items-start gap-2 p-2 hover:bg-pywel-card-hover rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedWeapons.has(weapon.name)}
                    onChange={() => toggleWeapon(weapon.name)}
                    className="mt-1 w-4 h-4 accent-gold-400"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200">{weapon.name}</p>
                    <p className="text-xs text-gold-300">{weapon.type}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-pywel-card rounded-lg p-4 border border-pywel-border">
            <h2 className="text-lg font-cinzel font-bold text-gold-400 mb-4">Abyss Gears</h2>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {gears.map(gear => (
                <label key={gear.name} className="flex items-start gap-2 p-2 hover:bg-pywel-card-hover rounded cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGears.has(gear.name)}
                    onChange={() => toggleGear(gear.name)}
                    className="mt-1 w-4 h-4 accent-gold-400"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-200">{gear.name}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary & Save */}
      <div className="bg-pywel-card rounded-lg p-6 border border-pywel-border space-y-4">
        <div>
          <p className="text-sm font-semibold text-gold-300 mb-1">Total Artifact Cost</p>
          <p className="text-2xl font-cinzel font-bold text-crimson-400">{calculateArtifactCost()} Artifacts</p>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center py-4 border-t border-pywel-border border-b">
          <div>
            <p className="text-sm text-gray-400">Skills Selected</p>
            <p className="text-lg font-semibold text-gold-400">{selectedSkills.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Weapons Selected</p>
            <p className="text-lg font-semibold text-gold-400">{selectedWeapons.size}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gears Selected</p>
            <p className="text-lg font-semibold text-gold-400">{selectedGears.size}</p>
          </div>
        </div>

        {user ? (
          <div className="space-y-3">
            <input
              type="text"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
              placeholder="Enter build name..."
              className="w-full bg-pywel-bg border border-pywel-border rounded px-3 py-2 text-white focus:border-gold-400 focus:outline-none"
            />

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 accent-gold-400"
              />
              <span className="text-sm text-gray-300">Make this build public</span>
            </label>

            <button
              onClick={saveBuild}
              disabled={saving || !buildName.trim()}
              className="w-full bg-crimson-600 hover:bg-crimson-700 disabled:bg-gray-600 text-white font-semibold py-2 rounded transition"
            >
              {saving ? 'Saving...' : 'Save Build'}
            </button>
          </div>
        ) : (
          <SignInPrompt message="Sign in to save your builds" compact />
        )}
      </div>
    </div>
  );
}
