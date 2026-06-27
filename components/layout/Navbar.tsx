"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import gsap from "gsap";

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const linksContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (e: React.MouseEvent, targetId: string) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -80, duration: 1.2 });
      }
    }
  };

  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = ["home", "about", "work", "services"];
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
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const container = linksContainerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".nav-item");

    const handleMouseMoveContainer = (e: MouseEvent) => {
      if (window.matchMedia("(max-width: 640px)").matches) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = (itemRect.left + itemRect.right) / 2 - rect.left;
        const dist = Math.abs(mouseX - itemCenterX);
        const maxDist = 120;

        let scale = 1;
        if (dist < maxDist) {
          const factor = 1 - dist / maxDist;
          scale = 1 + 0.25 * (factor * factor * factor);
        }

        gsap.to(item, {
          scale: scale,
          y: scale > 1 ? -(scale - 1) * 16 : 0,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseLeaveDock = () => {
      items.forEach((item) => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMoveContainer);
    container.addEventListener("mouseleave", handleMouseLeaveDock);

    return () => {
      container.removeEventListener("mousemove", handleMouseMoveContainer);
      container.removeEventListener("mouseleave", handleMouseLeaveDock);
    };
  }, [pathname]);

  const isHome = pathname === "/";

  const navLinks = [
    { href: "/#home", id: "home", label: "Home", icon: "ri-user-line" },
    { href: "/#about", id: "about", label: "Summary", icon: "ri-briefcase-line" },
    { href: "/#work", id: "work", label: "Experience", icon: "ri-file-text-line" },
    { href: "/#services", id: "services", label: "Skills", icon: "ri-tools-line" },
    { href: "/projects", id: "projects", label: "Projects", icon: "ri-link" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center justify-center glassmorphism bg-card/60 border border-border/80 px-4 py-2 rounded-full shadow-lg border-glow mx-auto w-fit">
        <div ref={linksContainerRef} className="flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isLinkActive =
              link.id === "projects"
                ? pathname === "/projects"
                : isHome && activeSection === link.id;

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={(e) => link.id !== "projects" && handleNavClick(e, `#${link.id}`)}
                className={`nav-item flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isLinkActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-border/30"
                }`}
                aria-label={link.label}
              >
                <i className={`${link.icon} text-sm`}></i>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
