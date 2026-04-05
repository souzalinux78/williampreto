import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Users, Calendar, ArrowRight } from 'lucide-react';

const ServicesSection = ({ data, whatsapp, sectionData }) => {
  const defaultServices = [
    { title: 'Ensaios Gestante', desc: 'A celebração da vida em sua forma mais pura e divina. No estúdio ou ao ar livre.', icon: <Heart className="w-8 h-8" /> },
    { title: 'Casamento Civil', desc: 'O registro elegante e sensível do sim mais importante, com foco nos detalhes e emoções.', icon: <Users className="w-8 h-8" /> },
    { title: 'Aniversários Infantis', desc: 'Cada descoberta e cada sorriso transformados em memórias eternas para sua família.', icon: <Calendar className="w-8 h-8" /> },
    { title: 'Sessões de Família', desc: 'O retrato atemporal da união e do amor que sustenta gerações.', icon: <Camera className="w-8 h-8" /> }
  ];

  const services = data && data.length > 0 ? data : defaultServices;

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
              {sectionData?.servicesTitle ? (
                 <span dangerouslySetInnerHTML={{ __html: sectionData.servicesTitle.replace(/\n/g, '<br/>') }} />
              ) : (
                <>Descubra a beleza em <br className="hidden md:block"/>
                <span className="italic text-primary-600 font-serif">cada fase da sua vida.</span></>
              )}
            </h2>
            <p className="text-primary-700 text-lg font-light leading-relaxed">
              {sectionData?.servicesSubtitle || "Serviços fotográficos especializados com foco em sensibilidade, naturalidade e elegância para gestantes, famílias e casamentos civis."}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-primary-50 p-10 group hover:bg-primary-900 transition-all duration-500 rounded-sm"
            >
              <div className="text-primary-600 group-hover:text-primary-100 transition-colors mb-8">
                {service.icon || <Camera className="w-8 h-8" />}
              </div>
              <h4 className="text-xl font-serif text-primary-900 group-hover:text-white transition-colors mb-4">{service.title}</h4>
              <p className="text-primary-700 font-light text-sm group-hover:text-primary-200 transition-colors leading-relaxed mb-8">
                {service.description || service.desc}
              </p>
              <a 
                href={`https://wa.me/55${whatsapp?.replace(/\D/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-primary-900 group-hover:text-white transition-colors"
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
