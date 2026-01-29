import React, { memo, useRef } from 'react';
import { Upload, Image } from 'lucide-react';
import { useCandleDesignerLogic } from '../../hooks/useCandleDesignerLogic';
import fragranceData from '../../src/data/fragrance.json';
import { ConvergenceWrapper } from '../ConvergenceWrapper';

const CandleDesigner = () => {
  const { design, updateField } = useCandleDesignerLogic();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fragrances = fragranceData.fragrances;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField('customImage', event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="designer" className="min-h-screen py-16 md:py-32 px-4 md:px-12 bg-[#2a2419] border-t border-white/5 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-obsidian to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24">
          <ConvergenceWrapper>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bone">
              ATELIER <span className="text-magma">CUSTOM</span>
            </h2>
            <p className="mt-3 md:mt-4 font-sans text-sm md:text-base text-taupe">Forge your own light. Define the geometry, essence, and frequency.</p>
          </ConvergenceWrapper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <ConvergenceWrapper className="space-y-6 md:space-y-8" staggerIndex={1}>
            {/* Geometry Selection */}
            <div>
              <label className="block text-xs md:text-sm font-sans text-magma uppercase tracking-widest mb-3 md:mb-4">Geometry</label>
              <div className="flex gap-2 md:gap-4">
                {(['pillar', 'jar'] as const).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => updateField('shape', shape)}
                    className={`flex-1 py-3 md:py-4 border rounded-lg font-serif italic text-base md:text-lg transition-all ${
                      design.shape === shape 
                        ? 'bg-magma/20 border-magma text-bone' 
                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
                    }`}
                  >
                    {shape.charAt(0).toUpperCase() + shape.slice(1)}
                  </button>
                ))}
                
                {/* Custom Upload Option */}
                <button
                  onClick={() => {
                    updateField('shape', 'custom');
                    triggerUpload();
                  }}
                  className={`flex-1 py-3 md:py-4 border rounded-lg font-serif italic text-base md:text-lg transition-all flex items-center justify-center gap-1.5 md:gap-2 ${
                    design.shape === 'custom'
                      ? 'bg-magma/20 border-magma text-bone'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Custom
                </button>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Upload preview indicator */}
              {design.shape === 'custom' && (
                <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                  {design.customImage ? (
                    <div className="flex items-center gap-3">
                      <Image className="w-5 h-5 text-magma" />
                      <span className="text-bone text-sm font-sans">Image uploaded</span>
                      <button
                        onClick={triggerUpload}
                        className="ml-auto text-xs text-magma hover:underline"
                      >
                        Change
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={triggerUpload}
                      className="w-full text-center text-taupe text-sm font-sans hover:text-bone transition-colors"
                    >
                      Click to upload your design
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Essence Selection */}
            <div>
              <label className="block text-xs md:text-sm font-sans text-magma uppercase tracking-widest mb-3 md:mb-4">Essence</label>
              <select 
                value={design.fragranceId} 
                onChange={(e) => updateField('fragranceId', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 text-bone font-sans text-sm md:text-base focus:border-magma outline-none appearance-none"
              >
                <option value="" disabled>Select a fragrance base...</option>
                {fragrances.map(f => (
                  <option key={f.id} value={f.id} className="bg-obsidian">{f.name}</option>
                ))}
              </select>
            </div>

            {/* Chromatics */}
            <div>
              <label className="block text-xs md:text-sm font-sans text-magma uppercase tracking-widest mb-3 md:mb-4">Chromatics</label>
              <div className="flex gap-3 md:gap-4 items-center bg-white/5 p-3 md:p-4 rounded-lg border border-white/10">
                <input 
                  type="color" 
                  value={design.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  className="w-10 h-10 md:w-12 md:h-12 rounded bg-transparent border-none cursor-pointer"
                />
                <span className="font-sans text-bone uppercase text-sm md:text-base">{design.color}</span>
              </div>
            </div>
          </ConvergenceWrapper>

          {/* Preview Panel */}
          <ConvergenceWrapper className="flex flex-col justify-center items-center" staggerIndex={2}>
            <div className="w-full max-w-sm lg:max-w-none aspect-square relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center p-6 md:p-12">
              {/* Abstract Visualizer */}
              <div 
                className="w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl transition-all duration-1000 opacity-60"
                style={{ backgroundColor: design.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {design.shape === 'custom' && design.customImage ? (
                  <img 
                    src={design.customImage} 
                    alt="Custom design"
                    className="max-w-[160px] max-h-[160px] md:max-w-[200px] md:max-h-[200px] object-contain rounded-lg shadow-2xl"
                    style={{ boxShadow: `0 0 50px ${design.color}40` }}
                  />
                ) : (
                  <div 
                    className={`transition-all duration-500 bg-white/10 border border-white/20 backdrop-blur-sm shadow-2xl
                      ${design.shape === 'pillar' ? 'w-24 h-48 md:w-32 md:h-64' : ''}
                      ${design.shape === 'jar' ? 'w-36 h-44 md:w-48 md:h-56 rounded-b-xl' : ''}
                      ${design.shape === 'custom' ? 'w-36 h-36 md:w-48 md:h-48 rounded-xl border-dashed' : ''}
                    `}
                    style={{ boxShadow: `0 0 50px ${design.color}40` }}
                  >
                    {design.shape === 'custom' && !design.customImage && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="w-10 h-10 md:w-12 md:h-12 text-white/20" />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ConvergenceWrapper>
        </div>
      </div>
    </section>
  );
};

export default memo(CandleDesigner);