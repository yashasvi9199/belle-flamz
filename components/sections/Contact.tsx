import React, { memo } from 'react';
import { Send } from 'lucide-react';
import { ConvergenceWrapper } from '../ConvergenceWrapper';
import { MagneticWrapper } from '../MagneticWrapper';

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-32 px-4 md:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col justify-between items-center mb-12 md:mb-24">
              <ConvergenceWrapper>
                  <h2 className="font-serif text-4xl md:text-5xl text-bone">INITIATE <span className="text-magma">CONTACT</span></h2>
                  <p className="font-sans text-sm md:text-base text-taupe mt-3 md:mt-4">For bespoke commissions or wholesale inquiries.</p>
              </ConvergenceWrapper>
            </div>

            <ConvergenceWrapper delay={0.2}>
                <form className="space-y-4 md:space-y-6 text-left bg-white/5 p-4 md:p-8 lg:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-sans text-magma uppercase tracking-widest">Identity</label>
                            <input type="text" className="w-full bg-obsidian border border-white/10 rounded p-2.5 md:p-3 text-bone text-sm md:text-base focus:border-magma outline-none transition-colors" />
                        </div>
                        <div className="space-y-1.5 md:space-y-2">
                            <label className="text-[10px] md:text-xs font-sans text-magma uppercase tracking-widest">Signal</label>
                            <input type="email" className="w-full bg-obsidian border border-white/10 rounded p-2.5 md:p-3 text-bone text-sm md:text-base focus:border-magma outline-none transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                        <label className="text-[10px] md:text-xs font-sans text-magma uppercase tracking-widest">Transmission</label>
                        <textarea rows={3} className="w-full bg-obsidian border border-white/10 rounded p-2.5 md:p-3 text-bone text-sm md:text-base focus:border-magma outline-none transition-colors" />
                    </div>

                    <div className="flex justify-end pt-3 md:pt-4">
                        <MagneticWrapper>
                            <button type="button" className="px-6 md:px-8 py-2.5 md:py-3 bg-bone text-obsidian font-sans font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-magma hover:text-white transition-colors flex items-center gap-2 rounded">
                                Transmit <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </button>
                        </MagneticWrapper>
                    </div>
                </form>
            </ConvergenceWrapper>

            <ConvergenceWrapper delay={0.4} className="mt-12 md:mt-24 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
                <p className="font-sans text-[10px] md:text-xs text-taupe uppercase tracking-widest">© 2024 Belle Flamz. All rights reserved.</p>
                {/* <p className="font-serif italic text-taupe text-sm md:text-base">Designed by Yash Haldiya</p> */}
            </ConvergenceWrapper>
        </div>
    </section>
  );
};

export default memo(Contact);