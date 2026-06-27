"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Hero() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Entrance Animations (on page load)
      gsap.fromTo(
        ".hero-bg-wrapper",
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-top-bar",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
      );

      // Letters of the name staggered reveal
      gsap.fromTo(
        ".hero-name-char",
        {
          opacity: 0,
          x: -25,
          scale: 0.7,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.5)",
          delay: 0.4,
        }
      );

      // Contact Grid Items staggered float up
      gsap.fromTo(
        ".hero-contact-item",
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.8,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const nameFirst = "Vrushali".split("");
  const nameLast = "Devlekar".split("");

  return (
    <section className="hero" id="home">
      <div className="corner-dots corner-dots-top-left opacity-60"></div>
      {/* Background silhouette wrapper */}
      <div className="hero-bg-wrapper">
        <img
          src="/port-1.png"
          alt="Vrushali Devlekar Silhouette"
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="hero-container">
        {/* Top Status Bar */}
        <div className="hero-top-bar">
          <div className="status-badge">
            <span className="status-dot"></span>
            <span className="text-[10px] font-mono tracking-widest text-[#a1a1aa] uppercase">Open to work</span>
          </div>
          <Link href="/contact" className="download-cv-btn select-none">
            Get in Touch
          </Link>
        </div>

        {/* Main Hero Content */}
        <div className="hero-main-content">
          <span className="hero-subtitle">Full Stack Developer</span>
          <h1 className="hero-title select-none">
            <span className="block">
              {nameFirst.map((char, index) => (
                <span key={index} className="hero-name-char">
                  {char}
                </span>
              ))}
            </span>
            <span className="block">
              {nameLast.map((char, index) => (
                <span key={index} className="hero-name-char">
                  {char}
                </span>
              ))}
            </span>
          </h1>

          {/* Contact Details Grid */}
          <div className="hero-contact-grid">
            <a href="mailto:vrushali.devlekar@gmail.com" className="hero-contact-item">
              <div className="icon-box">
                <i className="ri-mail-line"></i>
              </div>
              <span className="contact-text">vrushalidevlekar12@gmail.com</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/vrushali-devlekar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-contact-item"
            >
              <div className="icon-box">
                <i className="ri-linkedin-box-fill"></i>
              </div>
              <span className="contact-text">linkedin.com/in/vrushali-devlekar</span>
            </a>

            <a
              href="https://github.com/vrushali-devlekar"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-contact-item"
            >
              <div className="icon-box">
                <i className="ri-github-fill"></i>
              </div>
              <span className="contact-text">github.com/vrushali-devlekar</span>
            </a>

            <div className="hero-contact-item">
              <div className="icon-box">
                <i className="ri-map-pin-line"></i>
              </div>
              <span className="contact-text">Mumbai, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
