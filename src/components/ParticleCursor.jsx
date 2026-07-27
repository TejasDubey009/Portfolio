import React, { useEffect, useState, useRef } from 'react';

export const ParticleCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    let animId;
    let particleArray = [];

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable element
      const target = e.target;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick != null ||
        target.classList.contains('hero-3d-badge') ||
        target.closest('button') ||
        target.closest('a');

      setIsPointer(!!isClickable);

      // Add particle on mouse move
      if (Math.random() > 0.4) {
        particleArray.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 1.5,
          speedY: (Math.random() - 0.5) * 1.5,
          opacity: 0.8,
          color: isClickable ? '#a855f7' : '#06b6d4'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Canvas animation loop for cursor particles
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleArray.length; i++) {
        const p = particleArray[i];
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity -= 0.025;
        p.size *= 0.95;

        if (p.opacity <= 0 || p.size <= 0.5) {
          particleArray.splice(i, 1);
          i--;
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="cursor-particle-canvas" />
      <div
        className={`custom-cursor-follower ${isPointer ? 'pointer' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </>
  );
};
