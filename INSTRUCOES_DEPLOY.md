# Guia Definitivo de Deploy - Múltiplas Fases

Este guia reúne todos os passos vitais para configurar, testar e jogar o site e CMS do *William Preto Fotografia* nas nuvens.

---

## 🏗️ 1. Ambiente Local (Teste Final Antes do Deploy)
Certifique-se de que tudo está rodando adequadamente na sua máquina local antes de colocar num servidor definitivo:

**Servidor (API):**
1. O banco MySQL deve estar rodando na porta 3306.
2. Acesse a pasta `server`.
3. Verifique se o arquivo `.env` mapeia a `DATABASE_URL` certa.
4. Execute `npx prisma db push` para subir qualquer tabela recém criada à força (LeadLogs).
5. Certifique-se de preencher o banco pelo menos uma vez rodando `node prisma/seed.js`.

**Cliente (Frontend):**
1. Acesse a pasta `client`.
2. Verifique se o arquivo `.env` mapeia `VITE_API_URL` para "http://localhost:3000/api".
3. Rode `npm run build` na sua máquina local só para garantir que nada "quebra" as dependências em uma verificação de tipos ou minificação. Se gerar a pasta `dist` corretamente, o código está pronto!

---

## 🚀 2. Subindo na VPS (Hostinger, AWS, DigitalOcean ou similar)

### Requisitos no Servidor Ubuntu:
- Node.js (v18+)
- MySQL Server ou Banco de Dados Cloud Externo
- Nginx (para redirecionar tráfego)
- PM2 (para manter a API Backend online via processo em background)

### Passo a Passo da Instalação do Backend:
1. Puxe seu código pelo Git / FTP pra dentro do seu servidor (ex: `/var/www/williampreto/`).
2. Acesse `/server` e rode `npm install`.
3. Configure o arquivo `.env` do ambiente apontando para o MySQL local do seu servidor Cloud. Substitua o `JWT_SECRET` por uma nova string ultra segura (se você vazar esse texto, hackers conseguem burlar login).
4. `npx prisma db push` (Montando as tabelas de dados na nuvem).
5. Instale o PM2 caso não tenha: `npm install -g pm2`
6. `pm2 start src/server.js --name "williampreto-api"`
7. `pm2 save`

### Passo a Passo Nginx + Servindo Frontend e Imagens:
A recomendação mais performática e barata é buildar a pasta `client` transformando ela de *React JSX* pesado em puro *Javascript e HTML minificado*.

1. Entre no seu Computador Local, ou dentro do servidor na pasta `/client`, e rode `npm run build`. Ele criará a pasta `/dist`.
2. Pegue essa pasta `/dist` e coloque na área pública do Nginx. Ex: `/var/www/williampreto/frontend/`.
3. Crie os arquivos virtuais no Nginx para receber tráfego:

**Configuração Modelo Nginx (Site.conf)**
```nginx
server {
    listen 80;
    server_name www.williampreto.com.br williampreto.com.br;

    root /var/www/williampreto/frontend; # Apontar onde você jogou o /dist
    index index.html;

    # Importante pro React funcionar sem erro 404 em rotas acessadas diretamente linkadas:
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Redirecionar '/api' para seu servidor Node.js PM2 que está na porta 3000
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Importante: Servir as Imagens Estáticas Upadas Pelo CMS!
    location /uploads/ {
        alias /var/www/williampreto/server/uploads/;
        # Permissões do Nginx podem ser necessárias caso não apareçam as fotos
    }
}
```
4. Rode `certbot --nginx` caso tenha o Cerbot baixado pra colocar HTTPS automático no seu site.

---

###  🔐 3. Dicas Finais e Melhores Práticas de Segurança
- Verifique de nunca fazer `.gitignore` esquecer de esconder arquivos `.env`.
- Sua API Backend de Node vai salvar imagens em `/uploads/`. Se certifique de dar `chmod -R 755` sobre essa pasta.
- Sempre que houver upgrade num modelo do banco mude o *schema.prisma* do servidor localmente com `npx prisma migrate dev` e depois aplique essas instâncias ativas no seu database em nuvem usando `npx prisma migrate deploy`.
