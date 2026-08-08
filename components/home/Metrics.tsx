"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, Code2, Zap } from "lucide-react";

export default function Metrics() {
  const metricsData = [
    {
      label: "SYSTEM UPTIME",
      val: "99.9%",
      unit: "Production SLA",
      icon: <Activity className="w-4 h-4 text-[#E05638]" />,
    },
    {
      label: "LIGHTHOUSE SCORE",
      val: "100/100",
      unit: "Perf & Accessibility",
      icon: <Gauge className="w-4 h-4 text-emerald-400" />,
    },
    {
      label: "LATENCY REDUCTION",
      val: "-65%",
      unit: "Via Redis & SSE",
      icon: <Zap className="w-4 h-4 text-amber-400" />,
    },
    {
      label: "TYPESCRIPT CODE",
      val: "50k+",
      unit: "Tested Lines",
      icon: <Code2 className="w-4 h-4 text-cyan-400" />,
    },
  ];

  return (
    <section className="py-20 bg-[#1A233A] relative border-y border-black/20 text-white overflow-hidden" id="metrics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#E05638]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase font-semibold">
                  {stat.label}
                </span>
                <div className="p-2 rounded-xl bg-white/10 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-extrabold font-mono tracking-tight text-white">
                  {stat.val}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                  {stat.unit}
                </div>
              </div>

              {/* Bottom Orange Accent Line */}
              <div className="mt-4 w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#E05638] w-3/4 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
