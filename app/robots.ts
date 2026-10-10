import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alotmedia.com';

export default function robots(): MetadataRoute.Robots {
  // Preview deployments stay out of search results; set ALLOW_INDEXING=1 on production.
  const allow = process.env.ALLOW_INDEXING === '1';
  return {
    rules: allow ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: new URL('/sitemap.xml', SITE_URL).toString(),
  };
}
