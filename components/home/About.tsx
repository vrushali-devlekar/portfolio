"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface TechItem {
  name: string;
  category: string;
  slug: string;
  color: string;
}

const TECH_STACK: TechItem[] = [
  { name: "React", category: "Frontend UI", slug: "react", color: "61DAFB" },
  {
    name: "Next.js",
    category: "Full-Stack",
    slug: "nextdotjs",
    color: "FFFFFF",
  },
  {
    name: "Three.js",
    category: "3D / WebGL",
    slug: "threedotjs",
    color: "FFFFFF",
  },
  {
    name: "Node.js",
    category: "Backend Runtime",
    slug: "nodedotjs",
    color: "5FA04E",
  },
  {
    name: "TypeScript",
    category: "Type Safety",
    slug: "typescript",
    color: "3178C6",
  },
  {
    name: "Tailwind",
    category: "Modern Styling",
    slug: "tailwindcss",
    color: "06B6D4",
  },
  {
    name: "Redis",
    category: "Caching & In-Memory",
    slug: "redis",
    color: "FF4438",
  },
  {
    name: "Docker",
    category: "Containers & DevOps",
    slug: "docker",
    color: "2496ED",
  },
];

const TECH_ICONS: Record<string, React.ReactNode> = {
  React: (
    <svg
      className="w-5 h-5 text-[#61DAFB]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    </svg>
  ),
  "Next.js": (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.45 17.55-4.83-6.84v6.84h-1.95V7.45h2.1l4.68 6.64V7.45h1.95v10.1h-1.95z" />
    </svg>
  ),
  "Three.js": (
    <svg
      className="w-5 h-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
      />
    </svg>
  ),
  "Node.js": (
    <svg
      className="w-5 h-5 text-[#5FA04E]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 1.83a1.44 1.44 0 0 0-.72.2L2.57 7.15A1.44 1.44 0 0 0 1.85 8.4v10.2c0 .5.27.96.72 1.21l8.71 5.12a1.44 1.44 0 0 0 1.44 0l8.71-5.12c.45-.25.72-.71.72-1.21V8.4c0-.5-.27-.96-.72-1.21l-8.71-5.12a1.44 1.44 0 0 0-.72-.25zM12 4.14l7.15 4.2-7.15 4.2-7.15-4.2L12 4.14z" />
    </svg>
  ),
  TypeScript: (
    <svg
      className="w-5 h-5 text-[#3178C6]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
      <path
        d="M11.5 15.5h-2v-8h-2.5v-1.5h7v1.5h-2.5v8zm3.2-1.3c.7.5 1.6.8 2.5.8 1.1 0 1.8-.5 1.8-1.2 0-.8-.7-1.1-2.1-1.6-1.9-.6-3-1.4-3-2.9 0-1.7 1.4-3 3.6-3 1.2 0 2.2.3 3 .8l-.7 1.4c-.7-.4-1.5-.7-2.3-.7-1.1 0-1.7.5-1.7 1.1 0 .7.6 1 2 1.5 2.1.7 3.1 1.5 3.1 3 0 1.8-1.4 3-3.8 3-1.4 0-2.6-.4-3.5-1l.7-1.3z"
        fill="white"
      />
    </svg>
  ),
  Tailwind: (
    <svg
      className="w-5 h-5 text-[#06B6D4]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
    </svg>
  ),
  Redis: (
    <svg
      className="w-5 h-5 text-[#FF4438]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21.5 8.7a.8.8 0 0 0-.4-.7L12.5 3.3a.8.8 0 0 0-.8 0L3 8a.8.8 0 0 0-.4.7v6.6a.8.8 0 0 0 .4.7l8.7 4.7a.8.8 0 0 0 .8 0l8.7-4.7a.8.8 0 0 0 .4-.7V8.7zM12 5.1l6.7 3.6-2.9 1.5-6.7-3.6L12 5.1zm-7 4.3l6 3.2v6.4l-6-3.2V9.4zm8 9.6v-6.4l6-3.2v6.4l-6 3.2z" />
    </svg>
  ),
  Docker: (
    <svg
      className="w-5 h-5 text-[#2496ED]"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-3.254 0h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.084.185.185.185zm-3.254 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H7.475a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm6.508-3.253h2.119a.185.185 0 00.186-.185V5.753a.185.185 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm-3.254 0h2.12a.185.185 0 00.186-.185V5.753a.185.185 0 00-.186-.185h-2.12a.185.185 0 00-.185.185v1.887c0 .102.084.185.185.185zm-3.254 0h2.119a.185.185 0 00.185-.185V5.753a.185.185 0 00-.185-.185H7.475a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm-3.254 3.253h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H4.221a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-3.253h2.119a.185.185 0 00.186-.185V5.753a.185.185 0 00-.185-.185H4.221a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm16.516 6.071c-.422-.303-1.472-.378-2.288-.337-.123-.559-.444-1.077-.925-1.464l-.326-.263-.377.213c-.878.497-1.888.756-2.906.756h-11.45c-.29 0-.582.02-.871.061-.599.083-1.037.587-1.037 1.19 0 4.103 2.871 7.159 7.026 7.159 4.398 0 8.083-2.613 9.479-6.72 1.488-.13 2.924-.652 3.701-1.328l.259-.225-.36-.275z" />
    </svg>
  ),
};

