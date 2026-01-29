import React, { memo } from 'react';
import { Search } from 'lucide-react';
import { useInventoryLogic } from '../../hooks/useInventoryLogic';
import { Fragrance } from '../../types';
import { ConvergenceWrapper } from '../ConvergenceWrapper';
import { getAssetPath } from '../../src/utils/path';


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
        className={`px-3 md:px-5 py-2 md:py-2.5 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all duration-300 ${
          fragrance.inStock 
            ? 'bg-magma text-obsidian hover:bg-bone hover:scale-105 shadow-lg shadow-magma/20' 
            : 'bg-white/5 text-taupe cursor-not-allowed border border-white/5'
        }`}
      >
        {fragrance.inStock ? 'Experience' : 'Sold Out'}
      </button>
    </div>
  </div>
));

InventoryItemCard.displayName = 'InventoryItemCard';

const Inventory = () => {
  const { searchTerm, filteredFragrances, handleSearchChange } = useInventoryLogic();
  const showScrollbar = filteredFragrances.length > 3;

  return (
    <section id="inventory" className="w-full min-h-screen py-24 md:py-32 px-4 md:px-12 bg-obsidian border-t border-white/5 relative flex flex-col justify-start overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getAssetPath('/inventory_background.png')} 
          alt="Exotic candle ingredients" 
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8 md:gap-0">
          <div className="flex flex-col gap-4 md:gap-6">
            <ConvergenceWrapper>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-bone leading-tight text-center md:text-left">
                THE OLFACTORY <span className="block text-transparent bg-clip-text bg-gradient-to-r from-magma to-taupe italic font-light">VAULT</span>
              </h2>
            </ConvergenceWrapper>
            <ConvergenceWrapper delay={0.1}>
              <p className="font-sans text-xs md:text-lg text-taupe max-w-lg text-center md:text-left leading-relaxed">
                Explore our archive of rare essences and sculptural masterworks, ready to illuminate your space.
              </p>
            </ConvergenceWrapper>
          </div>

          <ConvergenceWrapper className="w-full md:w-auto" staggerIndex={1}>
            <div className="flex gap-2 md:gap-4 items-center bg-white/5 p-2 rounded-lg border border-magma/10 shadow-inner">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-magma/60 ml-2" />
              <input 
                type="text" 
                placeholder="Seek a scent profile..." 
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none text-bone placeholder-taupe/50 font-sans w-full md:w-64 text-sm md:text-base"
              />
            </div>
          </ConvergenceWrapper>
        </div>

        <div className="relative md:mt-[-16px] mb-8 md:mb-32">
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 ${
              showScrollbar ? 'max-h-[50vh] md:max-h-[60vh] overflow-y-auto pr-2 md:pr-4 pt-4 pb-20' : ''
            }`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#E9C46A rgba(255,255,255,0.05)'
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