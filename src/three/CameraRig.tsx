import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * CameraRig — Scroll-driven camera that flies through the 3D tunnel.
 * Reads scroll offset from drei's ScrollControls and interpolates
 * camera position along a predefined Z-depth path.
 * Adds mouse parallax for cinematic depth.
 */
export const CameraRig: React.FC = () => {
  const scroll = useScroll();
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const targetLook = useRef(new THREE.Vector3(0, 0, -10));

  // Total depth of the 3D tunnel
  const TOTAL_DEPTH = 160;

  // Track mouse for parallax
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

    // Camera moves along Z axis (into the screen)
    const z = -offset * TOTAL_DEPTH;
    
    // Mouse parallax on X/Y
    const parallaxX = mouseRef.current.x * 0.8;
    const parallaxY = -mouseRef.current.y * 0.5;

    // Smooth interpolation
    targetPos.current.set(parallaxX, parallaxY, z);
    targetLook.current.set(parallaxX * 0.3, parallaxY * 0.3, z - 15);

    state.camera.position.lerp(targetPos.current, 0.06);
    
    // Camera looks forward along the tunnel
    const lookAt = new THREE.Vector3();
    lookAt.copy(state.camera.position);
    lookAt.z -= 15;
    lookAt.x += parallaxX * 0.3;
    lookAt.y += parallaxY * 0.3;
    state.camera.lookAt(lookAt);
  });

  return null;
};
