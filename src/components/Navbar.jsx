import { Link, useLocation } from "react-router-dom";
import { cn } from "../utils/cn";
import { Menu, X, Rocket, Terminal, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, themes } from "../context/ThemeContext";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Activities", path: "/activities" },
    { name: "Projects", path: "/projects" },
    { name: "Sprints", path: "/sprints" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const location = useLocation();
    const { theme } = useTheme();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Theme-based Styles Configuration
    const getStyles = () => {
        switch (theme) {
            case themes.ARCADE: // Arcade: Neon, Retro, Boxy
                return {
                    // Gradient Border Trick:
                    // 1. First gradient is the background (black)
                    // 2. Second gradient is the border (green -> purple)
                    dockStyle: {
                        backgroundImage: "linear-gradient(#000, #000), linear-gradient(90deg, #00ff00, #ff00ff)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                        border: "2px solid transparent",
                        boxShadow: "0 0 15px rgba(200, 0, 255, 0.4)"
                    },
                    dock: "rounded-none px-4", // Border handled by dockStyle
                    item: "rounded-none uppercase tracking-widest font-mono text-xs py-2.5", // Increased padding to match logo
                    itemActive: "bg-[#df00ff] text-black font-bold shadow-[0_0_10px_#df00ff]", // Neon Purple Active
                    itemInactive: "text-[#df00ff]/70 hover:text-[#df00ff] hover:bg-[#df00ff]/10", // Neon Purple Text
                    pill: "hidden", // No pill for arcade, just text color
                    logo: "rounded-none bg-black border border-[#df00ff] text-[#df00ff] font-mono",
                    iconContainer: "bg-[#df00ff]/20 text-[#df00ff] rounded-none",
                    mobileMenu: "bg-black border-2 border-[#df00ff] rounded-none font-mono text-[#df00ff]"
                };
            case themes.BASIC: // Basic: Minimal, Clean, Dark
                return {
                    dockStyle: {}, // No inline style needed
                    dock: "bg-neutral-900/95 border border-white/5 rounded-full px-2 shadow-2xl",
                    item: "rounded-full font-medium text-sm transition-all py-2",
                    itemActive: "text-white",
                    itemInactive: "text-gray-500 hover:text-gray-300",
                    pill: "bg-neutral-800", // Dark grey pill
                    logo: "bg-neutral-900/50 border border-white/5 text-white font-medium tracking-tight",
                    iconContainer: "bg-white/10 text-white",
                    mobileMenu: "bg-neutral-900 border border-white/10"
                };
            default: // Anime (Sakura): The original Glassmorphism
                return {
                    dockStyle: {},
                    dock: "bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-full p-1.5",
                    item: "rounded-full font-medium text-sm transition-colors duration-300 z-10 py-2",
                    itemActive: "text-black font-bold",
                    itemInactive: "text-gray-100 hover:text-white",
                    pill: "bg-white",
                    logo: "bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40",
                    iconContainer: "bg-primary/20 text-primary group-hover:rotate-12 transition-transform",
                    mobileMenu: "bg-black/80 border border-white/10 backdrop-blur-xl"
                };
        }
    };

    const styles = getStyles();

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none transition-all duration-500 ease-out transform", // Faster transition
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
            )}
        >
            <div className="w-full max-w-7xl flex items-center justify-between pointer-events-auto">

                {/* 1. Left: Logo / Brand */}
                <Link
                    to="/"
                    className={cn("group flex items-center gap-2 px-5 py-2.5 transition-all duration-300 rounded-full", styles.logo)}
                >
                    <div className={cn("p-1.5 rounded-full", styles.iconContainer)}>
                        {theme === themes.ARCADE ? <Gamepad2 size={18} /> : theme === themes.BASIC ? <Terminal size={18} /> : <Rocket size={18} strokeWidth={2.5} />}
                    </div>
                    <span className="font-bold tracking-tight">Google Club</span>
                </Link>

                {/* 2. Center: Floating Dock (Desktop) */}
                <nav
                    className={cn("hidden md:flex items-center transition-all duration-300", styles.dock)}
                    style={styles.dockStyle}
                >
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={cn(
                                    "relative px-5 transition-colors duration-300 z-10",
                                    styles.item,
                                    isActive ? styles.itemActive : styles.itemInactive
                                )}
                            >
                                {isActive && styles.pill !== "hidden" && (
                                    <motion.div
                                        layoutId="navbar-pill"
                                        className={cn("absolute inset-0 rounded-full -z-10 shadow-sm", styles.pill)}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* 3. Right: Mobile Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn("p-3 rounded-full text-white transition-colors", styles.logo)}
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className={cn("absolute top-24 left-4 right-4 p-4 rounded-3xl shadow-2xl md:hidden pointer-events-auto", styles.mobileMenu)}
                    >
                        <div className="flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "px-4 py-3.5 rounded-2xl text-base font-medium text-center transition-all",
                                        styles.item,
                                        location.pathname === item.path
                                            ? "bg-white text-black shadow-lg"
                                            : "text-gray-300 hover:bg-white/10 hover:text-white",
                                        theme === themes.ARCADE && location.pathname === item.path && "bg-[#df00ff] text-black rounded-none",
                                        theme === themes.ARCADE && location.pathname !== item.path && "text-[#df00ff] hover:text-[#df00ff] hover:bg-[#df00ff]/10 rounded-none"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}