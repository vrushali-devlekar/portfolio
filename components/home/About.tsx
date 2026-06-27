"use client";

import { useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // About Left content fade-in
      gsap.fromTo(
        ".about-left",
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".about",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Staggered logo items inside About section
      gsap.fromTo(
        ".tech-logo-item",
        {
          opacity: 0,
          x: -30,
          scale: 0.85,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".tech-logo-grid",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  const logos = [
    { name: "MongoDB", slug: "mongodb" },
    { name: "Express", slug: "express", inverted: true },
    { name: "React", slug: "react" },
    { name: "Node.js", slug: "nodedotjs" },
    { name: "JavaScript", slug: "javascript" },
    { name: "TypeScript", slug: "typescript" },
    { name: "TailwindCSS", slug: "tailwindcss" },
    { name: "Sass", slug: "sass" },
    { name: "Redis", slug: "redis" },
  ];

  return (
    <section className="about relative overflow-hidden" id="about">
      <div className="corner-glow corner-glow-top-left"></div>
      <div className="corner-dots corner-dots-bottom-right opacity-60"></div>
      <div className="about-container">
        {/* Left Side Bio */}
        <div className="about-left">
          <span className="mini">WHO I AM</span>
          <h2>A thoughtful developer bridging code and context.</h2>
          <p>
            I am a full-stack engineer and designer based in Mumbai,
            collaborating with companies globally to craft digital systems that
            feel natural, perform flawlessly, and scale elegantly.
          </p>
          <p>
            I focus on minimal, performance-driven interfaces, robust API
            infrastructures, and intentional product strategies. My practice is
            centered on structural integrity and human experience.
          </p>
        </div>

        {/* Right Side Tech Stack */}
        <div className="about-right">
          <div className="tech-logo-grid">
            {logos.map((logo) => (
              <div key={logo.slug} className="tech-logo-item">
                <img
                  src={`https://cdn.simpleicons.org/${logo.slug}${logo.inverted ? "/ffffff" : ""}`}
                  alt={logo.name}
                  className="tech-logo-img"
                />
                <span className="tech-logo-label">{logo.name}</span>
              </div>
            ))}

            {/* Custom AWS logo item */}
            <div className="tech-logo-item">
              <Image
                src="/aws.svg"
                alt="AWS"
                width={28}
                height={28}
                className="tech-logo-img"
              />
              <span className="tech-logo-label">AWS</span>
            </div>

            {/* Custom Docker logo item */}
            <div className="tech-logo-item">
              <img
                src="https://cdn.simpleicons.org/docker"
                alt="Docker"
                className="tech-logo-img"
              />
              <span className="tech-logo-label">Docker</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
