import { useEffect, useRef } from "react";
import "./Preloader.css";

export default function Preloader({ revealStarted, onStartReveal, onComplete }) {
  const canvasRef = useRef(null);
  
  // Stable refs for callbacks to prevent double-loading restarts in React Strict Mode/re-renders
  const onStartRevealRef = useRef(onStartReveal);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onStartRevealRef.current = onStartReveal;
    onCompleteRef.current = onComplete;
  }, [onStartReveal, onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;
    let progress = 0;
    let phase = "loading"; // "loading" or "transitioning"
    let soundPlayed = false;

    // Animation systems
    const loadingParticles = [];
    const transitionGrid = [];
    const transitionDebris = [];
    let transitionTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", resize);
    resize();

    // Minecraft Synth Sound Generator
    const playBlockPlaceSound = () => {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const audioCtx = new AudioContextClass();

        // 1. Noise buffer for the block scrape/tap texture
        const bufferSize = audioCtx.sampleRate * 0.15;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = audioCtx.createBufferSource();
        noiseNode.buffer = buffer;

        const noiseFilter = audioCtx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.setValueAtTime(140, audioCtx.currentTime);
        noiseFilter.Q.setValueAtTime(3, audioCtx.currentTime);

        const noiseGain = audioCtx.createGain();
        noiseGain.gain.setValueAtTime(0.35, audioCtx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);

        noiseNode.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        gainNodeConnect(noiseGain, audioCtx.destination);

        function gainNodeConnect(src, dest) {
          src.connect(dest);
        }

        // 2. Sine wave oscillator for the low pitch thud impact
        const osc = audioCtx.createOscillator();
        const oscGain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(75, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(25, audioCtx.currentTime + 0.14);

        oscGain.gain.setValueAtTime(0.55, audioCtx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.14);

        osc.connect(oscGain);
        oscGain.connect(audioCtx.destination);

        noiseNode.start();
        osc.start();

        noiseNode.stop(audioCtx.currentTime + 0.15);
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {
        console.error("Web Audio API failed", e);
      }
    };

    const render = () => {
      time += 0.04;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // ─── STAGE 1: LOADING ─────────────────────────────────────────
      if (phase === "loading") {
        // Clear with pure black
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);

        // Smooth progress loading increase
        if (progress < 100) {
          const rand = Math.random();
          if (rand < 0.015) {
            progress += Math.random() * 8 + 3; // Staggered loading speed
          } else {
            progress += Math.random() * 0.35 + 0.15;
          }
          if (progress > 100) progress = 100;
        }

        // Layout variables
        const barW = Math.min(width * 0.7, 460);
        const barH = 16;
        const barX = (width - barW) / 2;
        const barY = height / 2 + 50;

        // Draw double white pixelated border
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(barX - 4, barY - 4, barW + 8, barH + 8);
        ctx.fillStyle = "#000000";
        ctx.fillRect(barX - 2, barY - 2, barW + 4, barH + 4);

        // Fill progress bar (textured glowing gold)
        const fillW = (progress / 100) * barW;
        if (fillW > 0) {
          ctx.fillStyle = "#C49A5A";
          ctx.fillRect(barX, barY, fillW, barH);
          ctx.fillStyle = "#d8b475"; // Lighter top textured edge
          ctx.fillRect(barX, barY, fillW, 3);
          ctx.fillStyle = "#a37a3f"; // Darker bottom textured edge
          ctx.fillRect(barX, barY + barH - 3, fillW, 3);
        }

        // Render percentage text in retro pixel font
        ctx.font = "12px 'Press Start 2P', monospace";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText(Math.floor(progress) + "%", width / 2, barY - 18);

        // Render status messages below the bar (Minecraft loader themed)
        let statusText = "Initializing Portfolio...";
        if (progress > 25 && progress <= 50) {
          statusText = "Loading Projects...";
        } else if (progress > 50 && progress <= 75) {
          statusText = "Building Experience...";
        } else if (progress > 75) {
          statusText = "Preparing Showcase...";
        }
        ctx.fillText(statusText, width / 2, barY + 44);

        // ─── CHARACTER DRAWING ───
        const charX = barX + (progress / 100) * barW;
        const scale = 2.0;
        const legH = 26 * scale;
        const legW = 7 * scale;
        const torsoH = 28 * scale;
        const torsoW = 14 * scale;
        const headSize = 18 * scale;
        const armH = 24 * scale;
        const armW = 6 * scale;

        // Hip joint rests above the progress bar floor
        const groundY = barY - 5;
        const walkCycle = time * 6.5;
        const bobY = Math.abs(Math.cos(walkCycle * 2)) * 3.5;
        const hipX = charX;
        const hipY = groundY - legH + bobY;
        const charY = hipY - 8;
        const shoulderX = charX;
        const shoulderY = charY + bobY - 8;
        const headBobY = Math.sin(walkCycle * 2) * 1.0;

        // Subtle ambient character glow (moves with character - gold theme)
        const glow = ctx.createRadialGradient(charX, charY, 5, charX, charY, 90);
        glow.addColorStop(0, "rgba(196, 154, 90, 0.12)");
        glow.addColorStop(0.5, "rgba(196, 154, 90, 0.02)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(charX - 120, charY - 120, 240, 240);

        // Limb Angles
        const legAngle = Math.sin(walkCycle) * 0.42;
        const leftArmAngle = -Math.sin(walkCycle) * 0.42;
        // Right arm (near) is holding the glowing laptop
        const rightArmAngle = -0.55; 

        // Helper to draw rotated block
        const drawBlock = (x, y, w, h, angle, pX, pY, fillColor, accentColor = null, accentRect = null) => {
          ctx.save();
          ctx.translate(x + pX, y + pY);
          ctx.rotate(angle);
          ctx.fillStyle = fillColor;
          ctx.fillRect(-pX, -pY, w, h);
          if (accentColor && accentRect) {
            ctx.fillStyle = accentColor;
            ctx.fillRect(accentRect.x - pX, accentRect.y - pY, accentRect.width, accentRect.height);
          }
          ctx.restore();
        };

        // Foot tip positions for particles trail
        const leftFootX = hipX - 2 + Math.sin(legAngle) * legH;
        const leftFootY = hipY + Math.cos(legAngle) * legH;
        const rightFootX = hipX + 2 - Math.sin(legAngle) * legH;
        const rightFootY = hipY + Math.cos(legAngle) * legH;

        if (Math.abs(Math.sin(walkCycle)) > 0.7 && Math.random() < 0.45) {
          const activeFootX = Math.sin(walkCycle) > 0 ? leftFootX : rightFootX;
          const activeFootY = Math.sin(walkCycle) > 0 ? leftFootY : rightFootY;
          loadingParticles.push({
            x: activeFootX,
            y: activeFootY,
            vx: -1.2 - Math.random() * 0.8,
            vy: -Math.random() * 0.8 - 0.3,
            size: Math.random() * 3 + 2.5,
            color: "#C49A5A",
            alpha: 1.0,
            decay: Math.random() * 0.025 + 0.02,
          });
        }

        // Layer 1: Left Arm (Far Side - Shaded)
        drawBlock(
          shoulderX - 3,
          shoulderY,
          armW,
          armH,
          -leftArmAngle,
          armW / 2,
          0,
          "#141416", // Black hoodie sleeve (shaded)
          "#85632e", // Shaded gold cuff
          { x: 0, y: armH - 4, width: armW, height: 4 }
        );

        // Layer 2: Left Leg (Far Side - Shaded)
        drawBlock(
          hipX - 2,
          hipY,
          legW,
          legH,
          legAngle,
          legW / 2,
          0,
          "#0d0d0f", // Shaded pants
          "#85632e", // Shaded shoe
          { x: 0, y: legH - 5, width: legW, height: 5 }
        );

        // Layer 3: Back Hair
        ctx.fillStyle = "#111113";
        ctx.fillRect(charX - headSize / 2 - 2, charY + bobY - torsoH / 2 - 1, headSize + 2, 22);

        // Layer 4: Torso
        drawBlock(
          charX - torsoW / 2,
          charY + bobY - torsoH / 2 + 5,
          torsoW,
          torsoH,
          0,
          0,
          0,
          "#1c1c20" // Black outfit
        );
        ctx.fillStyle = "#C49A5A";
        ctx.fillRect(charX - 1, charY + bobY - 4, 2, 8); // Gold accents
        ctx.fillRect(charX - 3, charY + bobY - 6, 6, 2);

        // Layer 5: Head
        const headY = charY + bobY - torsoH / 2 - headSize / 2 + headBobY + 2;
        ctx.fillStyle = "#ebd0be"; // skin tone
        ctx.fillRect(charX - headSize / 2, headY, headSize, headSize);
        // Gold eyes/goggles
        ctx.fillStyle = "#C49A5A";
        ctx.fillRect(charX + 2, headY + 7, 3, 2);
        // Hair cap
        ctx.fillStyle = "#111113";
        ctx.fillRect(charX - headSize / 2, headY, headSize, 6);
        ctx.fillRect(charX - headSize / 2, headY, 5, headSize - 4);
        ctx.fillStyle = "#C49A5A"; // Hairclip
        ctx.fillRect(charX - headSize / 2 + 1, headY + 7, 2, 2);

        // Layer 6: Right Leg (Near Side)
        drawBlock(
          hipX + 2,
          hipY,
          legW,
          legH,
          -legAngle,
          legW / 2,
          0,
          "#1c1c20", // Black pants
          "#C49A5A", // Gold boots
          { x: 0, y: legH - 5, width: legW, height: 5 }
        );

        // Layer 7: Right Arm (Near Side) holding laptop
        drawBlock(
          shoulderX + 3,
          shoulderY,
          armW,
          armH,
          rightArmAngle,
          armW / 2,
          0,
          "#25252b", // Black sleeve
          "#C49A5A", // Gold cuff
          { x: 0, y: armH - 4, width: armW, height: 4 }
        );

        // ─── LAPTOP & GLOWING SCREEN BEAM ───
        const handX = shoulderX + 3 + Math.sin(rightArmAngle) * armH;
        const handY = shoulderY + Math.cos(rightArmAngle) * armH;

        // Draw Laptop keyboard and screen lid
        ctx.fillStyle = "#25252b";
        ctx.fillRect(handX - 2, handY - 1, 14, 3); // keyboard base
        ctx.fillStyle = "#32323a";
        ctx.fillRect(handX + 8, handY - 9, 3, 9); // screen lid (standing up)

        // Laptop glow beam (warm white/gold light)
        const lightGlow = ctx.createLinearGradient(handX + 8, handY - 5, handX + 50, handY);
        lightGlow.addColorStop(0, "rgba(196, 154, 90, 0.35)");
        lightGlow.addColorStop(0.5, "rgba(196, 154, 90, 0.08)");
        lightGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = lightGlow;
        ctx.beginPath();
        ctx.moveTo(handX + 8, handY - 8);
        ctx.lineTo(handX + 48, handY - 25);
        ctx.lineTo(handX + 44, handY + 12);
        ctx.closePath();
        ctx.fill();

        // Render loading footstep particles
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#C49A5A";
        for (let i = loadingParticles.length - 1; i >= 0; i--) {
          const p = loadingParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          if (p.alpha <= 0) {
            loadingParticles.splice(i, 1);
          } else {
            ctx.fillStyle = `rgba(196, 154, 90, ${p.alpha})`;
            ctx.fillRect(p.x, p.y, p.size, p.size);
          }
        }
        ctx.shadowBlur = 0; // reset

        // Phase Transition Trigger
        if (progress >= 100) {
          phase = "transitioning";
          if (!soundPlayed) {
            soundPlayed = true;
            playBlockPlaceSound();
          }
          onStartRevealRef.current();
        }
      }

      // ─── STAGE 2: CHUNK WORLD GENERATION TRANSITION ───────────────
      if (phase === "transitioning") {
        // Clear screen to transparent (to expose homepage underneath)
        ctx.clearRect(0, 0, width, height);

        // Initialize grid of larger blocky cells (64px squares) for a cleaner, faster transition
        if (transitionGrid.length === 0) {
          const cellSize = 64;
          const cols = Math.ceil(width / cellSize);
          const rows = Math.ceil(height / cellSize);
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              // Outward radial reveal delay from center of screen with small random noise
              const dx = c - cols / 2;
              const dy = r - rows / 2;
              transitionGrid.push({
                x: c * cellSize,
                y: r * cellSize,
                w: cellSize,
                h: cellSize,
                broken: false,
                delay: Math.hypot(dx, dy) * 1.8 + Math.random() * 3, // Clean outward dissolve delay
              });
            }
          }
        }

        // Increment time and break matching blocks (increased increment for a faster 0.6s transition)
        transitionTime += 0.95;
        let allDone = true;

        transitionGrid.forEach((block) => {
          if (!block.broken) {
            if (transitionTime >= block.delay) {
              block.broken = true;
              // Spawn falling block debris (reduced debris count for a cleaner look)
              for (let i = 0; i < 1; i++) {
                transitionDebris.push({
                  x: block.x + block.w / 2,
                  y: block.y + block.h / 2,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4 - 2, // burst upwards slightly
                  size: Math.random() * 5 + 3,
                  alpha: 1.0,
                  decay: Math.random() * 0.02 + 0.02,
                });
              }
            } else {
              allDone = false;
            }
          }
        });

        // Draw remaining solid black blocks covering the page
        ctx.fillStyle = "#000000";
        transitionGrid.forEach((block) => {
          if (!block.broken) {
            // Draw slightly larger (+1px) to prevent subpixel outline grid lines
            ctx.fillRect(block.x - 0.5, block.y - 0.5, block.w + 1, block.h + 1);
          }
        });

        // Draw and update falling debris fragments
        for (let i = transitionDebris.length - 1; i >= 0; i--) {
          const d = transitionDebris[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.25; // gravity pull
          d.alpha -= d.decay;

          if (d.alpha <= 0) {
            transitionDebris.splice(i, 1);
          } else {
            ctx.fillStyle = `rgba(16, 16, 18, ${d.alpha})`;
            ctx.fillRect(d.x, d.y, d.size, d.size);
          }
        }

        // End transition when all blocks have dissolved and debris is cleared
        if (allDone && transitionDebris.length === 0) {
          onCompleteRef.current();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []); // Dependencies is empty so animation loop runs exactly once on mount and never resets

  return (
    <div className={`preloader-overlay ${revealStarted ? "transitioning" : ""}`}>
      <canvas ref={canvasRef} />
    </div>
  );
}
