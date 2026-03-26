/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { activities } from "../data/mockData";
import {
  generateGoogleCalendarUrl,
  downloadIcsFile,
} from "../utils/calendarUtils";
import { useTheme } from "../context/ThemeContext";
import { THEMES } from "../themes/config";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Share2,
  Linkedin,
  Twitter,
  Facebook,
  ExternalLink,
  ChevronLeft,
  Copy,
  Check,
} from "lucide-react";

// Theme-specific imports (for dynamic styling)
// In a real app, these could be abstracted further
const THEME_STYLES = {
  [THEMES.BASIC]: {
    bg: "bg-white dark:bg-slate-900",
    text: "text-slate-900 dark:text-white",
    accent: "text-indigo-600 dark:text-indigo-400",
    button: "bg-indigo-600 hover:bg-indigo-700 text-white",
    card: "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
  },
  [THEMES.ARCADE]: {
    bg: "bg-[#0f0518]",
    text: "text-[#20ff4d]",
    accent: "text-[#ff00ff]",
    button:
      "bg-[#20ff4d] text-black hover:bg-[#15cc3d] font-mono border-2 border-[#20ff4d]",
    card: "bg-[#1a1a2e] border-2 border-[#20ff4d]",
  },
  [THEMES.ANIME]: {
    bg: "bg-white",
    text: "text-slate-900",
    accent: "text-pink-500",
    button:
      "bg-pink-500 hover:bg-pink-600 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    card: "bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
  },
  [THEMES.CYBERPUNK]: {
    bg: "bg-[#050a14]",
    text: "text-cyan-400",
    accent: "text-yellow-400",
    button:
      "bg-cyan-950/50 border border-cyan-500 text-cyan-400 hover:bg-cyan-900/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    card: "bg-[#0b1a3f]/80 border border-cyan-500/30 backdrop-blur-md",
  },
};

export default function ActivityDetail() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [activity, setActivity] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const [copied, setCopied] = useState(false);
  const styles = THEME_STYLES[theme] || THEME_STYLES[THEMES.BASIC];

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate API fetch
    const found = activities.find((a) => a.id === parseInt(id));
    setActivity(found || null);
  }, [id]);

  useEffect(() => {
    if (!activity) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(
        `${activity.date} ${activity.time.split(" - ")[0]}`,
      );
      const now = new Date();
      const difference = eventDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        return "Event Started";
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [activity]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${activity?.title} at Google Club!`;

    const links = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.open(links[platform], "_blank");
    }
  };

  if (!activity)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const progress = activity.capacity
    ? (activity.registered / activity.capacity) * 100
    : 0;
  const isCyberpunk = theme === THEMES.CYBERPUNK;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen pb-20 ${styles.bg} ${styles.text}`}
    >
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-t ${isCyberpunk ? "from-[#050a14]" : "from-black/80"} to-transparent z-10`}
        />

        {/* Background Image/Map Placeholder */}
        <div className="absolute inset-0 bg-slate-900">
          {/* Abstract Pattern or Map */}
          <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 mb-6 opacity-80 hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} /> Back to Activities
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.span
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider rounded-full border ${styles.accent} border-current`}
              >
                {activity.type}
              </motion.span>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`text-4xl md:text-6xl font-bold mb-2 ${isCyberpunk ? "font-[Orbitron] tracking-widest glitch-text" : ""}`}
              >
                {activity.title}
              </motion.h1>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 text-lg opacity-90"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  <span>{activity.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{activity.time}</span>
                </div>
              </motion.div>
            </div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-xl border backdrop-blur-sm ${styles.card} text-center min-w-[200px]`}
            >
              <div className="text-xs uppercase tracking-widest opacity-70 mb-1">
                Event Starts In
              </div>
              <div className={`text-2xl font-mono font-bold ${styles.accent}`}>
                {timeLeft}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-30">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`p-8 rounded-2xl border ${styles.card}`}
            >
              <h2
                className={`text-2xl font-bold mb-4 ${isCyberpunk ? "font-[Orbitron]" : ""}`}
              >
                About Event
              </h2>
              <p className="leading-relaxed opacity-90 text-lg">
                {activity.fullDescription || activity.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {activity.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-full text-sm border opacity-80 ${styles.card}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Speakers */}
            {activity.speakers && activity.speakers.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`p-8 rounded-2xl border ${styles.card}`}
              >
                <h2
                  className={`text-2xl font-bold mb-6 ${isCyberpunk ? "font-[Orbitron]" : ""}`}
                >
                  Speakers
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {activity.speakers.map((speaker, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        className={`w-16 h-16 rounded-full object-cover border-2 ${isCyberpunk ? "border-cyan-500" : "border-gray-200"}`}
                      />
                      <div>
                        <div className="font-bold text-lg">{speaker.name}</div>
                        <div className={`text-sm opacity-80 ${styles.accent}`}>
                          {speaker.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Location Map Placeholder */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className={`p-1 rounded-2xl border overflow-hidden ${styles.card}`}
            >
              <div className="aspect-video bg-slate-800 relative flex items-center justify-center">
                <MapPin size={48} className="opacity-50" />
                <span className="ml-2 font-mono opacity-50">
                  Map View Placeholder for {activity.location}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className={`p-6 rounded-2xl border ${styles.card} sticky top-24`}
            >
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2 opacity-80">
                  <span>Registration Status</span>
                  <span>
                    {activity.registered} / {activity.capacity} Spots
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${isCyberpunk ? "bg-cyan-500 shadow-[0_0_10px_#06b6d4]" : "bg-green-500"}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 text-center font-bold text-lg rounded-xl mb-4 transition-transform hover:scale-[1.02] active:scale-[0.98] ${isCyberpunk ? "bg-cyan-500 text-black shadow-[0_0_20px_#06b6d4]" : "bg-green-600 text-white"}`}
              >
                RSVP Now
              </a>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() =>
                    window.open(generateGoogleCalendarUrl(activity), "_blank")
                  }
                  className={`flex items-center justify-center gap-2 py-2 text-sm rounded-lg border hover:bg-white/5 transition-colors ${isCyberpunk ? "border-cyan-500/30" : "border-current opacity-70"}`}
                >
                  <Calendar size={16} /> Google Cal
                </button>
                <button
                  onClick={() => downloadIcsFile(activity)}
                  className={`flex items-center justify-center gap-2 py-2 text-sm rounded-lg border hover:bg-white/5 transition-colors ${isCyberpunk ? "border-cyan-500/30" : "border-current opacity-70"}`}
                >
                  <Calendar size={16} /> .ICS File
                </button>
              </div>

              <div className="border-t border-gray-700/50 pt-6">
                <div className="text-sm font-bold mb-3 uppercase tracking-wider opacity-70">
                  Share Event
                </div>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="p-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-colors"
                  >
                    <Twitter size={20} />
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="p-2 rounded-lg hover:bg-blue-700/20 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin size={20} />
                  </button>
                  <button
                    onClick={() => handleShare("facebook")}
                    className="p-2 rounded-lg hover:bg-blue-600/20 hover:text-blue-500 transition-colors"
                  >
                    <Facebook size={20} />
                  </button>
                  <button
                    onClick={() => handleShare("copy")}
                    className="p-2 rounded-lg hover:bg-green-500/20 hover:text-green-400 transition-colors relative"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
