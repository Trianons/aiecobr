import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// 5 Biomas brasileiros
const BIOMES = [
  { 
    name: 'Ética', 
    color: '#a78bfa', 
    accentColor: '#fb923c',
    position: { x: 0.2, y: 0.3 },
    regionRadius: 0.15
  },
  { 
    name: 'Inovação', 
    color: '#22d3ee', 
    accentColor: '#3b82f6',
    position: { x: 0.8, y: 0.3 },
    regionRadius: 0.15
  },
  { 
    name: 'Colaboração', 
    color: '#10b981', 
    accentColor: '#fbbf24',
    position: { x: 0.25, y: 0.7 },
    regionRadius: 0.15
  },
  { 
    name: 'Sustentabilidade', 
    color: '#f59e0b', 
    accentColor: '#eab308',
    position: { x: 0.75, y: 0.7 },
    regionRadius: 0.15
  },
  { 
    name: 'Humanidade', 
    color: '#ec4899', 
    accentColor: '#f472b6',
    position: { x: 0.5, y: 0.5 },
    regionRadius: 0.12
  }
];

const PARTICLE_COUNT = 3000;

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

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const biome = BIOMES[Math.floor(Math.random() * BIOMES.length)];
      const offsetX = (Math.random() - 0.5) * 0.2;
      const offsetY = (Math.random() - 0.5) * 0.2;
      
      return {
        x: biome.position.x + offsetX,
        y: biome.position.y + offsetY,
        vx: (Math.random() - 0.5) * 0.0005,
        vy: (Math.random() - 0.5) * 0.0005,
        biome: biome,
        size: Math.random() * 2 + 1,
        currentColor: hexToRgb(biome.color)
      };
    });

    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Find closest biome
        let minDist = Infinity;
        let closestBiome = BIOMES[0];
        
        for (const biome of BIOMES) {
          const dx = particle.x - biome.position.x;
          const dy = particle.y - biome.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            closestBiome = biome;
          }
        }

        // Attractor force
        const dx = closestBiome.position.x - particle.x;
        const dy = closestBiome.position.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = 0.00001;
        
        particle.vx += (dx / dist) * force;
        particle.vy += (dy / dist) * force;
        
        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Noise
        particle.vx += Math.sin(time + i * 0.1) * 0.00001;
        particle.vy += Math.cos(time + i * 0.1) * 0.00001;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Mouse parallax effect (subtle)
        const parallaxStrength = 0.01;
        const px = (mouseRef.current.x - 0.5) * parallaxStrength;
        const py = (mouseRef.current.y - 0.5) * parallaxStrength;
        
        // Color animation
        let targetColor = hexToRgb(closestBiome.color);
        if (hoveredBiome === 0 && closestBiome.name === 'Ética') {
          const pulse = Math.sin(time * 3) * 0.5 + 0.5;
          targetColor = lerpColor(closestBiome.color, closestBiome.accentColor, pulse);
        }
        
        // Smooth color transition
        particle.currentColor.r += (targetColor.r - particle.currentColor.r) * 0.05;
        particle.currentColor.g += (targetColor.g - particle.currentColor.g) * 0.05;
        particle.currentColor.b += (targetColor.b - particle.currentColor.b) * 0.05;
        
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
          <motion.div
            key={biome.name}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${biome.position.x * 100}%`,
              top: `${biome.position.y * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setHoveredBiome(index)}
            onMouseLeave={() => setHoveredBiome(null)}
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
                    ? `radial-gradient(circle, ${biome.color} 0%, transparent 70%)`
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
                    ? `${biome.color}20`
                    : 'rgba(2, 6, 23, 0.6)',
                  borderColor: hoveredBiome === index 
                    ? biome.color
                    : 'rgba(255, 255, 255, 0.1)',
                  boxShadow: hoveredBiome === index 
                    ? `0 0 20px ${biome.color}40`
                    : 'none'
                }}
              >
                <span 
                  className="text-sm font-medium tracking-wide"
                  style={{
                    color: hoveredBiome === index ? biome.color : '#fff'
                  }}
                >
                  {biome.name}
                </span>
              </div>
            </div>
          </motion.div>
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
