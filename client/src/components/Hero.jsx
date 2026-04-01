import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/hero.png')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="block text-white/80 font-sans tracking-[0.3em] font-light uppercase text-sm mb-6">
            Fotógrafo da Família
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white font-light tracking-wide mb-8 drop-shadow-lg">
            Guarde Sua<br className="hidden md:block"/> Melhor Versão
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto mb-12 drop-shadow-md">
            Registrando gestantes e famílias com sensibilidade, direção de arte e uma estética atemporal.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/5511997931526" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white text-primary-900 text-sm uppercase tracking-widest hover:bg-primary-50 transition-colors duration-300 w-full sm:w-auto"
            >
              Agendar Sessão
            </a>
            <a 
              href="#portfolio" 
              className="px-10 py-4 border border-white text-white text-sm uppercase tracking-widest hover:bg-white hover:text-primary-900 transition-colors duration-300 w-full sm:w-auto"
            >
              Ver Portfólio
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/60 text-xs tracking-widest uppercase mb-2">Deslize</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-[1px] h-12 bg-white/40"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
