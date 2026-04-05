import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Settings, Camera, MapPin, MessageSquare, Award, HelpCircle, LogOut, Image as ImageIcon, List } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, logout, admin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { type: 'header', label: 'Dashboard & Geral' },
    { path: '/admin/dashboard', icon: <LayoutDashboard size={18}/>, label: 'Estatísticas de Visitas' },
    { path: '/admin/configuracoes', icon: <Settings size={18}/>, label: 'Configurações e Instagram' },
    
    { type: 'header', label: 'Design do Site (Fotos e Títulos)' },
    { path: '/admin/sections', icon: <ImageIcon size={18}/>, label: 'Editor Visual Landing Page' },
    
    { type: 'header', label: 'Conteúdo Dinâmico (Listas)' },
    { path: '/admin/servicos', icon: <Camera size={18}/>, label: 'Gestão de Serviços' },
    { path: '/admin/why-choose', icon: <List size={18}/>, label: 'Vantagens (01, 02, 03)' },
    { path: '/admin/portfolio', icon: <MapPin size={18}/>, label: 'Fotos do Portfólio' },
    { path: '/admin/portfolio-categorias', icon: <Settings size={18}/>, label: 'Categorias de Fotos' },
    { path: '/admin/premios', icon: <Award size={18}/>, label: 'Prêmios Internacionais' },
    { path: '/admin/depoimentos', icon: <MessageSquare size={18}/>, label: 'Depoimentos de Clientes' },
    { path: '/admin/faqs', icon: <HelpCircle size={18}/>, label: 'Dúvidas Frequentes' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-xl font-serif tracking-[0.2em] uppercase">Admin Master</h2>
          <p className="text-[10px] text-primary-300 mt-1 uppercase tracking-widest">William Preto Fotógrafo</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, idx) => (
            item.type === 'header' ? (
              <div key={idx} className="px-4 pt-6 pb-2 text-[10px] font-bold text-primary-400 uppercase tracking-widest">
                {item.label}
              </div>
            ) : (
              <Link 
                key={item.path} 
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-sm transition-all duration-300 ${location.pathname.startsWith(item.path) ? 'bg-white text-primary-900 border-l-4 border-primary-500 shadow-lg' : 'text-primary-100 hover:bg-white/5 hover:translate-x-1'}`}
              >
                <span className={location.pathname.startsWith(item.path) ? 'text-primary-600' : 'text-primary-300'}>{item.icon}</span>
                <span className="text-xs font-medium tracking-wide">{item.label}</span>
              </Link>
            )
          ))}
        </nav>
        <div className="p-6 border-t border-white/10 bg-primary-950/30">
          <div className="flex items-center space-x-3 mb-6 px-2">
            <div className="w-8 h-8 rounded-full bg-primary-800 flex items-center justify-center text-xs font-bold ring-2 ring-primary-700">
              {admin?.name?.charAt(0) || 'W'}
            </div>
            <div className="flex flex-col">
               <span className="text-xs font-bold truncate">{admin?.name}</span>
               <span className="text-[9px] text-primary-400 uppercase">Administrador</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 bg-red-900/20 hover:bg-red-800/60 text-red-100 px-4 py-3 rounded-sm transition-all text-xs uppercase tracking-widest font-bold border border-red-900/30"
          >
            <LogOut size={14} /> <span>Sair do Painel</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
         <header className="bg-white shadow-sm px-10 py-5 flex justify-between items-center border-b border-gray-100">
            <div className="flex items-center space-x-4">
               <div className="w-1 h-8 bg-primary-600"></div>
               <h1 className="text-base font-bold text-primary-900 uppercase tracking-[0.15em]">
                  {menuItems.find(i => location.pathname.startsWith(i.path))?.label || 'Painel de Controle'}
               </h1>
            </div>
            <div className="flex items-center space-x-6">
               <a href="/" target="_blank" className="text-[10px] font-bold text-primary-600 hover:text-primary-800 uppercase tracking-widest flex items-center space-x-2 border border-primary-100 px-4 py-2 rounded-full transition-all">
                 <span>Ver Site Público</span>
               </a>
            </div>
         </header>
         <div className="p-10 flex-1 overflow-x-hidden bg-gray-50/50">
            <Outlet />
         </div>
      </main>
    </div>
  );
};

export default AdminLayout;
