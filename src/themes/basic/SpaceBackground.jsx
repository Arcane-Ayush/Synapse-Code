import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three';

// --- BASIC: Interactive Milky Way ---
export function Stars(props) {
    const ref = useRef()      // For Auto-Rotation
    const sphere = useMemo(() => {
        const N = 5000;
        const arr = new Float32Array(N * 3);
        const ga = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < N; i++) {
            const z = 1 - (i / (N - 1)) * 2;
            const r = Math.sqrt(1 - z * z);
            const theta = i * ga;
            arr[i * 3] = Math.cos(theta) * r * 20;
            arr[i * 3 + 1] = z * 20;
            arr[i * 3 + 2] = Math.sin(theta) * r * 20;
        }
        return arr;
    }, [])

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

// --- 1. BASIC: Space Dust (Drifting Particles) ---
export function SpaceDust() {
    const count = 300;
    const mesh = useRef();
    const rand = (n) => {
        const x = Math.sin(n) * 43758.5453;
        return x - Math.floor(x);
    };
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (rand(i * 3 + 1) - 0.5) * 15;
            const y = (rand(i * 3 + 2) - 0.5) * 15;
            const z = (rand(i * 3 + 3) - 0.5) * 10;
            const speed = 0.005 + rand(i * 3 + 4) * 0.01;
            const factor = 0.2 + rand(i * 3 + 5) * 0.8;
            temp.push({ x, y, z, speed, factor, initialY: y });
        }
        return temp;
    }, [])

    const dummyRef = useRef(new THREE.Object3D());

    useFrame(() => {
        if (!mesh.current) return;
        particles.forEach((p, i) => {
            // Gentle float upwards (heat/gravity)
            p.y += p.speed;

            // Loop back to bottom
            if (p.y > 10) p.y = -10;

            const dummy = dummyRef.current;
            dummy.position.set(p.x, p.y, p.z);
            dummy.scale.setScalar(p.factor * 0.08);
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

export function SpaceBackground() {
    return (
        <>
            <Stars />
            <SpaceDust />
        </>
    )
}
export default SpaceBackground;
