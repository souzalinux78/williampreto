import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, Edit2, Trash2, X, Save, AlertCircle, CheckCircle2, Loader2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GenericCrud = ({ title, endpoint, fields }) => {
  const { token } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fetchUrl = `${import.meta.env.VITE_API_URL}/admin/${endpoint}`;

  const loadData = () => {
    setLoading(true);
    fetch(fetchUrl, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { 
        if (Array.isArray(d)) setData(d);
        else console.error('Data is not an array:', d);
        setLoading(false); 
      })
      .catch(e => { console.error(e); setLoading(false); });
  };

  useEffect(() => { loadData(); }, [endpoint, token]);

  const handleOpenModal = (item = null) => {
    setError(null);
    setSuccess(null);
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
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
    if (!window.confirm('Tem certeza que deseja apagar este registro?')) return;
    try {
      const res = await fetch(`${fetchUrl}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Falha ao deletar');
      loadData();
    } catch (e) { alert('Erro ao deletar: ' + e.message); }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    const isUpdate = !!editingId;
    const url = isUpdate ? `${fetchUrl}/${editingId}` : fetchUrl;
    
    // Clean and Parse Data
    const parsedData = { ...formData };
    fields.forEach(f => {
       // if field is marked as number or type is number, parse it
       if ((f.type === 'number' || f.isNumber) && parsedData[f.name] !== undefined && parsedData[f.name] !== '') {
           parsedData[f.name] = parseInt(parsedData[f.name], 10);
       }
    });

    // Remove internal fields that shouldn't be sent to Prisma updates
    delete parsedData.id;
    delete parsedData.createdAt;
    delete parsedData.updatedAt;
    if (parsedData.category) delete parsedData.category; // nested objects prisma might complain about

    try {
      const res = await fetch(url, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(parsedData)
      });
      
      const resData = await res.json();
      
      if (!res.ok) {
        throw new Error(resData.details || resData.error || 'Erro ao salvar registro');
      }

      setSuccess('Salvo com sucesso!');
      setTimeout(() => {
        setIsModalOpen(false);
        loadData();
      }, 1000);
    } catch (e) { 
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;
    setError(null);
    const dt = new FormData();
    dt.append('image', file);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: dt
      });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || 'Erro no upload');
      setFormData({ ...formData, [fieldName]: resData.imageUrl });
    } catch (err) { setError('Falha no upload: ' + err.message); }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-20 space-y-4">
      <Loader2 className="animate-spin text-primary-600" size={40} />
      <p className="text-gray-500 font-medium">Carregando {title}...</p>
    </div>
  );

  const getBaseUrl = () => import.meta.env.VITE_API_URL.replace('/api', '');

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex justify-between items-center">
         <div>
            <h2 className="text-2xl font-serif text-primary-900 leading-tight">Gerenciar {title}</h2>
            <p className="text-sm text-gray-500 mt-1">{data.length} registros encontrados</p>
         </div>
         <button 
           onClick={() => handleOpenModal()} 
           className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center space-x-2 text-sm font-semibold shadow-lg shadow-primary-200"
         >
           <Plus size={18} /> <span>Adicionar Novo</span>
         </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {fields.filter(f => !f.hideInTable).map((f) => (
                <th key={f.name} className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider">{f.label}</th>
              ))}
              <th className="px-6 py-4 font-bold text-gray-400 text-xs uppercase tracking-wider text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 && (
              <tr><td colSpan={fields.length + 1} className="py-20 text-center text-gray-400 font-light italic">Nenhum registro encontrado.</td></tr>
            )}
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-primary-50/30 transition-colors group">
                {fields.filter(f => !f.hideInTable).map(f => (
                  <td key={f.name} className="px-6 py-4 text-sm text-gray-700">
                    {f.type === 'image' && item[f.name] ? (
                       <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm group-hover:scale-110 transition-transform">
                         <img src={item[f.name].startsWith('/uploads') ? `${getBaseUrl()}${item[f.name]}` : item[f.name]} alt="preview" className="h-full w-full object-cover" />
                       </div>
                    ) : f.type === 'boolean' ? (
                       <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item[f.name] ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                         <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item[f.name] ? 'bg-green-500' : 'bg-red-500'}`}></span>
                         {item[f.name] ? 'Sim' : 'Não'}
                       </span>
                    ) : (
                       <div className="max-w-[200px] truncate font-medium text-gray-800">{item[f.name]}</div>
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleOpenModal(item)} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitting && setIsModalOpen(false)}
              className="absolute inset-0 bg-primary-950/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative z-10"
            >
              <div className="px-8 py-6 border-b flex justify-between items-center bg-gray-50/50">
                 <div>
                   <h3 className="text-xl font-serif text-primary-900">{editingId ? 'Editar Registro' : 'Novo Registro'}</h3>
                   <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-bold">{title}</p>
                 </div>
                 <button onClick={() => !submitting && setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                   <X size={24} />
                 </button>
              </div>
              
              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                <form id="crud-form" onSubmit={handleSave} className="grid grid-cols-1 gap-6">
                  {error && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start space-x-3 text-red-800 text-sm">
                      <AlertCircle className="shrink-0 mt-0.5" size={18} />
                      <p><strong>Erro:</strong> {error}</p>
                    </motion.div>
                  )}
                  {success && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-start space-x-3 text-green-800 text-sm">
                      <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                      <p>{success}</p>
                    </motion.div>
                  )}

                  {fields.map(f => (
                    <div key={f.name} className="flex flex-col space-y-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">{f.label}</label>
                      {f.type === 'textarea' ? (
                        <textarea 
                          required={f.required}
                          value={formData[f.name] || ''} 
                          onChange={e => setFormData({...formData, [f.name]: e.target.value})}
                          disabled={submitting}
                          className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary-500 outline-none min-h-[120px] transition-colors resize-none bg-gray-50/30 focus:bg-white"
                        />
                      ) : f.type === 'boolean' ? (
                        <label className="inline-flex items-center cursor-pointer group mt-1">
                          <div className="relative">
                            <input 
                              type="checkbox" 
                              checked={!!formData[f.name]} 
                              onChange={e => setFormData({...formData, [f.name]: e.target.checked})}
                              disabled={submitting}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-primary-900 transition-colors">Ativo / Visível</span>
                        </label>
                      ) : f.type === 'image' ? (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative group shrink-0">
                               <div className="h-24 w-24 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                 {formData[f.name] ? (
                                   <img src={formData[f.name].startsWith('/uploads') ? `${getBaseUrl()}${formData[f.name]}` : formData[f.name]} alt="preview" className="h-full w-full object-cover" />
                                 ) : (
                                   <Camera size={32} className="text-gray-300" />
                                 )}
                               </div>
                            </div>
                            <div className="flex-1">
                               <input 
                                 type="file" 
                                 accept="image/*" 
                                 onChange={e => handleImageUpload(e, f.name)} 
                                 disabled={submitting}
                                 className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 cursor-pointer"
                               />
                               <p className="text-[10px] text-gray-400 mt-2 px-1 italic">Tamanho recomendado: 1200x800px. JPG ou PNG.</p>
                            </div>
                          </div>
                        </div>
                      ) : f.type === 'select' ? (
                        <select 
                          required={f.required}
                          value={formData[f.name] || ''} 
                          onChange={e => setFormData({...formData, [f.name]: e.target.value})}
                          disabled={submitting}
                          className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary-500 outline-none transition-colors bg-gray-50/30 focus:bg-white appearance-none cursor-pointer"
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
                          disabled={submitting}
                          placeholder={`Digite o ${f.label.toLowerCase()}...`}
                          className="w-full border-2 border-gray-100 p-4 rounded-2xl focus:border-primary-500 outline-none transition-colors bg-gray-50/30 focus:bg-white"
                        />
                      )}
                    </div>
                  ))}
                </form>
              </div>
              
              <div className="p-8 border-t bg-gray-50/50 flex justify-end items-center space-x-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  disabled={submitting}
                  className="px-6 py-3 text-gray-500 font-bold text-sm tracking-widest uppercase hover:text-gray-900 disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  form="crud-form" 
                  disabled={submitting}
                  className="px-10 py-3.5 bg-primary-900 text-white rounded-2xl hover:bg-black transition-all flex items-center space-x-3 shadow-xl shadow-gray-200 active:scale-95 disabled:opacity-70"
                >
                   {submitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                   <span className="font-bold text-sm tracking-widest uppercase">{editingId ? 'Salvar Alterações' : 'Criar Registro'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenericCrud;
