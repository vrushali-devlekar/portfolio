"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Terminal, Shield, Zap, Cpu, Activity, CheckCircle2 } from "lucide-react";

export default function FeaturedProject() {
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "terminal">("overview");

  const highlights = [
    {
      icon: <Zap className="w-4 h-4 text-[#E05638]" />,
      title: "Low-Latency SSE Streaming",
      desc: "Sub-100ms real-time build log streaming replacing legacy polling.",
    },
    {
      icon: <Shield className="w-4 h-4 text-[#E05638]" />,
      title: "Redis Rate Limiting & Auth",
      desc: "Token bucket algorithms preventing unauthorized microservice access.",
    },
    {
      icon: <Cpu className="w-4 h-4 text-[#E05638]" />,
      title: "Optimized Monorepo Architecture",
      desc: "40% bundle size reduction via route-level code splitting.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="featured">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Tag & Heading */}
        <div className="mb-12">
          <div className="tag-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
            <span>01 // Flagship Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
            Featured <span className="italic text-[#E05638]">Application</span> Showcase
          </h2>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left / Info Side */}
          <div className="lg:col-span-5 flex flex-col justify-between retro-card p-8 rounded-2xl relative">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] mb-3 font-semibold">
                <span>Enterprise DevOps Automation</span>
                <span>•</span>
                <span>Live Production</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1C1C] mb-4">
                Velora Deploy Dashboard
              </h3>

              <p className="text-[#666666] text-sm leading-relaxed mb-6 font-sans">
                A single-click deployment and observability platform built for high-scale microservices. Streamlines build logs, monitors cluster health metrics, and protects backend infrastructure.
              </p>

              {/* Stack Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Next.js 15", "TypeScript", "Node.js", "Redis", "Docker", "SSE"].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#EFE9D5] border border-[#1C1C1C]/15 text-[#1C1C1C] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              <div className="space-y-4 mb-8">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/10">
                    <div className="p-1.5 rounded-lg bg-white shadow-sm">{item.icon}</div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1C1C]">{item.title}</h4>
                      <p className="text-[11px] text-[#666666] leading-tight mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center gap-4 pt-6 border-t border-[#1C1C1C]/10">
              <a
                href="https://veloraa-deploy.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#E05638] hover:bg-[#c94529] text-white font-mono font-semibold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-sm"
              >
                Live Preview
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/vrushali-devlekar"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-[#1C1C1C]/15 bg-[#FFFDF7] hover:bg-white text-[#1C1C1C] transition-colors shadow-sm"
                aria-label="View Source Code"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right / Retro OS Window Preview */}
          <div className="lg:col-span-7 flex flex-col retro-browser-frame rounded-2xl shadow-md">
            {/* macOS / Retro Browser Top Bar */}
            <div className="retro-browser-header">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E05638]"></div>
                <div className="w-3 h-3 rounded-full bg-[#E5A93C]"></div>
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                <span className="ml-2 text-[11px] font-mono text-[#666666] hidden sm:inline">
                  https://veloraa-deploy.internal
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-[#FFFDF7] p-1 rounded-lg border border-[#1C1C1C]/15">
                {(["overview", "metrics", "terminal"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded text-[10px] font-mono uppercase tracking-wider transition-all ${
                      activeTab === tab
                        ? "bg-[#E05638] text-white font-semibold"
                        : "text-[#666666] hover:text-[#1C1C1C]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Preview Body */}
            <div className="p-6 flex-grow bg-[#FFFDF7] relative min-h-[380px] flex flex-col justify-between">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Status Banner */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#EFE9D5] border border-[#1C1C1C]/15">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-[#E05638] animate-pulse" />
                      <div>
                        <div className="text-xs font-mono font-bold text-[#1C1C1C] uppercase">Cluster Health: Operational</div>
                        <div className="text-[10px] text-[#666666] font-mono">Region: ap-south-1 (Mumbai) • Nodes: 12 Active</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-[#E05638] bg-white px-2.5 py-1 rounded-md border border-[#E05638]/30 font-bold">
                      99.99% Uptime
                    </span>
                  </div>

                  {/* Screenshot Card */}
                  <div className="relative rounded-xl overflow-hidden border border-[#1C1C1C]/15 group aspect-video bg-[#EFE9D5] flex items-center justify-center shadow-inner">
                    <img
                      src="/velora.png"
                      alt="Velora Deploy Dashboard Screenshot"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === "metrics" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {[
                    { title: "API Response", val: "42 ms", sub: "-65% vs baseline", color: "text-[#E05638]" },
                    { title: "Lighthouse Score", val: "100/100", sub: "Perf & Accessibility", color: "text-[#1C1C1C]" },
                    { title: "Cache Hit Rate", val: "94.8%", sub: "Redis in-memory store", color: "text-[#E05638]" },
                    { title: "Memory Allocation", val: "140 MB", sub: "-35% memory footprint", color: "text-[#1C1C1C]" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/15 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-[#666666] uppercase">{stat.title}</span>
                      <div className={`text-2xl font-bold font-mono ${stat.color} my-2`}>{stat.val}</div>
                      <span className="text-[10px] font-mono text-[#666666]">{stat.sub}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === "terminal" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-xs text-[#EFE9D5] bg-[#1C1C1C] p-4 rounded-xl border border-black h-full overflow-y-auto space-y-2"
                >
                  <div className="text-zinc-400">$ velora-cli deploy --env=production --region=ap-south-1</div>
                  <div className="text-amber-400">[INFO] Initializing SSE build log pipeline stream...</div>
                  <div className="text-emerald-400">[SUCCESS] Container build succeeded in 1.4s (hash: 8f4a2b9)</div>
                  <div className="text-zinc-300">[SSE] Healthcheck ping: 200 OK (latency: 18ms)</div>
                  <div className="text-emerald-400 flex items-center gap-2 pt-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Deployment live at https://veloraa-deploy.vercel.app</span>
                  </div>
                </motion.div>
              )}

              {/* Bottom status indicator */}
              <div className="mt-4 pt-3 border-t border-[#1C1C1C]/10 flex items-center justify-between text-[10px] font-mono text-[#666666]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-[#E05638]" />
                  <span>Real-Time Telemetry Engine</span>
                </div>
                <span>Status: Connected</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
