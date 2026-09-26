"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
      }
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "about", "services", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const isHome = pathname === "/";

  const menuLinks = [
    { href: "/#home", id: "home", label: "Home" },
    { href: "/#about", id: "about", label: "About" },
    { href: "/projects", id: "projects", label: "Projects" },
    { href: "/tools", id: "tools", label: "Tools" },
    { href: "/#services", id: "services", label: "Services" },
    { href: "/contact", id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* ─── TOP RIGHT MINIMALIST DRAWER TRIGGER ─── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 right-6 md:right-12 z-50 w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center text-white hover:border-white/30 hover:bg-white/[0.08] transition-all focus:outline-none active:scale-95 shadow-xl"
        aria-label="Toggle navigation menu"
      >
        <div className="relative w-4 h-3 flex flex-col justify-between items-center">
          <span
            className={`block h-[1.5px] w-4 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-white transition-all duration-300 ease-in-out ${
              isOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </div>
      </button>

      {/* ─── FULL-SCREEN OVERLAY MENU ─── */}
      <div className={`nav-overlay ${isOpen ? "open" : ""}`}>
        {/* Decorative dynamic ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/5 rounded-full filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none"></div>

        <nav className="flex flex-col items-center gap-7 z-10 font-headline">
          {menuLinks.map((link) => {
            const isLinkActive =
              link.id === "projects"
                ? pathname === "/projects" || pathname.startsWith("/projects/")
                : link.id === "tools"
                ? pathname === "/tools" || pathname.startsWith("/tools/")
                : link.id === "contact"
                ? pathname === "/contact"
                : isHome && activeSection === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  setIsOpen(false);
                  if (link.href.startsWith("/#")) {
                    handleNavClick(e, link.href.substring(1));
                  }
                }}
                className={`nav-overlay-link text-2xl sm:text-3xl font-semibold tracking-tight uppercase transition-all ${
                  isLinkActive ? "text-white scale-105" : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer citation inside overlay */}
        <div className="absolute bottom-8 text-center text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          Vrushali Devlekar &copy; 2026
        </div>
      </div>
    </>
  );
}
