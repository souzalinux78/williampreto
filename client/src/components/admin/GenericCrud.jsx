import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Save } from 'lucide-react';

const GenericCrud = ({ title, endpoint, fields }) => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const fetchUrl = `${import.meta.env.VITE_API_URL}/admin/${endpoint}`;

  const loadData = () => {
    setLoading(true);
    fetch(fetchUrl, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => { loadData(); }, [endpoint, token]);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      // Initialize fresh object based on fields
      const initData = {};
      fields.forEach(f => {
        if (f.type === 'boolean') initData[f.name] = true;
        else if (f.type === 'number') initData[f.name] = 0;
        else initData[f.name] = '';
      });
      setFormData(initData);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar?')) return;
    try {
      await fetch(`${fetchUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      loadData();
    } catch (e) { alert('Erro ao deletar'); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const isUpdate = !!editingId;
    const url = isUpdate ? `${fetchUrl}/${editingId}` : fetchUrl;
    
    // Parse numbers automatically for number fields
    const parsedData = { ...formData };
    fields.forEach(f => {
       if (f.type === 'number' && parsedData[f.name]) {
           parsedData[f.name] = parseInt(parsedData[f.name], 10);
       }
    });

    try {
      await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parsedData)
      });
      setIsModalOpen(false);
      loadData();
    } catch (e) { alert('Erro ao salvar'); }
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    const dt = new FormData();
    dt.append('image', file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: dt
      });
      const resData = await res.json();
      setFormData({ ...formData, [fieldName]: resData.imageUrl });
    } catch (err) { alert('Falha no upload'); }
  };

  if (loading) return <div>Carregando {title}...</div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 relative">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
         <h2 className="text-2xl font-serif text-primary-900">Gerenciar {title}</h2>
         <button onClick={() => handleOpenModal()} className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 flex items-center space-x-2 text-sm uppercase tracking-widest font-medium">
           <Plus size={16} /> <span>Adicionar Novo</span>
         </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {fields.filter(f => !f.hideInTable).map((f) => (
                <th key={f.name} className="p-4 font-semibold text-gray-700 text-sm whitespace-nowrap">{f.label}</th>
              ))}
              <th className="p-4 font-semibold text-gray-700 text-sm text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr><td colSpan={fields.length + 1} className="p-8 text-center text-gray-500">Nenhum registro encontrado.</td></tr>
            )}
            {data.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                {fields.filter(f => !f.hideInTable).map(f => (
                  <td key={f.name} className="p-4 text-sm text-gray-700 max-w-xs truncate">
                    {f.type === 'image' && item[f.name] ? (
                       <img src={item[f.name].startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${item[f.name]}` : item[f.name]} alt="preview" className="h-10 w-10 object-cover rounded-sm border" />
                    ) : f.type === 'boolean' ? (
                       <span className={`px-2 py-1 text-xs rounded-full ${item[f.name] ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{item[f.name] ? 'Sim' : 'Não'}</span>
                    ) : (
                       item[f.name]
                    )}
                  </td>
                ))}
                <td className="p-4 text-right space-x-3">
                  <button onClick={() => handleOpenModal(item)} className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded-md">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 p-1 bg-red-50 rounded-md">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
               <h3 className="text-xl font-serif text-primary-900">{editingId ? 'Editar' : 'Criar Novo'} {title}</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <form id="crud-form" onSubmit={handleSave} className="space-y-5">
                {fields.map(f => (
                  <div key={f.name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                    {f.type === 'textarea' ? (
                      <textarea 
                        required={f.required}
                        value={formData[f.name] || ''} 
                        onChange={e => setFormData({...formData, [f.name]: e.target.value})}
                        className="w-full border p-3 rounded-md focus:border-primary-500 outline-none min-h-[100px]"
                      />
                    ) : f.type === 'boolean' ? (
                      <div className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          checked={!!formData[f.name]} 
                          onChange={e => setFormData({...formData, [f.name]: e.target.checked})}
                          className="w-5 h-5 accent-primary-600"
                        />
                        <span className="text-sm text-gray-700">Ativo / Visível</span>
                      </div>
                    ) : f.type === 'image' ? (
                      <div>
                        <input type="file" accept="image/*" onChange={e => handleImageUpload(e, f.name)} className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                        {formData[f.name] && <img src={formData[f.name].startsWith('/uploads') ? `${import.meta.env.VITE_API_URL.replace('/api', '')}${formData[f.name]}` : formData[f.name]} alt="preview" className="h-24 w-auto object-contain border rounded-sm" />}
                      </div>
                    ) : f.type === 'select' ? (
                      <select 
                        required={f.required}
                        value={formData[f.name] || ''} 
                        onChange={e => setFormData({...formData, [f.name]: e.target.value})}
                        className="w-full border p-3 rounded-md focus:border-primary-500 outline-none"
                      >
                         <option value="">Selecione...</option>
                         {f.options && f.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                         ))}
                      </select>
                    ) : (
                      <input 
                        type={f.type || 'text'}
                        required={f.required}
                        value={formData[f.name] || ''} 
                        onChange={e => setFormData({...formData, [f.name]: e.target.value})}
                        className="w-full border p-3 rounded-md focus:border-primary-500 outline-none"
                      />
                    )}
                  </div>
                ))}
              </form>
            </div>
            
            <div className="p-6 border-t bg-gray-50 flex justify-end space-x-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-100">Cancelar</button>
              <button type="submit" form="crud-form" className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center space-x-2">
                 <Save size={18} /> <span>Salvar Registro</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCrud;
