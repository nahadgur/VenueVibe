import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard', '/host/', '/list-venue'],
      },
    ],
    sitemap: 'https://venuevibe.com/sitemap.xml',
  };
}
