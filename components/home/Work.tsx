"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { CaseStudy } from "@/lib/caseStudies";

function ProjectCard({ project, index }: { project: CaseStudy; index: number }) {
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
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
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
        className="relative h-full rounded-2xl bg-[#111217] border border-[#1F212B] overflow-hidden flex flex-col justify-between group transition-colors duration-300 hover:border-[#E05638]/40 shadow-xl"
      >
        {/* Radial cursor glow overlay */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 86, 56, 0.25), transparent 40%)`,
          }}
        />

        {/* Card Inner Container */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* macOS Browser Mockup Frame Header */}
            <div className="px-4 py-3 bg-[#0D0E12]/90 border-b border-[#1F212B] flex items-center justify-between gap-3">
              {/* Window Control Dots */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              {/* URL Address Bar */}
              <div className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[11px] font-mono text-neutral-400 truncate max-w-[180px] sm:max-w-[220px]">
                https://devlekar.app/{project.slug}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E05638] animate-pulse" />
                <span className="text-[10px] font-mono text-neutral-400 uppercase hidden sm:inline">Active</span>
              </div>
            </div>

            {/* High-Res Mockup Image Container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/40 group/img">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111217] via-transparent to-transparent opacity-80" />
            </div>

            {/* Card Information */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white group-hover:text-[#E05638] transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 pt-0">
            <div className="pt-4 border-t border-[#1F212B] flex items-center justify-between gap-3">
              <a
                href={project.liveUrl || `/projects/${project.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E05638] hover:bg-[#E05638]/90 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-[#E05638]/20"
              >
                Live Demo ↗
              </a>
              <a
                href={project.githubUrl || "https://github.com/vrushali-devlekar"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-mono text-xs font-semibold tracking-wide transition-all"
              >
                GitHub ↗
              </a>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

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

  return (
    <section className="relative bg-[#0D0E12] py-24 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-[#1F212B]" id="work">
      {/* Ambient Glow background decorative element */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#E05638]/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#E05638] uppercase">
                02 SHIPPED & DELIVERED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Things I built that actually scale.
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-[#1F212B] hover:border-[#E05638]/40 text-xs font-mono font-semibold tracking-wider text-white uppercase transition-all duration-300 group shrink-0 w-fit"
          >
            VIEW ALL PROJECTS
            <span className="text-[#E05638] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </Link>
        </motion.div>

        {/* Projects Content Grid */}
        {error ? (
          <div className="text-center py-12 border border-dashed border-red-500/30 rounded-2xl bg-red-500/5">
            <p className="text-sm font-mono text-red-400">
              Failed to load showcase projects. Please try refreshing.
            </p>
          </div>
        ) : isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full aspect-[4/5] bg-[#111217] animate-pulse rounded-2xl border border-[#1F212B]"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          >
            {projects?.slice(0, 3).map((project, idx) => (
              <ProjectCard key={project.slug} project={project} index={idx} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

