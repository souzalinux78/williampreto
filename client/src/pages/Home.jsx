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
        setData(d || {});
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

  const { siteSettings, heroSection, services, awards, portfolioItems, testimonials } = data;

  return (
    <>
      <Helmet>
        <title>{siteSettings?.seoTitle || "William Preto Fotógrafo | Especialista em Gestantes e Família"}</title>
        <meta name="description" content={siteSettings?.seoDescription || "Fotógrafo premiado internacionalmente especializado em gestantes, família e casamentos."} />
      </Helmet>
      
      <div className="min-h-screen">
        <HeroSection data={heroSection || {}} settings={siteSettings || {}} />
        <AboutSection heroImage={heroSection?.imageUrl || "/hero.png"} />
        <ServicesSection data={services || []} whatsapp={siteSettings?.whatsapp || "11997931526"} />
        <AwardsSection data={awards || []} />
        <WhyChooseSection data={[]} />
        <PortfolioSection data={portfolioItems || []} />
        <TestimonialsSection data={testimonials || []} />
        <LocationSection city={siteSettings?.cityRegion || "Bragança Paulista"} />
        <CtaSection texts={siteSettings || {}} />
      </div>
    </>
  );
};

export default Home;
