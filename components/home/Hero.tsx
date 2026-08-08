"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ArrowRight, Sparkles } from "lucide-react";
import { useLenis } from "lenis/react";

export default function Hero() {
  const lenis = useLenis();

  const handleCTA = (e: React.MouseEvent, selector: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(selector, { offset: -80, duration: 1.2 });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const skillsTicker = [
    "Next.js 15", "React", "TypeScript", "Node.js", "Express", 
    "Python", "FastAPI", "MongoDB", "PostgreSQL", "Redis", 
    "Docker", "AWS", "CI/CD Actions", "Tailwind CSS",
    "Framer Motion", "GSAP", "Systems Architecture"
  ];

  return (
    <section 
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 overflow-hidden bg-[#F4EEDD] bg-graph-paper"
      id="home"
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex-grow flex flex-col justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full py-6">
          
          {/* Left Column: Bold Serif Headline & Summary */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="tag-badge mb-6">
                <span className="w-2 h-2 rounded-full bg-[#E05638] animate-pulse"></span>
                <span>Full Stack Developer & Systems Architect</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#1C1C1C] leading-[1.08] mb-6"
            >
              Building <span className="italic text-[#E05638]">Thoughtful</span> Digital Experiences & Scalable Systems.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#666666] text-sm md:text-base leading-relaxed mb-8 max-w-xl font-sans"
            >
              Hi, I&apos;m Vrushali Devlekar. I design and engineer robust web applications, high-throughput microservices, and minimalist UI systems with structural integrity and low-latency performance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href="#featured"
                onClick={(e) => handleCTA(e, "#featured")}
                className="flex items-center gap-2.5 bg-[#E05638] hover:bg-[#c94529] text-white font-mono font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 shadow-md group"
              >
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleCTA(e, "#contact")}
                className="flex items-center gap-2 bg-[#FFFDF7] hover:bg-[#FFF] text-[#1C1C1C] border border-[#1C1C1C]/20 font-mono text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-300 shadow-sm"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Quick Contacts */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-x-6 gap-y-3.5 border-t border-[#1C1C1C]/10 pt-6 max-w-lg"
            >
              <a
                href="mailto:vrushalidevlekar12@gmail.com"
                className="flex items-center gap-2 text-[#666666] hover:text-[#E05638] transition-colors duration-200 group text-xs font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-[#E05638]" />
                <span>vrushalidevlekar12@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/vrushali-devlekar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#666666] hover:text-[#E05638] transition-colors duration-200 group text-xs font-mono"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#E05638]" />
                <span>linkedin.com/in/vrushali-devlekar</span>
              </a>
              <a
                href="https://github.com/vrushali-devlekar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#666666] hover:text-[#E05638] transition-colors duration-200 group text-xs font-mono"
              >
                <Github className="w-3.5 h-3.5 text-[#E05638]" />
                <span>github.com/vrushali-devlekar</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Floating Polaroid Photograph Card Element */}
          <div className="lg:col-span-5 flex items-center justify-center relative order-1 lg:order-2 my-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[300px] md:max-w-[340px]"
            >
              {/* Tape Element Overlay */}
              <div className="tape-overlay" />

              {/* Polaroid Frame Container */}
              <div className="polaroid-card rounded-lg">
                <div className="w-full aspect-[4/5] overflow-hidden rounded bg-[#EFE9D5] mb-4 relative">
                  <img
                    src="/image_ab586f.jpg"
                    alt="Vrushali Devlekar Polaroid Portrait"
                    className="w-full h-full object-cover object-center filter contrast-[1.05]"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-[9px] font-mono text-white flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E05638]" />
                    <span>Mumbai, IN</span>
                  </div>
                </div>

                {/* Handwritten-style caption */}
                <div className="text-center">
                  <p className="font-serif italic text-sm text-[#1C1C1C] font-semibold">
                    Vrushali Devlekar
                  </p>
                  <p className="text-[10px] font-mono text-[#666666] mt-0.5">
                    Software Engineer & Systems Architect
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Horizontal Ticker / Marquee Skills Banner */}
      <div className="relative w-full border-y border-[#1C1C1C]/15 bg-[#FFFDF7] py-4 overflow-hidden z-10 select-none shadow-sm">
        <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#FFFDF7] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#FFFDF7] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
            className="flex gap-12 text-[#1C1C1C] text-xs font-mono uppercase tracking-widest whitespace-nowrap"
          >
            {skillsTicker.concat(skillsTicker).map((skill, index) => (
              <span key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E05638]" />
                <span className="font-semibold">{skill}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
