import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 5 Biomas brasileiros com cores da bandeira do Brasil
const BIOMES = [
  { 
    name: 'Ética', 
    color: '#009B3A',
    accentColor: '#00C853',
    position: { x: 0.2, y: 0.3 },
    regionRadius: 0.18,
    movementPattern: 'spiral',
    movementSpeed: 0.0008,
    chaos: 0.3
  },
  { 
    name: 'Inovação', 
    color: '#0066CC',
    accentColor: '#3399FF',
    position: { x: 0.8, y: 0.3 },
    regionRadius: 0.18,
    movementPattern: 'flow',
    movementSpeed: 0.0015,
    chaos: 0.7
  },
  { 
    name: 'Colaboração', 
    color: '#FFDF00',
    accentColor: '#FFE44D',
    position: { x: 0.25, y: 0.7 },
    regionRadius: 0.18,
    movementPattern: 'orbital',
    movementSpeed: 0.001,
    chaos: 0.4
  },
  { 
    name: 'Sustentabilidade', 
    color: '#FFFFFF',
    accentColor: '#E8E8E8',
    position: { x: 0.75, y: 0.7 },
    regionRadius: 0.18,
    movementPattern: 'pulse',
    movementSpeed: 0.0012,
    chaos: 0.5
  },
  { 
    name: 'Humanidade', 
    color: '#00A859',
    accentColor: '#00D966',
    position: { x: 0.5, y: 0.5 },
    regionRadius: 0.16,
    movementPattern: 'wave',
    movementSpeed: 0.001,
    chaos: 0.6
  }
];

