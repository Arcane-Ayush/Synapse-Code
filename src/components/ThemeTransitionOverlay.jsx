import { motion as Motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../themes/config";

const colors = {
  [THEMES.BASIC]: "#000000",
  [THEMES.ARCADE]: "#0f0518",
  [THEMES.ANIME]: "#ffffff",
  [THEMES.CYBERPUNK]: "#0b1a3f",
};

export function ThemeTransitionOverlay() {
  const { isTransitioning, nextTheme } = useTheme();
  const bg = colors[nextTheme] || "#000000";

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {isTransitioning && (
        <>
          <Motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{ background: bg }}
          />
          {nextTheme === THEMES.CYBERPUNK && (
            <div className="absolute inset-0 flex items-center justify-center mix-blend-screen z-10 pointer-events-none">
              <div className="text-[#0ea5e9] font-[Orbitron] text-4xl animate-pulse tracking-widest font-black">
                SYSTEM_OVERRIDE
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ThemeTransitionOverlay;
