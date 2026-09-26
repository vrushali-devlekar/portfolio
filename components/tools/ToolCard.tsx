"use client";

import Link from "next/link";
import { ToolItem } from "@/lib/toolsData";

interface Props {
  tool: ToolItem;
}

export default function ToolCard({ tool }: Props) {
  return (
    <Link
      href={tool.href}
      className="group relative rounded-3xl bg-[#0f1015] border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-[#f5b907]/40 hover:-translate-y-1 hover:shadow-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={`Open ${tool.title}`}
    >
      {/* Ambient hover glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-[#f5b907]/30 transition-all duration-300">
            <i className={`${tool.iconName} text-xl`} />
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/[0.03] text-zinc-400 border border-white/5">
            {tool.category}
          </span>
        </div>

        {/* Title and Short Description */}
        <div>
          <h3 className="font-headline text-lg sm:text-xl font-semibold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
            {tool.shortName}
          </h3>
          <p className="mt-2 text-xs text-zinc-400 font-sans leading-relaxed line-clamp-2">
            {tool.description}
          </p>
        </div>

        {/* Badges / Highlights */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2 py-0.5 rounded-md text-[9px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {tool.badge}
          </span>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="relative z-10 pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
        <span className="text-zinc-400 group-hover:text-white transition-colors">
          Open Tool
        </span>
        <span className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-zinc-300 group-hover:bg-[#f5b907] group-hover:text-black transform group-hover:translate-x-0.5 transition-all">
          →
        </span>
      </div>
    </Link>
  );
}
