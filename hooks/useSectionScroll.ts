import { useRef } from 'react';

export const useSectionScroll = (sectionIndex: number) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // No JS-based scroll tracking - using pure CSS sticky positioning
  return { ref: sectionRef, sectionIndex };
};
