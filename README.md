# Portfolio

A React + Vite rebuild of the Cohesion portfolio site from
[expansive-decisions-076459.framer.app](https://expansive-decisions-076459.framer.app/) —
same sections, copy, type scale, colours and imagery, hand-written in React
instead of exported from Framer.

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
  data/site.js         all copy, links and image URLs — edit this to change content
  data/logos.js        the 12 stack brand marks (raw SVG, lifted from the source)
  components/
    Nav.jsx            floating pill nav, active link tracks scroll position
    Hero.jsx           marquee, rotating role line, six floating 3D shapes
    About.jsx          three sticky panels that stack as you scroll
    Testimonials.jsx   auto-advancing slideshow with arrows
    Stack.jsx          12 flip cards (hover on desktop, tap on touch)
    Services.jsx       sticky numeral column synced to 12 scrolling descriptions
    Projects.jsx       six project cards + View More
    Footer.jsx         contact/link columns and the oversized wordmark
```

## Design tokens

Read off the source site and defined at the top of `src/index.css`: black `#000`,
body text `#4d4d4d`, accent orange `#f94706`, periwinkle `#6670ff` (used at 5% and
10% for card tints), numeral grey `#f2f2f2`; radii 24 / 48 / 96px; Public Sans
throughout with PT Serif italic for accents.

## Content notes

Images are hot-linked from `framerusercontent.com`, the same CDN the source site
serves them from. All text, links and the email address are the source site's own
placeholder copy — swap them in `src/data/site.js`.
