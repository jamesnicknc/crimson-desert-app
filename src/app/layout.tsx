import type { Metadata } from 'next';
import { Chakra_Petch, Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SITE_URL } from '@/lib/site';
import '@/styles/globals.css';

const display = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ARC Raiders Companion',
    template: '%s | ARC Raiders Companion',
  },
  description:
    'Unofficial companion for ARC Raiders. Raid maps, ARC bestiary, weapons, gear, quests, skill tree, workshop upgrades, loadout planner and squad progress tracking.',
  openGraph: {
    title: 'ARC Raiders Companion',
    description:
      'Plan raids on the Rust Belt. Maps, ARC enemies, weapons, quests, workshop upgrades and loadouts in one place.',
    type: 'website',
    url: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-arc-bg text-gray-100 font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
