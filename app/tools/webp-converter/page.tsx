import React from 'react';
import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/toolsData';
import { generatePageMetadata, generateToolJsonLd } from '@/lib/seo';
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb';
import ToolHeader from '@/components/tools/ToolHeader';
import WebpConverterTool from '@/components/tools/WebpConverterTool';
import ToolInstructions from '@/components/tools/ToolInstructions';
import ToolFAQ from '@/components/tools/ToolFAQ';
import ToolAuthorCard from '@/components/tools/ToolAuthorCard';
import RelatedTools from '@/components/tools/RelatedTools';
import { notFound } from 'next/navigation';

const tool = getToolBySlug('webp-converter');

export const metadata: Metadata = generatePageMetadata({
  title: 'Free WebP Converter Online | JPG & PNG to WebP | Vrushali Devlekar',
  description:
    'Convert JPG and PNG images to next-generation WebP format directly in your browser with adjustable compression quality and zero server uploads.',
  path: '/tools/webp-converter',
  keywords: [
    'WebP converter online',
    'convert JPG to WebP',
    'PNG to WebP converter',
    'free image converter browser',
    'next-gen image format',
    'fast WebP conversion',
  ],
});

export default function WebpConverterPage() {
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
          <WebpConverterTool />

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
