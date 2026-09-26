import React from 'react';
import { Metadata } from 'next';
import { TOOLS } from '@/lib/toolsData';
import ToolCard from '@/components/tools/ToolCard';
import { generatePageMetadata, generateCollectionPageSchema } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = generatePageMetadata({
  title: 'Developer Tools — Free Online Tools & Utilities | Vrushali Devlekar',
  description:
    'Free online developer tools: format & validate JSON, compress images, convert WebP, generate multi-resolution favicons, create SEO meta tags, and beam files peer-to-peer.',
  path: '/tools',
  keywords: [
    'developer tools',
    'free online tools',
    'JSON formatter',
    'image compressor',
    'WebP converter',
    'favicon generator',
    'meta tag generator',
    'file beam',
    'web utilities',
    'client-side tools',
  ],
});

export default function ToolsHubPage() {
  const collectionSchema = generateCollectionPageSchema({
    title: 'Developer Tools — Free Online Tools & Utilities',
    description: 'A curated collection of small, fast, browser-friendly tools for developers, designers, and creators.',
    url: 'https://vrushali-devlekar.vercel.app/tools',
    items: TOOLS.map((t) => ({
      name: t.shortName,
      url: `https://vrushali-devlekar.vercel.app${t.href}`,
      description: t.description,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <main className="min-h-screen bg-[#070709] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-400 select-none">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <i className="ri-home-4-line text-xs" />
              <span>Home</span>
            </Link>
            <span className="text-zinc-600">/</span>
            <span className="text-amber-400 font-semibold" aria-current="page">
              Tools Hub
            </span>
          </nav>

          {/* Hero Header */}
          <div className="space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <i className="ri-tools-fill" />
              100% Client-Side Processing • Zero Data Uploads
            </div>

            <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Tools I Build for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Developers</span>
            </h1>

            <p className="text-base sm:text-lg text-white/60 leading-relaxed">
              Small, fast, browser-friendly tools for developers, designers, and creators. All utilities execute locally in your browser memory for uncompromising privacy and zero latency.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>

          {/* Why browser-native tools? */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                <i className="ri-shield-check-line" />
              </div>
              <h2 className="text-xl font-semibold text-white">Why Client-Side Only?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">No Cloud Transmission</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Your source code, proprietary JSON, and private images never leave your machine or touch a server backend.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Zero Latency & No Rate Limits</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Powered by native WebAssembly and HTML5 Canvas APIs, all computations occur instantly at wire speed.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-white">Open & Transparent</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Built as real engineering experiments demonstrating modern browser capabilities and standards.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
              <span>Have a tool suggestion or need a bespoke web app?</span>
              <Link
                href="/contact"
                className="text-blue-400 hover:text-blue-300 font-mono font-medium underline underline-offset-4"
              >
                Get in touch with Vrushali →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
