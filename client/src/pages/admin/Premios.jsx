import React from 'react';
import GenericCrud from '../../components/admin/GenericCrud';

const Premios = () => {
  const fields = [
    { name: 'name', label: 'Nome do Prêmio', required: true },
    { name: 'year', label: 'Ano de Premiação', type: 'number', required: true },
    { name: 'active', label: 'Status', type: 'boolean' }
  ];

  return <GenericCrud title="Prêmios Outstanding" endpoint="awards" fields={fields} />;
};

export default Premios;
