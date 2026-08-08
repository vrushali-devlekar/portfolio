"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { Menu, X, ArrowUpRight, MessageSquare } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "featured", label: "Showcase" },
    { id: "case-study", label: "Architecture" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Timeline" },
    { id: "widgets", label: "Status" },
  ];

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    setIsOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
      } else {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (pathname !== "/") return;

    const sectionIds = [...navLinks.map((l) => l.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
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

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#F4EEDD]/90 backdrop-blur-md border-b border-[#1C1C1C]/10 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="w-8 h-8 rounded-lg bg-[#E05638] text-white flex items-center justify-center font-mono font-bold text-sm group-hover:scale-105 transition-transform shadow-sm">
              VD
            </span>
            <span className="font-serif text-base font-bold tracking-tight text-[#1C1C1C]">
              Vrushali Devlekar
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#FFFDF7] border border-[#1C1C1C]/15 px-3 py-1.5 rounded-full shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, `#${link.id}`)}
                className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wide transition-all ${
                  activeSection === link.id
                    ? "bg-[#E05638] text-white font-semibold"
                    : "text-[#666666] hover:text-[#1C1C1C]"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Button: "Let's Talk" */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="flex items-center gap-2 bg-[#E05638] hover:bg-[#c94529] text-white px-5 py-2.5 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-sm group"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Let&apos;s Talk
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center p-2 rounded-lg bg-[#FFFDF7] border border-[#1C1C1C]/15 text-[#1C1C1C] focus:outline-none shadow-sm"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F4EEDD] flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-in-out ${
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="flex flex-col gap-6 pt-24 z-10">
          <span className="text-[11px] font-mono text-[#E05638] tracking-widest uppercase font-bold">
            Navigation Menu
          </span>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, `#${link.id}`)}
                className={`text-3xl font-serif font-bold tracking-tight transition-colors ${
                  activeSection === link.id
                    ? "text-[#E05638]"
                    : "text-[#1C1C1C]/60 hover:text-[#1C1C1C]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className={`text-3xl font-serif font-bold tracking-tight transition-colors ${
                activeSection === "contact"
                  ? "text-[#E05638]"
                  : "text-[#1C1C1C]/60 hover:text-[#1C1C1C]"
              }`}
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-4 z-10 border-t border-[#1C1C1C]/10 pt-6">
          <div className="flex justify-between items-center text-xs font-mono text-[#666666]">
            <span>Vrushali Devlekar</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </>
  );
}
