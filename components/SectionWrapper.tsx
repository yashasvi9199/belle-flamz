import React, { memo, ReactNode, CSSProperties } from 'react';
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
  const { ref, isLeaving, blurAmount, overlapY, isActive } = useSectionScroll(sectionIndex);

  // The curtain effect:
  // Current section blurs and stays semi-fixed
  // Next section slides UP over it.
  
  const wrapperStyle: CSSProperties = {
    position: 'relative',
    zIndex: sectionIndex + 1, // Higher sections sit on top of lower ones
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#312B1E', // Match obsidian to prevent flashes
    willChange: 'transform, filter',
    // Only apply overlap transform to incoming sections
    transform: overlapY > 0 ? `translateY(${overlapY}px)` : 'none',
    filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
    opacity: isLeaving ? Math.max(0.8, 1 - (blurAmount / 40)) : 1,
    // When a section is leaving, we make it "sticky" so the next one can slide over it
    ...(isLeaving && {
      position: 'fixed',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    }),
    // Ensure active section is visible
    display: isActive ? 'block' : sectionIndex === 0 ? 'block' : 'none',
  };

  // Buffer to maintain scroll height while a section is fixed
  const containerStyle: CSSProperties = {
    height: '100vh',
    position: 'relative',
  };

  return (
    <div style={containerStyle}>
      <div ref={ref} style={wrapperStyle}>
        {children}
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
