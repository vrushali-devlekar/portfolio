import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#060606] text-white px-6 text-center">
      <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500 font-sans tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-mono text-zinc-300 mt-4">
        Page Not Found
      </h2>
      <p className="text-zinc-400 text-sm max-w-md mt-2 font-sans">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 px-6 py-2.5 rounded-full bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
