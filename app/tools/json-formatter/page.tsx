import React from 'react';
import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/toolsData';
import { generatePageMetadata, generateToolJsonLd } from '@/lib/seo';
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb';
import ToolHeader from '@/components/tools/ToolHeader';
import JsonFormatterTool from '@/components/tools/JsonFormatterTool';
import ToolInstructions from '@/components/tools/ToolInstructions';
import ToolFAQ from '@/components/tools/ToolFAQ';
import ToolAuthorCard from '@/components/tools/ToolAuthorCard';
import RelatedTools from '@/components/tools/RelatedTools';
import { notFound } from 'next/navigation';

const tool = getToolBySlug('json-formatter');

export const metadata: Metadata = generatePageMetadata({
  title: 'Free JSON Formatter & Validator Online | Vrushali Devlekar',
  description:
    'Format, validate, minify, and inspect JSON directly in your browser with this free online JSON formatter with syntax error highlights.',
  path: '/tools/json-formatter',
  keywords: [
    'free online JSON formatter',
    'JSON validator',
    'JSON minifier',
    'format JSON browser',
    'JSON parser online',
    'beautify JSON',
    'JSON syntax validator',
  ],
});

export default function JsonFormatterPage() {
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
          <JsonFormatterTool />

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
