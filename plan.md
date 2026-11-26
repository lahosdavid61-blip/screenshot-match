# DOT Concept Bar redesign plan

## Direction

**DOT — A Place With Character.** Contemporary European editorial hospitality design with an urban, warm and locally grounded voice. The existing burgundy / ivory / olive palette is retained as the strongest verified direction and refined into a restrained token system.

- **Movement:** editorial hospitality / modern European retro.
- **Principles:** asymmetric compositions, typographic confidence, purposeful circular motion, direct local copy.
- **Layout:** chapter-based long-form page with alternating editorial compositions rather than repeated cards.
- **Signature elements:** the DOT circle, outlined section numbers, masked/revealed imagery when approved assets exist.
- **Interaction:** fast, reversible, touch-friendly; no scroll hijacking; reduced-motion support.
- **Typography:** Archivo for display and Newsreader for readable editorial body text, both with Latin-ext support.
- **Brand voice:** short, specific and locally useful. Example: “Mala tačka u centru grada.” / “Find your moment at DOT.”

## Implementation

Reuse the current React/TanStack Start structure and `motion` as the only animation library. Keep all factual content in `src/data/`, all visible UI copy in `src/i18n/dict.ts`, and retain the current no-invention policy for prices, hours, reviews and photography. Improve the hero, navigation, menu discovery, gallery state, visit conversion actions and responsive/mobile treatment without adding backend infrastructure. Add route metadata and the required static route manifest.

The menu remains explicitly unpriced until an official menu is supplied. The gallery remains a rights-safe owner-confirmation state rather than using stock or generated business photography.

## Project structure

- `src/data/`: verified business, menu, hours, reviews and image metadata.
- `src/components/site/`: page chapters and interaction components.
- `src/i18n/`: Serbian default, Hungarian and English copy.
- `src/styles.css`: design tokens, typography, motion and responsive utilities.
- `docs/`: research, sources, design references and owner-confirmation notes.
