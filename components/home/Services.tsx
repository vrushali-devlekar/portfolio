"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MetricItem {
  label: string;
  value: string;
}

interface ServiceNode {
  serial: string;
  category: string;
  title: string;
  problem: string;
  solution: string;
  metrics: MetricItem[];
  cta: string;
  accentColor: string; // Tailwind class name for text color (e.g. text-emerald-400, text-cyan-400, etc.)
  borderColor: string; // Tailwind class name for hover border (e.g. hover:border-emerald-500/30)
  glowColor: string; // Tailwind shadow class (e.g. hover:shadow-[0_0_30px_rgba(16,185,129,0.05)])
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const services: ServiceNode[] = [
    {
      serial: "01",
      category: "Frontend Systems",
      title: "Frontend Architecture & Design Systems",
      problem: "Fragmented UI components, slow page speeds, and ad-hoc styling that degrades the user experience and lowers conversion rates.",
      solution: "Engineered with modular, type-safe Next.js/React component systems, automated tailwind setups, and fine-tuned for LCP / Core Web Vitals.",
      metrics: [
        { label: "OUTCOME / Core Web Vitals", value: "99/100" },
        { label: "OUTCOME / Page Load Time", value: "< 1.2s" },
      ],
      cta: "Initialize System →",
      accentColor: "text-emerald-400",
      borderColor: "hover:border-emerald-500/30",
      glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.05)]",
    },
    {
      serial: "02",
      category: "Backend Pipelines",
      title: "High-Throughput APIs & Backend Systems",
      problem: "High latency integration points, poorly structured database indexing, and API endpoints that collapse under sudden user spikes.",
      solution: "Scalable backend routing utilizing Node.js/TypeScript, relational database clustering, micro-caching, and secure token architectures.",
      metrics: [
        { label: "OUTCOME / API Latency", value: "< 45ms" },
        { label: "OUTCOME / Database Query", value: "-65% CPU" },
      ],
      cta: "Deploy Pipeline →",
      accentColor: "text-cyan-400",
      borderColor: "hover:border-cyan-500/30",
      glowColor: "hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]",
    },
    {
      serial: "03",
      category: "Full-Stack Platforms",
      title: "Unified Web Environments",
      problem: "Brittle glue code between front-of-house UI and database structures, causing data desync and slow engineering velocity.",
      solution: "End-to-end type safety using monorepo patterns, unified state synchronizers, secure auth workflows, and database transaction protection.",
      metrics: [
        { label: "OUTCOME / Dev Velocity", value: "2.5x Faster" },
        { label: "OUTCOME / Production Bugs", value: "-80%" },
      ],
      cta: "Spin Up App →",
      accentColor: "text-violet-400",
      borderColor: "hover:border-violet-500/30",
      glowColor: "hover:shadow-[0_0_30px_rgba(167,139,250,0.05)]",
    },
    {
      serial: "04",
      category: "Infrastructure & DevOps",
      title: "Cloud Orchestration & CI/CD Automation",
      problem: "Unmonitored server drift, manual deployments, security vulnerability exposures, and overpriced cloud resource allocations.",
      solution: "Declarative infrastructure definitions, containerization pipelines, zero-downtime blue/green deployments, and secure secret environments.",
      metrics: [
        { label: "OUTCOME / Deploy Pipeline", value: "< 3 mins" },
        { label: "OUTCOME / Server Overhead", value: "-40%" },
      ],
      cta: "Automate Config →",
      accentColor: "text-amber-400",
      borderColor: "hover:border-amber-500/30",
      glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.05)]",
    },
    {
      serial: "05",
      category: "Creative Engineering",
      title: "Immersive Interactions & Visual Design",
      problem: "Flat, uninspiring web assets that fail to retain visitor attention or establish strong brand authority.",
      solution: "Engaging user interfaces powered by high-framerate GSAP orchestrations, hardware-accelerated layouts, and physics-based motion paths.",
      metrics: [
        { label: "OUTCOME / User Retention", value: "+35%" },
        { label: "OUTCOME / Screen Refresh", value: "60 FPS" },
      ],
      cta: "Build Experience →",
      accentColor: "text-pink-400",
      borderColor: "hover:border-pink-500/30",
      glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.05)]",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        ".services-sticky-header",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Horizontal Scroll Animation using matchMedia
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (!scrollRef.current || !triggerRef.current) return;
        
        const scrollWidth = scrollRef.current.scrollWidth;
        const viewportWidth = triggerRef.current.clientWidth;
        const amountToScroll = scrollWidth - viewportWidth;

        if (amountToScroll > 0) {
          gsap.fromTo(
            scrollRef.current,
            { x: 0 },
            {
              x: -amountToScroll,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1.2,
                start: "top 10%",
                end: () => `+=${amountToScroll}`,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // Staggered card fade-in on mobile
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          ".service-node-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: scrollRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="services-section w-full py-28 px-[6%] bg-[#030712] border-t border-slate-900 relative overflow-hidden"
      id="services"
    >
      {/* Decorative dark grids / glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full filter blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-[1350px] mx-auto flex flex-col md:flex-row gap-12 lg:gap-16 relative z-10 items-start">
        
        {/* Sticky Header Panel */}
        <div className="services-sticky-header md:w-1/3 md:sticky md:top-28 h-fit space-y-6 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-semibold">
              CAPABILITIES
            </span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-none font-sans">
            What I <span className="text-[#f5b907]">Engineer</span>
          </h2>
          
          <p className="text-sm text-zinc-400 font-mono leading-relaxed max-w-sm">
            Scroll through capability modules. Each node represents a core stack module built for scale and performance.
          </p>

          <div className="pt-6 border-t border-slate-900 hidden md:block">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-zinc-600">SYSTEM STATS:</span>
              <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/10">
                ACTIVE
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/10">
                PROD-READY
              </span>
            </div>
          </div>
        </div>

        {/* Capabilities Scroll Area */}
        <div ref={triggerRef} className="md:w-2/3 w-full overflow-hidden services-scroll-viewport">
          <div
            ref={scrollRef}
            className="services-nodes-grid flex flex-col md:flex-row md:flex-nowrap gap-6 w-full md:w-auto pr-12 pb-6"
          >
            {services.map((node, index) => (
              <div
                key={index}
                className={`service-node-card group flex flex-col justify-between bg-zinc-950/60 border border-slate-900 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden backdrop-blur-md flex-shrink-0 w-full md:w-[380px] lg:w-[410px] ${node.borderColor} ${node.glowColor} hover:-translate-y-1`}
              >
                <div>
                  {/* Header Row */}
                  <div className="flex justify-between items-center pb-4 border-b border-slate-900">
                    <span className="text-xs font-mono text-zinc-600 font-bold">
                      {node.serial}
                    </span>
                    <span className={`text-[10px] font-mono font-semibold tracking-wider uppercase ${node.accentColor} opacity-90`}>
                      {node.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-white mt-5 leading-snug transition-colors duration-300">
                    {node.title}
                  </h3>

                  {/* Problem Solution Framework */}
                  <div className="space-y-4 mt-6">
                    <div>
                      <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-500 uppercase block mb-1">
                        PROBLEM
                      </span>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                        {node.problem}
                      </p>
                    </div>
                    
                    <div>
                      <span className={`text-[9px] font-mono font-bold tracking-wider ${node.accentColor} uppercase block mb-1`}>
                        → SOLUTION
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {node.solution}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Outcomes & Footer Action */}
                <div className="mt-8">
                  {/* Outcomes Grid */}
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-900 pt-5">
                    {node.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-3.5 rounded-xl bg-zinc-900/20 border border-slate-900 flex flex-col justify-between"
                      >
                        <span className="text-[8px] font-mono uppercase text-zinc-500 tracking-wider">
                          {metric.label}
                        </span>
                        <span className={`text-[15px] font-bold ${node.accentColor} font-mono mt-1`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="mt-6 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-white transition-colors duration-300 cursor-pointer">
                    <span>{node.cta}</span>
                    <i className="ri-arrow-right-line text-sm transition-transform duration-300 group-hover:translate-x-1"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
