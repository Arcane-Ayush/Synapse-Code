import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

export default function CyberHologram() {
  const group = useRef();
  const innerRef = useRef();
  const outerRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.position.y = Math.sin(t) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.2;
      outerRef.current.rotation.z = -t * 0.1;
    }
  });

  return (
    <group ref={group} scale={[1.2, 1.2, 1.2]}>
      {/* Core */}
      <Icosahedron args={[0.8, 1]} ref={innerRef}>
        <meshBasicMaterial
          color="#ffff00"
          wireframe
          transparent
          opacity={0.3}
        />
      </Icosahedron>

      {/* Outer Shell */}
      <Sphere args={[1.4, 16, 16]} ref={outerRef}>
        <meshBasicMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.15}
        />
      </Sphere>

      {/* Scanning Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.6, 1.62, 64]} />
        <meshBasicMaterial
          color="#f43f5e"
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Particle Cloud */}
      <points>
        <sphereGeometry args={[2, 32, 32]} />
        <pointsMaterial size={0.02} color="#0ea5e9" transparent opacity={0.4} />
      </points>
    </group>
  );
}
