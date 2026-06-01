import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const createPlaceholderTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 384; 
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  ctx.clearRect(0, 0, 512, 384);

  // Add padding to create uniform gaps between the panels
  const padding = 16;
  const radius = 24; 
  
  ctx.beginPath();
  ctx.moveTo(padding + radius, padding);
  ctx.lineTo(512 - padding - radius, padding);
  ctx.quadraticCurveTo(512 - padding, padding, 512 - padding, padding + radius);
  ctx.lineTo(512 - padding, 384 - padding - radius);
  ctx.quadraticCurveTo(512 - padding, 384 - padding, 512 - padding - radius, 384 - padding);
  ctx.lineTo(padding + radius, 384 - padding);
  ctx.quadraticCurveTo(padding, 384 - padding, padding, 384 - padding - radius);
  ctx.lineTo(padding, padding + radius);
  ctx.quadraticCurveTo(padding, padding, padding + radius, padding);
  ctx.closePath();

  // Fill Background - Dark Glass Card
  ctx.fillStyle = "rgba(20, 20, 20, 0.9)"; 
  ctx.fill();

  // Draw the mountain and sun icon in dim grey
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  
  ctx.beginPath();
  ctx.arc(360, 110, 30, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(100, 300);
  ctx.lineTo(240, 120);
  ctx.lineTo(350, 300);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(220, 300);
  ctx.lineTo(360, 160);
  ctx.lineTo(470, 300);
  ctx.closePath();
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

const GridPanels = () => {
  const cols = 12; // 12 columns
  const rows = 5;  // 5 rows -> Total 60 photos exactly
  const radius = 22; 
  
  const texture = useMemo(() => createPlaceholderTexture(), []);
  
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.6,
      metalness: 0.1,
      side: THREE.FrontSide, // FrontSide only, so back panels are hidden
      transparent: true,
    });
  }, [texture]);

  // Generate a SphereGeometry patch for each cell to create a perfect solid sphere
  const geometries = useMemo(() => {
    const geos = [];
    const phiStep = (Math.PI * 2) / cols;
    
    // Avoid the extreme poles to prevent too much pinching, cap it slightly
    const thetaMin = Math.PI / 12; 
    const thetaMax = Math.PI - Math.PI / 12;
    const thetaRange = thetaMax - thetaMin;
    const thetaStep = thetaRange / rows;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const phiStart = j * phiStep;
        const phiLength = phiStep;
        const thetaStart = thetaMin + i * thetaStep;
        const thetaLength = thetaStep;
        
        // SphereGeometry perfectly curves the panel along the sphere surface
        const geo = new THREE.SphereGeometry(radius, 16, 16, phiStart, phiLength, thetaStart, thetaLength);
        geos.push(geo);
      }
    }
    return geos;
  }, [rows, cols, radius]);

  const groupRef = useRef<THREE.Group>(null);
  const currentSpeed = useRef({ x: 0, y: 0.002 }); 

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      // Horizontal mouse -> rotation speed/direction
      // Vertical mouse -> tilt
      const targetSpeedY = pointer.x * 0.015; 
      const targetSpeedX = pointer.y * 0.015; 

      currentSpeed.current.x = THREE.MathUtils.lerp(currentSpeed.current.x, targetSpeedX, 0.05);
      currentSpeed.current.y = THREE.MathUtils.lerp(currentSpeed.current.y, targetSpeedY, 0.05);

      groupRef.current.rotation.x -= currentSpeed.current.x;
      groupRef.current.rotation.y += currentSpeed.current.y;
    }
  });

  return (
    <group ref={groupRef}>
      {geometries.map((geo, i) => (
        <mesh 
          key={i} 
          geometry={geo} 
          material={material} 
        />
      ))}
    </group>
  );
};

const GallerySphere3D = () => {
  return (
    <div className="w-full h-full relative z-10 cursor-crosshair">
      <Canvas
        camera={{ position: [0, 0, 52], fov: 40 }} 
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <GridPanels />
      </Canvas>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none text-muted-foreground/60 text-sm flex items-center gap-2">
        <span>←</span> Move cursor to rotate & tilt <span>→</span>
      </div>
    </div>
  );
};

export default GallerySphere3D;
