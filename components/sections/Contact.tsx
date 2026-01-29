import React, { memo } from 'react';
import { Send } from 'lucide-react';
import { ConvergenceWrapper } from '../ConvergenceWrapper';
import { MagneticWrapper } from '../MagneticWrapper';
import { getAssetPath } from '../../src/utils/path';

const Contact = () => {
  return (
    <section id="contact" className="w-full min-h-screen px-4 md:px-12 bg-obsidian border-t border-white/5 relative flex flex-col justify-center md:py-10 overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img 
            src={getAssetPath('/contact_background.png')} 
            alt="Minimalist luxury desk" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto w-full text-center relative z-10">
            <div className="flex flex-col justify-between items-center mb-8 md:mb-12">
              <ConvergenceWrapper>
                  <h2 className="font-serif text-3xl md:text-5xl text-bone">CURATE A <span className="text-magma italic font-light">CONVERSATION</span></h2>
                  <p className="font-sans text-xs md:text-lg text-taupe mt-4 md:mt-6 max-w-lg mx-auto leading-relaxed">Connect with our artisans for bespoke commissions, wholesale partnerships, or to simply share your experience.</p>
              </ConvergenceWrapper>
            </div>

            <ConvergenceWrapper delay={0.2}>
                <form className="space-y-4 md:space-y-6 text-left bg-white/5 p-6 md:p-8 lg:p-10 rounded-2xl border border-magma/10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-sans text-magma uppercase tracking-[0.2em] font-light">Patron Name</label>
                            <input type="text" className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm md:text-base focus:border-magma outline-none transition-colors" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-sans text-magma uppercase tracking-[0.2em] font-light">Email Address</label>
                            <input type="email" className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm md:text-base focus:border-magma outline-none transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-xs font-sans text-magma uppercase tracking-[0.2em] font-light">Message</label>
                        <textarea rows={4} className="w-full bg-obsidian border border-white/10 rounded-lg p-3 text-bone text-sm md:text-base focus:border-magma outline-none transition-colors resize-none" />
                    </div>

                    <div className="flex justify-end pt-2">
                        <MagneticWrapper>
                            <button type="button" className="w-full md:w-auto px-10 py-3 bg-magma text-obsidian font-sans font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-bone hover:scale-105 transition-all duration-300 rounded-full shadow-lg shadow-magma/20 flex items-center justify-center gap-2">
                                Send Message <Send className="w-4 h-4" />
                            </button>
                        </MagneticWrapper>
                    </div>
                </form>
            </ConvergenceWrapper>

            <ConvergenceWrapper delay={0.4} className="mt-12 md:mt-24 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-sans text-[10px] md:text-xs text-taupe uppercase tracking-widest text-center">© 2024 Belle Flamz. All rights reserved.</p>
            </ConvergenceWrapper>
        </div>
    </section>
  );
};

export default memo(Contact);