import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collectibles Tracker',
  description: 'Track all collectibles including artifacts, gears, recipes, lore items, and fast travel points across the Crimson Desert.',
};

export default function CollectiblesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
