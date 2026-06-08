import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import logoImg from "../../public/tap.png";

function Navbar() {
  const { pathname } = useLocation();
  const lenis = useLenis();
  const linksContainerRef = useRef(null);
  const pillRef = useRef(null);

  const handleNavClick = (e, targetId) => {
    if (pathname === "/") {
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(targetId, { offset: -100, duration: 1.2 });
      }
    }
  };

  useEffect(() => {
    const container = linksContainerRef.current;
    const pill = pillRef.current;
    if (!container || !pill) return;

    const items = container.querySelectorAll(".nav-item");

    // Position pill on active item
    const updatePillToActive = () => {
      const activeItem = container.querySelector(".nav-item.active");
      if (activeItem) {
        gsap.to(pill, {
          left: activeItem.offsetLeft,
          width: activeItem.offsetWidth,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out"
        });
      } else {
        gsap.to(pill, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    // Initialize pill on mount and pathname change
    updatePillToActive();

    // Hover listeners for pill glide
    const handleMouseEnterItem = (e) => {
      const item = e.currentTarget;
      gsap.to(pill, {
        left: item.offsetLeft,
        width: item.offsetWidth,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const handleMouseLeaveContainer = () => {
      updatePillToActive();
    };

    items.forEach((item) => {
      item.addEventListener("mouseenter", handleMouseEnterItem);
    });

    container.addEventListener("mouseleave", handleMouseLeaveContainer);

    // macOS Dock Effect (hover scaling nearby items)
    const handleMouseMoveContainer = (e) => {
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;

      items.forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenterX = (itemRect.left + itemRect.right) / 2 - rect.left;
        const dist = Math.abs(mouseX - itemCenterX);
        const maxDist = 90; // range of influence

        let scale = 1;
        if (dist < maxDist) {
          const factor = 1 - dist / maxDist;
          scale = 1 + 0.16 * (factor * factor); // quadratic curve
        }

        gsap.to(item, {
          scale: scale,
          y: scale > 1 ? -(scale - 1) * 8 : 0, // lift effect
          duration: 0.25,
          ease: "power2.out"
        });
      });
    };

    const handleMouseLeaveDock = () => {
      items.forEach((item) => {
        gsap.to(item, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    };

    container.addEventListener("mousemove", handleMouseMoveContainer);
    container.addEventListener("mouseleave", handleMouseLeaveDock);

    return () => {
      items.forEach((item) => {
        item.removeEventListener("mouseenter", handleMouseEnterItem);
      });
      container.removeEventListener("mouseleave", handleMouseLeaveContainer);
      container.removeEventListener("mousemove", handleMouseMoveContainer);
      container.removeEventListener("mouseleave", handleMouseLeaveDock);
    };
  }, [pathname]);

  const isHomeActive = pathname === "/";

  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to="/" className="logo" onClick={(e) => handleNavClick(e, "body")}>
          <img src={logoImg} alt="VD Logo" className="logo-img" />
        </Link>
        <div className="nav-links-wrapper">
          <div className="nav-bg-pill" ref={pillRef}></div>
          <div className="nav-links" ref={linksContainerRef}>
            <Link className={`nav-item ${isHomeActive ? "active" : ""}`} to="/" onClick={(e) => handleNavClick(e, "body")}>Home</Link>
            <a href="/#about" className="nav-item" onClick={(e) => handleNavClick(e, "#about")}>About</a>
            <a href="/projects" className="nav-item" onClick={(e) => handleNavClick(e, "#work")}>Projects</a>
            <a href="/#services" className="nav-item" onClick={(e) => handleNavClick(e, "#services")}>Services</a>
            <a href="/#contact" className="nav-item" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a>
          </div>
        </div>
        <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="resume-btn">
          Resume
        </a>
      </nav>
    </div>
  );
}

export default Navbar;
