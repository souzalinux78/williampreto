const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Limpando dados antigos...');
  await prisma.portfolioItem.deleteMany({});
  await prisma.portfolioCategory.deleteMany({});
  await prisma.faq.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.award.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.heroSection.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.admin.deleteMany({});

  console.log('Criando admin inicial...');
  const adminPassword = await bcrypt.hash('Admin@123456', 10);
  await prisma.admin.create({
    data: {
      name: 'Admin Panel',
      email: 'admin@williampreto.com',
      password: adminPassword,
    },
  });

  console.log('Criando configurações do site...');
  await prisma.siteSetting.create({
    data: {
      photographerName: 'William Preto',
      whatsapp: '11 99793-1526',
      instagram: 'williampreto_fotografo',
      cityRegion: 'Bragança Paulista - SP e Região',
      institutionalText: 'A maternidade traz consigo a força e a beleza de uma transformação singular. Acreditamos que a fotografia não é apenas sobre o registro de onde você esteve, mas de quem você se tornou.\n\nNossa direção de arte baseia-se na sofisticação e no olhar atencioso. Capturamos não só a silhueta formosa da gestação, mas as conexões verdadeiras que darão base para o início de uma nova família orgulhosa do próprio legado.',
      ctaText: 'Falar com William Preto',
      seoTitle: 'William Preto Fotógrafo | Especialista em Gestantes e Família | Bragança Paulista - SP',
      seoDescription: 'Fotógrafo premiado internacionalmente especializado em gestantes, família e casamentos. Ensaios emocionantes e atemporais em Bragança Paulista e região.',
    },
  });

  console.log('Criando Hero Section...');
  await prisma.heroSection.create({
    data: {
      title: 'A beleza da sua espera, eternizada.',
      subtitle: 'Fotografia de gestante e família com sensibilidade artística, delicadeza e direção que transforma seu momento em uma obra atemporal.',
      badgeText: 'Premiado Internacionalmente 2020–2025',
      imageUrl: '/maternity.png',
    },
  });

  console.log('Criando Serviços...');
  await prisma.service.createMany({
    data: [
      { title: 'Gestante', description: 'A espera do mais lindo amor com fotos suaves.', imageUrl: '/maternity.png' },
      { title: 'Casamento Civil', description: 'Sua assinatura oficial e emoção registrados.', imageUrl: '/wedding.png' },
      { title: 'Casal & Pré-Wedding', description: 'Ensaios focados na história e conexão de vocês.', imageUrl: '/hero.png' },
      { title: 'Aniversário Infantil', description: 'Fotografia documental para o dia da festa.', imageUrl: '/family.png' },
      { title: 'Família', description: 'Retratos ensolarados para guardar o legado.', imageUrl: '/family.png' },
    ],
  });

  console.log('Criando Prêmios...');
  await prisma.award.createMany({
    data: [
      { name: 'Outstanding Awards', year: 2020 },
      { name: 'Outstanding Awards', year: 2021 },
      { name: 'Outstanding Awards', year: 2022 },
      { name: 'Outstanding Awards', year: 2023 },
      { name: 'Outstanding Awards', year: 2024 },
      { name: 'Outstanding Awards', year: 2025 },
    ],
  });

  console.log('Criando Categorias de Portfólio...');
  const catMaternity = await prisma.portfolioCategory.create({ data: { name: 'Gestante' } });
  const catWedding = await prisma.portfolioCategory.create({ data: { name: 'Casamento' } });
  const catFamily = await prisma.portfolioCategory.create({ data: { name: 'Família' } });

  console.log('Criando Itens de Portfólio...');
  await prisma.portfolioItem.createMany({
    data: [
      { title: 'Gestante', imageUrl: '/maternity.png', categoryId: catMaternity.id },
      { title: 'Casamento', imageUrl: '/wedding.png', categoryId: catWedding.id },
      { title: 'Família', imageUrl: '/family.png', categoryId: catFamily.id },
      { title: 'Ensaio', imageUrl: '/hero.png', categoryId: catMaternity.id },
    ],
  });

  console.log('Criando Depoimentos...');
  await prisma.testimonial.createMany({
    data: [
      { name: 'Mariana Silva', type: 'Gestante', text: 'O William tem um dom raro. Não apenas de fotografar, mas de enxergar a alma. Chorei ao ver o resultado do nosso ensaio de gestante.' },
      { name: 'Juliana e Carlos', type: 'Casamento Civil', text: 'Sensibilidade pura! O cuidado dele no nosso civil e a direção deixaram tudo tão leve que o resultado parece cena de filme.' },
      { name: 'Fernanda Lopes', type: 'Família', text: 'Ele já é o fotógrafo oficial da nossa família. Registrou minha espera e agora o 1º aninho do Leo. Trabalho sensacional!' },
    ],
  });

  console.log('Criando FAQs placeholder...');
  await prisma.faq.create({
    data: { question: 'Onde ocorrem os ensaios?', answer: 'Atendemos em nosso estúdio climatizado ou em locações externas pré-selecionadas na região de Bragança Paulista.' }
  });

  console.log('✅ Seed completo com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
