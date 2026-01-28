import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// 5 Biomas brasileiros com cores da bandeira do Brasil
const BIOMES = [
  { 
    name: 'Cultura', 
    color: '#009B3A',
    accentColor: '#00C853',
    position: { x: 0.2, y: 0.3 },
    regionRadius: 0.18,
    movementPattern: 'spiral',
    movementSpeed: 0.0008,
    chaos: 0.3,
    weight: 1.0 // Densidade normal
  },
  { 
    name: 'Negócios', 
    color: '#0066CC',
    accentColor: '#3399FF',
    position: { x: 0.8, y: 0.3 },
    regionRadius: 0.18,
    movementPattern: 'flow',
    movementSpeed: 0.0015,
    chaos: 0.7,
    weight: 1.4 // Mais partículas
  },
  { 
    name: 'Colaboração', 
    color: '#FFDF00',
    accentColor: '#FFE44D',
    position: { x: 0.25, y: 0.7 },
    regionRadius: 0.18,
    movementPattern: 'orbital',
    movementSpeed: 0.001,
    chaos: 0.4,
    weight: 0.6 // Menos partículas
  },
  { 
    name: 'Reconhecimento', 
    color: '#FFFFFF',
    accentColor: '#E8E8E8',
    position: { x: 0.75, y: 0.7 },
    regionRadius: 0.18,
    movementPattern: 'pulse',
    movementSpeed: 0.0012,
    chaos: 0.5,
    weight: 1.4 // Mais partículas
  },
  { 
    name: 'Ser Humano', 
    color: '#00A859',
    accentColor: '#00D966',
    position: { x: 0.5, y: 0.5 },
    regionRadius: 0.16,
    movementPattern: 'wave',
    movementSpeed: 0.001,
    chaos: 0.6,
    weight: 1.0 // Densidade normal
  }
];

