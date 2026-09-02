import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager, TOTAL_CHAPTERS } from '../state/scrollStore';

/**
 * 8 Bespoke Camera View Angles (One unique vantage point per chapter)
 * Instead of zooming linearly along Z, the camera smoothly orbits around the central straight flute.
 */
interface CameraKeyframe {
  pos: [number, number, number];
  target: [number, number, number];
}

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 0. Prologue: Symmetrical Frontal Eye-Level Hero View (0° Azimuth)
  { pos: [0, 0, 10.5], target: [0, 0, 0] },

  // 1. Four Universes: Dynamic Quarter-Right Angle (+48° Azimuth, slightly elevated)
  { pos: [7.8, 2.2, 7.8], target: [0, 0.2, 0] },

  // 2. Logo Genesis & Lore: Pure 90° Side Profile View (focusing on tone holes & craftsmanship)
  { pos: [10.5, -0.2, 0.5], target: [0, 0, 0] },

  // 3. Atelier Savoir-Faire: Heroic Low-Angle Tilt-Up (-45° looking up the flute length)
  { pos: [-6.5, -4.0, 7.5], target: [0, 0.8, 0] },

  // 4. Selected Works: Top-Down Isometric Exhibition Angle (+55° pitch, inspection view)
  { pos: [6.2, 7.2, 6.2], target: [0, -0.4, 0] },

  // 5. Living Social Archive: 175° Reverse Perspective (view from behind the flute)
  { pos: [-1.2, 1.8, -10.2], target: [0, 0, 0] },

  // 6. Private Commission: Intimate 3/4 Studio Dialogue Angle (-35° eye-level)
  { pos: [-7.2, 0.6, 7.2], target: [0, -0.2, 0] },

  // 7. Maison Epilogue: Grand Symmetrical High Showcase Overview
  { pos: [0, 3.8, 10.2], target: [0, 0, 0] },
];

/**
 * 1. Multi-Angle Exhibition Camera Controller
 * Smoothly interpolates camera position & target between chapter keyframes.
 */
export const OrbitExhibitionCamera: React.FC = () => {
  const { camera, pointer, size } = useThree();
  const currentPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 10.5));
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // 60fps lerped virtual scroll progress (0..7)
    const progress = scrollManager.update(0.08);

    // Bounded chapter keyframe indices
    const clamped = Math.max(0, Math.min(TOTAL_CHAPTERS - 1, progress));
    const baseIdx = Math.floor(clamped);
    const nextIdx = Math.min(TOTAL_CHAPTERS - 1, baseIdx + 1);
    const frac = clamped - baseIdx;

    // Smooth cubic Hermite ease
    const t = frac * frac * (3 - 2 * frac);

    const kfA = CAMERA_KEYFRAMES[baseIdx];
    const kfB = CAMERA_KEYFRAMES[nextIdx];

    const targetPosA = new THREE.Vector3(...kfA.pos);
    const targetPosB = new THREE.Vector3(...kfB.pos);
    const interpolatedPos = new THREE.Vector3().lerpVectors(targetPosA, targetPosB, t);

    const targetLookA = new THREE.Vector3(...kfA.target);
    const targetLookB = new THREE.Vector3(...kfB.target);
    const interpolatedLook = new THREE.Vector3().lerpVectors(targetLookA, targetLookB, t);

    // Mobile portrait adaptation: pull camera back slightly so the flute & character fit phone screens
    const isPortrait = size.width < size.height;
    if (isPortrait) {
      interpolatedPos.multiplyScalar(1.35);
    }

    // Subtle responsive pointer parallax
    const parallaxScale = isPortrait ? 0.35 : 1.0;
    interpolatedPos.x += pointer.x * 0.9 * parallaxScale;
    interpolatedPos.y += pointer.y * 0.6 * parallaxScale;

    // Smooth lerp to destination
    currentPosRef.current.lerp(interpolatedPos, 0.085);
    currentTargetRef.current.lerp(interpolatedLook, 0.085);

    camera.position.copy(currentPosRef.current);
    camera.lookAt(currentTargetRef.current);
  });

  return null;
};

/**
 * 2. The Central Straight Flute (Master 3D Sculpture)
 * High-detail vertical flute anchored straight at (0, 0, 0) with crimson lacquer and gold stops.
 */
