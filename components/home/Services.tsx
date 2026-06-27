"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Service {
  title: string;
  image: string;
  desc: string;
}

export default function Services() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const services: Service[] = [
    {
      title: "Frontend Development",
      image: "/frontend_3d.png",
      desc: "Building responsive, semantic, and high-performance interfaces using modern framework ecosystems.",
    },
    {
      title: "Backend Development",
      image: "/backend_3d.png",
      desc: "Designing secure databases, optimized API architectures, and scalable server-side systems.",
    },
    {
      title: "Full Stack Applications",
      image: "/fullstack_3d.png",
      desc: "Developing unified web environments with clean boundaries between presentation and server state.",
    },
    {
      title: "UI / UX Design",
      image: "/uiux_3d.png",
      desc: "Creating design systems, journey maps, and high-fidelity wireframes that balance aesthetics with usability.",
    },
    {
      title: "Deployment & DevOps",
      image: "/devops_3d.png",
      desc: "Configuring CI/CD pipelines, containerized deployments, and robust hosting on cloud platforms.",
    },
  ];

  const scrollLeft = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".service-card");
      if (card) {
        const gap = 16;
        const scrollAmount = card.clientWidth + gap;
        sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const card = sliderRef.current.querySelector(".service-card");
      if (card) {
        const gap = 16;
        const scrollAmount = card.clientWidth + gap;
        sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Services Header fade-in
      gsap.fromTo(
        ".services-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // Service Cards staggered slide up
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-slider",
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="services services-grid-bg w-full py-24 px-[6%] bg-[#060606] border-t border-border relative overflow-hidden"
      id="services"
    >
      <div className="corner-dots corner-dots-top-right opacity-60"></div>
      <div className="corner-glow corner-glow-bottom-left"></div>
      <div className="max-w-[1350px] mx-auto space-y-12">
        {/* Header Controls */}
        <div className="services-header flex flex-row items-end justify-between w-full">
          <div>
            <span className="mini">Capabilities</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white uppercase mt-2">
              Our Service
            </h2>
          </div>
          <div className="flex items-center gap-3 z-10">
            <button
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-card transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Scroll left"
            >
              <i className="ri-arrow-left-line text-lg"></i>
            </button>
            <button
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-foreground hover:bg-card transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Scroll right"
            >
              <i className="ri-arrow-right-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Horizontal Slider */}
        <div
          ref={sliderRef}
          className="services-slider flex gap-4 overflow-x-auto pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => (
            <div key={index} className="service-card group">
              <div className="w-full flex justify-center mb-2">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-40 h-40 object-contain select-none pointer-events-none transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
