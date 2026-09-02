import React from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { InwardWorld } from './InwardWorld';

export const SceneCanvas: React.FC = () => {
  return (
    <div className="canvas-wrapper">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 250 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <InwardWorld />
      </Canvas>
    </div>
  );
};
