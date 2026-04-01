import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, MapPin, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Section from '../components/Section';
import Loading from '../components/Loading';

const Contato = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Gestante',
    date: '',
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

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

  const { siteSettings, faqs, portfolioCategories } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/public/lead`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, source: 'Formulário de Orçamento' })
       });
       if (!res.ok) throw new Error('Falha ao enviar contato');
       
       navigate('/obrigado');
    } catch (err) {
       setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente pelo WhatsApp.');
       setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Orçamento e Contato | {siteSettings.seoTitle}</title>
        <meta name="description" content="Agende seu ensaio ou faça o seu orçamento. Retratos atemporais em Bragança Paulista e região por William Preto." />
      </Helmet>
      
      <div className="pt-24 min-h-screen bg-gray-50/50">
        
        {/* Contact Header */}
        <section className="bg-primary-900 py-24 px-6 text-center text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-black/40"></div>
           <div className="container relative z-10 mx-auto max-w-4xl">
              <span className="text-accent text-sm tracking-[0.3em] font-medium uppercase drop-shadow-sm">Iniciar Jornada</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mt-6 mb-8 font-light text-white leading-tight">
                 Vamos criar <br className="hidden md:block"/> as  <span className="italic text-primary-200">suas memórias</span>
              </h1>
              <p className="text-white/80 font-light text-lg mb-12 max-w-2xl mx-auto">
                 Conte-me um pouco sobre você e o momento que deseja celebrar. Responderei com todos os detalhes e o carinho que a ocasião merece.
              </p>
           </div>
        </section>

        {/* Contact Form & Info Grid */}
        <section className="py-20">
           <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Form Side */}
              <div className="bg-white p-10 shadow-lg border border-gray-100/50 rounded-md">
                 <h2 className="text-2xl font-serif text-primary-900 mb-8 border-b pb-4">Pedir Orçamento Especializado</h2>
                 
                 {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-6 border border-red-200">
                       {error}
                    </div>
                 )}

                 <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Primeiro Nome</label>
                          <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-primary-500 focus:bg-white outline-none transition-all" placeholder="Seu nome" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">Qual o Assunto?</label>
                          <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-primary-500 focus:bg-white outline-none transition-all">
                             {portfolioCategories?.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                             <option value="Outro">Outro Motivo</option>
                          </select>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">WhatsApp</label>
                          <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-primary-500 focus:bg-white outline-none transition-all" placeholder="(00) 00000-0000" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">E-mail</label>
                          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-primary-500 focus:bg-white outline-none transition-all" placeholder="seunome@email.com" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-gray-700">Qual a data ou mês previsto?</label>
                       <input type="text" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-primary-500 focus:bg-white outline-none transition-all" placeholder="Ex: Metade de Novembro, Dia 12/05 etc" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-gray-700">Sua Mensagem</label>
                       <textarea rows="4" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-sm focus:border-primary-500 focus:bg-white outline-none transition-all resize-none" placeholder="Conte os detalhes de como imagina este dia, cores, lugares..."></textarea>
                    </div>

                    <button 
                       type="submit" 
                       disabled={submitting}
                       className="w-full bg-primary-900 border border-primary-900 text-white font-serif tracking-[0.1em] py-4 rounded-sm hover:bg-white hover:text-primary-900 transition-colors uppercase disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                       {submitting ? <><Loader2 className="animate-spin" size={20} /><span>Enviando...</span></> : <><Send size={20} /><span>Enviar Pedido de Orçamento</span></>}
                    </button>
                    
                    <p className="text-center text-xs text-gray-400 font-light mt-4">
                       Seus dados estão seguros e não enviamos spam.
                    </p>
                 </form>
              </div>

              {/* Informative Side */}
              <div className="flex flex-col space-y-12">
                 
                 {/* Direct Contact */}
                 <div className="text-primary-900 space-y-6 bg-white p-10 border border-primary-100 shadow-sm relative">
                    <div className="absolute top-0 left-0 w-2 h-full bg-primary-400"></div>
                    <h3 className="font-serif text-2xl mb-2">Prefere contato direto?</h3>
                    <p className="text-gray-500 font-light text-sm mb-6">Nossa equipe está disponível de Seg à Sex das 09h às 18h no WhatsApp para responder prontamente.</p>
                    
                    <a 
                       href={`https://wa.me/55${siteSettings.whatsapp.replace(/\D/g, '') || '11997931526'}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center space-x-4 text-green-600 font-medium hover:text-green-700 w-fit"
                    >
                       <div className="bg-green-100 p-4 rounded-full">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.062-.175-.3-.018-.462.131-.61.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                       </div>
                       <span className="text-xl">{siteSettings.whatsapp}</span>
                    </a>
                    
                    <div className="flex items-center space-x-4 text-primary-700 font-medium">
                       <div className="bg-primary-50 p-4 rounded-full text-primary-600">
                          <MapPin size={24} />
                       </div>
                       <span className="text-sm">
                          Atendimento Híbrido<br/>
                          <span className="text-xl font-serif text-primary-900">{siteSettings.cityRegion}</span>
                       </span>
                    </div>
                 </div>

                 {/* FAQs Accordion */}
                 <div className="pt-2">
                    <h3 className="text-sm font-sans tracking-[0.2em] text-primary-500 font-medium uppercase mb-6">Dúvidas Frequentes</h3>
                    <div className="space-y-4">
                       {faqs.map(faq => (
                          <div key={faq.id} className="border border-gray-200 bg-white shadow-sm overflow-hidden">
                             <button 
                               className="w-full flex justify-between items-center p-5 text-left font-serif text-primary-900 bg-gray-50/50 hover:bg-primary-50 transition-colors"
                               onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                             >
                               <span className="font-semibold text-lg">{faq.question}</span>
                               <motion.div animate={{ rotate: openFaq === faq.id ? 180 : 0 }} className="text-primary-500">
                                   <ChevronDown size={20} />
                               </motion.div>
                             </button>
                             <AnimatePresence>
                               {openFaq === faq.id && (
                                  <motion.div 
                                     initial={{ height: 0, opacity: 0 }}
                                     animate={{ height: 'auto', opacity: 1 }}
                                     exit={{ height: 0, opacity: 0 }}
                                     className="px-5 pb-5 pt-2 text-gray-600 font-light text-sm bg-white"
                                  >
                                     {faq.answer}
                                  </motion.div>
                               )}
                             </AnimatePresence>
                          </div>
                       ))}
                    </div>
                 </div>

              </div>
           </div>
        </section>
      </div>
    </>
  );
};

export default Contato;
