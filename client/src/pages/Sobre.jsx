import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import Loading from '../components/Loading';

const Sobre = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const { siteSettings, awards, heroSection } = data;

  return (
    <>
      <Helmet>
        <title>Sobre Mim | {siteSettings.seoTitle}</title>
        <meta name="description" content="Conheça a trajetória de William Preto, fotógrafo premiado e especialista em capturar emoções de forma poética e atemporal." />
      </Helmet>
      
      <div className="pt-24 min-h-screen bg-white">
        
        {/* Intro */}
        <Section title="Sobre Mim" subtitle="O Artista">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-[3/4] bg-primary-100 bg-cover bg-center shadow-2xl relative" 
              style={{ backgroundImage: `url(${heroSection.imageUrl && heroSection.imageUrl.startsWith('/uploads') ? `http://localhost:3000${heroSection.imageUrl}` : heroSection.imageUrl || '/hero.png'})` }}
            >
               <div className="absolute -bottom-6 -right-6 w-1/2 aspect-square bg-primary-900 border-4 border-white flex flex-col items-center justify-center p-6 text-center text-white">
                  <span className="font-serif text-3xl italic">{awards.length}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] mt-2 font-medium opacity-80">Prêmios Internacionais</span>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <h3 className="text-3xl font-serif text-primary-900 border-b border-primary-200 pb-4">
                Mais do que Fotografias, Legados.
              </h3>
              <div className="space-y-6 text-primary-700 font-light leading-relaxed">
                <p>
                  Sou {siteSettings.photographerName}, fotógrafo apaixonado pela estética clássica e pela profundidade das emoções humanas. Durante toda a minha trajetória profissional, compreendi que a luz não serve apenas para iluminar um ambiente, mas para revelar a essência de quem está sendo fotografado.
                </p>
                <div dangerouslySetInnerHTML={{ __html: siteSettings.institutionalText ? siteSettings.institutionalText.replace(/\n\n/g, '</p><p>').replace(/^/, '<p>').replace(/$/, '</p>') : '' }} />
              </div>
              
              <div className="pt-8">
                <img src="/maternity.png" alt="Assinatura" className="h-16 w-auto opacity-40 grayscale mix-blend-multiply" />
              </div>
            </motion.div>
          </div>
        </Section>
        
        {/* Style Block */}
        <section className="bg-primary-50 py-24">
           <div className="container mx-auto px-6 max-w-5xl text-center">
              <span className="text-primary-500 font-sans tracking-[0.2em] font-medium uppercase text-xs">Abordagem Única</span>
              <h3 className="text-4xl font-serif text-primary-900 mt-4 mb-10 leading-snug">Sensibilidade que <br/> guia a <span className="italic text-primary-600">direção de arte</span></h3>
              <p className="text-primary-700 font-light max-w-3xl mx-auto leading-relaxed text-lg">
                Meu processo, seja em estúdio ou em uma vasta locação externa, busca primeiramente tirar qualquer tensão. O melhor da fotografia Fine Art não brota de poses rígidas, mas sim da naturalidade guiada. 
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
                 <div className="bg-white p-8 border-t-4 border-primary-400">
                    <h4 className="font-serif text-xl text-primary-900 mb-3">Luz Impecável</h4>
                    <p className="text-sm font-light text-primary-600">O uso magistral de luz natural e modeladores sutis traz pele aveludada e recortes de cinema formidáveis.</p>
                 </div>
                 <div className="bg-white p-8 border-t-4 border-primary-600">
                    <h4 className="font-serif text-xl text-primary-900 mb-3">Direção Leve</h4>
                    <p className="text-sm font-light text-primary-600">Nada de sorrisos forçados. Toda a coordenação foca em fazer vocês respirarem e entrarem em conexão.</p>
                 </div>
                 <div className="bg-white p-8 border-t-4 border-primary-800">
                    <h4 className="font-serif text-xl text-primary-900 mb-3">Edição Atemporal</h4>
                    <p className="text-sm font-light text-primary-600">Contraste rico, tratamento de pele cuidadoso e cores fidedignas para durar muito além do tempo presente.</p>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </>
  );
};

export default Sobre;
