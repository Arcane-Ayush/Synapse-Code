/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export default function CyberCursor() {
  const cursorRef = useRef(null);
  const trailsRef = useRef([]);
  const mouse = { x: useMotionValue(0), y: useMotionValue(0) };

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouse.x, smoothOptions);
  const smoothY = useSpring(mouse.y, smoothOptions);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);

      // Add trail particle
      const trail = document.createElement("div");
      trail.className =
        "fixed pointer-events-none w-1 h-1 bg-cyan-500/50 rounded-full z-[100]";
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      document.body.appendChild(trail);

      const trailObj = { el: trail, life: 1.0 };
      trailsRef.current.push(trailObj);

      // Limit trail length
      if (trailsRef.current.length > 20) {
        const old = trailsRef.current.shift();
        if (old?.el) old.el.remove();
      }
    };

    const handleMouseDown = (e) => {
      const ripple = document.createElement("div");
      ripple.className =
        "fixed pointer-events-none w-8 h-8 border-2 border-cyan-400 rounded-full z-[100] animate-ping";
      ripple.style.left = `${e.clientX - 16}px`;
      ripple.style.top = `${e.clientY - 16}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    // Animation Loop for Trail Fading
    let rafId;
    const animate = () => {
      trailsRef.current.forEach((t, i) => {
        t.life -= 0.05;
        t.el.style.opacity = t.life;
        t.el.style.transform = `scale(${t.life})`;
        if (t.life <= 0) {
          t.el.remove();
          trailsRef.current.splice(i, 1);
        }
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      cancelAnimationFrame(rafId);
      trailsRef.current.forEach((t) => t.el.remove());
    };
  }, []);

  return (
    <>
      <style>{`
        * { cursor: none !important; }
        /* Exceptions for iframes etc */
        iframe { cursor: auto !important; }
      `}</style>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 border border-cyan-400 rotate-45 pointer-events-none z-[100] mix-blend-difference"
        style={{
          transform: `translate3d(${smoothX.get()}px, ${smoothY.get()}px, 0) rotate(45deg)`, // Initial render only, updated via ref manually for perf? No, using motion value in style is better
        }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-pink-500 rounded-full" />
      </div>
    </>
  );
}
