import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Calendar, ArrowRight } from 'lucide-react';

const ServicesSection = ({ data, whatsapp }) => {
  const services = [
    { title: 'Gestante Externo', desc: 'A espera do mais lindo amor com fotos suaves.', icon: <Camera className="w-6 h-6" /> },
    { title: 'Gestante Estúdio', desc: 'Seja atemporal, casual ou artística, o seu estilo é que importa', icon: <Heart className="w-6 h-6" /> },
    { title: 'Casal & Pré-Wedding', desc: 'Ensaios focados na história e na conexão de vocês.', icon: <Users className="w-6 h-6" /> },
    { title: 'Aniversário Infantil', desc: 'Fotografia documental para o dia da festa.', icon: <Calendar className="w-6 h-6" /> }
  ];

  return (
    <section className="py-24 md:py-36 bg-white overflow-hidden" id="servicos">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary-600 font-sans tracking-[0.2em] text-xs uppercase font-medium mb-4 block">Especialidades</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light mb-8 leading-tight">
              Descubra a beleza em <br className="hidden md:block"/>
              <span className="italic text-primary-600 font-serif">cada fase da sua vida.</span>
            </h2>
            <p className="text-primary-700 text-lg font-light leading-relaxed">
              Serviços fotográficos especializados com foco em sensibilidade, naturalidade e elegância para gestantes, famílias e casamentos civis.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FFFBF8] p-12 group hover:bg-primary-900 transition-all duration-500 rounded-sm"
            >
              <div className="text-primary-900 group-hover:text-primary-100 transition-colors mb-8">
                {service.icon}
              </div>
              <h4 className="text-xl font-serif text-primary-900 group-hover:text-white transition-colors mb-4">{service.title}</h4>
              <p className="text-primary-700 font-light text-sm group-hover:text-primary-200 transition-colors leading-relaxed mb-8">
                {service.desc}
              </p>
              <a 
                href={`https://wa.me/55${whatsapp?.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-primary-900 group-hover:text-white transition-colors border-b border-transparent group-hover:border-white/30 pb-1 w-fit"
              >
                <span>Saber Mais</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
