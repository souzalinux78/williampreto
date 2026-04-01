import React from 'react';
import Section from '../components/Section';

const NotFound = () => {
  return (
    <div className="pt-24 min-h-[80vh] flex flex-col items-center justify-center text-center">
      <Section title="404" subtitle="Página não encontrada" bgLight={true}>
        <p className="text-primary-600 font-light mb-8 max-w-lg mx-auto">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a href="/" className="btn-outline">Voltar ao Início</a>
      </Section>
    </div>
  );
};

export default NotFound;
