import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weapons Guide',
  description: 'Complete weapons guide for all characters with detailed stats. Compare weapons, plan loadouts, and master your arsenal.',
};

export default function WeaponsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
