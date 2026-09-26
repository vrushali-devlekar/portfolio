import Link from "next/link";

interface Props {
  currentName: string;
}

export default function ToolBreadcrumb({ currentName }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-6 select-none flex-wrap">
      <Link href="/" className="hover:text-white transition-colors flex items-center gap-1 focus:outline-none focus-visible:underline">
        <i className="ri-home-4-line text-xs" />
        <span>Home</span>
      </Link>
      <span className="text-zinc-600">/</span>
      <Link href="/tools" className="hover:text-white transition-colors focus:outline-none focus-visible:underline">
        <span>Tools</span>
      </Link>
      <span className="text-zinc-600">/</span>
      <span className="text-amber-400 font-semibold truncate max-w-[200px] sm:max-w-none" aria-current="page">
        {currentName}
      </span>
    </nav>
  );
}
