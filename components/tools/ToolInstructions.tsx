import { ToolFeature, ToolInstruction } from "@/lib/toolsData";

interface Props {
  toolName: string;
  instructions: ToolInstruction[];
  features: ToolFeature[];
}

export default function ToolInstructions({ toolName, instructions, features }: Props) {
  return (
    <div className="mt-16 space-y-12">
      {/* How to use steps */}
      <section aria-labelledby="instructions-heading">
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
              QUICK START GUIDE
            </span>
          </div>
          <h2 id="instructions-heading" className="font-headline text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            How to Use {toolName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {instructions.map((inst) => (
            <div
              key={inst.step}
              className="p-6 rounded-3xl bg-[#0f1015] border border-white/10 space-y-3 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#f5b907] font-mono font-bold text-sm flex items-center justify-center">
                  {inst.step}
                </span>
                <h3 className="font-headline text-base font-semibold text-white">
                  {inst.title}
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  {inst.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature highlights grid */}
      <section aria-labelledby="features-heading">
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f5b907]" />
            <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
              CORE CAPABILITIES
            </span>
          </div>
          <h2 id="features-heading" className="font-headline text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Engineered for Speed, Privacy &amp; Precision
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#0f1015] border border-white/10 space-y-2.5 shadow-lg"
            >
              <h3 className="font-headline text-sm sm:text-base font-semibold text-white flex items-center gap-2">
                <span className="text-emerald-400">✦</span>
                <span>{feat.title}</span>
              </h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
