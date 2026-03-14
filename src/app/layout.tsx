import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Crimson Desert Companion',
  description:
    'Your ultimate companion dashboard for the Crimson Desert game. Track your progress, manage resources, and explore the world.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-pywel-bg text-gray-100">
        {children}
      </body>
    </html>
  );
}
