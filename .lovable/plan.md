# DOT Concept Bar — website plan

## Goal
One-page editorial website for DOT Concept Bar (Subotica), in Serbian (default), Hungarian and English, built from verified public information only.

## Step 1 — Focused research (one pass)
- Read the supplied sources (Visit Subotica, Restaurant Guru, kafici.rs, webtrag, Instagram/Facebook where readable).
- Verify address, phone, email, hours, rating/review count, concept, amenities, menu/prices.
- Record every fact with source URL and date in `docs/RESEARCH.md`; anything unverified is marked "owner to confirm" and never shown as fact.
- Note 3-5 Awwwards references (principles only) in `docs/DESIGN-REFERENCES.md`.

## Step 2 — Design system
- Palette: charcoal #151515, ivory #F3EFE7, olive #74785C, burgundy #692D3B, warm grey #A7A39B (oklch tokens).
- Two fonts with Latin Extended (Serbian/Hungarian): a bold grotesk display + a refined text face.
- Swiss/editorial grid, thin rules, oversized section numbers, recurring dot motif, sharp corners, no cards/gradients/glow.

## Step 3 — Sections (single page, anchor nav)
01 Nav (compact on scroll, full-screen mobile overlay, SR/HU/EN)  
02 Hero (masked DOT reveal, dot motif, View Menu / Get Directions)  
03 About (asymmetric statement + image reveal, verified facts only)  
04 Menu (category filter, aligned RSD prices — only verified items; otherwise link to Instagram/contact)  
05 Gallery (varied crops, accessible lightbox w/ keyboard + swipe)  
06 Reviews (verified rating/count + link to Google Maps; no invented quotes)  
07 Instagram invitation (no live API)  
08 Visit (address, hours, Open Now indicator in Europe/Belgrade incl. past-midnight, call/email/directions, free map embed)  
09 Footer (large wordmark, contacts, languages, dot animation)

## Photos
Public photos aren't automatically licensed. I'll use clearly labeled, tasteful placeholders (typographic/dot compositions) and keep a photo slot list for the owner's approved images — no AI images posing as the real bar.

## Technical
- TanStack Start route `/` with full head(): title, description, OG, LocalBusiness/CafeOrCoffeeShop JSON-LD.
- Centralized typed data: `src/data/business.ts`, `menu.ts`, `hours.ts`, `reviews.ts`, `gallery.ts`, `i18n/{sr,hu,en}.ts`; language persisted in localStorage.
- Components: Navbar, Hero, About, Menu, MenuItem, Gallery, Lightbox, Reviews, Social, Visit, OpeningHours, LanguageSwitcher, Footer.
- Motion (framer-motion) as the only animation library; respects prefers-reduced-motion, lighter on mobile.
- Unit test for the Open Now logic (incl. after-midnight hours).
- No backend, no auth, no paid APIs.
