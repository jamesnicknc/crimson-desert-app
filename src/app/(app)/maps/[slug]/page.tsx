import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { MAPS } from '@/lib/game-data';
import MapDetail from './MapDetail';

export function generateStaticParams() {
  return MAPS.map((m) => ({ slug: m.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const map = MAPS.find((m) => m.slug === params.slug);
  return { title: map ? `${map.name} Map` : 'Map' };
}

export default function MapPage({ params }: { params: { slug: string } }) {
  const map = MAPS.find((m) => m.slug === params.slug);
  if (!map) notFound();
  return (
    <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
      <MapDetail slug={map.slug} />
    </Suspense>
  );
}
