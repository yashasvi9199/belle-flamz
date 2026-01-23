import React, { memo } from 'react';
import { Send } from 'lucide-react';
import { ConvergenceWrapper } from '../ConvergenceWrapper';
import { MagneticWrapper } from '../MagneticWrapper';

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-4 md:px-12 bg-obsidian border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-col justify-between items-center mb-24">
              <ConvergenceWrapper>
                  <h2 className="font-serif text-5xl text-bone">INITIATE <span className="text-magma">CONTACT</span></h2>
                  <p className="font-sans text-taupe mt-4">For bespoke commissions or wholesale inquiries.</p>
              </ConvergenceWrapper>
            </div>

            <ConvergenceWrapper delay={0.2}>
                <form className="space-y-6 text-left bg-white/5 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-sans text-magma uppercase tracking-widest">Identity</label>
                            <input type="text" className="w-full bg-obsidian border border-white/10 rounded p-3 text-bone focus:border-magma outline-none transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-sans text-magma uppercase tracking-widest">Signal</label>
                            <input type="email" className="w-full bg-obsidian border border-white/10 rounded p-3 text-bone focus:border-magma outline-none transition-colors" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-sans text-magma uppercase tracking-widest">Transmission</label>
                        <textarea rows={4} className="w-full bg-obsidian border border-white/10 rounded p-3 text-bone focus:border-magma outline-none transition-colors" />
                    </div>

                    <div className="flex justify-end pt-4">
                        <MagneticWrapper>
                            <button type="button" className="px-8 py-3 bg-bone text-obsidian font-sans font-bold uppercase tracking-widest hover:bg-magma hover:text-white transition-colors flex items-center gap-2 rounded">
                                Transmit <Send className="w-4 h-4" />
                            </button>
                        </MagneticWrapper>
                    </div>
                </form>
            </ConvergenceWrapper>

            <ConvergenceWrapper delay={0.4} className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="font-sans text-xs text-taupe uppercase tracking-widest">© 2024 Belle Flamz. All rights reserved.</p>
                <p className="font-serif italic text-taupe">Designed by Sovereign Architects</p>
            </ConvergenceWrapper>
        </div>
    </section>
  );
};

export default memo(Contact);