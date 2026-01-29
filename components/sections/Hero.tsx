import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { getAssetPath } from '../../src/utils/path';

const Hero = () => {
  return (
    <section id="hero" className="w-full min-h-screen flex flex-col justify-center overflow-hidden bg-obsidian text-bone relative">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getAssetPath('/hero-candles.png')} 
          alt="Burning luxury candles" 
          className="w-full h-full object-cover opacity-40 scale-105"
          style={{ willChange: 'transform' }}
        />
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        
        {/* Animated Flame Glow - Optimized */}
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,_rgba(233,196,106,0.15),_transparent_50%)] mix-blend-screen"
          style={{ willChange: 'opacity, transform' }}
        />
      </div>

      {/* Floating Sparkles - Adjusted to gold */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${20 + i * 10}%`, 
              y: "110%", 
              opacity: 0,
            }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.6, 0],
            }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity, 
              delay: i * 2.5,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-magma/40 rounded-full blur-[1px]"
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </div>
      {/* Reduced particles for mobile */}
      <div className="absolute inset-0 pointer-events-none z-10 md:hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${25 + i * 25}%`, 
              y: "110%", 
              opacity: 0,
            }}
            animate={{ 
              y: "-10%", 
              opacity: [0, 0.6, 0],
            }}
            transition={{ 
              duration: 14 + i * 3, 
              repeat: Infinity, 
              delay: i * 4,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-magma/40 rounded-full blur-[1px]"
            style={{ willChange: 'transform, opacity' }}
          />
        ))}
      </div>

      {/* Main Content - Left Aligned */}
      <div className="z-20 px-6 md:px-16 lg:px-24 max-w-4xl relative">
        {/* Brand Label */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-8"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 mb-4 md:mb-4">
            <Flame className="w-4 h-4 text-magma" />
            <span className="font-sans text-magma text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.6em] uppercase font-light">Haute Fragrance Atelier</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-extralight tracking-tight leading-[0.8] text-transparent bg-clip-text bg-gradient-to-br from-bone via-bone to-magma/40 text-center md:text-left italic">
            Belle
            <br />
            <span className="font-bold text-magma not-italic tracking-tighter">FLAMZ</span>
          </h1>
        </motion.div>

        {/* Business Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="space-y-4 md:space-y-4"
        >
          <p className="font-serif text-taupe text-lg md:text-xl lg:text-2xl max-w-lg leading-relaxed text-center md:text-left mx-auto md:mx-0 font-light italic">
            Illuminating spaces with rare essences and handcrafted sculptural elegance.
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 pt-4 md:pt-2">
            <span className="px-4 py-1.5 bg-white/5 border border-magma/10 rounded-full text-[9px] md:text-[10px] font-sans uppercase tracking-[0.2em] text-bone/60">
              Rare Botanicals
            </span>
            <span className="px-4 py-1.5 bg-white/5 border border-magma/10 rounded-full text-[9px] md:text-[10px] font-sans uppercase tracking-[0.2em] text-bone/60">
              Oud & Sandalwood
            </span>
            <span className="px-4 py-1.5 bg-white/5 border border-magma/10 rounded-full text-[9px] md:text-[10px] font-sans uppercase tracking-[0.2em] text-bone/60">
              Limited Editions
            </span>
          </div>
        </motion.div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="mt-12 md:mt-12 h-px w-24 md:w-32 bg-gradient-to-r from-magma to-transparent origin-left hidden md:block"
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-white/20 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-magma rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default memo(Hero);