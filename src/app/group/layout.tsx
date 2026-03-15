import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Group Progress',
  description: 'Group tracking feature to compare progress with friends. Create or join groups to compete and collaborate.',
};

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
