// import { projects } from "../data/mockData"; // 🗑️ Deleted
import { useData } from "../hooks/useData"; // 🆕 Hook
import { ProjectCard } from "../components/ProjectCard";
import { useTheme } from "../context/ThemeContext";
import { THEMES as themes } from "../themes/config";
import { Button } from "../components/Button";
import ConstellationTimeline from "../themes/basic/ConstellationTimeline";
import ArcadeDeck from "../themes/arcade/ArcadeDeck";
import CylinderCarousel from "../themes/anime/CylinderCarousel";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import SEO from "../components/SEO";
import { useEffect } from "react";

export function Projects() {
    const { theme } = useTheme();
    const { projects, loading } = useData(); // 🎣 Hook
    const [showAll, setShowAll] = useState(false);
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
    useEffect(() => {
        if (theme === themes.ANIME && isMobile && !showAll) {
            setShowAll(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, isMobile]);


    // Use ALL projects for carousel
    const carouselProjects = projects;


    return (
        <div className="h-[calc(100vh-7rem)] flex flex-col">
            <SEO
                title="Student Projects — Google Club CU"
                description="Explore student-built projects across web, AI, mobile, and more."
                image={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/og-projects.png` : undefined}
                url={import.meta.env.VITE_SITE_URL ? `${import.meta.env.VITE_SITE_URL}/projects` : undefined}
            />
            <div className="text-center pt-12 pb-4">
                <h2 className="text-4xl font-bold mb-2">Student Projects</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
                    Discover the innovative solutions built by our talented club members.
                </p>
            </div>

            {theme === themes.ANIME && !showAll ? (
                <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-hidden relative group/container">
                    <div className="h-[360px] w-full max-w-7xl flex items-center justify-center relative perspective-1000">
                        {/* Render ALL projects in the cylinder */}
                        <CylinderCarousel projects={carouselProjects} />
                    </div>

                    {/* Subtle View More Button */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover/container:opacity-100 transition-opacity duration-500">
                        <Button
                            onClick={() => setShowAll(true)}
                            variant="ghost"
                            className="text-slate-400 hover:text-pink-500 hover:bg-transparent font-mono text-xs tracking-widest transition-colors flex items-center gap-2"
                        >
                            VIEW FULL INDEX <ArrowRight className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            ) : theme === themes.ARCADE ? (
                <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-hidden">
                    {/* Pass ALL projects to ArcadeDeck for internal navigation */}
                    <ArcadeDeck projects={projects} />
                </div>
            ) : theme === themes.BASIC ? (
                <div className="flex-1 w-full flex items-center justify-center px-4">
                    <ConstellationTimeline projects={projects} />
                </div>
            ) : (
                <div className="container mx-auto px-4 pb-8 space-y-4 max-w-5xl overflow-y-auto">
                    {/* Standard Theme: Vertical List (YouTube Style) */}
                    {theme === themes.ANIME && showAll && (
                        <Button
                            onClick={() => setShowAll(false)}
                            className={`mb-4 ${theme === themes.ANIME
                                ? "bg-slate-800 text-white hover:bg-pink-500 hover:shadow-lg hover:-translate-y-1 transition-all font-bold"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}
                        >
                            ← Back to Carousel
                        </Button>
                    )}

                    <div className="flex flex-col gap-2">
                        {loading && (
                            <div className="grid md:grid-cols-2 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-40 rounded-xl border border-white/10 bg-white/5 animate-pulse" />
                                ))}
                            </div>
                        )}
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default Projects;
