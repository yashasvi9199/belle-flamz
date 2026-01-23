import React from 'react';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Projects';
import Inventory from './components/sections/Inventory';
import CandleDesigner from './components/sections/CandleDesigner';
import Contact from './components/sections/Contact';
import SectionWrapper from './components/SectionWrapper';

const TOTAL_SECTIONS = 5;

function App() {
  return (
    <main className="bg-obsidian w-full relative selection:bg-magma selection:text-white">
      {/* Global Grain Overlay for texture */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }} 
      />
      
      <SectionWrapper sectionIndex={0} totalSections={TOTAL_SECTIONS}>
        <Hero />
      </SectionWrapper>
      
      <SectionWrapper sectionIndex={1} totalSections={TOTAL_SECTIONS}>
        <Gallery />
      </SectionWrapper>
      
      <SectionWrapper sectionIndex={2} totalSections={TOTAL_SECTIONS}>
        <CandleDesigner />
      </SectionWrapper>
      
      <SectionWrapper sectionIndex={3} totalSections={TOTAL_SECTIONS}>
        <Inventory />
      </SectionWrapper>
      
      <SectionWrapper sectionIndex={4} totalSections={TOTAL_SECTIONS}>
        <Contact />
      </SectionWrapper>
      
      {/* Sticky Navigation Dot */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-4">
        {['hero', 'gallery', 'designer', 'inventory', 'contact'].map((id) => (
          <a 
            key={id} 
            href={`#${id}`}
            className="w-2 h-2 rounded-full bg-white/20 hover:bg-magma transition-colors duration-300"
            aria-label={`Scroll to ${id}`}
          />
        ))}
      </div>
    </main>
  );
}

export default App;