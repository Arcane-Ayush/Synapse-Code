import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { cn } from "../utils/cn";
const SpaceBackground = lazy(() => import("../themes/basic/SpaceBackground"));
const ArcadeBackground = lazy(() => import("../themes/arcade/RetroGrid"));
const AnimeBackground = lazy(() => import("../themes/anime/Sakura"));
const CyberBackground = lazy(
  () => import("../themes/cyberpunk/CyberBackground"),
);

export function BackgroundParticles() {
  const { theme, isTransitioning } = useTheme();
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none transition-colors duration-700"
      aria-hidden="true"
    >
      {/* Dynamic Background Colors/Gradients outside Canvas for performance */}
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-all duration-700",
          theme === themes.BASIC && "bg-neutral-950",
          theme === themes.ARCADE &&
            "bg-[#0f0518] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0f0518] to-[#0f0518]",
          theme === themes.ANIME && "bg-sky-50",
          theme === themes.CYBERPUNK && "bg-[#0b1a3f]",
        )}
      />

      {inView && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "low-power" }}
        >
          <Suspense
            fallback={
              <mesh>
                <torusGeometry args={[2, 0.1, 8, 32]} />
                <meshBasicMaterial
                  color={
                    theme === themes.ARCADE
                      ? "#df00ff"
                      : theme === themes.ANIME
                        ? "#ffb7c5"
                        : "#ffffff"
                  }
                />
              </mesh>
            }
          >
            <AdaptiveDpr />
            {theme === themes.BASIC && <SpaceBackground />}
            {theme === themes.ARCADE && <ArcadeBackground />}
            {theme === themes.ANIME && <AnimeBackground />}
            {theme === themes.CYBERPUNK && <CyberBackground />}
          </Suspense>
        </Canvas>
      )}
      <div
        className={cn(
          "absolute inset-0 bg-black transition-opacity duration-300",
          isTransitioning ? "opacity-80" : "opacity-0",
        )}
      />
    </div>
  );
}
