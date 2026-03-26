import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function BlackHoleRing({ count, radius, color, speed, size, opacity, spread }) {
  const ref = useRef();
  const rand = (n) => {
    const x = Math.sin(n) * 43758.5453;
    return x - Math.floor(x);
  };
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const radiusSpread = spread || radius * 0.3;
    for (let i = 0; i < count; i++) {
      const angle = i * 0.61803398875 * Math.PI * 2;
      const r = radius + (rand(i * 2 + 1) - 0.5) * radiusSpread;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = (rand(i * 2 + 2) - 0.5) * 0.2;
      arr[i * 3 + 2] = Math.sin(angle) * r;
    }
    return arr;
  }, [count, radius, spread]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={opacity}
      />
    </Points>
  );
}

export function BlackHole(props) {
  return (
    <group {...props}>
      <group rotation={[0.4, 0, 0]}>
        {" "}
        {/* Tilt the whole system slightly for view */}
        {/* The Void (Event Horizon) - Pure black sphere to block background */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} /> {/* Smooth sphere */}
          <meshBasicMaterial color="#000000" />
        </mesh>
        {/* Visual Enhancement: Photon Rings (Layered Glow) */}
        {/* Visual Enhancement: Photon Rings (Layered Glow) */}
        {/* CONTINUOUS OUTLINE: High density, zero spread particles to form a solid line */}
        {/* Double layer for "Thicker" but sharp look */}
        <BlackHoleRing
          count={3000}
          radius={1.015}
          color="#ffffff"
          speed={2}
          size={0.015}
          opacity={1}
          spread={0}
        />
        <BlackHoleRing
          count={4000}
          radius={1.02}
          color="#ffffff"
          speed={2}
          size={0.015}
          opacity={1}
          spread={0}
        />
        {/* Restored Belts with Higher Opacity + Filler Belts */}
        <BlackHoleRing
          count={1500}
          radius={1.2}
          color="#ffffff"
          speed={1.5}
          size={0.015}
          opacity={0.9}
        />
        <BlackHoleRing
          count={1000}
          radius={1.25}
          color="#e0ffff"
          speed={1.45}
          size={0.015}
          opacity={0.85}
        />{" "}
        {/* Filler */}
        <BlackHoleRing
          count={1200}
          radius={1.3}
          color="#e0ffff"
          speed={1.4}
          size={0.016}
          opacity={0.85}
        />
        <BlackHoleRing
          count={1200}
          radius={1.4}
          color="#ffd700"
          speed={1.2}
          size={0.018}
          opacity={0.7}
        />
        <BlackHoleRing
          count={1000}
          radius={1.45}
          color="#ffcc00"
          speed={1.15}
          size={0.018}
          opacity={0.7}
        />{" "}
        {/* Filler */}
        <BlackHoleRing
          count={1100}
          radius={1.6}
          color="#ffa500"
          speed={1.1}
          size={0.019}
          opacity={0.65}
        />
        <BlackHoleRing
          count={1000}
          radius={1.75}
          color="#ff8c00"
          speed={1.05}
          size={0.019}
          opacity={0.6}
        />{" "}
        {/* Filler */}
        <BlackHoleRing
          count={1000}
          radius={1.8}
          color="#ff4500"
          speed={1.0}
          size={0.02}
          opacity={0.6}
        />
        <BlackHoleRing
          count={1500}
          radius={2.8}
          color="#9400d3"
          speed={0.6}
          size={0.022}
          opacity={0.5}
        />
        {/* Phase 1: Inner Ring (High Energy - Blue/White) */}
        <BlackHoleRing
          count={2000}
          radius={2}
          color="#b0e0ff"
          speed={0.8}
          size={0.02}
          opacity={0.8}
        />
        {/* Phase 2: Accretion Disk (Mid - Gold/Orange) */}
        <BlackHoleRing
          count={3000}
          radius={3.5}
          color="#ffaa40"
          speed={0.4}
          size={0.025}
          opacity={0.7}
        />
        {/* Phase 3: Outer Dust (Low Energy - Red/Dark) */}
        <BlackHoleRing
          count={2000}
          radius={5.5}
          color="#8a2be2"
          speed={0.1}
          size={0.03}
          opacity={0.4}
        />
      </group>
    </group>
  );
}
export default BlackHole;
