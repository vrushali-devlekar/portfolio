'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WebpItem {
  id: string;
  originalFile: File;
  originalSize: number;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  webpBlob: Blob | null;
  webpSize: number;
  webpUrl: string | null;
  status: 'pending' | 'converting' | 'done' | 'error';
  errorMsg?: string;
}

export default function WebpConverterTool() {
  const [items, setItems] = useState<WebpItem[]>([]);
  const [quality, setQuality] = useState<number>(85);
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

  const convertSingle = useCallback((file: File, q: number): Promise<WebpItem> => {
    return new Promise((resolve) => {
      const id = Math.random().toString(36).substring(2, 9);
      const originalUrl = URL.createObjectURL(file);

      const img = new Image();
      img.src = originalUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          resolve({
            id,
            originalFile: file,
            originalSize: file.size,
            originalUrl,
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight,
            webpBlob: null,
            webpSize: 0,
            webpUrl: null,
            status: 'error',
            errorMsg: 'Canvas context error',
          });
          return;
        }

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve({
                id,
                originalFile: file,
                originalSize: file.size,
                originalUrl,
                originalWidth: img.naturalWidth,
                originalHeight: img.naturalHeight,
                webpBlob: null,
                webpSize: 0,
                webpUrl: null,
                status: 'error',
                errorMsg: 'WebP conversion failed',
              });
              return;
            }

            const webpUrl = URL.createObjectURL(blob);
            resolve({
              id,
              originalFile: file,
              originalSize: file.size,
              originalUrl,
              originalWidth: img.naturalWidth,
              originalHeight: img.naturalHeight,
              webpBlob: blob,
              webpSize: blob.size,
              webpUrl,
              status: 'done',
            });
          },
          'image/webp',
          q / 100
        );
      };

      img.onerror = () => {
        resolve({
          id,
          originalFile: file,
          originalSize: file.size,
          originalUrl,
          originalWidth: 0,
          originalHeight: 0,
          webpBlob: null,
          webpSize: 0,
          webpUrl: null,
          status: 'error',
          errorMsg: 'Unable to load image file',
        });
      };
    });
  }, []);

  const handleFiles = async (files: FileList | File[]) => {
    setErrorMessage(null);
    const validFiles: File[] = [];

    Array.from(files).forEach((file) => {
      if (['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        if (file.size <= 25 * 1024 * 1024) {
          validFiles.push(file);
        }
      }
    });

    if (validFiles.length === 0) {
      setErrorMessage('Please provide JPG or PNG images under 25MB.');
      return;
    }

    const convertedItems = await Promise.all(validFiles.map((f) => convertSingle(f, quality)));
    setItems((prev) => [...prev, ...convertedItems]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleQualityChange = async (newQuality: number) => {
    setQuality(newQuality);
    if (items.length > 0) {
      const updated = await Promise.all(
        items.map(async (item) => {
          const res = await convertSingle(item.originalFile, newQuality);
          return { ...res, id: item.id };
        })
      );
      setItems(updated);
    }
  };

  const handleReset = () => {
    items.forEach((item) => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.webpUrl) URL.revokeObjectURL(item.webpUrl);
    });
    setItems([]);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const downloadItem = (item: WebpItem) => {
    if (!item.webpUrl) return;
    const baseName = item.originalFile.name.replace(/\.[^/.]+$/, '');
    const a = document.createElement('a');
    a.href = item.webpUrl;
    a.download = `${baseName}.webp`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    items.forEach((item, index) => {
      if (item.webpUrl) {
        setTimeout(() => downloadItem(item), index * 200);
      }
    });
  };

  const totalOriginal = items.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalConverted = items.reduce((acc, curr) => acc + curr.webpSize, 0);
  const totalSavings = totalOriginal > 0 ? Math.max(0, Math.round(((totalOriginal - totalConverted) / totalOriginal) * 100)) : 0;

  return (
    <div className="w-full bg-[#0d0d12]/90 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-xl shadow-2xl">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <i className="ri-file-transfer-line text-xl" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Browser WebP Converter</h2>
            <p className="text-xs text-white/50">Convert JPG and PNG to modern next-gen WebP</p>
          </div>
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs font-mono transition-all"
            >
              Clear All
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-mono transition-all"
            >
              + Add More
            </button>
          </div>
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

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mt-6 border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? 'border-cyan-500 bg-cyan-500/10 scale-[0.99]'
            : 'border-white/15 bg-[#0a0a0f]/60 hover:border-cyan-500/50 hover:bg-white/[0.02]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files);
            }
          }}
        />
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto mb-3 text-2xl">
          <i className="ri-folder-zip-line" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
          Drag & drop images, or <span className="text-cyan-400 underline underline-offset-4">browse</span>
        </h3>
        <p className="text-xs sm:text-sm text-white/50 max-w-md mx-auto mb-3">
          Batch conversion supported. Converts JPG and PNG images instantly into lightweight WebP format.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-white/60">
          <i className="ri-lock-line text-cyan-400" />
          Processed locally in your browser memory
        </div>
      </div>

      {/* Controls & Items List */}
      {items.length > 0 && (
        <div className="mt-8 space-y-6">
          {/* Quality Slider & Overall Summary */}
          <div className="p-5 rounded-xl bg-[#0a0a0f] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="webp-quality-slider" className="text-xs font-mono uppercase tracking-wider text-white/70">
                  WebP Quality: <span className="text-cyan-400 font-bold">{quality}%</span>
                </label>
                <span className="text-[11px] text-white/40">
                  {quality >= 90 ? 'Near-Lossless' : quality >= 75 ? 'Optimal Web' : 'Ultra Compact'}
                </span>
              </div>
              <input
                id="webp-quality-slider"
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => handleQualityChange(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div>
                <span className="text-[11px] font-mono text-white/40 block">Total Saved</span>
                <span className="text-lg font-semibold text-cyan-400 font-mono">
                  {formatBytes(Math.max(0, totalOriginal - totalConverted))} (-{totalSavings}%)
                </span>
              </div>
              <button
                onClick={downloadAll}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-600 transition-all cursor-pointer"
              >
                <i className="ri-download-cloud-line text-base" />
                Download All ({items.length})
              </button>
            </div>
          </div>

          {/* Converted Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => {
              const itemSavings =
                item.originalSize > 0
                  ? Math.max(0, Math.round(((item.originalSize - item.webpSize) / item.originalSize) * 100))
                  : 0;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-black/40 border border-white/10 flex-shrink-0 flex items-center justify-center p-1">
                      {item.webpUrl ? (
                        <img src={item.webpUrl} alt="WebP preview" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <i className="ri-image-line text-white/30 text-xl" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-white truncate">{item.originalFile.name}</p>
                      <p className="text-[11px] font-mono text-white/40">
                        {item.originalWidth} × {item.originalHeight}px
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] font-mono">
                        <span className="text-white/50">{formatBytes(item.originalSize)}</span>
                        <i className="ri-arrow-right-line text-cyan-400" />
                        <span className="text-cyan-400 font-bold">{formatBytes(item.webpSize)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                      -{itemSavings}% reduction
                    </span>
                    <button
                      onClick={() => downloadItem(item)}
                      className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                    >
                      <i className="ri-download-line" />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
