"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";

export default function Work() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  return (
    <section className="relative bg-[#f8f9fa] text-neutral-900 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden" id="work">
      <div className="max-w-7xl mx-auto">
        
        {/* ─── SECTION 3 HEADER: SPLIT EDITORIAL ROW ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16 sm:mb-20">
          {/* Left Column: Heading + View Case Studies Button */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-950 leading-[1.08] mb-8">
              Brand Strategy & <br />
              Product Design.
            </h2>

            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white font-headline text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-lg group"
            >
              <span>View Case Studies</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Right Column: Statement Paragraphs */}
          <div className="lg:col-span-6 flex flex-col justify-end lg:pt-4">
            <p className="text-xl sm:text-2xl text-neutral-900 font-sans font-medium leading-snug tracking-tight mb-4">
              Case studies – showing how we craft strong brands and resilient architectures that harness the power of modern web technologies with cutting-edge strategy.
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 font-sans leading-relaxed max-w-lg">
              We design clear visual systems, high-concurrency cloud pipelines, and fluid 3D WebGL experiences for modern ambitious products everywhere.
            </p>
          </div>
        </div>

        {/* ─── 4-CARD STAGGERED BENTO DECK (MATCHING REFERENCE EXACTLY) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
          
          {/* CARD 1: STRATEGY */}
          <div className="relative rounded-3xl bg-[#0e0e11] text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl border border-neutral-800 min-h-[360px] group hover:-translate-y-1 transition-transform duration-500">
            {/* Top pill badge */}
            <div className="self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-sans font-medium text-white/90">
              Strategy
            </div>

            {/* Bottom Content */}
            <div className="mt-auto pt-16">
              <span className="text-xl text-neutral-500 font-light block mb-3 select-none">+</span>
              <h3 className="font-headline text-base sm:text-lg font-semibold text-white leading-snug mb-3">
                Strategies that define the new standard
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                We don&apos;t just follow trends, we build the fundamental architectures that lead industries and guarantee zero downtime.
              </p>
            </div>
          </div>

          {/* CARD 2: GROWTH (WITH PRODUCT IMAGE) */}
          <div className="relative rounded-3xl bg-[#0e0e11] text-white overflow-hidden shadow-2xl border border-neutral-800 flex flex-col justify-between min-h-[360px] group hover:-translate-y-1 transition-transform duration-500">
            {/* Top pill badge floating over image */}
            <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-sans font-medium text-white">
              Growth
            </div>

            {/* Media showcase image */}
            <div className="relative w-full h-44 overflow-hidden bg-neutral-900">
              <img
                src="/velora.webp"
                alt="Product High-Velocity Architecture"
                className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent" />
            </div>

            {/* Bottom Content */}
            <div className="p-7 sm:p-8 pt-2">
              <span className="text-xl text-neutral-500 font-light block mb-3 select-none">+</span>
              <h3 className="font-headline text-base sm:text-lg font-semibold text-white leading-snug mb-3">
                High-velocity growth, backed by data
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Utilizing sub-millisecond query metrics to architect high-intent pipelines and tangible digital performance.
              </p>
            </div>
          </div>

          {/* CARD 3: CREATIVE (TALL WITH EDITORIAL MODEL/VISUAL) */}
          <div className="relative rounded-3xl bg-[#0e0e11] text-white overflow-hidden shadow-2xl border border-neutral-800 flex flex-col justify-between min-h-[360px] group hover:-translate-y-1 transition-transform duration-500">
            {/* Top pill badge */}
            <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-sans font-medium text-white">
              Creative
            </div>

            {/* Media visual */}
            <div className="relative w-full h-44 overflow-hidden bg-neutral-900">
              <img
                src="/tours.webp"
                alt="Creative 3D Experiences"
                className="w-full h-full object-cover object-center filter brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent" />
            </div>

            {/* Bottom Content */}
            <div className="p-7 sm:p-8 pt-2">
              <span className="text-xl text-neutral-500 font-light block mb-3 select-none">+</span>
              <h3 className="font-headline text-base sm:text-lg font-semibold text-white leading-snug mb-3">
                Radical creativity at the speed of light
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                Fluid visual storytelling and WebGL execution that stops users in their tracks and inspires lasting action.
              </p>
            </div>
          </div>

          {/* CARD 4: IMPACTFUL */}
          <div className="relative rounded-3xl bg-[#0e0e11] text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl border border-neutral-800 min-h-[360px] group hover:-translate-y-1 transition-transform duration-500">
            {/* Top pill badge */}
            <div className="self-start px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-sans font-medium text-white/90">
              Impactful
            </div>

            {/* Bottom Content */}
            <div className="mt-auto pt-16">
              <span className="text-xl text-neutral-500 font-light block mb-3 select-none">+</span>
              <h3 className="font-headline text-base sm:text-lg font-semibold text-white leading-snug mb-3">
                Unstoppable talent, unified vision
              </h3>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                A dedicated full-stack skillset navigating your product from inception to production scale worldwide.
              </p>
            </div>
          </div>

        </div>

        {/* ─── LIVE PROJECT SPOTLIGHTS ROW (Retaining all Case Studies) ─── */}
        {projects && projects.length > 0 && (
          <div className="relative mt-20 pt-16 pb-6 border-t border-neutral-200/90 overflow-hidden">
            {/* Ambient Gradients */}
            <div className="absolute -top-20 left-10 w-96 h-96 bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 right-10 w-96 h-96 bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-emerald-500/[0.02] via-transparent to-amber-500/[0.02] pointer-events-none" />

            {/* Subtle Dot Grid Pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                backgroundImage: `radial-gradient(#9ca3af 1px, transparent 1px)`,
                backgroundSize: "20px 20px",
                maskImage: "radial-gradient(ellipse at center, black 65%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 95%)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Featured Case Studies</span>
                <h3 className="font-headline text-2xl sm:text-3xl font-semibold text-neutral-950 mt-1">Production Builds</h3>
              </div>
              <Link href="/projects" className="text-xs font-headline font-semibold uppercase tracking-wider text-neutral-900 hover:text-emerald-700 transition-colors">
                All Projects ({projects.length}) →
              </Link>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {projects.slice(0, 4).map((p) => (
                <div key={p.slug} className="group rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-200/90 p-5 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-headline font-semibold text-lg text-neutral-950 mb-1">{p.title}</h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 mb-4 font-sans">{p.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-neutral-100 mt-auto">
                    {p.liveUrl ? (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-neutral-900 hover:text-emerald-600 transition-colors">
                        Live Preview ↗
                      </a>
                    ) : (
                      <Link href={`/projects/${p.slug}`} className="font-bold text-neutral-900 hover:text-emerald-600 transition-colors">
                        Case Study →
                      </Link>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 transition-colors">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

