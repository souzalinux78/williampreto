import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, Edit2, GripVertical, Save, CheckCircle, XCircle } from 'lucide-react';

const WhyChoose = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchItems();
  }, [token]);

  const fetchItems = () => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/why-choose`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const method = editingItem?.id ? 'PUT' : 'POST';
    const url = editingItem?.id 
      ? `${import.meta.env.VITE_API_URL}/admin/why-choose/${editingItem.id}` 
      : `${import.meta.env.VITE_API_URL}/admin/why-choose`;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editingItem)
      });
      if (res.ok) {
        fetchItems();
        setShowForm(false);
        setEditingItem(null);
      }
    } catch (err) { alert('Erro ao salvar'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza?')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/why-choose/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchItems();
    } catch (err) { alert('Erro ao deletar'); }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
         <div>
            <h2 className="text-2xl font-serif text-primary-900 leading-tight">Por que escolher você? (Vantagens)</h2>
            <p className="text-gray-500 text-sm">Gerencie os diferenciais que aparecem na Landing Page.</p>
         </div>
         <button 
           onClick={() => { setEditingItem({}); setShowForm(true); }}
           className="bg-primary-900 border text-white px-6 py-2 rounded-sm hover:bg-black transition-all flex items-center space-x-2 text-sm uppercase tracking-widest font-bold"
         >
           <Plus size={16} /> <span>Novo Diferencial</span>
         </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="bg-primary-900 p-6 text-white flex justify-between items-center">
                 <h3 className="font-serif text-xl">{editingItem?.id ? 'Editar Diferencial' : 'Novo Diferencial'}</h3>
                 <button onClick={() => setShowForm(false)} className="hover:text-primary-300 transition-colors uppercase text-xs font-bold tracking-widest">Fechar</button>
              </div>
              <form onSubmit={handleSave} className="p-8 space-y-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título do Diferencial</label>
                    <input type="text" required value={editingItem.title || ''} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" placeholder="Ex: Olhar Artístico" />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Descrição Curta</label>
                    <textarea rows="4" required value={editingItem.description || ''} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none leading-relaxed" placeholder="Explique brevemente este diferencial..." />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ordem</label>
                      <input type="number" value={editingItem.order || 0} onChange={e => setEditingItem({...editingItem, order: parseInt(e.target.value)})} className="w-full border-gray-200 border p-3 rounded-sm focus:ring-1 focus:ring-primary-500 outline-none" />
                    </div>
                    <div className="flex items-center space-x-2 pt-8">
                       <input type="checkbox" id="active" checked={editingItem.active !== false} onChange={e => setEditingItem({...editingItem, active: e.target.checked})} className="w-4 h-4 text-primary-600 rounded border-gray-300" />
                       <label htmlFor="active" className="text-sm font-medium text-gray-700">Ativo no site</label>
                    </div>
                 </div>
                 <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-primary-900 border text-white px-10 py-3 rounded-sm hover:bg-black transition-all flex items-center space-x-2 text-sm uppercase tracking-widest font-bold">
                       <Save size={18}/> <span>Salvar</span>
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
           <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-widest">
                 <th className="p-6">Ordem</th>
                 <th className="p-6">Diferencial</th>
                 <th className="p-6">Status</th>
                 <th className="p-6 text-right">Ações</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
              {items.length > 0 ? items.map((item) => (
                 <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-6 text-sm text-gray-400">
                       <div className="flex items-center space-x-3">
                         <GripVertical size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300" />
                         <span>{item.order}</span>
                       </div>
                    </td>
                    <td className="p-6">
                       <h4 className="text-primary-900 font-medium font-serif leading-none">{item.title}</h4>
                       <p className="text-xs text-gray-500 mt-2 line-clamp-1 font-light">{item.description}</p>
                    </td>
                    <td className="p-6 text-sm">
                       {item.active ? (
                          <span className="inline-flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-green-100">
                             <CheckCircle size={10} /> <span>Ativo</span>
                          </span>
                       ) : (
                          <span className="inline-flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border border-red-100">
                             <XCircle size={10} /> <span>Inativo</span>
                          </span>
                       )}
                    </td>
                    <td className="p-6 text-right space-x-2">
                       <button onClick={() => { setEditingItem(item); setShowForm(true); }} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all">
                          <Edit2 size={18} />
                       </button>
                       <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
                          <Trash2 size={18} />
                       </button>
                    </td>
                 </tr>
              )) : (
                <tr>
                   <td colSpan="4" className="p-20 text-center text-gray-400 font-light border-2 border-dashed border-gray-50 m-4 rounded-lg">
                      <Plus size={48} className="mx-auto mb-4 text-gray-100" />
                      Nenhum diferencial cadastrado.<br/> Adicione o primeiro no botão acima!
                   </td>
                </tr>
              )}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default WhyChoose;
