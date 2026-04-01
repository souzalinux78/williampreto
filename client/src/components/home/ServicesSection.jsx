import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServicesSection = ({ data = [], whatsapp }) => {
  const defaultServices = [
    { title: 'Gestante', desc: 'A espera do mais lindo amor com fotos suaves.', imageUrl: '/maternity.png' },
    { title: 'Casamento Civil', desc: 'Sua assinatura oficial e emoção registrados.', imageUrl: '/wedding.png' },
    { title: 'Família', desc: 'Retratos ensolarados para guardar o legado.', imageUrl: '/family.png' },
  ];

  const services = data.length > 0 ? data : defaultServices;
  const waLink = `https://wa.me/55${whatsapp?.replace(/\D/g, '') || '11997931526'}`;

  return (
    <section className="py-24 md:py-36 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-100px' }}
           className="text-center mb-20"
        >
          <span className="text-primary-500 font-sans tracking-[0.2em] font-medium uppercase text-xs">
            Nosso Portfólio de Serviços
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-primary-900 font-light mt-6 mx-auto max-w-2xl leading-tight">
            Acompanhando todas as <br/>
            <span className="italic text-primary-600">fases da sua vida</span>
          </h2>
          <div className="w-16 h-[1px] bg-primary-300 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, index) => (
             <motion.a 
               href={waLink}
               target="_blank"
               rel="noopener noreferrer"
               key={index}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: '-100px' }}
               transition={{ duration: 0.6, delay: index * 0.1 }}
               className="group relative overflow-hidden bg-primary-50 aspect-[4/5] block flex flex-col justify-end p-8 cursor-pointer"
             >
               <div 
                 className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-105"
                 style={{ backgroundImage: `url(${srv.imageUrl && srv.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${srv.imageUrl}` : srv.imageUrl || '/maternity.png'})` }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent" />
               <div className="relative z-10">
                 <h3 className="text-white font-serif text-2xl mb-2">{srv.title}</h3>
                 <p className="text-white/80 font-light text-sm mb-6 drop-shadow-md">
                   {srv.description || srv.desc}
                 </p>
                 <div className="flex items-center space-x-2 text-primary-200 group-hover:text-white transition-colors">
                   <span className="text-xs uppercase tracking-widest font-medium">Saiba mais</span>
                   <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </div>
               </div>
             </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
