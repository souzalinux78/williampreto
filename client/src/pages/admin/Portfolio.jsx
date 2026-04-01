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
    { name: 'categoryId', label: 'Categoria', type: 'select', options: categories, required: true },
    { name: 'imageUrl', label: 'Imagem de Portfólio', type: 'image', required: true },
    { name: 'active', label: 'Status', type: 'boolean' }
  ];

  return (
    <div className="space-y-12">
      {categories.length > 0 ? (
        <GenericCrud title="Imagens do Portfólio" endpoint="portfolio-items" fields={fields} />
      ) : (
        <div>Carregando portfólio...</div>
      )}
      
      <GenericCrud 
         title="Categorias (Ex: Casamento, Família)" 
         endpoint="portfolio-categories" 
         fields={[
           { name: 'name', label: 'Nome da Categoria', required: true },
           { name: 'active', label: 'Ativa', type: 'boolean' }
         ]} 
      />
    </div>
  );
};

export default Portfolio;
