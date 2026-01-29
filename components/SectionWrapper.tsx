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

  // Parallax logic: Pushes the current section content upwards
  // when the next section starts to overlay it from the bottom.
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      // Use dynamic viewport height for more accuracy on mobile
      const viewportHeight = window.innerHeight;
      
      const scrollProgress = -rect.top;
      // On mobile, we might want a slightly different overlap or no overlap if it causes issues
      // but let's stick to the current logic but with better height units.
      const pushStart = viewportHeight * 0.4;
      const pushEnd = viewportHeight * 1.4;
      
      if (scrollProgress > pushStart && scrollProgress <= pushEnd) {
        const offset = scrollProgress - pushStart;
        setParallaxOffset(-offset);
      } else if (scrollProgress <= pushStart) {
        setParallaxOffset(0);
      } else {
        setParallaxOffset(-(pushEnd - pushStart));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLastSection = sectionIndex === totalSections - 1;
  
  return (
    <div 
      ref={containerRef}
      className={`section-container ${isLastSection ? '' : 'overflow-visible'}`}
      style={{
        // Using dvh (dynamic viewport height) for better mobile browser support
        height: isLastSection ? '100dvh' : '140dvh',
        position: 'sticky',
        top: 0,
        zIndex: sectionIndex + 1,
      }}
    >
      <div 
        ref={ref}
        className="section-content flex flex-col items-center justify-center"
        style={{
          width: '100%',
          height: '100dvh', // Content is always one viewport tall
          backgroundColor: '#312B1E',
          overflow: 'hidden',
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
