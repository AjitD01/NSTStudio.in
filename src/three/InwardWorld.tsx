import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '../state/scrollStore';

const CHAPTER_SPACING = 28; // Z distance between each chapter
const TOTAL_CHAPTERS = 8;

/**
 * 1. Inward Camera Controller:
 * Smoothly translates camera inward along Z axis according to scroll progress.
 * Adds subtle mouse parallax for tactile depth.
 */
export const InwardCamera: React.FC = () => {
  const { camera, pointer } = useThree();
  const currentProgressRef = useRef(0);

  useFrame(() => {
    // Update scrollManager lerp
    const progress = scrollManager.update(0.08);
    currentProgressRef.current = progress;

    // Target camera Z position: flies inward into -Z
    const targetZ = -progress * CHAPTER_SPACING;
    const targetX = pointer.x * 1.8;
    const targetY = pointer.y * 1.2;

    // Lerp camera position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.09);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);

    // Look slightly ahead of the camera into the depth of the tunnel
    const lookTargetZ = camera.position.z - 20;
    camera.lookAt(targetX * 0.2, targetY * 0.2, lookTargetZ);
  });

  return null;
};

/**
 * 2. Deep Warp Starfield & Particles:
 * 3,200 luxury particles spanning the full length of the inward tunnel.
 */
const DeepTunnelParticles: React.FC = () => {
  const count = 3200;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color('#e0a96d');
    const colorRed = new THREE.Color('#c8102e');
    const colorWhite = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      // Cylinder distribution along Z tunnel
      const radius = 4 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      const z = 20 - Math.random() * (TOTAL_CHAPTERS * CHAPTER_SPACING + 40);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      // Color mix: 60% white/silver, 25% gold, 15% Cartier red
      const rand = Math.random();
      const chosenColor = rand < 0.6 ? colorWhite : rand < 0.85 ? colorGold : colorRed;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.16}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/**
 * 3. Continuous Sacred Spline Thread:
 * Red silk ribbon winding through the entire 3D tunnel connecting all 8 chapters.
 */
const SacredSplineTube: React.FC = () => {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= TOTAL_CHAPTERS; i++) {
      const z = -i * CHAPTER_SPACING;
      const x = Math.sin(i * 1.4) * 4.5;
      const y = Math.cos(i * 1.1) * 3.5;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, false, 'centripetal');
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 240, 0.08, 12, false), [curve]);
  const haloGeo = useMemo(() => new THREE.TubeGeometry(curve, 240, 0.22, 8, false), [curve]);

  return (
    <group>
      {/* Inner solid silk ribbon */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#c8102e"
          emissive="#ff1e46"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      {/* Glowing outer aura */}
      <mesh geometry={haloGeo}>
        <meshBasicMaterial
          color="#ff3366"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>
    </group>
  );
};

/**
 * 4. Chapter 0: The Prologue Gateway
 */
const Chapter0Gateway: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const reelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.25;
    if (ring2.current) ring2.current.rotation.z = -t * 0.18;
    if (reelRef.current) {
      reelRef.current.rotation.z = t * 0.4;
      reelRef.current.position.y = Math.sin(t * 1.2) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -6]}>
      {/* Concentric Cartier Luxury Rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[3.6, 0.04, 16, 100]} />
        <meshStandardMaterial color="#d4af37" emissive="#553a10" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[4.4, 0.03, 16, 100]} />
        <meshStandardMaterial color="#c8102e" emissive="#3d050d" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Orbiting Golden Film Reel */}
      <group ref={reelRef} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.05, 16, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
        </mesh>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshStandardMaterial color="#c8102e" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * 5. Chapter 1: The Four Universes Portal Array
 */
