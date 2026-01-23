import React from 'react';
import Hero from './components/sections/Hero';
import Gallery from './components/sections/Projects';
import Inventory from './components/sections/Inventory';
import CandleDesigner from './components/sections/CandleDesigner';
import Contact from './components/sections/Contact';
import SectionWrapper from './components/SectionWrapper';
import { Home, GalleryHorizontalEnd, SquarePen, Archive, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', Icon: Home, label: 'Home' },
  { id: 'gallery', Icon: GalleryHorizontalEnd, label: 'Gallery' },
  { id: 'designer', Icon: SquarePen, label: 'Design' },
  { id: 'inventory', Icon: Archive, label: 'Inventory' },
  { id: 'contact', Icon: User, label: 'Contact' },
];

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
      
      {/* Sticky Navigation Icons */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col gap-6 items-center">
        {NAV_ITEMS.map(({ id, Icon, label }) => (
          <motion.a 
            key={id} 
            href={`#${id}`}
            whileHover={{ scale: 1.2, color: '#FC5C02' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className="group relative flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 hover:border-magma/50 transition-colors duration-300 text-white/40"
            aria-label={`Scroll to ${label}`}
          >
            <Icon size={18} strokeWidth={1.5} />
            
            {/* Tooltip */}
            <span className="absolute right-full mr-4 px-2 py-1 rounded bg-obsidian border border-white/10 text-[10px] uppercase tracking-widest text-taupe opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out whitespace-nowrap pointer-events-none translate-x-1 group-hover:translate-x-0">
              {label}
            </span>
            
            {/* Active Indicator Glow */}
            <motion.div 
              layoutId="nav-glow"
              className="absolute inset-0 rounded-full bg-magma/0 group-hover:bg-magma/5 blur-md -z-10"
            />
          </motion.a>
        ))}
      </div>
    </main>
  );
}

export default App;