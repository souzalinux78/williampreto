import React from 'react';
import { motion } from 'framer-motion';

const TestimonialsSection = ({ data = [] }) => {
  const defaultTestimonials = [
    { 
      id: 1, 
      name: 'Mariana Silva', 
      type: 'Gestante', 
      text: 'O William tem um dom raro. Não apenas de fotografar, mas de enxergar a alma. Chorei ao ver o resultado do nosso ensaio de gestante.' 
    },
    { 
      id: 2, 
      name: 'Juliana e Carlos', 
      type: 'Casamento Civil', 
      text: 'Sensibilidade pura! O cuidado dele no nosso civil e a direção deixaram tudo tão leve que o resultado parece sena de filme.' 
    },
    { 
      id: 3, 
      name: 'Fernanda Lopes', 
      type: 'Família', 
      text: 'Ele já é o fotógrafo oficial da nossa família. Registrou minha espera e agora o 1º aninho do Leo. Trabalho sensacional!' 
    }
  ];

  const testimonials = data.length > 0 ? data : defaultTestimonials;

  return (
    <section className="py-24 md:py-36 bg-primary-50 relative border-t border-primary-200">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           className="text-center mb-20"
        >
          <span className="text-primary-500 font-sans tracking-[0.2em] font-medium uppercase text-xs">
            Depoimentos Reais
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light mt-6 mx-auto leading-tight">
            Palavras de quem <br/>
            <span className="italic text-primary-600">viveu a experiência</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary-300 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi, index) => (
             <motion.div 
               key={testi.id}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-100px' }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               className="bg-white p-10 md:p-12 shadow-sm rounded-sm flex flex-col items-center text-center space-y-6"
             >
               <div className="text-primary-300 font-serif text-6xl leading-[0] h-6">"</div>
               <p className="text-primary-700 font-light italic text-sm md:text-base leading-relaxed grow">
                 {testi.text}
               </p>
               <div className="w-8 h-[1px] bg-primary-200"></div>
               <div>
                  <h4 className="text-primary-900 font-medium font-serif">{testi.name}</h4>
                  <span className="text-primary-500 text-xs tracking-widest uppercase">{testi.type}</span>
               </div>
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
