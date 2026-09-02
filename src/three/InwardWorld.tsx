import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollManager, TOTAL_CHAPTERS } from '../state/scrollStore';
import { createFluteLacquerTexture } from './fluteTexture';
import { useGuideStore } from '../state/guideStore';

/**
 * 8 Bespoke Camera View Angles across 3D Cartesian planes
 * Smoothly rolls, pitches, and swoops around the straight flute.
 */
interface CameraKeyframe {
  pos: [number, number, number];
  target: [number, number, number];
  up?: [number, number, number];
}

const CAMERA_KEYFRAMES: CameraKeyframe[] = [
  // 0. Prologue: Symmetrical Frontal Eye-Level Hero View
  { pos: [0, 0, 10.5], target: [0, 0, 0], up: [0, 1, 0] },

  // 1. Four Universes: High Top-Down Crown Bore Dive (looking down the vertical axis of the flute)
  { pos: [1.8, 10.2, 3.2], target: [0, 1.2, 0], up: [-0.35, 0.3, -0.88] },

  // 2. Logo Genesis & Lore: Lateral 90° Profile with Dutch Angle Bank
  { pos: [10.5, -0.8, 1.2], target: [0, -0.2, 0], up: [0.25, 0.94, 0.22] },

  // 3. Atelier Savoir-Faire: Heroic Low-Angle Under-Swoop (looking up from beneath the base)
  { pos: [-2.5, -9.8, 4.2], target: [0, 0.5, 0], up: [0.35, 0.55, 0.75] },

  // 4. Selected Works: Dynamic Diagonal 3D Helix (top-left-rear looking down across the flute)
  { pos: [-7.2, 6.8, -6.2], target: [0, -0.2, 0], up: [0.45, 0.72, -0.52] },

  // 5. Living Social Archive: Reverse Horizon 180° (rear perspective)
  { pos: [0.2, 1.2, -10.8], target: [0, 0, 0], up: [0, 1, 0] },

  // 6. Private Commission: Intimate Low-Oblique Studio Angle (-45° pitch, intimate dialog)
  { pos: [-6.8, -3.2, -6.8], target: [0, 0.2, 0], up: [-0.3, 0.85, 0.43] },

  // 7. Maison Epilogue: Grand Symmetrical High Showcase Zenith
  { pos: [0, 4.5, 10.0], target: [0, 0, 0], up: [0, 1, 0] },
];

/**
 * 1. Multi-Axis Exhibition Camera Controller
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

    // Mobile portrait adaptation: pull camera back slightly so the flute & character fit phone screens
    const isPortrait = size.width < size.height;
    if (isPortrait) {
      interpolatedPos.multiplyScalar(1.35);
    }

    // Subtle responsive pointer parallax
    const parallaxScale = isPortrait ? 0.35 : 1.0;
    interpolatedPos.x += pointer.x * 0.9 * parallaxScale;
    interpolatedPos.y += pointer.y * 0.6 * parallaxScale;

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
 * 2. Realistic Hand-Lacquered Central Straight Flute
 * Features multi-layer clearcoat lacquer, internal hollow bore, domed crown cap,
 * bevelled tone holes, and physics-swaying silk tassel.
 */
