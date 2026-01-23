import React, { useMemo, memo } from 'react';
import { motion } from 'framer-motion';

interface ConvergenceWrapperProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  staggerIndex?: number; // For progressive reveal within sections
}

export const ConvergenceWrapper = memo(({ 
  children, 
  delay = 0, 
  className = '',
  staggerIndex = 0,
}: ConvergenceWrapperProps) => {
  // Fixed initial state - no random values to prevent jitter
  const initialState = useMemo(() => ({
    y: 30,
    opacity: 0,
    scale: 0.98,
  }), []);

  const finalState = {
    y: 0,
    opacity: 1,
    scale: 1,
  };

  // Calculate delay based on stagger index for progressive reveal
  const calculatedDelay = delay + (staggerIndex * 0.08);

  return (
    <motion.div
      initial={initialState}
      whileInView={finalState}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ 
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
        delay: calculatedDelay,
      }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
});

ConvergenceWrapper.displayName = 'ConvergenceWrapper';