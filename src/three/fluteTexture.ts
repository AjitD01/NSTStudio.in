import * as THREE from 'three';

/**
 * Generates a realistic hand-lacquered rosewood/cinnabar flute texture.
 * Features subtle longitudinal grain, warm gradients, and bamboo node depth.
 */
export function createFluteLacquerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Base luxury gradient: Deep burgundy crown to luminous ruby lacquer body to dark foot
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024);
  baseGrad.addColorStop(0.0, '#380008'); // Dark crown stopper
  baseGrad.addColorStop(0.1, '#7a0515');
  baseGrad.addColorStop(0.22, '#b80f24');
  baseGrad.addColorStop(0.4, '#e61834');  // Luminous ruby heart
  baseGrad.addColorStop(0.65, '#d4132c');
  baseGrad.addColorStop(0.85, '#8a081a');
  baseGrad.addColorStop(1.0, '#2e0006');  // Dark foot ring
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, 512, 1024);

  // Subtle wood/lacquer grain fibers along length
  for (let i = 0; i < 180; i++) {
    const x = Math.random() * 512;
    const w = 0.8 + Math.random() * 2.2;
    const alpha = 0.015 + Math.random() * 0.035;
    ctx.fillStyle = i % 2 === 0 ? `rgba(255, 120, 120, ${alpha})` : `rgba(20, 0, 0, ${alpha * 1.5})`;
    ctx.fillRect(x, 0, w, 1024);
  }

  // Realistic bamboo/joint node shadow bands
  const nodeY = [120, 310, 510, 710, 910];
  nodeY.forEach((y) => {
    const nodeGrad = ctx.createLinearGradient(0, y - 16, 0, y + 16);
    nodeGrad.addColorStop(0.0, 'rgba(0, 0, 0, 0)');
    nodeGrad.addColorStop(0.4, 'rgba(40, 2, 8, 0.45)');
    nodeGrad.addColorStop(0.55, 'rgba(255, 180, 180, 0.08)');
    nodeGrad.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = nodeGrad;
    ctx.fillRect(0, y - 16, 512, 32);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
