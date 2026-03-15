import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skill Trees',
  description: 'Plan and track your skill tree progression for all three playable characters. Master abilities and plan your optimal build strategy.',
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
