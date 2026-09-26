'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompressedImageState {
  originalFile: File;
  originalSize: number;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  compressedBlob: Blob | null;
  compressedSize: number;
  compressedUrl: string | null;
  quality: number;
  format: 'image/jpeg' | 'image/png' | 'image/webp';
  isProcessing: boolean;
}

export default function ImageCompressorTool() {
  const [imageState, setImageState] = useState<CompressedImageState | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processImage = useCallback(
    async (file: File, targetQuality: number, targetFormat: 'image/jpeg' | 'image/png' | 'image/webp') => {
      setErrorMessage(null);

      // Validate format
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrorMessage('Unsupported file format. Please upload a JPG, PNG, or WebP image.');
        return;
      }

      // Validate size (max 25MB for client canvas safety)
      if (file.size > 25 * 1024 * 1024) {
        setErrorMessage('File size exceeds 25MB. Please choose a smaller image for browser processing.');
        return;
      }

      const originalUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = originalUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          setErrorMessage('Failed to initialize canvas context for compression.');
          return;
        }

        // Fill background with white for JPEG if transparent PNG is provided
        if (targetFormat === 'image/jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setErrorMessage('Image compression failed.');
              return;
            }

            const compressedUrl = URL.createObjectURL(blob);

            setImageState({
              originalFile: file,
              originalSize: file.size,
              originalUrl,
              originalWidth: img.naturalWidth,
              originalHeight: img.naturalHeight,
              compressedBlob: blob,
              compressedSize: blob.size,
              compressedUrl,
              quality: targetQuality,
              format: targetFormat,
              isProcessing: false,
            });
          },
          targetFormat,
          targetQuality / 100
        );
      };

      img.onerror = () => {
        setErrorMessage('Could not load the provided image file. Please try another image.');
      };
    },
    []
  );

  const handleFile = (file: File) => {
    // Choose format matching source or default to JPEG
    const initialFormat = file.type === 'image/png' ? 'image/png' : file.type === 'image/webp' ? 'image/webp' : 'image/jpeg';
    setFormat(initialFormat);
    processImage(file, quality, initialFormat);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (imageState) {
      processImage(imageState.originalFile, newQuality, format);
    }
  };

  const handleFormatChange = (newFormat: 'image/jpeg' | 'image/png' | 'image/webp') => {
    setFormat(newFormat);
    if (imageState) {
      processImage(imageState.originalFile, quality, newFormat);
    }
  };

  const handleReset = () => {
    if (imageState) {
      URL.revokeObjectURL(imageState.originalUrl);
      if (imageState.compressedUrl) URL.revokeObjectURL(imageState.compressedUrl);
    }
    setImageState(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDownload = () => {
    if (!imageState || !imageState.compressedUrl) return;
    const extension = format === 'image/jpeg' ? 'jpg' : format === 'image/png' ? 'png' : 'webp';
    const originalName = imageState.originalFile.name.replace(/\.[^/.]+$/, '');
    const a = document.createElement('a');
    a.href = imageState.compressedUrl;
    a.download = `${originalName}-compressed.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const savingsPercent = imageState
    ? Math.max(0, Math.round(((imageState.originalSize - imageState.compressedSize) / imageState.originalSize) * 100))
    : 0;

  return (
    <div className="w-full bg-[#0d0d12]/90 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <i className="ri-image-edit-line text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Browser Image Compressor</h2>
            <p className="text-xs text-white/50">Lossy & Lossless Web-native compression</p>
          </div>
        </div>

        {imageState && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
          >
            <i className="ri-restart-line" />
            Upload New Image
          </button>
        )}
      </div>

      {/* Error display */}
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

      {/* Upload Dropzone */}
      {!imageState ? (
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
              ? 'border-purple-500 bg-purple-500/10 scale-[0.99]'
              : 'border-white/15 bg-[#0a0a0f]/60 hover:border-purple-500/50 hover:bg-white/[0.02]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4 text-3xl">
            <i className="ri-upload-cloud-2-line" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
            Drag & drop your image here, or <span className="text-purple-400 underline underline-offset-4">browse</span>
          </h3>
          <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto mb-4">
            Supports JPG, PNG, and WebP up to 25MB. Processed entirely inside your browser.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60">
            <i className="ri-shield-check-line text-emerald-400" />
            Zero server uploads — 100% private
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          {/* Compression Controls Bar */}
          <div className="p-5 rounded-xl bg-[#0a0a0f] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quality Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="quality-slider" className="text-xs font-mono uppercase tracking-wider text-white/70">
                  Compression Quality: <span className="text-purple-400 font-bold">{quality}%</span>
                </label>
                <span className="text-[11px] text-white/40">
                  {quality > 85 ? 'High Fidelity' : quality > 60 ? 'Balanced' : 'Aggressive'}
                </span>
              </div>
              <input
                id="quality-slider"
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/30 font-mono mt-1">
                <span>10% (Smallest)</span>
                <span>80% (Recommended)</span>
                <span>100% (Lossless)</span>
              </div>
            </div>

            {/* Target Output Format */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-white/70 block mb-2">
                Output Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['image/jpeg', 'image/png', 'image/webp'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => handleFormatChange(fmt)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      format === fmt
                        ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {fmt.replace('image/', '').toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Size Comparison Metrics Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-white/50 block">Original Size</span>
              <span className="text-lg font-semibold text-white font-mono mt-1 block">
                {formatBytes(imageState.originalSize)}
              </span>
              <span className="text-[11px] text-white/40 font-mono">
                {imageState.originalWidth} × {imageState.originalHeight}px
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-[11px] font-mono text-white/50 block">Compressed Size</span>
              <span className="text-lg font-semibold text-emerald-400 font-mono mt-1 block">
                {formatBytes(imageState.compressedSize)}
              </span>
              <span className="text-[11px] text-emerald-400/70 font-mono">
                {format.replace('image/', '').toUpperCase()} format
              </span>
            </div>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-purple-300/80 block">Reduction</span>
                <span className="text-2xl font-bold text-purple-300 font-mono mt-0.5 block">
                  -{savingsPercent}%
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300 text-2xl">
                <i className="ri-flashlight-line" />
              </div>
            </div>
          </div>

          {/* Before & After Previews */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-white/60">Original Preview</span>
                <span className="text-xs font-mono text-white/40">{imageState.originalFile.name}</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#070709] aspect-video flex items-center justify-center p-2">
                <img
                  src={imageState.originalUrl}
                  alt="Original preview"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400">Compressed Output</span>
                <span className="text-xs font-mono text-emerald-400">Ready to download</span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-purple-500/30 bg-[#070709] aspect-video flex items-center justify-center p-2">
                {imageState.compressedUrl && (
                  <img
                    src={imageState.compressedUrl}
                    alt="Compressed output preview"
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/50 flex items-center gap-2">
              <i className="ri-check-double-line text-emerald-400" />
              Saved {formatBytes(Math.max(0, imageState.originalSize - imageState.compressedSize))} of bandwidth
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-500/25 hover:from-purple-600 hover:to-indigo-600 transition-all cursor-pointer"
            >
              <i className="ri-download-2-line text-lg" />
              Download Compressed Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
