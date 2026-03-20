import type { Metadata } from 'next';
import { Cinzel, Crimson_Text, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import '@/styles/globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Crimson Desert Companion',
    template: '%s | Crimson Desert Companion',
  },
  description:
    'Your ultimate companion dashboard for the Crimson Desert game. Track your progress, manage resources, and explore the world.',
  openGraph: {
    title: 'Crimson Desert Companion',
    description: 'Track your journey through Pywel. Skills, quests, bestiary, weapons, and more.',
    type: 'website',
    url: 'https://crimsoncompanionapp.us',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${cinzel.variable} ${crimsonText.variable} ${inter.variable}`}>
      <body className="bg-pywel-bg text-gray-100 font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
