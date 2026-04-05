import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Image as ImageIcon, Info, Heart, MapPin, Quote, Camera, List, Star } from 'lucide-react';

const Sections = () => {
  const { token } = useAuth();
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  const defaultSections = {
    aboutTitle: 'Especialista em eternizar \nfases únicas.',
    aboutBadge: 'Especialista em Gestantes',
    aboutQuote: 'Delicadeza que transcende.',
    aboutImage: '/maternity.png',
    whyChooseTitle: 'Mais do que um ensaio, \numa experiência.',
    whyChooseBadge: 'Por que escolher William Preto',
    whyChooseImage: '/family.png',
    servicesTitle: 'Descubra a beleza em \ncada fase da sua vida.',
    servicesSubtitle: 'Serviços fotográficos especializados com foco em sensibilidade, naturalidade e elegância para gestantes, famílias e casamentos civis.',
    portfolioTitle: 'Explore Nosso Universo\nAtemporal.',
    portfolioSubtitle: 'Cada clique é um fragmento de história preservado com a delicadeza de quem entende o valor das memórias que atravessam gerações.',
    locationTitle: 'A natureza como \npano de fundo',
    locationSubtitle: 'Atendemos em Bragança Paulista e toda a região, oferecendo tanto um estúdio confortável e climatizado para bebês e gestantes que buscam ensaios intimistas (boudoir maternity), quanto as mais belas paisagens da região para ensaios externos.',
    locationImage: '/family.png'
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/landing-page-sections`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        // Merge defaults with loaded data to ensure no blank fields
        const merged = { ...defaultSections, ...data };
        Object.keys(merged).forEach(key => {
          if (!data[key]) merged[key] = defaultSections[key];
        });
        setSections(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/landing-page-sections`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(sections)
      });
      if (res.ok) alert('Seções atualizadas com sucesso em todo o site!');
      else throw new Error();
    } catch (err) {
      alert('Erro ao salvar seções.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await res.json();
      setSections({ ...sections, [field]: data.imageUrl });
    } catch (err) {
      alert('Upload falhou');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;

  const tabs = [
    { id: 'about', label: 'Biogafia & Sobre', icon: <Info size={18} /> },
    { id: 'whyChoose', label: 'Vantagens (Por que eu?)', icon: <Star size={18} /> },
    { id: 'services_portfolio', label: 'Serviços & Portfólio', icon: <Camera size={18} /> },
    { id: 'social_location', label: 'Depoimentos & Local', icon: <MapPin size={18} /> }
  ];

  const ImagePreview = ({ field, label }) => (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</label>
      <div className="relative group aspect-video bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg overflow-hidden flex items-center justify-center hover:bg-gray-100 transition-all">
        {sections[field] ? (
          <img src={sections[field].startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${sections[field]}` : sections[field]} className="w-full h-full object-cover" alt="Preview" />
        ) : (
          <div className="text-gray-400 text-center"><ImageIcon size={32} className="mx-auto mb-2" /> <span className="text-[10px]">Sem Imagem</span></div>
        )}
        <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
           <span className="text-white text-xs font-bold uppercase tracking-widest border border-white px-4 py-2">Alterar Foto</span>
        </div>
        <input type="file" onChange={e => handleImageUpload(e, field)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <div>
           <h2 className="text-3xl font-serif text-primary-900 leading-tight">Editor Visual Landing Page</h2>
           <p className="text-gray-500">Configure as fotos principais e textos de impacto de cada seção da Home.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="bg-primary-900 text-white px-10 py-4 rounded-sm hover:bg-black transition-all flex items-center space-x-2 shadow-2xl disabled:opacity-50 font-bold uppercase tracking-widest text-xs">
          <Save size={18} /> <span>{saving ? 'Publicando...' : 'Aplicar no Site'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
        <div className="flex border-b bg-gray-50/50 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-8 py-5 text-sm font-medium transition-all whitespace-nowrap border-r border-gray-100 ${activeTab === tab.id ? 'bg-white border-b-2 border-b-primary-600 text-primary-900 ring-t-1 ring-gray-100' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'}`}>
              {tab.icon} <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="p-10">
           {activeTab === 'about' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-in fade-in slide-in-from-top-4 duration-500">
                 <div className="md:col-span-1">
                    <ImagePreview field="aboutImage" label="Foto da Sua Biografia" />
                    <p className="text-[10px] text-gray-400 mt-4 uppercase">Recomendado: Retrato (Vertical)</p>
                 </div>
                 <div className="md:col-span-2 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Selo de Chamada (Badge)</label>
                      <input type="text" value={sections.aboutBadge || ''} onChange={e => setSections({...sections, aboutBadge: e.target.value})} className="w-full border-gray-200 border p-4 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none text-primary-900 font-medium" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Título Principal "Sobre"</label>
                      <textarea rows="3" value={sections.aboutTitle || ''} onChange={e => setSections({...sections, aboutTitle: e.target.value})} className="w-full border-gray-200 border p-4 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none font-serif text-lg italic" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Slogan / Quote Transcendente</label>
                      <input type="text" value={sections.aboutQuote || ''} onChange={e => setSections({...sections, aboutQuote: e.target.value})} className="w-full border-gray-200 border p-4 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'whyChoose' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 animate-in fade-in duration-500">
                 <div className="md:col-span-1">
                    <ImagePreview field="whyChooseImage" label="Foto da Seção (Família)" />
                    <p className="text-[10px] text-gray-400 mt-4 uppercase italic">Esta é a foto que aparece à esquerda na seção de vantagens.</p>
                 </div>
                 <div className="md:col-span-2 space-y-8">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Título de Impacto "Por que?"</label>
                      <textarea rows="3" value={sections.whyChooseTitle || ''} onChange={e => setSections({...sections, whyChooseTitle: e.target.value})} className="w-full border-gray-200 border p-4 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none font-serif text-2xl leading-relaxed" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tagline Superior</label>
                      <input type="text" value={sections.whyChooseBadge || ''} onChange={e => setSections({...sections, whyChooseBadge: e.target.value})} className="w-full border-gray-200 border p-4 rounded-sm" />
                    </div>
                    <div className="bg-primary-50 p-6 rounded border border-primary-100 flex items-start space-x-4">
                       <Star className="text-primary-600 mt-1 flex-shrink-0" size={24} />
                       <div>
                          <p className="text-sm text-primary-900 font-bold mb-1 uppercase tracking-tight">Onde edito os itens (01, 02..)?</p>
                          <p className="text-xs text-primary-700 leading-relaxed">Os tópicos individuais (Direção, Sensibilidade..) devem ser editados no menu exclusivo <span className="underline italic">"Vantagens (Por que eu?)"</span> na barra lateral.</p>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'services_portfolio' && (
              <div className="space-y-12 animate-in fade-in duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                       <div className="flex items-center space-x-2 text-primary-900 mb-2">
                          <Camera size={18} /> <h3 className="font-serif text-lg font-bold">Cabeçalho de Serviços</h3>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título de Serviços</label>
                          <input type="text" value={sections.servicesTitle || ''} onChange={e => setSections({...sections, servicesTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição dos Serviços</label>
                          <textarea rows="3" value={sections.servicesSubtitle || ''} onChange={e => setSections({...sections, servicesSubtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm leading-relaxed" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center space-x-2 text-primary-900 mb-2">
                          <List size={18} /> <h3 className="font-serif text-lg font-bold">Cabeçalho do Portfólio</h3>
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título do Portfólio</label>
                          <input type="text" value={sections.portfolioTitle || ''} onChange={e => setSections({...sections, portfolioTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição / Instrução</label>
                          <textarea rows="3" value={sections.portfolioSubtitle || ''} onChange={e => setSections({...sections, portfolioSubtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm leading-relaxed" />
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'social_location' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-500">
                 <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-primary-900 mb-2 font-serif font-bold text-lg">
                       <Heart size={18} /> <h3>Depoimentos</h3>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título dos Depoimentos</label>
                       <textarea rows="2" value={sections.testimonialsTitle || ''} onChange={e => setSections({...sections, testimonialsTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm italic" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Subtítulo Emocional</label>
                       <input type="text" value={sections.testimonialsSubtitle || ''} onChange={e => setSections({...sections, testimonialsSubtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm" />
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex items-center space-x-2 text-primary-900 mb-2 font-serif font-bold text-lg">
                       <MapPin size={18} /> <h3>Onde Criamos Histórias</h3>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título da Localização</label>
                       <input type="text" value={sections.locationTitle || ''} onChange={e => setSections({...sections, locationTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm" />
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Endereço / Texto do Mapa</label>
                       <textarea rows="4" value={sections.locationSubtitle || ''} onChange={e => setSections({...sections, locationSubtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm leading-relaxed" />
                    </div>
                 </div>
              </div>
           )}
        </form>
      </div>
    </div>
  );
};

export default Sections;
