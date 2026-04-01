@echo off
echo =======================================
echo Iniciando William Preto - Landing Page
echo =======================================
echo.

:: %~dp0 pega a pasta atual do script exato (scripts\), .. sobe para raiz
cd /d "%~dp0.."

echo [1/2] Iniciando o Backend API (Porta 4110)...
start "Backend - API" cmd /k "cd server && npm run dev"

echo.
echo [2/2] Iniciando o Frontend Vite (Porta 5173)...
start "Frontend - Vite" cmd /k "cd client && npm run dev"

echo.
echo Tudo iniciado! Duas novas janelas foram abertas.
echo Pressione qualquer tecla para fechar este assistente.
pause >nul
