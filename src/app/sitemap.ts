import type { MetadataRoute } from 'next';

const BASE_URL = 'https://crimsoncompanionapp.us';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/dashboard/', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/map/', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/characters/', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/skills/', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/collectibles/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/quests/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/bestiary/', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/weapons/', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/crafting/', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/planner/', priority: 0.6, changeFrequency: 'weekly' as const },
    { path: '/notes/', priority: 0.3, changeFrequency: 'daily' as const },
    { path: '/group/', priority: 0.5, changeFrequency: 'daily' as const },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
