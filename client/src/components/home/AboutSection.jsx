import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = ({ data, heroImage }) => {
  return (
    <section className="py-24 md:py-36 bg-primary-50 relative overflow-hidden">
      {/* Decorative text watermark */}
      <div className="absolute top-10 -right-20 text-[180px] font-serif text-primary-100 font-bold opacity-30 whitespace-nowrap hidden lg:block z-0 pointer-events-none select-none">
        Memories
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <div className="flex gap-4 mb-4">
              <span className="w-12 h-[1px] bg-primary-400 mt-[10px]"></span>
              <span className="text-primary-600 font-sans tracking-[0.25em] text-xs uppercase font-medium">
                Especialista em Gestantes
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-serif text-primary-900 leading-snug font-light mb-8">
              Especialista <br className="hidden md:block" /> em eternizar <br className="hidden md:block" />
              <span className="italic text-primary-600">fases únicas.</span>
            </h2>

            <div className="space-y-6 text-primary-800 font-light leading-relaxed text-lg mb-10 border-l border-primary-200 pl-8" 
                 dangerouslySetInnerHTML={{ __html: data?.institutionalText ? data.institutionalText.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') : '<p>Texto Institucional</p>' }} 
            />

            <a href="/sobre" className="inline-block relative overflow-hidden group pb-2">
              <span className="text-primary-900 font-medium tracking-[0.1em] uppercase text-sm">
                Conheça a nossa história
              </span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-300 transform origin-left transition-transform duration-300 group-hover:scale-x-0"></span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary-900 transform scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100"></span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-primary-200 shadow-xl overflow-hidden rounded-sm relative z-10 w-4/5 ml-auto">
              <img src={heroImage && heroImage.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${heroImage}` : heroImage || '/hero.png'} alt="A Essência" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-full h-full bg-primary-100 z-0"></div>
            
            {/* Small floating detail block */}
            <div className="absolute -bottom-10 left-0 bg-white p-8 shadow-md z-20 hidden md:block w-64 border border-primary-50">
              <p className="font-serif text-primary-900 text-xl italic mb-2">"Delicadeza que transcende."</p>
              <p className="text-xs uppercase tracking-widest text-primary-500">— A Essência</p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
