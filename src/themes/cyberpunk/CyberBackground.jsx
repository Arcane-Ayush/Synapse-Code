/* eslint-disable react-hooks/purity */
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Scanline,
  Noise,
  Vignette,
  Glitch,
} from "@react-three/postprocessing";
import { BlendFunction, GlitchMode } from "postprocessing";
import * as THREE from "three";

function MovingGrid() {
  const gridRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (gridRef.current) {
      // Infinite scroll effect
      gridRef.current.position.z = (t * 2) % 2;
      // Slight breathing
      gridRef.current.material.opacity = 0.15 + Math.sin(t * 0.5) * 0.05;
    }
  });

  return (
    <group>
      {/* Floor Grid */}
      <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[60, 60, 60, 60]} />
        <meshBasicMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Ceiling Grid (Mirrored) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 4, 0]}>
        <planeGeometry args={[60, 60, 30, 30]} />
        <meshBasicMaterial
          color="#f43f5e"
          wireframe
          transparent
          opacity={0.05}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function FloatingData() {
  const group = useRef();

  // Create random data cubes
  const cubes = useMemo(() => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 20 - 5,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.5 + 0.1,
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.children.forEach((child, i) => {
        const data = cubes[i];
        child.rotation.x = data.rotation[0] + t * data.speed;
        child.rotation.y = data.rotation[1] + t * data.speed * 0.5;
        child.position.y += Math.sin(t + i) * 0.002;
      });
    }
  });

  return (
    <group ref={group}>
      {cubes.map((data, i) => (
        <mesh
          key={i}
          position={data.position}
          scale={[data.scale, data.scale, data.scale]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#ffff00" : "#0ea5e9"}
            wireframe
            transparent
            opacity={0.3}
            side={THREE.DoubleSide} // Optimization: double side
          />
        </mesh>
      ))}
    </group>
  );
}

function DigitalRain() {
  const points = useRef();

  // Create rain geometry
  const geometry = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5; // z
      speeds[i] = Math.random() * 0.2 + 0.1;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("speed", new THREE.BufferAttribute(speeds, 1));
    return geo;
  }, []);

  useFrame(() => {
    if (!points.current) return;

    const positions = points.current.geometry.attributes.position.array;
    const speeds = points.current.geometry.attributes.speed.array;

    for (let i = 0; i < 2000; i++) {
      positions[i * 3 + 1] -= speeds[i]; // Move down

      if (positions[i * 3 + 1] < -10) {
        positions[i * 3 + 1] = 10; // Reset to top
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#0ea5e9"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function CyberBackground() {
  return (
    <>
      <color attach="background" args={["#050a14"]} />
      <fog attach="fog" args={["#050a14", 5, 20]} />

      <MovingGrid />
      <FloatingData />
      <DigitalRain />

      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.5}
          radius={0.6}
          mipmapBlur
        />
        <Scanline density={2.5} opacity={0.15} />
        <Noise opacity={0.1} blendFunction={BlendFunction.OVERLAY} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <Glitch
          delay={[5, 10]} // min and max delay between glitches
          duration={[0.2, 0.4]} // min and max duration of a glitch
          strength={[0.1, 0.3]} // min and max strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.15} // Threshold for strong glitches, 0 - no strong glitches, 1 - only strong glitches.
        />
      </EffectComposer>
    </>
  );
}
