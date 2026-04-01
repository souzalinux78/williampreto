import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Loading from './components/Loading';

// Lazy loading pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Portfolio = React.lazy(() => import('./pages/Portfolio'));
const Sobre = React.lazy(() => import('./pages/Sobre'));
const Contato = React.lazy(() => import('./pages/Contato'));
const Obrigado = React.lazy(() => import('./pages/Obrigado'));
const AdminPlaceholder = React.lazy(() => import('./pages/AdminPlaceholder'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

// Admin Pages
const Login = React.lazy(() => import('./pages/admin/Login'));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout'));
const Dashboard = React.lazy(() => import('./pages/admin/Dashboard'));
const Configuracoes = React.lazy(() => import('./pages/admin/Configuracoes'));
const Servicos = React.lazy(() => import('./pages/admin/Servicos'));
const Premios = React.lazy(() => import('./pages/admin/Premios'));
const AdminPortfolio = React.lazy(() => import('./pages/admin/Portfolio'));
const Depoimentos = React.lazy(() => import('./pages/admin/Depoimentos'));
const Faqs = React.lazy(() => import('./pages/admin/Faqs'));

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Header />}
      <main className={`flex-grow ${!isAdminRoute ? 'pt-20' : ''}`}>
        <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/obrigado" element={<Obrigado />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="configuracoes" element={<Configuracoes />} />
                <Route path="servicos" element={<Servicos />} />
                <Route path="premios" element={<Premios />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="depoimentos" element={<Depoimentos />} />
                <Route path="faqs" element={<Faqs />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
