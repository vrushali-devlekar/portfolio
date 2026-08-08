"use client";

import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t border-white/10 bg-[#0C0C0E] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
        <p className="text-xs font-mono text-zinc-400">
          © {new Date().getFullYear()} Vrushali Devlekar. All rights reserved.
        </p>
      </div>

      <div className="flex items-center gap-4 text-zinc-400">
        <a
          href="https://github.com/vrushali-devlekar"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#E05638] transition-colors p-1"
          aria-label="GitHub Profile"
        >
          <Github className="w-4 h-4" />
        </a>
        <a
          href="https://www.linkedin.com/in/vrushali-devlekar/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#E05638] transition-colors p-1"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <a
          href="https://x.com/vrushali_i"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#E05638] transition-colors p-1"
          aria-label="Twitter / X Profile"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href="mailto:vrushalidevlekar12@gmail.com"
          className="hover:text-[#E05638] transition-colors p-1"
          aria-label="Email Address"
        >
          <Mail className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
}
