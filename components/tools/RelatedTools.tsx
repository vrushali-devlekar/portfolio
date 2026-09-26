import Link from "next/link";
import { getRelatedTools } from "@/lib/toolsData";
import ToolCard from "./ToolCard";

interface Props {
  currentSlug: string;
}

export default function RelatedTools({ currentSlug }: Props) {
  const related = getRelatedTools(currentSlug, 3);

  return (
    <section className="mt-16 pt-12 border-t border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
              MORE DEVELOPER TOOLS
            </span>
          </div>
          <h2 className="font-headline text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Related Free Online Tools
          </h2>
        </div>

        <Link
          href="/tools"
          className="text-xs font-mono text-[#f5b907] hover:text-amber-300 flex items-center gap-1.5 transition-colors font-semibold"
        >
          <span>All Developer Tools ({6})</span>
          <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
