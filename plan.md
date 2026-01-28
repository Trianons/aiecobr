# ai.eco.br Living Ecosystem — Plan

## 1) Objectives
- Build an immersive, interactive landing page prototype (client-side only) with a “Deep Tech Humanista” vibe.
- Deliver 4 critical sections: Interactive Biome Heat Map (Hero), Meta Humano Dashboard, Acontecendo Agora, Dynamic Medals.
- Brazil-inspired 5 biomes with organic particles, hover pulses, and soft parallax.
- Smooth, cohesive transitions across sections (Framer Motion). Target ≥60 FPS on modern laptops.
- High-visual-quality placeholders (avatars, icons, glows); responsive and accessible.

## 2) Tech & Constraints
- Stack: React (existing SPA), Tailwind CSS, Framer Motion, react-three-fiber/three.js, Lucide React, SVG.
- No backend persistence; high-quality mocked data only.
- Colors: bg #020617; highlights #22d3ee (Cyan), #fb923c (Peach). Font: Inter/Geist.
- 5 Biomas: Ética (violeta/pêssego), Inovação (cyan/azul), Colaboração (verde/dourado), Sustentabilidade (laranja/amarelo), Humanidade (rosa/magenta).
- Note: We’ll implement on current React template; a Next.js migration can be a future Phase 3.

---
## Phase 1 — Core POC (Isolation): Interactive Biome Heat Map
Goal: Prove the hardest part (WebGL particles + 5 mass centers + hover pulse + parallax) works at performance target.

Scope & Deliverables
- A standalone React component with react-three-fiber canvas rendering:
  - 5 attractor centers (biomes) arranged aesthetically.
  - ~3–8k GPU-instanced particles orbiting/flowing between attractors.
  - Cursor-based parallax and gentle camera drift.
  - Hover over “Bioma da Ética” region → pulse particles in violet/peach.
  - Graceful degrade: reduce particle count if perf < 50 FPS.
- Minimal overlay UI (labels for biomes, subtle glow rings).

Implementation Steps
1. Web research (best practices):
   - “react-three-fiber instanced particles attractors”, “GPU instancing R3F”, “pointer parallax camera R3F”.
2. Set up R3F scene with camera + controls (no orbit UI), shader/JS-driven particle system with per-instance color.
3. Implement 5 attractor fields with force blending and noise jitter.
4. Pointer parallax (camera group) and section breathing animations via Framer Motion.
5. Region hover detection (simple 2D screen-space zones) to trigger Ética color pulse.
6. Performance gates: dynamic particle count and requestAnimationFrame budget.
7. Accessibility fallback: static gradient background if WebGL not supported.

Validation Checklist
- Visual fidelity: organic nebula feel, smooth motion, parallax noticeable but subtle.
- Interaction: Ética hover reliably pulses; no stutter on pointer move.
- Performance: ≥60 FPS target; memory stable; CPU/GPU moderate.

User Stories (Phase 1)
1. As a visitor, I see a living, breathing nebula of particles on load.
2. As I move the cursor, the scene responds with soft parallax.
3. As I hover over the Ética biome, particles pulse violet/peach.
4. As I stop moving, the scene slowly breathes (opacity/scale micro-animations).
5. As a low-power user, I still see a smooth animation due to adaptive particle count.
6. As a keyboard-only user, I can focus a labeled hotspot to trigger the Ética pulse.

Success Criteria (Phase 1)
- Particle field stable, performant, and reactive; Ética hover pulse feels delightful.
- Code isolated in a single component ready to be embedded into the Hero.
- Clear path to integrate labels, glows, and section transitions.

Exit Criteria to Phase 2
- POC demo achieves performance and interaction goals on the preview URL.

---
## Phase 2 — Full App Development
Goal: Build the complete landing page around the proven core with all 4 sections, transitions, and polish.

