import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import Section from '../components/Section';
import Loading from '../components/Loading';

const Portfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/public/home-data`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  if (loading || !data) return <Loading />;

  const { portfolioItems, portfolioCategories, siteSettings } = data;

  const categories = ['Todas', ...portfolioCategories.map(c => c.name)];
  
  const filteredItems = activeCategory === 'Todas' ? portfolioItems : portfolioItems.filter(item => item.category?.name === activeCategory);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  // Basic Next/Prev for lightbox
  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };
  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <>
      <Helmet>
        <title>Portfólio | {siteSettings.seoTitle}</title>
        <meta name="description" content="Explore nosso acervo de fotografias de gestantes, casamentos, famílias e eventos. Amor e sensibilidade em formato de arte." />
      </Helmet>

      <div className="pt-24 min-h-screen bg-gray-50/50">
        <Section title="Acervo Fotográfico" subtitle="Nossa Arte" bgLight={true}>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs uppercase tracking-widest font-medium transition-colors border ${activeCategory === cat ? 'bg-primary-900 border-primary-900 text-white' : 'bg-transparent border-primary-200 text-primary-700 hover:border-primary-900 hover:text-primary-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  onClick={() => openLightbox(index)}
                  className="group relative cursor-pointer overflow-hidden aspect-[4/5] bg-gray-200"
                >
                  <img 
                    src={item.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${item.imageUrl}` : item.imageUrl} 
                    alt={item.title || item.category?.name} 
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Search className="text-white/80" size={32} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredItems.length === 0 && (
             <div className="text-center text-gray-500 py-12">Nenhuma foto encontrada nesta categoria.</div>
          )}

        </Section>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-50" onClick={closeLightbox}>
              <X size={32} />
            </button>
            
            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4" onClick={showPrev}>
              <span className="text-4xl">&lsaquo;</span>
            </button>
            
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4" onClick={showNext}>
              <span className="text-4xl">&rsaquo;</span>
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              src={filteredItems[lightboxIndex].imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${filteredItems[lightboxIndex].imageUrl}` : filteredItems[lightboxIndex].imageUrl}
              alt="Enlarged"
              className="max-h-[90vh] max-w-[90vw] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-sans tracking-[0.2em] uppercase">
               {filteredItems[lightboxIndex].title || filteredItems[lightboxIndex].category?.name} &nbsp;&mdash;&nbsp; {lightboxIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
