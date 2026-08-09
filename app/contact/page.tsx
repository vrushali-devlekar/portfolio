"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <SmoothScroll>
        <Navbar />
        <main className="flex-grow py-24 px-6 flex items-center justify-center min-h-screen bg-[#0F0F12]">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
            
            {/* Left Column: Direct Contact Links */}
            <motion.div
              className="md:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent text-glow">
                  Get in Touch
                </span>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none mt-3 uppercase text-white">
                  Let&apos;s build <br />
                  something <br />
                  <em className="text-accent not-italic font-extralight text-glow">
                    together
                  </em>
                </h1>
              </div>

              <div className="space-y-3.5">
                {/* Email */}
                <a
                  href="mailto:vrushalidevlekar12@gmail.com"
                  className="flex items-center gap-3.5 p-3.5 bg-card/20 border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/[0.04] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="w-9 h-9 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <i className="ri-mail-line text-base"></i>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Email
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-200 group-hover:text-white font-mono truncate">
                      vrushalidevlekar12@gmail.com
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/vrushali-devlekar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 bg-card/20 border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/[0.04] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="w-9 h-9 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <i className="ri-linkedin-box-fill text-base"></i>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      LinkedIn
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-200 group-hover:text-white font-mono truncate">
                      linkedin.com/in/vrushali-devlekar
                    </span>
                  </div>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/vrushali-devlekar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 bg-card/20 border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/[0.04] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="w-9 h-9 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <i className="ri-github-fill text-base"></i>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      GitHub
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-200 group-hover:text-white font-mono truncate">
                      github.com/vrushali-devlekar
                    </span>
                  </div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/rushali.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-3.5 bg-card/20 border border-white/10 rounded-xl hover:border-accent/50 hover:bg-white/[0.04] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="w-9 h-9 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
                    <i className="ri-instagram-line text-base"></i>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Instagram
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-200 group-hover:text-white font-mono truncate">
                      instagram.com/rushali.io
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 bg-card/20 border border-white/10 rounded-xl">
                  <div className="w-9 h-9 rounded-lg border border-accent/30 bg-accent/10 flex items-center justify-center text-accent">
                    <i className="ri-map-pin-line text-base"></i>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      Location
                    </span>
                    <span className="text-xs sm:text-sm text-zinc-200 font-mono truncate">
                      Mumbai, India
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: High-Impact Calendly CTA Box */}
            <motion.div
              className="md:col-span-7 bg-[#141419] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-between space-y-8 min-h-[460px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {/* Background ambient lighting */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E05638]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10">
                  <i className="ri-calendar-event-line text-[#E05638] text-sm" />
                  <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider">
                    Schedule 1-on-1 Call
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  Ready to discuss a project or role?
                </h2>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-lg">
                  Pick a time on my calendar for a quick 1-on-1 discovery call. We can discuss your engineering goals, architecture requirements, or potential team collaborations.
                </p>
              </div>

              {/* Calendly Action Button */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="text-xs text-zinc-400 font-mono">
                  ● Free 30-min consultation
                </span>
                
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#E05638] via-amber-500 to-amber-400 text-black font-mono text-xs font-extrabold uppercase tracking-wider shadow-[0_0_25px_rgba(224,86,56,0.35)] hover:shadow-[0_0_35px_rgba(224,86,56,0.55)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  <span>Book a Call on Calendly</span>
                  <i className="ri-arrow-right-line text-base" />
                </a>
              </div>

            </motion.div>

          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </ErrorBoundary>
  );
}
