import React, { memo, useRef } from 'react';
import { Upload, Image } from 'lucide-react';
import { useCandleDesignerLogic } from '../../hooks/useCandleDesignerLogic';
import fragranceData from '../../src/data/fragrance.json';
import { ConvergenceWrapper } from '../ConvergenceWrapper';
import { getAssetPath } from '../../src/utils/path';


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
    <section id="designer" className="w-full min-h-screen py-24 md:py-32 px-4 md:px-12 bg-obsidian border-t border-white/5 relative flex flex-col justify-start overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={getAssetPath('/designer_background.png')} 
          alt="Artisanal candle atelier" 
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
      </div>

      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-magma/5 to-transparent opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Title Area */}
          <div className="lg:col-span-2 mb-2 md:mb-8">
            <ConvergenceWrapper>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-7xl text-bone text-center md:text-left">
                BESPOKE <span className="text-magma italic font-light">ATELIER</span>
              </h2>
            </ConvergenceWrapper>
            <ConvergenceWrapper delay={0.1}>
              <p className="font-sans text-xs md:text-lg text-taupe max-w-lg mt-4 md:mt-6 text-center md:text-left leading-relaxed">
                Forge your own light. Define the geometry, essence, and frequency.
              </p>
            </ConvergenceWrapper>
          </div>

          <div className="space-y-6 md:space-y-10 order-2 lg:order-1">
            <ConvergenceWrapper className="space-y-6 md:space-y-8" staggerIndex={1}>
              {/* Geometry Selection */}
              <div>
                <label className="block text-xs md:text-sm font-sans text-magma uppercase tracking-widest mb-3 md:mb-4 text-center md:text-left">Geometry</label>
                <div className="flex gap-2 md:gap-4">
                  {(['pillar', 'jar'] as const).map((shape) => (
                    <button
                      key={shape}
                      onClick={() => updateField('shape', shape)}
                      className={`flex-1 py-3 md:py-4 border rounded-lg font-serif italic text-sm md:text-lg transition-all ${
                        design.shape === shape 
                          ? 'bg-magma/20 border-magma text-bone' 
                          : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
                      }`}
                    >
                      {shape.charAt(0).toUpperCase() + shape.slice(1)}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => updateField('shape', 'custom')}
                    className={`flex-1 py-3 md:py-4 border rounded-lg font-serif italic text-sm md:text-lg transition-all flex items-center justify-center gap-1.5 md:gap-2 ${
                      design.shape === 'custom'
                        ? 'bg-magma/20 border-magma text-bone'
                        : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5 md:w-4 md:h-4 text-magma" />
                    Custom
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                
                {design.shape === 'custom' && (
                  <div className="mt-4 p-3 bg-white/5 border border-white/10 rounded-lg">
                    {design.customImage ? (
                      <div className="flex items-center gap-3">
                        <Image className="w-5 h-5 text-magma" />
                        <span className="text-bone text-xs md:text-sm font-sans">Image uploaded</span>
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
                        className="w-full text-center text-taupe text-xs md:text-sm font-sans hover:text-bone transition-colors"
                      >
                        Click to upload your design
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Essence Selection */}
                <div>
                  <label className="block text-xs md:text-sm font-sans text-magma uppercase tracking-widest mb-3 md:mb-4 text-center md:text-left">Essence</label>
                  <select 
                    value={design.fragranceId} 
                    onChange={(e) => updateField('fragranceId', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 md:p-4 text-bone font-sans text-xs md:text-base focus:border-magma outline-none appearance-none"
                  >
                    <option value="" disabled>Select a fragrance base...</option>
                    {fragrances.map(f => (
                      <option key={f.id} value={f.id} className="bg-obsidian">{f.name}</option>
                    ))}
                  </select>
                </div>

                {/* Chromatics */}
                <div>
                  <label className="block text-xs md:text-sm font-sans text-magma uppercase tracking-widest mb-3 md:mb-4 text-center md:text-left">Chromatics</label>
                  <div className="flex gap-3 md:gap-4 items-center bg-white/5 p-2.5 md:p-4 rounded-lg border border-white/10">
                    <input 
                      type="color" 
                      value={design.color}
                      onChange={(e) => updateField('color', e.target.value)}
                      className="w-8 h-8 md:w-6 md:h-6 rounded bg-transparent border-none cursor-pointer"
                    />
                    <span className="font-sans text-bone uppercase text-xs md:text-base tracking-widest">{design.color}</span>
                  </div>
                </div>
              </div>
            </ConvergenceWrapper>
          </div>

          {/* Preview Panel */}
          <ConvergenceWrapper className="flex flex-col items-center justify-center order-1 lg:order-2" staggerIndex={2}>
            <div className="w-full max-w-[320px] md:max-w-none aspect-square relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl flex items-center justify-center p-8 md:p-12">
              {/* Abstract Visualizer */}
              <div 
                className="w-32 h-32 md:w-64 md:h-64 rounded-full blur-3xl transition-all duration-1000 opacity-60"
                style={{ backgroundColor: design.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {design.shape === 'custom' && design.customImage ? (
                  <img 
                    src={design.customImage} 
                    alt="Custom design"
                    className="max-w-[120px] max-h-[160px] md:max-w-[240px] md:max-h-[320px] object-contain rounded-lg shadow-2xl"
                    style={{ boxShadow: `0 0 50px ${design.color}40` }}
                  />
                ) : (
                  <div 
                    className={`transition-all duration-500 bg-white/10 border border-white/20 backdrop-blur-sm shadow-2xl
                      ${design.shape === 'pillar' ? 'w-16 h-32 md:w-32 md:h-64' : ''}
                      ${design.shape === 'jar' ? 'w-24 h-28 md:w-48 md:h-56 rounded-b-xl' : ''}
                      ${design.shape === 'custom' ? 'w-24 h-24 md:w-48 md:h-48 rounded-xl border-dashed' : ''}
                    `}
                    style={{ boxShadow: `0 0 50px ${design.color}40` }}
                  >
                    {design.shape === 'custom' && !design.customImage && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="w-8 h-8 md:w-16 md:h-16 text-white/20" />
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