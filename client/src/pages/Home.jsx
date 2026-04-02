import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import ServicesSection from '../components/home/ServicesSection';
import AwardsSection from '../components/home/AwardsSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import PortfolioSection from '../components/home/PortfolioSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import LocationSection from '../components/home/LocationSection';
import CtaSection from '../components/home/CtaSection';
import Loading from '../components/Loading';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/public/home-data`)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(e => {
        console.error('Erro carregando homepage data:', e);
        setLoading(false);
      });
  }, []);

  if (loading || !data) {
    return <Loading />;
  }

  const { siteSettings, heroSection, services, awards, portfolioItems, testimonials, faqs } = data;

  if (!siteSettings) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
         <h1 className="text-2xl font-serif text-red-800 mb-4">A página inicial não pôde ser carregada</h1>
         <p className="text-gray-600 mb-8 max-w-lg">Isso geralmente acontece após uma atualização que exige sincronização com o banco de dados. Por favor, execute as migrações necessárias.</p>
         <code className="bg-gray-100 p-4 rounded text-xs text-left mb-8 block overflow-auto max-w-full">
            ERRO: {data.details || 'Falha na resposta do servidor'}
         </code>
         <button onClick={() => window.location.reload()} className="bg-primary-600 text-white px-8 py-3 rounded-full hover:bg-black transition-colors font-bold uppercase tracking-widest text-xs">Tentar novamente</button>
      </div>
    );
  }

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": siteSettings.photographerName,
    "image": heroSection.imageUrl,
    "description": siteSettings.seoDescription,
    "telephone": siteSettings.whatsapp,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteSettings.cityRegion.split('-')[0].trim(),
      "addressRegion": "SP",
      "addressCountry": "BR"
    },
    "priceRange": "$$",
    "sameAs": [
      `https://www.instagram.com/${siteSettings.instagram}` 
    ]
  };

  return (
    <>
      <Helmet>
        <title>{siteSettings.seoTitle}</title>
        <meta name="description" content={siteSettings.seoDescription} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.williampreto.com.br/" />
        <meta property="og:title" content={siteSettings.seoTitle} />
        <meta property="og:description" content={siteSettings.seoDescription} />
        <meta property="og:image" content={heroSection.imageUrl} />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>
      </Helmet>
      
      <div className="min-h-screen">
        <HeroSection data={heroSection} settings={siteSettings} />
        <AboutSection data={siteSettings} heroImage={heroSection.imageUrl} />
        <ServicesSection data={services} whatsapp={siteSettings.whatsapp} />
        <AwardsSection data={awards} />
        <WhyChooseSection />
        <PortfolioSection data={portfolioItems} />
        <TestimonialsSection data={testimonials} />
        <LocationSection city={siteSettings.cityRegion} />
        <CtaSection texts={siteSettings} />
      </div>
    </>
  );
};

export default Home;
