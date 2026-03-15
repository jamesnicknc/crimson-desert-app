import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crafting Recipes',
  description: 'Master all crafting recipes including cooking, alchemy, and blacksmithing recipes available in the Crimson Desert.',
};

export default function CraftingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
