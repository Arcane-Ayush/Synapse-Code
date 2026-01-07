import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Cylinder, Cone, MeshDistortMaterial } from '@react-three/drei'
import { useTheme, themes } from '../context/ThemeContext'
import { BlackHole } from './BlackHole'

//basic sphere
function BasicHero(props) {
    // Reverted scale to 0.75 as per "fine" state
    return <BlackHole {...props} scale={[0.75, 0.75, 0.75]} />
}

// --- The CUBES ---
function ArcadeHero() {
    const group = useRef()
    useFrame((state) => {
        group.current.rotation.y += 0.01;
        group.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    })
    const cubes = useMemo(() => {
        const temp = []
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    if (x === 0 && y === 0 && z === 0) continue;
                    temp.push(<Box key={`${x}-${y}-${z}`} position={[x * 1.2, y * 1.2, z * 1.2]} args={[1, 1, 1]} scale={0.5}><meshStandardMaterial color={Math.random() > 0.5 ? "#00ff00" : "#ff00ff"} wireframe /></Box>)
                }
            }
        }
        return temp;
    }, [])
    return <group ref={group}>{cubes}<Box args={[1, 1, 1]} scale={0.8}><meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={2} /></Box></group>
}

// Will make Jude HERE FOR SURE!!
// House-----
function AnimeHero() {
    const group = useRef()
    const smokeRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Island Float
        if (group.current) {
            group.current.position.y = Math.sin(t * 1) * 0.1 - 1;
            group.current.rotation.y = Math.sin(t * 0.2) * 0.1;
        }

        // Smoke Animation
        if (smokeRef.current) {
            smokeRef.current.children.forEach((child, i) => {
                child.position.y += 0.01;
                child.scale.setScalar(1 + Math.sin(t * 2 + i) * 0.2);
                if (child.position.y > 1.5) child.position.y = 0; // Reset
            })
        }
    });

    // Materials
    const wallMat = <meshStandardMaterial color="#fcebd5" />; // Cream walls
    const roofMat = <meshStandardMaterial color="#ff6b6b" />; // Red/Pink roof
    const grassMat = <meshStandardMaterial color="#95d070" />; // Soft Green
    const woodMat = <meshStandardMaterial color="#8b5a2b" />;

    return (
        <group ref={group} scale={[0.8, 0.8, 0.8]} position={[0, -1, 0]}>
            {/* Floating Island Base */}
            <Cylinder args={[2.5, 1.5, 1, 32]} position={[0, -0.5, 0]}>
                <meshStandardMaterial color="#7c6a52" />
            </Cylinder>
            <Cylinder args={[2.5, 2.5, 0.2, 32]} position={[0, 0.1, 0]}>{grassMat}</Cylinder>

            {/* HOUSE */}
            <group position={[0, 0.2, 0]}>
                {/* Main Box then Roof , then Door*/}
                <Box args={[1.5, 1.2, 1.2]} position={[0, 0.6, 0]}>{wallMat}</Box>
                {/* Roof */}
                <Cone args={[1.3, 1, 4]} position={[0, 1.7, 0]} rotation={[0, Math.PI / 4, 0]}>{roofMat}</Cone>

                {/* Door */}
                <Box args={[0.4, 0.7, 0.1]} position={[0, 0.35, 0.61]}><meshStandardMaterial color="#5d4037" /></Box>
                <Sphere args={[0.04]} position={[0.15, 0.35, 0.66]}><meshStandardMaterial color="#ffd700" /></Sphere>

                {/* Window */}
                <Box args={[0.4, 0.4, 0.1]} position={[0, 0.8, 0.61]}><meshStandardMaterial color="#87ceeb" /></Box>

                {/* Chimney */}
                <Box args={[0.3, 0.8, 0.3]} position={[0.5, 1.5, 0.3]}>{woodMat}</Box>

                {/* Smoke Particles */}
                <group position={[0.5, 1.9, 0.3]} ref={smokeRef}>
                    <Sphere args={[0.15]} position={[0, 0, 0]}><meshStandardMaterial color="#ffffff" transparent opacity={0.6} /></Sphere>
                    <Sphere args={[0.2]} position={[0.1, 0.4, 0]}><meshStandardMaterial color="#ffffff" transparent opacity={0.5} /></Sphere>
                    <Sphere args={[0.25]} position={[-0.1, 0.8, 0]}><meshStandardMaterial color="#ffffff" transparent opacity={0.4} /></Sphere>
                </group>
            </group>

            {/* Trees */}
            <group position={[-1.5, 0.2, 0.5]}>
                <Cylinder args={[0.1, 0.15, 0.8, 8]} position={[0, 0.4, 0]}>{woodMat}</Cylinder>
                <Cone args={[0.6, 1.2, 8]} position={[0, 1.0, 0]}>{grassMat}</Cone>
            </group>

            <group position={[1.4, 0.2, -0.8]} scale={[0.8, 0.8, 0.8]}>
                <Cylinder args={[0.1, 0.15, 0.8, 8]} position={[0, 0.4, 0]}>{woodMat}</Cylinder>
                <Cone args={[0.6, 1.2, 8]} position={[0, 1.0, 0]}>{grassMat}</Cone>
            </group>

            {/* Clouds */}
            <Sphere args={[0.4]} position={[-1.8, 2, -1]}><meshStandardMaterial color="#ffffff" opacity={0.9} transparent /></Sphere>
            <Sphere args={[0.3]} position={[1.8, 2.5, 1]}><meshStandardMaterial color="#ffffff" opacity={0.9} transparent /></Sphere>
        </group>
    )
}

export function Hero3D() {
    //we are destructuring here... 
    const { theme } = useTheme();

    return (
        <div className="h-[400px] w-full md:h-[500px]">
            <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
                {/*short circuiting true && (then render)*/}
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
                        <ArcadeHero />
                    </>
                )}

                {theme === themes.ANIME && (
                    <>
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
                        <directionalLight position={[-5, 5, -5]} intensity={0.5} />
                        <AnimeHero />
                    </>
                )}

                <OrbitControls enableZoom={false} autoRotate={false} />
            </Canvas>
        </div>
    )
}
