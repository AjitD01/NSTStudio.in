import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager, TOTAL_CHAPTERS } from '../state/scrollStore';

/**
 * Camera View Angles across 3D Cartesian planes
 * Smoothly rolls, pitches, and swoops through the atmospheric spotlight & cosmic space.
 */
interface CameraKeyframe {
  pos: [number, number, number];
  target: [number, number, number];
  up?: [number, number, number];
}

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 0. Hero: Symmetrical Frontal Eye-Level View centered on spotlight beam
  { pos: [0, 0, 10.5], target: [0, 0, 0], up: [0, 1, 0] },

  // 1. Service: High Top-Down Dive
  { pos: [1.8, 9.5, 4.2], target: [0, 1.0, 0], up: [-0.3, 0.3, -0.9] },

  // 2. What We Offer: Lateral Profile with Dutch Angle
  { pos: [8.5, -0.5, 3.2], target: [0, -0.2, 0], up: [0.2, 0.95, 0.2] },

  // 3. Projects: Heroic Low-Angle Under-Swoop
  { pos: [-2.5, -8.5, 4.8], target: [0, 0.5, 0], up: [0.35, 0.6, 0.7] },

  // 4. Anchor: Dynamic Diagonal Helix
  { pos: [-6.5, 5.8, -5.2], target: [0, -0.2, 0], up: [0.4, 0.75, -0.5] },

  // 5. Contact: Reverse Horizon Perspective
  { pos: [0.2, 1.0, -9.8], target: [0, 0, 0], up: [0, 1, 0] },

  // 6. Reviews & FAQ: Intimate Low-Oblique Studio Angle
  { pos: [-5.8, -2.8, -5.8], target: [0, 0.2, 0], up: [-0.3, 0.85, 0.43] },

  // 7. Footer: Grand Symmetrical High Showcase Zenith
  { pos: [0, 4.0, 9.5], target: [0, 0, 0], up: [0, 1, 0] },
];

/**
 * Multi-Axis Exhibition Camera Controller
 * Smoothly interpolates camera position, target, and roll orientation across 3D Cartesian planes.
 */
export const OrbitExhibitionCamera: React.FC = () => {
  const { camera, pointer, size } = useThree();
  const currentPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 10.5));
  const currentTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentUpRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 1, 0));

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

    const targetUpA = new THREE.Vector3(...(kfA.up || [0, 1, 0]));
    const targetUpB = new THREE.Vector3(...(kfB.up || [0, 1, 0]));
    const interpolatedUp = new THREE.Vector3().lerpVectors(targetUpA, targetUpB, t).normalize();

    // Mobile portrait adaptation
    const isPortrait = size.width < size.height;
    if (isPortrait) {
      interpolatedPos.multiplyScalar(1.25);
    }

    // Subtle responsive pointer parallax
    const parallaxScale = isPortrait ? 0.35 : 0.85;
    interpolatedPos.x += pointer.x * 0.8 * parallaxScale;
    interpolatedPos.y += pointer.y * 0.5 * parallaxScale;

    // Smooth lerp to destination across all 3 axes
    currentPosRef.current.lerp(interpolatedPos, 0.085);
    currentTargetRef.current.lerp(interpolatedLook, 0.085);
    currentUpRef.current.lerp(interpolatedUp, 0.085);

    camera.up.copy(currentUpRef.current);
    camera.position.copy(currentPosRef.current);
    camera.lookAt(currentTargetRef.current);
  });

  return null;
};

/**
 * Hero Conical Spotlight Beam
 * Dramatic upward conical stage beam radiating in the Hero view from the dark blueprint reference.
 */
const HeroSpotlightBeam: React.FC = () => {
  const beamRef = useRef<THREE.Mesh>(null);
  const glowCircleRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const progress = scrollManager.current;
    // Fades smoothly as visitor scrolls past hero section
    const factor = Math.max(0, 1 - progress * 1.6);
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = factor * 0.32;
        beamRef.current.visible = factor > 0.01;
      }
    }
    if (glowCircleRef.current) {
      const mat = glowCircleRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = factor * 0.45;
        glowCircleRef.current.visible = factor > 0.01;
      }
    }
  });

  return (
    <group position={[0, -0.4, -0.2]}>
      {/* Upward expanding conical beam */}
      <mesh ref={beamRef} position={[0, 2.2, 0]}>
        <cylinderGeometry args={[2.5, 0.45, 8.5, 32, 1, true]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.32}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Base ground spotlight flare pool */}
      <mesh ref={glowCircleRef} position={[0, -2.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.5, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

/**
 * Cosmic Atmosphere: Minimalist Stardust Particles
 * Subtle gold, crimson, and silver floating dust for deep atmospheric depth.
 */
const MinimalistAtmosphere: React.FC = () => {
  const count = 950;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color('#e0a96d');
    const colorRed = new THREE.Color('#ff2222');
    const colorWhite = new THREE.Color('#f0f0f5');

    for (let i = 0; i < count; i++) {
      // Pure index-based pseudo-random generator
      const r1 = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
      const rand1 = r1 - Math.floor(r1);

      const r2 = Math.sin(i * 93.9898 + 67.345) * 24634.6345;
      const rand2 = r2 - Math.floor(r2);

      const r3 = Math.sin(i * 45.1234 + 12.987) * 58392.1234;
      const rand3 = r3 - Math.floor(r3);

      const radius = 4.8 + rand1 * 20;
      const theta = rand2 * Math.PI * 2;
      const phi = Math.acos(rand3 * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (rand1 - 0.5) * 18;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const chosen = rand1 < 0.75 ? colorWhite : rand1 < 0.93 ? colorGold : colorRed;
      col[i * 3] = chosen.r;
      col[i * 3 + 1] = chosen.g;
      col[i * 3 + 2] = chosen.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.42}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/**
 * Main 3D World Scene
 * Retains the exact atmospheric stage background from the blueprint:
 * - Upward Conical Hero Spotlight Beam
 * - Minimalist Stardust Atmosphere
 * - Studio Exhibition Lighting & Obsidian Fog (#060608)
 * (Flute and character completely removed as requested)
 */
export const InwardWorld: React.FC = () => {
  return (
    <>
      <OrbitExhibitionCamera />

      {/* Studio Exhibition Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 16, 12]} intensity={1.6} color="#ffffff" />
      <directionalLight position={[-8, -6, -8]} intensity={0.9} color="#e0a96d" />
      <pointLight position={[0, 2, 8]} intensity={3.5} color="#e0a96d" distance={30} />
      <pointLight position={[-6, -1, -6]} intensity={3.0} color="#ff2222" distance={30} />
      <pointLight position={[6, 4, -4]} intensity={2.8} color="#ffffff" distance={28} />

      {/* Atmospheric Fog */}
      <fog attach="fog" args={['#060608', 22, 75]} />

      {/* Hero Conical Spotlight Beam */}
      <HeroSpotlightBeam />

      {/* Minimalist Ambient Atmosphere */}
      <MinimalistAtmosphere />
    </>
  );
};
