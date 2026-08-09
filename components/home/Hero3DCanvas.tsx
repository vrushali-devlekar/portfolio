"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 150);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. Lighting & Volumetric Glow
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xf5b907, 3.0, 250);
    orangeLight.position.set(20, 20, 40);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x00f3ff, 2.5, 250);
    cyanLight.position.set(-30, -20, 30);
    scene.add(cyanLight);

    // Volumetric Background Radial Glow
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
        gradient.addColorStop(0, "rgba(245, 185, 7, 0.25)");
        gradient.addColorStop(0.5, "rgba(0, 243, 255, 0.1)");
        gradient.addColorStop(1, "rgba(6, 6, 6, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 256, 256);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const glowMaterial = new THREE.SpriteMaterial({
      map: createGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.8,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(180, 180, 1);
    glowSprite.position.set(0, 0, -40);
    scene.add(glowSprite);

    // 3. Central Sleek 3D Torus Knot & Orbit Rings (Developer Tech Artifact)
    const torusGroup = new THREE.Group();

    // Outer Wireframe Torus Knot in Gold
    const knotGeo = new THREE.TorusKnotGeometry(28, 6.5, 120, 16, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xf5b907,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8,
      emissive: 0x855902,
      emissiveIntensity: 0.3,
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    torusGroup.add(torusKnot);

    // Inner Glowing Cyan Orbit Ring
    const ringGeo = new THREE.TorusGeometry(45, 0.8, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f3ff,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    torusGroup.add(ringMesh);

    torusGroup.position.set(0, 0, -15);
    scene.add(torusGroup);

    // 4. Ambient Background Particles (Kept in backdrop, away from foreground)
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 180;
      const y = (Math.random() - 0.5) * 140;
      const z = -20 - Math.random() * 80; // Keep strictly behind (z <= -20)

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.05,
        y: (Math.random() - 0.5) * 0.05,
        z: (Math.random() - 0.5) * 0.05,
      });
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );

    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(245, 185, 7, 0.9)");
        grad.addColorStop(0.5, "rgba(0, 243, 255, 0.4)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particlesMaterial = new THREE.PointsMaterial({
      size: 2.8,
      map: createParticleTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(
      particlesGeometry,
      particlesMaterial,
    );
    scene.add(particleSystem);

    // 5. Interactivity Setup
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      targetMouseX = (x / rect.width - 0.5) * 2;
      targetMouseY = (y / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Rotate 3D Torus Node
      torusGroup.rotation.y = elapsedTime * 0.35 + mouseX * 0.4;
      torusGroup.rotation.x = elapsedTime * 0.2 + mouseY * 0.4;
      ringMesh.rotation.z = elapsedTime * 0.4;

      // Parallax scene shift
      scene.rotation.y = mouseX * 0.1;
      scene.rotation.x = -mouseY * 0.1;

      // Pulse background lighting
      glowSprite.scale.set(
        180 + Math.sin(elapsedTime * 1.5) * 12,
        180 + Math.cos(elapsedTime * 1.5) * 12,
        1,
      );

      // Animate background particles
      const positions = particlesGeometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        let px = positions[i * 3];
        let py = positions[i * 3 + 1];
        let pz = positions[i * 3 + 2];

        const vel = particleVelocities[i];
        px += vel.x;
        py += vel.y;
        pz += vel.z;

        if (Math.abs(px) > 90) vel.x *= -1;
        if (Math.abs(py) > 70) vel.y *= -1;
        if (pz > -15 || pz < -100) vel.z *= -1; // Ensure stays in backdrop

        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = pz;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      glowMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}
