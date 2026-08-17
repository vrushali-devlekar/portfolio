"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, Variants } from "framer-motion";
import * as THREE from "three";

// 3D Wireframe Canvas Component for Card 02 (Interactive 3D & WebGL)
function WireframeCanvas({ isHovered }: { isHovered: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(isHovered);
  isHoveredRef.current = isHovered;

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 140;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 3.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(0.85, 0.28, 64, 12);
    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xE05638,
      transparent: true,
      opacity: 0.85,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const speed = isHoveredRef.current ? 0.025 : 0.008;
      mesh.rotation.x += speed;
      mesh.rotation.y += speed * 1.2;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-36 flex items-center justify-center overflow-hidden" />;
}

interface ServiceCardData {
  id: string;
  serial: string;
  title: string;
  description: string;
  techBadges: string[];
  widgetType: "terminal" | "three" | "health";
}

const SERVICES: ServiceCardData[] = [
  {
    id: "fullstack",
    serial: "01",
    title: "Full-Stack Web Apps",
    description:
      "Type-safe end-to-end architectures, lightning-fast rendering pipelines, and production-grade maintainability.",
    techBadges: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    widgetType: "terminal",
  },
  {
    id: "threejs",
    serial: "02",
    title: "Interactive 3D & WebGL",
    description:
      "Sub-60FPS web experiences, custom GLSL shaders, and immersive 3D canvas rendering for unforgettable digital products.",
    techBadges: ["Three.js", "React Three Fiber", "GLSL", "WebGL"],
    widgetType: "three",
  },
  {
    id: "api",
    serial: "03",
    title: "High-Throughput APIs",
    description:
      "Resilient microservices, low-latency Redis caching layers, and zero-downtime containerized cloud infrastructure.",
    techBadges: ["Node.js", "Express", "REST APIs", "Redis", "Docker"],
    widgetType: "health",
  },
];

function BentoServiceCard({ card, index }: { card: ServiceCardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.1,
      },
    },
  };

  return (
    <motion.div variants={cardVariants} className="h-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className="relative h-full rounded-3xl bg-[#101116] border border-[#1E202B] p-7 sm:p-8 overflow-hidden flex flex-col justify-between group transition-colors duration-300 hover:border-[#E05638]/40 shadow-xl backdrop-blur-md"
      >
        {/* Radial cursor glow overlay */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(224, 86, 56, 0.25), transparent 40%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
          <div>
            {/* Interactive Header Widget */}
            <div className="mb-6 rounded-2xl bg-[#0D0E12] border border-[#1E202B] p-4 overflow-hidden">
              {card.widgetType === "terminal" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1E202B] pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      PROD: READY
                    </span>
                  </div>
                  <div className="font-mono text-xs space-y-1 text-neutral-300">
                    <p className="text-neutral-500">$ pnpm build --prod</p>
                    <p className="text-emerald-400">✓ Compiled successfully in 840ms</p>
                    <p className="text-neutral-400 text-[11px]">$ ready on port 3000</p>
                  </div>
                </div>
              )}

              {card.widgetType === "three" && (
                <div className="relative flex items-center justify-center">
                  <WireframeCanvas isHovered={isHovered} />
                  <span className="absolute bottom-1 right-2 text-[10px] font-mono text-[#E05638] uppercase tracking-wider bg-[#0D0E12]/80 px-2 py-0.5 rounded border border-[#E05638]/30">
                    60FPS GLSL
                  </span>
                </div>
              )}

              {card.widgetType === "health" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#1E202B] pb-2">
                    <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider">SYSTEM MONITOR</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="block text-[10px] font-mono text-neutral-400">Latency</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">24ms</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <span className="block text-[10px] font-mono text-neutral-400">Uptime</span>
                      <span className="text-sm font-mono font-bold text-amber-400">99.99%</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Serial & Title */}
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold text-[#E05638] bg-[#E05638]/10 border border-[#E05638]/20 px-2.5 py-1 rounded-lg">
                {card.serial}
              </span>
              <h3 className="text-xl font-bold text-white group-hover:text-[#E05638] transition-colors duration-300">
                {card.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-400 leading-relaxed font-sans">
              {card.description}
            </p>
          </div>

          {/* Tech Stack Badges */}
          <div className="pt-6 border-t border-[#1E202B]">
            <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block mb-3 font-semibold">
              CORE TECH STACK
            </span>
            <div className="flex flex-wrap gap-2">
              {card.techBadges.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-neutral-300 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg font-medium hover:border-[#E05638]/40 hover:text-[#E05638] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <section className="relative bg-[#0D0E12] py-24 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-[#1E202B]" id="services">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#E05638]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E202B]"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#E05638] uppercase">
                03 CORE STACK & EXPERTISE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              WHAT I{" "}
              <span className="bg-gradient-to-r from-[#E05638] via-[#E05638] to-amber-500 bg-clip-text text-transparent">
                ENGINEER
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-md leading-relaxed">
            No fluff. Just resilient code, buttery animations, and scalable architecture.
          </p>
        </motion.div>

        {/* 3-Column Bento Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {SERVICES.map((card, idx) => (
            <BentoServiceCard key={card.id} card={card} index={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

