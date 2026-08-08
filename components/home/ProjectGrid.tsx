"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export default function ProjectGrid() {
  const secondaryProjects = [
    {
      step: "01",
      title: "Pack & Explore",
      subtitle: "High-Concurrency Tourism Booking Platform",
      desc: "Interactive travel engine with real-time destination inventory, Redis pricing caching, and MongoDB compound query optimizations.",
      tags: ["React", "Redux", "Node.js", "MongoDB", "Redis"],
      image: "/tours.png",
      liveUrl: "https://pack-explore.onrender.com/",
      githubUrl: "https://github.com/vrushali-devlekar",
    },
    {
      step: "02",
      title: "Gaming Stream SaaS",
      subtitle: "High-Throughput Telemetry Dashboard",
      desc: "Real-time gaming analytics platform using WebSockets and Redis Pub/Sub state distribution across connected client sessions.",
      tags: ["Next.js", "WebSockets", "PostgreSQL", "Recharts", "Framer Motion"],
      image: "/game.png",
      liveUrl: "#",
      githubUrl: "https://github.com/vrushali-devlekar",
    },
    {
      step: "03",
      title: "Dev Pulse CLI Suite",
      subtitle: "Automated Codebase Insight & Health Audit Tool",
      desc: "Lightweight developer CLI to measure dependency vulnerability risks, bundle weights, and CI build pipeline efficiencies.",
      tags: ["TypeScript", "Node.js", "Docker", "CLI Tooling"],
      image: "/velora.png",
      liveUrl: "#",
      githubUrl: "https://github.com/vrushali-devlekar",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="projects">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="tag-badge mb-4">
              <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
              <span>03 // Selected Projects List</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
              Selected <span className="italic text-[#E05638]">Projects Archive</span>
            </h2>
          </div>

          <a
            href="https://github.com/vrushali-devlekar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#666666] hover:text-[#E05638] transition-colors group"
          >
            <span>View GitHub Repository Archive</span>
            <ArrowUpRight className="w-4 h-4 text-[#E05638] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Stacked Numbered Project Cards */}
        <div className="space-y-8">
          {secondaryProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="retro-card p-6 md:p-8 rounded-2xl border border-[#1C1C1C]/15 group hover:border-[#E05638]/40 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Step Number & Content (Col 7) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-mono font-bold text-[#E05638] px-2.5 py-1 rounded bg-[#E05638]/10 border border-[#E05638]/25">
                        {project.step}
                      </span>
                      <span className="text-xs font-mono text-[#666666] font-semibold uppercase">
                        {project.subtitle}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1C1C] mb-3 group-hover:text-[#E05638] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-[#666666] leading-relaxed mb-6 font-sans">
                      {project.desc}
                    </p>

                    {/* Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#EFE9D5] border border-[#1C1C1C]/10 text-[#1C1C1C] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#1C1C1C]/10 text-xs font-mono">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-bold text-[#E05638] hover:text-[#c94529] transition-colors"
                    >
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[#666666] hover:text-[#1C1C1C] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </div>

                {/* Right Image Frame (Col 5) */}
                <div className="lg:col-span-5 relative aspect-[16/10] overflow-hidden rounded-xl bg-[#EFE9D5] border border-[#1C1C1C]/15 shadow-sm">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
