import React from 'react';
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-primary-800 pb-16">
          
          <div className="md:col-span-1 space-y-6">
            <h2 className="text-xl font-serif tracking-widest uppercase">William Preto</h2>
            <p className="text-primary-300 font-light text-sm leading-relaxed">
              Fotografia poética e atemporal. Eternizando o Amor e Legados que transcendem o tempo.
            </p>
            <div className="flex space-x-4 pt-2">
               {/* Instagram Logo / SVG - Fixed path to site settings if needed but kept original design */}
               <a href="https://www.instagram.com/williampreto_fotografo" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg mb-6">Navegação</h4>
            <ul className="space-y-4 text-primary-300 text-sm font-light">
              <li><a href="/" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="/portfolio" className="hover:text-white transition-colors">Portfólio</a></li>
              <li><a href="/sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="/contato" className="hover:text-white transition-colors">Agendar Sessão</a></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg mb-6">Especialidades</h4>
            <ul className="space-y-4 text-primary-300 text-sm font-light">
              <li>Gestante Fine Art</li>
              <li>Casamentos Intimistas</li>
              <li>Retratos de Família</li>
              <li>Estúdio e Externas</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-serif text-lg mb-6">Contato</h4>
            <div className="space-y-4 text-primary-300 text-sm font-light">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-primary-500 shrink-0" />
                <span>Bragança Paulista - SP e Região</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-primary-500 shrink-0" />
                <span>(11) 99793-1526</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-primary-500 shrink-0" />
                <span>contato@williampreto.com.br</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-primary-500 text-xs tracking-widest font-light uppercase">
            © 2026 William Preto Fotografia. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