const PARTICLE_COUNT = 6000; // Aumentado para mais impacto visual

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
  const animationRef = useRef(null);
  const fpsRef = useRef({ lastTime: 0, frames: 0, fps: 60 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { 
      alpha: false,
      desynchronized: true // Performance boost
    });
    
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2); // Limitar para performance
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Inicializar partículas com trails
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const biome = BIOMES[Math.floor(Math.random() * BIOMES.length)];
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
        size: Math.random() * 3 + 1,
        currentColor: hexToRgb(biome.color),
        transitionInfluence: 0.3,
        life: Math.random(), // Para variação de brilho
        trail: [] // Array para rastro
      };
    });

    let startTime = Date.now();
    let lastFrameTime = startTime;

    const animate = (currentTime) => {
      const time = (currentTime - startTime) / 1000;
      const deltaTime = Math.min((currentTime - lastFrameTime) / 16.67, 2);
      lastFrameTime = currentTime;

      // FPS counter
      fpsRef.current.frames++;
      if (currentTime - fpsRef.current.lastTime >= 1000) {
        fpsRef.current.fps = fpsRef.current.frames;
        fpsRef.current.frames = 0;
        fpsRef.current.lastTime = currentTime;
      }

      // Clear canvas completamente para nova frame
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Background com gradiente mais rico (mas não muito escuro)
      const gradient = ctx.createRadialGradient(
        window.innerWidth / 2, 
        window.innerHeight / 2, 
        0,
        window.innerWidth / 2, 
        window.innerHeight / 2, 
        Math.max(window.innerWidth, window.innerHeight) / 2
      );
      gradient.addColorStop(0, 'rgba(2, 6, 23, 0.3)');
      gradient.addColorStop(0.5, 'rgba(1, 4, 15, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 2, 10, 0.1)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Desenhar nebulosas de fundo (camada de profundidade) - mais suaves
      BIOMES.forEach((biome, index) => {
        const nebulaGradient = ctx.createRadialGradient(
          biome.position.x * window.innerWidth,
          biome.position.y * window.innerHeight,
          0,
          biome.position.x * window.innerWidth,
          biome.position.y * window.innerHeight,
          200 + Math.sin(time + index) * 50
        );
        const color = hexToRgb(biome.color);
        nebulaGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`);
        nebulaGradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.03)`);
        nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = nebulaGradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      });

      particlesRef.current.forEach((particle, i) => {
        // Calcular influências dos biomas
        const influences = BIOMES.map(biome => {
          const dx = particle.x - biome.position.x;
          const dy = particle.y - biome.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return { biome, dist, dx, dy };
        }).sort((a, b) => a.dist - b.dist);
        
        const primaryBiome = influences[0].biome;
        const secondaryBiome = influences[1].biome;
        
        // Aplicar padrões de movimento únicos (otimizados)
        switch(primaryBiome.movementPattern) {
          case 'spiral':
            particle.angle += primaryBiome.movementSpeed * 2 * deltaTime;
            const spiralRadius = 0.15 + Math.sin(time * 0.5 + particle.phaseOffset) * 0.05;
            const spiralX = primaryBiome.position.x + Math.cos(particle.angle) * spiralRadius;
            const spiralY = primaryBiome.position.y + Math.sin(particle.angle) * spiralRadius;
            particle.vx += (spiralX - particle.x) * 0.0002 * deltaTime;
            particle.vy += (spiralY - particle.y) * 0.0002 * deltaTime;
            break;
            
          case 'flow':
            const flowDx = influences[0].dx;
            const flowDy = influences[0].dy;
            const flowDist = influences[0].dist;
            particle.vx += (-flowDx / flowDist) * 0.00015 * (1 + Math.sin(time * 3 + i) * 0.5) * deltaTime;
            particle.vy += (-flowDy / flowDist) * 0.00015 * (1 + Math.cos(time * 3 + i) * 0.5) * deltaTime;
            particle.vx += Math.sin(time * 2 + i * 0.5) * 0.0003 * deltaTime;
            particle.vy += Math.cos(time * 2.5 + i * 0.5) * 0.0003 * deltaTime;
            break;
            
          case 'orbital':
            particle.angle += primaryBiome.movementSpeed * deltaTime;
            const orbitX = primaryBiome.position.x + Math.cos(particle.angle + time) * 0.12;
            const orbitY = primaryBiome.position.y + Math.sin(particle.angle + time * 0.8) * 0.12;
            particle.vx += (orbitX - particle.x) * 0.00025 * deltaTime;
            particle.vy += (orbitY - particle.y) * 0.00025 * deltaTime;
            break;
            
          case 'pulse':
            const pulseFactor = Math.sin(time * 1.5 + particle.phaseOffset) * 0.5 + 0.5;
            const pulseDx = influences[0].dx;
            const pulseDy = influences[0].dy;
            const pulseDist = influences[0].dist;
            const pulseForce = 0.0001 * (0.5 + pulseFactor);
            particle.vx += (-pulseDx / pulseDist) * pulseForce * deltaTime;
            particle.vy += (-pulseDy / pulseDist) * pulseForce * deltaTime;
            break;
            
          case 'wave':
            const waveX = Math.sin(time * 1.2 + particle.y * 5 + particle.phaseOffset) * 0.0002 * deltaTime;
            const waveY = Math.cos(time * 1.2 + particle.x * 5 + particle.phaseOffset) * 0.0002 * deltaTime;
            particle.vx += waveX;
            particle.vy += waveY;
            const waveDx = influences[0].dx;
            const waveDy = influences[0].dy;
            const waveDist = influences[0].dist;
            particle.vx += (-waveDx / waveDist) * 0.00008 * deltaTime;
            particle.vy += (-waveDy / waveDist) * 0.00008 * deltaTime;
            break;
        }
        
        // Influência do bioma secundário
        if (secondaryBiome && influences[1].dist < 0.25) {
          const secondaryInfluence = (0.25 - influences[1].dist) / 0.25 * particle.transitionInfluence;
          particle.vx += (-influences[1].dx / influences[1].dist) * 0.00005 * secondaryInfluence * deltaTime;
          particle.vy += (-influences[1].dy / influences[1].dist) * 0.00005 * secondaryInfluence * deltaTime;
        }
        
        // Caos
        const chaosLevel = primaryBiome.chaos;
        particle.vx += (Math.random() - 0.5) * 0.0001 * chaosLevel * deltaTime;
        particle.vy += (Math.random() - 0.5) * 0.0001 * chaosLevel * deltaTime;
        
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
        
        // Mistura de cores
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
        
        // Transição de cor suave
        particle.currentColor.r += (targetColor.r - particle.currentColor.r) * 0.08;
        particle.currentColor.g += (targetColor.g - particle.currentColor.g) * 0.08;
        particle.currentColor.b += (targetColor.b - particle.currentColor.b) * 0.08;
        
        // Variação de vida para pulsação
        particle.life += 0.02 * deltaTime;
        const lifeFactor = (Math.sin(particle.life) * 0.3 + 0.7);
        
        // Posição na tela
        const screenX = (particle.x + px) * window.innerWidth;
        const screenY = (particle.y + py) * window.innerHeight;
        
        // Culling - não desenhar partículas fora da tela (otimização)
        if (screenX < -50 || screenX > window.innerWidth + 50 || 
            screenY < -50 || screenY > window.innerHeight + 50) {
          return;
        }
        
        // Trail/Rastro (apenas para partículas maiores)
        if (particle.size > 2) {
          particle.trail.push({ x: screenX, y: screenY });
          if (particle.trail.length > 5) {
            particle.trail.shift();
          }
          
          // Desenhar trail
          particle.trail.forEach((pos, idx) => {
            const trailAlpha = (idx / particle.trail.length) * 0.3 * lifeFactor;
            const trailSize = particle.size * (idx / particle.trail.length) * 0.5;
            ctx.fillStyle = `rgba(${Math.round(particle.currentColor.r)}, ${Math.round(particle.currentColor.g)}, ${Math.round(particle.currentColor.b)}, ${trailAlpha})`;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, trailSize, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        
        // Desenhar partícula principal com glow melhorado
        const alpha = 0.9 * lifeFactor;
        
        // Glow externo (mais visível)
        const glowGradient = ctx.createRadialGradient(
          screenX, screenY, 0,
          screenX, screenY, particle.size * 4
        );
        glowGradient.addColorStop(0, `rgba(${Math.round(particle.currentColor.r)}, ${Math.round(particle.currentColor.g)}, ${Math.round(particle.currentColor.b)}, ${alpha * 0.8})`);
        glowGradient.addColorStop(0.4, `rgba(${Math.round(particle.currentColor.r)}, ${Math.round(particle.currentColor.g)}, ${Math.round(particle.currentColor.b)}, ${alpha * 0.4})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Core da partícula (muito brilhante e visível)
        ctx.fillStyle = `rgba(${Math.round(particle.currentColor.r)}, ${Math.round(particle.currentColor.g)}, ${Math.round(particle.currentColor.b)}, 1)`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Highlight no centro para mais brilho
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(performance.now());

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
      
      {/* Biome Labels com glassmorphism melhorado */}
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
      
      {/* Title com sombra melhorada */}
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
      
      {/* Breathing gradient overlay melhorado */}
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
