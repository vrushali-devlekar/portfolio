import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import gsap from "gsap";

function Navbar() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const linksContainerRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");

  const handleNavClick = (e, targetId) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        // Scroll to target with a slight offset
        lenis.scrollTo(targetId, { offset: 0, duration: 1.2 });
      }
    }
  };

  useEffect(() => {
    const container = linksContainerRef.current;
    if (!container) return;

    // IntersectionObserver for sections to update active link on scroll
    const sectionIds = ["home", "about", "work", "services", "contact"];
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
  }, []);

  useEffect(() => {
    const container = linksContainerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".nav-item");

    // macOS Dock Effect (hover scaling nearby items)
    const handleMouseMoveContainer = (e) => {
      if (window.matchMedia("(max-width: 640px)").matches) return;

      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = (itemRect.left + itemRect.right) / 2 - rect.left;
        const dist = Math.abs(mouseX - itemCenterX);
        const maxDist = 120; // range of influence

        let scale = 1;
        if (dist < maxDist) {
          const factor = 1 - dist / maxDist;
          scale = 1 + 0.3 * (factor * factor * factor); // organic macOS Dock cubic curve
        }

        gsap.to(item, {
          scale: scale,
          y: scale > 1 ? -(scale - 1) * 22 : 0, // lift effect
          duration: 0.2, // fast native response
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
  }, [pathname, activeSection]);

  const isHome = pathname === "/";

  // Map activeSection to tab highlight
  const getIsActive = (sectionName) => {
    if (!isHome) return false;
    return activeSection === sectionName;
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="nav-links" ref={linksContainerRef}>
          <Link
            className={`nav-item ${isHome && (activeSection === "home" || !activeSection) ? "active" : ""}`}
            to="/"
            onClick={(e) => handleNavClick(e, "#home")}
          >
            <i className="ri-user-line"></i>
            <span className="nav-label">Home</span>
          </Link>
          <a
            href="/#about"
            className={`nav-item ${getIsActive("about") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "#about")}
          >
            <i className="ri-briefcase-line"></i>
            <span className="nav-label">Summary</span>
          </a>
          <a
            href="/#work"
            className={`nav-item ${getIsActive("work") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "#work")}
          >
            <i className="ri-file-text-line"></i>
            <span className="nav-label">Experience</span>
          </a>
          <a
            href="/#services"
            className={`nav-item ${getIsActive("services") ? "active" : ""}`}
            onClick={(e) => handleNavClick(e, "#services")}
          >
            <i className="ri-tools-line"></i>
            <span className="nav-label">Skills</span>
          </a>
          <Link
            to="/projects"
            className={`nav-item ${pathname === "/projects" ? "active" : ""}`}
          >
            <i className="ri-link"></i>
            <span className="nav-label">Links</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

