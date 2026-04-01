import React from 'react';
import GenericCrud from '../../components/admin/GenericCrud';

const Faqs = () => {
  const fields = [
    { name: 'question', label: 'Pergunta (Dúvida Frequente)', type: 'textarea', required: true },
    { name: 'answer', label: 'Resposta', type: 'textarea', required: true },
    { name: 'active', label: 'Visível', type: 'boolean' }
  ];

  return <GenericCrud title="Perguntas Frequentes" endpoint="faqs" fields={fields} />;
};

export default Faqs;
