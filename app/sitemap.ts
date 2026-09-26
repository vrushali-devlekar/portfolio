import { MetadataRoute } from 'next';
import { TOOLS_LIST } from '@/lib/toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vrushali-devlekar.vercel.app';
  const currentDate = new Date();

  // Core portfolio routes
  const mainRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Tool specific routes
  const toolRoutes: MetadataRoute.Sitemap = TOOLS_LIST.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...mainRoutes, ...toolRoutes];
}
