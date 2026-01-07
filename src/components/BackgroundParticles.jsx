import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from "maath/random";
import { useTheme, themes } from '../context/ThemeContext';
import * as THREE from 'three';
import { cn } from '../utils/cn';

// --- BASIC: Interactive Milky Way ---
function Stars(props) {
    const ref = useRef()      // For Auto-Rotation
    const sphere = random.inSphere(new Float32Array(5000), { radius: 20 })

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta / 50;
        }
    })

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.6}
                />
            </Points>
        </group>
    )
}

// --- Retro Grid ---
function RetroGrid() {
    const gridRef = useRef();

    useFrame((state) => {
        if (!gridRef.current) return;
        // Move the grid towards the camera (z-axis) to create forward momentum
        // Modulo ensures it loops infinitely
        const t = state.clock.getElapsedTime();
        gridRef.current.position.z = (t * 2) % 2;
        gridRef.current.position.y = -2; // Floor level
    });

    return (
        <group rotation={[0, 0, 0]} ref={gridRef}>
            {/* A large grid helper */}
            <gridHelper args={[60, 60, 0xff00ff, 0x4200ff]} position={[0, 0, 0]} />
            {/* Add a secondary grid for detail */}
            <gridHelper args={[60, 120, 0x200040, 0x100020]} position={[0, -0.05, 0]} />
        </group>
    );
}

// --- 3. ANIME: Falling Sakura (Pink Petals) ---
function Sakura() {
    const count = 200; // Increased count
    const mesh = useRef();

    // Generate random positions (x, y, z) and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 10;
            const z = (Math.random() - 0.5) * 10;
            const speed = 0.015 + Math.random() * 0.01; // Slower, driftier
            const sway = Math.random() * 0.02;
            temp.push({ x, y, z, speed, sway, initialX: x });
        }
        return temp;
    }, []);

    // Createdl a dummy object for matrix updates to avoid re-rendering
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            // Fall down
            p.y -= p.speed;

            // Sway left/right
            p.x = p.initialX + Math.sin(state.clock.elapsedTime * 2 + i) * 0.8;

            // Loop back to top
            if (p.y < -5) {
                p.y = 5;
            }

            // Update instance
            dummy.position.set(p.x, p.y, p.z);
            dummy.rotation.x += p.speed;
            dummy.rotation.z += p.sway;
            dummy.scale.set(0.1, 0.1, 0.1); // Small petal size
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            {/* Shapes: A small flat circle often looks like a petal from distance */}
            <circleGeometry args={[0.5, 5]} />
            <meshBasicMaterial color="#ffb7c5" transparent opacity={0.8} side={THREE.DoubleSide} />
        </instancedMesh>
    );
}

// --- 1. BASIC: Space Dust (Drifting Particles) ---
function SpaceDust() {
    const count = 300;
    const mesh = useRef();

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 15;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 10; // Depth
            const speed = 0.005 + Math.random() * 0.01; // Very slow drift
            const factor = 0.2 + Math.random() * 0.8; // Random scale
            temp.push({ x, y, z, speed, factor, initialY: y });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            // Gentle float upwards (heat/gravity)
            p.y += p.speed;

            // Loop back to bottom
            if (p.y > 10) p.y = -10;

            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.setScalar(p.factor * 0.08); // Tiny specs
            dummy.rotation.x += p.speed;
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshBasicMaterial color="#a0c4ff" transparent opacity={0.6} />
        </instancedMesh>
    );
}


export function BackgroundParticles() {
    const { theme } = useTheme();

    return (
        <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none transition-colors duration-700">

            {/* Dynamic Background Colors/Gradients outside Canvas for performance */}
            <div className={cn(
                "absolute inset-0 -z-10 transition-all duration-700",
                theme === themes.BASIC && "bg-neutral-950",
                theme === themes.ARCADE && "bg-[#0f0518] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0f0518] to-[#0f0518]",
                theme === themes.ANIME && "bg-sky-50"
            )} />

            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                {theme === themes.BASIC && (
                    <>
                        <Stars />
                        <SpaceDust />
                    </>
                )}

                {theme === themes.ARCADE && (
                    <>
                        {/* Fog to hide the grid edge */}
                        <fog attach="fog" args={['#1a0b2e', 5, 20]} />
                        <RetroGrid />
                    </>
                )}

                {theme === themes.ANIME && (
                    <>
                        <Sakura />
                    </>
                )}
            </Canvas>
        </div>
    )
}
