const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mapeamento de caracteres corrompidos (Mojibake UTF-8 -> CP437/Latin1)
const replacementMap = {
  '├¡': 'í',
  '├º': 'ç',
  '├ã': 'Ã',
  '├ú': 'ã',
  '├¬': 'ê',
  '├│': 'ó',
  '├®': 'é',
  '├ó': 'â',
  '├á': 'à',
  '├Ä': 'Ä',
  '├ï': 'Ë',
  '├ì': 'Ì',
  '├Ò': 'Ò',
  '├Ú': 'Ú',
  '├ª': 'æ',
  '├┤': 'ô',
  '├┐': '¿',
  '├└': 'À',
  '├Á': 'Á',
  '├ê': 'È',
  '├ë': 'É',
  '├î': 'Î',
  '├╧': 'Ï',
  '├╨': 'Ð',
  '├╤': 'Ñ',
  '├╓': 'Ö',
  '├û': 'Ö',
  '├£': 'Ü',
  '├á': 'à',
  '├í': 'á'
};

async function fixTable(tableName, fields) {
  try {
    const items = await prisma[tableName].findMany();
    console.log(`🔍 Verificando ${items.length} registros na tabela ${tableName}...`);
    
    for (const item of items) {
      let hasChanges = false;
      const data = {};

      for (const field of fields) {
        if (item[field] && typeof item[field] === 'string') {
          let newValue = item[field];
          let fieldModified = false;

          for (const [corrupted, fixed] of Object.entries(replacementMap)) {
            if (newValue.includes(corrupted)) {
              newValue = newValue.split(corrupted).join(fixed);
              hasChanges = true;
              fieldModified = true;
            }
          }
          if (fieldModified) {
            data[field] = newValue;
          }
        }
      }

      if (hasChanges) {
        await prisma[tableName].update({
          where: { id: item.id },
          data: data
        });
        console.log(`   ✅ ID ${item.id} corrigido.`);
      }
    }
  } catch (err) {
    console.error(`   ❌ Erro na tabela ${tableName}:`, err.message);
  }
}

async function run() {
  console.log('👷 Iniciando correção de caracteres corrompidos no Banco de Dados...');
  
  // Lista de Tabelas e Campos a serem verificados
  await fixTable('service', ['title', 'description']);
  await fixTable('portfolioCategory', ['name']);
  await fixTable('portfolioItem', ['title']);
  await fixTable('siteSetting', ['cityRegion', 'institutionalText', 'seoTitle', 'seoDescription', 'ctaText']);
  await fixTable('heroSection', ['title', 'subtitle', 'badgeText']);
  await fixTable('testimonial', ['name', 'type', 'text']);
  await fixTable('faq', ['question', 'answer']);
  await fixTable('leadLog', ['name', 'message', 'type']);

  console.log('\n🎉 Processo de correção finalizado!');
  console.log('💡 Dica: Reinicie o backend com "pm2 restart williampreto-api" para garantir a limpeza do cache.');
}

run()
  .catch(e => {
    console.error('Erro fatal no script de correção:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
