'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleOAuthSignIn = async (provider: 'discord') => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/callback`,
        },
      });
      if (error) {
        console.error('Auth error:', error);
        setErrorMsg(error.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMsg('An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const supabase = createClient();

      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/callback`,
          },
        });
        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg('Check your email for a confirmation link!');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          setErrorMsg(error.message);
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMsg('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-pywel-bg text-gray-100 flex items-center justify-center px-4">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-900 via-black to-crimson-900" />
      </div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/">
            <h1 className="font-cinzel text-5xl font-bold mb-2 cursor-pointer hover:text-gold-300 transition-colors">
              <span className="text-gold-300">CRIMSON</span>
              <br />
              <span className="text-crimson-500">DESERT</span>
            </h1>
          </Link>
          <p className="font-crimson text-lg text-gold-400 italic">
            Companion Dashboard
          </p>
        </div>

        {/* Login box */}
        <div className="bg-pywel-card border border-pywel-border rounded-lg p-8 space-y-6">
          <div className="text-center">
            <h2 className="font-cinzel text-2xl font-bold text-gold-300 mb-2">
              Welcome Back, Wanderer
            </h2>
            <p className="text-gray-400 text-sm">
              Sign in to your Crimson Desert account
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleOAuthSignIn('discord')}
              disabled={isLoading}
              className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-3"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.865-.607 1.252a18.27 18.27 0 0 0-5.487 0c-.163-.387-.399-.877-.607-1.252a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.099a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.15 10.15 0 0 0 .372-.294a.074.074 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .076.01a9.82 9.82 0 0 0 .372.294a.072.072 0 0 1-.006.12a12.977 12.977 0 0 1-1.873.892a.07.07 0 0 0-.038.099a14.998 14.998 0 0 0 1.293 2.1a.074.074 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-3.03a.074.074 0 0 0 .032-.057c.5-4.297.822-8.516.335-12.657a.061.061 0 0 0-.031-.027zM8.02 15.33c-1.183 0-2.157-.967-2.157-2.156c0-1.193.93-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.19-.93 2.155-2.157 2.155zm7.975 0c-1.183 0-2.157-.967-2.157-2.156c0-1.193.955-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.19-.93 2.155-2.157 2.155z" />
              </svg>
              {isLoading ? 'Signing in...' : 'Continue with Discord'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pywel-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-pywel-card text-gray-500">
                or sign in with email
              </span>
            </div>
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-pywel-bg border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 bg-pywel-bg border border-pywel-border rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
              />
            </div>

            {errorMsg && (
              <p className="text-red-400 text-sm text-center">{errorMsg}</p>
            )}
            {successMsg && (
              <p className="text-green-400 text-sm text-center">{successMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-crimson-600 hover:bg-crimson-500 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading
                ? 'Please wait...'
                : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
            </button>

            <p className="text-center text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
                className="text-gold-300 hover:text-gold-200 font-medium transition-colors"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pywel-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-pywel-card text-gray-500">
                or continue as guest
              </span>
            </div>
          </div>

          {/* Guest button */}
          <Link href="/dashboard">
            <button className="w-full px-4 py-3 border border-pywel-border text-gold-300 font-semibold rounded-lg hover:bg-pywel-card-hover transition-colors duration-200">
              Continue as Guest
            </button>
          </Link>
        </div>

        {/* Footer text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          By signing in, you agree to our Terms of Service
          <br />
          and Privacy Policy
        </p>
      </div>
    </main>
  );
}
