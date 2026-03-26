/* eslint-disable no-unused-vars */
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export default function CyberScrollWrapper({ children }) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const skew = useTransform(smoothVelocity, [-1000, 1000], [-2, 2]);
  const scale = useTransform(smoothVelocity, [-1000, 0, 1000], [0.98, 1, 0.98]);
  const y = useTransform(smoothVelocity, [-1000, 1000], [-5, 5]);

  return (
    <motion.div
      style={{ skewY: skew, scale, y }}
      className="origin-center will-change-transform"
    >
      {children}
    </motion.div>
  );
}
