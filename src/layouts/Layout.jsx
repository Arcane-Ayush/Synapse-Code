import { BackgroundParticles } from "../components/BackgroundParticles";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { ThemeEffects } from "../components/ThemeEffects";
import { Navbar } from "../components/Navbar";
import { ThemeTransitionOverlay } from "../components/ThemeTransitionOverlay";
import Footer from "../components/Footer";
import { useTheme } from "../context/ThemeContext";
import { SoundProvider } from "../context/SoundContext";
import { THEMES } from "../themes/config";
import CyberHUD from "../themes/cyberpunk/CyberHUD";
import CyberCursor from "../themes/cyberpunk/CyberCursor";
import CyberScrollWrapper from "../themes/cyberpunk/CyberScrollWrapper";

export function Layout({ children }) {
  const { theme } = useTheme();
  const isCyber = theme === THEMES.CYBERPUNK;

  return (
    <SoundProvider>
      <div className="min-h-screen text-foreground flex flex-col font-sans relative overflow-x-hidden transition-colors duration-500">
        {isCyber && <CyberHUD />}
        {isCyber && <CyberCursor />}

        <ThemeTransitionOverlay />
        <ThemeEffects />
        <BackgroundParticles />
        <Navbar />
        <main
          id="main-content"
          className="flex-grow pt-14 md:pt-16 px-2 sm:px-4 relative z-10"
        >
          {isCyber ? (
            <CyberScrollWrapper>{children}</CyberScrollWrapper>
          ) : (
            children
          )}
        </main>
        <ThemeSwitcher />
        <Footer />
      </div>
    </SoundProvider>
  );
}
export default Layout;
