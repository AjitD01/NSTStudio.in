import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, Scroll, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { ThreeDWorld } from './ThreeDWorld';
import { HtmlSections } from './HtmlSections';

interface SceneCanvasProps {
  onScrollChange?: (offset: number) => void;
}

const ScrollWatcher: React.FC<{ onScrollChange?: (offset: number) => void }> = ({ onScrollChange }) => {
  const scroll = useScroll();
  useFrame(() => {
    if (onScrollChange) {
      onScrollChange(scroll.offset);
    }
  });
  return null;
};

/**
 * SceneCanvas — Cartier-style architectural WebGL experience.
 * Background: ThreeDWorld inside <Scroll> (WebGL canvas space)
 * Foreground: HtmlSections inside <Scroll html> (natural 100vh scroll space)
 * Synchronized through Drei's ScrollControls.
 */
export const SceneCanvas: React.FC<SceneCanvasProps> = ({ onScrollChange }) => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
      camera={{
        fov: 55,
        near: 0.1,
        far: 350,
        position: [0, 0, 0],
      }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.1,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = THREE.SRGBColorSpace;
        gl.setClearColor('#050508');
      }}
    >
      <fog attach="fog" args={['#050508', 12, 60]} />

      {/* 8 Pages of scroll-coupled 3D journey */}
      <ScrollControls pages={8} damping={0.2}>
        <ScrollWatcher onScrollChange={onScrollChange} />

        {/* 3D WebGL World */}
        <Scroll>
          <ThreeDWorld />
        </Scroll>

        {/* Synchronized HTML Layer (each section occupies 100vh) */}
        <Scroll html style={{ width: '100%', pointerEvents: 'none' }}>
          <HtmlSections />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};
