import React, { useState } from 'react';
import Section from '../components/Section';

const AdminPlaceholder = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Área Admin em construção para a Fase 2.');
  };

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center bg-primary-100">
      <Section className="w-full max-w-md mx-auto" bgLight={false}>
        <div className="bg-white p-8 md:p-12 shadow-lg rounded-sm text-center">
          <h2 className="text-3xl font-serif text-primary-900 mb-2">Painel de Acesso</h2>
          <p className="text-primary-600 font-light text-sm mb-8 uppercase tracking-widest">
            Uso Exclusivo
          </p>
          
          <form onSubmit={handleLogin} className="space-y-6 text-left">
            <div>
              <label className="block text-primary-800 text-sm mb-2 font-medium">E-mail</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-primary-300 p-3 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="admin@williampreto.com"
                required
              />
            </div>
            <div>
              <label className="block text-primary-800 text-sm mb-2 font-medium">Senha</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-primary-300 p-3 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary py-4 mt-4">
              Entrar
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default AdminPlaceholder;
