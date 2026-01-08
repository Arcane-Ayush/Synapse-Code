import { Hero3D } from "../components/Hero3D";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code, Users, Rocket } from "lucide-react";
import { useTheme, themes } from "../context/ThemeContext";

export function Home() {
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div className="relative overflow-hidden w-full">
            {/* Hero Section */}
            {/* Centering Fix: Removed pt-16, applied min-h-[calc(100vh-4rem)] to account for navbar */}
            <section className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 overflow-hidden">

                {/* Background Glows for visual interest without clutter */}
                <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none -z-10" />
                <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-red-500/10 rounded-full blur-[128px] pointer-events-none -z-10" />

                <div className="container max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">

                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center md:text-left space-y-8"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                            <span className="text-sm font-medium text-muted-foreground">Ignite the Flare: Peer-to-Peer Learning</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
                            Build the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 animate-gradient-x">
                                Future
                            </span>
                            <br />
                            Together.
                        </motion.h1>

                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto md:mx-0 font-light leading-relaxed">
                            Google Club CU is a peer to peer student community for aspiring developers, designers, and innovators.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                            <Link to="/projects">
                                <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold">
                                    View Projects <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/activities">
                                <Button
                                    size="lg"
                                    variant={theme === themes.ANIME ? undefined : "outline"}
                                    className={theme === themes.ANIME
                                        ? "h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-200 transition-all font-bold"
                                        : "h-14 px-8 text-lg rounded-full border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
                                    }
                                >
                                    Join Activities
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* 3D Hero Element */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-[500px] w-full flex items-center justify-center relative"
                    >
                        {/* We put the 3D element here. The Hero3D component might need tweaks to fit well. */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-500/5 rounded-full blur-3xl -z-10" />
                        <Hero3D />
                    </motion.div>

                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
                </motion.div>
            </section>

            {/* Stats / Features Section using Glassmorphism */}
            <section className={`py-24 relative ${theme === themes.ANIME ? "bg-white/30" : "bg-black/20"}`}>
                <div className="container max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            theme={theme}
                            icon={<Code className="w-8 h-8 text-blue-500" />}
                            title="Learn"
                            desc="Master the latest technologies through hands-on workshops and study jams."
                        />
                        <FeatureCard
                            theme={theme}
                            icon={<Rocket className="w-8 h-8 text-red-500" />}
                            title="Build"
                            desc="Turn your ideas into reality by working on real-world projects with peers."
                        />
                        <FeatureCard
                            theme={theme}
                            icon={<Users className="w-8 h-8 text-yellow-500" />}
                            title="Connect"
                            desc="Join a network of passionate students and industry experts."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, desc, theme }) {
    const isAnime = theme === themes.ANIME;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`p-8 rounded-2xl backdrop-blur-lg transition-colors border ${isAnime
                ? "bg-white/80 shadow-lg border-white/50 hover:bg-white/90 hover:shadow-xl"
                : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
        >
            <div className={`mb-4 p-3 rounded-xl inline-block ${isAnime ? "bg-slate-50/50" : "bg-white/5"
                }`}>
                {icon}
            </div>
            <h3 className={`text-2xl font-bold mb-3 ${isAnime ? "text-slate-800" : "text-white"}`}>
                {title}
            </h3>
            <p className={`leading-relaxed ${isAnime ? "text-slate-600 font-medium" : "text-muted-foreground"}`}>
                {desc}
            </p>
        </motion.div>
    )
}
