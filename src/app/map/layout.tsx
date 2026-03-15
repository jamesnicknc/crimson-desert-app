import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Map',
  description: 'Explore the interactive Pywel world map with customizable pins. Track bosses, collectibles, NPCs, and points of interest across all regions.',
};

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
