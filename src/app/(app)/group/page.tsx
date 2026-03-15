import { Users2, Clock } from 'lucide-react';

export default function GroupPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-cinzel font-bold text-gold-400 mb-2">Group Dashboard</h1>
        <p className="text-gray-400">Connect with friends and compare your progress across the game.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-pywel-card border border-pywel-border rounded-xl p-12 max-w-lg w-full text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Users2 className="w-16 h-16 text-gold-400/40" />
              <Clock className="w-8 h-8 text-gold-300 absolute -bottom-1 -right-1" />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-cinzel font-bold text-gold-300">Coming Soon</h2>
            <p className="text-gray-400 leading-relaxed">
              Group features are currently under development. Soon you&apos;ll be able to create groups,
              invite friends, and compare your progress across Pywel together.
            </p>
          </div>

          <div className="border-t border-pywel-border pt-6">
            <h3 className="text-sm font-cinzel font-semibold text-gold-400 uppercase tracking-wider mb-4">
              Planned Features
            </h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0" />
                Create and join groups with invite codes
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0" />
                View group member progress and completions
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0" />
                Progress comparison leaderboards
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <span className="w-2 h-2 bg-gold-400 rounded-full flex-shrink-0" />
                Shared notes and boss strategies
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
