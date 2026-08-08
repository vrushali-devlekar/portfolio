"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Disc, Activity, Code, MapPin, Sparkles, Terminal } from "lucide-react";

export default function BentoDashboard() {
  const [time, setTime] = useState<string>("");
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in IST (Asia/Kolkata)
      const timeFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const dateFormatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "short",
        month: "short",
        day: "numeric",
      });

      setTime(timeFormatter.format(now));
      setDateStr(dateFormatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6 bg-[#F4EEDD] bg-graph-paper relative border-t border-[#1C1C1C]/10" id="widgets">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="tag-badge mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
            <span>06 // Utility & Lifestyle Dashboard</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1C1C1C] tracking-tight">
            Utility <span className="italic text-[#E05638]">Widgets & Status</span>
          </h2>
        </div>

        {/* Bento Widgets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Widget 1: Live IST Clock Card (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 retro-card p-6 rounded-2xl border border-[#1C1C1C]/15 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E05638]" />
                <span>LOCAL TIME (IST)</span>
              </div>
              <span className="text-[10px] text-[#666666] uppercase font-semibold">Asia/Kolkata</span>
            </div>

            <div className="my-4">
              <div className="text-3xl lg:text-4xl font-extrabold font-mono text-[#1C1C1C] tracking-tight">
                {time || "12:00:00 PM"}
              </div>
              <div className="text-xs font-mono text-[#E05638] font-bold mt-2 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Mumbai, India • GMT +5:30</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C]/10 flex items-center justify-between text-[11px] font-mono text-[#666666]">
              <span>{dateStr || "Sat, Aug 8"}</span>
              <span className="text-[#E05638] font-bold">Working Hours</span>
            </div>
          </motion.div>

          {/* Widget 2: Availability & Open Opportunities Badge Card (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 retro-card p-6 rounded-2xl border border-[#1C1C1C]/15 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E05638]" />
                <span>AVAILABILITY</span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#E05638] animate-pulse shadow-sm" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E05638]/10 border border-[#E05638]/30 text-[#E05638] text-xs font-mono font-bold uppercase mb-3">
                <span>Open for Opportunities</span>
              </div>
              <p className="text-xs text-[#1C1C1C]/80 leading-relaxed font-sans">
                Available for full-time engineering roles, high-impact backend contracts, and architecture design consultations.
              </p>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C]/10 flex items-center justify-between text-[11px] font-mono text-[#666666] mt-4">
              <span>Focus: Next.js & Microservices</span>
            </div>
          </motion.div>

          {/* Widget 3: Currently Playing / Media & Workspace Card (Col 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 retro-card p-6 rounded-2xl border border-[#1C1C1C]/15 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-[#E05638]" />
                <span>ACTIVE WORKSPACE</span>
              </div>
              <span className="text-[10px] text-[#E05638] font-mono font-bold">VS CODE</span>
            </div>

            <div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/10">
                <Disc className="w-7 h-7 text-[#E05638] animate-spin" style={{ animationDuration: "6s" }} />
                <div>
                  <div className="text-xs font-bold text-[#1C1C1C] font-mono">Building Portfolio v2</div>
                  <div className="text-[11px] text-[#666666] font-mono">Next.js App Router & Tailwind</div>
                </div>
              </div>
            </div>

            {/* Equalizer Wave simulation */}
            <div className="pt-4 border-t border-[#1C1C1C]/10 flex items-center justify-between text-[11px] font-mono text-[#666666] mt-4">
              <span>Deep Work Session</span>
              <div className="flex items-end gap-1 h-3">
                <span className="w-0.5 h-3 bg-[#E05638] animate-pulse" />
                <span className="w-0.5 h-2 bg-[#1C1C1C] animate-pulse" style={{ animationDelay: "0.2s" }} />
                <span className="w-0.5 h-3.5 bg-[#E05638] animate-pulse" style={{ animationDelay: "0.4s" }} />
                <span className="w-0.5 h-1.5 bg-[#1C1C1C] animate-pulse" style={{ animationDelay: "0.1s" }} />
              </div>
            </div>
          </motion.div>

          {/* Widget 4: Quick Telemetry Stats & Activity Feed (Col 12) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-12 retro-card p-6 rounded-2xl border border-[#1C1C1C]/15"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "GITHUB COMMITS", val: "1,240+", icon: <Terminal className="w-4 h-4 text-[#E05638] mx-auto mb-1" /> },
                { label: "PROJECTS DELIVERED", val: "14+", icon: <Activity className="w-4 h-4 text-[#1C1C1C] mx-auto mb-1" /> },
                { label: "TEST COVERAGE", val: "92%", icon: <Sparkles className="w-4 h-4 text-[#E05638] mx-auto mb-1" /> },
                { label: "RESPONSE TIME", val: "< 2 hrs", icon: <Clock className="w-4 h-4 text-[#1C1C1C] mx-auto mb-1" /> },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#EFE9D5]/60 border border-[#1C1C1C]/10">
                  {stat.icon}
                  <div className="text-xl font-bold font-mono text-[#1C1C1C] my-1">{stat.val}</div>
                  <div className="text-[10px] font-mono text-[#666666] font-semibold uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
