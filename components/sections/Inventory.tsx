import React, { memo } from 'react';
import { Search } from 'lucide-react';
import { useInventoryLogic } from '../../hooks/useInventoryLogic';
import { Fragrance } from '../../types';

const InventoryItemCard = ({ fragrance }: { fragrance: Fragrance }) => (
  <div className="group relative p-6 bg-white/5 border border-white/10 hover:border-magma/30 rounded-xl transition-colors duration-300">
    <div className="flex justify-between items-start mb-4">
      <h3 className="font-serif text-2xl text-bone">{fragrance.name}</h3>
      <span className="font-sans text-magma font-bold">${fragrance.price}</span>
    </div>
    
    <div className="flex flex-wrap gap-2 mb-6">
      {fragrance.notes.map(note => (
        <span key={note} className="px-2 py-1 text-xs font-sans uppercase tracking-wider bg-white/5 rounded-md text-taupe">
          {note}
        </span>
      ))}
    </div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-sans uppercase">Intensity</span>
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 h-3 rounded-full ${i < fragrance.intensity ? 'bg-magma' : 'bg-gray-800'}`} 
            />
          ))}
        </div>
      </div>
      <button 
        disabled={!fragrance.inStock} 
        className={`px-4 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-colors ${
          fragrance.inStock 
            ? 'bg-bone text-obsidian hover:bg-magma hover:text-white' 
            : 'bg-gray-800 text-gray-600 cursor-not-allowed'
        }`}
      >
        {fragrance.inStock ? 'Acquire' : 'Depleted'}
      </button>
    </div>
  </div>
);

const Inventory = () => {
  const { searchTerm, filteredFragrances, handleSearchChange } = useInventoryLogic();

  return (
    <section id="inventory" className="min-h-screen py-32 px-4 md:px-12 bg-obsidian border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <h2 className="font-serif text-5xl md:text-7xl text-bone">
              FRAGRANCE <span className="block text-transparent bg-clip-text bg-gradient-to-r from-magma to-taupe">ARCHIVE</span>
            </h2>
          </div>

          <div className="w-full md:w-auto mt-8 md:mt-0">
            <div className="flex gap-4 items-center bg-white/5 p-2 rounded-lg border border-white/10">
              <Search className="w-5 h-5 text-taupe ml-2" />
              <input 
                type="text" 
                placeholder="Search your desires" 
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-transparent border-none outline-none text-bone placeholder-gray-600 font-sans w-full md:w-64"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFragrances.map((fragrance) => (
            <InventoryItemCard key={fragrance.id} fragrance={fragrance} />
          ))}
          
          {filteredFragrances.length === 0 && (
            <div className="col-span-full py-24 text-center">
              <p className="font-serif text-2xl text-taupe italic">No essences found matching your frequency.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Inventory);