const PARTICLE_COUNT = 4000;

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export default function BiomeMapCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize particles com distribuição ponderada
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      // Weighted random selection
      const totalWeight = BIOMES.reduce((sum, b) => sum + b.weight, 0);
      let random = Math.random() * totalWeight;
      let biome = BIOMES[0];
      
      for (const b of BIOMES) {
        random -= b.weight;
        if (random <= 0) {
          biome = b;
          break;
        }
      }
      
      const offsetX = (Math.random() - 0.5) * 0.35;
      const offsetY = (Math.random() - 0.5) * 0.35;
      
      return {
        x: biome.position.x + offsetX,
        y: biome.position.y + offsetY,
        vx: (Math.random() - 0.5) * 0.001,
        vy: (Math.random() - 0.5) * 0.001,
        primaryBiome: biome,
        angle: Math.random() * Math.PI * 2,
        phaseOffset: Math.random() * Math.PI * 2,
        size: Math.random() * 2.5 + 0.8,
        currentColor: hexToRgb(biome.color),
        transitionInfluence: 0.3
      };
    });

    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        const influences = BIOMES.map(biome => {
          const dx = particle.x - biome.position.x;
          const dy = particle.y - biome.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { biome, dist, dx, dy };
        }).sort((a, b) => a.dist - b.dist);
        
        const primaryBiome = influences[0].biome;
        const secondaryBiome = influences[1].biome;
        
        // Apply movement patterns
        switch(primaryBiome.movementPattern) {
          case 'spiral':
            particle.angle += primaryBiome.movementSpeed * 2;
            const spiralRadius = 0.15 + Math.sin(time * 0.5 + particle.phaseOffset) * 0.05;
            const spiralX = primaryBiome.position.x + Math.cos(particle.angle) * spiralRadius;
            const spiralY = primaryBiome.position.y + Math.sin(particle.angle) * spiralRadius;
            particle.vx += (spiralX - particle.x) * 0.0002;
            particle.vy += (spiralY - particle.y) * 0.0002;
            break;
            
          case 'flow':
            const flowDx = influences[0].dx;
            const flowDy = influences[0].dy;
            const flowDist = influences[0].dist;
            particle.vx += (-flowDx / flowDist) * 0.00015 * (1 + Math.sin(time * 3 + i) * 0.5);
            particle.vy += (-flowDy / flowDist) * 0.00015 * (1 + Math.cos(time * 3 + i) * 0.5);
            particle.vx += Math.sin(time * 2 + i * 0.5) * 0.0003;
            particle.vy += Math.cos(time * 2.5 + i * 0.5) * 0.0003;
            break;
            
          case 'orbital':
            particle.angle += primaryBiome.movementSpeed;
            const orbitX = primaryBiome.position.x + Math.cos(particle.angle + time) * 0.12;
            const orbitY = primaryBiome.position.y + Math.sin(particle.angle + time * 0.8) * 0.12;
            particle.vx += (orbitX - particle.x) * 0.00025;
            particle.vy += (orbitY - particle.y) * 0.00025;
            break;
            
          case 'pulse':
            const pulseFactor = Math.sin(time * 1.5 + particle.phaseOffset) * 0.5 + 0.5;
            const pulseDx = influences[0].dx;
            const pulseDy = influences[0].dy;
            const pulseDist = influences[0].dist;
            const pulseForce = 0.0001 * (0.5 + pulseFactor);
            particle.vx += (-pulseDx / pulseDist) * pulseForce;
            particle.vy += (-pulseDy / pulseDist) * pulseForce;
            break;
            
          case 'wave':
            const waveX = Math.sin(time * 1.2 + particle.y * 5 + particle.phaseOffset) * 0.0002;
            const waveY = Math.cos(time * 1.2 + particle.x * 5 + particle.phaseOffset) * 0.0002;
            particle.vx += waveX;
            particle.vy += waveY;
            const waveDx = influences[0].dx;
            const waveDy = influences[0].dy;
            const waveDist = influences[0].dist;
            particle.vx += (-waveDx / waveDist) * 0.00008;
            particle.vy += (-waveDy / waveDist) * 0.00008;
            break;
        }
        
        // Secondary biome influence
        if (secondaryBiome && influences[1].dist < 0.25) {
          const secondaryInfluence = (0.25 - influences[1].dist) / 0.25 * particle.transitionInfluence;
          particle.vx += (-influences[1].dx / influences[1].dist) * 0.00005 * secondaryInfluence;
          particle.vy += (-influences[1].dy / influences[1].dist) * 0.00005 * secondaryInfluence;
        }
        
        // Chaos
        const chaosLevel = primaryBiome.chaos;
        particle.vx += (Math.random() - 0.5) * 0.0001 * chaosLevel;
        particle.vy += (Math.random() - 0.5) * 0.0001 * chaosLevel;
        
        // Damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Parallax
        const parallaxStrength = 0.015;
        const px = (mouseRef.current.x - 0.5) * parallaxStrength;
        const py = (mouseRef.current.y - 0.5) * parallaxStrength;
        
        // Color mixing
        let targetColor = hexToRgb(primaryBiome.color);
        
        if (secondaryBiome && influences[1].dist < 0.2) {
          const mixFactor = (0.2 - influences[1].dist) / 0.2 * 0.4;
          const secondaryColor = hexToRgb(secondaryBiome.color);
          targetColor = {
            r: targetColor.r * (1 - mixFactor) + secondaryColor.r * mixFactor,
            g: targetColor.g * (1 - mixFactor) + secondaryColor.g * mixFactor,
            b: targetColor.b * (1 - mixFactor) + secondaryColor.b * mixFactor
          };
        }
        
        // Smooth color transition
        particle.currentColor.r += (targetColor.r - particle.currentColor.r) * 0.08;
        particle.currentColor.g += (targetColor.g - particle.currentColor.g) * 0.08;
        particle.currentColor.b += (targetColor.b - particle.currentColor.b) * 0.08;
        
        // Draw particle
        const screenX = (particle.x + px) * canvas.width;
        const screenY = (particle.y + py) * canvas.height;
        
        ctx.fillStyle = `rgba(${Math.round(particle.currentColor.r)}, ${Math.round(particle.currentColor.g)}, ${Math.round(particle.currentColor.b)}, 0.6)`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow for some particles
        if (i % 10 === 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${Math.round(particle.currentColor.r)}, ${Math.round(particle.currentColor.g)}, ${Math.round(particle.currentColor.b)}, 0.8)`;
          ctx.beginPath();
          ctx.arc(screenX, screenY, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#020617] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* Biome Labels - Melhorados (mantido) */}
      <div className="absolute inset-0 pointer-events-none">
        {BIOMES.map((biome) => (
          <div
            key={biome.name}
            className="absolute"
            style={{
              left: `${biome.position.x * 100}%`,
              top: `${biome.position.y * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="relative">
              <div 
                className="px-5 py-2.5 rounded-full backdrop-blur-xl border-2 shadow-2xl"
                style={{
                  background: 'rgba(2, 6, 23, 0.85)',
                  borderColor: `${biome.color}40`,
                  boxShadow: `0 0 30px ${biome.color}30, inset 0 0 20px rgba(0, 0, 0, 0.5)`,
                }}
              >
                <span 
                  className="text-sm font-semibold tracking-wide text-white"
                  style={{
                    textShadow: `0 0 10px ${biome.color}80`
                  }}
                >
                  {biome.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Title - Melhorado (mantido) */}
      <motion.div
        className="absolute top-12 left-0 right-0 text-center pointer-events-none w-full px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <a 
          href="https://ai.eco.br" 
          target="_blank" 
          rel="noopener noreferrer"
          className="pointer-events-auto inline-block"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 hover:opacity-80 transition-opacity duration-300"
              style={{
                textShadow: '0 0 60px rgba(0, 155, 58, 0.8), 0 0 30px rgba(0, 155, 58, 0.6), 0 4px 20px rgba(0, 0, 0, 0.8)'
              }}>
            Sandbox - Ecossistema
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-green-300/90 font-medium"
             style={{
               textShadow: '0 0 20px rgba(0, 200, 100, 0.5), 0 2px 10px rgba(0, 0, 0, 0.5)'
             }}>
            Invite Only - Apenas por Convite
          </p>
        </a>
      </motion.div>
      
      {/* Breathing gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 155, 58, 0.2) 0%, transparent 50%)'
        }}
      />
    </div>
  );
}
