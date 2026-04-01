# William Preto Fotógrafo - Landing Page (Fase 1)

Projeto profissional de landing page focado na especialidade de Fotografia de Família (Gestantes, Civil, Ensaio Infantil, etc). Criado com foco absoluto em performance, visual premium e SEO.

## Arquitetura do Monorepo

- `/client` - Frontend React + Vite + TailwindCSS
- `/server` - Backend Node.js + Express + Prisma (MySQL)
- `/docs` - Documentação futura (Fase 2)
- `/scripts` - Scripts úteis (Fase 2)

## Requisitos

- Node.js (v18+)
- MySQL
- npm ou yarn

---

## 🚀 Como Executar o Backend (Server)

1. Navegue até a pasta `/server`:
   \`\`\`bash
   cd server
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Configure o Banco de Dados:
   - Duplique o arquivo `.env.example` e renomeie para `.env`
   - Certifique-se de que a string de conexão no `.env` está condizente com o seu banco local.
   *(Por padrão: `DATABASE_URL="mysql://root:FLoc25GD!@localhost:3306/williampreto_lp"`)*

4. Execute as Migrations do Prisma para construir o banco:
   \`\`\`bash
   npm run prisma:migrate
   \`\`\`
   *(Ele irá perguntar o nome da migration, pode colocar "init")*

5. Popule o Banco de Dados com os dados iniciais do Fotógrafo (Seed):
   \`\`\`bash
   npm run prisma:seed
   \`\`\`

6. Inicie a API (Desenvolvimento):
   \`\`\`bash
   npm run dev
   \`\`\`
   A API estará rodando em \`http://localhost:3000\`. Você pode testar se a API está online acessando: \`http://localhost:3000/api/health\`.

---

## 🎨 Como Executar o Frontend (Client)

1. Em um NOVO terminal, navegue até a pasta `/client`:
   \`\`\`bash
   cd client
   \`\`\`

2. Instale as dependências:
   \`\`\`bash
   npm install
   \`\`\`

3. Crie o arquivo de ambiente:
   - Duplique o arquivo `.env.example` e renomeie para `.env`

4. Inicie o Servidor Vite:
   \`\`\`bash
   npm run dev
   \`\`\`
   O seu portal abrirá no navegador de forma automática (\`http://localhost:5173\` por padrão).
