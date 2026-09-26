'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedFavicon {
  size: number;
  label: string;
  filename: string;
  blob: Blob;
  url: string;
}

const FAVICON_SPECS = [
  { size: 16, label: 'Standard Browser Tab', filename: 'favicon-16x16.png' },
  { size: 32, label: 'Retina / Desktop Shortcut', filename: 'favicon-32x32.png' },
  { size: 48, label: 'Windows Taskbar / Desktop', filename: 'favicon-48x48.png' },
  { size: 180, label: 'Apple Touch Icon (iOS)', filename: 'apple-touch-icon.png' },
  { size: 192, label: 'Android Chrome / PWA', filename: 'android-chrome-192x192.png' },
  { size: 512, label: 'PWA Splash Screen', filename: 'android-chrome-512x512.png' },
];

export default function FaviconGeneratorTool() {
  const [sourceImage, setSourceImage] = useState<{ file: File; url: string } | null>(null);
  const [generatedIcons, setGeneratedIcons] = useState<GeneratedFavicon[]>([]);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateFavicons = useCallback((file: File) => {
    setErrorMessage(null);
    setIsGenerating(true);

    if (!['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(file.type)) {
      setErrorMessage('Unsupported image format. Please upload a PNG, JPG, or SVG.');
      setIsGenerating(false);
      return;
    }

    const sourceUrl = URL.createObjectURL(file);
    const img = new Image();
    img.src = sourceUrl;

    img.onload = async () => {
      setSourceImage({ file, url: sourceUrl });

      const icons: GeneratedFavicon[] = [];

      for (const spec of FAVICON_SPECS) {
        const canvas = document.createElement('canvas');
        canvas.width = spec.size;
        canvas.height = spec.size;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, spec.size, spec.size);

          await new Promise<void>((resolve) => {
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                icons.push({
                  size: spec.size,
                  label: spec.label,
                  filename: spec.filename,
                  blob,
                  url,
                });
              }
              resolve();
            }, 'image/png');
          });
        }
      }

      setGeneratedIcons(icons);
      setIsGenerating(false);
    };

    img.onerror = () => {
      setErrorMessage('Could not load source image. Please choose another file.');
      setIsGenerating(false);
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      generateFavicons(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    if (sourceImage) URL.revokeObjectURL(sourceImage.url);
    generatedIcons.forEach((i) => URL.revokeObjectURL(i.url));
    setSourceImage(null);
    setGeneratedIcons([]);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadIcon = (icon: GeneratedFavicon) => {
    const a = document.createElement('a');
    a.href = icon.url;
    a.download = icon.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    generatedIcons.forEach((icon, index) => {
      setTimeout(() => downloadIcon(icon), index * 200);
    });
  };

  const htmlSnippet = `<!-- Standard Favicons -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

<!-- Apple Touch Icon (iOS) -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

<!-- Web App Manifest (Android / PWA) -->
<link rel="manifest" href="/site.webmanifest" />`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="w-full bg-[#0d0d12]/90 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <i className="ri-star-smile-line text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Browser Favicon Generator</h2>
            <p className="text-xs text-white/50">Multi-resolution icons for Web, iOS, Android & PWA</p>
          </div>
        </div>

        {sourceImage && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
          >
            <i className="ri-restart-line" />
            Upload New Image
          </button>
        )}
      </div>

      {/* Error message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-sm"
          >
            <i className="ri-error-warning-line text-lg flex-shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Zone */}
      {!sourceImage ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-6 border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-amber-500 bg-amber-500/10 scale-[0.99]'
              : 'border-white/15 bg-[#0a0a0f]/60 hover:border-amber-500/50 hover:bg-white/[0.02]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                generateFavicons(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 text-3xl">
            <i className="ri-image-add-line" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
            Drag & drop logo or graphic, or <span className="text-amber-400 underline underline-offset-4">browse</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto mb-4">
            Recommend square 512×512px PNG for best quality across all desktop and mobile icon sizes.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <i className="ri-shield-keyhole-line text-amber-400" />
            100% Client-side generation — Zero server uploads
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-8">
          {/* Browser Tab Live Simulator */}
          <div className="p-4 sm:p-6 rounded-xl bg-[#070709] border border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-white/50 block">
              Live Browser Tab Simulation
            </span>

            {/* Mock browser top chrome */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#121218]">
              <div className="px-4 py-2 bg-[#1a1a24] border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                {/* Active Tab */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-t-lg bg-[#121218] border-t border-x border-white/10 text-xs text-white max-w-xs truncate shadow-sm">
                  {generatedIcons.find((i) => i.size === 32)?.url && (
                    <img
                      src={generatedIcons.find((i) => i.size === 32)?.url}
                      alt="Tab Icon"
                      className="w-4 h-4 rounded-sm object-contain"
                    />
                  )}
                  <span className="truncate font-medium">Your Website Title — Free Online Tool</span>
                  <i className="ri-close-line text-white/40 text-xs ml-auto" />
                </div>
              </div>
              <div className="p-3 bg-[#121218] flex items-center gap-2 text-xs font-mono text-white/40 border-b border-white/5">
                <i className="ri-lock-fill text-emerald-400 text-xs" />
                <span>https://yourwebsite.com</span>
              </div>
            </div>
          </div>

          {/* Generated Icons Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">
                Generated Favicon Assets ({generatedIcons.length})
              </h3>
              <button
                onClick={downloadAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xs shadow-lg shadow-amber-500/20 hover:from-amber-600 hover:to-orange-600 transition-all cursor-pointer"
              >
                <i className="ri-download-cloud-line text-sm" />
                Download All Icons
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {generatedIcons.map((icon) => (
                <div
                  key={icon.filename}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center flex-shrink-0"
                      style={{ width: Math.max(36, Math.min(56, icon.size)), height: Math.max(36, Math.min(56, icon.size)) }}
                    >
                      <img src={icon.url} alt={icon.label} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate font-mono">{icon.filename}</p>
                      <p className="text-[11px] text-white/50 truncate">{icon.label}</p>
                      <span className="text-[10px] font-mono text-amber-400">{icon.size} × {icon.size}px</span>
                    </div>
                  </div>

                  <button
                    onClick={() => downloadIcon(icon)}
                    title={`Download ${icon.filename}`}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 hover:border-amber-400 text-white/70 flex items-center justify-center text-sm transition-all flex-shrink-0 cursor-pointer"
                  >
                    <i className="ri-download-line" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* HTML Snippet & Placement Guide */}
          <div className="p-5 rounded-xl bg-[#0a0a0f] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-white/70">
                HTML Embed Snippet (Paste into &lt;head&gt;)
              </span>
              <button
                onClick={handleCopySnippet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs font-mono transition-all cursor-pointer"
              >
                <i className={copiedCode ? 'ri-check-line text-emerald-400' : 'ri-file-copy-line'} />
                {copiedCode ? 'Copied HTML!' : 'Copy HTML'}
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-black/60 border border-white/5 text-emerald-400/90 font-mono text-xs overflow-x-auto">
              <code>{htmlSnippet}</code>
            </pre>

            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-white/60 space-y-2">
              <p className="font-semibold text-white flex items-center gap-1.5">
                <i className="ri-information-line text-amber-400" />
                Where should I place these files?
              </p>
              <p>
                Place the downloaded image files directly into the root public directory of your website (e.g. <code className="text-amber-300 font-mono">/public/</code> in Next.js, Vite, or Gatsby), then copy and paste the snippet above inside your root HTML layout document's <code className="text-amber-300 font-mono">&lt;head&gt;</code> tag.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