export default function About() {
  // Right card cursor tracking state for 3D tilt & orange radial glow
  const rightCardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!rightCardRef.current) return;
    const rect = rightCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      className="relative bg-[#070709] py-24 px-6 sm:px-10 lg:px-16 overflow-hidden text-white"
      id="about"
    >
      {/* Background ambient decorative elements */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* ─── SECTION 2 HERO BANNER: LET'S MOVE [ENGINEERING] DESIGN FOR THE NEXT ERA ─── */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="font-headline text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-tight text-white flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span>LET&apos;S MOVE</span>
            <span className="inline-flex items-center px-4 py-1.5 sm:px-6 sm:py-2 rounded-xl bg-white text-black font-mono text-xs sm:text-base font-bold tracking-widest uppercase shadow-xl align-middle">
              ENGINEERING
            </span>
            <span className="w-full block mt-1">DESIGN FOR THE NEXT ERA</span>
          </h2>
        </div>

        {/* ─── 3-COLUMN EDITORIAL GRID (MATCHING REFERENCE EXACTLY) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* 1. LEFT CARD: PORTRAIT + EDITORIAL PHILOSOPHY CAPTION */}
          <div className="flex flex-col justify-between group">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#111216] border border-white/10 shadow-2xl">
              <img
                src="/vrushali.png"
                alt="Vrushali Devlekar"
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="mt-6 flex items-start gap-4">
              <span className="text-2xl font-light text-zinc-400 select-none">
                +
              </span>
              <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                We create visual worlds that captivate today and define
                tomorrow. Synthesizing full-stack engineering reliability with
                fluid Three.js and WebGL interactivity.
              </p>
            </div>
          </div>

          {/* 2. MIDDLE CARD: RIBBED EMERALD CARD (BRING YOUR IDEAS TO LIFE) */}
          <div className="relative rounded-3xl ribbed-emerald p-8 sm:p-9 flex flex-col justify-between border border-emerald-500/20 shadow-2xl overflow-hidden group">
            {/* Top decorative texture glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Top icon badge */}
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white mb-8">
                <i className="ri-sparkling-fill text-lg text-emerald-400" />
              </div>

              {/* Title */}
              <h3 className="font-headline text-2xl sm:text-3xl font-semibold uppercase tracking-tight text-white leading-tight mb-4">
                Bring Your Ideas to Life with WebGL & Next.js
              </h3>

              <div className="w-10 h-[2px] bg-emerald-400/60 mb-5" />

              {/* Subtext */}
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans mb-8">
                We turn deep tech architectures and bold concepts into
                resilient, high-speed web platforms that connect with audiences
                everywhere.
              </p>

              {/* Stack tags pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {TECH_STACK.slice(0, 5).map((tech) => (
                  <span
                    key={tech.name}
                    className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-white/10 text-white/90 backdrop-blur-sm border border-white/10"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom link */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-white hover:text-emerald-300 transition-colors pt-4 border-t border-white/10"
            >
              <span>Work with Vrushali</span>
              <i className="ri-arrow-right-line" />
            </Link>
          </div>

          {/* 3. RIGHT CARD: SHOWCASE + EXPLORE NOW BUTTON */}
          <div className="flex flex-col justify-between group">
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-[#111216] border border-white/10 shadow-2xl">
              <img
                src="/tours.webp"
                alt="Interactive 3D Work"
                className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Overlay pill tag */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                Web Design, Business Website
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Link
                href="/projects"
                className="w-full py-3.5 px-6 rounded-full border border-white/20 hover:border-white bg-white/5 hover:bg-white hover:text-black text-center text-xs font-headline font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                <span>EXPLORE WORK</span>
                <i className="ri-arrow-right-up-line transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
