'use client';

import Link from 'next/link';

interface SignInPromptProps {
  message?: string;
  compact?: boolean;
}

export default function SignInPrompt({
  message = 'Sign in to save your progress',
  compact = false,
}: SignInPromptProps) {
  if (compact) {
    return (
      <div className="bg-crimson-900/30 border border-crimson-700/50 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-300">{message}</p>
        <Link href="/login">
          <button className="px-4 py-1.5 bg-crimson-600 hover:bg-crimson-500 text-white text-sm font-cinzel font-semibold rounded transition-colors whitespace-nowrap">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-pywel-card border border-pywel-border rounded-lg p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-crimson-600 to-gold-500 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
      <h3 className="text-xl font-cinzel font-bold text-gold-400 mb-2">{message}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Create an account to save your progress, sync across devices, and share with friends.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/login">
          <button className="px-6 py-2.5 bg-crimson-600 hover:bg-crimson-500 text-white font-cinzel font-semibold rounded-lg transition-colors">
            Sign In with Google
          </button>
        </Link>
        <Link href="/login">
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-cinzel font-semibold rounded-lg transition-colors">
            Sign In with Discord
          </button>
        </Link>
      </div>
    </div>
  );
}
