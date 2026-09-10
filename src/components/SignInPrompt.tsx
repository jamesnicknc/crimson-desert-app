'use client';

import Link from 'next/link';
import { UserRound } from 'lucide-react';

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
      <div className="bg-rust-900/20 border border-rust-700/30 rounded-lg px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-gray-300">{message}</p>
        <Link href="/login">
          <button className="px-4 py-1.5 bg-rust-500 hover:bg-rust-400 text-black text-sm font-display font-semibold rounded transition-colors whitespace-nowrap">
            Sign In
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-arc-card border border-arc-border rounded-lg p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rust-400 to-rust-600 flex items-center justify-center">
        <UserRound className="w-8 h-8 text-black" />
      </div>
      <h3 className="text-xl font-display font-bold text-rust-300 mb-2">{message}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Create a free account to save progress, sync across devices, and share with your squad.
      </p>
      <Link href="/login">
        <button className="px-6 py-2.5 bg-rust-500 hover:bg-rust-400 text-black font-display font-semibold rounded-lg transition-colors">
          Sign In
        </button>
      </Link>
    </div>
  );
}
