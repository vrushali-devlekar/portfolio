"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import Link from "next/link";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Work() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  useEffect(() => {
    if (isLoading || !projects) return;

    const ctx = gsap.context(() => {
      // Work Header fade-in
      gsap.fromTo(
        ".work-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".work",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Project Cards staggered slide up
      gsap.fromTo(
        ".project-card-dribbble",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, [projects, isLoading]);

  return (
    <section
      className="work w-full py-24 px-[6%] bg-[#060606] border-t border-border relative overflow-hidden"
      id="work"
    >
      <div className="corner-glow corner-glow-top-right"></div>
      <div className="corner-dots corner-dots-bottom-left opacity-60"></div>
      <div className="max-w-[1350px] mx-auto space-y-12">
        {/* Header */}
        <div className="work-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="mini font-mono tracking-widest text-[#f5b907] uppercase">
              SELECTED WORK
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mt-2">
              Selected Work
            </h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-white/5 text-xs font-mono uppercase tracking-wider text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 select-none group w-fit"
          >
            View All Projects
            <i className="ri-arrow-right-up-line transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-sm"></i>
          </Link>
        </div>

        {/* Content list */}
        {error ? (
          <div className="text-center py-12 border border-dashed border-red-500/30 rounded-2xl bg-red-500/5">
            <p className="text-sm text-red-400">
              Failed to load projects. Please try refreshing.
            </p>
          </div>
        ) : isLoading ? (
          <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="w-full aspect-[4/3] bg-card animate-pulse rounded-[16px] border border-border"></div>
            <div className="w-full aspect-[4/3] bg-card animate-pulse rounded-[16px] border border-border"></div>
            <div className="w-full aspect-[4/3] bg-card animate-pulse rounded-[16px] border border-border"></div>
          </div>
        ) : (
          <div className="projects-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects?.map((project, idx) => {
              const isDev = project.devStatus;

              return (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className={`project-card-dribbble group block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
