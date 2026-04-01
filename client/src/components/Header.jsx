import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Portfólio', path: '/portfolio' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-widest text-primary-900 uppercase">
          William Preto
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-widest uppercase hover:text-primary-500 transition-colors ${
                location.pathname === link.path ? 'text-primary-500 font-medium' : 'text-primary-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contato"
            className="btn-primary"
          >
            Agendar Sessão
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary-900 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 py-6 border-t border-primary-100' : 'max-h-0 py-0'
        }`}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm tracking-widest uppercase ${
                location.pathname === link.path ? 'text-primary-500 font-medium' : 'text-primary-800'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contato"
            className="btn-primary mt-4"
          >
            Agendar Sessão
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
