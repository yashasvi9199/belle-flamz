import React, { memo, ReactNode, CSSProperties } from 'react';
import { useSectionScroll } from '../hooks/useSectionScroll';

interface SectionWrapperProps {
  children: ReactNode;
  sectionIndex: number;
  totalSections: number;
  className?: string;
}

const SectionWrapper = ({
  children,
  sectionIndex,
  totalSections,
  className = '',
}: SectionWrapperProps) => {
  const { ref, isLeaving, blurAmount, translateY } = useSectionScroll({
    sectionIndex,
    totalSections,
  });

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    zIndex: totalSections - sectionIndex, // Higher sections have lower z-index
    willChange: 'transform, filter',
    transform: `translateY(${translateY}px)`,
    filter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none',
    opacity: isLeaving ? Math.max(0.8, 1 - (blurAmount / 40)) : 1,
    transition: 'filter 0.1s ease-out, opacity 0.1s ease-out',
  };

  return (
    <div ref={ref} style={wrapperStyle} className={className}>
      {children}
    </div>
  );
};

export default memo(SectionWrapper);
