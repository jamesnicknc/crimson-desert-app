import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Personal notes feature for documenting your adventure, strategies, and discoveries in the Crimson Desert.',
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
