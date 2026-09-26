"use client";

import { motion } from "framer-motion";

interface ServiceItem {
  number: string;
  category: string;
  title: string;
  description: string;
  highlights: string[];
  techStack: string[];
  icon: React.ReactNode;
  accentColor: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    category: "Full-Stack Development",
    title: "Full-Stack Web Architecture",
    description:
      "Engineering robust, type-safe web applications using Next.js App Router, React, and modular backend APIs designed for high velocity, security, and scalability.",
    highlights: [
      "Server-side rendering (SSR) & static optimization",
      "Type-safe REST & GraphQL API integrations",
      "Production-grade component systems & SEO",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    accentColor: "from-blue-500/20 to-cyan-500/20",
    icon: (
      <svg className="w-5 h-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "02",
    category: "Creative Engineering",
    title: "3D & Interactive Experiences",
    description:
      "Bringing digital products to life with Three.js, WebGL shader graphics, and fluid 60fps kinetic interactions that elevate brand identity and user engagement.",
    highlights: [
      "Interactive 3D scenes & WebGL shaders",
      "Framer Motion & GSAP kinetic choreographies",
      "Spatial UI & tactile micro-interactions",
    ],
    techStack: ["Three.js", "WebGL", "GSAP", "Framer Motion", "GLSL"],
    accentColor: "from-amber-500/20 to-orange-500/20",
    icon: (
      <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    category: "Systems & Infrastructure",
    title: "Cloud & Realtime Systems",
    description:
      "Designing distributed microservice architectures, sub-millisecond Redis caching layers, WebSockets, and containerized cloud deployment pipelines.",
    highlights: [
      "Low-latency WebSocket & WebRTC streaming",
      "In-memory caching & rate-limiting with Redis",
      "Dockerized container builds & automated CI/CD",
    ],
    techStack: ["Docker", "Redis", "WebSockets", "PostgreSQL", "WebRTC"],
    accentColor: "from-emerald-500/20 to-teal-500/20",
    icon: (
      <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
        <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      className="relative bg-[#070709] py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden text-white border-t border-white/5"
      id="services"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-amber-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                03 CAPABILITIES &amp; ARCHITECTURE
              </span>
            </div>

            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight uppercase leading-tight">
              SERVICES &amp; DIGITAL SYSTEMS
            </h2>
          </div>

          <p className="text-sm text-zinc-400 font-sans max-w-md leading-relaxed">
            Synthesizing full-stack engineering reliability, interactive 3D WebGL visuals, and resilient cloud architectures.
          </p>
        </div>

        {/* 3-Column Clean Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl bg-[#0f1015] border border-white/10 p-7 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-1 hover:shadow-2xl overflow-hidden"
            >
              {/* Subtle card top glow */}
              <div
                className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${service.accentColor} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10 space-y-6">
                {/* Top Row: Icon + Number badge */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:border-white/20 transition-all duration-300">
                    {service.icon}
                  </div>
                  <span className="font-mono text-xs font-semibold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {service.number} // {service.category}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-headline text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Key Deliverables / Highlights */}
                <div className="pt-2 space-y-2 border-t border-white/5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-2 font-semibold">
                    Key Capabilities
                  </span>
                  <ul className="space-y-2">
                    {service.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <span className="text-amber-400/80 mt-0.5 select-none text-[10px]">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Tech Pills */}
              <div className="relative z-10 pt-6 mt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono tracking-wider uppercase bg-white/[0.03] text-zinc-300 border border-white/5 group-hover:border-white/10 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