const Chapter1Universes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    }
  });

  const positions: [number, number, number][] = [
    [-4.5, 2.5, 0],   // 01 Branding
    [4.5, 2.5, 0],    // 02 Film
    [-4.5, -2.5, 0],  // 03 Animation
    [4.5, -2.5, 0],   // 04 Learning
  ];

  return (
    <group position={[0, 0, -CHAPTER_SPACING]}>
      <group ref={groupRef}>
        {positions.map((pos, idx) => (
          <group key={idx} position={pos}>
            <mesh>
              <octahedronGeometry args={[1.1, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#c8102e' : '#e0a96d'}
                wireframe
                emissive={idx % 2 === 0 ? '#ff1e46' : '#996622'}
                emissiveIntensity={0.6}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

/**
 * 6. Chapter 2: The Sacred Thread Nexus
 */
const Chapter2ThreadNexus: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 2]}>
      <mesh ref={ringRef}>
        <torusKnotGeometry args={[2.5, 0.08, 128, 32, 2, 3]} />
        <meshStandardMaterial
          color="#c8102e"
          emissive="#ff1e46"
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
};

/**
 * 7. Chapter 3: The Atelier Savoir-Faire Crystals
 */
const Chapter3Atelier: React.FC = () => {
  const crystalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      crystalRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 3]}>
      <mesh ref={crystalRef}>
        <dodecahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial
          color="#ff3366"
          emissive="#c8102e"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
      <mesh>
        <torusGeometry args={[3.8, 0.03, 16, 80]} />
        <meshStandardMaterial color="#e0a96d" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * 8. Chapter 4: Selected Works Floating Pedestals
 */
const Chapter4Gallery: React.FC = () => {
  const frames = useMemo(
    () => [
      { pos: [-4.2, 1.8, 0] as [number, number, number], rot: 0.15 },
      { pos: [0, -2.2, 1] as [number, number, number], rot: -0.1 },
      { pos: [4.2, 1.8, 0] as [number, number, number], rot: -0.2 },
    ],
    []
  );

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 4]}>
      {frames.map((f, i) => (
        <group key={i} position={f.pos} rotation={[0, f.rot, 0]}>
          <mesh>
            <boxGeometry args={[2.8, 1.8, 0.1]} />
            <meshStandardMaterial
              color="#0f0f13"
              metalness={0.7}
              roughness={0.3}
              wireframe
            />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.6, 1.6]} />
            <meshBasicMaterial color="#c8102e" transparent opacity={0.12} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/**
 * 9. Chapter 5: Living Archive Constellation
 */
const Chapter5Archive: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 5]}>
      <group ref={ringRef}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={deg} position={[Math.cos(rad) * 4.8, Math.sin(rad) * 4.8, 0]}>
              <octahedronGeometry args={[0.4, 0]} />
              <meshStandardMaterial color="#c8102e" emissive="#ff1e46" emissiveIntensity={0.6} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <torusGeometry args={[4.8, 0.02, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

/**
 * 10. Chapter 6: The Commission Geodesic Cocoon
 */
const Chapter6Commission: React.FC = () => {
  const domeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (domeRef.current) {
      domeRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      domeRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 6]}>
      <mesh ref={domeRef}>
        <sphereGeometry args={[5.2, 18, 18]} />
        <meshStandardMaterial
          color="#c8102e"
          emissive="#550512"
          wireframe
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

/**
 * 11. Chapter 7: The Maison Grand Portal
 */
const Chapter7Maison: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 7]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[5, 0.08, 16, 120]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#e0a96d"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[0.01, 4.8, 64]} />
        <meshBasicMaterial color="#c8102e" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/**
 * Main 3D Inward World Scene
 */
export const InwardWorld: React.FC = () => {
  return (
    <>
      <InwardCamera />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={2.5} color="#e0a96d" distance={30} />
      <pointLight position={[0, 0, -100]} intensity={3.5} color="#c8102e" distance={90} />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#050507', 8, 85]} />

      {/* Spatial 3D Elements */}
      <DeepTunnelParticles />
      <SacredSplineTube />
      <Chapter0Gateway />
      <Chapter1Universes />
      <Chapter2ThreadNexus />
      <Chapter3Atelier />
      <Chapter4Gallery />
      <Chapter5Archive />
      <Chapter6Commission />
      <Chapter7Maison />
    </>
  );
};
