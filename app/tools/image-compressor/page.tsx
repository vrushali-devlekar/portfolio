import React from 'react';
import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/toolsData';
import { generatePageMetadata, generateToolJsonLd } from '@/lib/seo';
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb';
import ToolHeader from '@/components/tools/ToolHeader';
import ImageCompressorTool from '@/components/tools/ImageCompressorTool';
import ToolInstructions from '@/components/tools/ToolInstructions';
import ToolFAQ from '@/components/tools/ToolFAQ';
import ToolAuthorCard from '@/components/tools/ToolAuthorCard';
import RelatedTools from '@/components/tools/RelatedTools';
import { notFound } from 'next/navigation';

const tool = getToolBySlug('image-compressor');

export const metadata: Metadata = generatePageMetadata({
  title: 'Free Image Compressor Online | JPG, PNG & WebP | Vrushali Devlekar',
  description:
    'Compress JPG, PNG, and WebP images directly in your browser with adjustable quality and instant download. Fast, secure, zero server uploads.',
  path: '/tools/image-compressor',
  keywords: [
    'free image compressor online',
    'compress JPG browser',
    'PNG compressor',
    'WebP image reducer',
    'client-side image compression',
    'reduce image file size online',
  ],
});

export default function ImageCompressorPage() {
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
          <ImageCompressorTool />

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
