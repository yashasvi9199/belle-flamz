import { useCallback } from 'react';

export const useHeroLogic = () => {
  const handleExplore = useCallback(() => {
    const gallery = document.getElementById('gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return {
    handleExplore
  };
};