"use client";

import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  theme: 'light' | 'dark';
}

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  decay: number;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Point[] = [];
    let shootingStars: ShootingStar[] = [];
    let width = window.innerWidth;
    let height = window.innerHeight;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Reduced density: increased divisor from 15000 to 25000
      const particleCount = Math.floor((width * height) / 5000);

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, // Slower movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.7 + 0.2, // Smaller stars
          alpha: Math.random(),
          targetAlpha: Math.random(),
        });
      }
    };

    const handleResize = () => {
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    init();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const particleBaseColor = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';
      const lineBaseColor = theme === 'dark' ? '255, 255, 255' : '0, 0, 0';

      // Update and draw particles
      particles.forEach((p, i) => {
        // Twinkle effect
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
          p.targetAlpha = Math.random() * 0.5 + 0.2; // Min alpha 0.2
        } else {
          p.alpha += (p.targetAlpha - p.alpha) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Mouse Repulsion (Subtle)
        const dxMouse = p.x - mouseRef.current.x;
        const dyMouse = p.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 40) {
          const force = (40 - distMouse) / 40;
          const angle = Math.atan2(dyMouse, dxMouse);
          p.x += Math.cos(angle) * force * 1.7; // Push away
          p.y += Math.sin(angle) * force * 1.7;
        }

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleBaseColor}, ${p.alpha})`;
        ctx.fill();

        // Connect to NEAREST neighbors only (Constellation shape)
        // Find neighbors
        const neighbors = [];
        for (let j = 0; j < particles.length; j++) {
          if (i === j) continue;
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) { // 120 significa que as linhas se formam a partir de 120 pixels de distância
            neighbors.push({ index: j, dist });
          }
        }

        // Sort by distance and take top 2-3 to form shapes, not mesh
        neighbors.sort((a, b) => a.dist - b.dist);
        const maxConnections = 7; // padrao é 2

        for (let k = 0; k < Math.min(neighbors.length, maxConnections); k++) {
          const neighbor = particles[neighbors[k].index];
          // Only draw if index is greater to avoid double drawing
          if (neighbors[k].index > i) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${0.1 * (1 - neighbors[k].dist / 90)})`; // Very subtle lines
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
          }
        }

        // Connect to mouse (Constellation with mouse)
        if (distMouse < 90) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${lineBaseColor}, ${0.2 * (1 - distMouse / 90)})`;
          ctx.lineWidth = 0.7;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      });

      // Shooting stars logic (Dark mode only)
      if (theme === 'dark') {
        if (Math.random() < 0.003 && shootingStars.length < 2) {
          const isFast = Math.random() < 0.6;
          shootingStars.push({
            x: Math.random() * width, // x define a posição horizontal da estrela
            y: Math.random() * height * 0.5, // y define a posição vertical da estrela
            vx: isFast // vx define a velocidade horizontal da estrela
              ? (Math.random() - 0.5) * 10 + (Math.random() < 0.5 ? -10 : 10)
              : (Math.random() - 0.5) * 6 + (Math.random() < 0.5 ? -6 : 6),
            vy: isFast // vy define a velocidade vertical da estrela
              ? Math.random() * 5 + 2
              : Math.random() * 3 + 1,
            length: isFast
              ? Math.random() * 50 + 50
              : Math.random() * 50 + 70, // Longer tail for slow ones
            life: 1.0,
            decay: isFast ? 0.01 : 0.003 // Much slower decay for slow stars
          });
        }
      } else {
        shootingStars = [];
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0 || s.x < -100 || s.x > width + 100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - s.vx * (s.length / Math.sqrt(s.vx * s.vx + s.vy * s.vy));
        const tailY = s.y - s.vy * (s.length / Math.sqrt(s.vx * s.vx + s.vy * s.vy));

        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(${particleBaseColor}, ${s.life})`);
        gradient.addColorStop(1, `rgba(${particleBaseColor}, 0)`);

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};
