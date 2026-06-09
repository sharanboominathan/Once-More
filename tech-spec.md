# Tech Spec — Once More Photography Redesign

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.0 | UI framework |
| `react-dom` | ^19.0 | DOM renderer |
| `react-router-dom` | ^7.0 | Client-side routing (Home + Portfolio pages) |
| `gsap` | ^3.12 | Animation engine (ScrollTrigger, Flip, SplitText plugins) |
| `lenis` | ^1.2 | Smooth scroll with inertia |
| `imagesloaded` | ^5.0 | Image load detection for ScrollTrigger refresh |
| `tailwindcss` | ^4.0 | Utility-first CSS |
| `@tailwindcss/vite` | ^4.0 | Tailwind Vite integration |
| `vite` | ^6.0 | Build tool |
| `@vitejs/plugin-react` | ^4.0 | React Vite plugin |
| `typescript` | ^5.7 | Type checking |
| `@types/react` | ^19.0 | React type definitions |
| `@types/react-dom` | ^19.0 | ReactDOM type definitions |

No shadcn/ui components — every element is custom-designed with the site's cinematic aesthetic.

---

## Component Inventory

### Layout (shared across pages)

| Component | Source | Notes |
|-----------|--------|-------|
| **Navigation** | Custom | Fixed header with scroll-aware background transition (transparent → frosted burgundy). Full-screen mobile overlay menu. |
| **Footer** | Custom | Contact CTA section + 4-column info grid + copyright row. |
| **CustomCursor** | Custom | `requestAnimationFrame` lerp follower. Hidden on touch devices. Expands on interactive hover. |
| **GrainOverlay** | Custom | Fixed full-viewport noise tile with stepped position animation. |
| **SmoothScrollProvider** | Custom | Lenis initializer + GSAP ScrollTrigger bridge. Manages `prefers-reduced-motion` fallback. |

### Sections (Homepage — `index.md`)

| Component | Notes |
|-----------|-------|
| **HeroSection** | Full-viewport video background + gradient overlay. Choreographed load sequence (see Animations). |
| **MarqueeSection** | Infinite-scroll text band with scroll-velocity speed modulation. |
| **AboutSection** | Split layout: mask-reveal image + character-animated headline + counting stats. |
| **ServicesSection** | 2-col layout: featured image + 2×3 card grid with 3D tilt. Scroll-flattening perspective. |
| **PortfolioPreviewSection** | 5-column parallax masonry grid with alternating column scroll speeds. |
| **WeddingFilmSection** | Full-width cinematic banner with background Ken Burns zoom. Play button triggers lightbox. |
| **TestimonialsSection** | 2-col: featured quote card + secondary quote with photo collage. |
| **LiveStreamingSection** | Compact promo banner with gradient background. |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| **SectionHeader** | Custom | About, Services, PortfolioPreview, WeddingFilm, Testimonials, LiveStreaming — renders Caption + Display headline with SplitText char reveal. |
| **VideoLightbox** | Custom | WeddingFilmSection — modal overlay for wedding film trailer playback. |
| **CountUpStat** | Custom | AboutSection — animates number from 0 to target on scroll trigger. |
| **ParallaxGrid** | Custom | PortfolioPreviewSection — multi-column masonry with per-column scrubbed parallax. |
| **ServiceCard** | Custom | ServicesSection — perspective-tilt hover card. |
| **TiltContainer** | Custom | ServiceCard — generic 3D tilt on mousemove (rotateX/Y from cursor position). |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| **Smooth scrolling** | Lenis + GSAP ScrollTrigger | Lenis instance wired to `ScrollTrigger.update` on every scroll event. Destroyed on `prefers-reduced-motion`. | Low |
| **Hero load sequence** | GSAP timeline | Single master timeline: nav fade → video fade → grain fade → SplitText headline (blur variant, line-staggered) → subtext fade → scroll indicator. Total ~4.5s. | High |
| **Marquee infinite scroll** | CSS animation + JS | Pure CSS `@keyframes translateX(-50%)` for the loop. JS reads Lenis velocity on rAF, maps to `animationDuration` inline style (1× to 3× speed range). | Medium |
| **Marquee clip reveal entrance** | GSAP ScrollTrigger | `clipPath: inset(100% 0 0 0)` → `inset(0)` on section trigger. | Low |
| **Image mask reveal** | GSAP ScrollTrigger | Timeline: overlay `scaleY: 0` + inner image `scale: 1.2→1.0`, simultaneous, `power3.inOut`. | Medium |
| **Text character reveal** | GSAP SplitText + ScrollTrigger | SplitText splits into chars. Each char in `overflow:hidden` wrapper. `yPercent: 120→0` with `0.03s` stagger. Blur variant adds `filter: blur(8px→0)` for hero. | Medium |
| **Stats count-up** | GSAP ScrollTrigger | `gsap.to` with `snap: 1` on a proxy object, `onUpdate` writes to DOM. `0.2s` stagger across 3 stats. | Low |
| **3D tilt hover** | CSS + JS | `perspective: 1000px` on container. `mousemove` calculates cursor offset → `rotateX/Y` (±12deg max). Radial gradient glow via CSS custom properties. `mouseleave` spring-back transition. Disabled on touch. | Medium |
| **Services perspective flatten** | GSAP ScrollTrigger | Scrubbed tween: grid `rotateY(-8deg) rotateX(3deg)` → `rotateY(0) rotateX(0)` as section scrolls through viewport. | Low |
| **Parallax image grid** | GSAP ScrollTrigger (scrub) | Per-column timeline: column `yPercent` drift + per-item `yPercent` and `scale` from random-generated params. Alternating column directions. `imagesLoaded` → `ScrollTrigger.refresh()`. | High |
| **Wedding film Ken Burns** | GSAP ScrollTrigger (scrub) | Background image `scale: 1.0→1.05` scrubbed over full section scroll range. | Low |
| **Film grain overlay** | JS (rAF) | Fixed noise tile PNG. rAF shifts `backgroundPosition` by random tile multiples every 100ms. `will-change: transform`. | Low |
| **Custom cursor** | JS (rAF) | Lerp position tracking (factor 0.15). State-based sizing: default (20px) → interactive (48px) → gallery "VIEW" mode. `pointer-events: none`. Hidden on `pointer: coarse`. | Medium |
| **Scroll indicator loop** | GSAP | Circle `translateY(0→40px)` + `opacity: 1→0`, `repeat: -1`, `ease: power2.in`. | Low |
| **Standard entrances** (fade-up, fade-in, slide, scale-in, clip-reveal) | GSAP ScrollTrigger | Reusable hook/component applying preset configs. Intersection-triggered, one-shot (`toggleActions: play none none none`). | Low |
| **Video lightbox** | CSS + JS | Modal overlay with backdrop blur. Video element created/destroyed on open/close to avoid background load. Escape key + backdrop click to close. | Low |

