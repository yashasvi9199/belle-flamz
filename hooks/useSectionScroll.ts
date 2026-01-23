import { useState, useEffect, useCallback, useRef } from 'react';

interface SectionScrollState {
  isActive: boolean;
  isLeaving: boolean;
  isIncoming: boolean;
  translateY: number;
}

export const useSectionScroll = (sectionIndex: number) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SectionScrollState>({
    isActive: sectionIndex === 0,
    isLeaving: false,
    isIncoming: false,
    translateY: sectionIndex > 0 ? window.innerHeight : 0,
  });

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Section visibility states
    const isInViewport = rect.top < windowHeight && rect.bottom > 0;
    const isAboveViewport = rect.bottom <= 0;
    const isBelowViewport = rect.top >= windowHeight;
    
    // Is active if any part is visible
    const isActive = isInViewport;
    
    // Leaving: section top has scrolled above viewport top, but bottom still visible
    const isLeaving = rect.top < 0 && rect.bottom > 0;
    
    // Incoming: section is entering from bottom
    const isIncoming = rect.top > 0 && rect.top < windowHeight;

    // Calculate translateY for incoming sections (curtain sliding up)
    // When scrolling down: new section slides up from bottom to cover current
    // When scrolling up: current section slides down like inverse curtain
    let translateY = 0;
    
    if (sectionIndex > 0) {
      if (isBelowViewport) {
        // Section hasn't started entering yet
        translateY = windowHeight;
      } else if (isIncoming) {
        // Section is sliding in - translate based on how far it's entered
        translateY = rect.top;
      } else if (isLeaving || isAboveViewport) {
        // Section is fully in or has passed - no translate needed
        translateY = 0;
      }
    }

    setState({
      isActive,
      isLeaving,
      isIncoming,
      translateY,
    });
  }, [sectionIndex]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { ref: sectionRef, ...state };
};
