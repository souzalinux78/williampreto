const express = require('express');
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/uploadMiddleware');
const authenticateToken = require('../middleware/authMiddleware'); // Importando o middleware correto

const prisma = new PrismaClient();
const router = express.Router();

// ---- Dashboard Stats ----
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    // Helper para execuções seguras (evita 500 se tabela não existir)
    const safeQuery = async (fn, fallback) => {
       try { return await fn(); } catch (e) { return fallback; }
    };

    const servicesCount = await safeQuery(() => prisma.service.count(), 0);
    const portfolioCount = await safeQuery(() => prisma.portfolioItem.count(), 0);
    const testimonialsCount = await safeQuery(() => prisma.testimonial.count(), 0);
    const leadsCount = await safeQuery(() => prisma.leadLog.count(), 0);
    
    // Visitas (Tabela nova, pode não existir se não migrou)
    const visitsCount = await safeQuery(() => prisma.visitLog.count(), 0);
    const thirtyDaysAgo = new Date(); thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeVisits = await safeQuery(() => prisma.visitLog.count({ where: { createdAt: { gte: thirtyDaysAgo } } }), 0);

    const recentLeads = await safeQuery(() => prisma.leadLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    }), []);

    // Melhores localizações
    const locations = await safeQuery(() => prisma.visitLog.groupBy({
       by: ['city', 'region'],
       _count: { id: true },
       orderBy: { _count: { id: 'desc' } },
       take: 10
    }), []);

    // Gets last updated record from site settings as a proxy for "last updated"
    const lastUpdate = await safeQuery(() => prisma.siteSetting.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true }
    }), null);

    res.json({
      servicesCount,
      portfolioCount,
      testimonialsCount,
      leadsCount,
      visitsCount,
      activeVisits,
      recentLeads,
      locations,
      lastUpdate: lastUpdate ? (lastUpdate.updatedAt || lastUpdate) : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro crítico ao buscar estatísticas', details: err.message });
  }
});

// ---- Upload genérico (Retorna URL para ser salva nos cruds) ----
router.post('/upload', authenticateToken, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem enviada' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// ---- Helper genérico para CRUD ----
const createCrudRoutes = (entityName, modelName) => {
  const model = prisma[modelName];
  
  // Listar todos com Auto-Seed para Vantagens e Serviços
  router.get(`/${entityName}`, authenticateToken, async (req, res) => {
    try { 
      let items = await model.findMany({ 
        orderBy: entityName === 'why-choose' ? { order: 'asc' } : { id: 'asc' } 
      }); 

      // AUTO-SEED se estiver vazio (apenas para Vantagens)
      if (items.length === 0 && entityName === 'why-choose') {
        await prisma.whyChooseItem.createMany({
          data: [
            { title: 'Direção Cuidadosa', description: 'Condução leve e descomplicada para você se sentir à vontade, mesmo sem experiência.', order: 1 },
            { title: 'Sensibilidade', description: 'Entendimento profundo do momento que você está vivenciando.', order: 2 },
            { title: 'Olhar Artístico', description: 'Fotografias que parecem pinturas, com um trabalho refinado de cores e luzes.', order: 3 },
          ]
        });
        items = await model.findMany({ orderBy: { order: 'asc' } });
      }

      res.json(items); 
    }
    catch (e) { res.status(500).json({ error: `Erro ao listar ${entityName}` }); }
  });

  // Obter um
  router.get(`/${entityName}/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const item = await model.findUnique({ where: { id } });
      res.json(item);
    } catch (e) { res.status(500).json({ error: `Erro ao buscar ${entityName}` }); }
  });

  // Criar
  router.post(`/${entityName}`, authenticateToken, async (req, res) => {
    try {
      const { id, createdAt, updatedAt, ...data } = req.body;
      Object.keys(data).forEach(key => {
        if (key.endsWith('Id') && typeof data[key] === 'string' && data[key] !== '') {
          data[key] = parseInt(data[key], 10);
        }
      });
      const item = await model.create({ data });
      res.json(item);
    } catch (e) { 
      res.status(500).json({ error: `Erro ao criar ${entityName}`, details: e.message }); 
    }
  });

  // Atualizar
  router.put(`/${entityName}/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const { id: _, createdAt, updatedAt, ...data } = req.body;
      Object.keys(data).forEach(key => {
        if (key.endsWith('Id') && typeof data[key] === 'string' && data[key] !== '') {
          data[key] = parseInt(data[key], 10);
        }
      });
      const item = await model.update({ where: { id }, data });
      res.json(item);
    } catch (e) { 
      res.status(500).json({ error: `Erro ao atualizar ${entityName}`, details: e.message }); 
    }
  });

  // Deletar
  router.delete(`/${entityName}/:id`, authenticateToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      await model.delete({ where: { id } });
      res.json({ success: true });
    } catch (e) { res.status(500).json({ error: `Erro ao deletar ${entityName}` }); }
  });
};

