import { useParams, Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { ArrowLeft } from "lucide-react";

export default function SprintDetail() {
  const { id } = useParams();
  const { theme } = useTheme();

  const getStyles = () => {
    switch (theme) {
      case themes.ARCADE:
        return {
          container: "bg-black min-h-screen text-[#00ff00] font-mono p-8 pt-24",
          header: "text-4xl text-[#df00ff] mb-8 uppercase",
          backBtn:
            "text-[#00ff00] hover:text-[#df00ff] mb-8 inline-flex items-center gap-2",
        };
      case themes.BASIC:
        return {
          container:
            "bg-neutral-950 min-h-screen text-white font-sans p-8 pt-24",
          header: "text-4xl font-bold mb-8",
          backBtn:
            "text-neutral-400 hover:text-white mb-8 inline-flex items-center gap-2",
        };
      default: // Anime
        return {
          container: "bg-slate-900 min-h-screen text-white font-sans p-8 pt-24",
          header:
            "text-5xl font-black italic mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500",
          backBtn:
            "text-pink-400 hover:text-pink-300 mb-8 inline-flex items-center gap-2",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={styles.container}>
      <div className="max-w-4xl mx-auto">
        <Link to="/sprints" className={styles.backBtn}>
          <ArrowLeft size={20} /> Back to Sprints
        </Link>
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={styles.header}>Sprint Details: {id}</h1>
          <p className="opacity-70">
            Detailed view for sprint {id} is coming soon.
          </p>
        </Motion.div>
      </div>
    </div>
  );
}
