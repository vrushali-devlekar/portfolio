interface Props {
  category: string;
  badge: string;
  title: string;
  description: string;
}

export default function ToolHeader({ category, badge, title, description }: Props) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#f5b907]/10 text-[#f5b907] border border-[#f5b907]/20 font-semibold">
          {category}
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {badge}
        </span>
      </div>

      <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
        {title}
      </h1>

      <p className="text-zinc-400 text-sm sm:text-base max-w-2xl font-sans leading-relaxed">
        {description}
      </p>

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-zinc-400">
        <i className="ri-shield-check-line text-emerald-400 text-sm" />
        <span>Your data is processed locally in your browser. Zero cloud transmission.</span>
      </div>
    </div>
  );
}
