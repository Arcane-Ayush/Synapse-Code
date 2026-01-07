import { projects } from "../data/mockData";
import { ProjectCard } from "../components/ProjectCard";
import { useTheme, themes } from "../context/ThemeContext";
import { Button } from "../components/Button";
import { ConstellationTimeline } from "../components/ConstellationTimeline";
import { ArrowRight, Code, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function Projects() {
    const { theme } = useTheme();
    const [showAll, setShowAll] = useState(false);


    // Use ALL projects for carousel
    const carouselProjects = projects;


    return (
        <div className="h-[calc(100vh-7rem)] flex flex-col">
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
                        {projects.map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ArcadeDeck({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 5;

    const totalPages = Math.ceil(projects.length / PAGE_SIZE);
    const currentProjects = projects.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage(p => p + 1);
            setActiveIndex(0);
        }
    };

    const prevPage = () => {
        if (page > 0) {
            setPage(p => p - 1);
            setActiveIndex(0);
        }
    };

    return (
        <div
            className="relative w-full max-w-6xl h-[450px] flex items-center px-4"
            style={{
                backgroundImage: "linear-gradient(#000, #000), linear-gradient(90deg, #00ff00, #ff00ff)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
                boxShadow: "0 0 15px rgba(200, 0, 255, 0.4)"
            }}
        >
            {/* Previous Button - Full Height Strip */}
            <button
                onClick={prevPage}
                disabled={page === 0}
                className={`
                    absolute left-0 top-0 bottom-0 z-20 w-12
                    flex items-center justify-center
                    bg-black/60 border-r border-[#df00ff]/30
                    text-[#df00ff] 
                    hover:bg-[#df00ff]/10 hover:border-[#df00ff] hover:text-[#df00ff]
                    transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none
                    opacity-50 hover:opacity-100 group/btn
                `}
            >
                <ChevronLeft className="w-8 h-8 group-hover/btn:scale-125 transition-transform" />
            </button>

            {/* Deck Area */}
            <div className="flex-1 h-full flex gap-2 overflow-hidden px-14 py-4">
                {currentProjects.map((project, index) => {
                    const isActive = index === activeIndex;
                    const displayTitle = project.title || "UNTITLED_PROJECT";
                    const displayStack = project.stack || [];

                    return (
                        <div
                            key={project.id}
                            className={`
                                relative h-full transition-all duration-500 ease-in-out cursor-pointer overflow-hidden
                                border-2 ${isActive ? 'border-[#df00ff] flex-[3]' : 'border-neutral-700 flex-1 hover:flex-[1.5] hover:border-[#ff00ff]'}
                                bg-black/80 backdrop-blur-sm group
                            `}
                            onClick={() => setActiveIndex(index)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {/* Vertical "Spine" (Inactive) */}
                            <div className={`
                                absolute inset-0 flex items-center justify-center 
                                transition-opacity duration-300 delay-100
                                ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
                            `}>
                                <div className="writing-vertical-rl text-lg font-mono tracking-widest text-neutral-500 uppercase group-hover:text-[#ff00ff] transition-colors">
                                    {displayTitle.slice(0, 15)}
                                </div>
                            </div>

                            {/* Active Content */}
                            <div className={`
                                absolute inset-0 w-full h-full flex flex-col p-4
                                transition-all duration-500
                                ${isActive ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-4 pointer-events-none'}
                            `}>
                                <div className="font-mono text-xs text-[#df00ff] mb-2 border-b border-[#df00ff]/30 pb-1">
                                    SYS.ID_0{(page * PAGE_SIZE) + index + 1}
                                </div>

                                <div className="relative w-full h-48 bg-neutral-900 mb-4 overflow-hidden border border-neutral-800 group-hover:border-[#df00ff]/50 transition-colors">
                                    <img
                                        src={project.image}
                                        alt={displayTitle}
                                        className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />
                                </div>

                                <h3 className="text-2xl font-bold text-white font-mono mb-2 truncate">
                                    {displayTitle}
                                </h3>
                                <p className="text-xs text-neutral-400 font-mono mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="mt-auto flex gap-2 flex-wrap">
                                    {displayStack.slice(0, 3).map(tech => (
                                        <span key={tech} className="px-2 py-1 text-[10px] uppercase font-mono border border-[#ff00ff] text-[#ff00ff]">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Decor Corners */}
                            <div className={`absolute top-0 right-0 p-1 transition-colors ${isActive ? 'bg-[#df00ff]' : 'bg-neutral-800 group-hover:bg-[#ff00ff]'}`} />
                            <div className={`absolute bottom-0 left-0 p-1 transition-colors ${isActive ? 'bg-[#df00ff]' : 'bg-neutral-800 group-hover:bg-[#ff00ff]'}`} />
                        </div>
                    );
                })}
            </div>

            {/* Next Button - Full Height Strip */}
            <button
                onClick={nextPage}
                disabled={page === totalPages - 1}
                className={`
                    absolute right-0 top-0 bottom-0 z-20 w-12
                    flex items-center justify-center
                    bg-black/60 border-l border-[#df00ff]/30
                    text-[#df00ff] 
                    hover:bg-[#df00ff]/10 hover:border-[#df00ff] hover:text-[#df00ff]
                    transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none
                    opacity-50 hover:opacity-100 group/btn
                `}
            >
                <ChevronRight className="w-8 h-8 group-hover/btn:scale-125 transition-transform" />
            </button>
            {/* Footer Strip Extension */}
            <div
                className="absolute -bottom-8 left-0 right-0 h-8 flex items-center justify-between px-4 backdrop-blur-sm"
                style={{
                    backgroundImage: "linear-gradient(#00000099, #00000099), linear-gradient(90deg, #00ff00, #ff00ff)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                    border: "2px solid transparent",
                    borderTop: "0",
                    boxShadow: "0 5px 15px rgba(200, 0, 255, 0.2)"
                }}
            >
                <div className="font-mono text-xs text-[#df00ff]">
                    PAGE {page + 1} / {totalPages}
                </div>
                <a
                    href="https://github.com/Arcane-Ayush"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-[#df00ff]/70 hover:text-[#ff00ff] cursor-pointer transition-colors"
                >
                    ~Made with Love(WORKING)
                </a>
            </div>

            <style>{`
                .writing-vertical-rl {
                    writing-mode: vertical-rl;
                    text-orientation: mixed;
                }
            `}</style>
        </div>
    );
}

function CylinderCarousel({ projects }) {
    const count = projects.length;
    const cardWidth = 300;
    const cardHeight = 400;
    const gap = 40;
    const thickness = 16;

    // Dynamic Radius & Z-Adjustment
    let radius = Math.round((cardWidth + gap) / (2 * Math.tan(Math.PI / count)));
    radius = Math.max(radius, 320);

    // Calculate how much we need to push the cylinder BACK so the front card stays 
    // at a consistent "sweet spot" distance from the camera.
    // Assuming optimal viewing distance for a card is when it's at Z ~ +350-400 relative to center of view (perspective 1500)
    // If center is 0, front card is at +radius.
    // We want (+radius) + (cylinderOffset) = 400
    // => cylinderOffset = 400 - radius
    const cylinderOffsetZ = 400 - radius;

    const angleStep = 360 / count;
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Animation Refs
    const rotationRef = useRef(0);
    const speedRef = useRef(0.2);
    const isSnappingRef = useRef(false);
    const targetRotationRef = useRef(0);

    useEffect(() => {
        let animationFrameId;
        const animate = () => {
            if (isSnappingRef.current) {
                const diff = targetRotationRef.current - rotationRef.current;
                if (Math.abs(diff) < 0.5) {
                    rotationRef.current = targetRotationRef.current;
                    isSnappingRef.current = false;
                    speedRef.current = 0;
                } else {
                    rotationRef.current += diff * 0.1;
                }
            } else {
                const targetSpeed = isHovered ? 0 : 0.2;
                speedRef.current += (targetSpeed - speedRef.current) * 0.05;
                rotationRef.current += speedRef.current;
            }
            if (containerRef.current) {
                containerRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isHovered]);

    const handleDoubleClick = (index) => {
        const cardAngle = index * angleStep;
        let loops = Math.round(rotationRef.current / 360);
        let target = (loops * 360) - cardAngle;
        if (target - rotationRef.current > 180) target -= 360;
        if (target - rotationRef.current < -180) target += 360;
        targetRotationRef.current = target;
        isSnappingRef.current = true;
    };

    const handleNavigation = (direction) => {
        const step = direction === 1 ? angleStep : -angleStep;
        const currentSlotRound = Math.round(rotationRef.current / angleStep) * angleStep;
        targetRotationRef.current = currentSlotRound + step;
        isSnappingRef.current = true;
    };

    const layers = [];
    const layersCount = 3; // Reduced from 8 to eliminate flickering
    const step = thickness / (layersCount + 1);
    for (let i = 1; i <= layersCount; i++) {
        layers.push((thickness / 2) - (i * step));
    }

    return (
        <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
                perspective: "1500px",
                // Apply the compensation here. The wrapper moves back, the cylinder spins inside.
                // But wait, if we move THIS div, we move the perspective origin.
                // We should move the INNER div (containerRef parent?) 
            }}
        >
            {/* Left Button */}
            <button
                onClick={() => handleNavigation(-1)}
                className="absolute left-[-50px] md:left-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 transition-all text-gray-800 shadow-lg hover:scale-110"
                aria-label="Previous Project"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>

            {/* 
               Wrapper to apply Z-Depth compensation. 
               This wrapper stays still (rotation-wise) but moves in Z.
            */}
            <div
                className="relative preserve-3d transition-transform duration-1000 ease-out"
                style={{
                    transform: `translateZ(${cylinderOffsetZ}px)`,
                    transformStyle: "preserve-3d"
                }}
            >
                <div
                    ref={containerRef}
                    className="relative w-[300px] h-full preserve-3d flex items-center justify-center"
                    style={{
                        transformStyle: "preserve-3d",
                        cursor: isHovered ? 'grab' : 'default'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {projects.map((project, index) => {
                        const angle = index * angleStep;
                        return (
                            <div
                                key={project.id}
                                className="absolute"
                                style={{
                                    width: `${cardWidth}px`,
                                    height: `${cardHeight}px`,
                                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                                    transformStyle: 'preserve-3d'
                                }}
                                onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    handleDoubleClick(index);
                                }}
                            >
                                {layers.map((zOffset, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-x-0 inset-y-0 rounded-2xl border-2"
                                        style={{
                                            transform: `translateZ(${zOffset}px)`,
                                            backfaceVisibility: 'hidden',
                                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                            borderColor: '#000',
                                            backdropFilter: 'blur(8px)'
                                        }}
                                    />
                                ))}

                                <div
                                    className="absolute inset-0 backface-hidden rounded-2xl border-2 border-black overflow-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: `translateZ(${thickness / 2 + 1}px)`,
                                    }}
                                >
                                    <ProjectCard project={project} index={index} is3D={true} />
                                </div>

                                <div
                                    className="absolute inset-0 backface-hidden flex flex-col items-center justify-center text-center rounded-2xl border-2 border-black overflow-hidden"
                                    style={{
                                        backfaceVisibility: 'hidden',
                                        transform: `rotateY(180deg) translateZ(${thickness / 2 + 1}px)`,
                                        background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
                                        backdropFilter: 'blur(20px)'
                                    }}
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/30 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
                                    <div className="relative z-10 p-4 bg-white/40 rounded-full mb-3 shadow-sm border border-white/30 backdrop-blur-md">
                                        <Code className="w-8 h-8 text-gray-800" />
                                    </div>
                                    <h3 className="relative z-10 text-lg font-bold text-gray-800">Google Club</h3>
                                    <p className="relative z-10 text-xs text-gray-600 font-medium tracking-wide">Student Project</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Right Button */}
            <button
                onClick={() => handleNavigation(1)}
                className="absolute right-[-50px] md:right-4 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/30 transition-all text-gray-800 shadow-lg hover:scale-110"
                aria-label="Next Project"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            <style>{`
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
            `}</style>
        </div>
    )
}