---

## State & Logic Plan

### Lenis ↔ GSAP ScrollTrigger Bridge

Lenis must drive ScrollTrigger updates on every frame. Implement as a `SmoothScrollProvider` context at the app root:

- On mount: create Lenis instance, register `lenis.on('scroll', ScrollTrigger.update)`, start RAF loop calling `lenis.raf()`.
- On unmount: destroy Lenis, kill ScrollTrigger instances.
- On `prefers-reduced-motion` match: skip Lenis creation entirely — native scroll, ScrollTrigger still works.
- Expose `lenis` ref via context so sections can call `lenis.scrollTo()` for anchor navigation.

### Hero Load Sequence Orchestration

The hero has a 8-step timed load sequence (see `design.md`). Use a single GSAP master timeline created in `HeroSection` on mount:

- All child animations (nav, video, grain, SplitText, fade-ups) are timeline segments with absolute position offsets (`0.2`, `0.6`, `0.8`, etc.).
- The timeline plays once on mount and is killed on unmount.
- SplitText must be created before the timeline is built. Clean up SplitText revert on unmount.
- If the video takes longer than the poster frame to load, the timeline should not block — video fade handles the actual element, poster is already visible.

### Marquee Velocity Hook

Extract scroll-velocity-to-speed logic into a `useMarqueeVelocity` hook:

- Accepts a Lenis instance (from context).
- On each Lenis scroll event, reads `velocity`, maps `Math.abs(velocity) * 0.005 + 1` clamped to `[1, 3]`.
- Returns a reactive `timeScale` value.
- A rAF loop applies the current `timeScale` as inline `animationDuration` on the marquee track (base 20s ÷ timeScale).
- Cleanup: cancel rAF on unmount.

### Parallax Grid Parameter Generation

The parallax grid requires per-item random parameters (`yPercent` 100-500, `scale` 0.5-2.0) that must be stable across re-renders:

- Generate parameters once in `useMemo` keyed by image count, storing as an array of `{ y, scale }` objects.
- Pass the parameters array into the GSAP timeline setup.
- This avoids re-creating ScrollTrigger instances on every render while keeping randomness.

### Image Loading Orchestration

`imagesLoaded` must resolve before `ScrollTrigger.refresh()` is called for the parallax grid:

- `ParallaxGrid` component uses `imagesLoaded(gridRef, { background: true }, callback)`.
- Only after the callback fires, call `ScrollTrigger.refresh()`.
- Show no explicit loading state — images render naturally, ScrollTrigger corrects positions once measured.

### Custom Cursor Position + State

The cursor runs outside React's render cycle for performance:

- Position updated via `ref` + `requestAnimationFrame` lerp (not `useState`).
- Cursor mode (default / interactive / gallery-view) tracked in a `ref` updated by hover event listeners on interactive elements.
- DOM updates applied directly to the cursor element in the rAF loop.
- Only mode changes that affect visual styling (size, text content) use minimal `useState`.

---

## Other Key Decisions

### Routing

Two routes: `/` (Homepage) and `/portfolio` (gallery page). The Portfolio page is defined in `design.md` as a separate route but its detailed spec is not in scope for this file — the homepage is the full rebuild target. React Router with `<BrowserRouter>` at the app root. Navigation links use `<Link>` for internal routes.

### No Component Library

The design is entirely bespoke — dark cinematic palette, custom cards with 3D tilt, editorial typography, film grain overlay. No standard UI primitives (buttons, dialogs, forms) exist in a conventional sense. All components are hand-built to match the luxury editorial aesthetic.

### Video Strategy

Hero video: `<video>` element with `preload="none"`, poster frame as first-frame JPG. Trigger `video.load()` after initial paint (via `requestIdleCallback` or `setTimeout`). Two source formats: WebM (VP9) first, MP4 (H.264) fallback. Max 1080p, 4-6 Mbps.

Wedding film trailer: loaded on-demand inside `VideoLightbox` — video element created when modal opens, destroyed on close. No preload.

### Asset Pipeline

All images served as WebP with JPG fallback via `<picture>` or `srcset`. Grid images max 600px wide. Hero poster at 1920px. Grain texture is a 128×128 PNG tile (generated once, not an AI asset). Images in the parallax grid use native `loading="lazy"`.
