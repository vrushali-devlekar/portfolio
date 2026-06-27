"use client";

import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <div className="w-full rounded-2xl border border-border bg-card/40 p-5 flex flex-col space-y-4 shadow-sm border-glow">
      <div className="w-full aspect-[16/10] rounded-xl bg-muted/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
        />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-2/3 bg-muted/30 rounded relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          />
        </div>
        <div className="h-3.5 w-1/2 bg-muted/20 rounded relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-muted/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}
