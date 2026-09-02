import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Environment3D — Global atmosphere for the 3D tunnel.
 * Starfield particles, floating wireframe geometry, and ambient lighting.
 */

// Starfield particle system
const Starfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 3000;

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const sz = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = Math.random() * -180;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, sz];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// Floating wireframe geometry pieces
const FloatingGeometry: React.FC = () => {
  const group1 = useRef<THREE.Mesh>(null);
  const group2 = useRef<THREE.Mesh>(null);
  const group3 = useRef<THREE.Mesh>(null);
  const group4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group1.current) {
      group1.current.rotation.x = t * 0.1;
      group1.current.rotation.y = t * 0.15;
      group1.current.position.y = Math.sin(t * 0.3) * 0.5;
    }
    if (group2.current) {
      group2.current.rotation.x = t * 0.08;
      group2.current.rotation.z = t * 0.12;
      group2.current.position.x = Math.cos(t * 0.2) * 0.3;
    }
    if (group3.current) {
      group3.current.rotation.y = t * 0.06;
      group3.current.rotation.z = t * 0.1;
    }
    if (group4.current) {
      group4.current.rotation.x = t * 0.07;
      group4.current.rotation.y = t * 0.09;
    }
  });

  return (
    <>
      {/* Floating wireframe icosahedron — near hero */}
      <mesh ref={group1} position={[8, 3, -5]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial color="#c8102e" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Torus knot — mid scene */}
      <mesh ref={group2} position={[-9, -2, -40]}>
        <torusKnotGeometry args={[0.8, 0.25, 64, 8]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
      </mesh>

      {/* Octahedron — deep */}
      <mesh ref={group3} position={[6, 4, -80]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#c8102e" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Dodecahedron — far end */}
      <mesh ref={group4} position={[-7, -3, -130]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>
    </>
  );
};

// Red accent lines floating in space
const AccentLines: React.FC = () => {
  const lines = useMemo(() => {
    const configs = [
      { start: [-12, 2, -15], end: [-8, 4, -20], color: '#c8102e' },
      { start: [10, -3, -50], end: [7, -1, -55], color: '#c8102e' },
      { start: [-6, 5, -90], end: [-3, 3, -95], color: '#c8102e' },
      { start: [8, -4, -120], end: [5, -2, -125], color: '#c8102e' },
    ];
    return configs.map((c, i) => {
      const points = [
        new THREE.Vector3(...(c.start as [number, number, number])),
        new THREE.Vector3(...(c.end as [number, number, number])),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: c.color, transparent: true, opacity: 0.4 });
      const line = new THREE.Line(geometry, material);
      return { line, key: i };
    });
  }, []);

  return (
    <>
      {lines.map(({ line, key }) => (
        <primitive key={key} object={line} />
      ))}
    </>
  );
};

export const Environment3D: React.FC = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#c0c0d0" />
      <directionalLight position={[5, 10, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[0, 0, -20]} intensity={0.6} color="#c8102e" distance={30} />
      <pointLight position={[0, 0, -80]} intensity={0.4} color="#ffffff" distance={30} />
      <pointLight position={[0, 0, -140]} intensity={0.3} color="#c8102e" distance={30} />

      {/* Atmosphere */}
      <Starfield />
      <FloatingGeometry />
      <AccentLines />
    </>
  );
};
