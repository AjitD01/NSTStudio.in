import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ThreeDWorld — Pure 3D WebGL meshes, lights, and scroll-driven camera.
 * No HTML inside 3D meshes to avoid projection/overlap bugs.
 */

// Starfield with dynamic twinkling and rotation
const LuxuryStarfield: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 2500;

  const [positions, sizes, colors] = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const sz = new Float32Array(COUNT);
    const clr = new Float32Array(COUNT * 3);

    const white = new THREE.Color('#ffffff');
    const red = new THREE.Color('#c8102e');
    const silver = new THREE.Color('#a0a0b0');

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 160;
      sz[i] = Math.random() * 2.5 + 0.8;

      const pick = Math.random();
      const c = pick > 0.85 ? red : pick > 0.5 ? silver : white;
      clr[i * 3] = c.r;
      clr[i * 3 + 1] = c.g;
      clr[i * 3 + 2] = c.b;
    }
    return [pos, sz, clr];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.012;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

// 01. Hero 3D Objects: Concentric Luxury Rings + Orbiting Film Reel Medallion
const Hero3DObjects: React.FC = () => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const midRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Group>(null);
  const reelGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
      outerRingRef.current.rotation.y = t * 0.25;
    }
    if (midRingRef.current) {
      midRingRef.current.rotation.y = -t * 0.35;
      midRingRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.15;
    }
    if (reelGroupRef.current) {
      reelGroupRef.current.rotation.z = t * 0.6;
      reelGroupRef.current.position.x = Math.cos(t * 0.5) * 3.8;
      reelGroupRef.current.position.y = Math.sin(t * 0.5) * 2.2;
    }
  });

  return (
    <group position={[0, 0, -4]}>
      {/* Outer Cartier-style Rose-Gold / Red Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[3.2, 0.04, 24, 120]} />
        <meshStandardMaterial color="#c8102e" roughness={0.2} metalness={0.9} emissive="#40000a" />
      </mesh>

      {/* Middle White/Silver Ring */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[2.5, 0.025, 20, 100]} />
        <meshStandardMaterial color="#e0e0f0" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Core floating geometric emblem */}
      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh scale={0.6}>
          <octahedronGeometry args={[0.9, 0]} />
          <meshBasicMaterial color="#c8102e" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Orbiting film reel mascot proxy */}
      <group ref={reelGroupRef}>
        <mesh>
          <torusGeometry args={[0.5, 0.08, 12, 6]} />
          <meshStandardMaterial color="#c8102e" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Spokes */}
        {[0, 60, 120].map((deg, i) => (
          <mesh key={i} rotation={[0, 0, (deg * Math.PI) / 180]}>
            <cylinderGeometry args={[0.02, 0.02, 0.9, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 02. Four Universes 3D Objects: Floating Diamond Crystalline Monoliths
const Universes3DObjects: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const cards = [
    { pos: [-4.2, 1.8, 0], rot: [0, 0.25, 0], color: '#c8102e' },
    { pos: [4.2, 1.8, -1], rot: [0, -0.25, 0], color: '#c8102e' },
    { pos: [-4, -2.2, -0.5], rot: [0, 0.2, 0], color: '#ffffff' },
    { pos: [4, -2.2, -1.5], rot: [0, -0.2, 0], color: '#ffffff' },
  ];

  return (
    <group ref={groupRef} position={[0, 0, -22]}>
      {cards.map((c, i) => (
        <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.15} floatIntensity={0.3}>
          <group position={c.pos as [number, number, number]} rotation={c.rot as [number, number, number]}>
            {/* Dark glass monolith backing */}
            <mesh>
              <boxGeometry args={[3.4, 4.4, 0.1]} />
              <meshStandardMaterial
                color="#0c0c10"
                metalness={0.8}
                roughness={0.15}
                transparent
                opacity={0.75}
              />
            </mesh>
            {/* Luminous wireframe bevel */}
            <mesh>
              <boxGeometry args={[3.44, 4.44, 0.12]} />
              <meshBasicMaterial color={c.color} wireframe transparent opacity={0.4} />
            </mesh>
            {/* Top status bar accent */}
            <mesh position={[0, 2.15, 0.08]}>
              <boxGeometry args={[3.2, 0.04, 0.02]} />
              <meshBasicMaterial color={c.color} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
};

// 03. The Sacred Red Thread: Continuous CatmullRom 3D Spline
const SacredThread3D: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const { tubeGeom, glowGeom } = useMemo(() => {
    const points = [
      new THREE.Vector3(-10, 6, -30),
      new THREE.Vector3(-4, 2, -36),
      new THREE.Vector3(3, -1, -42),
      new THREE.Vector3(7, 3, -48),
      new THREE.Vector3(0, -2, -54),
      new THREE.Vector3(-5, 4, -60),
      new THREE.Vector3(4, 0, -68),
      new THREE.Vector3(-3, -3, -76),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    const tube = new THREE.TubeGeometry(curve, 160, 0.035, 12, false);
    const glow = new THREE.TubeGeometry(curve, 160, 0.12, 8, false);
    return { tubeGeom: tube, glowGeom: glow };
  }, []);

  useFrame((state) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 2.5) * 0.08;
    }
  });

  return (
    <group>
      {/* Core Red Thread */}
      <mesh ref={meshRef} geometry={tubeGeom}>
        <meshStandardMaterial
          color="#c8102e"
          roughness={0.1}
          metalness={0.9}
          emissive="#c8102e"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Halo Glow */}
      <mesh ref={glowRef} geometry={glowGeom}>
        <meshBasicMaterial color="#ff2a55" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

// 04. Atelier 3D: Floating Precision Draft Tools & Rose Hot Volumetric Beacon
const Atelier3DObjects: React.FC = () => {
  const compassGroup = useRef<THREE.Group>(null);
  const draftingPrism = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (compassGroup.current) {
      compassGroup.current.rotation.y = t * 0.2;
      compassGroup.current.rotation.z = Math.sin(t * 0.3) * 0.15;
    }
    if (draftingPrism.current) {
      draftingPrism.current.rotation.x = t * 0.15;
      draftingPrism.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group position={[0, 0, -62]}>
      {/* Rose Hot Ambient Lighting Center */}
      <pointLight color="#e63946" intensity={2.5} distance={20} />
      <pointLight position={[3, 3, 0]} color="#ff758c" intensity={1.5} distance={15} />

      {/* Floating drafting compass */}
      <group ref={compassGroup} position={[-5, 1, 0]}>
        <mesh position={[0, 1, 0]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.03, 0.015, 3.2, 12]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.7, 1, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.03, 0.015, 3.2, 12]} />
          <meshStandardMaterial color="#c8102e" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.35, 2.5, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Floating geometric crystal */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh ref={draftingPrism} position={[5.2, -1, -2]}>
          <dodecahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial
            color="#ff6b9d"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
};

// 05. Gallery 3D: Floating Exhibition Bevel Frames & Stage Spotlights
const Gallery3DObjects: React.FC = () => {
  const frames = [
    { pos: [-5, 2, 0], scale: [3.2, 4.2, 0.2] },
    { pos: [5, 1.5, -2], scale: [3.4, 2.6, 0.2] },
    { pos: [-4, -2.5, -4], scale: [2.8, 3.8, 0.2] },
    { pos: [4.5, -2, -6], scale: [3.6, 2.6, 0.2] },
  ];

  return (
    <group position={[0, 0, -88]}>
      <spotLight position={[0, 8, 4]} angle={0.7} penumbra={0.8} intensity={2} color="#fff5ea" distance={25} />
      {frames.map((f, i) => (
        <Float key={i} speed={1.2 + i * 0.1} rotationIntensity={0.08} floatIntensity={0.25}>
          <group position={f.pos as [number, number, number]}>
            <mesh>
              <boxGeometry args={f.scale as [number, number, number]} />
              <meshStandardMaterial color="#08080a" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh>
              <boxGeometry args={[f.scale[0] + 0.08, f.scale[1] + 0.08, f.scale[2] - 0.05]} />
              <meshBasicMaterial color="#c8102e" wireframe transparent opacity={0.3} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
};

// 06. Instagram Living Archive 3D: Geometric Satellite Ring
const Instagram3DObjects: React.FC = () => {
  const satellitesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (satellitesRef.current) {
      satellitesRef.current.rotation.z = state.clock.elapsedTime * 0.12;
    }
  });

  return (
    <group position={[0, 0, -112]}>
      <group ref={satellitesRef}>
        {Array.from({ length: 6 }).map((_, i) => {
          const rad = (i / 6) * Math.PI * 2;
          const r = 6.5;
          return (
            <mesh key={i} position={[Math.cos(rad) * r, Math.sin(rad) * r, 0]}>
              <boxGeometry args={[1.4, 1.4, 0.05]} />
              <meshStandardMaterial color="#14141c" roughness={0.2} metalness={0.8} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// 07. Commission Chamber: Architectural Wireframe Vault Dome
const Commission3DObjects: React.FC = () => {
  const domeRef = useRef<THREE.Mesh>(null);
  const innerDomeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (domeRef.current) domeRef.current.rotation.y = t * 0.08;
    if (innerDomeRef.current) innerDomeRef.current.rotation.y = -t * 0.12;
  });

  return (
    <group position={[0, 0, -135]}>
      <pointLight color="#c8102e" intensity={2} distance={20} />
      <mesh ref={domeRef}>
        <icosahedronGeometry args={[9, 1]} />
        <meshBasicMaterial color="#c8102e" wireframe transparent opacity={0.08} />
      </mesh>
      <mesh ref={innerDomeRef}>
        <icosahedronGeometry args={[7, 0]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
};

// 08. Maison Footer: Celestial Concentric Watermark
const Footer3DObjects: React.FC = () => {
  const spinRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (spinRef.current) {
      spinRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group position={[0, 0, -156]}>
      <group ref={spinRef}>
        <mesh>
          <torusGeometry args={[5.5, 0.03, 16, 120]} />
          <meshBasicMaterial color="#c8102e" transparent opacity={0.2} />
        </mesh>
        <mesh>
          <torusGeometry args={[4.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
};

/**
 * CameraRig — Smoothly drives camera Z through the 3D tunnel
 * synchronized with ScrollControls.
 */
export const CameraRig: React.FC = () => {
  const scroll = useScroll();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));

  const TOTAL_DEPTH = 155;

  React.useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1
    const z = -offset * TOTAL_DEPTH;

    const parallaxX = mouseRef.current.x * 0.9;
    const parallaxY = -mouseRef.current.y * 0.6;

    targetPos.current.set(parallaxX, parallaxY, z);
    state.camera.position.lerp(targetPos.current, 0.08);

    const lookAt = new THREE.Vector3(
      state.camera.position.x + parallaxX * 0.2,
      state.camera.position.y + parallaxY * 0.2,
      state.camera.position.z - 15
    );
    state.camera.lookAt(lookAt);
  });

  return null;
};

/**
 * Main 3D World Export
 */
export const ThreeDWorld: React.FC = () => {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.4} color="#e0e4f0" />
      <directionalLight position={[10, 15, 10]} intensity={0.7} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" distance={15} />

      <LuxuryStarfield />
      <Hero3DObjects />
      <Universes3DObjects />
      <SacredThread3D />
      <Atelier3DObjects />
      <Gallery3DObjects />
      <Instagram3DObjects />
      <Commission3DObjects />
      <Footer3DObjects />
    </>
  );
};
