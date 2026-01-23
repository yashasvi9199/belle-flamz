import React, { useContext, memo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { SectionContext } from '../SectionWrapper';

interface ScrollHeadingProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollHeading = ({ children, className = '', delay = 0 }: ScrollHeadingProps) => {
  const context = useContext(SectionContext);
  
  if (!context) {
    return <div className={className}>{children}</div>;
  }

  const { scrollYProgress, sectionIndex, totalSections } = context;

  // We want the heading to move based on scroll.
  // 0: just entered from bottom
  // 0.4: top of container is at top of viewport (approx)
  // 1: container is leaving top
  
  // Snappier mapping: 
  // Entrance: 0 to 0.15 (just entering to 40% visible)
  // Exit: 0.58 to 1 (starts being covered by next section)
  const y = useTransform(
    scrollYProgress,
    [0, 0.15, 0.58, 1],
    [60, 0, 0, -100]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{ y, opacity, willChange: 'transform, opacity' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default memo(ScrollHeading);
