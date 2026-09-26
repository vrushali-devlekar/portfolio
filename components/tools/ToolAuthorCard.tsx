import Link from "next/link";

interface Props {
  githubUrl?: string;
}

export default function ToolAuthorCard({ githubUrl }: Props) {
  return (
    <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#0d0e12] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-900 border border-white/15 shrink-0">
          <img
            src="/vrushali.webp"
            alt="Vrushali Devlekar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-amber-400 font-semibold">
              Built by Vrushali Devlekar
            </span>
          </div>
          <p className="text-xs text-zinc-400 font-sans mt-0.5">
            Full-Stack Engineer &amp; Creative Developer crafting high-performance web systems.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="px-4 py-2 rounded-full border border-white/15 hover:border-white text-xs font-mono text-white transition-colors bg-white/[0.02]"
        >
          View Portfolio
        </Link>
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-white/15 hover:border-white text-xs font-mono text-white transition-colors bg-white/[0.02] flex items-center gap-1.5"
          >
            <i className="ri-github-fill text-sm" />
            <span>Source Code</span>
          </a>
        ) : (
          <a
            href="https://github.com/vrushali-devlekar"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-white/15 hover:border-white text-xs font-mono text-white transition-colors bg-white/[0.02] flex items-center gap-1.5"
          >
            <i className="ri-github-fill text-sm" />
            <span>GitHub</span>
          </a>
        )}
        <Link
          href="/contact"
          className="px-4 py-2 rounded-full bg-[#f5b907] text-black font-mono text-xs font-semibold hover:bg-[#e0a905] transition-colors"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  );
}
