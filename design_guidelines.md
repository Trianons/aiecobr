# ai.eco.br - Living Ecosystem Design System
## Deep Tech Humanista Design Guidelines

---

## 🎨 GRADIENT RESTRICTION RULE

**CRITICAL ENFORCEMENT:**
- NEVER use dark/saturated gradient combos (e.g., purple-500 to pink-500, blue-500 to purple-600) on any UI element
- NEVER let gradients cover more than 20% of the viewport
- NEVER apply gradients to text-heavy content or reading areas
- NEVER use gradients on small UI elements (<100px width)
- NEVER stack multiple gradient layers in the same viewport

**ENFORCEMENT RULE:**
IF gradient area exceeds 20% of viewport OR impacts readability
THEN fallback to solid colors or simple, two-color gradients with light colors

**ALLOWED GRADIENT USAGE:**
- Hero section backgrounds (with proper text contrast)
- Section backgrounds (not content blocks)
- Large CTA buttons / major interactive elements (light/simple gradients only)
- Decorative overlays and accent elements
- Biome particle clusters (subtle, organic gradients)

---

## 🌌 COLOR SYSTEM

### Primary Deep Space Foundation
```json
{
  "deepSpace": {
    "primary": "#020617",
    "description": "Main background - deep space black with subtle blue undertone",
    "usage": "Body background, section backgrounds, card backgrounds"
  },
  "spaceGradient": {
    "value": "linear-gradient(180deg, #020617 0%, #0f172a 50%, #020617 100%)",
    "description": "Subtle depth gradient for large sections",
    "usage": "Hero section background, full-page backgrounds"
  }
}
```

### Biome Color Palette (Brazilian Ecosystem Inspired)
```json
{
  "etica": {
    "primary": "#a78bfa",
    "glow": "rgba(167, 139, 250, 0.4)",
    "gradient": "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)",
    "description": "Violet - Ethics & Wisdom (Caatinga resilience)",
    "usage": "Biome particle cluster, skill axis, badge accent"
  },
  "inovacao": {
    "primary": "#22d3ee",
    "glow": "rgba(34, 211, 238, 0.4)",
    "gradient": "linear-gradient(135deg, #22d3ee 0%, #67e8f9 100%)",
    "description": "Cyan - Innovation & Flow (Amazônia rivers)",
    "usage": "Primary CTA, biome particle, hero title glow, links"
  },
  "colaboracao": {
    "primary": "#10b981",
    "glow": "rgba(16, 185, 129, 0.4)",
    "gradient": "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    "description": "Green - Collaboration & Growth (Mata Atlântica)",
    "usage": "Biome particle, success states, progress indicators"
  },
  "sustentabilidade": {
    "primary": "#f59e0b",
    "glow": "rgba(245, 158, 11, 0.4)",
    "gradient": "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    "description": "Orange - Sustainability & Energy (Cerrado sun)",
    "usage": "Biome particle, achievement badges, warm accents"
  },
  "humanidade": {
    "primary": "#ec4899",
    "glow": "rgba(236, 72, 153, 0.4)",
    "gradient": "linear-gradient(135deg, #ec4899 0%, #f472b6 100%)",
    "description": "Pink - Humanity & Connection (Pantanal life)",
    "usage": "Biome particle, community elements, heart icons"
  }
}
```

### Neutral & Functional Colors
```json
{
  "neutrals": {
    "white": "#ffffff",
    "whiteGlass": "rgba(255, 255, 255, 0.1)",
    "whiteGlassBorder": "rgba(255, 255, 255, 0.2)",
    "textPrimary": "rgba(255, 255, 255, 0.95)",
    "textSecondary": "rgba(255, 255, 255, 0.7)",
    "textMuted": "rgba(255, 255, 255, 0.5)"
  },
  "functional": {
    "success": "#10b981",
    "warning": "#f59e0b",
    "error": "#ef4444",
    "info": "#22d3ee"
  }
}
```

### Gradient Recipes (RESTRICTED USE - Max 20% viewport)
```json
{
  "heroGradient": {
    "value": "linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)",
    "description": "Cyan to blue - Hero CTA button only",
    "maxWidth": "300px",
    "usage": "Primary CTA button in hero section"
  },
  "warmAccent": {
    "value": "linear-gradient(135deg, #a78bfa 0%, #fbbf24 50%, #ec4899 100%)",
    "description": "Violet to gold to pink - Decorative elements only",
    "usage": "Medal reflections, confetti particles, decorative borders"
  },
  "organicFlow": {
    "value": "linear-gradient(90deg, #10b981 0%, #22d3ee 100%)",
    "description": "Green to cyan - Horizontal flow elements",
    "usage": "Progress bars, activity feed backgrounds"
  }
}
```

---

## 📐 TYPOGRAPHY SYSTEM

### Font Stack
```css
/* Primary Font: Space Grotesk - Modern, tech-forward, humanist */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* Secondary Font: Inter - Clean, readable body text */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

:root {
  --font-primary: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-secondary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Type Scale & Hierarchy
```json
{
  "h1": {
    "desktop": "text-6xl (60px)",
    "tablet": "text-5xl (48px)",
    "mobile": "text-4xl (36px)",
    "fontFamily": "Space Grotesk",
    "fontWeight": "700 (bold)",
    "lineHeight": "1.1",
    "letterSpacing": "-0.02em",
    "usage": "Hero title 'ai.eco.br'",
    "example": "className='text-4xl sm:text-5xl lg:text-6xl font-bold font-primary tracking-tight'"
  },
  "h2": {
    "desktop": "text-4xl (36px)",
    "tablet": "text-3xl (30px)",
    "mobile": "text-2xl (24px)",
    "fontFamily": "Space Grotesk",
    "fontWeight": "700 (bold)",
    "lineHeight": "1.2",
    "letterSpacing": "-0.01em",
    "usage": "Section headings",
    "example": "className='text-2xl sm:text-3xl lg:text-4xl font-bold font-primary'"
  },
  "h3": {
    "desktop": "text-2xl (24px)",
    "tablet": "text-xl (20px)",
    "mobile": "text-lg (18px)",
    "fontFamily": "Space Grotesk",
    "fontWeight": "600 (semibold)",
    "lineHeight": "1.3",
    "usage": "Subsection headings, card titles",
    "example": "className='text-lg sm:text-xl lg:text-2xl font-semibold font-primary'"
  },
  "body": {
    "desktop": "text-base (16px)",
    "mobile": "text-sm (14px)",
    "fontFamily": "Inter",
    "fontWeight": "400 (regular)",
    "lineHeight": "1.6",
    "usage": "Paragraph text, descriptions",
    "example": "className='text-sm sm:text-base font-secondary leading-relaxed'"
  },
  "bodyLarge": {
    "desktop": "text-lg (18px)",
    "mobile": "text-base (16px)",
    "fontFamily": "Inter",
    "fontWeight": "500 (medium)",
    "lineHeight": "1.6",
    "usage": "Hero subtitle, important descriptions",
    "example": "className='text-base sm:text-lg font-medium font-secondary'"
  },
  "small": {
    "size": "text-sm (14px)",
    "fontFamily": "Inter",
    "fontWeight": "400 (regular)",
    "usage": "Labels, captions, tooltips",
    "example": "className='text-sm font-secondary'"
  },
  "tiny": {
    "size": "text-xs (12px)",
    "fontFamily": "Inter",
    "fontWeight": "500 (medium)",
    "usage": "Badges, timestamps, metadata",
    "example": "className='text-xs font-medium font-secondary uppercase tracking-wide'"
  }
}
```

### Text Color Usage
```css
/* Primary text - high contrast */
.text-primary {
  color: rgba(255, 255, 255, 0.95);
}