const CentralStraightFlute: React.FC = () => {
  const fluteGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (fluteGroupRef.current) {
      // Gentle breathing levitation hover (keeps flute straight)
      fluteGroupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.06;
    }
  });

  // 6 Tone Holes coordinates
  const toneHolePositions = useMemo(() => [0.6, 0.1, -0.4, -0.9, -1.4, -1.9], []);

  // Gold Ring Band positions along the straight flute
  const goldBands = useMemo(
    () => [
      { y: 3.55, r: 0.14, h: 0.12 }, // Top Crown Cap
      { y: 2.3, r: 0.138, h: 0.08 },  // Headjoint Ferrule
      { y: 0.95, r: 0.135, h: 0.05 }, // Upper Body Joint
      { y: -1.05, r: 0.135, h: 0.05 },// Lower Body Joint
      { y: -3.55, r: 0.14, h: 0.12 }, // Footjoint Ring
    ],
    []
  );

  return (
    <group ref={fluteGroupRef} position={[0, 0, 0]}>
      {/* Main Flute Body — Straight Deep Crimson Lacquer Tube */}
      <mesh>
        <cylinderGeometry args={[0.13, 0.13, 7.2, 64]} />
        <meshStandardMaterial
          color="#ff2222"
          emissive="#550512"
          emissiveIntensity={0.25}
          roughness={0.18}
          metalness={0.4}
        />
      </mesh>

      {/* Embouchure Mouth Blow-Hole (Headjoint at Y = 2.65) */}
      <group position={[0, 2.65, 0.12]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.05, 24]} />
          <meshBasicMaterial color="#06060a" />
        </mesh>
        {/* Lip Plate Raised Bezel */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.01]}>
          <ringGeometry args={[0.045, 0.075, 24]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* 6 Precision Tone Holes along Front Face (facing +Z) */}
      {toneHolePositions.map((y, idx) => (
        <group key={idx} position={[0, y, 0.12]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.032, 0.032, 0.05, 20]} />
            <meshBasicMaterial color="#08080c" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.01]}>
            <ringGeometry args={[0.032, 0.05, 20]} />
            <meshStandardMaterial color="#d4af37" metalness={0.85} roughness={0.25} />
          </mesh>
        </group>
      ))}

      {/* Polished Gold Ring Stops & Ferrules */}
      {goldBands.map((band, idx) => (
        <mesh key={idx} position={[0, band.y, 0]}>
          <cylinderGeometry args={[band.r, band.r, band.h, 48]} />
          <meshStandardMaterial
            color="#d4af37"
            emissive="#4d3b14"
            emissiveIntensity={0.3}
            metalness={0.92}
            roughness={0.15}
          />
        </mesh>
      ))}

      {/* Sacred Golden Thread spiraling around upper joint (Y = 1.1 to 2.2) */}
      <mesh position={[0, 1.65, 0]}>
        <torusGeometry args={[0.138, 0.01, 16, 48]} />
        <meshStandardMaterial color="#e0a96d" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 1.8, 0]}>
        <torusGeometry args={[0.138, 0.01, 16, 48]} />
        <meshStandardMaterial color="#e0a96d" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Concentric Golden Showcase Halo at the base */}
      <mesh position={[0, -3.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 2.2, 64]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -3.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.2, 64]} />
        <meshBasicMaterial color="#ff2222" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/**
 * 3. Character Guide 3D (The Companion Throughout the Journey)
 * Preloads the 8 character poses and smoothly crossfades between them as the user scrolls,
 * positioning the guide gracefully beside the central flute and billboarded to face the camera.
 */
