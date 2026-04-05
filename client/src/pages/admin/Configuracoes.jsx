import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save, Globe, Shield, MessageCircle, MapPin, Search } from 'lucide-react';

const Configuracoes = () => {
  const { token } = useAuth();
  const [settings, setSettings] = useState({});
  const [hero, setHero] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('geral');

  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/admin/site-settings`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json()),
      fetch(`${import.meta.env.VITE_API_URL}/admin/hero`, { headers: { 'Authorization': `Bearer ${token}` } }).then(r => r.json())
    ]).then(([settingsData, heroData]) => {
      setSettings(settingsData);
      setHero(heroData);
      setLoading(false);
    });
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      await fetch(`${import.meta.env.VITE_API_URL}/admin/hero`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(hero)
      });
      alert('Configurações salvas com sucesso!');
    } catch (err) {
      alert('Erro ao salvar configurações.');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e) => {
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
      setHero({ ...hero, imageUrl: data.imageUrl });
    } catch (err) {
      alert('Upload falhou');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex justify-between items-center mb-10">
         <div>
            <h2 className="text-3xl font-serif text-primary-900 leading-tight">Configurações & Instagram</h2>
            <p className="text-gray-500">Configure sua identidade social e os algoritmos de busca.</p>
         </div>
         <button onClick={handleSave} disabled={saving} className="bg-primary-900 text-white px-8 py-3 rounded-sm hover:bg-black transition-all flex items-center space-x-2 shadow-lg disabled:opacity-50">
            <Save size={18} /> <span>{saving ? 'Gravando...' : 'Salvar Alterações'}</span>
         </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button onClick={() => setActiveTab('geral')} className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'geral' ? 'border-b-2 border-primary-600 text-primary-900 bg-primary-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
            <Globe size={18} /> <span>Identidade & Instagram</span>
          </button>
          <button onClick={() => setActiveTab('seo_google')} className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'seo_google' ? 'border-b-2 border-primary-600 text-primary-900 bg-primary-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
            <Search size={18} /> <span>SEO & Google</span>
          </button>
          <button onClick={() => setActiveTab('hero')} className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'hero' ? 'border-b-2 border-primary-600 text-primary-900 bg-primary-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
            <MessageCircle size={18} /> <span>Seção Hero (Topo)</span>
          </button>
          <button onClick={() => setActiveTab('about')} className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'about' ? 'border-b-2 border-primary-600 text-primary-900 bg-primary-50/30' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>
            <Shield size={18} /> <span>Institucional / Biografia</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8">
           {activeTab === 'geral' && (
              <div className="space-y-6 animate-in fade-in duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-primary-50/50 p-6 rounded-lg border border-primary-100">
                    <div className="bg-white p-4 rounded border border-primary-200 shadow-sm ring-2 ring-primary-500/20">
                      <label className="block text-xs font-bold text-primary-900 uppercase tracking-widest mb-2 flex items-center">
                         <MapPin size={14} className="mr-2" />
                         Usuário Instagram (Nome)
                      </label>
                      <input type="text" value={settings.instagram || ''} onChange={e => setSettings({...settings, instagram: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none font-medium" placeholder="Ex: williampreto_fotografo" />
                      <p className="text-[10px] text-primary-600 mt-2 font-bold uppercase tracking-tighter">Digite apenas seu usuário (sem o @)</p>
                    </div>
                    <div className="bg-white p-4 rounded border border-gray-100">
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">WhatsApp de Atendimento</label>
                      <input type="text" value={settings.whatsapp || ''} onChange={e => setSettings({...settings, whatsapp: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cidade / Região</label>
                      <input type="text" value={settings.cityRegion || ''} onChange={e => setSettings({...settings, cityRegion: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Texto do Botão CTA (Fale Conosco)</label>
                      <input type="text" value={settings.ctaText || ''} onChange={e => setSettings({...settings, ctaText: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                 </div>
                 <div className="pt-4">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nome Completo do Profissional</label>
                    <input type="text" value={settings.photographerName || ''} onChange={e => setSettings({...settings, photographerName: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none max-w-md" />
                 </div>
              </div>
           )}

           {activeTab === 'seo_google' && (
              <div className="space-y-6 animate-in fade-in duration-500 max-w-2xl">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título do Site (SEO Title)</label>
                    <input type="text" value={settings.seoTitle || ''} onChange={e => setSettings({...settings, seoTitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição Meta (SEO Description)</label>
                    <textarea rows="4" value={settings.seoDescription || ''} onChange={e => setSettings({...settings, seoDescription: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none leading-relaxed" />
                 </div>
              </div>
           )}

           {activeTab === 'hero' && (
              <div className="space-y-8 animate-in fade-in duration-500">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título Principal Grande</label>
                          <input type="text" value={hero.title || ''} onChange={e => setHero({...hero, title: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Selo de Destaque (Badge)</label>
                          <input type="text" value={hero.badgeText || ''} onChange={e => setHero({...hero, badgeText: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                       </div>
                       <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Subtítulo Emocional</label>
                          <textarea rows="4" value={hero.subtitle || ''} onChange={e => setHero({...hero, subtitle: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none leading-relaxed" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Imagem de Impacto (Fundo)</label>
                       <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-4 h-64 flex flex-col items-center justify-center relative overflow-hidden group">
                          {hero.imageUrl ? (
                             <>
                                <img src={hero.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${hero.imageUrl}` : hero.imageUrl} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" alt="Hero Preview" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col text-white z-10">
                                   <Globe className="mb-2" />
                                   <span className="text-xs uppercase font-bold tracking-widest">Alterar Imagem da Seção</span>
                                </div>
                             </>
                          ) : <div className="text-gray-400 flex flex-col items-center"><Globe size={48} className="mb-4" /> <span>Nenhuma imagem definida</span></div>}
                          <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'about' && (
              <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nome Completo do Profissional</label>
                    <input type="text" value={settings.photographerName || ''} onChange={e => setSettings({...settings, photographerName: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Biografia Curta (Institucional)</label>
                    <textarea rows="10" value={settings.institutionalText || ''} onChange={e => setSettings({...settings, institutionalText: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none leading-relaxed" />
                    <p className="text-[10px] text-gray-400 mt-2">Dica: Use parágrafos claros para facilitar a leitura dos seus clientes sobre sua trajetória.</p>
                 </div>
              </div>
           )}
        </form>

        <div className="bg-gray-50 border-t p-6 flex items-center justify-between">
           <div className="flex items-center space-x-2 text-primary-400 text-xs italic">
             <MapPin size={14} />
             <span>Configurações globais que afetam todo o comportamento e indexação do site.</span>
           </div>
           <button onClick={handleSave} disabled={saving} className="bg-primary-900 border text-white px-8 py-2 rounded-sm hover:bg-black transition-all flex items-center space-x-2 text-sm font-medium">
             <span>{saving ? 'Publicando...' : 'Salvar Alterações'}</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
