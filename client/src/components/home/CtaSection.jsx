import React from 'react';
import { motion } from 'framer-motion';

const CtaSection = ({ texts }) => {
  return (
    <section className="bg-primary-900 pt-32 pb-40 overflow-hidden text-center relative">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 0.8 }}
        >
          <span className="text-accent font-sans tracking-[0.3em] font-medium uppercase text-sm mb-6 block drop-shadow-sm">
            Próximo Passo
          </span>
          <h2 className="text-white font-serif text-5xl md:text-6xl font-light mb-8 max-w-4xl leading-tight">
            Pronta para eternizar a sua <br className="hidden md:block"/>
            <span className="italic text-primary-200">melhor versão?</span>
          </h2>
          <p className="text-white/80 font-light text-lg md:text-xl mb-12 max-w-xl mx-auto drop-shadow-md">
            Me envie uma mensagem no WhatsApp. Será um prazer conversar sobre o que você imagina para o seu ensaio.
          </p>
          <a 
            href={`https://wa.me/55${texts?.whatsapp?.replace(/\D/g, '') || '11997931526'}`}
            target="_blank"
            rel="noopener noreferrer"
             className="px-10 py-5 bg-white text-primary-900 text-sm uppercase tracking-widest hover:bg-primary-50 transition-colors shadow-2xl hover:scale-105 active:scale-95 inline-block"
          >
            {texts?.ctaText || 'Falar com William Preto'}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
