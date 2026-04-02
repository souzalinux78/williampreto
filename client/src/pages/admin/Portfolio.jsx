import React, { useState, useEffect } from 'react';
import GenericCrud from '../../components/admin/GenericCrud';
import { useAuth } from '../../context/AuthContext';

const Portfolio = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useAuth();
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/portfolio-categories`, { headers: { 'Authorization': `Bearer ${token}` }})
      .then(res => res.json())
      .then(data => {
        setCategories(data.map(cat => ({ value: cat.id, label: cat.name })));
      });
  }, [token]);

  const fields = [
    { name: 'title', label: 'Nome da Imagem', required: true },
    { name: 'categoryId', label: 'Categoria', type: 'select', options: categories, required: true, isNumber: true },
    { name: 'imageUrl', label: 'Imagem de Portfólio', type: 'image', required: true },
    { name: 'active', label: 'Status', type: 'boolean' }
  ];

  return (
    <div className="space-y-12">
      {categories.length > 0 ? (
        <GenericCrud title="Imagens do Portfólio" endpoint="portfolio-items" fields={fields} />
      ) : (
        <div className="text-center p-12 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
           <p className="text-gray-500 mb-4">Você precisa criar categorias antes de gerenciar imagens.</p>
           <button onClick={() => window.location.href='/admin/portfolio-categorias'} className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">Ir para Categorias</button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
