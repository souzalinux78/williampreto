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
            {/* Elegant badge representations for text-based awards without images */}
            {data.map((award) => (
              <div key={award.id} className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full border border-primary-500/50 flex items-center justify-center mb-3 text-primary-200">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                     <circle cx="12" cy="8" r="7"></circle>
                     <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                   </svg>
                 </div>
                 <span className="text-white text-xs font-light tracking-[0.2em] uppercase text-center">{award.name}</span>
                 <span className="text-accent text-lg font-serif">{award.year}</span>
              </div>
            ))}
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
