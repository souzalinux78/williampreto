import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Settings, Camera, MapPin, MessageSquare, Award, HelpCircle, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { isAuthenticated, logout, admin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20}/>, label: 'Dashboard' },
    { path: '/admin/sections', icon: <LayoutDashboard size={20}/>, label: 'Editor Landing Page' },
    { path: '/admin/why-choose', icon: <HelpCircle size={20}/>, label: 'Vantagens (Por que eu?)' },
    { path: '/admin/configuracoes', icon: <Settings size={20}/>, label: 'Configurações (SEO)' },
    { path: '/admin/servicos', icon: <Camera size={20}/>, label: 'Serviços' },
    { path: '/admin/premios', icon: <Award size={20}/>, label: 'Prêmios' },
    { path: '/admin/portfolio', icon: <MapPin size={20}/>, label: 'Portfólio' },
    { path: '/admin/portfolio-categorias', icon: <Settings size={20}/>, label: 'Categorias' },
    { path: '/admin/depoimentos', icon: <MessageSquare size={20}/>, label: 'Depoimentos' },
    { path: '/admin/faqs', icon: <HelpCircle size={20}/>, label: 'FAQs' },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-primary-900 text-white flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-primary-800">
          <h2 className="text-xl font-serif tracking-widest uppercase">Admin Panel</h2>
          <p className="text-xs text-primary-300 mt-1">William Preto</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${location.pathname.startsWith(item.path) ? 'bg-primary-800 text-white' : 'text-primary-200 hover:bg-primary-800/50 hover:text-white'}`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-primary-800">
          <div className="flex items-center space-x-3 mb-4 px-4 text-primary-200">
            <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center text-sm font-bold uppercase">
              {admin?.name?.charAt(0) || 'A'}
            </div>
            <span className="text-sm truncate">{admin?.name}</span>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 bg-red-900/40 hover:bg-red-900/80 text-white px-4 py-2 rounded-md transition-colors text-sm"
          >
            <LogOut size={16} /> <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
         <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-800">
               {menuItems.find(i => location.pathname.startsWith(i.path))?.label || 'Painel Admin'}
            </h1>
            <a href="/" target="_blank" className="text-sm text-primary-600 hover:text-primary-800 underline">Acessar Site Público</a>
         </header>
         <div className="p-8 flex-1 overflow-x-hidden">
            <Outlet />
         </div>
      </main>
    </div>
  );
};

export default AdminLayout;
