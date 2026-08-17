"use client";

import { useEffect, useRef } from "react";
import { useScroll } from "framer-motion";
import * as THREE from "three";

export default function Background3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollProgressRef.current = latest;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Floating 3D mesh group
    const group = new THREE.Group();
    scene.add(group);

    // Torus Knot floating ambient wireframe mesh
    const geometry = new THREE.TorusKnotGeometry(1.6, 0.45, 100, 16);
    const material = new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0xE05638,
      transparent: true,
      opacity: 0.12,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    // Ambient floating particles
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 16;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xE05638,
      transparent: true,
      opacity: 0.25,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    let animationFrameId: number;
    let isVisible = true;

    // 60FPS loop optimization: pause when tab is inactive
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const targetYRotation = Math.PI / 4; // 45 degrees along Y axis

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const progress = scrollProgressRef.current;

      // Rotate group smoothly by 45 degrees along Y axis based on scrollProgress + subtle continuous rotation
      const scrollRotationY = progress * targetYRotation;
      group.rotation.y = scrollRotationY + Date.now() * 0.00015;
      group.rotation.x = Math.sin(Date.now() * 0.0002) * 0.15;

      // Scale geometry up subtly as user scrolls (1 to 1.25)
      const scale = 1 + progress * 0.25;
      group.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80"
    />
  );
}
