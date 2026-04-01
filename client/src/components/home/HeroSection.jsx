import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = ({ data, settings }) => {
  return (
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-primary-900">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${data?.imageUrl && data.imageUrl.startsWith('/uploads') ? `http://localhost:3000${data.imageUrl}` : data.imageUrl || '/maternity.png'}')` }}
      >
        {/* Gradient Overlay for sophisticated dark mode look */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Authority Badge */}
            <div className="inline-flex items-center space-x-2 border border-white/30 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-white/90 text-xs font-sans uppercase tracking-[0.15em]">
                {data?.badgeText}
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white font-light tracking-wide mb-6 drop-shadow-lg leading-[1.1]" 
                dangerouslySetInnerHTML={{ __html: data?.title?.replace(/\n/g, '<br/>') }} 
            />
            
            <p className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-xl leading-relaxed drop-shadow-md">
              {data?.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <a 
                href={`https://wa.me/55${settings?.whatsapp?.replace(/\D/g, '') || '11997931526'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-center"
              >
                {settings?.ctaText || 'Agendar pelo WhatsApp'}
              </a>
              <a 
                href="#portfolio"
                className="px-8 py-3 w-full sm:w-auto text-center border border-white/60 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-primary-900 transition-colors duration-300"
              >
                Ver Portfólio
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-3">Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-white/40"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
