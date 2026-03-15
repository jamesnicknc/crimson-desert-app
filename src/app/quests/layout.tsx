import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quest Log',
  description: 'Track your quest progress through main story quests, side missions, and faction quests in the Crimson Desert.',
};

export default function QuestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
