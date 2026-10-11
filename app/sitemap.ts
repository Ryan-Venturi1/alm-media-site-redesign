import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alotmedia.com';

const ROUTES = [
  '/', '/advertisers', '/formats', '/events', '/real-estate', '/locations',
  '/investors', '/company', '/insights', '/plan', '/contact',
  '/privacy-policy', '/terms-conditions',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/privacy') || path.startsWith('/terms') ? 0.2 : 0.7,
  }));
}
