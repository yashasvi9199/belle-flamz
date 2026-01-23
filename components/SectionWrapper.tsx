import React, { memo, ReactNode, useEffect, useRef, useState } from 'react';
import { useSectionScroll } from '../hooks/useSectionScroll';

interface SectionWrapperProps {
  children: ReactNode;
  sectionIndex: number;
  totalSections: number;
}

const SectionWrapper = ({
  children,
  sectionIndex,
  totalSections,
}: SectionWrapperProps) => {
  const { ref } = useSectionScroll(sectionIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // Track scroll position for parallax effect
  // When section is being covered by the next section, content moves up slightly
  // This creates the perception that heading follows/moves with the scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.offsetTop;
      const containerHeight = containerRef.current.offsetHeight;
      const scrollY = window.scrollY;
      
      // Calculate scroll position within this section's range
      const sectionStart = containerTop;
      const sectionEnd = containerTop + containerHeight;
      
      // Parallax for section being covered (scroll down)
      // When next section starts overlaying, this section's content moves up
      if (scrollY >= sectionStart && scrollY < sectionEnd) {
        const scrollInSection = scrollY - sectionStart;
        const visibleHeight = windowHeight;
        
        if (scrollInSection > visibleHeight) {
          // In the buffer zone - apply parallax
          const bufferProgress = (scrollInSection - visibleHeight) / (containerHeight - visibleHeight);
          setParallaxOffset(-Math.min(bufferProgress, 1) * 100);
        } else {
          setParallaxOffset(0);
        }
      } else if (scrollY < sectionStart) {
        // Section not yet reached
        setParallaxOffset(0);
      } else {
        // Section passed
        setParallaxOffset(-100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pure CSS curtain scroll effect using sticky positioning
  // Each section sticks to top while scrolling, creating the "cover" effect
  // Higher z-index for later sections ensures proper stacking order
  // Parallax effect makes heading appear to follow the scroll as section gets covered
  
  const isLastSection = sectionIndex === totalSections - 1;
  
  return (
    <div 
      ref={containerRef}
      className="section-container"
      style={{
        // Add buffer by making container taller than 100vh
        // Last section doesn't need buffer as nothing follows it
        height: isLastSection ? '100vh' : '140vh',
        position: 'sticky',
        top: 0,
        zIndex: sectionIndex + 1,
      }}
    >
      <div 
        ref={ref}
        className="section-content"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundColor: '#312B1E',
          overflow: 'hidden',
          // Apply parallax transform - content moves up as section is covered
          transform: `translateY(${parallaxOffset}px)`,
          transition: 'transform 0.02s linear',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
