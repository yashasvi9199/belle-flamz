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
    <section id="designer" className="w-full min-h-screen py-32 px-8 bg-[#2a2419] border-t border-white/5 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-obsidian to-transparent opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 gap-16 items-start">
          {/* Title Area */}
          <div className="col-span-2 mb-8">
            <ConvergenceWrapper>
              <h2 className="font-serif text-5xl text-bone">
                ATELIER <span className="text-magma">CUSTOM</span>
              </h2>
            </ConvergenceWrapper>
          </div>

          <div className="space-y-12">
            <ConvergenceWrapper>
              <p className="font-sans text-base text-taupe max-w-lg">
                Forge your own light. Define the geometry, essence, and frequency.
              </p>
            </ConvergenceWrapper>

            <ConvergenceWrapper className="space-y-8" staggerIndex={1}>
            {/* Geometry Selection */}
            <div>
              <label className="block text-sm font-sans text-magma uppercase tracking-widest mb-4">Geometry</label>
              <div className="flex gap-4">
                {(['pillar', 'jar'] as const).map((shape) => (
                  <button
                    key={shape}
                    onClick={() => updateField('shape', shape)}
                    className={`flex-1 py-4 border rounded-lg font-serif italic text-lg transition-all ${
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
                  }}
                  className={`flex-1 py-4 border rounded-lg font-serif italic text-lg transition-all flex items-center justify-center gap-2 ${
                    design.shape === 'custom'
                      ? 'bg-magma/20 border-magma text-bone'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30'
                  }`}
                >
                  <Upload className="w-4 h-4" />
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
              <label className="block text-sm font-sans text-magma uppercase tracking-widest mb-4">Essence</label>
              <select 
                value={design.fragranceId} 
                onChange={(e) => updateField('fragranceId', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-bone font-sans text-base focus:border-magma outline-none appearance-none"
              >
                <option value="" disabled>Select a fragrance base...</option>
                {fragrances.map(f => (
                  <option key={f.id} value={f.id} className="bg-obsidian">{f.name}</option>
                ))}
              </select>
            </div>

            {/* Chromatics */}
            <div>
              <label className="block text-sm font-sans text-magma uppercase tracking-widest mb-4">Chromatics</label>
              <div className="flex gap-4 items-center bg-white/5 p-4 rounded-lg border border-white/10">
                <input 
                  type="color" 
                  value={design.color}
                  onChange={(e) => updateField('color', e.target.value)}
                  className="w-12 h-12 rounded bg-transparent border-none cursor-pointer"
                />
                <span className="font-sans text-bone uppercase text-base">{design.color}</span>
              </div>
            </div>
          </ConvergenceWrapper>
        </div>

          {/* Preview Panel */}
          <ConvergenceWrapper className="h-full flex flex-col" staggerIndex={2}>
            <div className="w-full h-full min-h-[500px] relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center p-12">
              {/* Abstract Visualizer */}
              <div 
                className="w-64 h-64 rounded-full blur-3xl transition-all duration-1000 opacity-60"
                style={{ backgroundColor: design.color }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {design.shape === 'custom' && design.customImage ? (
                  <img 
                    src={design.customImage} 
                    alt="Custom design"
                    className="max-w-[200px] max-h-[200px] object-contain rounded-lg shadow-2xl"
                    style={{ boxShadow: `0 0 50px ${design.color}40` }}
                  />
                ) : (
                  <div 
                    className={`transition-all duration-500 bg-white/10 border border-white/20 backdrop-blur-sm shadow-2xl
                      ${design.shape === 'pillar' ? 'w-32 h-64' : ''}
                      ${design.shape === 'jar' ? 'w-48 h-56 rounded-b-xl' : ''}
                      ${design.shape === 'custom' ? 'w-48 h-48 rounded-xl border-dashed' : ''}
                    `}
                    style={{ boxShadow: `0 0 50px ${design.color}40` }}
                  >
                    {design.shape === 'custom' && !design.customImage && (
                      <div className="w-full h-full flex items-center justify-center">
                        <Upload className="w-16 h-16 text-white/20" />
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