/* Secondary text - medium contrast */
.text-secondary {
  color: rgba(255, 255, 255, 0.7);
}

/* Muted text - low contrast for labels */
.text-muted {
  color: rgba(255, 255, 255, 0.5);
}

/* Glow text for hero title */
.text-glow-cyan {
  color: #22d3ee;
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.5),
               0 0 40px rgba(34, 211, 238, 0.3);
}
```

---

## 🧩 COMPONENT SPECIFICATIONS

### 1. Hero Section - Interactive Biome Map (ALREADY IMPLEMENTED)

**Layout:**
- Full viewport height (min-h-screen)
- Centered content with max-w-7xl container
- Canvas element positioned absolute, full coverage
- Z-index layering: Canvas (z-0) → Content (z-10)

**Canvas Specifications:**
```json
{
  "canvasSize": "Full window (window.innerWidth x window.innerHeight)",
  "backgroundColor": "#020617",
  "particleSystem": {
    "clusters": 5,
    "particlesPerCluster": "15-25",
    "clusterRadius": "80-120px",
    "particleSize": "2-6px",
    "colors": ["#a78bfa", "#22d3ee", "#10b981", "#f59e0b", "#ec4899"],
    "animation": {
      "floatSpeed": "0.3-0.8 pixels/frame",
      "rotationSpeed": "0.001-0.003 radians/frame",
      "pulseSpeed": "0.02 (sine wave)",
      "mouseInteraction": "Repel particles within 150px radius"
    }
  },
  "labels": {
    "position": "Adjacent to each cluster",
    "style": "Glassmorphism card",
    "fontSize": "text-sm (14px)",
    "fontWeight": "500 (medium)",
    "animation": "Gentle float (translateY: -5px to 5px, 3s ease-in-out)"
  }
}
```

**Hero Content:**
```jsx
// Structure
<div className="relative z-10 text-center px-6">
  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-primary tracking-tight text-glow-cyan mb-6" data-testid="hero-title">
    ai.eco.br
  </h1>
  <p className="text-base sm:text-lg font-medium font-secondary text-secondary max-w-2xl mx-auto mb-8" data-testid="hero-subtitle">
    Comunidade brasileira de IA humanista. Conecte-se, aprenda e cresça em um ecossistema vivo de inovação ética.
  </p>
  <button className="cta-button-primary" data-testid="hero-cta-button">
    Explorar Ecossistema
  </button>
</div>
```

**CTA Button Specifications:**
```css
.cta-button-primary {
  /* Size */
  padding: 16px 32px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  
  /* Gradient (RESTRICTED - Button only, <300px width) */
  background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%);
  
  /* Glow effect */
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.4),
              0 4px 12px rgba(0, 0, 0, 0.3);
  
  /* Transition */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-button-primary:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.6),
              0 8px 20px rgba(0, 0, 0, 0.4);
}

.cta-button-primary:active {
  transform: translateY(0) scale(0.98);
}
```

---

### 2. Meta Humano Dashboard (Gamification Section)

**Layout:**
```json
{
  "container": "max-w-6xl mx-auto px-6 py-20",
  "grid": "grid grid-cols-1 lg:grid-cols-2 gap-12",
  "leftColumn": "Pentagon radar chart",
  "rightColumn": "Stats, streak counter, achievement button"
}
```

**Pentagon Radar Chart Specifications:**
```json
{
  "implementation": "HTML5 Canvas 2D API",
  "size": {
    "desktop": "500x500px",
    "mobile": "350x350px"
  },
  "axes": [
    "Mestre da Clareza",
    "Arquiteto de Prompts",
    "Guardião Ético",
    "Mentor Generoso",
    "Ponte Humana"
  ],
  "colors": {
    "gridLines": "rgba(255, 255, 255, 0.1)",
    "axisLines": "rgba(255, 255, 255, 0.2)",
    "dataPolygon": {
      "fill": "rgba(34, 211, 238, 0.2)",
      "stroke": "#22d3ee",
      "strokeWidth": "3px"
    },
    "dataPoints": {
      "fill": "#22d3ee",
      "radius": "6px",
      "hoverRadius": "8px",
      "glow": "0 0 10px rgba(34, 211, 238, 0.6)"
    },
    "labels": {
      "color": "rgba(255, 255, 255, 0.9)",
      "fontSize": "14px",
      "fontWeight": "600"
    }
  },
  "animation": {
    "entry": "Scale from 0 to final values over 1.5s with easeOutCubic",
    "hover": "Pulse data point (scale 1 to 1.2, 0.3s)",
    "idle": "Gentle rotation (0.1deg/frame, continuous)"
  },
  "interactivity": {
    "hover": "Show tooltip with skill name and percentage",
    "click": "Expand to show detailed skill breakdown"
  }
}
```

**Streak Counter Card:**
```jsx
// Component structure
<div className="glassmorphism-card p-8" data-testid="streak-counter">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-2xl font-bold font-primary text-primary">
      Sequência Ativa
    </h3>
    <div className="text-4xl">🔥</div>
  </div>
  
  <div className="text-center mb-8">
    <div className="text-6xl font-bold font-primary text-glow-cyan mb-2" data-testid="streak-count">
      365
    </div>
    <p className="text-sm text-secondary font-secondary">
      dias consecutivos
    </p>
  </div>
  
  {/* Achievement badges grid */}
  <div className="grid grid-cols-4 gap-4 mb-6">
    {/* Badge items */}
  </div>
  
  <button className="achievement-button" data-testid="simulate-achievement-button">
    Simular Conquista
  </button>
</div>
```

**Achievement Button (Confetti Trigger):**
```css
.achievement-button {
  width: 100%;
  padding: 14px 24px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  
  /* Warm gradient (RESTRICTED - Button only) */
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  
  /* Glow */
  box-shadow: 0 0 15px rgba(245, 158, 11, 0.4),
              0 4px 10px rgba(0, 0, 0, 0.3);
  
  transition: all 0.3s ease;
}

.achievement-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 25px rgba(245, 158, 11, 0.6),
              0 6px 15px rgba(0, 0, 0, 0.4);
}
```

**Confetti Effect Specifications:**
```json
{
  "library": "canvas-confetti (npm install canvas-confetti)",
  "trigger": "Button click",
  "config": {
    "particleCount": 150,
    "spread": 70,
    "origin": { "y": 0.6 },
    "colors": ["#f59e0b", "#fbbf24", "#22d3ee", "#ec4899", "#a78bfa"],
    "shapes": ["circle", "square"],
    "gravity": 1.2,
    "drift": 0,
    "ticks": 200,
    "scalar": 1.2
  }
}
```

---

### 3. Acontecendo Agora (Live Activity Feed)

**Layout:**
```json
{
  "container": "w-full overflow-hidden py-20 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent",
  "marquee": "Infinite horizontal scroll",
  "direction": "Left to right",
  "speed": "30 seconds per full cycle"
}
```

**Marquee Implementation:**
```jsx
// Structure with duplicate content for seamless loop
<div className="relative w-full overflow-hidden" data-testid="activity-feed">
  <div className="flex animate-marquee hover:pause-animation">
    {/* First set of bubbles */}
    <div className="flex gap-8 px-4">
      {activityBubbles.map((bubble) => (
        <ActivityBubble key={bubble.id} {...bubble} />
      ))}
    </div>
    
    {/* Duplicate set for seamless loop */}
    <div className="flex gap-8 px-4">
      {activityBubbles.map((bubble) => (
        <ActivityBubble key={`${bubble.id}-duplicate`} {...bubble} />
      ))}
    </div>
  </div>
