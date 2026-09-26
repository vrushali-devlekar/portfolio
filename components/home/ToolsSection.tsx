'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FEATURED_TOOLS, ToolItem } from '@/lib/toolsData';

export default function ToolsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#070709] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
              <i className="ri-tools-fill" />
              Developer Tools Hub
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Useful Things I&apos;ve Built
            </h2>
            <p className="text-sm sm:text-base text-white/60">
              Beyond client projects, I build small tools that solve everyday problems for developers and creators.
            </p>
          </div>

          <Link
            href="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs transition-all hover:border-blue-500/40 group w-fit cursor-pointer"
          >
            <span>Explore all tools</span>
            <i className="ri-arrow-right-line text-blue-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_TOOLS.map((tool: ToolItem, index: number) => (
            <motion.div
              key={tool.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={tool.href}
                className="group block h-full p-5 rounded-2xl bg-[#0d0d12]/80 hover:bg-[#12121a] border border-white/10 hover:border-blue-500/40 transition-all duration-300 shadow-lg relative overflow-hidden"
              >
                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-amber-400 group-hover:text-amber-300 group-hover:scale-105 flex items-center justify-center text-xl transition-all">
                    <i className={tool.iconName} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/5">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors mb-1.5 flex items-center justify-between">
                  <span>{tool.shortName}</span>
                  <i className="ri-arrow-right-up-line text-xs text-white/30 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>

                <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4">
                  {tool.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span className="text-emerald-400/90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Browser native
                  </span>
                  <span className="text-amber-400 group-hover:underline">Open tool →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
