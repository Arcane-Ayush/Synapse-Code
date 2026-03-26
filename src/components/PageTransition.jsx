import { motion as Motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { useEffect } from "react";

const variants = {
  [themes.BASIC]: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" },
  },
  [themes.ARCADE]: {
    initial: { opacity: 0, x: -50, rotateY: 25 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: 50, rotateY: -25 },
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  [themes.ANIME]: {
    initial: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.2, filter: "blur(10px)" },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }, // Custom easing
  },
};

export const PageTransition = ({ children }) => {
  const { theme } = useTheme();
  const currentVariant = variants[theme] || variants[themes.BASIC];
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const heading = document.querySelector(
      "#main-content h1, #main-content h2",
    );
    if (heading) {
      const prevTabIndex = heading.getAttribute("tabindex");
      heading.setAttribute("tabindex", "-1");
      heading instanceof HTMLElement && heading.focus();
      if (prevTabIndex === null) {
        heading.removeAttribute("tabindex");
      } else {
        heading.setAttribute("tabindex", prevTabIndex);
      }
    }
  }, []);

  return (
    <Motion.div
      initial={prefersReduced ? { opacity: 0 } : currentVariant.initial}
      animate={prefersReduced ? { opacity: 1 } : currentVariant.animate}
      exit={prefersReduced ? { opacity: 0 } : currentVariant.exit}
      transition={
        prefersReduced ? { duration: 0.2 } : currentVariant.transition
      }
      className="w-full h-full"
    >
      {children}
    </Motion.div>
  );
};