const RealisticCentralFlute: React.FC = () => {
  const fluteGroupRef = useRef<THREE.Group>(null);
  const tasselRef = useRef<THREE.Group>(null);

  // Generate hand-lacquered rosewood grain texture
  const lacquerTexture = useMemo(() => createFluteLacquerTexture(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (fluteGroupRef.current) {
      // Gentle breathing levitation hover (keeps flute straight)
      fluteGroupRef.current.position.y = Math.sin(time * 0.8) * 0.06;
    }

    // Subtle natural physics sway for the hanging silk tassel
    if (tasselRef.current) {
      tasselRef.current.rotation.z = Math.sin(time * 1.8) * 0.12;
      tasselRef.current.rotation.x = Math.cos(time * 1.4) * 0.08;
    }
  });

  // 6 Tone Holes coordinates (acoustically spaced)
  const toneHolePositions = useMemo(() => [0.65, 0.15, -0.35, -0.85, -1.35, -1.85], []);

  // Gold Ring Band positions along the straight flute
  const goldBands = useMemo(
    () => [
      { y: 3.55, r: 0.144, h: 0.1 },  // Crown Collar
      { y: 2.35, r: 0.142, h: 0.07 }, // Headjoint Ferrule
      { y: 1.0, r: 0.138, h: 0.045 }, // Upper Body Ring
      { y: -1.0, r: 0.138, h: 0.045 },// Lower Body Ring
      { y: -2.3, r: 0.14, h: 0.05 },  // Pre-Foot Ferrule
      { y: -3.55, r: 0.144, h: 0.1 }, // Footjoint Ring
    ],
    []
  );

  return (
    <group ref={fluteGroupRef} position={[0, 0, 0]}>
      {/* 1. Main Flute Body — Multi-Layered Clearcoat Cinnabar Lacquer Tube */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.135, 0.135, 7.2, 64]} />
        <meshPhysicalMaterial
          map={lacquerTexture}
          color="#d4142a"
          emissive="#38000a"
          emissiveIntensity={0.2}
          roughness={0.14}
          metalness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          reflectivity={0.9}
        />
      </mesh>

      {/* 2. Internal Dark Hollow Bore (creates authentic depth when viewing down or into holes) */}
      <mesh>
        <cylinderGeometry args={[0.11, 0.11, 7.22, 32]} />
        <meshBasicMaterial color="#0a0507" side={THREE.BackSide} />
      </mesh>

      {/* 3. Domed Gold Crown Stopper (Top at Y = 3.6) */}
      <group position={[0, 3.6, 0]}>
        {/* Crown Dome */}
        <mesh position={[0, 0.04, 0]}>
          <sphereGeometry args={[0.138, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Top Finial Jewel */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.025, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#ff2222" metalness={0.8} roughness={0.1} />
        </mesh>
      </group>

      {/* 4. Embouchure Mouth Blow-Hole with Chamfered Lip Plate (Headjoint at Y = 2.7) */}
      <group position={[0, 2.7, 0.12]}>
        {/* Inner Dark Bore Opening */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.048, 0.048, 0.06, 24]} />
          <meshBasicMaterial color="#050204" />
        </mesh>
        {/* Raised Ergonomic Gold Lip-Plate */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.005]}>
          <ringGeometry args={[0.048, 0.085, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.92} roughness={0.18} />
        </mesh>
      </group>

      {/* 5. Six Precision Recessed Tone Holes with Gold Inlay Rims */}
      {toneHolePositions.map((y, idx) => (
        <group key={idx} position={[0, y, 0.122]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.034, 0.034, 0.05, 20]} />
            <meshBasicMaterial color="#060204" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.005]}>
            <ringGeometry args={[0.034, 0.054, 24]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* 6. Polished 24k Gold Ferrules and Joint Accent Rings */}
      {goldBands.map((band, idx) => (
        <group key={idx} position={[0, band.y, 0]}>
          <mesh>
            <cylinderGeometry args={[band.r, band.r, band.h, 48]} />
            <meshStandardMaterial
              color="#d4af37"
              emissive="#3d2a08"
              emissiveIntensity={0.25}
              metalness={0.96}
              roughness={0.12}
            />
          </mesh>
          {/* Subtle accent pinstripe */}
          <mesh position={[0, band.h / 2 + 0.01, 0]}>
            <torusGeometry args={[band.r + 0.002, 0.004, 12, 48]} />
            <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      ))}

      {/* 7. Sacred Red Silk Cord (Mauli) & Hanging Tassel */}
      <group position={[0, 2.35, 0]}>
        {/* Cord Wrap around headjoint */}
        <mesh>
          <torusGeometry args={[0.144, 0.012, 16, 48]} />
          <meshStandardMaterial color="#ff2222" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.03, 0]}>
          <torusGeometry args={[0.144, 0.012, 16, 48]} />
          <meshStandardMaterial color="#d4af37" roughness={0.4} />
        </mesh>

        {/* Swaying Silk Tassel hanging to the side */}
        <group ref={tasselRef} position={[0.16, -0.04, 0]}>
          {/* Gold connecting bead */}
          <mesh position={[0, -0.06, 0]}>
            <sphereGeometry args={[0.024, 16, 16]} />
            <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Hanging thread strand */}
          <mesh position={[0, -0.32, 0]}>
            <cylinderGeometry args={[0.006, 0.018, 0.5, 16]} />
            <meshStandardMaterial color="#ff2222" roughness={0.7} />
          </mesh>
          {/* Bottom tassel skirt */}
          <mesh position={[0, -0.6, 0]}>
            <coneGeometry args={[0.05, 0.2, 20]} />
            <meshStandardMaterial color="#ff2222" roughness={0.6} />
          </mesh>
        </group>
      </group>

      {/* 8. Concentric Exhibition Pedestal Ring at Base */}
      <mesh position={[0, -3.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 2.4, 64]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -3.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.9, 3.4, 64]} />
        <meshBasicMaterial color="#ff2222" transparent opacity={0.09} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

