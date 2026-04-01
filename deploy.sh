#!/bin/bash

# --- CONFIGURAÇÕES ---
APP_NAME="williampreto-api"
PM2_CONFIG="ecosystem.config.cjs"

echo "🚀 Iniciando deploy automatizado..."

# 1. Puxar as últimas alterações do repositório
echo "📥 Puxando código do Git..."
git pull origin main

# 2. Atualizar o Servidor (Backend)
echo "📦 Atualizando dependências do Servidor..."
cd server
npm install

echo "🗄️ Atualizando banco de dados (Prisma)..."
npx prisma generate
npx prisma migrate deploy

# 3. Atualizar o Cliente (Frontend)
echo "📦 Atualizando dependências do Cliente..."
cd ../client
npm install

echo "🏗️ Construindo versão de produção (Build)..."
npm run build

# 4. Reiniciar o processo no PM2
echo "♻️ Reiniciando processos no PM2..."
cd ..
pm2 restart $PM2_CONFIG --env production

# 5. Salvar estado do PM2
pm2 save

echo "✅ Deploy finalizado com sucesso! Seu sistema está atualizado na porta 4110."
