import React, { memo, useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import galleryData from '../../src/data/gallery.json';
import { ConvergenceWrapper } from '../ConvergenceWrapper';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  description: string;
}

const Gallery = () => {
  const images: GalleryImage[] = galleryData.images;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showScrollbar, setShowScrollbar] = useState(false);

  const selectedImage = images[selectedIndex];

  // No longer using tiny navigation images

  // Check if scrollbar needed (more than 6 images with 3 per row = 2 rows)
  useEffect(() => {
    setShowScrollbar(images.length > 6);
  }, [images.length]);

  const handleNavigate = (direction: 'prev' | 'next', offset: number = 1) => {
    if (direction === 'prev') {
      const newIndex = selectedIndex - offset;
      if (newIndex >= 0) setSelectedIndex(newIndex);
    } else {
      const newIndex = selectedIndex + offset;
      if (newIndex < images.length) setSelectedIndex(newIndex);
    }
  };

  return (
    <section id="gallery" className="min-h-screen py-24 px-4 md:px-12 bg-obsidian border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <ConvergenceWrapper>
            <h2 className="font-serif text-5xl md:text-7xl text-bone">
              THE <span className="text-magma italic">GALLERY</span>
            </h2>
          </ConvergenceWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Panel - Portrait Preview Only */}
          <ConvergenceWrapper className="lg:col-span-7 flex justify-center" staggerIndex={1}>
            <div className="w-full max-w-[420px] relative">
              <div className="aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden relative group border border-white/5 shadow-2xl">
                <img
                  key={selectedImage.src}
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover transition-all duration-1000 animate-in fade-in zoom-in-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-80" />

                {/* Navigation Arrows (Internal Overlay) */}
                <button
                  onClick={() => handleNavigate('prev')}
                  disabled={selectedIndex === 0}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-magma/50 disabled:hidden z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-bone" />
                </button>
                <button
                  onClick={() => handleNavigate('next')}
                  disabled={selectedIndex === images.length - 1}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-magma/50 disabled:hidden z-10"
                >
                  <ChevronRight className="w-6 h-6 text-bone" />
                </button>
              </div>
            </div>
          </ConvergenceWrapper>

          {/* Right Panel - Grid + Description */}
          <ConvergenceWrapper className="lg:col-span-5 flex flex-col gap-6" staggerIndex={2}>
            {/* Grid Container */}
            <div className="relative">
              <div 
                ref={gridRef}
                className={`grid grid-cols-4 gap-2 ${
                  showScrollbar 
                    ? 'max-h-[280px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-magma scrollbar-track-white/5' 
                    : ''
                }`}
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#FC5C02 rgba(255,255,255,0.05)'
                }}
              >
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedIndex === index
                        ? 'ring-2 ring-magma ring-offset-2 ring-offset-obsidian scale-95'
                        : 'bg-white/5 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img 
                      src={img.src} 
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Fade effect at bottom when scrollable */}
              {showScrollbar && (
                <div className="absolute bottom-0 left-0 right-3 h-16 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
              )}
            </div>

            {/* Description */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
              <h4 className="font-serif text-xl text-bone italic mb-2">
                {selectedImage.title}
              </h4>
              <p className="font-sans text-sm text-taupe leading-relaxed line-clamp-4">
                {selectedImage.description}
              </p>
            </div>
          </ConvergenceWrapper>
        </div>
      </div>
    </section>
  );
};

export default memo(Gallery);