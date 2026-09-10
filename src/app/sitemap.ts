import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { MAPS } from '@/data/maps';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/dashboard/', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/maps/', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/arc/', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/weapons/', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/gear/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/items/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/quests/', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/skills/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/workshop/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/expeditions/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/traders/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/guide/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/planner/', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/builds/', priority: 0.6, changeFrequency: 'daily' as const },
    { path: '/group/', priority: 0.4, changeFrequency: 'daily' as const },
    { path: '/notes/', priority: 0.2, changeFrequency: 'daily' as const },
  ];

  const mapRoutes = MAPS.map((m) => ({
    path: `/maps/${m.slug}/`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }));

  return [...routes, ...mapRoutes].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
