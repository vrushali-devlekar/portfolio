import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function NotFound() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="min-h-screen flex flex-col items-center justify-center bg-[#060606] text-white px-6 text-center relative overflow-hidden pt-20">
          
          {/* Subtle Ambient Radial Glows */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

          {/* Grid lines background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            
            {/* Status Monospace Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
                {"// ERROR 404: ROUTE_NOT_FOUND"}
              </span>
            </div>

            {/* Giant 404 Headline */}
            <h1 className="text-8xl sm:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 drop-shadow-[0_0_35px_rgba(245,185,7,0.3)] select-none">
              404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Lost in Digital Space
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-md mx-auto">
              The page or node you are searching for doesn&apos;t exist, has been relocated, or is temporarily offline.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:from-amber-300 hover:to-amber-400 shadow-[0_0_20px_rgba(245,185,7,0.3)] hover:shadow-[0_0_30px_rgba(245,185,7,0.5)] transition-all duration-200"
              >
                <i className="ri-home-4-line text-sm" />
                <span>Return to Home</span>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 font-mono text-xs font-semibold uppercase tracking-wider hover:border-amber-400/40 hover:bg-white/[0.08] hover:text-white transition-all duration-200"
              >
                <i className="ri-folder-open-line text-sm" />
                <span>Explore Projects</span>
              </Link>
            </div>

          </div>

        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