</div>
```

**CSS Animation:**
```css
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}

.pause-animation:hover {
  animation-play-state: paused;
}
```

**Activity Bubble Specifications:**
```json
{
  "size": "120px x 120px",
  "shape": "Circle",
  "style": "Glassmorphism with floating animation",
  "structure": {
    "avatar": {
      "size": "60px x 60px",
      "position": "Center top",
      "borderRadius": "50%",
      "border": "2px solid rgba(255, 255, 255, 0.3)"
    },
    "statusLabel": {
      "position": "Below avatar",
      "fontSize": "text-xs (12px)",
      "fontWeight": "500",
      "color": "rgba(255, 255, 255, 0.9)",
      "examples": ["Mentoria Online", "Criando Prompt", "Revisando Ética", "Colaborando"]
    }
  },
  "glassmorphism": {
    "background": "rgba(255, 255, 255, 0.08)",
    "backdropFilter": "blur(12px)",
    "border": "1px solid rgba(255, 255, 255, 0.15)",
    "boxShadow": "0 8px 32px rgba(0, 0, 0, 0.3)"
  },
  "animation": {
    "float": {
      "translateY": "-8px to 8px",
      "duration": "3s",
      "easing": "ease-in-out",
      "infinite": true,
      "delay": "Staggered (0s, 0.5s, 1s, 1.5s, etc.)"
    },
    "hover": {
      "scale": "1.1",
      "duration": "0.3s",
      "showTooltip": true
    }
  },
  "tooltip": {
    "trigger": "Hover",
    "position": "Above bubble",
    "content": "User name + activity details",
    "style": "Glassmorphism card with arrow",
    "animation": "Fade in + slide up (0.2s)"
  }
}
```

**Tooltip Component:**
```jsx
<div className="tooltip-glassmorphism" data-testid="activity-tooltip">
  <p className="text-sm font-semibold text-primary mb-1">
    {userName}
  </p>
  <p className="text-xs text-secondary">
    {activityDescription}
  </p>
  <div className="tooltip-arrow"></div>
</div>
```

```css
.tooltip-glassmorphism {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.activity-bubble:hover .tooltip-glassmorphism {
  opacity: 1;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(15, 23, 42, 0.95);
}
```

---

### 4. Sistema de Medalhas Dinâmicas

**Layout:**
```json
{
  "container": "max-w-5xl mx-auto px-6 py-20",
  "grid": "grid grid-cols-2 md:grid-cols-4 gap-8",
  "tiers": ["Embaixador", "Bronze", "Prata", "Ouro"]
}
```

**Medal Card Specifications:**
```json
{
  "size": {
    "desktop": "200px x 240px",
    "mobile": "160px x 200px"
  },
  "structure": {
    "frame": "Glassmorphism container with heavy blur",
    "medal": "Circular element with metallic texture",
    "ribbon": "Top decoration element",
    "label": "Bottom text label"
  },
  "metalTextures": {
    "embaixador": {
      "gradient": "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 50%, #d0d0d0 100%)",
      "description": "Silver-white with subtle shine",
      "accentColor": "#22d3ee"
    },
    "bronze": {
      "gradient": "linear-gradient(135deg, #cd7f32 0%, #e8a87c 50%, #b87333 100%)",
      "description": "Warm bronze with copper highlights",
      "accentColor": "#f59e0b"
    },
    "prata": {
      "gradient": "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 50%, #a8a8a8 100%)",
      "description": "Cool silver with bright highlights",
      "accentColor": "#a78bfa"
    },
    "ouro": {
      "gradient": "linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #d4af37 100%)",
      "description": "Rich gold with warm glow",
      "accentColor": "#fbbf24"
    }
  }
}
```

**Medal Component Structure:**
```jsx
<div className="medal-card-container" data-testid={`medal-${tier}`}>
  {/* Glassmorphism frame */}
  <div className="glassmorphism-frame">
    {/* Ribbon decoration */}
    <div className="medal-ribbon" style={{ background: ribbonGradient }}>
      <div className="ribbon-tail-left"></div>
      <div className="ribbon-tail-right"></div>
    </div>
    
    {/* Medal circle */}
    <div className="medal-circle" style={{ background: metalGradient }}>
      {/* Inner circle with 3D depth */}
      <div className="medal-inner-circle">
        {/* Icon or number */}
        <div className="medal-icon">
          {tierIcon}
        </div>
      </div>
      
      {/* Reflection overlay */}
      <div className="medal-reflection"></div>
    </div>
    
    {/* Label */}
    <p className="medal-label">
      {tierName}
    </p>
  </div>
</div>
```

**Glassmorphism Frame CSS:**
```css
.glassmorphism-frame {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glassmorphism-frame:hover {
  transform: translateY(-8px) scale(1.03);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 rgba(255, 255, 255, 0.15),
              0 0 40px var(--accent-glow);
}
```

**Medal Circle with 3D Depth:**
```css
.medal-circle {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 40px auto 20px;
  border-radius: 50%;
  /* Metallic gradient applied via inline style */
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.3),
    inset 0 2px 4px rgba(255, 255, 255, 0.4),
    inset 0 -2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.medal-inner-circle {
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4);
}

.medal-icon {
  font-size: 36px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
```

**Dynamic Reflection Effect (Cursor-Following):**
```css
.medal-reflection {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.6) 0%,
    rgba(255, 255, 255, 0) 50%
  );
  transform: translateX(-60%) translateY(-20%) skewX(-20deg);
  transition: transform 0.3s ease;
  pointer-events: none;
}

/* JavaScript will update transform based on cursor position */
.medal-card-container:hover .medal-reflection {
  /* Dynamic transform applied via JS */
}
```

**JavaScript for Cursor-Reactive Reflection:**
```javascript
// Add to medal component
const medalCard = document.querySelector('.medal-card-container');
const reflection = medalCard.querySelector('.medal-reflection');

medalCard.addEventListener('mousemove', (e) => {
  const rect = medalCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const percentX = (x - centerX) / centerX;
  const percentY = (y - centerY) / centerY;
  
  const translateX = -60 + (percentX * 30);
  const translateY = -20 + (percentY * 30);
  const skewX = -20 + (percentX * 10);
  
  reflection.style.transform = `translateX(${translateX}%) translateY(${translateY}%) skewX(${skewX}deg)`;
});

