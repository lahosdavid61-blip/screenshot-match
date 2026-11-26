# DOT motion experience

Original SVG artwork and finite CSS animation, integrated with the existing Motion-based React components. No new dependency or external asset is needed.

- Hero: eight static placements of a real 1005 × 1005 transparent coffee bean photograph, with fixed angles and sizes. They render on every page load, including refresh, with no storage gate or bean animation. The existing DOT text entrance remains unchanged.
- Section headings: camera focus and localized flash (gallery), speech bubble and decorative stars (reviews), coffee cup (about), record/music detail (events), map pin and dotted route (visit), clock (hours). Section motifs play on viewport entry and on explicit anchor clicks while visible.
- Menu: slide-in cup and steam, clinking pairs of beer/cocktail/wine glasses, lemonade with falling ice and a rotating lemon garnish. The all-category menu card has its own entrance. Category changes remount the illustration so rapid switching interrupts old animations.
- Reduced motion: static photographic beans, no SVG movement or flash, no magnetic pointer displacement, and short/no menu and hero transitions. All decorative SVGs are hidden from assistive technology.
- Design direction: brand-specific details and immediate feedback rather than long loaders. Awwwards editorial references: https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf and https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf (general principles only; no copied assets or code).

## Review checklist
Run `npm run build`, `npm test` and `npm run lint` with the existing dependencies. In the browser, check 360, 390, 430, 768, 1280, 1440 and 1920px widths, each theme/language, rapid category switching, direct hash navigation and reduced-motion preference. Confirm that the gallery lightbox, search, prices, opening hours and contact links remain intact.

The authoring environment could inspect and edit repository files through the GitHub API but could not clone the repository or install/run dependencies because network access was unavailable. Browser rendering and build/test results therefore require verification before merging or deploying.

Added component-level tests for refresh behavior, photographic rendering, category-specific SVG elements and menu switching. These tests have not been executed in the authoring environment.

Photographic update: the source is a verified Wikimedia Commons photograph, served from its original image URL because binary download was unavailable in the editing environment. One image is reused in eight placements; the footer credits the original photographer and cutout author with license and source links. No claim is made that these beans are specific to DOT. The original image URL was opened during research; browser rendering and build/test execution remain unverified.
