/* eslint-disable no-unused-vars */
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "../../utils/cn";
import { useSound } from "../../context/SoundContext";

export default function CyberCard({
  children,
  className,
  glowColor = "#0ea5e9",
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { playSound } = useSound();

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden rounded-xl",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playSound("hover")}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${glowColor}20,
              transparent 80%
            )
          `,
        }}
      />

      {/* Animated Border Gradient */}
      <div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          backgroundSize: "200% 200%",
          animation: "shine 3s linear infinite",
        }}
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                           linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Content Container */}
      <div className="relative h-full">{children}</div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-xl transition-colors group-hover:border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-xl transition-colors group-hover:border-pink-500/50" />
    </div>
  );
}
