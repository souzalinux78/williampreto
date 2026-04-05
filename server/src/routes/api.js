const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/home-data', async (req, res) => {
  try {
    // ---- Tracking do Acesso ----
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referer = req.headers['referer'];
    
    // Processamento de localização assíncrono (não trava a resposta ao cliente)
    (async () => {
       try {
          let location = {};
          // Se for IP local ou privado, ignora lookup
          if (ip && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.')) {
             const resp = await fetch(`http://ip-api.com/json/${ip.replace('::ffff:', '')}`);
             location = await resp.json();
          }
          
          await prisma.visitLog.create({
             data: {
                ip: ip || 'unknown',
                userAgent,
                referer,
                city: location.city || 'Desconhecido',
                region: location.regionName || 'Desconhecido',
                country: location.country || 'Desconhecido',
                lat: location.lat || null,
                lon: location.lon || null,
                path: '/'
             }
          });
       } catch (e) {
          console.error('Erro ao logar visita:', e.message);
       }
    })();
    // ----------------------------

    const siteSettings = await prisma.siteSetting.findFirst() || {};
    const heroSection = await prisma.heroSection.findFirst() || {};
    const services = await prisma.service.findMany({ where: { active: true }, orderBy: { id: 'asc' } });
    const awards = await prisma.award.findMany({ where: { active: true }, orderBy: { year: 'desc' } });
    const portfolioCategories = await prisma.portfolioCategory.findMany({ where: { active: true } });
    const portfolioItems = await prisma.portfolioItem.findMany({ 
      where: { active: true, category: { active: true } },
      include: { category: true }
    });
    const testimonials = await prisma.testimonial.findMany({ where: { active: true } });
    const faqs = await prisma.faq.findMany({ where: { active: true } });
    const landingPageSections = await prisma.landingPageSection.findFirst() || {};
    const whyChooseItems = await prisma.whyChooseItem.findMany({ where: { active: true }, orderBy: { order: 'asc' } });

    res.json({
      siteSettings,
      heroSection,
      services,
      awards,
      portfolioCategories,
      portfolioItems,
      testimonials,
      faqs,
      landingPageSections,
      whyChooseItems
    });
  } catch (error) {
    console.error('ERRO CRÍTICO NO BACKEND:', error);
    res.status(500).json({ error: 'Erro ao buscar dados da página inicial', details: error.message });
  }
});

// Registrar um contato (Lead)
router.post('/lead', async (req, res) => {
  try {
    const { name, email, phone, type, date, message, source } = req.body;
    await prisma.leadLog.create({
      data: { name, email, phone, type, date, message, source: source || 'Website Contact Form' }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar contato' });
  }
});

module.exports = router;
