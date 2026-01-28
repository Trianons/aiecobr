import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 5 Biomas brasileiros
const BIOMES = [
  { 
    name: 'Ética', 
    color: new THREE.Color('#a78bfa'), 
    accentColor: new THREE.Color('#fb923c'),
    position: [-2.5, 1.5, 0],
    region: { x: 0.2, y: 0.3, radius: 0.15 } // Screen space for hover
  },
  { 
    name: 'Inovação', 
    color: new THREE.Color('#22d3ee'), 
    accentColor: new THREE.Color('#3b82f6'),
    position: [2.5, 1.5, 0],
    region: { x: 0.8, y: 0.3, radius: 0.15 }
  },
  { 
    name: 'Colaboração', 
    color: new THREE.Color('#10b981'), 
    accentColor: new THREE.Color('#fbbf24'),
    position: [-2, -1.5, 0],
    region: { x: 0.25, y: 0.7, radius: 0.15 }
  },
  { 
    name: 'Sustentabilidade', 
    color: new THREE.Color('#f59e0b'), 
    accentColor: new THREE.Color('#eab308'),
    position: [2, -1.5, 0],
    region: { x: 0.75, y: 0.7, radius: 0.15 }
  },
  { 
    name: 'Humanidade', 
    color: new THREE.Color('#ec4899'), 
    accentColor: new THREE.Color('#f472b6'),
    position: [0, 0, -1],
    region: { x: 0.5, y: 0.5, radius: 0.12 }
  }
];

const PARTICLE_COUNT = 5000;

function Particles({ mousePosition, hoveredBiome }) {
  const pointsRef = useRef();
  const velocitiesRef = useRef();
  const targetColorsRef = useRef();
  
  const particleData = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // Random biome assignment
      const biome = BIOMES[Math.floor(Math.random() * BIOMES.length)];
      const offset = (Math.random() - 0.5) * 2;
      
      positions[i3] = biome.position[0] + offset;
      positions[i3 + 1] = biome.position[1] + offset;
      positions[i3 + 2] = biome.position[2] + (Math.random() - 0.5) * 2;
      
      colors[i3] = biome.color.r;
      colors[i3 + 1] = biome.color.g;
      colors[i3 + 2] = biome.color.b;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    
    return { positions, colors, velocities };
  }, []);
  
  velocitiesRef.current = particleData.velocities;
  targetColorsRef.current = particleData.colors.slice();
  
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const positions = meshRef.current.geometry.attributes.position.array;
    const colors = meshRef.current.geometry.attributes.color.array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      
      // Find closest biome
      let minDist = Infinity;
      let closestBiome = BIOMES[0];
      
      for (const biome of BIOMES) {
        const dx = positions[i3] - biome.position[0];
        const dy = positions[i3 + 1] - biome.position[1];
        const dz = positions[i3 + 2] - biome.position[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < minDist) {
          minDist = dist;
          closestBiome = biome;
        }
      }
      
      // Attractor force
      const dx = closestBiome.position[0] - positions[i3];
      const dy = closestBiome.position[1] - positions[i3 + 1];
      const dz = closestBiome.position[2] - positions[i3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      const force = 0.001;
      velocitiesRef.current[i3] += (dx / dist) * force;
      velocitiesRef.current[i3 + 1] += (dy / dist) * force;
      velocitiesRef.current[i3 + 2] += (dz / dist) * force;
      
      // Apply damping
      velocitiesRef.current[i3] *= 0.98;
      velocitiesRef.current[i3 + 1] *= 0.98;
      velocitiesRef.current[i3 + 2] *= 0.98;
      
      // Add noise
      velocitiesRef.current[i3] += Math.sin(time + i) * 0.0001;
      velocitiesRef.current[i3 + 1] += Math.cos(time + i) * 0.0001;
      
      // Update position
      positions[i3] += velocitiesRef.current[i3];
      positions[i3 + 1] += velocitiesRef.current[i3 + 1];
      positions[i3 + 2] += velocitiesRef.current[i3 + 2];
      
      // Color transitions - pulse for hovered biome
      let targetColor = closestBiome.color;
      
      if (hoveredBiome === 0 && closestBiome.name === 'Ética') {
        // Pulse between base and accent color
        const pulse = Math.sin(time * 3) * 0.5 + 0.5;
        targetColor = new THREE.Color().lerpColors(
          closestBiome.color, 
          closestBiome.accentColor, 
          pulse
        );
      }
      
      targetColorsRef.current[i3] = targetColor.r;
      targetColorsRef.current[i3 + 1] = targetColor.g;
      targetColorsRef.current[i3 + 2] = targetColor.b;
      
      // Smooth color transition
      colors[i3] += (targetColorsRef.current[i3] - colors[i3]) * 0.1;
      colors[i3 + 1] += (targetColorsRef.current[i3 + 1] - colors[i3 + 1]) * 0.1;
      colors[i3 + 2] += (targetColorsRef.current[i3 + 2] - colors[i3 + 2]) * 0.1;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.geometry.attributes.color.needsUpdate = true;
  });
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, [positions, colors, sizes]);

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig({ mousePosition }) {
  const { camera } = useThree();
  
  useFrame(() => {
    // Parallax effect based on mouse
    camera.position.x += (mousePosition.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mousePosition.y * 0.5 - camera.position.y) * 0.05;
    
    // Breathing motion
    camera.position.z = 5 + Math.sin(Date.now() * 0.0005) * 0.2;
    
    camera.lookAt(0, 0, 0);
  });
  
  return null;
}

