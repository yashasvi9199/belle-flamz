import { useState, useCallback } from 'react';
import { CandleDesignState } from '../types';

export const useCandleDesignerLogic = () => {
  const [design, setDesign] = useState<CandleDesignState>({
    shape: 'jar',
    fragranceId: '',
    color: '#E2CEAE',
    customImage: undefined,
  });

  const updateField = useCallback((field: keyof CandleDesignState, value: any) => {
    setDesign(prev => ({ ...prev, [field]: value }));
  }, []);

  return {
    design,
    updateField,
  };
};