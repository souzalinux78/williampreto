import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }

      login(data.admin, data.token);
      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-100 flex items-center justify-center font-sans px-6">
      <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-primary-600"></div>
        <div className="flex flex-col items-center justify-center mb-8">
           <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 mb-4 shadow-inner">
              <Lock size={32} />
           </div>
           <h1 className="text-2xl font-serif text-primary-900 font-bold tracking-widest uppercase">Admin Panel</h1>
           <p className="text-gray-500 text-sm mt-2">Área restrita e segura</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center mb-6 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">E-mail</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="admin@williampreto.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
              placeholder="••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Entrando...' : 'Entrar no Sistema'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
           <a href="/" className="text-sm text-primary-500 hover:text-primary-700 underline">Voltar para o site</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
