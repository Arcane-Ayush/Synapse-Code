import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";
import { ProjectCard } from "../../components/ProjectCard";

export function CylinderCarousel({ projects }) {
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
                                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                                            borderColor: 'rgba(0,0,0,0.1)',
                                            // backdropFilter: 'blur(8px)'
                                            // backdrop-filter removed for performance
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
