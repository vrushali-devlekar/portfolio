"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    const lenisInstance = lenisRef.current?.lenis;
    if (lenisInstance) {
      lenisInstance.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenisInstance.scrollTo(value, { immediate: true });
          }
          return lenisInstance.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        duration: 1.2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
