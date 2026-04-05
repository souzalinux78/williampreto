import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Image as ImageIcon, Info, Heart, MapPin, Quote } from 'lucide-react';

const Sections = () => {
  const { token } = useAuth();
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/landing-page-sections`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setSections(data);
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
      if (res.ok) alert('Seções atualizadas com sucesso!');
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
    { id: 'about', label: 'Sobre Nós', icon: <Info size={18} /> },
    { id: 'whyChoose', label: 'Por que Escolher', icon: <Star size={18} /> },
    { id: 'testimonials', label: 'Depoimentos', icon: <Heart size={18} /> },
    { id: 'location', label: 'Localização', icon: <MapPin size={18} /> }
  ];

  function Star({ size }) { return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
           <h2 className="text-3xl font-serif text-primary-900">Editor de Seções</h2>
           <p className="text-gray-500">Personalize cada detalhe da sua landing page.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving} 
          className="bg-primary-900 text-white px-8 py-3 rounded-sm hover:bg-black transition-all flex items-center space-x-2 shadow-lg disabled:opacity-50"
        >
          <Save size={18} /> <span>{saving ? 'Gravando...' : 'Publicar Alterações'}</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs Navigation */}
        <div className="flex border-b overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? 'border-b-2 border-primary-600 text-primary-900 bg-primary-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-8">
          {activeTab === 'about' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Selo Superior (Tagline)</label>
                      <input type="text" value={sections.aboutBadge || ''} onChange={e => setSections({...sections, aboutBadge: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Ex: Especialista em Gestantes" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título da Seção</label>
                      <textarea rows="3" value={sections.aboutTitle || ''} onChange={e => setSections({...sections, aboutTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Use \n para quebra de linha" />
                      <p className="text-[10px] text-gray-400 mt-1 italic">Dica: Use quebras de linha para manter a estética elegante do design original.</p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Frase de Destaque (Quote)</label>
                      <input type="text" value={sections.aboutQuote || ''} onChange={e => setSections({...sections, aboutQuote: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" placeholder='Ex: "Delicadeza que transcende."' />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Imagem de Acompanhamento</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-100 border-dashed rounded-md bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group">
                      <input type="file" onChange={e => handleImageUpload(e, 'aboutImage')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="space-y-1 text-center">
                        {sections.aboutImage ? (
                          <img src={sections.aboutImage.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${sections.aboutImage}` : sections.aboutImage} className="mx-auto h-48 w-auto object-cover rounded shadow-md mb-4" alt="Preview" />
                        ) : (
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <span className="relative rounded-md font-medium text-primary-600 group-hover:text-primary-800">Fazer upload de nova imagem</span>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF até 5MB</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'whyChoose' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Tagline (Pequeno)</label>
                      <input type="text" value={sections.whyChooseBadge || ''} onChange={e => setSections({...sections, whyChooseBadge: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título de Impacto</label>
                      <textarea rows="3" value={sections.whyChooseTitle || ''} onChange={e => setSections({...sections, whyChooseTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Imagem Decorativa Lateral</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-100 border-dashed rounded-md bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden group">
                      <input type="file" onChange={e => handleImageUpload(e, 'whyChooseImage')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="space-y-1 text-center">
                        {sections.whyChooseImage ? (
                          <img src={sections.whyChooseImage.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${sections.whyChooseImage}` : sections.whyChooseImage} className="mx-auto h-48 w-auto object-cover rounded shadow-md mb-4" alt="Preview" />
                        ) : (
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <span className="relative rounded-md font-medium text-primary-600 group-hover:text-primary-800">Alterar imagem da seção</span>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título da Seção de Depoimentos</label>
                  <textarea rows="3" value={sections.testimonialsTitle || ''} onChange={e => setSections({...sections, testimonialsTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none font-serif text-xl" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Subtítulo / Tagline</label>
                  <input type="text" value={sections.testimonialsSubtitle || ''} onChange={e => setSections({...sections, testimonialsSubtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
               </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título "Onde Estamos"</label>
                  <textarea rows="3" value={sections.locationTitle || ''} onChange={e => setSections({...sections, locationTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none font-serif text-xl" />
               </div>
               <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Texto Descritivo / Endereço</label>
                  <textarea rows="5" value={sections.locationSubtitle || ''} onChange={e => setSections({...sections, locationSubtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none leading-relaxed" />
               </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 border-t p-6 flex items-center justify-between">
           <div className="flex items-center space-x-2 text-gray-400 text-xs italic">
             <Info size={14} />
             <span>As alterações serão visíveis imediatamente após a publicação.</span>
           </div>
           <button 
             onClick={handleSave} 
             disabled={saving} 
             className="bg-primary-900 border text-white px-8 py-2 rounded-sm hover:bg-black transition-all flex items-center space-x-2 text-sm font-medium"
           >
             <span>{saving ? 'Publicando...' : 'Publicar'}</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default Sections;
