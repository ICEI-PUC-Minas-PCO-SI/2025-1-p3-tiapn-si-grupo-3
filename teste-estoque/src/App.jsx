
import React, { useState } from 'react';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import StockPage from './components/StockPage';
import Agenda from './components/Agenda';
import SubscriptionPage from './components/SubscriptionPage';

function App() {
 
  const [activePage, setActivePage] = useState('Agenda'); 

  const renderPage = () => {
    switch (activePage) {
      case 'Estoque':
        return <StockPage />;
      case 'Agenda':
        return <Agenda />;
      case 'Empréstimos':
        return <PlaceholderPage title="Empréstimos" />;
      case 'Funcionários':
        return <PlaceholderPage title="Funcionários" />;
      case 'Configuração':
        return <PlaceholderPage title="Configuração" />;
      case 'Departamento':
        return <PlaceholderPage title="Departamento" />;
      default:
        return <AgendaPage />; 
    }
  };

  if (activePage === 'Início') {
    // Se for, renderizamos APENAS a página de assinatura, em tela cheia.
    return <SubscriptionPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <div className="flex flex-1" style={{ minHeight: 'calc(100vh - 80px)' }}> {}
        <Sidebar activeItem={activePage} setActiveItem={setActivePage} />
        <div className="flex-1 flex flex-col">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;