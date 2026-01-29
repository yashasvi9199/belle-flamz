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
      const windowHeight = window.innerHeight;
      
      // A sticky section is "fully visible" as long as its top is <= 0
      // and its bottom edge has not yet passed the top of the viewport.
      // Since container height is 140vh, it stays at top:0 for 140vh.
      // But the next section starts at Top + 140vh.
      // It enters viewport when scrollY + 100vh > Top + 140vh => ScrollY > Top + 40vh.
      // At that point, containerRef.current.getBoundingClientRect().top is -40vh.
      
      const scrollProgress = -rect.top; // How much of the container has scrolled past viewport top
      const pushStart = windowHeight * 0.4; // 40vh mark where next section enters
      const pushEnd = windowHeight * 1.4; // 140vh mark where this container hits its end
      
      if (scrollProgress > pushStart && scrollProgress <= pushEnd) {
        // In the overlap zone where next section is moving from bottom to top
        // We push our content UP in sync with the scroll
        const offset = scrollProgress - pushStart;
        setParallaxOffset(-offset);
      } else if (scrollProgress <= pushStart) {
        setParallaxOffset(0);
      } else {
        // Fully covered
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
      className="section-container"
      style={{
        // Use CSS custom properties for dynamic viewport height (fixes mobile browser chrome issue)
        height: isLastSection ? 'var(--section-height, 100vh)' : 'var(--section-height-extended, 140vh)',
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
          minHeight: 'var(--section-height, 100vh)',
          backgroundColor: '#312B1E',
          overflow: 'hidden',
          // Use transform for smooth parallax movement
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
