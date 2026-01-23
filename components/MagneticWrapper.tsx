import React from 'react';
import { motion } from 'framer-motion';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const MagneticWrapper = ({ children, className = '', intensity = 1 }: MagneticWrapperProps) => {
  const { ref, position, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x * intensity, y: position.y * intensity }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};