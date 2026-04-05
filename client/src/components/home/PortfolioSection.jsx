import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioSection = ({ data, sectionData }) => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', ...new Set(data.map(item => item.category?.name || item.type))];

  const filteredItems = activeCategory === 'Todos'
    ? data
    : data.filter(item => (item.category?.name || item.type) === activeCategory);

  return (
    <section className="py-24 md:py-36 bg-white overflow-hidden" id="portfolio">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-600 font-sans tracking-[0.2em] text-xs uppercase font-medium mb-4 block">Portfólio</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light mb-8 leading-tight">
              {sectionData?.portfolioTitle ? (
                 <span dangerouslySetInnerHTML={{ __html: sectionData.portfolioTitle.replace(/\n/g, '<br/>') }} />
              ) : (
                <>Explore <span className="italic text-primary-600">Nosso Universo </span>
                Atemporatrial.</>
              )}
            </h2>
            <p className="text-primary-700 text-lg font-light leading-relaxed">
              {sectionData?.portfolioSubtitle || "Cada clique é uma história contada através da luz e da emoção. Conheça alguns dos nossos trabalhos mais recentes."}
            </p>
          </motion.div>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-8 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap pb-2 border-b ${activeCategory === cat ? 'text-primary-900 border-primary-900' : 'text-primary-400 border-transparent hover:text-primary-600'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="aspect-square relative overflow-hidden group cursor-pointer"
              >
                <img 
                   src={item.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${item.imageUrl}` : item.imageUrl} 
                   alt={item.title || "Portfolio Work"} 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center text-white backdrop-blur-sm p-8 text-center translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-3 border-b border-white/30 pb-2">{item.category?.name || item.type}</span>
                  <h4 className="text-xl font-serif font-light">{item.title || 'Galeria de fotos'}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
