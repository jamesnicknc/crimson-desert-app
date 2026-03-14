'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date('2026-03-19T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-pywel-bg text-gray-100 overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-crimson-900 via-black to-crimson-900" />
      </div>

      {/* Hero section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo and title */}
        <div className="text-center mb-12">
          <h1 className="font-cinzel text-6xl md:text-7xl font-bold mb-4">
            <span className="text-gold-300">CRIMSON</span>
            <br />
            <span className="text-crimson-500">DESERT</span>
          </h1>
          <p className="font-crimson text-xl md:text-2xl text-gold-400 mb-2 italic">
            Companion Dashboard
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-crimson-500 to-gold-300 mx-auto mt-6" />
        </div>

        {/* Countdown timer */}
        <div className="mb-16">
          <p className="text-center text-gold-300 font-cinzel text-lg mb-8">
            Launching March 19, 2026
          </p>
          <div className="grid grid-cols-4 gap-4 md:gap-8">
            <div className="text-center">
              <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 md:p-6">
                <p className="text-3xl md:text-4xl font-bold text-crimson-500">
                  {countdown.days}
                </p>
                <p className="text-sm text-gray-400 mt-2 font-cinzel">DAYS</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 md:p-6">
                <p className="text-3xl md:text-4xl font-bold text-crimson-500">
                  {countdown.hours}
                </p>
                <p className="text-sm text-gray-400 mt-2 font-cinzel">HOURS</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 md:p-6">
                <p className="text-3xl md:text-4xl font-bold text-crimson-500">
                  {countdown.minutes}
                </p>
                <p className="text-sm text-gray-400 mt-2 font-cinzel">MINUTES</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-pywel-card border border-pywel-border rounded-lg p-4 md:p-6">
                <p className="text-3xl md:text-4xl font-bold text-crimson-500">
                  {countdown.seconds}
                </p>
                <p className="text-sm text-gray-400 mt-2 font-cinzel">SECONDS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features text */}
        <div className="text-center mb-12 max-w-2xl">
          <p className="text-gray-300 text-lg mb-4">
            Track your progress through the cursed lands. Master weapons, hunt beasts,
            and uncover the mysteries of the Crimson Desert.
          </p>
        </div>

        {/* Auth buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <button className="px-8 py-3 bg-crimson-600 hover:bg-crimson-500 text-white font-cinzel font-bold rounded-lg transition-colors duration-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.001 11.639h-.069V11.5h-10.28v2.333h5.896c-.469 2.459-2.734 4.194-5.494 4.194-3.126 0-5.667-2.541-5.667-5.667 0-3.126 2.541-5.667 5.667-5.667 1.328 0 2.632.451 3.674 1.263l1.85-1.793C16.102 3.75 14.226 2.5 12 2.5c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75c5.245 0 9.639-4.199 9.75-9.513v-.097z" />
              </svg>
              Sign in with Google
            </button>
          </Link>

          <Link href="/login">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-cinzel font-bold rounded-lg transition-colors duration-200 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.211.375-.444.865-.607 1.252a18.27 18.27 0 0 0-5.487 0c-.163-.387-.399-.877-.607-1.252a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.975 14.975 0 0 0 1.293-2.1a.07.07 0 0 0-.038-.099a13.11 13.11 0 0 1-1.872-.892a.072.072 0 0 1-.007-.12a10.15 10.15 0 0 0 .372-.294a.074.074 0 0 1 .076-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .076.01a9.82 9.82 0 0 0 .372.294a.072.072 0 0 1-.006.12a12.977 12.977 0 0 1-1.873.892a.07.07 0 0 0-.038.099a14.998 14.998 0 0 0 1.293 2.1a.074.074 0 0 0 .084.028a19.963 19.963 0 0 0 6.002-3.03a.074.074 0 0 0 .032-.057c.5-4.297.822-8.516.335-12.657a.061.061 0 0 0-.031-.027zM8.02 15.33c-1.183 0-2.157-.967-2.157-2.156c0-1.193.93-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.19-.93 2.155-2.157 2.155zm7.975 0c-1.183 0-2.157-.967-2.157-2.156c0-1.193.955-2.157 2.157-2.157c1.226 0 2.157.964 2.157 2.157c0 1.19-.93 2.155-2.157 2.155z" />
              </svg>
              Sign in with Discord
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-gray-500 text-sm">
          <p>Crimson Desert Companion v0.1 - Pre-launch</p>
        </div>
      </div>
    </main>
  );
}