/**
 * 3. Interactive Character Guide 3D
 * - Tilts & reacts smoothly to cursor position.
 * - Features an ethereal ground aura that pulses.
 * - Emits particle sparkle burst on click.
 * - Connects to GuideStore to show insight dialogues.
 */
const InteractiveCharacterGuide: React.FC = () => {
  const { camera, pointer } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const auraRef = useRef<THREE.Mesh>(null);
  const pulseScaleRef = useRef(1.0);
  const [textures, setTextures] = useState<(THREE.Texture | null)[]>(new Array(8).fill(null));
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  // Subscribe to guide store pulses cleanly without DOM React hook mismatch
  useEffect(() => {
    return useGuideStore.subscribe(() => {
      pulseScaleRef.current = 1.35;
      setTimeout(() => {
        pulseScaleRef.current = 1.0;
      }, 350);
    });
  }, []);

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
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Billboard the entire character guide to always face the camera
      groupRef.current.quaternion.copy(camera.quaternion);

      // Dynamically position along camera's right side so it never occludes the flute
      const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
      const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);

      // Subtle breathing float + interactive cursor look-at parallax
      const hoverY = Math.sin(time * 1.1) * 0.08 - 0.15;
      const targetPos = cameraRight
        .clone()
        .multiplyScalar(2.1)
        .add(cameraUp.clone().multiplyScalar(hoverY + pointer.y * 0.2));
      targetPos.x += pointer.x * 0.3;

      groupRef.current.position.copy(targetPos);

      // Gentle interactive 3D tilt towards cursor
      groupRef.current.rotation.z = -pointer.x * 0.06;
    }

    // Dynamic ground aura breathing + pulse response
    if (auraRef.current) {
      const basePulse = 1.0 + Math.sin(time * 2.0) * 0.15;
      const finalScale = basePulse * pulseScaleRef.current;
      auraRef.current.scale.set(finalScale, finalScale, 1);
    }

    // Dynamic crossfade between character poses based on scroll progress
    meshRefs.current.forEach((mesh, idx) => {
      if (mesh) {
        const dist = Math.abs(progress - idx);
        const opacity = Math.max(0, 1 - dist / 0.6);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = opacity;
          mesh.visible = opacity > 0.01;
        }
      }
    });
  });

  // Relative width proportions for each pose
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
    <group
      ref={groupRef}
      position={[2.1, 0, 0]}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
        useGuideStore.getState().setHovered(true);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
        useGuideStore.getState().setHovered(false);
      }}
      onClick={() => {
        useGuideStore.getState().triggerPulse();
      }}
    >
      {/* Ethereal Luminous Ground Aura */}
      <mesh ref={auraRef} position={[0, -2.1, -0.05]}>
        <circleGeometry args={[1.1, 32]} />
        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 8 Character Poses (billboarded and crossfaded) */}
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
  const count = 950;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorGold = new THREE.Color('#e0a96d');
    const colorRed = new THREE.Color('#ff2222');
    const colorWhite = new THREE.Color('#f0f0f5');

    for (let i = 0; i < count; i++) {
      // Increased clearance radius around the central flute
      const radius = 4.8 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      const rand = Math.random();
      const chosen = rand < 0.75 ? colorWhite : rand < 0.93 ? colorGold : colorRed;
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
 * 5. Main 3D World Scene
 * Features Realistic Flute with Physical Clearcoat Lacquer, Interactive Character Guide,
 * and Multi-Axis Orbit Camera.
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

      {/* The 2 Core Heroes: Realistic Straight Flute + Interactive Character Guide */}
      <RealisticCentralFlute />
      <InteractiveCharacterGuide />

      {/* Minimalist Ambient Atmosphere */}
      <MinimalistAtmosphere />
    </>
  );
};
