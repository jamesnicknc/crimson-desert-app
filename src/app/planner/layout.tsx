import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Planner',
  description: 'Theorycrafting tool for building optimal character builds. Select skills, weapons, and gears to plan your perfect loadout.',
};

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