function BiomeLabels({ onBiomeHover, hoveredBiome }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {BIOMES.map((biome, index) => (
        <motion.div
          key={biome.name}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${biome.region.x * 100}%`,
            top: `${biome.region.y * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseEnter={() => onBiomeHover(index)}
          onMouseLeave={() => onBiomeHover(null)}
          whileHover={{ scale: 1.1 }}
          animate={{
            opacity: hoveredBiome === index ? 1 : 0.7,
          }}
        >
          <div className="relative group">
            {/* Glow ring */}
            <div 
              className="absolute inset-0 rounded-full blur-xl transition-all duration-300"
              style={{
                background: hoveredBiome === index 
                  ? `radial-gradient(circle, ${biome.color.getStyle()} 0%, transparent 70%)`
                  : 'transparent',
                width: '120px',
                height: '120px',
                transform: 'translate(-50%, -50%)',
                left: '50%',
                top: '50%'
              }}
            />
            
            {/* Label */}
            <div 
              className="relative px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300"
              style={{
                background: hoveredBiome === index 
                  ? `${biome.color.getStyle()}20`
                  : 'rgba(2, 6, 23, 0.6)',
                borderColor: hoveredBiome === index 
                  ? biome.color.getStyle()
                  : 'rgba(255, 255, 255, 0.1)',
                boxShadow: hoveredBiome === index 
                  ? `0 0 20px ${biome.color.getStyle()}40`
                  : 'none'
              }}
            >
              <span 
                className="text-sm font-medium tracking-wide"
                style={{
                  color: hoveredBiome === index ? biome.color.getStyle() : '#fff'
                }}
              >
                {biome.name}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function BiomeMap() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredBiome, setHoveredBiome] = useState(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden">
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <ParticleField mousePosition={mousePosition} hoveredBiome={hoveredBiome} />
        <CameraRig mousePosition={mousePosition} />
      </Canvas>
      
      {/* Biome Labels Overlay */}
      <BiomeLabels onBiomeHover={setHoveredBiome} hoveredBiome={hoveredBiome} />
      
      {/* Title */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-white mb-2"
            style={{
              textShadow: '0 0 40px rgba(34, 211, 238, 0.5)'
            }}>
          ai.eco.br
        </h1>
        <p className="text-xl text-cyan-300/80">Ecossistema Vivo de IA Humanista</p>
      </motion.div>
      
      {/* CTA */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button 
          className="px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
            boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 0 50px rgba(34, 211, 238, 0.6)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 0 30px rgba(34, 211, 238, 0.4)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Explorar Biomas
        </button>
      </motion.div>
      
      {/* Breathing gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.1) 0%, transparent 50%)'
        }}
      />
    </div>
  );
}
