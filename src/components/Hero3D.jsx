import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, lazy } from 'react'
import { useTheme } from '../context/ThemeContext'
import { THEMES as themes } from '../themes/config'
const BlackHole = lazy(() => import('../themes/basic/BlackHole'))
const ArcadeCabinet = lazy(() => import('../themes/arcade/ArcadeCabinet'))
const AnimeHut = lazy(() => import('../themes/anime/AnimeHut'))

function BasicHero(props) {
    return <BlackHole {...props} scale={[0.75, 0.75, 0.75]} />
}

export function Hero3D() {
    const { theme } = useTheme();
    const containerRef = useRef(null)
    const [inView, setInView] = useState(false)
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry.isIntersecting) {
                    setInView(true)
                    observer.disconnect()
                }
            },
            { root: null, threshold: 0.25 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={containerRef} className="h-[400px] w-full md:h-[500px]" aria-hidden="true">
            {isMobile ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-64 h-40 rounded-3xl border border-white/10 bg-gradient-to-tr from-white/10 to-transparent backdrop-blur-sm flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">
                            3D preview disabled on mobile
                        </span>
                    </div>
                </div>
            ) : inView && (
                <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
                    <Suspense
                        fallback={
                            theme === themes.ARCADE
                                ? <mesh><boxGeometry args={[1, 1, 1]} /><meshBasicMaterial color="#df00ff" /></mesh>
                                : theme === themes.ANIME
                                    ? <mesh><sphereGeometry args={[0.5, 16, 16]} /><meshBasicMaterial color="#ff6b6b" /></mesh>
                                    : <mesh><torusGeometry args={[0.8, 0.2, 16, 100]} /><meshBasicMaterial color="#b0e0ff" /></mesh>
                        }
                    >
                        {theme === themes.BASIC && (
                            <>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                                <pointLight position={[-10, -10, -10]} intensity={1} />
                                <BasicHero />
                            </>
                        )}
                        {theme === themes.ARCADE && (
                            <>
                                <color attach="background" args={['#1a0b2e']} />
                                <ambientLight intensity={0.2} />
                                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ff00" />
                                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff00ff" />
                                <ArcadeCabinet />
                            </>
                        )}
                        {theme === themes.ANIME && (
                            <>
                                <ambientLight intensity={0.8} />
                                <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
                                <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                                <AnimeHut />
                            </>
                        )}
                    </Suspense>
                    <OrbitControls enableZoom={false} autoRotate={false} />
                </Canvas>
            )}
            {!inView && (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full animate-pulse" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.1) 60%)' }} />
                </div>
            )}
        </div>
    )
}
