import React, { useState, useEffect } from "react";

// 1. IMPORTE TODOS OS COMPONENTES
// Páginas de Autenticação
import AuthPage from "./components/AuthPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

// Página de Assinatura
import SubscriptionPage from './pages/SubscriptionPage';

// Componentes do Layout Principal (Dashboard)
import Header from "./components/Header";
import Sidebar from "./components/SideBar";
import Agenda from "./pages/Agenda"; // Nome corrigido
import StockPage from "./pages/StockPage";

// Componente para páginas em construção
const PlaceholderPage = ({ title }) => (
    <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg">Esta página está em construção.</p>
    </div>
);


function App() {
  // 2. ESTADOS PRINCIPAIS
  // O estado geral da aplicação, que pode ser 'Auth', 'Subscription', ou 'Dashboard'
  const [appState, setAppState] = useState("Auth");

  // Estado para a página ativa DENTRO do Dashboard
  const [activeDashboardPage, setActiveDashboardPage] = useState("Agenda");

  // Estado para a página ativa DENTRO da Autenticação (Login, Cadastro, etc.)
  const [activeAuthPage, setActiveAuthPage] = useState("Login");

  // Estado para o token de redefinição de senha
  const [resetToken, setResetToken] = useState(null);

  // Efeito para verificar se a URL contém um token de redefinição
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token && window.location.pathname.includes("reset-password")) {
      setResetToken(token);
      setActiveAuthPage("ResetPassword");
      setAppState("Auth");
    }
  }, []);

  // 3. FUNÇÕES DE NAVEGAÇÃO
  const handleAuthNavigate = (page) => setActiveAuthPage(page);

  // Após o login, vai para a tela de Assinatura
  const handleLoginSuccess = () => setAppState("Subscription");

  // Após a assinatura, vai para o Dashboard (Home/Agenda)
  const handleSubscriptionSuccess = () => setAppState("Dashboard");

  // =================================================================
  // 4. LÓGICA DE RENDERIZAÇÃO
  // =================================================================

  // MUNDO 1: TELA DE AUTENTICAÇÃO
  if (appState === "Auth") {
    switch (activeAuthPage) {
      case "Login":
        return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={handleAuthNavigate} />;
      case "ForgotPassword":
        return <ForgotPassword onNavigate={handleAuthNavigate} />;
      case "ResetPassword":
        return <ResetPassword onNavigate={handleAuthNavigate} token={resetToken} />;
      default:
        return <AuthPage onLoginSuccess={handleLoginSuccess} onNavigate={handleAuthNavigate} />;
    }
  }

  // MUNDO 2: TELA DE ASSINATURA (TELA CHEIA)
  if (appState === "Subscription") {
    return <SubscriptionPage onSubscriptionSuccess={handleSubscriptionSuccess} />;
  }

  // MUNDO 3: DASHBOARD PRINCIPAL
  if (appState === "Dashboard") {
    const renderDashboardPage = () => {
      switch (activeDashboardPage) {
        case "Estoque":
          return <StockPage />;
        case "Agenda":
          return <Agenda />;
        default:
          return <PlaceholderPage title={activeDashboardPage} />;
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <div className="flex flex-1" style={{ minHeight: "calc(100vh - 80px)" }}>
          <Sidebar
            activeItem={activeDashboardPage}
            setActiveItem={setActiveDashboardPage}
          />
          <div className="flex-1 flex flex-col">{renderDashboardPage()}</div>
        </div>
      </div>
    );
  }
}

export default App;