const CharacterGuide3D: React.FC = () => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const [textures, setTextures] = useState<(THREE.Texture | null)[]>(new Array(8).fill(null));
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Load all 8 transparent character pose assets
  useEffect(() => {
    const loader = new THREE.TextureLoader();

    for (let i = 0; i < 8; i++) {
      loader.load(
        `/brand/character/pose_${i}.png`,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          setTextures((prev) => {
            const next = [...prev];
            next[i] = tex;
            return next;
          });
        },
        undefined,
        (err) => {
          console.warn(`Could not load pose_${i}.png`, err);
        }
      );
    }
  }, []);

  useFrame((state) => {
    const progress = scrollManager.current;

    // Billboard the entire character guide to always face the camera
    if (groupRef.current) {
      groupRef.current.quaternion.copy(camera.quaternion);

      // Dynamically position the character guide along camera's right side
      // so it is always elegantly framed beside the straight flute from any viewing angle
      const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      const hoverY = Math.sin(state.clock.getElapsedTime() * 1.1) * 0.08 - 0.15;
      const targetPos = cameraRight.multiplyScalar(2.1);
      targetPos.y += hoverY;
      groupRef.current.position.copy(targetPos);
    }

    // Dynamic crossfade between character poses based on scroll progress
    meshRefs.current.forEach((mesh, idx) => {
      if (mesh) {
        const dist = Math.abs(progress - idx);
        // Fade window of ~0.6 chapters
        const opacity = Math.max(0, 1 - dist / 0.6);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = opacity;
          mesh.visible = opacity > 0.01;
        }
      }
    });
  });

  // Relative width proportions for each pose (maintaining their actual aspect ratios)
  const poseSizes: [number, number][] = [
    [1.8, 4.2], // Pose 0 (ch 1.png): Standing Guide
    [2.4, 4.2], // Pose 1 (ch 2.png): Flute Player
    [2.1, 4.2], // Pose 2 (ch 3.png): Scribe & Mark
    [2.2, 4.2], // Pose 3 (ch 4.png): Horizon Pointer
    [3.8, 1.8], // Pose 4 (ch 5.png): Reclining Poet
    [3.2, 3.8], // Pose 5 (ch 6.png): Lotus Meditator
    [2.8, 4.2], // Pose 6 (ch 7.png): Director & Companion
    [3.0, 4.2], // Pose 7 (ch8.png): Grand Stance
  ];

  return (
    <group ref={groupRef} position={[1.9, 0, 0]}>
      {textures.map((tex, idx) => {
        const [w, h] = poseSizes[idx] || [2.2, 4.2];
        return (
          <mesh
            key={idx}
            ref={(el) => (meshRefs.current[idx] = el)}
            position={[0, 0, 0]}
            visible={idx === 0}
          >
            <planeGeometry args={[w, h]} />
            {tex ? (
              <meshBasicMaterial
                map={tex}
                transparent
                opacity={idx === 0 ? 1 : 0}
                depthWrite={false}
                side={THREE.DoubleSide}
              />
            ) : (
              <meshBasicMaterial transparent opacity={0} />
            )}
          </mesh>
        );
      })}
    </group>
  );
};

/**
 * 4. Cosmic Atmosphere: Minimalist Stardust Particles
 * Subtle gold and silver floating dust replacing heavy clutter.
 */
const MinimalistAtmosphere: React.FC = () => {
  const count = 1800;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color('#e0a96d');
    const colorRed = new THREE.Color('#ff2222');
    const colorWhite = new THREE.Color('#f0f0f5');

    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const rand = Math.random();
      const chosen = rand < 0.65 ? colorWhite : rand < 0.88 ? colorGold : colorRed;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        vertexColors
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/**
 * 5. Main 3D World Scene
 * Features the Straight Central Flute, Character Guide, and Multi-Angle Orbit Camera.
 */
export const InwardWorld: React.FC = () => {
  return (
    <>
      <OrbitExhibitionCamera />

      {/* Studio Exhibition Lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[10, 16, 12]} intensity={1.4} color="#ffffff" />
      <pointLight position={[0, 2, 8]} intensity={3.0} color="#e0a96d" distance={30} />
      <pointLight position={[-6, -1, -6]} intensity={2.8} color="#ff2222" distance={30} />
      <pointLight position={[6, 4, -4]} intensity={2.5} color="#ffffff" distance={28} />

      {/* Atmospheric Fog (set far so the flute & character are always crystal-clear) */}
      <fog attach="fog" args={['#060608', 20, 70]} />

      {/* The 2 Core Heroes: Straight Central Flute + Character Guide */}
      <CentralStraightFlute />
      <CharacterGuide3D />

      {/* Minimalist Ambient Atmosphere */}
      <MinimalistAtmosphere />
    </>
  );
};
