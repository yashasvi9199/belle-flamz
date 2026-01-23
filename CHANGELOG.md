# CHANGELOG

## 1.2.6

- feature: replaced navigation dots with animated Lucide icons (Home, Gallery, Design, Inventory, User)
- change: added tooltips and interactive hover states to side navigation

## 1.2.5

- fix: added scroll buffer between sections to prevent premature transitions
- change: increased SectionWrapper container height to 140vh to provide 40vh of stay-time before next section enters

## 1.2.4

- change: Reduced scale of Gallery preview and grid thumbnails for better viewport fit
- fix: Gallery images not loading (replaced placeholders with img tags)
- change: Simplified Gallery layout with smooth fade-in transitions
- change: Removed decorative asterisks and tiny navigation images for a cleaner look

## 1.2.3

- fix: removed overflow-hidden on main container to restore CSS sticky scroll functionality

## 1.2.2

- fix: scroll animation broken - sections not visible after hero
- fix: jittering caused by JS position switching during scroll
- removed: blur effect on scroll completely
- change: migrated to pure CSS sticky positioning for smooth curtain effect

## 1.2.1

- feature: staggered component reveals (pseudo-rendering) added to all site sections
- feature: inventory grid now supports scrollable layout with bottom fade effect
- change: refined curtain scroll animation for smoother section overlap and blur
- fix: resolved array mutation bug in fragrance sorting logic

## 1.2.0

- feature: Hero section repositioned with left-aligned branding and business tagline
- feature: Gallery section redesigned with grid/preview layout and 2 prev/2 next navigation
- feature: Atelier Custom replaced Sculptural with custom image upload option
- feature: Fragrance Archive now loads from JSON with popularity-based sorting
- feature: Scroll animation system with blur and overlap transitions between sections
- change: ConvergenceWrapper optimized with fixed initial states to prevent jitter
- removed: Explore Collection button from Hero section
- removed: Generate Artifact Mythos button from Atelier Custom
- removed: Intensity slider from Fragrance Archive search

## 1.1.0

- feature: animated hero section with burning candle background and light flicker effects

## 1.0.1

- fix: TypeScript namespace error in useMagnetic hook
- fix: ConvergenceWrapper key prop type definition

## 1.0.0

- feature: initial project setup
