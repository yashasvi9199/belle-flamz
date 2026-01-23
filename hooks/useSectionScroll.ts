import { useState, useEffect, useCallback, useRef } from 'react';

interface SectionScrollState {
  progress: number;
  isActive: boolean;
  isLeaving: boolean;
  isIncoming: boolean;
  blurAmount: number;
  overlapY: number;
}

export const useSectionScroll = (sectionIndex: number) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SectionScrollState>({
    progress: 0,
    isActive: sectionIndex === 0,
    isLeaving: false,
    isIncoming: false,
    blurAmount: 0,
    overlapY: 0,
  });

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Position of section top relative to bottom of viewport
    // 1 = top of section is at bottom of screen
    // 0 = top of section is at top of screen
    const enterProgress = 1 - (rect.top / windowHeight);
    
    // Position of section bottom relative to top of viewport
    // 0 = bottom of section is at bottom of screen
    // 1 = bottom of section is at top of screen
    const leaveProgress = Math.abs(Math.min(0, rect.top)) / rect.height;

    const isActive = rect.top < windowHeight && rect.bottom > 0;
    const isIncoming = rect.top > 0 && rect.top < windowHeight;
    const isLeaving = rect.top < 0 && rect.bottom > 0;

    // Blur current section as it leaves (next one overlaps)
    let blurAmount = 0;
    if (isLeaving) {
      blurAmount = Math.min(8, leaveProgress * 20); // 0 to 8px blur
    }

    // Slide incoming section from bottom
    let overlapY = 0;
    if (isIncoming && sectionIndex > 0) {
      // Starts at 100% of window height and goes to 0
      overlapY = Math.max(0, (1 - enterProgress) * windowHeight);
    }

    setState({
      progress: enterProgress,
      isActive,
      isLeaving,
      isIncoming,
      blurAmount,
      overlapY,
    });
  }, [sectionIndex]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ref: sectionRef, ...state };
};
