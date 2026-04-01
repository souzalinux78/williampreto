const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/home-data', async (req, res) => {
  try {
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

    res.json({
      siteSettings,
      heroSection,
      services,
      awards,
      portfolioCategories,
      portfolioItems,
      testimonials,
      faqs
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados da página inicial' });
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
