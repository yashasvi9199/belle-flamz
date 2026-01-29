# CHANGELOG

## 1.3.7

- fix: restored centered alignment for The Olfactory Vault on mobile viewports
- fix: resolved "crooked" layout on mobile by applying `justify-center` as the base flex property while maintaining `md:justify-start` for desktop safety margins

## 1.3.6

- fix: enforced strict 40px top clearance for The Olfactory Vault on desktop viewports
- change: switched Inventory layout to `justify-start` with fixed `md:py-10` and `md:h-screen` to prevent content from "crawling" into the safety margins

## 1.3.5

- change: optimized desktop layouts to feature mandatory 40px padding at both the top and bottom of sections
- change: switched to `justify-center` with `py-10` for desktop to ensure headings are properly spaced and components are vertically centered
- change: reduced vertical scale of Gallery previews, Atelier visualizers, and Inventory cards for better viewport fit
- fix: adjusted component internal spacing (mb, p) to prevent vertical overflow on standard desktop screens

## 1.3.4

- change: adjusted section layouts to move components slightly up on desktop by using `justify-end` with a fixed 40px bottom margin
- change: preserved centered composition for mobile devices to ensure optimal touch ergonomics
- fix: reduced vertical spacing between headings and content to prevent clipping on smaller desktop viewports

## 1.3.3

- change: unified section layouts using `justify-start` and consistent top padding (py-32) for improved content flow
- feature: introduced storytelling labels to Gallery, Inventory, and Contact sections to align with Bespoke Atelier
- fix: refined typography scales for section labels (text-lg on desktop) for better readability
- change: increased vertical margins between headings and content for a more spacious, premium aesthetic

## 1.3.2

- change: repositioned Bespoke Atelier description label directly below the section heading
- feature: added high-resolution cinematic background images to Gallery, Atelier, Vault, and Contact sections
- fix: implemented cinematic shadowing and vignetting on all section backgrounds to match the Hero section aesthetic
- fix: resolved missing import of getAssetPath in Contact section

## 1.3.1

- change: revised the entire webapp theme to match a high-end luxury fragrance and exotic candle business
- change: updated color palette to Golden Amber, Vanilla Silk, Sandalwood, and Deep Espresso
- change: implemented global typography update using Cormorant Garamond (Serif) and Outfit (Sans)
- change: refined section titles and messaging across Hero, Gallery, Atelier, and Vault sections
- feature: enhanced SEO metadata with descriptive title and brand-aligned meta description
- fix: updated all interactive components (buttons, nav, scrollbars) to align with the new aesthetic

## 1.3.0

- fix: implemented mobile responsiveness fix for "squashed" components and excessive bottom scroll space
- fix: repositioned navigation bar to the bottom for mobile devices with horizontal layout and improved touch targets
- change: upgraded SectionWrapper to use dynamic viewport height (dvh) and flex-centering for robust mobile vertical alignment
- fix: increased element scales on mobile (Galleries, Previews, Titles) for better screen utilization
- fix: resolved syntax error in Hero.tsx and improved text alignment for handheld devices

## 1.2.9

- feature: added GitHub Pages deployment workflow and configured Vite base path for subfolder hosting
- fix: resolved 404 image errors in both dev and production by implementing dynamic asset path resolution
- feature: comprehensive mobile optimization for all sections with responsive typography, touch-friendly navigation, and horizontal scroll galleries
- fix: gallery mobile view - removed navigation arrows, added bottom padding for description visibility
- fix: atelier custom - separated custom shape selection from file upload trigger, added bottom padding for preview visibility
- fix: fragrance archive - removed scroll constraints on mobile for full card visibility, adjusted desktop spacing to prevent clipping
- change: reduced component sizes on mobile (smaller titles, thumbnails, cards, previews) for full viewport visibility

## 1.2.8

- fix: implemented perfectly synchronized section push-out effect (parallax) for all sections
- change: unified section padding (py-32) and structural alignment (items-end) to match Inventory's visual behavior
- fix: transition logic now uses getBoundingClientRect for reliable sticky position tracking across all viewports

## 1.2.7

- change: optimized navigation icon animations to be snappier using spring transitions
- change: refined tooltip reveal with slide-in effect and faster duration

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
