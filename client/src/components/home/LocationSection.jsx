import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const LocationSection = ({ city, sectionData }) => {
  return (
    <section className="py-24 md:py-36 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: '-100px' }}
             className="relative"
          >
            <div className="aspect-[4/3] bg-primary-100 overflow-hidden relative group">
               <img src="/family.png" alt="Locações em Bragança Paulista" className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-105" />
               <div className="absolute inset-0 bg-primary-900/20"></div>
            </div>
            
            {/* Minimal coordinate / location sticker */}
            <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-lg hidden md:flex flex-col border border-primary-50 z-10 w-64 items-center text-center">
               <MapPin className="text-primary-500 mb-2" size={24} />
               <span className="font-serif text-primary-900 font-medium text-lg text-center" dangerouslySetInnerHTML={{ __html: city?.replace(' e ', '<br/>e ') || 'Bragança Paulista' }} />
               <span className="text-primary-400 font-sans tracking-[0.2em] text-[10px] uppercase mt-2">Interior de SP</span>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: '-100px' }}
             className="pl-0 lg:pl-10"
          >
            <span className="text-primary-500 font-sans tracking-[0.2em] font-medium uppercase text-xs mb-4 block">
              Nosso Estúdio e Externas
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light mb-8 leading-tight">
              {sectionData?.locationTitle ? (
                <span dangerouslySetInnerHTML={{ __html: sectionData.locationTitle.replace(/\n/g, '<br/>') }} />
              ) : (
                <>A natureza como <br className="hidden lg:block"/>
                <span className="italic text-primary-600">pano de fundo</span></>
              )}
            </h2>
            <div className="space-y-6 text-primary-700 font-light leading-relaxed">
              {sectionData?.locationSubtitle ? (
                <div dangerouslySetInnerHTML={{ __html: sectionData.locationSubtitle.replace(/\n/g, '<br/>') }} />
              ) : (
                <>
                 <p>
                  Atendemos em {city?.split('-')[0] || 'Bragança Paulista'} e toda a região, oferecendo tanto um estúdio confortável e climatizado para bebês e gestantes que buscam ensaios intimistas (boudoir maternity), quanto as mais belas paisagens da região para ensaios externos.
                 </p>
                 <p>
                  A escolha do local é sempre conversada e alinhada ao estilo de cada família, garantindo segurança e tranquilidade durante toda a sessão fotográfica.
                 </p>
                </>
              )}
            </div>
            <div className="w-16 h-[1px] bg-primary-300 mt-10 mb-8"></div>
            <p className="text-primary-900 font-medium italic font-serif text-xl border-l-2 border-primary-400 pl-6">
              "Paraísos particulares na porta de casa."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
