import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseSection = ({ data }) => {
  const defaultReasons = [
    { title: 'Direção Cuidadosa', desc: 'Condução leve e descomplicada para você se sentir à vontade, mesmo sem experiência.' },
    { title: 'Sensibilidade', desc: 'Entendimento profundo do momento que você está vivenciando.' },
    { title: 'Olhar Artístico', desc: 'Fotografias que parecem pinturas, com um trabalho refinado de cores e luzes.' },
  ];

  return (
    <section className="py-24 md:py-36 bg-primary-100 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 1 }}
        >
          <div className="aspect-[4/5] bg-primary-200 relative overflow-hidden rounded-sm w-4/5 shadow-2xl">
             <img src="/family.png" alt="A beleza de uma família" className="w-full h-full object-cover grayscale mix-blend-multiply opacity-80" />
             <div className="absolute inset-0 bg-primary-900/10" />
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-primary-600 font-sans tracking-[0.2em] text-xs uppercase font-medium mb-4 block">
            Por que escolher William Preto
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light mb-12 leading-tight">
            Mais do que um ensaio, <br className="hidden md:block"/>
            <span className="italic text-primary-600 font-serif">uma experiência.</span>
          </h2>
          
          <div className="space-y-8">
            {defaultReasons.map((reason, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="text-primary-400 font-serif text-2xl italic mt-1 transition-colors group-hover:text-primary-600">
                  0{idx + 1}.
                </div>
                <div>
                  <h4 className="text-lg font-serif text-primary-900 mb-1">{reason.title}</h4>
                  <p className="text-primary-700 font-light text-sm leading-relaxed">{reason.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
