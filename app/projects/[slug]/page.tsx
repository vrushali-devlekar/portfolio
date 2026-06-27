import { caseStudies } from "@/lib/caseStudies";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export async function generateStaticParams() {
  return caseStudies.map((project) => ({
    slug: project.slug,
  }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectCaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="project-grid-bg flex-grow py-24 px-6 overflow-hidden relative">
          <div className="project-grid-bg-glow-left"></div>
          <div className="project-grid-bg-glow-right"></div>
          <div className="max-w-4xl mx-auto space-y-12 mt-8 relative z-10">
            
            {/* Navigation Header */}
            <div className="flex items-center justify-between pb-6">
              <Link
                href="/projects"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors p-2 -ml-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
              >
                <i className="ri-arrow-left-line"></i>
                <span>Back to projects</span>
              </Link>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent hover:text-foreground transition-colors p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg text-glow"
                >
                  <span>Launch Live App</span>
                  <i className="ri-arrow-right-up-line"></i>
                </a>
              )}
            </div>

            {/* Title / Description */}
            <div className="space-y-4">
              <span className="mini font-mono tracking-widest text-accent uppercase">
                STAR Case Study
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight uppercase">
                {project.title}
              </h1>
              <p className="text-muted text-base sm:text-lg">
                {project.subtitle}
              </p>
            </div>

            {/* Architectural Matrix & Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Architecture specs */}
              <div className="md:col-span-7 bg-card/45 p-6 rounded-2xl space-y-4 border-glow">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent text-glow">
                  System Architecture
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted font-medium">Frontend Layer</span>
                    <span className="text-white font-semibold text-right max-w-[200px]">{project.architecture.frontend}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted font-medium">Backend Layer</span>
                    <span className="text-white font-semibold text-right max-w-[200px]">{project.architecture.backend}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-muted font-medium">Database Layer</span>
                    <span className="text-white font-semibold text-right max-w-[200px]">{project.architecture.database}</span>
                  </div>
                  {project.architecture.caching && (
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted font-medium">Caching &amp; State</span>
                      <span className="text-white font-semibold text-right max-w-[200px]">{project.architecture.caching}</span>
                    </div>
                  )}
                  {project.architecture.devops && (
                    <div className="flex justify-between py-1.5">
                      <span className="text-muted font-medium">Infrastructure</span>
                      <span className="text-white font-semibold text-right max-w-[200px]">{project.architecture.devops}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Metrics Specs */}
              <div className="md:col-span-5 bg-card/45 p-6 rounded-2xl flex flex-col justify-between border-glow">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-accent text-glow mb-4">
                    Quantifiable Impact
                  </h3>
                  <ul className="space-y-4">
                    {project.metrics.map((metric, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="ri-check-line text-xs text-accent"></i>
                        </div>
                        <span className="text-xs text-muted font-medium leading-normal">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* STAR Breakdown */}
            <div className="space-y-8 pt-6">
              
              {/* Situation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded">S</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Situation</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-6">
                  {project.star.situation}
                </p>
              </div>

              {/* Task */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-0.5 rounded">T</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Task</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-6">
                  {project.star.task}
                </p>
              </div>

              {/* Action */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-[#f5b907]/10 text-[#f5b907] border border-[#f5b907]/20 px-2.5 py-0.5 rounded">A</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Action</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-6">
                  {project.star.action}
                </p>
              </div>

              {/* Result */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded">R</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">Result</h3>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed pl-6">
                  {project.star.result}
                </p>
              </div>

            </div>

          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
