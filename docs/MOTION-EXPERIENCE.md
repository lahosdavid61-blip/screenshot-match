# DOT motion experience

Original SVG artwork, real photographic cutouts and finite CSS motion integrated with the existing Motion-based React components. No new dependency.

- Hero: eight placements of four different real coffee beans cropped from Raysonho’s CC0 studio photograph. Individual curved entrance directions, focus shift, perspective, rotation and gentle deceleration settle into a stable photographic composition around the DOT wordmark. The intro runs on every page load, with no session gate. Mobile travel is shorter and reduced-motion visitors receive the final static composition.
- Section headings: camera focus and localized flash (gallery), speech bubble and decorative stars (reviews), coffee cup (about), record/music detail (events), map pin and dotted route (visit), clock (hours). Section motifs play on viewport entry and on explicit anchor clicks while visible.
- Menu: slide-in cup and steam, clinking pairs of beer/cocktail/wine glasses, lemonade with falling ice and a rotating lemon garnish. The all-category menu card has its own entrance. Category changes remount the illustration so rapid switching interrupts old animations.
- Reduced motion: static photographic beans, no SVG movement or flash, no magnetic pointer displacement, and short/no menu and hero transitions. All decorative SVGs are hidden from assistive technology.
- Design direction: brand-specific details and immediate feedback rather than long loaders. Awwwards editorial references: https://assets.awwwards.com/awards/gallery/2023/07/HOT-RIGHT-NOW-BOOK-2023.pdf and https://www.awwwards.com/brainfood-mobile-performance-vol3.pdf (general principles only; no copied assets or code).

## Review checklist
Run `npm run build`, `npm test` and `npm run lint` with the existing dependencies. In the browser, check 360, 390, 430, 768, 1280, 1440 and 1920px widths, each theme/language, rapid category switching, direct hash navigation and reduced-motion preference. Confirm that the gallery lightbox, search, prices, opening hours and contact links remain intact.

The authoring environment could inspect and edit repository files through the GitHub API but could not clone the repository or install/run dependencies because network access was unavailable. Browser rendering and build/test results therefore require verification before merging or deploying.

Added component-level tests for refresh behavior, photographic rendering, category-specific SVG elements and menu switching. These tests have not been executed in the authoring environment.

Photographic update: four CSS-clipped silhouettes from a single 2560 × 1706 Wikimedia preview of a real 4367 × 2911 studio photograph. The original is CC0. Source and credit are documented in RESEARCH.md. Browser-side color grading brightens the photo and accentuates the roasted texture. The image remains externally hosted because local binary downloads are blocked. Browser rendering and build/test execution remain unverified.

## Cinematic inspiration
- Distillo (CSS Design Awards Website of the Day): https://www.cssdesignawards.com/sites/distillo/39324/ — coffee-focused animated product storytelling.
- Awwwards-inspired principle: layered photography and typography with one memorable entrance, not a blocking loader. The Awwwards Distillo page could not be opened. All motion and crop masks are original implementations; no third-party code or animation was copied.

## Local-image reliability fix
The previous external photo and image-readiness gate have been removed. Four individually photographed normal roasted beans are now bundled under public/beans/, with the upstream license and credits. Eight photo elements render on every visit or reload, with CSS-only entrance motion and a static reduced-motion pose. The image masks remove the original light backgrounds visually. No browser/network dependency on Wikimedia remains. The actual binary files were checked by SHA against the upstream files. Browser/build tests were not run in this environment.
