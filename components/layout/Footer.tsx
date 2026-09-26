export default function Footer() {
  return (
    <footer id="contact" className="w-full py-12 px-6 sm:px-10 lg:px-16 border-t border-white/10 bg-[#070709] text-zinc-400">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="font-headline font-semibold uppercase tracking-wider text-white text-sm">
            VRUSHALI DEVLEKAR
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <p className="text-xs font-mono text-zinc-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/vrushali-devlekar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="GitHub Profile"
          >
            <i className="ri-github-fill text-lg"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/vrushali-devlekar/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="LinkedIn Profile"
          >
            <i className="ri-linkedin-fill text-lg"></i>
          </a>
          <a
            href="https://x.com/vrushali_i"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="X (Twitter) Profile"
          >
            <i className="ri-twitter-x-line text-lg"></i>
          </a>
          <a
            href="https://www.instagram.com/rushu4miiday/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10"
            aria-label="Instagram Profile"
          >
            <i className="ri-instagram-line text-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
