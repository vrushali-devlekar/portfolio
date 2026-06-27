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
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow py-24 px-6">
          <div className="max-w-[1350px] w-full mx-auto space-y-12 mt-8">
            
            {/* Header */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mini">Selected Work</span>
              <h1 className="text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white mt-2">
                Projects
              </h1>
              <p className="text-muted text-sm sm:text-base max-w-xl">
                A focused showcase of digital systems, platforms, and interactive interfaces built with precision.
              </p>
            </motion.div>

            {/* Content grid */}
            {error ? (
              <div className="text-center py-12 border border-dashed border-red-500/30 rounded-2xl bg-red-500/5">
                <p className="text-sm text-red-400">Failed to load projects. Please try refreshing.</p>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="w-full aspect-[4/3] bg-card animate-pulse rounded-2xl border border-border"></div>
                <div className="w-full aspect-[4/3] bg-card animate-pulse rounded-2xl border border-border"></div>
                <div className="w-full aspect-[4/3] bg-card animate-pulse rounded-2xl border border-border"></div>
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
                      <Link
                        href={`/projects/${project.slug}`}
                        className={`group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          isDev ? "disabled pointer-events-none opacity-50" : ""
                        }`}
                        aria-disabled={isDev}
                      >
                        {/* Card Image: Dribbble style */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[16px] bg-card border border-border/80">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Metadata Row below card image */}
                        <div className="flex items-center justify-between mt-3 px-1">
                          {/* Left: Arrow icon */}
                          <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-muted group-hover:text-accent group-hover:bg-accent/15 transition-all duration-300">
                            <i className="ri-arrow-right-line text-sm"></i>
                          </div>

                          {/* Right: Project Name */}
                          <span className="text-xs font-semibold text-muted group-hover:text-white transition-colors font-sans">
                            {project.title}
                          </span>
                        </div>
                      </Link>
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
