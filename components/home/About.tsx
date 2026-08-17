"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";

interface TechItem {
  name: string;
  category: string;
  slug: string;
  color: string;
}

const TECH_STACK: TechItem[] = [
  { name: "React", category: "Frontend UI", slug: "react", color: "61DAFB" },
  { name: "Next.js", category: "Full-Stack", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Three.js", category: "3D / WebGL", slug: "threedotjs", color: "FFFFFF" },
  { name: "Node.js", category: "Backend Runtime", slug: "nodedotjs", color: "5FA04E" },
  { name: "TypeScript", category: "Type Safety", slug: "typescript", color: "3178C6" },
  { name: "Tailwind", category: "Modern Styling", slug: "tailwindcss", color: "06B6D4" },
  { name: "Redis", category: "Caching & In-Memory", slug: "redis", color: "FF4438" },
  { name: "Docker", category: "Containers & DevOps", slug: "docker", color: "2496ED" },
];

const TECH_ICONS: Record<string, React.ReactNode> = {
  React: (
    <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
    </svg>
  ),
  "Next.js": (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.45 17.55-4.83-6.84v6.84h-1.95V7.45h2.1l4.68 6.64V7.45h1.95v10.1h-1.95z"/>
    </svg>
  ),
  "Three.js": (
    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  "Node.js": (
    <svg className="w-5 h-5 text-[#5FA04E]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.83a1.44 1.44 0 0 0-.72.2L2.57 7.15A1.44 1.44 0 0 0 1.85 8.4v10.2c0 .5.27.96.72 1.21l8.71 5.12a1.44 1.44 0 0 0 1.44 0l8.71-5.12c.45-.25.72-.71.72-1.21V8.4c0-.5-.27-.96-.72-1.21l-8.71-5.12a1.44 1.44 0 0 0-.72-.25zM12 4.14l7.15 4.2-7.15 4.2-7.15-4.2L12 4.14z"/>
    </svg>
  ),
  TypeScript: (
    <svg className="w-5 h-5 text-[#3178C6]" viewBox="0 0 24 24" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#3178C6" />
      <path d="M11.5 15.5h-2v-8h-2.5v-1.5h7v1.5h-2.5v8zm3.2-1.3c.7.5 1.6.8 2.5.8 1.1 0 1.8-.5 1.8-1.2 0-.8-.7-1.1-2.1-1.6-1.9-.6-3-1.4-3-2.9 0-1.7 1.4-3 3.6-3 1.2 0 2.2.3 3 .8l-.7 1.4c-.7-.4-1.5-.7-2.3-.7-1.1 0-1.7.5-1.7 1.1 0 .7.6 1 2 1.5 2.1.7 3.1 1.5 3.1 3 0 1.8-1.4 3-3.8 3-1.4 0-2.6-.4-3.5-1l.7-1.3z" fill="white" />
    </svg>
  ),
  Tailwind: (
    <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
    </svg>
  ),
  Redis: (
    <svg className="w-5 h-5 text-[#FF4438]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.5 8.7a.8.8 0 0 0-.4-.7L12.5 3.3a.8.8 0 0 0-.8 0L3 8a.8.8 0 0 0-.4.7v6.6a.8.8 0 0 0 .4.7l8.7 4.7a.8.8 0 0 0 .8 0l8.7-4.7a.8.8 0 0 0 .4-.7V8.7zM12 5.1l6.7 3.6-2.9 1.5-6.7-3.6L12 5.1zm-7 4.3l6 3.2v6.4l-6-3.2V9.4zm8 9.6v-6.4l6-3.2v6.4l-6 3.2z"/>
    </svg>
  ),
  Docker: (
    <svg className="w-5 h-5 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm-3.254 0h2.12a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.12a.185.185 0 00-.185.186v1.887c0 .102.084.185.185.185zm-3.254 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H7.475a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm6.508-3.253h2.119a.185.185 0 00.186-.185V5.753a.185.185 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm-3.254 0h2.12a.185.185 0 00.186-.185V5.753a.185.185 0 00-.186-.185h-2.12a.185.185 0 00-.185.185v1.887c0 .102.084.185.185.185zm-3.254 0h2.119a.185.185 0 00.185-.185V5.753a.185.185 0 00-.185-.185H7.475a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm-3.254 3.253h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H4.221a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185zm0-3.253h2.119a.185.185 0 00.186-.185V5.753a.185.185 0 00-.185-.185H4.221a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185zm16.516 6.071c-.422-.303-1.472-.378-2.288-.337-.123-.559-.444-1.077-.925-1.464l-.326-.263-.377.213c-.878.497-1.888.756-2.906.756h-11.45c-.29 0-.582.02-.871.061-.599.083-1.037.587-1.037 1.19 0 4.103 2.871 7.159 7.026 7.159 4.398 0 8.083-2.613 9.479-6.72 1.488-.13 2.924-.652 3.701-1.328l.259-.225-.36-.275z"/>
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

  // Framer motion word stagger variants
  const headlineWords = "I build software that doesn't just work it hits.".split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const bioVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <section className="relative bg-[#0D0E12] py-24 px-4 sm:px-6 lg:px-12 overflow-hidden" id="about">
      {/* Background ambient decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E05638]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#E05638]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* 1. LEFT CARD (ABOUT PHILOSOPHY) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:col-span-7 relative rounded-3xl bg-[#0D0E12] p-8 sm:p-10 lg:p-12 overflow-hidden flex flex-col justify-between group transition-all duration-300"
          >
            {/* Top glass ambient highlight */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#E05638]/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-white/[0.01] backdrop-blur-[2px] pointer-events-none" />

            <div className="relative z-10">
              {/* Monospace Amber Tag */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#E05638] uppercase">
                  01 PHILOSOPHY
                </span>
              </div>

              {/* Headline with Framer Motion Word-Stagger Animation */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
                {headlineWords.map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className={`inline-block mr-[0.25em] ${
                      word.includes("hits.")
                        ? "bg-gradient-to-r from-white via-[#E05638] to-[#E05638] bg-clip-text text-transparent"
                        : ""
                    }`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>

              {/* Concise Bio */}
              <motion.div variants={bioVariants} className="space-y-4 text-neutral-300 text-base sm:text-lg leading-relaxed">
                <p>
                  Engineered for speed, built for scale. I synthesize full-stack engineering reliability with fluid Three.js and WebGL interactive visual experiences.
                </p>
                <p className="text-neutral-400 text-sm sm:text-base">
                  From robust microservices and edge architectures to sub-60fps high-performance 3D shaders, every interface is designed with architectural precision and uncompromised speed.
                </p>
              </motion.div>
            </div>

            {/* Bottom Highlights Pills */}
            <motion.div
              variants={bioVariants}
              className="relative z-10 pt-8 mt-8 flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400"
            >
              <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] flex items-center gap-2">
                <span className="text-[#E05638]">✦</span> Full-Stack Reliability
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] flex items-center gap-2">
                <span className="text-[#E05638]">✦</span> Three.js / WebGL Fluidity
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-white/[0.03] flex items-center gap-2">
                <span className="text-[#E05638]">✦</span> Sub-ms Performance
              </div>
            </motion.div>
          </motion.div>

          {/* 2. RIGHT CARD (TECH ARSENAL) */}
          <div
            ref={rightCardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: isHovered
                ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            }}
            className="lg:col-span-5 relative rounded-3xl bg-[#0D0E12] p-8 sm:p-10 overflow-hidden flex flex-col justify-between group"
          >
            {/* Cursor tracking orange radial glow */}
            <div
              className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 86, 56, 0.25), transparent 40%)`,
              }}
            />

            <div className="relative z-10">
              {/* Header with Title and Live Count Badge */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-mono text-lg sm:text-xl font-bold tracking-wider text-white uppercase">
                  TECH ARSENAL
                </h3>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#E05638]/10 text-[#E05638]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E05638] animate-ping" />
                  {TECH_STACK.length} ACTIVE
                </span>
              </div>
              
              <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-mono">
                Core technologies driving interactive, high-performance web systems.
              </p>

              {/* Interactive Glassmorphism Tech Badges */}
              <div className="grid grid-cols-2 gap-3.5">
                {TECH_STACK.map((tech) => (
                  <div
                    key={tech.name}
                    className="relative group/badge flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 cursor-pointer overflow-hidden"
                  >
                    {/* Badge inner hover shine reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700 pointer-events-none" />

                    {/* Icon container */}
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0 group-hover/badge:scale-110 transition-transform duration-300">
                      {TECH_ICONS[tech.name]}
                    </div>

                    {/* Text info */}
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-white group-hover/badge:text-[#E05638] transition-colors truncate">
                        {tech.name}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono truncate">
                        {tech.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom status line */}
            <div className="relative z-10 pt-6 mt-6 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Ready for Deployment
              </span>
              <span className="text-[#E05638]/80">v2.4.0</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

