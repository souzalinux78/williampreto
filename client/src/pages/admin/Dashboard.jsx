import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Users, Camera, Star, MessageSquareText, Calendar, ExternalLink } from 'lucide-react';
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

  if (loading) return <div>Carregando dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif text-primary-900">Olá, {admin?.name || 'Administrador'}!</h2>
          <p className="text-gray-500 mt-1">Bem-vindo(a) ao painel de controle do William Preto Fotografia.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
             <Camera size={24} />
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Fotos</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.portfolioCount || 0}</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
           <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
             <Star size={24} />
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Depoimentos</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.testimonialsCount || 0}</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
           <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-500">
             <MessageSquareText size={24} />
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Orçamentos</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.leadsCount || 0}</h3>
           </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-4">
           <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
             <Users size={24} />
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-widest font-medium">Serviços</p>
             <h3 className="text-2xl font-serif text-gray-800">{stats.servicesCount || 0}</h3>
           </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 mt-8">
        
        {/* Leads Table */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-xl font-serif text-primary-900 mb-6 border-b pb-4">Últimos Orçamentos Recebidos</h3>
          {stats.recentLeads && stats.recentLeads.length > 0 ? (
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                         <th className="p-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">Cliente</th>
                         <th className="p-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">Assunto</th>
                         <th className="p-4 font-semibold text-gray-700 text-xs uppercase tracking-wider">Mês/Data do Evento</th>
                         <th className="p-4 font-semibold text-gray-700 text-xs uppercase tracking-wider text-right">Ação / Resposta</th>
                      </tr>
                   </thead>
                   <tbody>
                      {stats.recentLeads.map((lead) => (
                         <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 text-sm text-gray-900 font-medium whitespace-nowrap">
                               {lead.name}
                               <div className="text-xs text-gray-400 font-light mt-1">{lead.email || '-'}</div>
                            </td>
                            <td className="p-4 text-sm text-gray-700">{lead.type || 'Geral'}</td>
                            <td className="p-4 text-sm text-gray-700">
                               <div className="flex items-center space-x-2"><Calendar className="text-primary-400" size={14}/><span>{lead.date || 'Não Informado'}</span></div>
                            </td>
                            <td className="p-4 text-sm text-right align-middle">
                               <a href={`https://wa.me/55${lead.phone?.replace(/\D/g, '')}?text=Olá ${lead.name.split(' ')[0]}! Aqui é da equipe do William Preto. Recebemos seu pedido de orçamento pelo nosso site!`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-end space-x-1 bg-green-50 text-green-700 hover:bg-green-100 px-3 py-2 rounded-full text-xs transition-colors font-medium border border-green-200">
                                  <span>Chamar no WhatsApp</span> <ExternalLink size={12}/>
                               </a>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          ) : (
             <div className="text-center py-10 text-gray-400 font-light">
                <MessageSquareText size={48} className="mx-auto mb-4 text-gray-200" />
                Nenhum pedido de orçamento ainda.<br/> Continue divulgando o site!
             </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="w-full xl:w-80 bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-fit">
           <h3 className="text-xl font-serif text-primary-900 mb-6 border-b pb-4">Ações Rápidas</h3>
           <div className="flex flex-col gap-3">
              <Link to="/admin/portfolio" className="bg-primary-50 text-primary-800 px-6 py-4 border border-primary-100 rounded-sm hover:bg-primary-900 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase text-center">
                 Adicionar ao Portfólio
              </Link>
              <Link to="/admin/depoimentos" className="px-6 py-4 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition-colors text-sm font-medium tracking-wide uppercase text-center">
                 Inserir Depoimento
              </Link>
              <Link to="/admin/configuracoes" className="px-6 py-4 border border-gray-200 text-gray-600 rounded-sm hover:bg-gray-50 transition-colors text-sm font-medium tracking-wide uppercase text-center mt-4 bg-gray-50/50">
                 Configurações de SEO
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
