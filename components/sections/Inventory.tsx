import React, { memo } from 'react';
import { Search } from 'lucide-react';
import { useInventoryLogic } from '../../hooks/useInventoryLogic';
import { Fragrance } from '../../types';
import { ConvergenceWrapper } from '../ConvergenceWrapper';

const InventoryItemCard = memo(({ fragrance }: { fragrance: Fragrance }) => (
  <div className="group relative p-3 md:p-6 bg-white/5 border border-white/10 hover:border-magma/30 rounded-lg md:rounded-xl transition-colors duration-300">
    <div className="flex justify-between items-start mb-2 md:mb-4">
      <h3 className="font-serif text-lg md:text-2xl text-bone">{fragrance.name}</h3>
      <span className="font-sans text-magma font-bold text-xs md:text-base">₹{fragrance.price}</span>
    </div>
    
    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
      {fragrance.notes.map(note => (
        <span key={note} className="px-1 py-0.5 md:px-2 md:py-1 text-[9px] md:text-xs font-sans uppercase tracking-wider bg-white/5 rounded text-taupe">
          {note}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5 md:gap-2">
        <span className="text-[10px] md:text-xs text-gray-500 font-sans uppercase">Intensity</span>
        <div className="flex gap-0.5 md:gap-1">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`w-0.5 md:w-1 h-2 md:h-3 rounded-full ${i < fragrance.intensity ? 'bg-magma' : 'bg-gray-800'}`} 
            />
          ))}
        </div>
      </div>
      <button 
        disabled={!fragrance.inStock} 
        className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-widest transition-colors ${
          fragrance.inStock 
            ? 'bg-bone text-obsidian hover:bg-magma hover:text-white' 
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
      >
        {fragrance.inStock ? 'Acquire' : 'Depleted'}
      </button>
    </div>
  </div>
));

InventoryItemCard.displayName = 'InventoryItemCard';

const Inventory = () => {
  const { searchTerm, filteredFragrances, handleSearchChange } = useInventoryLogic();
  const showScrollbar = filteredFragrances.length > 3;

  return (
    <section id="inventory" className="pt-16 md:pt-32 px-4 md:px-12 pb-32 md:pb-64 bg-obsidian border-t border-white/5" style={{ minHeight: 'var(--section-height, 100vh)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-12 gap-4 md:gap-0">
          <ConvergenceWrapper>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-bone leading-tight">
              FRAGRANCE <span className="block text-transparent bg-clip-text bg-gradient-to-r from-magma to-taupe">ARCHIVE</span>
            </h2>
          </ConvergenceWrapper>

          <ConvergenceWrapper className="w-full md:w-auto" staggerIndex={1}>
            <div className="flex gap-2 md:gap-4 items-center bg-white/5 p-1.5 md:p-2 rounded-lg border border-white/10">
              <Search className="w-3.5 h-3.5 md:w-5 md:h-5 text-taupe ml-1.5 md:ml-2" />
              <input 
                type="text" 
                placeholder="Search your desires" 
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none text-bone placeholder-gray-600 font-sans w-full md:w-64 text-xs md:text-base"
              />
            </div>
          </ConvergenceWrapper>
        </div>

        <div className="relative md:mt-[-32px] mb-16 md:mb-32">
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 ${
              showScrollbar ? 'max-h-[55vh] md:max-h-[60vh] overflow-y-auto pr-2 md:pr-4 pt-4 pb-24' : ''
            }`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#FC5C02 rgba(255,255,255,0.05)'
            }}
          >
            {filteredFragrances.map((fragrance, index) => (
              <ConvergenceWrapper key={fragrance.id} staggerIndex={index}>
                <InventoryItemCard fragrance={fragrance} />
              </ConvergenceWrapper>
            ))}
            
            {filteredFragrances.length === 0 && (
              <div className="col-span-full py-16 md:py-24 text-center">
                <p className="font-serif text-xl md:text-2xl text-taupe italic">No essences found matching your frequency.</p>
              </div>
            )}
          </div>
          
          {showScrollbar && (
            <div className="absolute bottom-0 left-0 right-2 md:right-4 h-16 md:h-32 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Inventory);