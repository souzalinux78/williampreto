import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Loading from '../components/Loading';

const Obrigado = () => {
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

  const { siteSettings } = data;

  return (
    <>
      <Helmet>
        <title>Obrigado pelo Contato | {siteSettings.seoTitle}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <div className="min-h-screen bg-primary-50 flex items-center justify-center p-6 pt-24">
         <div className="bg-white p-12 max-w-2xl w-full text-center shadow-xl border border-primary-100 rounded-sm">
            <div className="w-24 h-24 mx-auto bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
               <CheckCircle2 size={48} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif text-primary-900 mb-6 font-light">
               Pedido <span className="italic text-primary-600">Recebido!</span>
            </h1>
            
            <div className="w-16 h-[1px] bg-primary-300 mx-auto mb-8"></div>
            
            <p className="text-primary-700 font-light text-lg mb-10 leading-relaxed max-w-lg mx-auto">
               Obrigado por confiar no meu olhar para registrar o seu momento. Sua mensagem foi recebida com sucesso e entrarei em contato o mais breve possível.
            </p>
            
            <div className="space-y-6 flex flex-col items-center">
               <p className="text-sm text-gray-400">Quer acelerar o atendimento?</p>
               <a 
                 href={`https://wa.me/55${siteSettings.whatsapp.replace(/\D/g, '') || '11997931526'}?text=Ol%C3%A1%2C%20acabei%20de%20preencher%20o%20formul%C3%A1rio%20no%20site!`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn-primary flex items-center space-x-2"
               >
                 <span>Chamar no WhatsApp Agora</span>
                 <ArrowRight size={18} />
               </a>
               
               <Link to="/" className="text-primary-600 hover:text-primary-800 underline text-sm mt-8 block">
                 Voltar para a Página Inicial
               </Link>
            </div>
         </div>
      </div>
    </>
  );
};

export default Obrigado;
