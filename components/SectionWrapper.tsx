import React, { memo, ReactNode, useRef, createContext } from 'react';
import { useSectionScroll } from '../hooks/useSectionScroll';
import { motion, useScroll, useTransform } from 'framer-motion';

export const SectionContext = createContext<{ 
  scrollYProgress: any,
  sectionIndex: number,
  totalSections: number
} | null>(null);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: sectionRef } = useSectionScroll(sectionIndex);
  
  // Track scroll relative to this section's container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div 
      ref={containerRef}
      className="section-container"
      style={{
        height: sectionIndex === totalSections - 1 ? '100vh' : '140vh',
        position: 'sticky',
        top: 0,
        zIndex: sectionIndex + 1,
      }}
    >
      <div 
        ref={sectionRef}
        className="section-content"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundColor: '#312B1E',
          overflow: 'hidden',
        }}
      >
        <SectionContext.Provider value={{ scrollYProgress, sectionIndex, totalSections }}>
          {children}
        </SectionContext.Provider>
      </div>
    </div>
  );
};

export default memo(SectionWrapper);
