import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 5 Biomas brasileiros com cores da bandeira do Brasil
const BIOMES = [
  { 
    name: 'Ética', 
    color: '#009B3A', // Verde bandeira
    accentColor: '#00C853',
    position: { x: 0.2, y: 0.3 },
    regionRadius: 0.18,
    // Caatinga - Movimento em espiral, resiliente e persistente
    movementPattern: 'spiral',
    movementSpeed: 0.0008,
    chaos: 0.3
  },
  { 
    name: 'Inovação', 
    color: '#0066CC', // Azul bandeira (mais claro para visibilidade)
    accentColor: '#3399FF',
    position: { x: 0.8, y: 0.3 },
    regionRadius: 0.18,
    // Amazônia - Movimento fluido como rios, rápido e caótico
    movementPattern: 'flow',
    movementSpeed: 0.0015,
    chaos: 0.7
  },
  { 
    name: 'Colaboração', 
    color: '#FFDF00', // Amarelo bandeira
    accentColor: '#FFE44D',
    position: { x: 0.25, y: 0.7 },
    regionRadius: 0.18,
    // Mata Atlântica - Movimento orbital, interconectado
    movementPattern: 'orbital',
    movementSpeed: 0.001,
    chaos: 0.4
  },
  { 
    name: 'Sustentabilidade', 
    color: '#FFFFFF', // Branco bandeira
    accentColor: '#F0F0F0',
    position: { x: 0.75, y: 0.7 },
    regionRadius: 0.18,
    // Cerrado - Movimento pulsante, ciclos e ritmos
    movementPattern: 'pulse',
    movementSpeed: 0.0012,
    chaos: 0.5
  },
  { 
    name: 'Humanidade', 
    color: '#00A859', // Verde claro (variação do verde bandeira)
    accentColor: '#00D966',
    position: { x: 0.5, y: 0.5 },
    regionRadius: 0.16,
    // Pantanal - Movimento ondulatório, fluido e adaptável
    movementPattern: 'wave',
    movementSpeed: 0.001,
    chaos: 0.6
  }
];

const PARTICLE_COUNT = 4000; // Mais partículas para melhor sobreposição

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function lerpColor(color1, color2, t) {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t)
  };
}

