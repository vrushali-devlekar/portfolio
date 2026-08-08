"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, CheckCircle2 } from "lucide-react";

export default function Timeline() {
  const experiences = [
    {
      period: "2024 — PRESENT",
      role: "Senior Full Stack Engineer & Systems Architect",
      company: "Enterprise Cloud Platforms",
      location: "Mumbai, India",
      achievements: [
        "Architected single-click deployment dashboard supporting real-time SSE log streaming.",
        "Reduced API gateway latency by 65% using Redis token bucket rate limiters.",
        "Mentored junior engineers and established automated CI/CD security scanning workflows.",
      ],
      tech: ["Next.js 15", "TypeScript", "Node.js", "Redis", "Docker", "AWS"],
    },
    {
      period: "2022 — 2024",
      role: "Full Stack Software Developer",
      company: "Digital Product Studio",
      location: "Mumbai, India",
      achievements: [
        "Engineered high-concurrency tourism engine with sub-400ms destination queries.",
        "Structured MongoDB Atlas compound indexes and optimized image delivery pipelines.",
        "Integrated secure payment auth workflows and microservice transaction safety.",
      ],
      tech: ["React", "Redux", "Express", "MongoDB", "Tailwind CSS"],
    },
    {
      period: "2021 — 2022",
      role: "Frontend Engineer & UI Developer",
      company: "Creative Web Labs",
      location: "Mumbai, India",
      achievements: [
        "Crafted modular, type-safe design systems with 100/100 Lighthouse performance scores.",
        "Implemented smooth hardware-accelerated animations using GSAP and Framer Motion.",
        "Collaborated with cross-functional product leads to increase user retention by 35%.",
      ],
      tech: ["JavaScript", "React", "CSS3 / Sass", "Framer Motion", "Figma"],
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="experience">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="tag-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
            <span>05 // Career Timeline</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
            Career & <span className="italic text-[#E05638]">Experience</span>
          </h2>
        </div>

        {/* Vertical Timeline Sequence */}
        <div className="relative pl-6 md:pl-8 border-l border-[#1C1C1C]/20 space-y-10 max-w-4xl mx-auto">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline Node Dot */}
              <div className="absolute -left-[31px] md:-left-[39px] top-2 w-4 h-4 rounded-full bg-[#F4EEDD] border-2 border-[#E05638] group-hover:bg-[#E05638] transition-all duration-300" />

              <div className="retro-card p-6 md:p-8 rounded-2xl border border-[#1C1C1C]/15 group-hover:border-[#E05638]/40 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#E05638] tracking-wider uppercase">
                      {exp.period}
                    </span>
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1C1C1C] mt-1">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#666666]">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-[#E05638]" />
                      {exp.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#666666]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Achievements List */}
                <div className="space-y-2.5 mb-6">
                  {exp.achievements.map((item, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E05638] shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-[#1C1C1C]/80 leading-relaxed font-sans">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1C1C1C]/10">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-[#EFE9D5] border border-[#1C1C1C]/10 text-[#1C1C1C] font-medium"
                    >
                      {t}
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
