import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save } from 'lucide-react';

const Configuracoes = () => {
  const { token } = useAuth();
  const [settings, setSettings] = useState({});
  const [hero, setHero] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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

  if (loading) return <div>Carregando...</div>;

  return (
    <form onSubmit={handleSave} className="space-y-8 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
         <h2 className="text-2xl font-serif text-primary-900">Configurações Gerais & Hero</h2>
         <button type="submit" disabled={saving} className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2">
           <Save size={18} /> <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Settings Group */}
         <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Informações e SEO</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Nome do Fotógrafo (Title)</label>
              <input type="text" value={settings.photographerName || ''} onChange={e => setSettings({...settings, photographerName: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">WhatsApp</label>
              <input type="text" value={settings.whatsapp || ''} onChange={e => setSettings({...settings, whatsapp: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Cidade / Região de Atuação</label>
              <input type="text" value={settings.cityRegion || ''} onChange={e => setSettings({...settings, cityRegion: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">SEO Title (Browser Tab)</label>
              <input type="text" value={settings.seoTitle || ''} onChange={e => setSettings({...settings, seoTitle: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">SEO Description</label>
              <textarea value={settings.seoDescription || ''} onChange={e => setSettings({...settings, seoDescription: e.target.value})} rows="3" className="w-full border p-2 rounded-md focus:border-primary-500 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Texto Institucional (Quem Somos)</label>
              <textarea value={settings.institutionalText || ''} onChange={e => setSettings({...settings, institutionalText: e.target.value})} rows="5" className="w-full border p-2 rounded-md focus:border-primary-500 outline-none"></textarea>
            </div>
         </div>

         {/* Hero Group */}
         <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-800">Seção Inicial (O que o cliente vê primeiro)</h3>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Título Grande Principal</label>
              <input type="text" value={hero.title || ''} onChange={e => setHero({...hero, title: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Selo de Autoridade (Badge)</label>
              <input type="text" value={hero.badgeText || ''} onChange={e => setHero({...hero, badgeText: e.target.value})} className="w-full border p-2 rounded-md focus:border-primary-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Subtítulo Emocional</label>
              <textarea value={hero.subtitle || ''} onChange={e => setHero({...hero, subtitle: e.target.value})} rows="4" className="w-full border p-2 rounded-md focus:border-primary-500 outline-none"></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Imagem Principal de Fundo</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border p-2 rounded-md mb-2" />
              {hero.imageUrl && (
                 <div className="w-full h-32 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                    <img src={hero.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${hero.imageUrl}` : hero.imageUrl} alt="Hero Preview" className="h-full object-cover" />
                 </div>
              )}
            </div>
         </div>
      </div>
    </form>
  );
};

export default Configuracoes;
