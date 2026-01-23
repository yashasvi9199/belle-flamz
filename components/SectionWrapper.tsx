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
  const { ref, isLeaving, translateY, isActive, isIncoming } = useSectionScroll(sectionIndex);

  // Curtain scroll effect:
  // - Scroll down: current section stays sticky, new section slides up from bottom to cover it
  // - Scroll up: current section slides down (inverse curtain), revealing sticky previous section

  const wrapperStyle: CSSProperties = {
    position: isLeaving ? 'fixed' : 'relative',
    top: isLeaving ? 0 : 'auto',
    left: isLeaving ? 0 : 'auto',
    zIndex: sectionIndex + 1, // Higher sections sit on top of lower ones
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#312B1E', // Match obsidian to prevent flashes
    willChange: 'transform',
    // Apply translateY for incoming sections to create slide-up effect
    transform: translateY > 0 ? `translateY(${translateY}px)` : 'none',
    // Disable pointer events on leaving section so incoming section is interactive
    pointerEvents: isLeaving ? 'none' : 'auto',
  };

  // Container maintains scroll height when section goes fixed
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