export default function BiomeMapCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const [hoveredBiome, setHoveredBiome] = useState(null);
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

    // Initialize particles - distribuídas para permitir sobreposição
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const biome = BIOMES[Math.floor(Math.random() * BIOMES.length)];
      const offsetX = (Math.random() - 0.5) * 0.35; // Maior dispersão
      const offsetY = (Math.random() - 0.5) * 0.35;
      
      return {
        x: biome.position.x + offsetX,
        y: biome.position.y + offsetY,
        vx: (Math.random() - 0.5) * 0.001,
        vy: (Math.random() - 0.5) * 0.001,
        primaryBiome: biome,
        angle: Math.random() * Math.PI * 2, // Para movimentos circulares
        phaseOffset: Math.random() * Math.PI * 2, // Para variação
        size: Math.random() * 2.5 + 0.8,
        currentColor: hexToRgb(biome.color),
        transitionInfluence: 0.3 // Permite influência de biomas vizinhos
      };
    });

    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Encontrar biomas influentes (primário e secundários para sobreposição)
        const influences = BIOMES.map(biome => {
          const dx = particle.x - biome.position.x;
          const dy = particle.y - biome.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { biome, dist, dx, dy };
        }).sort((a, b) => a.dist - b.dist);
        
        const primaryBiome = influences[0].biome;
        const secondaryBiome = influences[1].biome;
        
        // Aplicar padrão de movimento único do bioma primário
        switch(primaryBiome.movementPattern) {
          case 'spiral':
            // Caatinga - Espiral para dentro/fora
            particle.angle += primaryBiome.movementSpeed * 2;
            const spiralRadius = 0.15 + Math.sin(time * 0.5 + particle.phaseOffset) * 0.05;
            const spiralX = primaryBiome.position.x + Math.cos(particle.angle) * spiralRadius;
            const spiralY = primaryBiome.position.y + Math.sin(particle.angle) * spiralRadius;
            particle.vx += (spiralX - particle.x) * 0.0002;
            particle.vy += (spiralY - particle.y) * 0.0002;
            break;
            
          case 'flow':
            // Amazônia - Fluxo rápido e caótico como rios
            const flowDx = influences[0].dx;
            const flowDy = influences[0].dy;
            const flowDist = influences[0].dist;
            particle.vx += (-flowDx / flowDist) * 0.00015 * (1 + Math.sin(time * 3 + i) * 0.5);
            particle.vy += (-flowDy / flowDist) * 0.00015 * (1 + Math.cos(time * 3 + i) * 0.5);
            // Turbulência extra
            particle.vx += Math.sin(time * 2 + i * 0.5) * 0.0003;
            particle.vy += Math.cos(time * 2.5 + i * 0.5) * 0.0003;
            break;
            
          case 'orbital':
            // Mata Atlântica - Órbitas interconectadas
            particle.angle += primaryBiome.movementSpeed;
            const orbitX = primaryBiome.position.x + Math.cos(particle.angle + time) * 0.12;
            const orbitY = primaryBiome.position.y + Math.sin(particle.angle + time * 0.8) * 0.12;
            particle.vx += (orbitX - particle.x) * 0.00025;
            particle.vy += (orbitY - particle.y) * 0.00025;
            break;
            
          case 'pulse':
            // Cerrado - Pulsação rítmica
            const pulseFactor = Math.sin(time * 1.5 + particle.phaseOffset) * 0.5 + 0.5;
            const pulseDx = influences[0].dx;
            const pulseDy = influences[0].dy;
            const pulseDist = influences[0].dist;
            const pulseForce = 0.0001 * (0.5 + pulseFactor);
            particle.vx += (-pulseDx / pulseDist) * pulseForce;
            particle.vy += (-pulseDy / pulseDist) * pulseForce;
            break;
            
          case 'wave':
            // Pantanal - Ondas fluidas e adaptáveis
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
        
        // Adicionar influência do bioma secundário (sobreposição)
        if (secondaryBiome && influences[1].dist < 0.25) {
          const secondaryInfluence = (0.25 - influences[1].dist) / 0.25 * particle.transitionInfluence;
          particle.vx += (-influences[1].dx / influences[1].dist) * 0.00005 * secondaryInfluence;
          particle.vy += (-influences[1].dy / influences[1].dist) * 0.00005 * secondaryInfluence;
        }
        
        // Caos e aleatoriedade por bioma
        const chaosLevel = primaryBiome.chaos;
        particle.vx += (Math.random() - 0.5) * 0.0001 * chaosLevel;
        particle.vy += (Math.random() - 0.5) * 0.0001 * chaosLevel;
        
        // Damping suave
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Mouse parallax effect (subtle)
        const parallaxStrength = 0.015;
        const px = (mouseRef.current.x - 0.5) * parallaxStrength;
        const py = (mouseRef.current.y - 0.5) * parallaxStrength;
        
        // Mistura de cores entre biomas (sobreposição visual)
        let targetColor = hexToRgb(primaryBiome.color);
        
        // Se próximo de outro bioma, misturar cores
        if (secondaryBiome && influences[1].dist < 0.2) {
          const mixFactor = (0.2 - influences[1].dist) / 0.2 * 0.4;
          const secondaryColor = hexToRgb(secondaryBiome.color);
          targetColor = {
            r: targetColor.r * (1 - mixFactor) + secondaryColor.r * mixFactor,
            g: targetColor.g * (1 - mixFactor) + secondaryColor.g * mixFactor,
            b: targetColor.b * (1 - mixFactor) + secondaryColor.b * mixFactor
          };
        }
        
        // Hover pulse effect
        if (hoveredBiome === 0 && primaryBiome.name === 'Ética') {
          const pulse = Math.sin(time * 3) * 0.5 + 0.5;
          targetColor = lerpColor(primaryBiome.color, primaryBiome.accentColor, pulse);
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
        
        // Add glow for some particles
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
  }, [hoveredBiome]);

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
      
      {/* Biome Labels */}
      <div className="absolute inset-0 pointer-events-none">
        {BIOMES.map((biome, index) => (
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
              {/* Label */}
              <div 
                className="px-4 py-2 rounded-full backdrop-blur-md border"
                style={{
                  background: 'rgba(2, 6, 23, 0.7)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <span 
                  className="text-sm font-medium tracking-wide text-white"
                >
                  {biome.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Title */}
      <motion.div
        className="absolute top-12 left-1/2 -translate-x-1/2 text-center pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 className="text-6xl font-bold text-white mb-2"
            style={{
              textShadow: '0 0 40px rgba(0, 155, 58, 0.5)'
            }}>
          Ecossistema de Inteligência Artificial
        </h1>
        <p className="text-xl text-green-300/80">Comunidade Brasileira de IA Humanista</p>
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
            background: 'linear-gradient(135deg, #009B3A 0%, #00A859 100%)',
            boxShadow: '0 0 30px rgba(0, 155, 58, 0.4)',
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 0 50px rgba(0, 155, 58, 0.6)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 0 30px rgba(0, 155, 58, 0.4)';
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
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 155, 58, 0.1) 0%, transparent 50%)'
        }}
      />
    </div>
  );
}
