import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager } from '../state/scrollStore';

const CHAPTER_SPACING = 28; // Z distance between each chapter
const TOTAL_CHAPTERS = 8;

/**
 * 1. Inward Depth Camera Controller:
 * Smoothly translates camera inward along Z axis according to virtual scroll progress.
 * Adds tactile mouse parallax and velocity-responsive pitch/roll.
 */
export const InwardCamera: React.FC = () => {
  const { camera, pointer } = useThree();
  const prevProgressRef = useRef(0);

  useFrame(() => {
    // 60fps lerped virtual scroll progress
    const progress = scrollManager.update(0.08);
    const delta = progress - prevProgressRef.current;
    prevProgressRef.current = progress;

    // Target camera Z position: flies inward into -Z
    const targetZ = -progress * CHAPTER_SPACING;
    const targetX = pointer.x * 2.0;
    const targetY = pointer.y * 1.4;

    // Smooth lerp camera position
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.09);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.06);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);

    // Dynamic bank/tilt based on scroll speed & pointer
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -delta * 0.4, 0.05);

    // Look directly into the inward tunnel depth
    const lookTargetZ = camera.position.z - 22;
    camera.lookAt(targetX * 0.25, targetY * 0.25, lookTargetZ);
  });

  return null;
};

/**
 * 2. Deep Warp Cosmic Dust & Crimson Embers:
 * 4,200 luxury particles spanning the full length of the inward tunnel.
 */
const DeepTunnelParticles: React.FC = () => {
  const count = 4200;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color('#e0a96d');
    const colorRed = new THREE.Color('#ff2222');
    const colorWhite = new THREE.Color('#f0f0f5');
    const colorAmber = new THREE.Color('#ffd166');

    for (let i = 0; i < count; i++) {
      // Cylinder distribution along Z tunnel
      const radius = 3.5 + Math.random() * 24;
      const angle = Math.random() * Math.PI * 2;
      const z = 25 - Math.random() * (TOTAL_CHAPTERS * CHAPTER_SPACING + 45);

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      // Color mix: 50% white/silver dust, 30% warm gold, 20% crimson embers
      const rand = Math.random();
      const chosenColor =
        rand < 0.5 ? colorWhite : rand < 0.75 ? colorGold : rand < 0.9 ? colorAmber : colorRed;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.18}
        vertexColors
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/**
 * 3. Architectural Tunnel Portals (Cartier Pavilion Arches):
 * Sleek octagonal and circular portal frames spaced through the corridor
 * giving the inward journey a sense of physical architectural rhythm.
 */
const ArchitecturalTunnelPortals: React.FC = () => {
  const portals = useMemo(() => {
    const list = [];
    const step = CHAPTER_SPACING / 2; // Portal every 14 units
    const totalPortals = TOTAL_CHAPTERS * 2 + 2;
    for (let i = 0; i < totalPortals; i++) {
      list.push({
        z: 10 - i * step,
        scale: 1 + (i % 2 === 0 ? 0.2 : 0),
        isMajor: i % 2 === 0,
      });
    }
    return list;
  }, []);

  return (
    <group>
      {portals.map((p, idx) => (
        <group key={idx} position={[0, 0, p.z]} scale={p.scale}>
          {/* Outer architectural octagonal ring */}
          <mesh>
            <ringGeometry args={[8.2, 8.35, p.isMajor ? 8 : 24]} />
            <meshStandardMaterial
              color={p.isMajor ? '#d4af37' : '#33333e'}
              emissive={p.isMajor ? '#3d2e12' : '#000000'}
              roughness={0.3}
              metalness={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Subtle glowing rim */}
          {p.isMajor && (
            <mesh>
              <ringGeometry args={[8.35, 8.42, 8]} />
              <meshBasicMaterial
                color="#ff2222"
                transparent
                opacity={0.3}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )}
        </group>
      ))}
    </group>
  );
};

/**
 * 4. The Sacred Spline Thread:
 * Continuous red silk ribbon winding through the entire inward corridor connecting all chambers.
 */
const SacredSplineTube: React.FC = () => {
  const curve = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= TOTAL_CHAPTERS + 1; i++) {
      const z = -i * CHAPTER_SPACING;
      const x = Math.sin(i * 1.35) * 4.8;
      const y = Math.cos(i * 1.1) * 3.6;
      points.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(points, false, 'centripetal');
  }, []);

  const tubeGeo = useMemo(() => new THREE.TubeGeometry(curve, 280, 0.09, 12, false), [curve]);
  const haloGeo = useMemo(() => new THREE.TubeGeometry(curve, 280, 0.26, 8, false), [curve]);

  return (
    <group>
      {/* Inner solid silk ribbon */}
      <mesh geometry={tubeGeo}>
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff1e46"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
      {/* Glowing outer aura */}
      <mesh geometry={haloGeo}>
        <meshBasicMaterial
          color="#ff3366"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          wireframe
        />
      </mesh>
    </group>
  );
};

