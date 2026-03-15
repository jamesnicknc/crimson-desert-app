'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Compass } from 'lucide-react';

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

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-crimson-600 hover:bg-crimson-500 text-white font-cinzel font-bold rounded-lg transition-colors duration-200 flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Explore Dashboard
            </button>
          </Link>

          <Link href="/login">
            <button className="px-8 py-3 bg-pywel-card hover:bg-pywel-card-hover border border-pywel-border text-gold-300 font-cinzel font-bold rounded-lg transition-colors duration-200">
              Sign In to Save Progress
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