medalCard.addEventListener('mouseleave', () => {
  reflection.style.transform = 'translateX(-60%) translateY(-20%) skewX(-20deg)';
});
```

**Ribbon Decoration:**
```css
.medal-ribbon {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 50px;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.ribbon-tail-left,
.ribbon-tail-right {
  position: absolute;
  bottom: -15px;
  width: 20px;
  height: 20px;
  background: inherit;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.ribbon-tail-left {
  left: 10px;
  transform: rotate(-15deg);
}

.ribbon-tail-right {
  right: 10px;
  transform: rotate(15deg);
}
```

**Medal Label:**
```css
.medal-label {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-primary);
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

---

## 🎭 GLASSMORPHISM SYSTEM

### Glassmorphism Recipes
```json
{
  "light": {
    "background": "rgba(255, 255, 255, 0.05)",
    "backdropFilter": "blur(8px)",
    "border": "1px solid rgba(255, 255, 255, 0.1)",
    "boxShadow": "0 4px 16px rgba(0, 0, 0, 0.2)",
    "usage": "Subtle overlays, secondary cards"
  },
  "medium": {
    "background": "rgba(255, 255, 255, 0.08)",
    "backdropFilter": "blur(12px)",
    "border": "1px solid rgba(255, 255, 255, 0.15)",
    "boxShadow": "0 8px 32px rgba(0, 0, 0, 0.3)",
    "usage": "Primary cards, activity bubbles, tooltips"
  },
  "heavy": {
    "background": "rgba(255, 255, 255, 0.1)",
    "backdropFilter": "blur(20px)",
    "border": "1px solid rgba(255, 255, 255, 0.2)",
    "boxShadow": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    "usage": "Medal frames, important containers, modals"
  },
  "dark": {
    "background": "rgba(15, 23, 42, 0.9)",
    "backdropFilter": "blur(16px)",
    "border": "1px solid rgba(255, 255, 255, 0.2)",
    "boxShadow": "0 8px 32px rgba(0, 0, 0, 0.5)",
    "usage": "Tooltips, dropdowns, overlays with text content"
  }
}
```

### Utility Classes
```css
/* Light glassmorphism */
.glass-light {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

/* Medium glassmorphism */
.glass-medium {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Heavy glassmorphism */
.glass-heavy {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

/* Dark glassmorphism */
.glass-dark {
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

---

## ✨ GLOW EFFECTS SYSTEM

### Glow Formulas
```json
{
  "cyan": {
    "color": "#22d3ee",
    "boxShadow": "0 0 20px rgba(34, 211, 238, 0.4), 0 0 40px rgba(34, 211, 238, 0.2)",
    "hoverBoxShadow": "0 0 30px rgba(34, 211, 238, 0.6), 0 0 60px rgba(34, 211, 238, 0.3)",
    "textShadow": "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)",
    "usage": "Primary CTA, hero title, innovation elements"
  },
  "violet": {
    "color": "#a78bfa",
    "boxShadow": "0 0 20px rgba(167, 139, 250, 0.4), 0 0 40px rgba(167, 139, 250, 0.2)",
    "hoverBoxShadow": "0 0 30px rgba(167, 139, 250, 0.6), 0 0 60px rgba(167, 139, 250, 0.3)",
    "usage": "Ethics elements, secondary accents"
  },
  "green": {
    "color": "#10b981",
    "boxShadow": "0 0 20px rgba(16, 185, 129, 0.4), 0 0 40px rgba(16, 185, 129, 0.2)",
    "hoverBoxShadow": "0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3)",
    "usage": "Success states, collaboration elements"
  },
  "orange": {
    "color": "#f59e0b",
    "boxShadow": "0 0 20px rgba(245, 158, 11, 0.4), 0 0 40px rgba(245, 158, 11, 0.2)",
    "hoverBoxShadow": "0 0 30px rgba(245, 158, 11, 0.6), 0 0 60px rgba(245, 158, 11, 0.3)",
    "usage": "Achievement buttons, warm accents"
  },
  "pink": {
    "color": "#ec4899",
    "boxShadow": "0 0 20px rgba(236, 72, 153, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)",
    "hoverBoxShadow": "0 0 30px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.3)",
    "usage": "Community elements, humanity accents"
  }
}
```

### Utility Classes
```css
/* Cyan glow */
.glow-cyan {
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.4),
              0 0 40px rgba(34, 211, 238, 0.2);
}

.glow-cyan:hover {
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.6),
              0 0 60px rgba(34, 211, 238, 0.3);
}

/* Text glow */
.text-glow-cyan {
  color: #22d3ee;
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.5),
               0 0 40px rgba(34, 211, 238, 0.3);
}

/* Violet glow */
.glow-violet {
  box-shadow: 0 0 20px rgba(167, 139, 250, 0.4),
              0 0 40px rgba(167, 139, 250, 0.2);
}

/* Green glow */
.glow-green {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.4),
              0 0 40px rgba(16, 185, 129, 0.2);
}

/* Orange glow */
.glow-orange {
  box-shadow: 0 0 20px rgba(245, 158, 11, 0.4),
              0 0 40px rgba(245, 158, 11, 0.2);
}

/* Pink glow */
.glow-pink {
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.4),
              0 0 40px rgba(236, 72, 153, 0.2);
}
```

---

## 🎬 ANIMATION & MOTION SYSTEM

### Animation Principles
```json
{
  "timing": {
    "instant": "100ms",
    "fast": "200ms",
    "normal": "300ms",
    "slow": "500ms",
    "verySlow": "800ms"
  },
  "easings": {
    "default": "cubic-bezier(0.4, 0, 0.2, 1)",
    "easeOut": "cubic-bezier(0, 0, 0.2, 1)",
    "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
    "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
    "bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
  }
}
```

### Idle Animations (Breathing Effects)
```css
/* Gentle pulse for particles */
@keyframes breathe-pulse {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.particle-breathe {
  animation: breathe-pulse 3s ease-in-out infinite;
}

/* Floating animation for bubbles */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

/* Gentle rotation for radar chart */
@keyframes gentle-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.gentle-rotate {
  animation: gentle-rotate 60s linear infinite;
}

/* Glow pulse */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.4),
                0 0 40px rgba(34, 211, 238, 0.2);
  }
  50% {
    box-shadow: 0 0 30px rgba(34, 211, 238, 0.6),
                0 0 60px rgba(34, 211, 238, 0.3);
  }
}

.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
```

### Hover Animations
```css
/* Button hover lift */
.hover-lift {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Card hover scale */
.hover-scale {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-scale:hover {
  transform: scale(1.03);
}

/* Glow on hover */
.hover-glow {
  transition: box-shadow 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 30px var(--glow-color),
              0 0 60px var(--glow-color-faint);
}
```

### Entrance Animations (Framer Motion)
```javascript
// Fade in + slide up
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
};

// Scale in
const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Usage example
import { motion } from 'framer-motion';

<motion.div
  initial="initial"
  animate="animate"
  variants={fadeInUp}
>
  Content
</motion.div>
```

### Scroll-Triggered Animations
```javascript
// Use Framer Motion's useInView hook
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SectionComponent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      Content
    </motion.section>
  );
};
```

---

## 📏 SPACING & LAYOUT SYSTEM

### Spacing Scale
```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px",
    "4xl": "96px",
    "5xl": "128px"
  },
  "usage": {
    "componentPadding": "lg to xl (24px to 32px)",
    "sectionPadding": "3xl to 4xl (64px to 96px)",
    "elementGap": "md to lg (16px to 24px)",
    "cardPadding": "xl (32px)",
    "buttonPadding": "md to lg (16px to 24px)"
  }
}
```

### Container Widths
```json
{
  "containers": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px",
    "content": "1200px (max-w-6xl)",
    "narrow": "800px (max-w-3xl)",
    "wide": "1400px (max-w-7xl)"
  }
}
```

### Grid System
```css
/* Two-column layout (desktop) */
.grid-2-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
}

