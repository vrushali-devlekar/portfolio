"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  const getCategory = (slug: string) => {
    switch (slug) {
      case "velora-deploy":
        return "Web Application / SaaS Platform";
      case "tours-booking":
        return "Web Design, Business Website";
      case "gaming-stream":
        return "3D Web Application";
      default:
        return "Web Application";
    }
  };

  const getTechsForSlug = (slug: string) => {
    switch (slug) {
      case "velora-deploy":
        return ["React.js", "Next.js", "Tailwind CSS", "Node.js", "REST API", "MongoDB", "Express", "Docker", "AWS EC2"];
      case "tours-booking":
        return ["React.js", "Redux", "Tailwind CSS", "Node.js", "REST API", "MongoDB", "Express", "Docker", "Nginx"];
      case "gaming-stream":
        return ["React.js", "Next.js", "Tailwind CSS", "Node.js", "REST API", "PostgreSQL", "Socket.io", "Redis", "Docker"];
      default:
        return ["React.js", "Next.js", "Tailwind CSS"];
    }
  };

  const renderTechPills = (slug: string) => {
    const allTechs = getTechsForSlug(slug);
    const limit = 5;
    const displayed = allTechs.slice(0, limit);
    const remaining = allTechs.length - limit;

    return (
      <div className="flex flex-wrap gap-2 mt-3">
        {displayed.map((tech, tIdx) => (
          <span
            key={tIdx}
            className="border border-amber-950 bg-amber-950/20 text-zinc-300 text-[10px] font-mono rounded-full px-2.5 py-0.5 hover:border-[#f5b907]/30 hover:bg-amber-950/40 hover:text-[#f5b907] transition-all duration-200 cursor-default"
          >
            {tech}
          </span>
        ))}
        {remaining > 0 && (
          <span className="border border-amber-950 bg-amber-950/20 text-[#f5b907] text-[10px] font-mono rounded-full px-2.5 py-0.5 font-bold cursor-default">
            +{remaining} more
          </span>
        )}
      </div>
    );
  };

  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow py-24 px-6 bg-[#030712]">
          <div className="max-w-[1350px] w-full mx-auto space-y-12 mt-8">
            
            {/* Header */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f5b907]/20 bg-[#f5b907]/5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f5b907] animate-pulse"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#f5b907] uppercase font-semibold">
                  SELECTED WORK
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-tight text-white mt-2">
                Projects
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl font-sans">
                A focused showcase of digital systems, platforms, and
                interactive interfaces built with precision.
              </p>
            </motion.div>

            {/* Content grid */}
            {error ? (
              <div className="text-center py-12 border border-dashed border-red-500/30 rounded-2xl bg-red-500/5">
                <p className="text-sm text-red-400">
                  Failed to load projects. Please try refreshing.
                </p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="w-full aspect-[16/10] bg-zinc-950/60 animate-pulse rounded-2xl border border-slate-900"></div>
                <div className="w-full aspect-[16/10] bg-zinc-950/60 animate-pulse rounded-2xl border border-slate-900"></div>
                <div className="w-full aspect-[16/10] bg-zinc-950/60 animate-pulse rounded-2xl border border-slate-900"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projects?.map((project, idx) => {
                  const isDev = project.devStatus;

                  return (
                    <motion.div
                      key={project.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.08 }}
                    >
                      <div className="group block bg-zinc-950/60 border border-slate-900 rounded-2xl p-4 transition-all duration-300 relative overflow-hidden backdrop-blur-md hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,185,7,0.02)]">
                        
                        {/* Card Image Wrapper with Hover Overlay */}
                        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-card border border-border/40">
                          {/* Image */}
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                          {/* Category Badge (Top Left) */}
                          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-white bg-orange-600 border border-orange-500/20 backdrop-blur-sm z-10 select-none">
                            {getCategory(project.slug)}
                          </div>

                          {/* Featured Badge (Top Right) */}
                          <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider text-black bg-[#f5b907] border border-[#f5b907]/20 flex items-center gap-1 z-10 select-none">
                            <span>★</span>
                            <span>Featured</span>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            {/* Case Study Link */}
                            <Link
                              href={`/projects/${project.slug}`}
                              className="px-4 py-2 rounded-full bg-[#f5b907] text-black font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#e0a905] transition-all hover:scale-105 shadow-md"
                            >
                              <i className="ri-star-line text-sm"></i>
                              Case Study
                            </Link>

                            {/* Live Link */}
                            {project.liveUrl && !isDev ? (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-full bg-white text-black font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-200 transition-all hover:scale-105 shadow-md"
                              >
                                <i className="ri-external-link-line text-sm"></i>
                                Live
                              </a>
                            ) : (
                              <span className="px-4 py-2 rounded-full bg-neutral-800 text-neutral-500 font-mono font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-not-allowed select-none">
                                <i className="ri-external-link-line text-sm"></i>
                                Live
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title and Info */}
                        <div className="pt-5 pb-2 px-1">
                          <Link href={`/projects/${project.slug}`}>
                            <h2 className="text-xl font-extrabold text-white leading-snug hover:text-[#f5b907] transition-colors duration-300 font-sans tracking-tight cursor-pointer">
                              {project.title}
                            </h2>
                          </Link>
                          
                          <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-3 line-clamp-3">
                            {project.star.situation.slice(0, 140)}...
                          </p>

                          {/* Technologies Section */}
                          <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[#f5b907]/90 font-bold uppercase mt-5 select-none">
                            <span>&lt;/&gt;</span>
                            <span className="text-zinc-500"> Technologies</span>
                          </div>

                          {renderTechPills(project.slug)}
                        </div>

                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
