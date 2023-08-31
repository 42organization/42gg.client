import { useEffect, useRef, useState } from 'react';

interface IParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
}

export default function GachaConfetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reqAnimationRef = useRef<number>(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const particles: IParticle[] = [];
  const colors = ['#029DAF', '#E5D599', '#FFC219', '#F07C19', '#E32551'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setContext(canvas.getContext('2d'));
  }, []);

  useEffect(() => {
    if (!context) return;
    initParticles();
    reqAnimationRef.current = requestAnimationFrame(confettiAnimation);
    return () => cancelAnimationFrame(reqAnimationRef.current);
  }, [context]);

  function createParticle() {
    const x = width / 2;
    const y = height / 2;
    const vx = -2 + Math.random() * 4;
    const vy = Math.random() * -3;
    const size = 5 + Math.random() * 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = 0.5 + Math.random() * 0.5;

    particles.push({ x, y, vx, vy, size, color, opacity });
  }

  function updateParticle(particle: IParticle) {
    particle.x += particle.vx;
    particle.opacity -= 0.005;
    particle.vy += 0.04;
    particle.y += particle.vy;
  }

  function drawParticle(
    particle: IParticle,
    context: CanvasRenderingContext2D
  ) {
    context.globalAlpha = particle.opacity;
    context.fillStyle = particle.color;
    context.fillRect(particle.x, particle.y, particle.size, particle.size);
  }

  function initParticles() {
    for (let i = 0; i < 100; i++) {
      setTimeout(createParticle, 3000 + 4 * i);
    }
  }

  function confettiAnimation() {
    if (!context) return;
    context.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      updateParticle(particle);
      drawParticle(particle, context);
    });
    reqAnimationRef.current = requestAnimationFrame(confettiAnimation);
  }

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: 'absolute', top: '5%', left: 0 }}
    />
  );
}
