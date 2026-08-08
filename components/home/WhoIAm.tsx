"use client";

import { motion } from "framer-motion";
import { User, Cpu, Shield, Zap, Sparkles, Code2, Compass, HeartHandshake } from "lucide-react";

export default function WhoIAm() {
  const principles = [
    {
      icon: <Zap className="w-4 h-4 text-[#E05638]" />,
      title: "Performance & Low Latency",
      desc: "Optimizing APIs and state pipelines for sub-100ms response cycles.",
    },
    {
      icon: <Shield className="w-4 h-4 text-[#E05638]" />,
      title: "Security & Microservices",
      desc: "Designing resilient backend architectures with Redis rate limiting and token auth.",
    },
    {
      icon: <Code2 className="w-4 h-4 text-[#E05638]" />,
      title: "Clean Design Systems",
      desc: "Structuring type-safe, reusable Next.js/React component libraries.",
    },
    {
      icon: <Compass className="w-4 h-4 text-[#E05638]" />,
      title: "Result-Driven Engineering",
      desc: "Bridging complex technical solutions with intuitive user experiences.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="about">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Tag & Heading */}
        <div className="mb-12">
          <div className="tag-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
            <span>WHO I AM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
            Bridging <span className="italic text-[#E05638]">Code, Context & System Architecture</span>
          </h2>
        </div>

        {/* Bento Layout Grid for "Who I Am" */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Story & Philosophy Card (Col 7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 retro-card p-8 md:p-10 rounded-2xl border border-[#1C1C1C]/15 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] uppercase mb-4 font-semibold">
                <User className="w-4 h-4" />
                <span>Developer Profile & Philosophy</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1C1C1C] leading-snug mb-6">
                A software engineer focused on building high-performance web systems that feel natural, perform flawlessly, and scale elegantly.
              </h3>

              <div className="space-y-4 text-sm text-[#666666] leading-relaxed font-sans">
                <p>
                  Based in Mumbai, India, I collaborate with forward-thinking teams globally to craft end-to-end web applications. My practice centers on structural integrity, low-latency API infrastructure, and thoughtful user interfaces.
                </p>
                <p>
                  I believe exceptional software is built at the intersection of technical rigor and intentional design. Whether refactoring complex database queries or engineering low-overhead real-time log streaming, I prioritize maintainability and speed.
                </p>
              </div>
            </div>

            {/* Quote Box */}
            <div className="mt-8 pt-6 border-t border-[#1C1C1C]/10 flex items-start gap-3 bg-[#EFE9D5]/60 p-4 rounded-xl border border-[#1C1C1C]/10">
              <HeartHandshake className="w-5 h-5 text-[#E05638] shrink-0 mt-0.5" />
              <p className="text-xs font-serif italic text-[#1C1C1C]/90 leading-relaxed">
                &ldquo;Simplicity, speed, and reliability are not features — they are the core foundations of great software.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Core Principles Grid (Col 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-4"
          >
            <div className="retro-card p-6 rounded-2xl border border-[#1C1C1C]/15 flex-grow">
              <div className="flex items-center gap-2 text-xs font-mono text-[#E05638] uppercase mb-4 font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Core Engineering Pillars</span>
              </div>

              <div className="space-y-4">
                {principles.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/10 hover:bg-white hover:border-[#E05638]/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="p-1.5 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <h4 className="text-xs font-mono font-bold text-[#1C1C1C]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-[#666666] leading-relaxed pl-9">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
