import React from 'react';
import GenericCrud from '../../components/admin/GenericCrud';

const Servicos = () => {
  const fields = [
    { name: 'title', label: 'Nome do Serviço', required: true },
    { name: 'description', label: 'Descrição Curta', type: 'textarea', required: true },
    { name: 'imageUrl', label: 'Imagem de Fundo', type: 'image' },
    { name: 'active', label: 'Status', type: 'boolean' }
  ];

  return <GenericCrud title="Serviços" endpoint="services" fields={fields} />;
};

export default Servicos;
