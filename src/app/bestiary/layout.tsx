import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bestiary',
  description: 'Comprehensive boss tracker and enemy database. Track defeated bosses, their locations, difficulty levels, and rewards.',
};

export default function BestiaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
