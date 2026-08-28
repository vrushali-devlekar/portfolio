"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface ServiceCardData {
  id: string;
  serial: string;
  title: string;
  subtitle: string;
  description: string;
  techBadges: string[];
  widgetType: "terminal_workstation" | "saas_dashboard" | "cloud_cluster";
}

const SERVICES: ServiceCardData[] = [
  {
    id: "fullstack-workstation",
    serial: "01",
    title: "Code Build & Terminal",
    subtitle: "Full-Stack Web Apps",
    description:
      "Type-safe end-to-end architectures, lightning-fast Next.js rendering pipelines, and production-grade maintainability.",
    techBadges: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    widgetType: "terminal_workstation",
  },
  {
    id: "saas-dashboard",
    serial: "02",
    title: "Floating SaaS Dashboard & Metrics",
    subtitle: "SaaS Products",
    description:
      "Translucent purple and neon-violet SaaS analytics HUD displays showing levitating metric widgets, revenue counters, and real-time user activity.",
    techBadges: ["React", "Next.js", "Three.js", "GraphQL", "Tailwind"],
    widgetType: "saas_dashboard",
  },
  {
    id: "cloud-cluster",
    serial: "03",
    title: "Microservice Cluster & Server Monitor",
    subtitle: "High-Throughput APIs",
    description:
      "Antigravity cloud server clusters with floating server blades, glowing emerald/cyan light nodes, zero-downtime microservices, and low-latency APIs.",
    techBadges: ["Cloud Architecture", "Docker", "Kubernetes", "Redis", "gRPC"],
    widgetType: "cloud_cluster",
  },
];

function BentoServiceCard({ card, index }: { card: ServiceCardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="h-full opacity-100"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative h-full rounded-3xl bg-[#101116] border border-[#1E202B] p-7 sm:p-8 overflow-hidden flex flex-col justify-between group transition-colors duration-300 hover:border-[#E05638]/40 shadow-xl backdrop-blur-md"
      >
        {/* Radial cursor glow overlay */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 86, 56, 0.2), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
          <div>
            {/* Rich UI Card Visual Header Widget */}
            <div className="mb-6 rounded-2xl bg-[#0D0E12] border border-[#1E202B] p-2 overflow-hidden min-h-[170px] flex items-center justify-center">
              
              {/* CARD 1: Code Build & Terminal */}
              {card.widgetType === "terminal_workstation" && (
                <div className="w-full p-4 rounded-xl bg-[#08090C] border border-[#E05638]/30 space-y-3 font-mono text-xs shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#1E202B] pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                      <span className="ml-2 text-[11px] text-neutral-400 font-semibold">terminal/build-v2</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#E05638]/10 text-[#E05638] border border-[#E05638]/30 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E05638] animate-pulse" />
                      PROD: PASSING
                    </span>
                  </div>
                  <div className="space-y-1.5 text-neutral-300">
                    <p className="text-neutral-500">$ pnpm build --filter=web</p>
                    <p className="text-amber-400">► Compiling 142 client & server modules...</p>
                    <p className="text-emerald-400">✓ Production bundle generated (0.24s)</p>
                    <div className="flex items-center gap-2 pt-1 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300">Route (app)</span>
                      <span className="text-emerald-400">Size: 42.1 kB (Gzip)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 2: Floating SaaS Dashboard & Metrics */}
              {card.widgetType === "saas_dashboard" && (
                <div className="w-full p-4 rounded-xl bg-[#0A0812] border border-purple-500/30 space-y-3 font-mono text-xs shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#1E202B] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                      <span className="text-[11px] text-purple-300 font-semibold uppercase tracking-wider">SAAS METRICS HUD</span>
                    </div>
                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">LIVE METRICS</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <span className="block text-[10px] text-neutral-400 uppercase">ARR Growth</span>
                      <span className="text-sm font-bold text-purple-300">$148.2K</span>
                      <span className="text-[10px] text-emerald-400 block">+28.4% YoY</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <span className="block text-[10px] text-neutral-400 uppercase">Active Users</span>
                      <span className="text-sm font-bold text-purple-300">42,890</span>
                      <span className="text-[10px] text-purple-400 block">99.8% retention</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5 h-8 pt-1 justify-between px-1">
                    {[40, 65, 50, 85, 70, 95, 100].map((h, i) => (
                      <div key={i} className="w-full bg-purple-500/30 rounded-t border-t border-purple-400" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              )}

              {/* CARD 3: Microservice Cluster & Server Monitor */}
              {card.widgetType === "cloud_cluster" && (
                <div className="w-full p-4 rounded-xl bg-[#060D0C] border border-emerald-500/30 space-y-3 font-mono text-xs shadow-lg">
                  <div className="flex items-center justify-between border-b border-[#1E202B] pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">CLUSTER MONITOR</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">0 DOWNTIME</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="block text-[10px] text-neutral-400 uppercase">API Latency</span>
                      <span className="text-sm font-bold text-emerald-400">14ms</span>
                      <span className="text-[10px] text-neutral-400 block">p99 &lt; 28ms</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <span className="block text-[10px] text-neutral-400 uppercase">System Uptime</span>
                      <span className="text-sm font-bold text-cyan-400">99.99%</span>
                      <span className="text-[10px] text-neutral-400 block">k8s 6 pods active</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] pt-1 text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Redis Cache: 98% hit
                    </span>
                    <span className="text-emerald-400 font-semibold">HEALTHY</span>
                  </div>
                </div>
              )}
            </div>

            {/* Serial, Subtitle & Title */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#E05638] bg-[#E05638]/10 border border-[#E05638]/20 px-2.5 py-1 rounded-lg">
                  {card.serial}
                </span>
                <span className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  {card.subtitle}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#E05638] transition-colors duration-300">
                {card.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-sans">
              {card.description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="pt-6 border-t border-[#1E202B]">
            <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-3 font-semibold">
              CORE TECH STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {card.techBadges.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-neutral-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg font-medium hover:border-[#E05638]/40 hover:text-[#E05638] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="relative bg-[#0D0E12] py-24 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-[#1E202B]" id="services">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E05638]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E202B]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#E05638] uppercase">
                03 CORE STACK & EXPERTISE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              WHAT I{" "}
              <span className="bg-gradient-to-r from-[#E05638] via-[#E05638] to-amber-500 bg-clip-text text-transparent">
                ENGINEER
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-md leading-relaxed">
            High-performance web architecture, zero-gravity 3D visual experiences, and microservice cloud systems.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SERVICES.map((card, idx) => (
            <BentoServiceCard key={card.id} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
