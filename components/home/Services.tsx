"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CapabilityCard {
  serial: string;
  icon: string;
  title: string;
  description: string;
  stack: string[];
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const capabilities: CapabilityCard[] = [
    {
      serial: "01",
      icon: "ri-layout-3-line",
      title: "Full-Stack Web Development",
      description:
        "Building scalable, end-to-end web applications with type-safe architectures and production-grade performance.",
      stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    },
    {
      serial: "02",
      icon: "ri-shapes-line",
      title: "Interactive 3D & WebGL",
      description:
        "Creating immersive WebGL experiences, 3D product visualizers, and interactive hero scenes.",
      stack: ["Three.js", "React Three Fiber", "GLSL", "WebGL"],
    },
    {
      serial: "03",
      icon: "ri-server-line",
      title: "High-Throughput APIs & Systems",
      description:
        "Designing resilient REST & GraphQL APIs, optimized database queries, and secure cloud integrations.",
      stack: ["Node.js", "Express", "REST APIs", "Redis", "Docker"],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal header elements
      gsap.fromTo(
        ".capabilities-header",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // Staggered grid cards entrance
      gsap.fromTo(
        ".capability-card",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="services w-full py-24 px-[6%] bg-[#060606] border-t border-border relative overflow-hidden"
      id="services"
    >
      {/* Decorative corner glows & background accents */}
      <div className="corner-glow corner-glow-top-right"></div>
      <div className="corner-dots corner-dots-bottom-left opacity-60"></div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f5b907]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1350px] mx-auto relative z-10">
        {/* Header Block */}
        <div className="capabilities-header flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div className="space-y-3">
            <div className="status-badge">
              <span className="status-dot"></span>
              <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase">
                CAPABILITIES
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-none font-sans">
              WHAT I <span className="text-[#f5b907]">ENGINEER</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-mono max-w-md leading-relaxed">
            Modular, high-performance systems and interactive 3D digital experiences engineered for scale.
          </p>
        </div>

        {/* 3-Column Bento Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 w-full"
        >
          {capabilities.map((card, index) => (
            <div
              key={index}
              className="capability-card group flex flex-col justify-between bg-[#171717]/80 border border-border rounded-2xl p-7 transition-all duration-300 relative overflow-hidden backdrop-blur-md hover:border-[#f5b907]/40 hover:shadow-[0_0_30px_rgba(245,185,7,0.08)] hover:-translate-y-2"
            >
              {/* Top Bar */}
              <div>
                <div className="flex justify-between items-center pb-5 border-b border-border">
                  <span className="text-xs font-mono font-bold text-[#f5b907] bg-[#f5b907]/10 px-2.5 py-1 rounded-md border border-[#f5b907]/20">
                    {card.serial}
                  </span>

                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-border flex items-center justify-center text-xl text-white group-hover:scale-110 group-hover:text-[#f5b907] group-hover:border-[#f5b907]/30 transition-all duration-300">
                    <i className={card.icon}></i>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#f5b907] mt-6 mb-3 transition-colors duration-300 font-sans tracking-tight">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>

              {/* Tech Stack Pills at Bottom */}
              <div className="mt-8 pt-6 border-t border-border">
                <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block mb-3 font-semibold">
                  TECH STACK
                </span>
                <div className="flex flex-wrap gap-2">
                  {card.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] font-mono text-zinc-300 bg-white/[0.04] border border-border px-2.5 py-1 rounded-md font-medium hover:border-[#f5b907]/40 hover:text-[#f5b907] transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
