import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '../state/scrollStore';

const CHAPTER_SPACING = 28; // Z distance between each chapter
const TOTAL_CHAPTERS = 8;

/**
 * 1. Inward Depth Camera Controller:
 * Translates camera inward along Z axis smoothly.
 * Keeps camera centered on the 3D sculptures without clipping or tilting out of view.
 */
export const InwardCamera: React.FC = () => {
  const { camera, pointer } = useThree();
  const prevProgressRef = useRef(0);

  useFrame(() => {
    const progress = scrollManager.update(0.08);
    const delta = progress - prevProgressRef.current;
    prevProgressRef.current = progress;

    // Target camera Z position: starts at Z=10 for Chapter 0 (sculpture at Z=0)
    const targetZ = 10 - progress * CHAPTER_SPACING;
    const targetX = pointer.x * 0.8;
    const targetY = pointer.y * 0.6;

    // Smooth lerp camera position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.09);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);

    // Subtle bank on scroll
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -delta * 0.3, 0.05);

    // Direct forward gaze into the tunnel center
    const lookTargetZ = camera.position.z - 25;
    camera.lookAt(targetX * 0.15, targetY * 0.15, lookTargetZ);
  });

  return null;
};

/**
 * 2. Deep Tunnel Cosmic Dust & Embers:
 * Floating stars and subtle crimson embers providing spacious atmospheric depth.
 */
