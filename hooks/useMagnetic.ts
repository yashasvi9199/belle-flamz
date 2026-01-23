import React, { useRef, useState, useCallback } from 'react';

export const useMagnetic = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const { clientX, clientY } = e;
    const element = ref.current;
    if (element) {
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate distance from center
      const x = (clientX - centerX) / 4; // Dampening factor
      const y = (clientY - centerY) / 4;
      
      setPosition({ x, y });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return { ref, position, handleMouseMove, handleMouseLeave };
};