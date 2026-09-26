import React from 'react';
import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/toolsData';
import { generatePageMetadata, generateToolJsonLd } from '@/lib/seo';
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb';
import ToolHeader from '@/components/tools/ToolHeader';
import MetaTagGeneratorTool from '@/components/tools/MetaTagGeneratorTool';
import ToolInstructions from '@/components/tools/ToolInstructions';
import ToolFAQ from '@/components/tools/ToolFAQ';
import ToolAuthorCard from '@/components/tools/ToolAuthorCard';
import RelatedTools from '@/components/tools/RelatedTools';
import { notFound } from 'next/navigation';

const tool = getToolBySlug('meta-tag-generator');

export const metadata: Metadata = generatePageMetadata({
  title: 'Free Meta Tag Generator Online | SEO & Open Graph Tags | Vrushali Devlekar',
  description:
    'Generate SEO, Open Graph, and Twitter/X social media meta tags with live Google and social card previews. Production-ready HTML code in one click.',
  path: '/tools/meta-tag-generator',
  keywords: [
    'meta tag generator online',
    'open graph tags generator',
    'twitter card generator',
    'SEO meta tags generator',
    'HTML head tags tool',
    'social media meta preview',
  ],
});

export default function MetaTagGeneratorPage() {
  if (!tool) notFound();

  const schemas = generateToolJsonLd(tool);

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="min-h-screen bg-[#070709] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Breadcrumbs */}
          <ToolBreadcrumb currentName={tool.shortName} />

          {/* Header */}
          <ToolHeader
            title={tool.title}
            category={tool.category}
            badge={tool.badge}
            description={tool.description}
          />

          {/* Interactive Tool */}
          <MetaTagGeneratorTool />

          {/* Instructions & Features */}
          <ToolInstructions
            toolName={tool.shortName}
            instructions={tool.instructions}
            features={tool.features}
          />

          {/* FAQs */}
          <ToolFAQ faqs={tool.faqs} toolName={tool.shortName} />

          {/* Trust / Author Card */}
          <ToolAuthorCard githubUrl={tool.githubUrl} />

          {/* Related Tools */}
          <RelatedTools currentSlug={tool.slug} />
        </div>
      </main>
    </>
  );
}