// Gerando endpoints de CRUDs completos
createCrudRoutes('services', 'service');
createCrudRoutes('awards', 'award');
createCrudRoutes('portfolio-categories', 'portfolioCategory');
createCrudRoutes('testimonials', 'testimonial');
createCrudRoutes('faqs', 'faq');
createCrudRoutes('why-choose', 'whyChooseItem');

// Portfólio requer 'include' das categorias no List
router.get('/portfolio-items', authenticateToken, async (req, res) => {
  try {
    const items = await prisma.portfolioItem.findMany({ include: { category: true } });
    res.json(items);
  } catch (e) { res.status(500).json({ error: 'Erro' }); }
});
createCrudRoutes('portfolio-items', 'portfolioItem');

// ---- Configurações de Singleton (Sempre ID 1 ou FindFirst) ----
router.get('/site-settings', authenticateToken, async (req, res) => {
  try { const item = await prisma.siteSetting.findFirst(); res.json(item || {}); }
  catch (e) { res.status(500).json({ error: 'Erro' }); }
});
router.put('/site-settings', authenticateToken, async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    let item = await prisma.siteSetting.findFirst();
    if (item) item = await prisma.siteSetting.update({ where: { id: item.id }, data });
    else item = await prisma.siteSetting.create({ data });
    res.json(item);
  } catch (e) { res.status(500).json({ error: 'Erro', details: e.message }); }
});

router.get('/hero', authenticateToken, async (req, res) => {
  try { const item = await prisma.heroSection.findFirst(); res.json(item || {}); }
  catch (e) { res.status(500).json({ error: 'Erro' }); }
});
router.put('/hero', authenticateToken, async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    let item = await prisma.heroSection.findFirst();
    if (item) item = await prisma.heroSection.update({ where: { id: item.id }, data });
    else item = await prisma.heroSection.create({ data });
    res.json(item);
  } catch (e) { res.status(500).json({ error: 'Erro', details: e.message }); }
});

router.get('/landing-page-sections', authenticateToken, async (req, res) => {
  try { 
    let item = await prisma.landingPageSection.findFirst(); 
    
    // Auto-seed if first time to match the landing page defaults
    if (!item) {
      item = await prisma.landingPageSection.create({
        data: {
          aboutTitle: 'Especialista em eternizar \nfases únicas.',
          aboutBadge: 'Especialista em Gestantes',
          aboutQuote: 'Delicadeza que transcende.',
          whyChooseTitle: 'Mais do que um ensaio, \numa experiência.',
          servicesTitle: 'Descubra a beleza em \ncada fase da sua vida.',
          portfolioTitle: 'Explore Nosso Universo\nAtemporal.',
          locationTitle: 'A natureza como \npano de fundo',
          locationSubtitle: 'Atendemos em Bragança Paulista e toda a região, oferecendo tanto um estúdio confortável e climatizado para bebês e gestantes, quanto as mais belas paisagens da região.'
        }
      });
    }
    
    res.json(item || {}); 
  }
  catch (e) { res.status(500).json({ error: 'Erro ao buscar seções' }); }
});
router.put('/landing-page-sections', authenticateToken, async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    let item = await prisma.landingPageSection.findFirst();
    if (item) item = await prisma.landingPageSection.update({ where: { id: item.id }, data });
    else item = await prisma.landingPageSection.create({ data });
    res.json(item);
  } catch (e) { res.status(500).json({ error: 'Erro', details: e.message }); }
});

module.exports = router;
