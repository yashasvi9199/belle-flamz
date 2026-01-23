import { useState, useEffect, useCallback, useRef } from 'react';

interface SectionScrollState {
  progress: number; // 0-1 percentage through the section
  isActive: boolean; // Section is currently in viewport
  isLeaving: boolean; // Section is being scrolled past
  blurAmount: number; // 0-20% blur for fading out
  translateY: number; // Translation for overlap effect
}

interface UseSectionScrollOptions {
  sectionIndex: number;
  totalSections: number;
  scrollGap?: number; // Extra scroll distance between sections
}

export const useSectionScroll = ({
  sectionIndex,
  totalSections,
  scrollGap = 100,
}: UseSectionScrollOptions) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SectionScrollState>({
    progress: 0,
    isActive: sectionIndex === 0,
    isLeaving: false,
    blurAmount: 0,
    translateY: 0,
  });

  const handleScroll = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far through the section we are
    const sectionTop = rect.top;
    const sectionHeight = rect.height;
    
    // Is section in view?
    const isInView = sectionTop < windowHeight && sectionTop + sectionHeight > 0;
    
    // Progress through section (0 = just entering, 1 = fully past)
    const rawProgress = 1 - (sectionTop / windowHeight);
    const progress = Math.max(0, Math.min(1, rawProgress));
    
    // Is the section being scrolled away (next section coming in)
    const isLeaving = sectionTop < 0;
    
    // Calculate blur: as section leaves, blur increases from 0 to 20%
    // Blur starts when section top is at -10% of viewport
    let blurAmount = 0;
    if (isLeaving && sectionTop > -sectionHeight) {
      const leaveProgress = Math.abs(sectionTop) / (sectionHeight * 0.5);
      blurAmount = Math.min(8, leaveProgress * 8); // Max 8px blur
    }
    
    // Calculate translateY for incoming section overlap effect
    // Next section slides up as current section is scrolled
    let translateY = 0;
    if (sectionIndex > 0) {
      const enterProgress = Math.max(0, 1 - (sectionTop / windowHeight));
      translateY = Math.max(0, (1 - enterProgress) * 50); // Start 50px down
    }

    setState({
      progress,
      isActive: isInView,
      isLeaving,
      blurAmount,
      translateY,
    });
  }, [sectionIndex]);

  useEffect(() => {
    // Use passive scroll listener for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    ref: sectionRef,
    ...state,
  };
};
