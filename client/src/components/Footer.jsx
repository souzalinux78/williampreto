import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/public/home-data`)
      .then(r => r.json())
      .then(data => setSettings(data.siteSettings))
      .catch(() => {});
  }, []);

  const whatsappRaw = settings?.whatsapp?.replace(/\D/g, '') || '5511997931526';
  const instagram = settings?.instagram || 'williampreto_fotografo';

  return (
    <footer className="bg-primary-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-primary-700 pb-16">
        <div className="space-y-6">
          <Link to="/" className="text-3xl font-serif font-bold tracking-widest block uppercase text-primary-200">
            {settings?.photographerName || 'William Preto'}
          </Link>
          <p className="text-primary-100 font-light leading-relaxed">
            Fotógrafo de família premiado internacionalmente. Registrando histórias reais com sensibilidade e elegância atemporal.
          </p>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-serif tracking-widest uppercase">Especialidades</h4>
          <ul className="space-y-3 font-light text-primary-200">
            <li>Ensaios de Gestante</li>
            <li>Casamento Civil</li>
            <li>Aniversários Infantis</li>
            <li>Retratos de Família</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-serif tracking-widest uppercase">Menu</h4>
          <ul className="space-y-3 font-light text-primary-200">
            <li><Link to="/" className="hover:text-white transition-colors">Início</Link></li>
            <li><Link to="/portfolio" className="hover:text-white transition-colors">Portfólio</Link></li>
            <li><Link to="/sobre" className="hover:text-white transition-colors">Sobre Nós</Link></li>
            <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors text-xs text-primary-600">Admin Area</Link></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xl font-serif tracking-widest uppercase">Contato</h4>
          <div className="space-y-4 font-light text-primary-200">
            <a href={`https://wa.me/55${whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-white transition-colors">
              <Phone size={18} />
              <span>{settings?.whatsapp || '(11) 99793-1526'}</span>
            </a>
            <div className="flex items-center space-x-3">
              <Mail size={18} />
              <span>{settings?.email || 'contato@williampreto.com'}</span>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="mt-1" />
              <span>{settings?.cityRegion || 'Bragança Paulista - SP'}<br />e Região</span>
            </div>
            <div className="flex space-x-4 pt-4">
              <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-2 text-primary-200 hover:text-white transition-all bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
                <InstagramIcon size={20} />
                <span className="text-xs uppercase font-bold tracking-widest">@{instagram}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 pt-8 text-center text-sm font-light text-primary-400">
        <p>&copy; {new Date().getFullYear()} {settings?.photographerName || 'William Preto'} Fotografia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
