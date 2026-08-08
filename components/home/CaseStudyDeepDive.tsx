"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Database, Server, GitBranch, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function CaseStudyDeepDive() {
  const architectureStack = [
    { name: "Frontend Layer", tech: "Next.js 15, Tailwind, Framer Motion", icon: <Layers className="w-4 h-4 text-[#E05638]" /> },
    { name: "Backend Gateway", tech: "Node.js, SSE Pipeline, Express", icon: <Server className="w-4 h-4 text-[#E05638]" /> },
    { name: "In-Memory Store", tech: "Redis (Rate limiting, Token Bucket)", icon: <Cpu className="w-4 h-4 text-[#E05638]" /> },
    { name: "Primary Database", tech: "MongoDB Atlas & PostgreSQL", icon: <Database className="w-4 h-4 text-[#E05638]" /> },
  ];

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="case-study">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="tag-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
            <span>02 // System Design Overview</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
            Architecture & <span className="italic text-[#E05638]">System Overview</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Detailed Overview Text Card (Col 7) */}
          <div className="md:col-span-7 retro-card p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] uppercase mb-4 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Approach & Core Methodologies</span>
              </div>

              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1C1C1C] mb-6">
                Eliminating Deployment Latency & Polling Chokepoints
              </h3>

              <div className="space-y-6">
                {/* Challenge */}
                <div className="p-4 rounded-xl bg-[#EFE9D5] border border-[#1C1C1C]/15">
                  <span className="text-[10px] font-mono text-[#E05638] font-bold uppercase tracking-wider block mb-1">
                    [CHALLENGE] legacy polling overhead
                  </span>
                  <p className="text-xs text-[#1C1C1C]/80 leading-relaxed font-sans">
                    Legacy deployment pipelines choked under simultaneous builds, suffering 10-second polling delays and unpredictable API timeouts.
                  </p>
                </div>

                {/* Solution */}
                <div className="p-4 rounded-xl bg-[#FFFDF7] border border-[#1C1C1C]/15 shadow-sm">
                  <span className="text-[10px] font-mono text-[#E05638] font-bold uppercase tracking-wider block mb-1">
                    [SOLUTION] event-driven SSE & Redis token bucket
                  </span>
                  <p className="text-xs text-[#1C1C1C]/80 leading-relaxed font-sans">
                    Migrated to unidirectional Server-Sent Events (SSE) for build streaming. Added Redis token bucket algorithms to ensure zero server timeouts during heavy concurrency bursts.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#1C1C1C]/10 flex items-center justify-between text-[11px] font-mono text-[#666666]">
              <span>Outcome: 65% API Response Speedup</span>
              <span className="text-[#E05638] font-bold">Verified in Production</span>
            </div>
          </div>

          {/* Right Column: Flowchart Diagram & Stack Overview (Col 5) */}
          <div className="md:col-span-5 retro-card p-8 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] uppercase mb-4 font-semibold">
                <GitBranch className="w-4 h-4" />
                <span>Component Infrastructure</span>
              </div>

              <h3 className="text-xl font-serif font-bold text-[#1C1C1C] mb-6">
                Layer Breakdown
              </h3>

              <div className="space-y-3">
                {architectureStack.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/12 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white shadow-sm">{item.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-[#1C1C1C]">{item.name}</div>
                      <div className="text-[11px] font-mono text-[#666666]">{item.tech}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1C1C1C]/10 text-[11px] font-mono text-[#666666]">
              Zero-Downtime Blue/Green Deployments
            </div>
          </div>

          {/* Bottom Row: System Flow Diagram Visual Card (Col 12) */}
          <div className="md:col-span-12 retro-card p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] uppercase font-semibold">
                <Zap className="w-4 h-4" />
                <span>Data Flow Diagram</span>
              </div>
              <span className="text-[10px] font-mono text-[#666666]">Real-Time SSE Event Cycle</span>
            </div>

            {/* Visual Node Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative py-4">
              {[
                { step: "01", title: "Client Consumer", detail: "Next.js EventSource UI", color: "border-[#E05638]/40" },
                { step: "02", title: "Gateway Proxy", detail: "Rate Limiting & Token Check", color: "border-[#1C1C1C]/20" },
                { step: "03", title: "Redis Pub/Sub", detail: "In-Memory Stream Buffer", color: "border-[#E05638]/40" },
                { step: "04", title: "Worker Database", detail: "PostgreSQL & Log Store", color: "border-[#1C1C1C]/20" },
              ].map((node, i) => (
                <div key={i} className="relative group">
                  <div className={`p-5 rounded-xl bg-[#EFE9D5]/60 border ${node.color} flex flex-col justify-between min-h-[110px] transition-all group-hover:scale-105 shadow-sm`}>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-[#666666]">{node.step}</span>
                      <span className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#E05638] animate-pulse" : "bg-[#1C1C1C]/30"}`} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#1C1C1C]">{node.title}</h4>
                      <p className="text-[11px] text-[#666666] mt-0.5">{node.detail}</p>
                    </div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-[#1C1C1C]/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#1C1C1C]/10 flex flex-wrap justify-between items-center text-[11px] font-mono text-[#666666] gap-2">
              <span>Protocol: HTTP/2 SSE + Redis PubSub</span>
              <span>Propagation Latency: &lt; 45ms</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
