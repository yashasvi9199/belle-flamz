import React, { memo, ReactNode } from 'react';
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

  // Pure CSS curtain scroll effect using sticky positioning
  // Each section sticks to top while scrolling, creating the "cover" effect
  // Higher z-index for later sections ensures proper stacking order
  
  return (
    <div 
      className="section-container"
      style={{
        height: '100vh',
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
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