/* Four-column layout (medals) */
.grid-4-col {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

/* Responsive grid */
.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .grid-2-col,
  .grid-4-col {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

### Breakpoint System
```json
{
  "breakpoints": {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1280px",
    "2xl": "1536px"
  },
  "mobileFirst": true,
  "approach": "Design for mobile, enhance for desktop"
}
```

### Responsive Patterns
```css
/* Mobile-first approach */
.component {
  /* Mobile styles (default) */
  padding: 16px;
  font-size: 14px;
}

@media (min-width: 640px) {
  /* Tablet styles */
  .component {
    padding: 24px;
    font-size: 16px;
  }
}

@media (min-width: 1024px) {
  /* Desktop styles */
  .component {
    padding: 32px;
    font-size: 18px;
  }
}
```

### Mobile Adaptations
```json
{
  "heroSection": {
    "mobile": "Reduce particle count to 10-15 per cluster for performance",
    "tablet": "Full particle count, reduce canvas size slightly",
    "desktop": "Full experience"
  },
  "radarChart": {
    "mobile": "350x350px, smaller labels",
    "tablet": "400x400px",
    "desktop": "500x500px"
  },
  "medalGrid": {
    "mobile": "1 column, 160px medals",
    "tablet": "2 columns",
    "desktop": "4 columns, 200px medals"
  },
  "activityFeed": {
    "mobile": "Smaller bubbles (100px), faster scroll",
    "tablet": "Standard bubbles (120px)",
    "desktop": "Standard bubbles with hover effects"
  }
}
```

---

## ♿ ACCESSIBILITY GUIDELINES

### Focus States
```css
/* Visible focus indicator */
*:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 2px;
  border-radius: 4px;
}

/* Button focus */
button:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 4px;
}

/* Card focus */
.card:focus-visible {
  outline: 2px solid #22d3ee;
  outline-offset: 2px;
}
```

### Reduced Motion Support
```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Disable particle animations */
  .particle-breathe,
  .float-animation,
  .gentle-rotate,
  .glow-pulse {
    animation: none;
  }
  
  /* Disable marquee */
  .animate-marquee {
    animation: none;
  }
}
```

### Color Contrast
```json
{
  "requirements": "WCAG AA minimum (4.5:1 for normal text, 3:1 for large text)",
  "textOnDarkSpace": {
    "primary": "rgba(255, 255, 255, 0.95) - 19:1 contrast",
    "secondary": "rgba(255, 255, 255, 0.7) - 13:1 contrast",
    "muted": "rgba(255, 255, 255, 0.5) - 9:1 contrast"
  },
  "textOnGlass": {
    "ensure": "Sufficient background blur and opacity for readability",
    "minimum": "rgba(15, 23, 42, 0.9) background for text-heavy content"
  }
}
```

### Semantic HTML & ARIA
```html
<!-- Use semantic elements -->
<header>
  <nav aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</header>

<main>
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">ai.eco.br</h1>
  </section>
  
  <section aria-labelledby="dashboard-heading">
    <h2 id="dashboard-heading">Meta Humano Dashboard</h2>
  </section>
</main>

<!-- Interactive elements -->
<button aria-label="Simulate achievement" data-testid="simulate-achievement-button">
  Simular Conquista
</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  <!-- Streak counter updates -->
</div>
```

### Keyboard Navigation
```json
{
  "requirements": [
    "All interactive elements must be keyboard accessible",
    "Tab order must follow logical reading order",
    "Escape key closes modals and tooltips",
    "Arrow keys navigate within components (e.g., medal grid)",
    "Enter/Space activates buttons and links"
  ],
  "implementation": {
    "tabIndex": "Use tabindex='0' for custom interactive elements",
    "skipLinks": "Provide skip-to-content link for screen readers",
    "focusTrap": "Trap focus within modals and dialogs"
  }
}
```

---

## 🖼️ IMAGE ASSETS

### Image URLs by Category

```json
{
  "backgroundTextures": {
    "spaceParticles": [
      "https://images.pexels.com/photos/9665188/pexels-photo-9665188.jpeg",
      "https://images.pexels.com/photos/9665214/pexels-photo-9665214.jpeg"
    ],
    "description": "Abstract particle textures for background overlays",
    "usage": "Subtle overlay on deep space background with low opacity (0.05-0.1)"
  },
  "holographicGradients": [
    "https://images.unsplash.com/photo-1649676145667-6a07b10a3c99",
    "https://images.unsplash.com/photo-1764389814724-b23f51b7a31a",
    "https://images.unsplash.com/photo-1758843425923-9cad18eb2b7a",
    "https://images.unsplash.com/photo-1654521957182-f0277b65005a",
    "https://images.pexels.com/photos/1998922/pexels-photo-1998922.jpeg",
    "https://images.pexels.com/photos/25626591/pexels-photo-25626591.jpeg"
  ],
  "holographicDescription": "Iridescent gradient textures for decorative elements",
  "holographicUsage": "Medal reflections, confetti particles, decorative accents",
  "achievementBadges": [
    "https://images.pexels.com/photos/35119581/pexels-photo-35119581.jpeg",
    "https://images.pexels.com/photos/7267538/pexels-photo-7267538.jpeg"
  ],
  "badgeDescription": "Trophy and medal reference images",
  "badgeUsage": "Reference for medal design, not direct use (create CSS versions)",
  "communityAvatars": [
    "https://images.pexels.com/photos/18482787/pexels-photo-18482787.jpeg",
    "https://images.pexels.com/photos/15226555/pexels-photo-15226555.jpeg"
  ],
  "avatarDescription": "Diverse community member avatars",
  "avatarUsage": "Activity feed bubbles, testimonials, user profiles"
}
```

### Image Implementation Guidelines
```json
{
  "optimization": {
    "format": "WebP with JPEG fallback",
    "loading": "lazy (except hero images)",
    "sizes": "Responsive srcset for different viewports",
    "compression": "80-85% quality for web"
  },
  "avatars": {
    "size": "60x60px (displayed), 120x120px (source for retina)",
    "shape": "Circular with border-radius: 50%",
    "border": "2px solid rgba(255, 255, 255, 0.3)",
    "fallback": "Colored circle with initials if image fails"
  },
  "backgroundImages": {
    "opacity": "0.05 to 0.1 for subtle texture",
    "blendMode": "overlay or soft-light",
    "position": "fixed or absolute with z-index: -1"
  }
}
```

---

## 🧰 SHADCN/UI COMPONENTS TO USE

### Component Paths & Usage
```json
{
  "button": {
    "path": "/app/frontend/src/components/ui/button.jsx",
    "usage": "Primary CTA, achievement button, navigation buttons",
    "customization": "Apply gradient backgrounds and glow effects via className"
  },
  "card": {
    "path": "/app/frontend/src/components/ui/card.jsx",
    "usage": "Glassmorphism containers, medal frames, stat cards",
    "customization": "Override background with glass-medium or glass-heavy classes"
  },
  "tooltip": {
    "path": "/app/frontend/src/components/ui/tooltip.jsx",
    "usage": "Activity bubble tooltips, skill explanations, medal descriptions",
    "customization": "Apply glass-dark background for better text readability"
  },
  "badge": {
    "path": "/app/frontend/src/components/ui/badge.jsx",
    "usage": "Achievement badges, status indicators, skill levels",
    "customization": "Use biome colors for different badge types"
  },
  "progress": {
    "path": "/app/frontend/src/components/ui/progress.jsx",
    "usage": "Skill progress bars, streak progress, loading states",
    "customization": "Apply gradient fills matching biome colors"
  },
  "avatar": {
    "path": "/app/frontend/src/components/ui/avatar.jsx",
    "usage": "Activity feed bubbles, user profiles, testimonials",
    "customization": "Add glassmorphism border and glow effects"
  },
  "separator": {
    "path": "/app/frontend/src/components/ui/separator.jsx",
    "usage": "Section dividers with subtle glow",
    "customization": "Use rgba(255, 255, 255, 0.1) with optional glow"
  },
  "dialog": {
    "path": "/app/frontend/src/components/ui/dialog.jsx",
    "usage": "Modals for detailed skill views, achievement details",
    "customization": "Apply glass-heavy background with backdrop blur"
  },
  "hover-card": {
    "path": "/app/frontend/src/components/ui/hover-card.jsx",
    "usage": "Expandable information on hover for medals and skills",
    "customization": "Glass-dark background with smooth transitions"
  }
}
```

### Component Import Examples
```javascript
// Button with custom styling
import { Button } from './components/ui/button';

<Button 
  className="cta-button-primary glow-cyan"
  data-testid="hero-cta-button"
>
  Explorar Ecossistema
</Button>

// Card with glassmorphism
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';

<Card className="glass-medium hover-scale">
  <CardHeader>
    <CardTitle className="font-primary text-primary">
      Sequência Ativa
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>

// Tooltip for activity bubbles
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      <div className="activity-bubble">
        {/* Bubble content */}
      </div>
    </TooltipTrigger>
    <TooltipContent className="glass-dark">
      <p className="text-sm font-semibold">{userName}</p>
      <p className="text-xs text-secondary">{activity}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

// Avatar in activity feed
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';

<Avatar className="w-[60px] h-[60px] border-2 border-white/30">
  <AvatarImage src={userAvatar} alt={userName} />
  <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-500">
    {userInitials}
  </AvatarFallback>
</Avatar>
```

---

## 📦 ADDITIONAL LIBRARIES & INSTALLATION

### Required Libraries
```json
{
  "framerMotion": {
    "package": "framer-motion",
    "version": "^11.0.0",
    "installation": "npm install framer-motion",
    "usage": "Entrance animations, scroll-triggered animations, gesture interactions",
    "documentation": "https://www.framer.com/motion/"
  },
  "canvasConfetti": {
    "package": "canvas-confetti",
    "version": "^1.9.0",
    "installation": "npm install canvas-confetti",
    "usage": "Achievement celebration confetti effect",
    "documentation": "https://www.npmjs.com/package/canvas-confetti"
  },
  "lucideReact": {
    "package": "lucide-react",
    "version": "^0.400.0",
    "installation": "npm install lucide-react",
    "usage": "Icons throughout the application (NO EMOJIS)",
    "documentation": "https://lucide.dev/guide/packages/lucide-react"
  }
}
```

### Installation Commands
```bash
# Install all required libraries
npm install framer-motion canvas-confetti lucide-react

# Verify installations
npm list framer-motion canvas-confetti lucide-react
```

### Usage Examples

**Framer Motion:**
```javascript
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};
```

**Canvas Confetti:**
```javascript
import confetti from 'canvas-confetti';

const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#f59e0b', '#fbbf24', '#22d3ee', '#ec4899', '#a78bfa'],
    shapes: ['circle', 'square'],
    gravity: 1.2,
    ticks: 200,
    scalar: 1.2
  });
};

<button onClick={triggerConfetti} data-testid="simulate-achievement-button">
  Simular Conquista
</button>
```

**Lucide React Icons:**
```javascript
import { Sparkles, Users, Heart, Zap, Shield } from 'lucide-react';

// Use in biome labels
<div className="flex items-center gap-2">
  <Sparkles className="w-5 h-5 text-cyan-400" />
  <span>Inovação</span>
</div>

// Use in skill axes
const skillIcons = {
  clareza: <Sparkles className="w-6 h-6" />,
  prompts: <Zap className="w-6 h-6" />,
  etica: <Shield className="w-6 h-6" />,
  mentor: <Users className="w-6 h-6" />,
  humano: <Heart className="w-6 h-6" />
};
```

---

## 🎯 INSTRUCTIONS TO MAIN AGENT

### Implementation Priority Order

1. **Setup & Foundation (First)**
   - Install required libraries: `npm install framer-motion canvas-confetti lucide-react`
   - Update `index.css` with custom CSS variables and utility classes
   - Import Google Fonts (Space Grotesk, Inter) in `index.html` or `index.css`
   - Set up dark theme with deep space background (#020617)

2. **Hero Section (Already Implemented - Verify)**
   - Ensure Canvas 2D particle system is working
   - Verify 5 biome clusters with correct colors
   - Check glassmorphism labels are floating
   - Confirm CTA button has cyan-to-blue gradient and glow
   - Add data-testid attributes to all interactive elements

3. **Meta Humano Dashboard (Second Priority)**
   - Create pentagon radar chart using Canvas 2D API
   - Implement 5 skill axes with proper labels
   - Add animated data polygon with glow effects
   - Build streak counter card with glassmorphism
   - Create achievement button with confetti trigger
   - Add 4 achievement badge placeholders in grid

4. **Acontecendo Agora (Third Priority)**
   - Implement infinite horizontal marquee with CSS animation
   - Create activity bubble component with Avatar from shadcn
   - Add floating animation (translateY -8px to 8px, 3s)
   - Implement pause-on-hover functionality
   - Add Tooltip component for bubble hover states
   - Ensure seamless loop with duplicated content

5. **Sistema de Medalhas (Fourth Priority)**
   - Create 4 medal cards (Embaixador, Bronze, Prata, Ouro)
   - Apply heavy glassmorphism frames
   - Implement metallic gradients for each tier
   - Add ribbon decoration at top of each medal
   - Create cursor-reactive reflection effect with JavaScript
   - Add 3D depth with inset shadows and highlights
   - Implement hover animations (lift, scale, glow)

6. **Polish & Optimization (Final)**
   - Add Framer Motion entrance animations to all sections
   - Implement scroll-triggered animations with useInView
   - Add reduced-motion support for accessibility
   - Ensure all focus states are visible
   - Test keyboard navigation
   - Optimize images (WebP format, lazy loading)
   - Test responsive behavior on mobile, tablet, desktop
   - Verify all data-testid attributes are present

### Critical Implementation Rules

**GRADIENT ENFORCEMENT:**
- NEVER exceed 20% viewport coverage with gradients
- ONLY use gradients on: Hero CTA button, achievement button, medal reflections
- ALL other elements use solid colors or subtle 2-color light gradients
- IF gradient area exceeds 20%, fallback to solid colors immediately

**GLASSMORPHISM USAGE:**
- Use `glass-light` for subtle overlays
- Use `glass-medium` for primary cards and bubbles
- Use `glass-heavy` for medal frames and important containers
- Use `glass-dark` for tooltips and text-heavy content
- ALWAYS include `-webkit-backdrop-filter` for Safari support

**ANIMATION PERFORMANCE:**
- Use CSS transforms (translateX, translateY, scale, rotate) for animations
- Avoid animating width, height, top, left (causes reflow)
- Use `will-change` sparingly and only during animation
- Implement `@media (prefers-reduced-motion: reduce)` for all animations
- Limit particle count on mobile (10-15 per cluster vs 15-25 on desktop)

**ACCESSIBILITY REQUIREMENTS:**
- ALL interactive elements MUST have `data-testid` attributes
- ALL buttons and links MUST have visible focus states
- ALL images MUST have alt text
- ALL sections MUST have proper heading hierarchy (h1 → h2 → h3)
- ALL dynamic content MUST use aria-live regions
- ALL modals MUST trap focus and close on Escape key

**COMPONENT USAGE:**
- ALWAYS use shadcn components from `/app/frontend/src/components/ui/`
- NEVER create custom dropdowns, calendars, or toasts (use shadcn versions)
- ALWAYS use Lucide React icons (NEVER use emoji characters for icons)
- ALWAYS use named exports for components, default exports for pages

**RESPONSIVE BEHAVIOR:**
- Design mobile-first, enhance for desktop
- Test all breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Reduce particle count on mobile for performance
- Stack grids to single column on mobile
- Reduce font sizes and spacing on mobile
- Ensure touch targets are minimum 44x44px

**COLOR CONTRAST:**
- Maintain WCAG AA minimum (4.5:1 for normal text)
- Use `rgba(255, 255, 255, 0.95)` for primary text on dark backgrounds
- Use `rgba(255, 255, 255, 0.7)` for secondary text
- Use `rgba(255, 255, 255, 0.5)` for muted text
- Ensure sufficient background opacity for text readability on glass elements

**FILE STRUCTURE:**
- Keep components modular and reusable
- Create separate files for complex components (RadarChart.jsx, MedalCard.jsx, ActivityBubble.jsx)
- Use `.jsx` extension (NOT `.tsx`)
- Import shadcn components with relative paths: `./components/ui/button`
- Keep CSS utility classes in `index.css` or `App.css`

### Testing Checklist

Before marking implementation complete, verify:

- [ ] All sections render correctly on desktop (1920x1080)
- [ ] All sections render correctly on tablet (768x1024)
- [ ] All sections render correctly on mobile (375x667)
- [ ] Hero particle system animates smoothly (60fps)
- [ ] Pentagon radar chart displays all 5 axes correctly
- [ ] Confetti triggers on achievement button click
- [ ] Activity feed scrolls infinitely without gaps
- [ ] Activity feed pauses on hover
- [ ] Medals have cursor-reactive reflections
- [ ] All hover states work (lift, scale, glow)
- [ ] All focus states are visible (cyan outline)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Reduced motion disables animations
- [ ] All images load with lazy loading
- [ ] All data-testid attributes are present
- [ ] No console errors or warnings
- [ ] Lighthouse accessibility score > 90
- [ ] Lighthouse performance score > 80

### Common Mistakes to Avoid

**DON'T:**
- Use dark purple, dark blue, dark pink gradients anywhere
- Apply gradients to text-heavy content or reading areas
- Use gradients on small UI elements (<100px width)
- Stack multiple gradient layers in the same viewport
- Use emoji characters for icons (🤖💡🎯 etc.)
- Center-align all text (disrupts natural reading flow)
- Apply universal transitions (`transition: all`)
- Forget `-webkit-backdrop-filter` for Safari
- Animate width, height, top, left (causes reflow)
- Skip data-testid attributes on interactive elements

**DO:**
- Use solid colors for content and reading areas
- Keep gradients for hero CTA and achievement button only
- Use Lucide React icons for all iconography
- Use specific transitions (e.g., `transition: transform 0.3s`)
- Include Safari vendor prefixes for backdrop-filter
- Use CSS transforms for animations (translateX, scale, rotate)
- Add data-testid to all buttons, links, inputs, and key elements
- Test on multiple devices and browsers
- Implement reduced-motion support
- Maintain proper heading hierarchy (h1 → h2 → h3)

---

## 🎨 DESIGN PERSONALITY & TONE

### Visual Personality
```json
{
  "primary": "Deep Tech Humanista",
  "attributes": [
    "Futuristic yet organic",
    "Sophisticated but welcoming",
    "Innovative and ethical",
    "Community-focused",
    "Breathing and alive"
  ],
  "avoidances": [
    "Cold and sterile",
    "Overly corporate",
    "Static and lifeless",
    "Aggressive or harsh",
    "Generic tech aesthetic"
  ]
}
```

### Motion Personality
```json
{
  "characteristics": [
    "Gentle and organic (like breathing)",
    "Smooth and fluid (like water)",
    "Responsive and delightful (rewards interaction)",
    "Purposeful (every animation has meaning)",
    "Respectful (honors reduced-motion preferences)"
  ],
  "inspirations": [
    "Brazilian biomes (flowing rivers, swaying trees, floating seeds)",
    "Underwater organisms (gentle bobbing, floating)",
    "Space phenomena (nebula movement, star twinkling)",
    "Human breathing (expansion and contraction)"
  ]
}
```

### Brazilian Cultural Touch
```json
{
  "biomeInspiration": {
    "caatinga": "Resilience and adaptation (Ética - violet)",
    "amazonia": "Flow and innovation (Inovação - cyan)",
    "mataAtlantica": "Growth and collaboration (Colaboração - green)",
    "cerrado": "Energy and sustainability (Sustentabilidade - orange)",
    "pantanal": "Life and humanity (Humanidade - pink)"
  },
  "copyTone": {
    "language": "Portuguese (Brazilian)",
    "style": "Warm, human-centered, inclusive",
    "examples": [
      "Comunidade brasileira de IA humanista",
      "Conecte-se, aprenda e cresça",
      "Ecossistema vivo de inovação ética",
      "Sequência Ativa",
      "Simular Conquista"
    ]
  },
  "communityFocus": {
    "emphasis": "Collective growth over individual achievement",
    "representation": "Diverse avatars, collaborative activities",
    "values": "Ethics, generosity, human connection"
  }
}
```

---

## 📋 FINAL CHECKLIST FOR MAIN AGENT

### Before Starting Implementation
- [ ] Read entire design guidelines document
- [ ] Install all required libraries (framer-motion, canvas-confetti, lucide-react)
- [ ] Set up Google Fonts (Space Grotesk, Inter)
- [ ] Create CSS utility classes in index.css
- [ ] Verify shadcn components are available

### During Implementation
- [ ] Follow implementation priority order (Hero → Dashboard → Feed → Medals)
- [ ] Apply glassmorphism correctly (light, medium, heavy, dark)
- [ ] Enforce gradient restriction rule (max 20% viewport)
- [ ] Use Lucide React icons (NO emojis)
- [ ] Add data-testid to all interactive elements
- [ ] Implement hover and focus states
- [ ] Add Framer Motion animations
- [ ] Test responsive behavior at each breakpoint
- [ ] Implement reduced-motion support
- [ ] Ensure WCAG AA color contrast

### After Implementation
- [ ] Run accessibility audit (Lighthouse)
- [ ] Test keyboard navigation
- [ ] Verify all animations are smooth (60fps)
- [ ] Check mobile performance (reduce particles if needed)
- [ ] Validate all data-testid attributes
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Verify no console errors or warnings
- [ ] Confirm gradient usage is under 20% viewport
- [ ] Test confetti effect triggers correctly
- [ ] Ensure marquee loops seamlessly

---

## 🌟 HIGHEST VISUAL QUALITY STANDARDS

As requested: "Tudo da mais alta qualidade visual" (Everything of the highest visual quality)

### Quality Benchmarks
```json
{
  "smoothness": "All animations at 60fps minimum",
  "responsiveness": "Interactions respond within 100ms",
  "polish": "Every element has hover, focus, and active states",
  "consistency": "Unified design language across all sections",
  "attention": "Micro-interactions on every interactive element",
  "performance": "Lighthouse performance score > 80",
  "accessibility": "Lighthouse accessibility score > 90",
  "delight": "Unexpected moments of joy (confetti, reflections, glows)"
}
```

### Visual Excellence Principles
1. **Nothing is static** - Every element breathes, floats, or pulses subtly
2. **Interactions are rewarding** - Hover states are delightful and immediate
3. **Depth is everywhere** - Glassmorphism, shadows, and glows create layers
4. **Motion is purposeful** - Animations guide attention and provide feedback
5. **Details matter** - Reflections, textures, and micro-interactions elevate quality
6. **Accessibility is beautiful** - Focus states and reduced-motion are elegant
7. **Performance is quality** - Smooth animations and fast loading are essential
8. **Consistency is key** - Unified spacing, colors, and typography throughout

---

## 📚 REFERENCE LINKS

- **Framer Motion Documentation:** https://www.framer.com/motion/
- **Canvas Confetti Documentation:** https://www.npmjs.com/package/canvas-confetti
- **Lucide React Icons:** https://lucide.dev/guide/packages/lucide-react
- **Shadcn/UI Documentation:** https://ui.shadcn.com/
- **Tailwind CSS Documentation:** https://tailwindcss.com/docs
- **WCAG Accessibility Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Canvas API:** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

## ✅ SUMMARY FOR MAIN AGENT

This design system creates a **"Living Ecosystem"** landing page for ai.eco.br with a **Deep Tech Humanista** aesthetic. The design combines:

- **Deep space backgrounds** (#020617) with subtle particle textures
- **5 biome colors** inspired by Brazilian ecosystems (violet, cyan, green, orange, pink)
- **Heavy glassmorphism** for depth and sophistication
- **Organic animations** (breathing, floating, flowing) for a living feel
- **Cursor-reactive elements** (medal reflections, particle repulsion)
- **Gamification** (pentagon radar chart, streak counter, achievement badges)
- **Community focus** (live activity feed with floating avatars)
- **Highest visual quality** (smooth 60fps animations, delightful interactions)

**CRITICAL RULES:**
1. Gradients ONLY on CTA buttons and decorative elements (max 20% viewport)
2. Use Lucide React icons (NO emojis)
3. Add data-testid to ALL interactive elements
4. Implement reduced-motion support
5. Use shadcn components from `/app/frontend/src/components/ui/`
6. Maintain WCAG AA color contrast
7. Test responsive behavior at all breakpoints

Follow the implementation priority order, enforce the gradient restriction rule, and ensure every element has delightful hover and focus states. The result should feel human-made, visually stunning, and highly polished.

---

# GENERAL UI UX DESIGN GUIDELINES (APPEND TO ALL PROJECTS)

## Universal Design Principles

### Transition Rules
- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
- Specify exact properties: `transition: transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease`

### Text Alignment
- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
- Use center alignment only for specific elements (hero titles, CTAs, centered cards)
- Default to left-aligned text for body content and reading areas

### Icon Usage
- NEVER use AI assistant Emoji characters like `🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇` etc for icons
- Always use **FontAwesome CDN** or **lucide-react** library (already installed in package.json)
- Example: `import { Sparkles, Users, Heart } from 'lucide-react'`

### Gradient Restrictions (CRITICAL)
**NEVER use dark/saturated gradient combos** (e.g., purple-500 to pink-500, blue-500 to purple-600, green-500 to blue-500, red to pink) on any UI element.

**Prohibited gradients:**
- Dark purple to dark pink
- Dark blue to dark purple
- Dark green to dark blue
- Dark red to dark pink
- Any dark saturated color combinations

**NEVER let gradients cover more than 20% of the viewport**
**NEVER apply gradients to text-heavy content or reading areas**
**NEVER use gradients on small UI elements (<100px width)**
**NEVER stack multiple gradient layers in the same viewport**

**ENFORCEMENT RULE:**
IF gradient area exceeds 20% of viewport OR affects readability
THEN use solid colors

**How and where to use gradients:**
- Section backgrounds (not content backgrounds)
- Hero section header content (dark to light to dark color)
- Decorative overlays and accent elements only
- Hero section with 2-3 mild colors
- Gradients can be horizontal, vertical, or diagonal

**For AI chat, voice applications:**
- Do NOT use purple color
- Use colors like light green, ocean blue, peach orange, etc.

### Interaction & Animation
- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations
- Static = dead. Nothing should be completely static
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap
- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations separate good from extraordinary

### Design Token Instantiation
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion)
- Immediately instantiate design tokens (primary, secondary/accent, background, foreground, ring, state colors)
- Don't rely on library defaults
- Don't make background dark as default - understand problem first and define colors accordingly
- If problem implies playful/energetic, choose colorful scheme
- If problem implies monochrome/minimal, choose black-white/neutral scheme

### Component Reuse
- Prioritize using pre-existing components from `src/components/ui` when applicable
- Create new components that match the style and conventions of existing components
- Examine existing components to understand project's component patterns before creating new ones

### Component Library
- **IMPORTANT:** Do not use HTML-based components like dropdown, calendar, toast
- You **MUST** always use `/app/frontend/src/components/ui/` as primary components (modern and stylish)
- Use Shadcn/UI as the primary component library for consistency and accessibility
- Import path: `./components/[component-name]`

### Export Conventions
- Components MUST use named exports: `export const ComponentName = ...`
- Pages MUST use default exports: `export default function PageName() {...}`

### Toasts
- Use `sonner` for toasts
- Sonner component located in `/app/src/components/ui/sonner.tsx`

### Visual Depth
- Use 2-4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals
- Add depth through shadows, glassmorphism, and layering

### Testing Attributes
- All interactive and key informational elements **MUST** include a `data-testid` attribute
- This facilitates robust automated testing
- Applies to: buttons, links, form inputs, menus, any element users interact with or that displays critical information
- Use kebab-case convention defining element's role, not appearance
- Example: `data-testid="login-form-submit-button"`
- Creates stable, decoupled interface for tests, preventing breaks from stylistic refactors

### Calendar Components
- If calendar is required, always use shadcn calendar component

---

**END OF DESIGN GUIDELINES**

This comprehensive design system ensures ai.eco.br achieves the highest visual quality with a cohesive Deep Tech Humanista aesthetic, organic animations, and delightful user interactions throughout.