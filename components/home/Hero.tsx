"use client";

import { useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";

// Dynamically import Three.js background canvas with SSR disabled
const Hero3DCanvas = dynamic(() => import("./Hero3DCanvas"), {
  ssr: false,
});

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-left-content",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.0 }
      )
        .fromTo(
          ".hero-portrait-card",
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1.1 },
          "-=0.7"
        )
        .fromTo(
          ".hero-contact-item",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex items-center justify-center bg-[#060606] text-white pt-24 pb-16 lg:py-0 overflow-hidden">
      
      {/* Three.js Dynamic 3D Background (Operates strictly behind all foreground elements) */}
      <Hero3DCanvas />

      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-[1380px] w-full mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          
          {/* LEFT COLUMN (60% Desktop - 7 Cols): Refined Headline & Streamlined Info */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7 hero-left-content">
            
            {/* Status Badge */}
            <div className="flex items-center">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-300">
                  AVAILABLE FOR ROLES & PROJECTS
                </span>
              </div>
            </div>

            {/* Role & Name */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase font-semibold">
                  {"// THREE.JS & FULL STACK DEVELOPER"}
                </span>
                <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-400/60 to-transparent" />
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight leading-[0.94] text-white">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-zinc-300">
                  VRUSHALI
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_0_25px_rgba(245,185,7,0.25)]">
                  DEVLEKAR
                </span>
              </h1>

              {/* Concise 2-line Bio */}
              <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-sans leading-relaxed pt-1">
                Full stack engineer creating high-performance web applications, interactive 3D WebGL experiences, and scalable cloud systems.
              </p>
            </div>

            {/* Streamlined Minimalist Contact Links (Single Sleek Horizontal Row) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              
              {/* Email */}
              <a
                href="mailto:vrushali.devlekar@gmail.com"
                className="hero-contact-item group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-amber-400/50 hover:bg-amber-400/10 transition-all duration-200"
              >
                <i className="ri-mail-line text-amber-400 text-base group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px] text-zinc-300 group-hover:text-white font-medium">
                  EMAIL
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/vrushali-devlekar/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-contact-item group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-amber-400/50 hover:bg-amber-400/10 transition-all duration-200"
              >
                <i className="ri-linkedin-fill text-amber-400 text-base group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px] text-zinc-300 group-hover:text-white font-medium">
                  LINKEDIN
                </span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/vrushali-devlekar"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-contact-item group flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-amber-400/50 hover:bg-amber-400/10 transition-all duration-200"
              >
                <i className="ri-github-fill text-amber-400 text-base group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[11px] text-zinc-300 group-hover:text-white font-medium">
                  GITHUB
                </span>
              </a>

              {/* Location */}
              <div className="hero-contact-item flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-zinc-400">
                <i className="ri-map-pin-line text-cyan-400 text-base" />
                <span className="font-mono text-[11px] text-zinc-400 font-medium">
                  MUMBAI, IN
                </span>
              </div>

            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(245,185,7,0.3)] hover:shadow-[0_0_30px_rgba(245,185,7,0.5)] transition-all duration-200"
              >
                <span>Get in Touch</span>
                <i className="ri-arrow-right-line text-sm" />
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN (40% Desktop - 5 Cols): Clean Portrait Frame with Ambient 3D Backlight */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-portrait-card">
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/60 backdrop-blur-xl shadow-[0_0_50px_rgba(245,185,7,0.15)] group transition-all duration-300 hover:border-amber-400/30">
              
              {/* Backlight Radial Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-transparent to-cyan-500/10 pointer-events-none z-10" />
              
              {/* Clean, Sharp High-Res Portrait Image */}
              <img
                src="/port-1.png"
                alt="Vrushali Devlekar"
                className="w-full h-full object-cover object-center relative z-20 transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Elegant Border Highlight */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none z-30" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
