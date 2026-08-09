"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sentry } from "@/lib/sentry.client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to Sentry observability
    Sentry.captureException(error, { digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060606] text-white px-6 text-center relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto space-y-6">
        <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
          <i className="ri-error-warning-line text-3xl" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Application Error
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-sans max-w-md mx-auto">
          An unexpected error occurred while rendering this view. Our error monitoring system has logged this incident.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="p-4 bg-zinc-950 border border-red-500/30 text-red-400 font-mono text-xs text-left max-w-md overflow-auto rounded-xl mx-auto">
            {error.message || "Unknown error"}
          </pre>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white/[0.08] hover:text-white transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
