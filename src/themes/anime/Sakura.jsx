import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- 3. ANIME: Falling Sakura (Pink Petals) ---
export function Sakura() {
  const count = 120; // Optimized count for better performance
  const mesh = useRef();

  const rand = (n) => {
    const x = Math.sin(n) * 43758.5453;
    return x - Math.floor(x);
  };
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (rand(i * 5 + 1) - 0.5) * 10;
      const y = (rand(i * 5 + 2) - 0.5) * 10;
      const z = (rand(i * 5 + 3) - 0.5) * 10;
      const speed = 0.015 + rand(i * 5 + 4) * 0.01;
      const sway = rand(i * 5 + 5) * 0.02;
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
      <meshBasicMaterial
        color="#ffb7c5"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}

export function AnimeBackground() {
  return <Sakura />;
}
export default AnimeBackground;
