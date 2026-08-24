# Portfolio

Tejaswi Dubey — Brand Builder & Rapid MVP Architect. A React 19 + Vite site with
scroll-pinned sections, a light/dark theme, and five featured projects that open
into interactive live-preview sandboxes.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Layout

```
src/
  App.jsx              section order + hash deep-linking
  index.css            design tokens and every component style
  data/site.js         all copy, links, projects and image URLs
  data/logos.js        the 12 tech-stack brand marks (raw SVG)
  components/
    Nav.jsx            floating pill nav, active link tracks scroll position
    Hero.jsx           marquee, rotating role line, six floating 3D shapes
    About.jsx          three sticky panels that stack as you scroll
    Experience.jsx     work history cards
    MvpSprint.jsx      the three-week 0-to-1 delivery timeline
    BrandShowcase.jsx  brand architecture pillars
    Stack.jsx          12 flip cards (hover on desktop, tap on touch)
    Services.jsx       sticky numeral column synced to scrolling descriptions
    Projects.jsx       five project cards, each opening a live-preview modal
    ProjectModal.jsx   accessible modal: live demo / architecture / metrics tabs
    ProjectPoster.jsx  generated SVG card art, one motif per project
    demos/             one interactive sandbox per project (slug → component)
    Footer.jsx         contact/link columns and the oversized wordmark
```

## Project sandboxes

Featured projects open in-page rather than linking out. `slug` in
`projects.items` selects the sandbox from `src/components/demos/index.js`, so a
new project means one data entry plus one component. Set `liveUrl` on a project
and a "Visit live site" button appears in the modal header.

| Slug | Sandbox |
|---|---|
| `helios-grid` | Microgrid dispatch: demand/irradiance/wind sliders, RL autopilot toggle |
| `aperture-vision` | Camera feed with confidence threshold, segmentation, depth, re-ID |
| `loom-agents` | Agent pipeline that runs, retries on a strict validator, counts tokens |
| `prism-materials` | PBR material preview with roughness, metalness, light angle, presets |
| `vitalis-twin` | Biometric telemetry with a workload slider and 12-hour forecast |

Canvas demos share `useAnimatedCanvas` for DPR-correct sizing and a single rAF
loop that tears down with the modal; motion freezes under
`prefers-reduced-motion` while the controls stay live.

The modal traps Tab focus, closes on Escape / backdrop / the close button, locks
body scroll while open, and restores focus to the card that opened it.

## Design tokens

Defined at the top of `src/index.css` and re-mapped under `[data-theme="dark"]`:
accent orange `#f94706`, periwinkle `#6670ff` (5% and 10% tints for cards),
numeral grey `#f2f2f2`; radii 24 / 48 / 96px; Public Sans throughout with PT
Serif italic for accents. Each project also carries its own `accent`, exposed to
the modal and card as `--project-accent`.