/**
 * 5. Chapter 0: The Prologue Gateway & 3D Red Flute / Film Reel
 */
const Chapter0Gateway: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const reelRef = useRef<THREE.Group>(null);
  const fluteRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ring1.current) ring1.current.rotation.z = t * 0.22;
    if (ring2.current) ring2.current.rotation.z = -t * 0.16;
    if (reelRef.current) {
      reelRef.current.rotation.z = t * 0.45;
      reelRef.current.position.y = Math.sin(t * 1.1) * 0.15;
    }
    if (fluteRef.current) {
      fluteRef.current.rotation.y = t * 0.5;
      fluteRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -6]}>
      {/* Concentric Cartier Luxury Rings */}
      <mesh ref={ring1}>
        <torusGeometry args={[3.8, 0.045, 16, 100]} />
        <meshStandardMaterial color="#d4af37" emissive="#66491a" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[4.6, 0.035, 16, 100]} />
        <meshStandardMaterial color="#ff2222" emissive="#550512" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Orbiting Golden Film Reel (Represents STUDIO) */}
      <group ref={reelRef} position={[0, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.06, 16, 64]} />
          <meshStandardMaterial color="#ffffff" metalness={0.95} roughness={0.1} />
        </mesh>
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <mesh key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
            <cylinderGeometry args={[0.025, 0.025, 3.2, 8]} />
            <meshStandardMaterial color="#ff2222" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Dimensional 3D Sacred Red Flute (Emotional Core) */}
      <group ref={fluteRef} position={[0, -0.6, 0.5]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <cylinderGeometry args={[0.05, 0.05, 2.6, 24]} />
          <meshStandardMaterial
            color="#ff2222"
            emissive="#ff1e46"
            emissiveIntensity={2.0}
            roughness={0.15}
            metalness={0.4}
          />
        </mesh>
        {/* Gold flute rings */}
        {[-0.8, -0.4, 0, 0.4, 0.8].map((offset, i) => (
          <mesh
            key={i}
            position={[offset * Math.cos(Math.PI / 4), offset * Math.sin(Math.PI / 4), 0]}
            rotation={[0, 0, Math.PI / 4]}
          >
            <torusGeometry args={[0.06, 0.015, 8, 24]} />
            <meshStandardMaterial color="#ffd166" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

/**
 * 6. Chapter 1: The Core Pillars 3D Constellation
 */
const Chapter1Pillars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.08;
    }
  });

  const positions: [number, number, number][] = [
    [-4.8, 2.6, 0],   // 01 Branding & Identity
    [4.8, 2.6, 0],    // 02 Film & Animation
    [-4.8, -2.6, 0],  // 03 Creative Education
    [4.8, -2.6, 0],   // 04 Strategic Storytelling
  ];

  return (
    <group position={[0, 0, -CHAPTER_SPACING]}>
      <group ref={groupRef}>
        {positions.map((pos, idx) => (
          <group key={idx} position={pos}>
            <mesh>
              <octahedronGeometry args={[1.3, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? '#ff2222' : '#e0a96d'}
                wireframe
                emissive={idx % 2 === 0 ? '#ff1e46' : '#996622'}
                emissiveIntensity={0.7}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Orbiting micro ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[1.9, 0.02, 12, 36]} />
              <meshBasicMaterial color="#d4af37" transparent opacity={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

/**
 * 7. Chapter 2: The Logo Genesis & Sacred Thread Nexus
 */
const Chapter2Nexus: React.FC = () => {
  const knotRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (knotRef.current) {
      knotRef.current.rotation.x = t * 0.35;
      knotRef.current.rotation.y = t * 0.25;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 2]}>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[2.8, 0.1, 140, 32, 2, 3]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff1e46"
          emissiveIntensity={1.4}
          roughness={0.25}
          metalness={0.7}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[4.2, 0.03, 16, 80]} />
        <meshStandardMaterial color="#e0a96d" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};

/**
 * 8. Chapter 3: The Atelier Savoir-Faire Crystals
 */
const Chapter3Atelier: React.FC = () => {
  const crystalRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (crystalRef.current) {
      crystalRef.current.rotation.y = t * 0.4;
      crystalRef.current.rotation.x = Math.sin(t * 0.8) * 0.3;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.6;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 3]}>
      <mesh ref={crystalRef}>
        <dodecahedronGeometry args={[2.4, 0]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#ff1e46"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial color="#e0a96d" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh>
        <torusGeometry args={[4.2, 0.035, 16, 90]} />
        <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

/**
 * 9. Floating Textured 3D Collateral Frame
 * Renders real high-res mockups extracted from the Holy Grail guide in 3D space!
 */
const FloatingBrandCard3D: React.FC<{
  imageUrl: string;
  pos: [number, number, number];
  rotY: number;
  scale?: number;
}> = ({ imageUrl, pos, rotY, scale = 1 }) => {
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
      groupRef.current.position.y = pos[1] + Math.sin(state.clock.getElapsedTime() * 0.9 + pos[0]) * 0.18;
    }
  });

  return (
    <group ref={groupRef} position={pos} rotation={[0, rotY, 0]} scale={scale}>
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
      {/* Glowing bottom accent line */}
      <mesh position={[0, -1.0, 0.08]}>
        <boxGeometry args={[2.8, 0.025, 0.02]} />
        <meshBasicMaterial color="#ff2222" />
      </mesh>
    </group>
  );
};

/**
 * 10. Chapter 4: Selected Commissions 3D Gallery Pedestals
 * Floating 3D gallery featuring the authentic Holy Grail photography:
 * Visiting cards mockup, Executive Letterhead mockup, Screenplay envelopes, and Urban Billboard.
 */
const Chapter4Gallery: React.FC = () => {
  return (
    <group position={[0, 0, -CHAPTER_SPACING * 4]}>
      {/* 3D Floating Collateral Frames with real textures */}
      <FloatingBrandCard3D
        imageUrl="/brand/p57_0.jpg"
        pos={[-4.5, 1.6, 0.5]}
        rotY={0.22}
        scale={1.1}
      />
      <FloatingBrandCard3D
        imageUrl="/brand/p59_0.jpg"
        pos={[4.5, 1.6, 0.5]}
        rotY={-0.22}
        scale={1.1}
      />
      <FloatingBrandCard3D
        imageUrl="/brand/p61_0.png"
        pos={[-4.6, -2.4, -1]}
        rotY={0.18}
        scale={1.05}
      />
      <FloatingBrandCard3D
        imageUrl="/brand/p45_1.png"
        pos={[4.6, -2.4, -1]}
        rotY={-0.18}
        scale={1.05}
      />
    </group>
  );
};

/**
 * 11. Chapter 5: Living Social Archive Constellation
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
            <mesh key={deg} position={[Math.cos(rad) * 5.2, Math.sin(rad) * 5.2, 0]}>
              <octahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial color="#ff2222" emissive="#ff1e46" emissiveIntensity={0.8} />
            </mesh>
          );
        })}
      </group>
      <mesh>
        <torusGeometry args={[5.2, 0.025, 16, 120]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
};

/**
 * 12. Chapter 6: The Commission Geodesic Cocoon
 */
const Chapter6Commission: React.FC = () => {
  const domeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (domeRef.current) {
      domeRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
      domeRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 6]}>
      <mesh ref={domeRef}>
        <sphereGeometry args={[5.6, 20, 20]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#44040e"
          wireframe
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

/**
 * 13. Chapter 7: The Maison Grand Portal
 */
const Chapter7Maison: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <group position={[0, 0, -CHAPTER_SPACING * 7]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[5.4, 0.09, 16, 120]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#e0a96d"
          emissiveIntensity={0.65}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[0.01, 5.2, 64]} />
        <meshBasicMaterial color="#ff2222" transparent opacity={0.08} side={THREE.DoubleSide} />
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
      <directionalLight position={[10, 18, 12]} intensity={1.4} color="#ffffff" />
      <pointLight position={[0, 0, 8]} intensity={2.8} color="#ffd166" distance={35} />
      <pointLight position={[0, 0, -50]} intensity={2.5} color="#ffffff" distance={60} />
      <pointLight position={[0, 0, -112]} intensity={3.0} color="#e0a96d" distance={70} />
      <pointLight position={[0, 0, -180]} intensity={4.0} color="#ff2222" distance={90} />

      {/* Atmospheric Spatial Fog */}
      <fog attach="fog" args={['#070709', 10, 95]} />

      {/* Spatial 3D Elements */}
      <DeepTunnelParticles />
      <ArchitecturalTunnelPortals />
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
