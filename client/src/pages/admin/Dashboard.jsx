import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Camera, Star, MessageSquareText, Calendar, ExternalLink, BarChart3, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { token, admin } = useAuth();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/stats`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="flex items-center justify-center h-64 font-serif text-primary-900">Carregando painel de controle...</div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-serif text-primary-900 leading-tight">Olá, {admin?.name || 'Administrador'}!</h2>
          <p className="text-gray-500 mt-1">Aqui está o que está acontecendo com o seu site William Preto Fotografia.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest bg-primary-50 text-primary-700 px-4 py-2 rounded-full border border-primary-100">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span>Sistema Online</span>
        </div>
      </div>

      {/* Stats Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md">
           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
             <Camera size={24} />
           </div>
           <div>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Portfólio</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.portfolioCount || 0} fotos</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md">
           <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
             <Star size={24} />
           </div>
           <div>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Avaliações</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.testimonialsCount || 0} depoimentos</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md">
           <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
             <BarChart3 size={24} />
           </div>
           <div>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Visitas 30d</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.activeVisits || 0} acessos</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4 transition-all hover:shadow-md border-l-4 border-l-green-500">
           <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
             <MessageSquareText size={24} />
           </div>
           <div>
             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Contatos</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.leadsCount || 0} orçamentos</h3>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Leads Table */}
        <div className="xl:col-span-2 bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
             <h3 className="text-xl font-serif text-primary-900">Últimos Orçamentos</h3>
             <Link to="/admin/configuracoes" className="text-xs font-bold uppercase text-primary-600 hover:text-primary-800 transition-colors">Ver todos</Link>
          </div>
          
          {stats.recentLeads && stats.recentLeads.length > 0 ? (
             <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-gray-100 italic text-gray-400 text-xs">
                         <th className="py-3 font-medium">Cliente</th>
                         <th className="py-3 font-medium">Tipo</th>
                         <th className="py-3 font-medium">Data Evento</th>
                         <th className="py-3 font-medium text-right">Ação</th>
                      </tr>
                   </thead>
                   <tbody>
                      {stats.recentLeads.map((lead) => (
                         <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 text-sm font-medium text-gray-800">
                               {lead.name}
                               <div className="text-[10px] text-gray-400 font-light lowercase mt-1 tracking-wider">{lead.email || '-'}</div>
                            </td>
                            <td className="py-4 text-xs font-light text-gray-600 uppercase tracking-widest">{lead.type || 'Geral'}</td>
                            <td className="py-4 text-xs font-light text-gray-600 italic">
                               {lead.date || 'Não informado'}
                            </td>
                            <td className="py-4 text-right">
                               <a href={`https://wa.me/55${lead.phone?.replace(/\D/g, '')}?text=Olá! Recebemos seu pedido no site do William Preto.`} target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1.5 rounded-sm text-[10px] uppercase font-bold tracking-widest transition-colors border border-green-100">
                                  <span>WhatsApp</span> <ExternalLink size={10}/>
                               </a>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-30 italic">
                <MessageSquareText size={32} className="mb-2" />
                <span>Nenhum orçamento recebido.</span>
             </div>
          )}
        </div>

        {/* Localização e Visitas */}
        <div className="space-y-8">
           {/* Top Locations Card */}
           <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                 <h3 className="text-xl font-serif text-primary-900">Origem do Tráfego</h3>
                 <MapPin className="text-primary-400" size={18} />
              </div>
              <div className="space-y-5">
                 {stats.locations && stats.locations.length > 0 ? stats.locations.map((loc, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                       <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-400 border border-gray-100 flex items-center justify-center text-[10px] font-bold transition-colors group-hover:bg-primary-900 group-hover:text-white">{idx + 1}</div>
                          <div>
                             <p className="text-sm font-medium text-gray-800">{loc.city}</p>
                             <p className="text-[10px] text-gray-400 uppercase tracking-widest font-light">{loc.region}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <span className="text-sm font-serif text-primary-900 block leading-tight">{loc._count.id}</span>
                          <span className="text-[9px] text-gray-400 uppercase tracking-tighter italic">Acessos</span>
                       </div>
                    </div>
                 )) : (
                    <div className="text-center py-10 opacity-20 italic">Aguardando dados...</div>
                 )}
              </div>
           </div>

           {/* Quick Actions Card */}
           <div className="bg-primary-900 p-8 rounded-lg shadow-lg text-white">
              <h3 className="text-xl font-serif mb-6 border-b border-primary-700 pb-4">Atalhos do Administrador</h3>
              <div className="grid grid-cols-1 gap-3">
                 <Link to="/admin/portfolio" className="bg-primary-800 hover:bg-white hover:text-primary-900 px-4 py-3 rounded-sm transition-all text-xs font-bold uppercase tracking-widest text-center border border-primary-700">
                    Novo Portfólio
                 </Link>
                 <Link to="/admin/depoimentos" className="hover:bg-primary-800 px-4 py-3 rounded-sm transition-all text-xs font-bold uppercase tracking-widest text-center border border-primary-700">
                    Novo Depoimento
                 </Link>
                 <Link to="/admin/sections" className="hover:bg-primary-800 px-4 py-3 rounded-sm transition-all text-xs font-bold uppercase tracking-widest text-center border border-primary-700">
                    Editar Home Page
                 </Link>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
