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

  // Get single prev/next images for the asterisk pattern
  const prevImage = useMemo(() => {
    return selectedIndex > 0 ? images[selectedIndex - 1] : null;
  }, [selectedIndex, images]);

  const nextImage = useMemo(() => {
    return selectedIndex < images.length - 1 ? images[selectedIndex + 1] : null;
  }, [selectedIndex, images]);

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
    <section id="gallery" className="min-h-screen py-24 px-4 md:px-12 bg-obsidian relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ConvergenceWrapper>
          <h2 className="font-serif text-5xl md:text-7xl text-bone mb-16 text-center md:text-left">
            THE <span className="text-magma italic">GALLERY</span>
          </h2>
        </ConvergenceWrapper>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Panel - Pattern: "*" [prev] <preview> [next] "*" */}
          <ConvergenceWrapper className="lg:col-span-9 flex items-end justify-center gap-4 md:gap-8" staggerIndex={1}>
            {/* Left Decorative Asterisk (Bottom Aligned) */}
            <div className="hidden sm:block text-magma/40 text-4xl md:text-5xl font-serif select-none mb-1">
              "*"
            </div>

            {/* Previous Tiny Image (*) */}
            <button
              onClick={() => prevImage && handleNavigate('prev')}
              disabled={!prevImage}
              className={`w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-300 mb-1 ${
                prevImage 
                  ? 'bg-white/5 border border-white/10 hover:border-magma/50 cursor-pointer opacity-70 hover:opacity-100 scale-90 hover:scale-100' 
                  : 'bg-white/5 border border-white/5 opacity-10 cursor-default'
              }`}
            >
              {prevImage && (
                <img 
                  src={prevImage.src} 
                  alt="Previous"
                  className="w-full h-full object-cover"
                />
              )}
            </button>

            {/* Main Preview (The anchor) */}
            <div className="flex-1 max-w-[700px] relative">
              <div className="aspect-[16/10] bg-white/5 rounded-2xl overflow-hidden relative group border border-white/5 shadow-2xl">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-80" />

                {/* Navigation Arrows (Internal Overlay) */}
                <button
                  onClick={() => handleNavigate('prev')}
                  disabled={selectedIndex === 0}
                  className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-magma/50 disabled:hidden"
                >
                  <ChevronLeft className="w-6 h-6 text-bone" />
                </button>
                <button
                  onClick={() => handleNavigate('next')}
                  disabled={selectedIndex === images.length - 1}
                  className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-magma/50 disabled:hidden"
                >
                  <ChevronRight className="w-6 h-6 text-bone" />
                </button>
              </div>
            </div>

            {/* Next Tiny Image (*) */}
            <button
              onClick={() => nextImage && handleNavigate('next')}
              disabled={!nextImage}
              className={`w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 transition-all duration-300 mb-1 ${
                nextImage 
                  ? 'bg-white/5 border border-white/10 hover:border-magma/50 cursor-pointer opacity-70 hover:opacity-100 scale-90 hover:scale-100' 
                  : 'bg-white/5 border border-white/5 opacity-10 cursor-default'
              }`}
            >
              {nextImage && (
                <img 
                  src={nextImage.src} 
                  alt="Next"
                  className="w-full h-full object-cover"
                />
              )}
            </button>

            {/* Right Decorative Asterisk (Bottom Aligned) */}
            <div className="hidden sm:block text-magma/40 text-4xl md:text-5xl font-serif select-none mb-1">
              "*"
            </div>
          </ConvergenceWrapper>

          {/* Right Panel - Grid + Description */}
          <ConvergenceWrapper className="lg:col-span-3 flex flex-col gap-6" staggerIndex={2}>
            {/* Grid Container */}
            <div className="relative">
              <div 
                ref={gridRef}
                className={`grid grid-cols-3 gap-3 ${
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