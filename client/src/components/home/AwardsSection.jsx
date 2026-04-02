import React from 'react';
import { motion } from 'framer-motion';

const AwardsSection = ({ data = [] }) => {
  return (
    <section className="bg-primary-900 py-32 overflow-hidden text-center relative border-y border-primary-700">
      {/* Texture / Subtle background element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-800 to-primary-900 opacity-60"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 0.8 }}
        >
          <p className="text-accent text-sm font-sans tracking-[0.3em] font-medium uppercase mb-6 drop-shadow-sm">
            Reconhecimento
          </p>
          <h3 className="text-white font-serif text-3xl md:text-5xl lg:text-5xl font-light max-w-4xl mx-auto leading-snug drop-shadow-lg mb-12">
            Premiado Internacionalmente
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-90 mx-auto max-w-5xl">
            {/* Elegant badge representations for text-based awards or images if available */}
            {data.map((award) => {
              const apiBaseUrl = import.meta.env.VITE_API_URL.replace('/api', '');
              const imgUrl = award.imageUrl ? (award.imageUrl.startsWith('/uploads') ? `${apiBaseUrl}${award.imageUrl}` : award.imageUrl) : null;
              
              return (
                <div key={award.id} className="flex flex-col items-center group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl border border-primary-500/30 flex items-center justify-center mb-4 text-primary-200 overflow-hidden bg-primary-800/20 group-hover:border-accent/40 transition-all shadow-xl shadow-black/20 group-hover:scale-105">
                    {imgUrl ? (
                      <img src={imgUrl} alt={award.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                      </svg>
                    )}
                  </div>
                  <span className="text-white text-[10px] md:text-sm font-light tracking-[0.2em] uppercase text-center max-w-[120px] mb-1">{award.name}</span>
                  <span className="text-accent text-lg font-serif">{award.year}</span>
                </div>
              );
            })}
          </div>

          <p className="text-primary-200/60 font-light mt-16 max-w-xl mx-auto italic text-sm">
            Um dos fotógrafos mais aclamados de Bragança Paulista com 6 anos consecutivos figurando entre os destaques mundiais da Outstanding Awards.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AwardsSection;
