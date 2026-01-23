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

  // Get prev/next images for navigation (2 each)
  const prevImages = useMemo(() => {
    const prev: (GalleryImage | null)[] = [];
    for (let i = 2; i >= 1; i--) {
      const idx = selectedIndex - i;
      prev.push(idx >= 0 ? images[idx] : null);
    }
    return prev;
  }, [selectedIndex, images]);

  const nextImages = useMemo(() => {
    const next: (GalleryImage | null)[] = [];
    for (let i = 1; i <= 2; i++) {
      const idx = selectedIndex + i;
      next.push(idx < images.length ? images[idx] : null);
    }
    return next;
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Panel - Preview with Navigation */}
          <ConvergenceWrapper className="lg:col-span-3 flex items-center gap-4" staggerIndex={1}>
            {/* Previous Images Stack */}
            <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
              {prevImages.map((img, i) => (
                <button
                  key={img?.id || `prev-${i}`}
                  onClick={() => img && handleNavigate('prev', 2 - i)}
                  disabled={!img}
                  className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                    img 
                      ? 'bg-white/5 border border-white/10 hover:border-magma/50 cursor-pointer opacity-60 hover:opacity-100' 
                      : 'bg-white/5 border border-white/5 opacity-20 cursor-default'
                  }`}
                >
                  {img && (
                    <img 
                      src={img.src} 
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Main Preview */}
            <div className="flex-1 relative">
              <div className="aspect-[4/3] bg-white/5 rounded-xl overflow-hidden relative group">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60" />

                {/* Navigation Arrows */}
                <button
                  onClick={() => handleNavigate('prev')}
                  disabled={selectedIndex === 0}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 disabled:cursor-default hover:bg-magma/50"
                >
                  <ChevronLeft className="w-5 h-5 text-bone" />
                </button>
                <button
                  onClick={() => handleNavigate('next')}
                  disabled={selectedIndex === images.length - 1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 disabled:cursor-default hover:bg-magma/50"
                >
                  <ChevronRight className="w-5 h-5 text-bone" />
                </button>
              </div>
            </div>

            {/* Next Images Stack */}
            <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
              {nextImages.map((img, i) => (
                <button
                  key={img?.id || `next-${i}`}
                  onClick={() => img && handleNavigate('next', i + 1)}
                  disabled={!img}
                  className={`aspect-square rounded-lg overflow-hidden transition-all duration-300 ${
                    img 
                      ? 'bg-white/5 border border-white/10 hover:border-magma/50 cursor-pointer opacity-60 hover:opacity-100' 
                      : 'bg-white/5 border border-white/5 opacity-20 cursor-default'
                  }`}
                >
                  {img && (
                    <img 
                      src={img.src} 
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          </ConvergenceWrapper>

          {/* Right Panel - Grid + Description */}
          <ConvergenceWrapper className="lg:col-span-2 flex flex-col gap-6" staggerIndex={2}>
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