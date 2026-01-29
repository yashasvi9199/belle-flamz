import React, { memo, useState, useRef, useEffect } from 'react';
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

  useEffect(() => {
    setShowScrollbar(images.length > 6);
  }, [images.length]);

  return (
    <section id="gallery" className="w-full min-h-screen py-20 px-8 bg-obsidian border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex justify-between items-end mb-16">
          <ConvergenceWrapper>
            <h2 className="font-serif text-5xl text-bone">
              THE <span className="text-magma italic">GALLERY</span>
            </h2>
          </ConvergenceWrapper>
        </div>

        <div className="grid grid-cols-12 gap-16 items-center">
          {/* Left Panel - Portrait Preview */}
          <ConvergenceWrapper className="col-span-7 flex justify-center" staggerIndex={1}>
            <div className="w-full max-w-[420px] relative">
              <div className="aspect-[3/4] bg-white/5 rounded-2xl overflow-hidden relative group border border-white/5 shadow-2xl">
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
          <ConvergenceWrapper className="col-span-5 flex flex-col gap-6" staggerIndex={2}>
            {/* Grid Container */}
            <div className="relative">
              <div 
                ref={gridRef}
                className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-magma scrollbar-track-white/5"
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
                      src={getAssetPath(img.src)} 
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

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