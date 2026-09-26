'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MetaTagGeneratorTool() {
  const [formData, setFormData] = useState({
    title: 'Modern Web Engineering & Open Source Tools',
    description: 'High-performance web applications, distributed systems, and modern developer utilities built with Next.js and TypeScript.',
    canonicalUrl: 'https://vrushali-devlekar.vercel.app',
    author: 'Vrushali Devlekar',
    keywords: 'developer, portfolio, nextjs, react, typescript, open source, tools',
    ogTitle: '',
    ogDescription: '',
    ogImageUrl: 'https://vrushali-devlekar.vercel.app/og-image.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterHandle: '@rushu4miiday',
  });

  const [activePreview, setActivePreview] = useState<'google' | 'twitter' | 'og'>('google');
  const [copied, setCopied] = useState(false);

  const displayOgTitle = formData.ogTitle || formData.title;
  const displayOgDescription = formData.ogDescription || formData.description;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      canonicalUrl: '',
      author: '',
      keywords: '',
      ogTitle: '',
      ogDescription: '',
      ogImageUrl: '',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterHandle: '',
    });
  };

  const handleLoadSample = () => {
    setFormData({
      title: 'DevPulse — Realtime Performance Monitoring for Modern Web Apps',
      description: 'Zero-overhead performance analytics and distributed tracing for modern frontend architectures.',
      canonicalUrl: 'https://example.com/devpulse',
      author: 'Engineering Team',
      keywords: 'monitoring, telemetry, web-vitals, nextjs, performance',
      ogTitle: 'DevPulse — Realtime Performance Telemetry',
      ogDescription: 'Instant Web Vitals analytics with zero-overhead tracing for modern web teams.',
      ogImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      twitterHandle: '@devpulse_app',
    });
  };

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${formData.title || 'Your Website Title'}</title>
<meta name="title" content="${formData.title || 'Your Website Title'}" />
<meta name="description" content="${formData.description || 'Your website description here.'}" />
${formData.keywords ? `<meta name="keywords" content="${formData.keywords}" />\n` : ''}${formData.author ? `<meta name="author" content="${formData.author}" />\n` : ''}<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Canonical Tag -->
<link rel="canonical" href="${formData.canonicalUrl || 'https://yourwebsite.com'}" />

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="${formData.ogType}" />
<meta property="og:url" content="${formData.canonicalUrl || 'https://yourwebsite.com'}" />
<meta property="og:title" content="${displayOgTitle || 'Your Website Title'}" />
<meta property="og:description" content="${displayOgDescription || 'Your website description here.'}" />
${formData.ogImageUrl ? `<meta property="og:image" content="${formData.ogImageUrl}" />\n` : ''}
<!-- Twitter / X -->
<meta name="twitter:card" content="${formData.twitterCard}" />
<meta name="twitter:url" content="${formData.canonicalUrl || 'https://yourwebsite.com'}" />
<meta name="twitter:title" content="${displayOgTitle || 'Your Website Title'}" />
<meta name="twitter:description" content="${displayOgDescription || 'Your website description here.'}" />
${formData.ogImageUrl ? `<meta name="twitter:image" content="${formData.ogImageUrl}" />\n` : ''}${formData.twitterHandle ? `<meta name="twitter:site" content="${formData.twitterHandle}" />\n` : ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#0d0d12]/90 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <i className="ri-code-box-line text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Production Meta Tag Generator</h2>
            <p className="text-xs text-white/50">SEO, OpenGraph, Canonical & Twitter/X card tags</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
          >
            Load Example
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Input Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="title-input" className="text-xs font-mono uppercase tracking-wider text-white/70">
                Page Title <span className="text-pink-400">*</span>
              </label>
              <span
                className={`text-[11px] font-mono ${
                  formData.title.length > 60 ? 'text-amber-400' : 'text-white/40'
                }`}
              >
                {formData.title.length}/60 chars
              </span>
            </div>
            <input
              id="title-input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Acme — High-Performance Cloud Solutions"
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor="description-input" className="text-xs font-mono uppercase tracking-wider text-white/70">
                Meta Description <span className="text-pink-400">*</span>
              </label>
              <span
                className={`text-[11px] font-mono ${
                  formData.description.length > 160 ? 'text-amber-400' : 'text-white/40'
                }`}
              >
                {formData.description.length}/160 chars
              </span>
            </div>
            <textarea
              id="description-input"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Summarize your page content in 150-160 characters for maximum search visibility."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="canonical-input" className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                Canonical URL
              </label>
              <input
                id="canonical-input"
                type="url"
                name="canonicalUrl"
                value={formData.canonicalUrl}
                onChange={handleChange}
                placeholder="https://example.com/page"
                className="w-full px-4 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-xs"
              />
            </div>

            <div>
              <label htmlFor="author-input" className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                Author / Publisher
              </label>
              <input
                id="author-input"
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Vrushali Devlekar"
                className="w-full px-4 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="keywords-input" className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                Keywords (Comma-separated)
              </label>
              <input
                id="keywords-input"
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                placeholder="developer, react, nextjs"
                className="w-full px-4 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-xs"
              />
            </div>

            <div>
              <label htmlFor="og-image-input" className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                OG Image URL (1200×630px)
              </label>
              <input
                id="og-image-input"
                type="url"
                name="ogImageUrl"
                value={formData.ogImageUrl}
                onChange={handleChange}
                placeholder="https://example.com/og.jpg"
                className="w-full px-4 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="twitter-card-select" className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                Twitter Card Type
              </label>
              <select
                id="twitter-card-select"
                name="twitterCard"
                value={formData.twitterCard}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-xs"
              >
                <option value="summary_large_image">Summary Large Image (Recommended)</option>
                <option value="summary">Small Thumbnail Summary</option>
              </select>
            </div>

            <div>
              <label htmlFor="twitter-handle-input" className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-1.5">
                Twitter / X Handle
              </label>
              <input
                id="twitter-handle-input"
                type="text"
                name="twitterHandle"
                value={formData.twitterHandle}
                onChange={handleChange}
                placeholder="@username"
                className="w-full px-4 py-2 rounded-xl bg-[#0a0a0f] border border-white/10 focus:border-pink-500/50 focus:outline-none text-white text-xs"
              />
            </div>
          </div>
        </div>

        {/* Right column: Previews & Code Generator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Simulator Tabs */}
          <div className="p-5 rounded-xl bg-[#0a0a0f] border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-white/60">Live SERP Preview</span>
              <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
                <button
                  onClick={() => setActivePreview('google')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                    activePreview === 'google' ? 'bg-pink-500 text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Google
                </button>
                <button
                  onClick={() => setActivePreview('twitter')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all ${
                    activePreview === 'twitter' ? 'bg-pink-500 text-white' : 'text-white/50 hover:text-white'
                  }`}
                >
                  Twitter / X
                </button>
              </div>
            </div>

            {/* Google SERP Preview */}
            {activePreview === 'google' && (
              <div className="p-4 rounded-lg bg-[#181a1b] border border-white/5 font-sans space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-white/40 truncate">
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    <i className="ri-global-line" />
                  </div>
                  <span className="truncate">{formData.canonicalUrl || 'https://example.com'}</span>
                </div>
                <h4 className="text-base text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug line-clamp-1">
                  {formData.title || 'Your Page Title Preview'}
                </h4>
                <p className="text-xs text-[#bdc1c6] line-clamp-2 leading-relaxed">
                  {formData.description || 'Add your description to see how it appears on Google search results.'}
                </p>
              </div>
            )}

            {/* Twitter / Social Card Preview */}
            {activePreview === 'twitter' && (
              <div className="rounded-xl overflow-hidden bg-black border border-white/15">
                {formData.ogImageUrl ? (
                  <div className="aspect-[1.91/1] w-full bg-black/60 overflow-hidden relative">
                    <img
                      src={formData.ogImageUrl}
                      alt="Social share preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="aspect-[1.91/1] w-full bg-white/5 flex items-center justify-center text-white/30 text-xs font-mono">
                    1200 × 630 OpenGraph Image Placeholder
                  </div>
                )}
                <div className="p-3 space-y-1 bg-[#16181c]">
                  <p className="text-[11px] text-white/40 uppercase font-mono truncate">
                    {formData.canonicalUrl.replace(/^https?:\/\//, '') || 'example.com'}
                  </p>
                  <p className="text-xs font-bold text-white line-clamp-1">{displayOgTitle}</p>
                  <p className="text-[11px] text-white/60 line-clamp-2">{displayOgDescription}</p>
                </div>
              </div>
            )}
          </div>

          {/* Generated HTML code */}
          <div className="p-5 rounded-xl bg-[#0a0a0f] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-pink-400">
                Generated Meta Tags
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-xs shadow-lg shadow-pink-500/20 hover:from-pink-600 hover:to-rose-600 transition-all cursor-pointer"
              >
                <i className={copied ? 'ri-check-line' : 'ri-file-copy-line'} />
                {copied ? 'Copied HTML!' : 'Copy Code'}
              </button>
            </div>

            <pre className="p-3.5 rounded-lg bg-black/60 border border-white/5 text-emerald-400/90 font-mono text-[11px] max-h-64 overflow-y-auto overflow-x-auto leading-relaxed">
              <code>{generatedHtml}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
