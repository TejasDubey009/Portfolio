# Portfolio

Tejaswi Dubey — Brand Builder & Rapid MVP Architect. A React 19 + Vite site with
scroll-pinned sections, a light/dark theme, and five featured projects that are
real, working websites living inside this same build.

## Commands

```bash
npm run dev      # dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Layout

```
index.html               the portfolio
work/<slug>/index.html   one HTML entry per sample site  →  /work/<slug>/
public/previews/         card art: <slug>-desktop.webp and <slug>-phone.webp
src/
  App.jsx                section order + hash deep-linking
  index.css              design tokens and every portfolio style
  data/site.js           all copy, links, projects and image URLs
  data/logos.js          the 12 tech-stack brand marks (raw SVG)
  components/
    Nav.jsx              floating pill nav, active link tracks scroll position
    Hero.jsx             marquee, rotating role line, six floating 3D shapes
    About.jsx            three sticky panels that stack as you scroll
    Experience.jsx       work history cards
    MvpSprint.jsx        the three-week 0-to-1 delivery timeline
    BrandShowcase.jsx    brand architecture pillars
    Stack.jsx            12 flip cards (hover on desktop, tap on touch)
    Services.jsx         sticky numeral column synced to scrolling descriptions
    Projects.jsx         five project cards; each opens the live site in a modal
    ProjectShot.jsx      card art: desktop capture in a browser frame, plus phone
    ProjectModal.jsx     the live site in a resizable frame, and notes on the build
    Footer.jsx           contact/link columns and the oversized wordmark
  sites/
    shared/              photo component, hooks, date helpers, portfolio badge
    marigold/            restaurant & café
    kurinji/             hotel & homestay, with a booking engine
    stillwater/          spa & boutique
    ninefold/            art gallery, with a 3D viewing room
    bonjour-pondy/       trip planner for Pondicherry
```

## The five sample sites

Each is a concept site for a fictional business, built as its own page with its
own stylesheet, typefaces and design language. Nothing is shared between them
except the small helpers in `src/sites/shared/`.

| Path | Site | What works |
|---|---|---|
| `/work/marigold/` | Marigold Canteen, restaurant & café | Menu with category tabs, dietary filters and search; table reservation with slot availability; pickup tray with tax; filter-coffee builder |
| `/work/kurinji/` | Kurinji House, hotel & homestay | Booking engine: two-month calendar with nightly rates and sold-out nights, room choice, extras, guest details, confirmation; look up or cancel a booking |
| `/work/stillwater/` | Stillwater, spa & boutique | Treatment builder and booking (therapist, day, time); apothecary shop with a bag; a gift card that tilts in 3D |
| `/work/ninefold/` | Ninefold, art gallery | CSS-3D viewing room with works hung to scale; filterable works index with zoom; shortlist and enquiry; programme RSVP |
| `/work/bonjour-pondy/` | Bonjour Pondy, trip planner | Generates a day-by-day itinerary from days, pace and interests; reorder, swap, add and remove stops with times and distances recalculated; flat/3D map; seasons chart; budget estimator |

Things worth knowing:

- **No back end.** Reservations, bookings, bags and plans are kept in
  `localStorage` under a per-site prefix (`marigold:`, `kurinji:`, `stillwater:`,
  `ninefold:`, `pondy:`). Nothing is sent anywhere and no payment is taken.
- **Availability is deterministic.** Free slots, sold-out nights and full days
  are derived from a hash of the date, so a site behaves the same on every visit.
- **Photography is hot-linked from Unsplash** through `src/sites/shared/img.jsx`.
  The gallery's artworks are generated in code (`src/sites/ninefold/Art.jsx`),
  and the Pondicherry map and illustrations are drawn in SVG.
- **Bonjour Pondy uses real places**, but its timings, prices and coordinates are
  indicative. The other four businesses are invented.
- Every site shows a small "Concept site by Tejaswi Dubey" link back to the
  portfolio. It hides itself when the site is embedded in the portfolio's modal.

### Adding or changing a site

1. Create `work/<slug>/index.html` and `src/sites/<slug>/main.jsx`.
2. Add the entry to `pages` in `vite.config.js`. Every listed entry must exist,
   or Vite's dependency scan fails and the dev server hangs on a blank page.
3. Add a project to `projects.items` in `src/data/site.js` with
   `liveUrl: 'work/<slug>/'`.
4. Add `public/previews/<slug>-desktop.webp` (1200 × 800) and
   `<slug>-phone.webp` (390 × 844). The current ones are captures of the live
   pages at 1440 × 960 and 390 × 844.

## Project cards and the preview modal

Clicking a card opens `ProjectModal`, which loads the site in an iframe.
"Desktop", "Tablet" and "Phone" set the frame to 1440, 834 and 390 px wide and
scale it down to fit, so the desktop view is the true desktop layout rather than
whatever happens to fit the dialog. "Open full site" goes to the page itself.

The modal traps Tab focus, locks body scroll, and restores focus to the card
that opened it. Escape closes it; when focus is inside the site and one of the
site's own drawers is open, Escape closes that drawer first.

## Design tokens

Defined at the top of `src/index.css` and re-mapped under `[data-theme="dark"]`:
accent orange `#f94706`, periwinkle `#6670ff` (5% and 10% tints for cards),
numeral grey `#f2f2f2`; radii 24 / 48 / 96px; Public Sans throughout with PT
Serif italic for accents. Each project carries an `accent` and a `stage` colour
taken from its own site, used for the card background and the modal's marker.
