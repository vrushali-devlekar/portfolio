"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance Animations
      gsap.fromTo(
        ".hero-portrait-visual",
        { opacity: 0, scale: 1.03 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
      );

      gsap.fromTo(
        ".hero-editorial-left",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.15 },
      );

      gsap.fromTo(
        ".hero-editorial-right",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.25 },
      );

      gsap.fromTo(
        ".hero-bottom-box",
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.35,
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-8 px-6 sm:px-10 lg:px-14 overflow-hidden text-white select-none bg-[#070709]"
    >
      {/* ─── 1. CANVAS & BACKDROP STRUCTURE: PURE OBSIDIAN NOISE & VIGNETTE ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle textured vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.015)_0%,_#070709_85%)]" />
        {/* Fine grain noise filter */}
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ─── 2. CENTRAL PORTRAIT LAYER (GRAYSCALE, CONTRAST-125, DUAL-LAYER MASK) ─── */}
      <div className="hero-portrait-visual absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[700px] h-[86vh] max-h-[920px] flex items-center justify-center pt-8 sm:pt-14">
          <img
            src="/vrushali-cutout.png"
            alt="Vrushali Devlekar"
            className="w-full h-full object-contain object-bottom grayscale contrast-125 select-none"
            style={{
              maskImage:
                "radial-gradient(circle at 60% 40%, black 80%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 40%, black 40%, transparent 80%)",
            }}
          />
          {/* Bottom scrim: torso edges dissolve seamlessly into pure obsidian #070709 */}
          <div className="absolute inset-x-0 bottom-0 h-48 sm:h-56 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ─── 3. SPLIT EDITORIAL TYPOGRAPHY LAYER (OVERLAID WITH Z-10) ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 sm:pt-8">
        {/* Left Column: Monospace Persona Tag + Primary Display Title + Interactive Action Button */}
        <div className="hero-editorial-left lg:col-span-8 flex flex-col items-start max-w-2xl">
          {/* Monospace Persona Eyebrow */}
          <div className="text-[10px] sm:text-xs font-mono tracking-widest text-[#ccff00] uppercase mb-3 flex items-center gap-1.5">
            <span>[</span>
            <span>FULL-STACK ENGINEER // CREATIVE DEVELOPER</span>
            <span>]</span>
          </div>

          {/* Primary Display Title */}
          <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-normal text-white leading-[1.1]">
            BUILDING DIGITAL <br />
            ADVANTAGE <br />
            THROUGH <br />
            HARDENED CODE<span className="text-[#ccff00]">.</span>
            <span className="inline-flex items-center ml-2.5 align-middle">
              <Link
                href="/projects"
                aria-label="View Work"
                className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/20 text-white hover:border-[#ccff00] hover:text-[#ccff00] transition-colors group shrink-0"
              >
                <span className="text-sm sm:text-base font-sans transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </Link>
            </span>
          </h1>
        </div>

        {/* Right Column: Engineering Specializations + Subtitle */}
        <div className="hero-editorial-right lg:col-span-4 flex flex-col justify-start lg:items-end lg:text-right mt-2 lg:mt-6">
          <div className="space-y-1 font-mono tracking-wider text-xs sm:text-sm text-neutral-300 uppercase">
            <p>FULL-STACK ARCHITECTURE</p>
            <p>KINETIC UI // GLSL SHADERS</p>
            <p>DISTRIBUTED REALTIME SYSTEMS</p>
          </div>
          <p className="mt-4 text-xs text-neutral-400 max-w-[210px] text-left lg:text-right font-sans leading-relaxed">
            Engineering scalable web platforms with tactile 60fps
            micro-interactions.
          </p>
        </div>
      </div>

      {/* ─── 4. BOTTOM PERSONAL TELEMETRY DOCK ─── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full mt-auto pt-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-5 pb-2">
        {/* Left Side: Card 01 & Card 02 */}
        <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
          {/* Card 01 (Philosophy) */}
          <div className="hero-bottom-box bg-[#09090d]/90 border border-white/10 rounded-2xl p-4 w-48 backdrop-blur-md space-y-1.5 shadow-2xl transition-all hover:border-white/25 flex flex-col justify-between h-[120px]">
            <span className="text-[9px] font-mono tracking-wider text-neutral-400 uppercase">
              {"// PHILOSOPHY"}
            </span>
            <div className="flex items-center justify-between gap-1.5">
              <span className="text-xs font-sans font-medium text-white/90 leading-snug">
                Craft over boilerplate.
              </span>
              {/* Spinning Cyber Lime spark icon */}
              <svg
                className="w-3.5 h-3.5 text-[#ccff00] animate-spin shrink-0"
                style={{ animationDuration: "10s" }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93"
                />
              </svg>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans leading-tight">
              Deterministic state &amp; zero bloat.
            </p>
          </div>

          {/* Card 02 (Telemetry / Performance) */}
          <div className="hero-bottom-box bg-[#09090d]/90 border border-white/10 rounded-2xl p-4 w-44 backdrop-blur-md space-y-1.5 shadow-2xl transition-all hover:border-white/25 flex flex-col justify-between h-[120px]">
            <span className="text-[9px] font-mono tracking-wider text-neutral-400 uppercase">
              {"// PERFORMANCE"}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans text-2xl font-extrabold text-white tracking-tight">
                &lt; 90ms
              </span>
              <span className="text-sm font-sans text-[#ccff00] font-semibold">
                ↗
              </span>
            </div>
            <p className="text-[10px] text-neutral-400 font-sans leading-tight">
              Edge-cached global TTFB.
            </p>
          </div>
        </div>

        {/* Right Dock: Minimal Social Pill */}
        <div className="hero-bottom-box bg-white/[0.03] border border-white/10 rounded-full px-4 py-2 flex items-center gap-4 text-xs text-neutral-400 backdrop-blur-md shadow-2xl">
          <a
            href="https://github.com/vrushali-devlekar"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-white transition-colors"
          >
            <i className="ri-github-fill text-xs" />
          </a>
          <a
            href="https://x.com/vrushali_i"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) Profile"
            className="hover:text-white transition-colors"
          >
            <i className="ri-twitter-x-line text-xs" />
          </a>
          <a
            href="https://www.linkedin.com/in/vrushali-devlekar/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-white transition-colors"
          >
            <i className="ri-linkedin-fill text-xs" />
          </a>
        </div>
      </div>
    </section>
  );
}
