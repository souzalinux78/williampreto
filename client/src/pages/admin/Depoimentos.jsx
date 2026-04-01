import React from 'react';
import GenericCrud from '../../components/admin/GenericCrud';

const Depoimentos = () => {
  const fields = [
    { name: 'name', label: 'Nome do Cliente', required: true },
    { name: 'type', label: 'Tipo de Ensaio (Ex: Casamento)', required: true },
    { name: 'text', label: 'Depoimento', type: 'textarea', required: true },
    { name: 'active', label: 'Visível no site', type: 'boolean' }
  ];

  return <GenericCrud title="Depoimentos" endpoint="testimonials" fields={fields} />;
};

export default Depoimentos;
