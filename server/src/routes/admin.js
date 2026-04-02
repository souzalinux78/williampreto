const express = require('express');
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/uploadMiddleware');

const prisma = new PrismaClient();
const router = express.Router();

// ---- Dashboard Stats ----
router.get('/stats', async (req, res) => {
  try {
    const servicesCount = await prisma.service.count();
    const portfolioCount = await prisma.portfolioItem.count();
    const testimonialsCount = await prisma.testimonial.count();
    const leadsCount = await prisma.leadLog.count();
    
    const recentLeads = await prisma.leadLog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    // Gets last updated record from site settings as a proxy for "last updated"
    const lastUpdate = await prisma.siteSetting.findFirst({
      orderBy: { updatedAt: 'desc' },
      select: { updatedAt: true }
    });

    res.json({
      servicesCount,
      portfolioCount,
      testimonialsCount,
      leadsCount,
      recentLeads,
      lastUpdate: lastUpdate ? lastUpdate.updatedAt : null
    });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// ---- Upload genérico (Retorna URL para ser salva nos cruds) ----
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Nenhuma imagem enviada' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// ---- Helper genérico para CRUD ----
const createCrudRoutes = (entityName, modelName) => {
  const model = prisma[modelName];
  
  // Listar todos
  router.get(`/${entityName}`, async (req, res) => {
    try { const items = await model.findMany(); res.json(items); }
    catch (e) { res.status(500).json({ error: `Erro ao listar ${entityName}` }); }
  });

  // Obter um
  router.get(`/${entityName}/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
      const item = await model.findUnique({ where: { id } });
      res.json(item);
    } catch (e) { res.status(500).json({ error: `Erro ao buscar ${entityName}` }); }
  });

  // Criar
  router.post(`/${entityName}`, async (req, res) => {
    try {
      const { id, createdAt, updatedAt, ...data } = req.body;
      
      // Auto-parse numeric IDs in body (ex: categoryId)
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
  router.put(`/${entityName}/:id`, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

      const { id: _, createdAt, updatedAt, ...data } = req.body;
      
      // Auto-parse numeric IDs in body (ex: categoryId)
      Object.keys(data).forEach(key => {
        if (key.endsWith('Id') && typeof data[key] === 'string' && data[key] !== '') {
          data[key] = parseInt(data[key], 10);
        }
      });

      const item = await model.update({
        where: { id },
        data
      });
      res.json(item);
    } catch (e) { 
      res.status(500).json({ error: `Erro ao atualizar ${entityName}`, details: e.message }); 
    }
  });

  // Deletar
  router.delete(`/${entityName}/:id`, async (req, res) => {
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

// Portfólio requer 'include' das categorias no List
router.get('/portfolio-items', async (req, res) => {
  try {
    const items = await prisma.portfolioItem.findMany({ include: { category: true } });
    res.json(items);
  } catch (e) { res.status(500).json({ error: 'Erro' }); }
});
createCrudRoutes('portfolio-items', 'portfolioItem');

// ---- Configurações de Singleton (Sempre ID 1 ou FindFirst) ----
router.get('/site-settings', async (req, res) => {
  try { const item = await prisma.siteSetting.findFirst(); res.json(item || {}); }
  catch (e) { res.status(500).json({ error: 'Erro' }); }
});
router.put('/site-settings', async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    let item = await prisma.siteSetting.findFirst();
    if (item) item = await prisma.siteSetting.update({ where: { id: item.id }, data });
    else item = await prisma.siteSetting.create({ data });
    res.json(item);
  } catch (e) { res.status(500).json({ error: 'Erro', details: e.message }); }
});

router.get('/hero', async (req, res) => {
  try { const item = await prisma.heroSection.findFirst(); res.json(item || {}); }
  catch (e) { res.status(500).json({ error: 'Erro' }); }
});
router.put('/hero', async (req, res) => {
  try {
    const { id, createdAt, updatedAt, ...data } = req.body;
    let item = await prisma.heroSection.findFirst();
    if (item) item = await prisma.heroSection.update({ where: { id: item.id }, data });
    else item = await prisma.heroSection.create({ data });
    res.json(item);
  } catch (e) { res.status(500).json({ error: 'Erro', details: e.message }); }
});

module.exports = router;
