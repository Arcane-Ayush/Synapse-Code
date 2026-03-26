/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CircuitLoader({ onComplete }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050a14]"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-64 h-64">
            {/* Central Core */}
            <motion.div
              className="absolute inset-0 m-auto w-32 h-32 border-4 border-[#0ea5e9] rounded-full shadow-[0_0_20px_#0ea5e9]"
              animate={{
                scale: [1, 1.1, 1],
                borderColor: ["#0ea5e9", "#f43f5e", "#0ea5e9"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-2 border-2 border-[#ffff00] rounded-full opacity-50 border-dashed animate-spin-slow" />
            </motion.div>

            {/* Circuit Paths */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 100 100"
            >
              <motion.path
                d="M50 10 L50 30 M90 50 L70 50 M50 90 L50 70 M10 50 L30 50"
                stroke="#0ea5e9"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="50"
                cy="10"
                r="3"
                fill="#f43f5e"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
              <motion.circle
                cx="90"
                cy="50"
                r="3"
                fill="#f43f5e"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.7 }}
              />
              <motion.circle
                cx="50"
                cy="90"
                r="3"
                fill="#f43f5e"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
              />
              <motion.circle
                cx="10"
                cy="50"
                r="3"
                fill="#f43f5e"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1.1 }}
              />
            </svg>

            {/* Loading Text */}
            <motion.div
              className="absolute -bottom-12 left-0 right-0 text-center font-[Orbitron] text-[#0ea5e9] tracking-[0.2em] text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              INITIALIZING_SYSTEM
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
