import React, { memo, ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  sectionIndex: number;
  totalSections: number;
}

const SectionWrapper = ({
  children,
  sectionIndex,
}: SectionWrapperProps) => {
  return (
    <div 
      className="section-container"
      style={{
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        zIndex: sectionIndex + 1,
        backgroundColor: '#312B1E',
      }}
    >
      {children}
    </div>
  );
};

export default memo(SectionWrapper);