Features & Implementation
A) Hero: Interactive Biome Heat Map
- Integrate POC component full-bleed; add biome labels, Lucide glows, and CTA.
- Smooth reveal on enter; parallax layers; gradient overlays; keyboard focus ring.

B) Meta Humano Dashboard (Gamificação)
- Animated SVG radar (pentagon) with 5 axes: Clareza, Prompts, Ética, Generosidade, Ponte Humana.
- Animate polygon fill/points on scroll-in; sliders or preset states to demo variability.
- 365-day streak counter; button “Simular Conquista” → full-screen confetti (gold gradients) and subtle sound toggle (muted by default).

C) Acontecendo Agora
- Infinite horizontal marquee of avatar bubbles (hi-res placeholders) with “water float” keyframes.
- Hover shows elegant tooltip (e.g., “Mentoria Online”). Pause auto-scroll on hover.
- Tap-to-hold on mobile pauses; swipe to navigate.

D) Dynamic Medals System
- 4 medals (Embaixador, Bronze, Prata, Ouro) via CSS filters/gradients and lighting glints driven by pointer position.
- Glassmorphism frames; depth via blur, noise grain, and reflection masks.

Cross-Cutting
- Tailwind setup: theme colors, font, shadows, glows.
- Framer Motion page/section transitions; global “breathing” idle states.
- Accessibility: reduced motion preference, focus indicators, semantic roles.
- Performance budgets: code-split heavy R3F; memoize avatars; will-change hints; GPU-accelerated transforms.
- Mocked data: curated avatar URLs, activity titles/status, medal metadata.

Implementation Steps
1. Tailwind + font setup; global theme tokens (colors, radii, shadows, glows).
2. Build Hero section around POC; add labels/CTAs and accessibility.
3. Implement Meta Humano radar (animated SVG), streak logic, confetti trigger.
4. Implement Acontecendo Agora infinite marquee with bubble float and tooltips.
5. Implement Dynamic Medals with pointer-driven reflection and glassmorphism.
6. Section choreography with Framer Motion (enter/exit, scroll transforms).
7. Responsive/layout tuning (desktop-first, refine tablet/mobile).
8. Polishing: micro-interactions, icon glows, hover/tap feedback, reduced-motion.
9. Testing: run frontend lint; call Testing Agent (frontend only) with user stories; address issues.

User Stories (Phase 2)
1. As a visitor, I can scroll through a seamless, animated journey across all sections.
2. As I hover biomes, labels highlight and subtle glows intensify.
3. As I view the radar, values animate into place and react to preset toggles.
4. As I click “Simular Conquista,” a golden confetti burst fills the screen.
5. As I watch the feed, avatar bubbles float and an infinite marquee loops smoothly.
6. As I hover an avatar, I see a tooltip with current status (e.g., Mentoria Online).
7. As I inspect medals, reflections shift with my cursor, enhancing depth.
8. As I reduce motion in OS settings, animations tone down respectfully.

Success Criteria (Phase 2)
- All four sections implemented with cohesive transitions; no visual hitches.
- ≥60 FPS desktop; ≥40–60 FPS modern mobile; acceptable memory footprint.
- A11y: focusable hotspots, tooltips with ARIA, reduced-motion support.
- High-quality visuals: crisp avatars, icon glows, convincing metal reflections.
- Testing Agent report: no critical issues; minor issues addressed.

---
## 3) Next Actions
1. Approve this plan (or suggest tweaks to biomes/colors/interactions).
2. Phase 1: Implement POC component and validate perf/UX on preview.
3. On success, proceed to Phase 2 full build (estimate 20–30 min active dev per major section, plus polish).
4. Run Testing Agent (frontend only), fix issues, iterate polish.

## 4) Overall Success Criteria
- The landing page feels like a living ecosystem: responsive, organic, and human-welcoming.
- Visual demo complete: Hero map, radar/streak/confetti, live-like feed, dynamic medals.
- No backend dependency; high-quality mocked data; responsive across breakpoints.
- Meets performance targets and passes Testing Agent checks without critical findings.