const DeepTunnelParticles: React.FC = () => {
  const count = 2800;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color('#e0a96d');
    const colorRed = new THREE.Color('#ff2222');
    const colorWhite = new THREE.Color('#f0f0f5');

    for (let i = 0; i < count; i++) {
      const radius = 3.0 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;
      const z = 20 - Math.random() * (TOTAL_CHAPTERS * CHAPTER_SPACING + 30);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

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
 * 3. Sacred Spline Tube:
 * Continuous red silk thread traversing the inward universe.
 */
const SacredSplineTube: React.FC = () => {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= TOTAL_CHAPTERS + 1; i++) {
      const z = -i * CHAPTER_SPACING;
      const x = Math.sin(i * 1.3) * 4.2;
      const y = Math.cos(i * 1.1) * 3.2;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, false, 'centripetal');
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 240, 0.08, 10, false), [curve]);
  const haloGeo = useMemo(() => new THREE.TubeGeometry(curve, 240, 0.22, 8, false), [curve]);

  return (
    <group>
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff1e46"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
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
 * 4. Chapter 0: The Prologue Gateway — Centerpiece Sculpture
 * Positioned exactly at (0, 0, 0) so when camera is at (0, 0, 10), it is centered in full view!
 */
const Chapter0Gateway: React.FC = () => {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const reelRef = useRef<THREE.Group>(null);
  const fluteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.2;
    if (ring2.current) ring2.current.rotation.z = -t * 0.15;
    if (reelRef.current) reelRef.current.rotation.z = t * 0.4;
    if (fluteRef.current) {
      fluteRef.current.rotation.y = t * 0.4;
      fluteRef.current.position.y = Math.sin(t * 1.2) * 0.08;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Cartier Gold Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[3.4, 0.04, 16, 100]} />
        <meshStandardMaterial color="#d4af37" emissive="#4d3b14" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Middle Crimson Ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[4.4, 0.03, 16, 100]} />
        <meshStandardMaterial color="#ff2222" emissive="#550512" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Centerpiece: Orbiting Golden Film Reel (STUDIO) */}
      <group ref={reelRef} position={[0, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.05, 16, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
        </mesh>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
            <cylinderGeometry args={[0.02, 0.02, 3.0, 8]} />
            <meshStandardMaterial color="#ff2222" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Glowing Sacred Red Flute floating inside */}
      <group ref={fluteRef} position={[0, 0, 0.2]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.045, 0.045, 2.4, 24]} />
          <meshStandardMaterial
            color="#ff2222"
            emissive="#ff1e46"
            emissiveIntensity={1.8}
            roughness={0.2}
            metalness={0.4}
          />
        </mesh>
        {[-0.6, -0.2, 0.2, 0.6].map((offset, i) => (
          <mesh
            key={i}
            position={[offset * Math.cos(Math.PI / 4), offset * Math.sin(Math.PI / 4), 0]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <torusGeometry args={[0.055, 0.012, 8, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * 5. Chapter 1: The Core Pillars 3D Constellation
 */
const Chapter1Pillars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    }
  });

  const positions: [number, number, number][] = [
    [-4.5, 2.4, 0],   // 01 Branding
    [4.5, 2.4, 0],    // 02 Film
    [-4.5, -2.4, 0],  // 03 Animation
    [4.5, -2.4, 0],   // 04 Education
  ];

  return (
    <group position={[0, 0, -CHAPTER_SPACING]}>
      <group ref={groupRef}>
        {positions.map((pos, idx) => (
          <group key={idx} position={pos}>
            <mesh>
              <octahedronGeometry args={[1.2, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#ff2222' : '#e0a96d'}
                wireframe
                emissive={idx % 2 === 0 ? '#ff1e46' : '#996622'}
                emissiveIntensity={0.65}
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
 * 6. Chapter 2: The Sacred Thread Nexus (Torus Knot)
 */
const Chapter2Nexus: React.FC = () => {
  const knotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (knotRef.current) {
      knotRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      knotRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 2]}>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[2.6, 0.09, 130, 32, 2, 3]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff1e46"
          emissiveIntensity={1.3}
          roughness={0.25}
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
        <dodecahedronGeometry args={[2.3, 0]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff1e46"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
      <mesh>
        <torusGeometry args={[4.0, 0.03, 16, 80]} />
        <meshStandardMaterial color="#e0a96d" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * 8. Floating Textured 3D Collateral Frame in Chapter 4
 */
const FloatingCollateralFrame3D: React.FC<{
  imageUrl: string;
  pos: [number, number, number];
  rotY: number;
}> = ({ imageUrl, pos, rotY }) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(imageUrl, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, [imageUrl]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y =
        pos[1] + Math.sin(state.clock.getElapsedTime() * 0.8 + pos[0]) * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={pos} rotation={[0, rotY, 0]}>
      {/* Beveled Gold Outer Frame */}
      <mesh>
        <boxGeometry args={[3.2, 2.1, 0.08]} />
        <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Dark Obsidian Inner Bezel */}
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[3.06, 1.96, 0.04]} />
        <meshStandardMaterial color="#1a1a1f" roughness={0.6} />
      </mesh>
      {/* Front Textured Display Face */}
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[2.95, 1.85]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial color="#222228" wireframe />
        )}
      </mesh>
    </group>
  );
};

/**
 * 9. Chapter 4: Selected Commissions Gallery in 3D
 */
const Chapter4Gallery: React.FC = () => {
  return (
    <group position={[0, 0, -CHAPTER_SPACING * 4]}>
      <FloatingCollateralFrame3D imageUrl="/brand/p57_0.jpg" pos={[-4.5, 1.6, 0]} rotY={0.2} />
      <FloatingCollateralFrame3D imageUrl="/brand/p59_0.jpg" pos={[4.5, 1.6, 0]} rotY={-0.2} />
      <FloatingCollateralFrame3D imageUrl="/brand/p61_0.png" pos={[-4.5, -2.2, -1]} rotY={0.16} />
      <FloatingCollateralFrame3D imageUrl="/brand/p45_1.png" pos={[4.5, -2.2, -1]} rotY={-0.16} />
    </group>
  );
};

/**
 * 10. Chapter 5: Living Archive Constellation
 */
const Chapter5Archive: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = -state.clock.getElapsedTime() * 0.14;
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
              <meshStandardMaterial color="#ff2222" emissive="#ff1e46" emissiveIntensity={0.6} />
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
 * 11. Chapter 6: The Commission Geodesic Cocoon
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
          color="#ff2222"
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
 * 12. Chapter 7: The Maison Grand Portal
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
        <torusGeometry args={[5.0, 0.08, 16, 120]} />
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
        <meshBasicMaterial color="#ff2222" transparent opacity={0.06} side={THREE.DoubleSide} />
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
      <ambientLight intensity={0.45} />
      <directionalLight position={[10, 16, 12]} intensity={1.3} color="#ffffff" />
      <pointLight position={[0, 0, 8]} intensity={2.8} color="#e0a96d" distance={35} />
      <pointLight position={[0, 0, -60]} intensity={2.5} color="#ffffff" distance={65} />
      <pointLight position={[0, 0, -112]} intensity={3.0} color="#e0a96d" distance={70} />
      <pointLight position={[0, 0, -180]} intensity={3.5} color="#ff2222" distance={90} />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#060608', 8, 85]} />

      {/* Spatial 3D Elements */}
      <DeepTunnelParticles />
      <SacredSplineTube />
      <Chapter0Gateway />
      <Chapter1Pillars />
      <Chapter2Nexus />
      <Chapter3Atelier />
      <Chapter4Gallery />
      <Chapter5Archive />
      <Chapter6Commission />
      <Chapter7Maison />
    </>
  );
};
