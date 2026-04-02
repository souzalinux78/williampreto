import React from 'react';
import GenericCrud from '../../components/admin/GenericCrud';

const Categorias = () => {
  const fields = [
    { name: 'name', label: 'Nome da Categoria', required: true },
    { name: 'active', label: 'Ativa', type: 'boolean' }
  ];

  return (
    <div className="space-y-6">
      <GenericCrud 
        title="Categorias do Portfólio" 
        endpoint="portfolio-categories" 
        fields={fields} 
      />
      <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-blue-800 text-sm">
        <strong>Dica:</strong> As categorias criadas aqui aparecerão como opções ao cadastrar ou editar imagens no menu "Portfólio".
      </div>
    </div>
  );
};

export default Categorias;
