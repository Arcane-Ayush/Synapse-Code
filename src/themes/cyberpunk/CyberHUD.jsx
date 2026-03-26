/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/purity */
import { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function SystemLog() {
  const [logs, setLogs] = useState([]);
  const messages = useMemo(
    () => [
      "Scanning network...",
      "Packet received",
      "Encryption verified",
      "Render cycle complete",
      "Updating shaders...",
      "System nominal",
      "Data stream active",
      "Firewall engaging...",
      "Ping: 12ms",
      "Secure connection established",
    ],
    [],
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const time = new Date().toLocaleTimeString("en-US", { hour12: false });
      setLogs((prev) => [`[${time}] ${msg}`, ...prev].slice(0, 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className="font-mono text-[10px] text-cyan-500/70 leading-tight space-y-1">
      {logs.map((log, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1 - i * 0.2, x: 0 }}
          className="truncate"
        >
          {log}
        </motion.div>
      ))}
    </div>
  );
}

function CPUGraph() {
  const bars = useMemo(
    () =>
      [...Array(12)].map(() => ({
        duration: 0.5 + Math.random(),
        height: Math.random() * 80 + 20,
      })),
    [],
  );

  return (
    <div className="flex items-end gap-[2px] h-8 w-24">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-full bg-cyan-500/50"
          animate={{
            height: ["20%", `${bar.height}%`, "40%"],
            backgroundColor: [
              "rgba(6,182,212,0.5)",
              "rgba(244,63,94,0.5)",
              "rgba(6,182,212,0.5)",
            ],
          }}
          transition={{
            duration: bar.duration,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

export default function CyberHUD() {
  const [time, setTime] = useState("");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.3]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
    >
      {/* Corner Brackets */}
      <svg className="absolute top-4 left-4 w-32 h-32" viewBox="0 0 100 100">
        <path
          d="M0 20 V0 H20 M0 20 L20 0"
          stroke="#0ea5e9"
          strokeWidth="2"
          fill="none"
        />
        <rect
          x="5"
          y="5"
          width="2"
          height="2"
          fill="#0ea5e9"
          className="animate-pulse"
        />
      </svg>
      <svg
        className="absolute top-4 right-4 w-32 h-32 rotate-90"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 20 V0 H20 M0 20 L20 0"
          stroke="#0ea5e9"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-4 right-4 w-32 h-32 rotate-180"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 20 V0 H20 M0 20 L20 0"
          stroke="#0ea5e9"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="absolute bottom-4 left-4 w-32 h-32 -rotate-90"
        viewBox="0 0 100 100"
      >
        <path
          d="M0 20 V0 H20 M0 20 L20 0"
          stroke="#0ea5e9"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Top Bar */}
      <div className="absolute top-6 left-12 right-12 flex justify-between items-center font-[Orbitron] text-xs text-cyan-400 tracking-widest uppercase">
        <div className="flex gap-4">
          <span className="animate-pulse">● SYSTEM_ONLINE</span>
          <span>:: {time}</span>
        </div>
        <div className="flex gap-4">
          <span>
            NET_STATUS: <span className="text-green-400">SECURE</span>
          </span>
          <span>VR_READY</span>
        </div>
      </div>

      {/* Side Bars (Scroll Indicator) */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 h-64 w-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-cyan-500 shadow-[0_0_10px_#0ea5e9]"
          style={{ height: scrollYProgress, scaleY: scrollYProgress }}
        />
      </div>

      {/* Bottom Data */}
      <div className="absolute bottom-8 left-12 flex items-end gap-8">
        <div className="w-48">
          <div className="text-[10px] text-cyan-600 mb-1 tracking-wider">
            SYSTEM_LOG
          </div>
          <SystemLog />
        </div>
      </div>

      <div className="absolute bottom-8 right-12 text-right">
        <div className="text-[10px] text-cyan-600 mb-1 tracking-wider">
          CPU_LOAD
        </div>
        <CPUGraph />
      </div>

      {/* Center Reticle (fades on scroll) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
        style={{ opacity }}
      >
        <div className="w-[500px] h-[500px] border border-cyan-500/10 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
          <div className="w-[480px] h-[480px] border-t border-b border-cyan-500/20 rounded-full" />
        </div>
        <div className="absolute w-[300px] h-[300px] border border-pink-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      </motion.div>
    </motion.div>
  );
}
