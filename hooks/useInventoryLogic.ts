import { useState, useMemo } from 'react';
import fragranceData from '../src/data/fragrance.json';
import { Fragrance } from '../types';

export const useInventoryLogic = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sort by popularity (descending - higher first), then filter by search
  const filteredFragrances = useMemo(() => {
    const fragrances = fragranceData.fragrances as Fragrance[];
    
    return [...fragrances]
      .sort((a, b) => b.popularity - a.popularity)
      .filter((fragrance: Fragrance) => {
        const matchesSearch = fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              fragrance.notes.some(note => note.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesSearch;
      });
  }, [searchTerm]);

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  return {
    searchTerm,
    filteredFragrances,
    handleSearchChange,
  };
};