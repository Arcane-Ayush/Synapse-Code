/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "../../utils/cn";

export default function GlitchText({ text, className, as: Tag = "h1" }) {
  const [isHovered, setIsHovered] = useState(false);

  // Random glitch effect
  const [glitchState, setGlitchState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchState((prev) => prev + 1);
        setTimeout(() => setGlitchState((prev) => prev + 1), 100);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Tag
      className={cn(
        "relative inline-block font-black uppercase tracking-widest group cursor-default transition-all duration-300",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textShadow: isHovered
          ? "0 0 10px rgba(14,165,233,0.8), 0 0 20px rgba(14,165,233,0.4)"
          : "none",
      }}
    >
      <motion.span
        className="relative z-10 block"
        animate={{ letterSpacing: isHovered ? "0.2em" : "0.1em" }}
      >
        {text}
      </motion.span>

      {/* Cyan Channel */}
      <motion.span
        className="absolute inset-0 text-[#0ea5e9] opacity-70 mix-blend-screen z-0"
        animate={
          isHovered || glitchState % 2 !== 0
            ? {
                x: [-2, 2, -1, 0],
                y: [1, -1, 0],
                opacity: [0.8, 0.5, 0.8],
              }
            : { x: 0, y: 0 }
        }
        transition={{
          duration: 0.2,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      {/* Magenta Channel */}
      <motion.span
        className="absolute inset-0 text-[#f43f5e] opacity-70 mix-blend-screen z-0"
        animate={
          isHovered || glitchState % 2 !== 0
            ? {
                x: [2, -2, 1, 0],
                y: [-1, 1, 0],
                opacity: [0.8, 0.5, 0.8],
              }
            : { x: 0, y: 0 }
        }
        transition={{
          duration: 0.25,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      {/* Yellow Channel */}
      <motion.span
        className="absolute inset-0 text-[#ffff00] opacity-70 mix-blend-screen z-0"
        animate={
          isHovered || glitchState % 2 !== 0
            ? {
                x: [0, 0, 3, -3, 0],
                opacity: [0, 0.5, 0],
              }
            : { x: 0, opacity: 0 }
        }
        transition={{ duration: 0.1, repeat: isHovered ? Infinity : 0 }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </Tag>
  );
}
