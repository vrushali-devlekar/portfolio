import type { Metadata } from "next";
import { ToolItem, ToolFAQ } from "./toolsData";

export const BASE_URL = "https://vrushali-devlekar.vercel.app";

export function generatePageMetadata({
  title,
  description,
  path,
  keywords = [],
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImageUrl = `${BASE_URL}/og-image.jpg`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Vrushali Devlekar", url: BASE_URL }],
    creator: "Vrushali Devlekar",
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Vrushali Devlekar — Developer Tools",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${title} | Vrushali Devlekar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vrushali_i",
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export function generateToolMetadata(tool: ToolItem): Metadata {
  return generatePageMetadata({
    title: tool.seo.title,
    description: tool.seo.description,
    path: tool.href,
    keywords: tool.seo.keywords,
  });
}

export function generateToolPageSchema(tool: ToolItem) {
  const url = `${BASE_URL}${tool.href}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    url: url,
    description: tool.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Vrushali Devlekar",
      url: BASE_URL,
    },
  };
}

export function generateFAQSchema(faqs: ToolFAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateCollectionPageSchema({
  title,
  description,
  url,
  items,
}: {
  title: string;
  description: string;
  url: string;
  items: { name: string; url: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: url,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: item.url,
        description: item.description,
      })),
    },
    author: {
      "@type": "Person",
      name: "Vrushali Devlekar",
      url: BASE_URL,
    },
  };
}

export function generateToolJsonLd(tool: ToolItem) {
  const url = `${BASE_URL}${tool.href}`;

  const webAppSchema = generateToolPageSchema(tool);
  const faqSchema = generateFAQSchema(tool.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BASE_URL },
    { name: "Developer Tools", url: `${BASE_URL}/tools` },
    { name: tool.shortName, url: url },
  ]);

  return [webAppSchema, faqSchema, breadcrumbSchema];
}

export function generateToolsHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Developer Tools — Free Online Tools by Vrushali Devlekar",
    description: "Small, fast, browser-friendly tools for developers, designers, and creators.",
    url: `${BASE_URL}/tools`,
    isPartOf: {
      "@type": "WebSite",
      name: "Vrushali Devlekar Portfolio & Developer Tools",
      url: BASE_URL,
    },
    author: {
      "@type": "Person",
      name: "Vrushali Devlekar",
      url: BASE_URL,
    },
  };
}
