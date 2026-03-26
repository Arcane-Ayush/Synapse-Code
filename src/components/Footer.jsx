import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { cn } from "../utils/cn";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const { theme } = useTheme();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const card = cn(
    "rounded-3xl px-6 py-8 border transition-colors",
    theme === themes.ANIME
      ? "bg-white/90 border-black/20"
      : "bg-black/50 border-white/10 backdrop-blur-md",
  );

  const link = cn(
    "text-sm hover:underline",
    theme === themes.ANIME
      ? "text-slate-700 hover:text-slate-900"
      : "text-gray-300 hover:text-white",
  );

  return (
    <footer className="relative z-10">
      <div className="container mx-auto px-4 py-10">
        <div className={card}>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className={cn(
                    "p-2 rounded-full",
                    theme === themes.ANIME
                      ? "bg-black text-white"
                      : "bg-white/10 text-white",
                  )}
                >
                  GC
                </div>
                <div
                  className={cn(
                    theme === themes.ANIME ? "text-black" : "text-white",
                  )}
                >
                  Google Club
                </div>
              </div>
              <p
                className={cn(
                  "text-sm",
                  theme === themes.ANIME ? "text-slate-600" : "text-gray-300",
                )}
              >
                Student community at CU. Learn, build, and connect through
                projects and study jams.
              </p>
            </div>

            <div>
              <h4
                className={cn(
                  "font-bold mb-3",
                  theme === themes.ANIME ? "text-black" : "text-white",
                )}
              >
                Quick Links
              </h4>
              <div className="flex flex-col gap-2">
                <Link to="/" className={link}>
                  Home
                </Link>
                <Link to="/projects" className={link}>
                  Projects
                </Link>
                <Link to="/activities" className={link}>
                  Activities
                </Link>
                <Link to="/sprints" className={link}>
                  Sprints
                </Link>
              </div>
            </div>

            <div>
              <h4
                className={cn(
                  "font-bold mb-3",
                  theme === themes.ANIME ? "text-black" : "text-white",
                )}
              >
                Connect
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/Arcane-Ayush"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  <Github size={16} /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  <Instagram size={16} /> Instagram
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link}
                >
                  <MessageCircle size={16} /> Discord
                </a>
              </div>
            </div>

            <div>
              <h4
                className={cn(
                  "font-bold mb-3",
                  theme === themes.ANIME ? "text-black" : "text-white",
                )}
              >
                Newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  aria-label="Email"
                  placeholder="you@university.edu"
                  className={cn(
                    "flex-1 px-3 py-2 rounded-md text-sm border",
                    theme === themes.ANIME
                      ? "bg-white border-black/20 text-black"
                      : "bg-black/30 border-white/20 text-white",
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-bold border",
                    theme === themes.ANIME
                      ? "bg-black text-white border-black"
                      : "bg-white/10 text-white border-white/30",
                  )}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/10">
            <div
              className={cn(
                "text-xs",
                theme === themes.ANIME ? "text-slate-600" : "text-gray-400",
              )}
            >
              © {new Date().getFullYear()} Google Club CU ·{" "}
              <a href="#" className={link}>
                Privacy Policy
              </a>{" "}
              ·{" "}
              <a href="#" className={link}>
                Code of Conduct
              </a>
            </div>
            {showTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={cn(
                  "px-3 py-2 rounded-full text-xs font-semibold border",
                  theme === themes.ANIME
                    ? "bg-black text-white border-black"
                    : "bg-white/10 text-white border-white/30",
                )}
                aria-label="Back to Top"
              >
                Back to Top
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
