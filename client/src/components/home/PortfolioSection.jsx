import React from 'react';
import { motion } from 'framer-motion';

const PortfolioSection = ({ data = [] }) => {
  const images = data.length > 0 ? data : [
    { imageUrl: '/maternity.png', title: 'Gestante' },
    { imageUrl: '/wedding.png', title: 'Casamento' },
    { imageUrl: '/family.png', title: 'Família' },
    { imageUrl: '/hero.png', title: 'Ensaio' }
  ];

  return (
    <section id="portfolio" className="py-24 md:py-36 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: '-100px' }}
           >
             <span className="text-primary-500 font-sans tracking-[0.2em] font-medium uppercase text-xs mb-4 block">
               Nosso Acervo
             </span>
             <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light">
               Cenas reais de um lindo <br/>
               <span className="italic text-primary-600">romance da vida</span>
             </h2>
           </motion.div>
           <a href="/portfolio" className="hidden md:inline-block border-b border-primary-900 text-primary-900 uppercase tracking-widest text-xs font-medium pb-2 hover:text-primary-600 transition-colors">
             Ver Portfólio Completo
           </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.slice(0, 4).map((img, idx) => (
             <motion.div 
               key={img.id || idx}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true, margin: '-50px' }}
               transition={{ duration: 0.6, delay: idx * 0.1 }}
               className="group overflow-hidden rounded-sm relative aspect-[4/3] bg-primary-100 cursor-pointer"
             >
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-[3s] group-hover:scale-105"
                 style={{ backgroundImage: `url(${img.imageUrl && img.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${img.imageUrl}` : img.imageUrl || '/maternity.png'})` }}
               />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                 <span className="text-white font-serif text-2xl uppercase tracking-widest px-8 py-3 border border-white/60 drop-shadow-md text-center">
                   {img.title || img.category?.name}
                 </span>
               </div>
             </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
           <a href="/portfolio" className="inline-block border-b border-primary-900 text-primary-900 uppercase tracking-widest text-xs font-medium pb-2 hover:text-primary-600 transition-colors">
             Ver Portfólio Completo
           </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
