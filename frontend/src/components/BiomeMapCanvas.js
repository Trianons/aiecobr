import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ControlPanel from './ControlPanel';

// 5 Biomas brasileiros - Disposição em pirâmide ajustada
const BIOMES = [
  { 
    name: 'Cultura', 
    color: '#009B3A',
    accentColor: '#00C853',
    position: { x: 0.25, y: 0.75 }, // Base esquerda
    regionRadius: 0.18,
    movementPattern: 'spiral',
    movementSpeed: 0.0008,
    chaos: 0.3,
    weight: 1.0
  },
  { 
    name: 'Negócios', 
    color: '#0066CC',
    accentColor: '#3399FF',
    position: { x: 0.65, y: 0.5 }, // Entre Reconhecimento e Colaboração
    regionRadius: 0.15, // Reduzir raio para mais concentração
    movementPattern: 'flow',
    movementSpeed: 0.002, // Aumentar velocidade (era 0.0015)
    chaos: 0.5, // Reduzir caos para mais concentração (era 0.7)
    weight: 1.4,
    attractionForce: 1.8 // Nova força de atração mais forte
  },
  { 
    name: 'Colaboração', 
    color: '#FFDF00',
    accentColor: '#FFE44D',
    position: { x: 0.75, y: 0.75 }, // Base direita
    regionRadius: 0.18,
    movementPattern: 'orbital',
    movementSpeed: 0.001,
    chaos: 0.4,
    weight: 0.45 // Reduzido de 0.6 para 0.45 (menos 25%)
  },
  { 
    name: 'Reconhecimento', 
    color: '#FFFFFF',
    accentColor: '#E8E8E8',
    position: { x: 0.5, y: 0.25 }, // Topo centro
    regionRadius: 0.18,
    movementPattern: 'pulse',
    movementSpeed: 0.0012,
    chaos: 0.5,
    weight: 1.4
  },
  { 
    name: 'Ser Humano', 
    color: '#00A859',
    accentColor: '#00D966',
    position: { x: 0.5, y: 0.58 }, // Centro equidistante entre Reconhecimento, Cultura e Colaboração
    regionRadius: 0.16,
    movementPattern: 'wave',
    movementSpeed: 0.001,
    chaos: 0.6,
    weight: 1.0
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
  
  // Estado reativo para os biomas
  const [biomes, setBiomes] = useState([
    { 
      name: 'Cultura', 
      color: '#009B3A',
      accentColor: '#00C853',
      position: { x: 0.25, y: 0.75 },
      regionRadius: 0.25,
      movementPattern: 'spiral',
      movementSpeed: 0.0006,
      chaos: 0.5,
      weight: 2.5,
      repelForce: 0.5,
      link: 'https://ai.eco.br/'
    },
    { 
      name: 'Negócios', 
      color: '#0066CC',
      accentColor: '#3399FF',
      position: { x: 0.65, y: 0.5 },
      regionRadius: 0.15,
      movementPattern: 'flow',
      movementSpeed: 0.002,
      chaos: 0.5,
      weight: 0.6,
      attractionForce: 1.2,
      link: 'https://aibrasil.com.br/'
    },
    { 
      name: 'Colaboração', 
      color: '#FFDF00',
      accentColor: '#FFE44D',
      position: { x: 0.75, y: 0.75 },
      regionRadius: 0.18,
      movementPattern: 'orbital',
      movementSpeed: 0.0011,
      chaos: 0.35,
      weight: 0.45,
      attractionForce: 0.8,
      link: 'https://ai.eco.br/'
    },
    { 
      name: 'Reconhecimento', 
      color: '#FFFFFF',
      accentColor: '#E8E8E8',
      position: { x: 0.5, y: 0.25 },
      regionRadius: 0.22,
      movementPattern: 'pulse',
      movementSpeed: 0.0020,
      chaos: 0.75,
      weight: 0.4,
      repelForce: 1.5,
      flowThrough: true,
      link: 'https://aibrasilexperience.com/'
    },
    { 
      name: 'Ser Humano', 
      color: '#00A859',
      accentColor: '#00D966',
      position: { x: 0.5, y: 0.58 },
      regionRadius: 0.18,
      movementPattern: 'wave',
      movementSpeed: 0.0014,
      chaos: 0.95,
      weight: 1.0,
      egoForce: 2.5,
      isMutant: true,
      colorCycle: ['#009B3A', '#0066CC', '#FFDF00', '#FFFFFF', '#00A859', '#ec4899', '#a78bfa', '#22d3ee'],
      link: '' // Link customizável
    }
  ]);
  
  const [customBiomes, setCustomBiomes] = useState([]);
  
  const biomesRef = useRef(biomes);
  const customBiomesRef = useRef(customBiomes);
  
  // Atualizar refs quando mudar
  useEffect(() => {
    biomesRef.current = biomes;
  }, [biomes]);
  
  useEffect(() => {
    customBiomesRef.current = customBiomes;
  }, [customBiomes]);
  
  const handleBiomeUpdate = (biomeName, property, value) => {
    setBiomes(prevBiomes => 
      prevBiomes.map(biome => {
        if (biome.name === biomeName) {
          if (property.includes('.')) {
            const [parent, child] = property.split('.');
            return {
              ...biome,
              [parent]: {
                ...biome[parent],
                [child]: value
              }
            };
          }
          return { ...biome, [property]: value };
        }
        return biome;
      })
    );
  };
  
  const handleAddCustomBiome = (customBiome) => {
    setCustomBiomes(prev => [...prev, customBiome]);
  };
  
  const handleRemoveCustomBiome = (index) => {
    setCustomBiomes(prev => prev.filter((_, i) => i !== index));
  };

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
      const currentBiomes = biomesRef.current;
      const totalWeight = currentBiomes.reduce((sum, b) => sum + b.weight, 0);
      let random = Math.random() * totalWeight;
      let biome = currentBiomes[0];
      
      for (const b of currentBiomes) {
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
        const currentBiomes = biomesRef.current;
        const influences = currentBiomes.map(biome => {
          const dx = particle.x - biome.position.x;
          const dy = particle.y - biome.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { biome, dist, dx, dy };
        }).sort((a, b) => a.dist - b.dist);
        
        const primaryBiome = influences[0].biome;
        const secondaryBiome = influences[1].biome;
        
        // FORÇA DO EGO - Ser Humano sempre influencia TODAS as partículas próximas
        const serHumanoBiome = currentBiomes.find(b => b.name === 'Ser Humano');
        if (serHumanoBiome) {
          const dx = particle.x - serHumanoBiome.position.x;
          const dy = particle.y - serHumanoBiome.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          // Força do ego diminui com distância mas sempre presente
          if (dist < 0.4) { // Raio de influência do ego
            const egoInfluence = (0.4 - dist) / 0.4;
            const egoForce = (serHumanoBiome.egoForce || 1.0) * 0.00008 * egoInfluence;
            
            // Ego atrai partículas
            particle.vx += (-dx / dist) * egoForce;
            particle.vy += (-dy / dist) * egoForce;
            
            // Adiciona caos extra (ego é imprevisível)
            particle.vx += (Math.random() - 0.5) * 0.0003 * egoInfluence;
            particle.vy += (Math.random() - 0.5) * 0.0003 * egoInfluence;
          }
        }
        
        // Apply movement patterns
        switch(primaryBiome.movementPattern) {
          case 'spiral':
            particle.angle += primaryBiome.movementSpeed * 2;
            const spiralRadius = 0.15 + Math.sin(time * 0.5 + particle.phaseOffset) * 0.05;
            const spiralX = primaryBiome.position.x + Math.cos(particle.angle) * spiralRadius;
            const spiralY = primaryBiome.position.y + Math.sin(particle.angle) * spiralRadius;
            const spiralForce = 0.0002;
            particle.vx += (spiralX - particle.x) * spiralForce;
            particle.vy += (spiralY - particle.y) * spiralForce;
            
            // Cultura: força de repulsão para dispersão
            if (primaryBiome.repelForce) {
              const repelDist = influences[0].dist;
              if (repelDist < 0.08) { // Muito perto do centro
                particle.vx += (influences[0].dx / repelDist) * 0.00005 * primaryBiome.repelForce;
                particle.vy += (influences[0].dy / repelDist) * 0.00005 * primaryBiome.repelForce;
              }
            }
            break;
            
          case 'flow':
            const flowDx = influences[0].dx;
            const flowDy = influences[0].dy;
            const flowDist = influences[0].dist;
            // Usar força personalizada se disponível, senão usar padrão
            const flowForce = primaryBiome.attractionForce || 1.0;
            particle.vx += (-flowDx / flowDist) * 0.00015 * flowForce * (1 + Math.sin(time * 3 + i) * 0.5);
            particle.vy += (-flowDy / flowDist) * 0.00015 * flowForce * (1 + Math.cos(time * 3 + i) * 0.5);
            particle.vx += Math.sin(time * 2 + i * 0.5) * 0.0003;
            particle.vy += Math.cos(time * 2.5 + i * 0.5) * 0.0003;
            break;
            
          case 'orbital':
            particle.angle += primaryBiome.movementSpeed;
            const orbitX = primaryBiome.position.x + Math.cos(particle.angle + time) * 0.12;
            const orbitY = primaryBiome.position.y + Math.sin(particle.angle + time * 0.8) * 0.12;
            const orbitForce = (primaryBiome.attractionForce || 1.0) * 0.00025;
            particle.vx += (orbitX - particle.x) * orbitForce;
            particle.vy += (orbitY - particle.y) * orbitForce;
            break;
            
          case 'pulse':
            const pulseFactor = Math.sin(time * 1.5 + particle.phaseOffset) * 0.5 + 0.5;
            const pulseDx = influences[0].dx;
            const pulseDy = influences[0].dy;
            const pulseDist = influences[0].dist;
            
            // Reconhecimento: sistema de fluxo perene - atrai quando longe, repele quando perto
            if (primaryBiome.flowThrough) {
              if (pulseDist > 0.1) {
                // Atração suave quando longe
                const pulseForce = 0.00006 * (0.5 + pulseFactor);
                particle.vx += (-pulseDx / pulseDist) * pulseForce;
                particle.vy += (-pulseDy / pulseDist) * pulseForce;
              } else if (pulseDist < 0.08) {
                // Repulsão forte quando muito perto - redistribui partículas
                const repelStrength = (0.08 - pulseDist) / 0.08;
                particle.vx += (pulseDx / pulseDist) * 0.0002 * repelStrength * primaryBiome.repelForce;
                particle.vy += (pulseDy / pulseDist) * 0.0002 * repelStrength * primaryBiome.repelForce;
                
                // Empurra para outros biomas aleatoriamente
                const targetBiome = currentBiomes[Math.floor(Math.random() * currentBiomes.length)];
                const redirectDx = targetBiome.position.x - particle.x;
                const redirectDy = targetBiome.position.y - particle.y;
                const redirectDist = Math.sqrt(redirectDx * redirectDx + redirectDy * redirectDy);
                particle.vx += (redirectDx / redirectDist) * 0.00008;
                particle.vy += (redirectDy / redirectDist) * 0.00008;
              }
            } else {
              // Padrão normal de pulsação
              const pulseForce = 0.0001 * (0.5 + pulseFactor);
              particle.vx += (-pulseDx / pulseDist) * pulseForce;
              particle.vy += (-pulseDy / pulseDist) * pulseForce;
            }
            break;
            
          case 'wave':
            const waveX = Math.sin(time * 1.2 + particle.y * 5 + particle.phaseOffset) * 0.0002;
            const waveY = Math.cos(time * 1.2 + particle.x * 5 + particle.phaseOffset) * 0.0002;
            particle.vx += waveX;
            particle.vy += waveY;
            const waveDx = influences[0].dx;
            const waveDy = influences[0].dy;
            const waveDist = influences[0].dist;
            
            // Ser Humano tem força ego extra - atração forte mas também repele quando muito perto
            const egoForce = (primaryBiome.egoForce || 1.0) * 0.00012;
            if (waveDist > 0.05) {
              // Atração normal
              particle.vx += (-waveDx / waveDist) * egoForce;
              particle.vy += (-waveDy / waveDist) * egoForce;
            } else {
              // Repulsão quando muito perto (ego pessoal)
              particle.vx += (waveDx / waveDist) * egoForce * 0.3;
              particle.vy += (waveDy / waveDist) * egoForce * 0.3;
            }
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
        
        // Ser Humano: COR MUTANTE - muda ciclicamente
        if (primaryBiome.isMutant && primaryBiome.colorCycle) {
          const cycleSpeed = 0.5; // Velocidade do ciclo de cores
          const cycleIndex = Math.floor((time * cycleSpeed + particle.phaseOffset) % primaryBiome.colorCycle.length);
          const nextIndex = (cycleIndex + 1) % primaryBiome.colorCycle.length;
          const cycleProgress = ((time * cycleSpeed + particle.phaseOffset) % 1);
          
          const color1 = hexToRgb(primaryBiome.colorCycle[cycleIndex]);
          const color2 = hexToRgb(primaryBiome.colorCycle[nextIndex]);
          
          targetColor = {
            r: color1.r * (1 - cycleProgress) + color2.r * cycleProgress,
            g: color1.g * (1 - cycleProgress) + color2.g * cycleProgress,
            b: color1.b * (1 - cycleProgress) + color2.b * cycleProgress
          };
        }
        
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
        {biomes.map((biome) => (
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
      {/* Control Panel */}
      <ControlPanel 
        biomes={biomes} 
        onUpdate={handleBiomeUpdate}
        customBiomes={customBiomes}
        onAddCustomBiome={handleAddCustomBiome}
        onRemoveCustomBiome={handleRemoveCustomBiome}
      />
      
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
