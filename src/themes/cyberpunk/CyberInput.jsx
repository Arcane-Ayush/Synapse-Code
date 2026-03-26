/* eslint-disable no-unused-vars */
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { useSound } from "../../context/SoundContext";

export default function CyberInput({
  label,
  type = "text",
  placeholder,
  className,
  ...props
}) {
  const [focused, setFocused] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { playSound } = useSound();

  const rotateX = useTransform(y, [0, 100], [5, -5]);
  const rotateY = useTransform(x, [0, 100], [-5, 5]);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  return (
    <div
      className={cn("relative group perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playSound("hover")}
    >
      {/* Label */}
      {label && (
        <label className="block mb-2 text-xs font-[Orbitron] text-cyan-400 tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
          {label}
        </label>
      )}

      {/* Input Container */}
      <motion.div
        className="relative overflow-hidden rounded bg-black/60 border border-white/10 backdrop-blur-md"
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Border Gradient */}
        <div
          className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-500",
            focused ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(14,165,233,0.5), transparent)",
            backgroundSize: "200% 100%",
            animation: "scan-horizontal 2s linear infinite",
          }}
        />

        {/* Input Field */}
        <input
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-3 text-cyan-50 font-mono text-sm placeholder-white/20 focus:outline-none relative z-10"
          onFocus={() => {
            setFocused(true);
            playSound("click");
          }}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]" />

        {/* Focus Glow */}
        {focused && (
          <motion.div
            className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(14,165,233,0.2)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {/* Corner Markers */}
      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r border-b border-cyan-500/50" />
      <div className="absolute -top-1 -left-1 w-2 h-2 border-l border-t border-cyan-500/50" />
    </div>
  );
}
