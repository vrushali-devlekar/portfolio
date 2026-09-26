import React from 'react';
import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/toolsData';
import { generatePageMetadata, generateToolJsonLd } from '@/lib/seo';
import ToolBreadcrumb from '@/components/tools/ToolBreadcrumb';
import ToolHeader from '@/components/tools/ToolHeader';
import FileBeamTool from '@/components/tools/FileBeamTool';
import ToolInstructions from '@/components/tools/ToolInstructions';
import ToolFAQ from '@/components/tools/ToolFAQ';
import ToolAuthorCard from '@/components/tools/ToolAuthorCard';
import RelatedTools from '@/components/tools/RelatedTools';
import { notFound } from 'next/navigation';

const tool = getToolBySlug('file-beam');

export const metadata: Metadata = generatePageMetadata({
  title: 'File Beam — Zero-Cloud P2P File & Clipboard Transfer Online | Vrushali Devlekar',
  description:
    'Send files and clipboard text directly between nearby devices in your browser with zero cloud storage, WebRTC peer-to-peer connection, and end-to-end encryption.',
  path: '/tools/file-beam',
  keywords: [
    'file beam browser',
    'peer to peer file sharing web',
    'transfer files local network',
    'zero cloud file transfer',
    'WebRTC clipboard sharing',
    'browser to browser transfer',
  ],
});

export default function FileBeamPage() {
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
          <FileBeamTool />

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
