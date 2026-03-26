import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { useReducedMotion } from "framer-motion";

export function ThemeEffects() {
  const { theme } = useTheme();
  const prefersReduced = useReducedMotion();
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef([]);
  const isTouchNoHover =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  useEffect(() => {
    if (prefersReduced || isTouchNoHover) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("resize", resize);

    const maxPoints = theme === themes.ARCADE ? 24 : 40;
    const spawnEvery = theme === themes.ARCADE ? 1 : 2;
    let tick = 0;

    const step = () => {
      tick++;
      if (tick % spawnEvery === 0) {
        const { x, y } = mouseRef.current;
        const p = {
          x,
          y,
          vx: 0,
          vy: -0.4,
          life: 1,
          size: theme === themes.ARCADE ? 8 : theme === themes.ANIME ? 6 : 3,
        };
        pointsRef.current.push(p);
        if (pointsRef.current.length > maxPoints) pointsRef.current.shift();
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;
        if (p.life <= 0) {
          pointsRef.current.splice(i, 1);
          i--;
          continue;
        }
        const alpha = Math.max(p.life, 0);
        if (theme === themes.ANIME) {
          ctx.fillStyle = `rgba(255, 105, 180, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (theme === themes.ARCADE) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((1 - p.life) * Math.PI * 0.25);
          ctx.fillStyle = `rgba(${Math.random() > 0.5 ? "0,255,255" : "255,0,255"}, ${alpha})`;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        } else if (theme === themes.CYBERPUNK) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((1 - p.life) * 0.2);
          const grad = ctx.createLinearGradient(-7, 0, 7, 0);
          grad.addColorStop(0, `rgba(255,255,0, ${alpha})`);
          grad.addColorStop(1, `rgba(34,211,238, ${alpha})`);
          ctx.fillStyle = grad;
          ctx.fillRect(-7, -1, 14, 2);
          ctx.restore();
        } else {
          ctx.fillStyle = `rgba(255,255,255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(
            p.x + (Math.random() - 0.5) * 6,
            p.y + (Math.random() - 0.5) * 6,
            p.size / 2,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
    };
  }, [theme, prefersReduced, isTouchNoHover]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {!prefersReduced && !isTouchNoHover && (
        <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
      )}
    </div>
  );
}
