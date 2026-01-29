import React, { memo, useState, useMemo, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import galleryData from '../../src/data/gallery.json';
import { ConvergenceWrapper } from '../ConvergenceWrapper';
import { getAssetPath } from '../../src/utils/path';

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

  // Check if scrollbar needed
  useEffect(() => {
    setShowScrollbar(images.length > 6);
  }, [images.length]);

  return (
    <section id="gallery" className="w-full min-h-screen py-10 md:py-20 px-4 md:px-12 bg-obsidian border-t border-white/5 relative flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Title */}
        <div className="mb-6 md:mb-16">
          <ConvergenceWrapper>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-bone">
              THE <span className="text-magma italic">GALLERY</span>
            </h2>
          </ConvergenceWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Panel - Portrait Preview Only */}
          <ConvergenceWrapper className="lg:col-span-12 xl:col-span-7 flex justify-center order-1" staggerIndex={1}>
            <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[420px] relative">
              <div className="aspect-[3/4] bg-white/5 rounded-xl md:rounded-2xl overflow-hidden relative group border border-white/5 shadow-2xl">
                <img
                  key={selectedImage.src}
                  src={getAssetPath(selectedImage.src)}
                  alt={selectedImage.title}
                  className="w-full h-full object-cover transition-all duration-1000 animate-in fade-in zoom-in-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent opacity-80" />
              </div>
            </div>
          </ConvergenceWrapper>

          {/* Right Panel - Grid + Description */}
          <ConvergenceWrapper className="lg:col-span-12 xl:col-span-5 flex flex-col gap-4 md:gap-6 order-2" staggerIndex={2}>
            {/* Grid Container */}
            <div className="relative">
              <div 
                ref={gridRef}
                className="flex md:grid md:grid-cols-4 gap-2 overflow-x-auto md:overflow-x-visible md:max-h-[280px] md:overflow-y-auto pb-4 md:pb-0 md:pr-3 scrollbar-thin scrollbar-thumb-magma scrollbar-track-white/5 snap-x snap-mandatory md:snap-none"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#FC5C02 rgba(255,255,255,0.05)'
                }}
              >
                {images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`flex-shrink-0 w-14 h-14 md:w-auto md:h-auto md:aspect-square rounded-md md:rounded-lg overflow-hidden transition-all duration-300 snap-start ${
                      selectedIndex === index
                        ? 'ring-2 ring-magma ring-offset-2 ring-offset-obsidian scale-95'
                        : 'bg-white/5 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    <img 
                      src={getAssetPath(img.src)} 
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {showScrollbar && (
                <div className="hidden md:block absolute bottom-0 left-0 right-3 h-16 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
              )}
            </div>

            {/* Description */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-lg md:rounded-xl">
              <h4 className="font-serif text-base md:text-xl text-bone italic mb-1 md:mb-2 text-center md:text-left">
                {selectedImage.title}
              </h4>
              <p className="font-sans text-[11px] md:text-sm text-taupe leading-relaxed text-center md:text-left">
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