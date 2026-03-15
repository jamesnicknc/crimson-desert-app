import type { Metadata } from 'next';
import '@/styles/globals.css';

const BASE_URL = 'https://crimsoncompanionapp.us';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Crimson Desert Companion | Interactive Game Guide & Tracker',
    template: '%s | Crimson Desert Companion',
  },
  description:
    'Free companion app for Crimson Desert. Interactive map, skill tree planner, collectible tracker, bestiary, quest log, build planner, and group progress tracking for Kliff, Damiane, and Oongka.',
  keywords: [
    'Crimson Desert', 'companion app', 'game guide', 'interactive map',
    'skill tree', 'collectibles tracker', 'bestiary', 'quest log',
    'build planner', 'Kliff', 'Damiane', 'Oongka', 'Pearl Abyss',
    'Pywel', 'weapons guide', 'crafting recipes',
  ],
  authors: [{ name: 'Crimson Desert Companion' }],
  creator: 'Crimson Desert Companion',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Crimson Desert Companion',
    title: 'Crimson Desert Companion | Interactive Game Guide & Tracker',
    description:
      'Your ultimate companion for Crimson Desert. Track progress across all three characters, explore the interactive map, plan builds, and compete with friends.',
    images: [
      {
        url: '/assets/kliff.png',
        width: 800,
        height: 1200,
        alt: 'Crimson Desert Companion - Kliff Character Art',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crimson Desert Companion',
    description:
      'Free interactive companion app for Crimson Desert. Maps, skill trees, build planner, collectible tracker, and more.',
    images: ['/assets/kliff.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Crimson Desert Companion',
  url: BASE_URL,
  description:
    'Free companion app for Crimson Desert. Interactive map, skill tree planner, collectible tracker, bestiary, quest log, build planner, and group progress tracking.',
  applicationCategory: 'GameApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  about: {
    '@type': 'VideoGame',
    name: 'Crimson Desert',
    gamePlatform: ['PC', 'PlayStation 5', 'Xbox Series X'],
    publisher: {
      '@type': 'Organization',
      name: 'Pearl Abyss',
    },
    genre: ['Action RPG', 'Open World', 'Fantasy'],
    character: [
      { '@type': 'Thing', name: 'Kliff Macduff', description: 'Versatile mercenary leader of the Greymanes, proficient with sword, shield, bow, and magic.' },
      { '@type': 'Thing', name: 'Damiane', description: 'Agile glass-cannon swashbuckler wielding rapier, pistol, and musket with unmatched dodge speed.' },
      { '@type': 'Thing', name: 'Oongka', description: 'Massive orc brute wielding a two-handed greataxe, specializing in AoE crowd control.' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-pywel-bg text-gray-100">
        {children}
      </body>
    </html>
  );
}
