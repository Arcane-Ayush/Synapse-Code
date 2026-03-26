/* eslint-disable no-unused-vars */
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { cn } from "../../utils/cn";
import { useSound } from "../../context/SoundContext";

export default function CyberButton({
  children,
  onClick,
  className,
  variant = "primary",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const { playSound } = useSound();

  const colors = {
    primary: {
      text: "text-[#0ea5e9]",
      border: "border-[#0ea5e9]",
      glow: "shadow-[0_0_20px_rgba(14,165,233,0.5)]",
      discharge: "#0ea5e9",
    },
    secondary: {
      text: "text-[#f43f5e]",
      border: "border-[#f43f5e]",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]",
      discharge: "#f43f5e",
    },
    accent: {
      text: "text-[#ffff00]",
      border: "border-[#ffff00]",
      glow: "shadow-[0_0_20px_rgba(255,255,0,0.5)]",
      discharge: "#ffff00",
    },
  };

  const style = colors[variant] || colors.primary;

  const handleClick = async (e) => {
    playSound("click");
    // Electric discharge animation
    await controls.start({
      boxShadow: [
        `0 0 0px ${style.discharge}`,
        `0 0 30px ${style.discharge}, inset 0 0 20px ${style.discharge}`,
        `0 0 0px ${style.discharge}`,
      ],
      scale: [1, 0.95, 1],
      transition: { duration: 0.2 },
    });
    if (onClick) onClick(e);
  };

  return (
    <motion.button
      className={cn(
        "relative px-6 py-3 font-[Orbitron] font-bold tracking-widest uppercase text-sm transition-all duration-300",
        "bg-black/80 backdrop-blur-sm border-2 overflow-hidden group",
        style.text,
        style.border,
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={controls}
      onClick={handleClick}
      onMouseEnter={() => {
        setIsHovered(true);
        playSound("hover");
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Scanline */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')]"></div>

      {/* Glitch Overlay on Hover */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-white/10 mix-blend-overlay"
          animate={{
            x: [-2, 2, -2, 0],
            opacity: [0, 0.2, 0],
          }}
          transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 0.1 }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>

      {/* Corner Accents */}
      <div
        className={cn(
          "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2",
          style.border,
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2",
          style.border,
        )}
      />

      {/* Button Glow */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          style.glow,
        )}
      />
    </motion.button>
  );
}
