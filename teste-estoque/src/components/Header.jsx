import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, BellIcon } from './IconComponents'; // UserCircleIcon não é usado aqui

const LogoIcon = () => (
  <div className="flex items-center space-x-4">
    <button className="text-gray-100 focus:outline-none">
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
    <img src="/imgs/Logo-Manejo_Laranja.png" alt="Logo" className="h-12" />
  </div>
);

const Header = () => {
  // Estado para rastrear o status da permissão de notificação
  const [notificationPermission, setNotificationPermission] = useState('default');

  // Ao carregar o componente, verifica o status atual da permissão
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleNotificationClick = async () => {
    // Verifica se o navegador suporta notificações
    if (!('Notification' in window)) {
      alert('Este navegador não suporta notificações de desktop.');
      return;
    }

    // Caso 1: Permissão já concedida, envia uma notificação de teste
    if (Notification.permission === 'granted') {
      new Notification('Manejo de Ferramentas', {
        body: 'As notificações já estão ativadas!',
        icon: '/imgs/Logo-Manejo_Laranja.png' // Ícone opcional
      });
      return;
    }

    // Caso 2: Permissão foi negada, informa o usuário
    if (Notification.permission === 'denied') {
      alert('As notificações foram bloqueadas. Para ativá-las, você precisa alterar as permissões nas configurações do seu navegador.');
      return;
    }

    // Caso 3: Permissão ainda não foi solicitada, pede ao usuário
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      // Atualiza o estado com a escolha do usuário
      setNotificationPermission(permission);

      if (permission === 'granted') {
        new Notification('Manejo de Ferramentas', {
          body: 'Ótimo! Você receberá as notificações a partir de agora.',
          icon: '/imgs/Logo-Manejo_Laranja.png'
        });
      } else {
        alert('Você não ativou as notificações. Se mudar de ideia, clique no sino novamente ou altere nas configurações do site.');
      }
    }
  };
  
  // Define a cor do sino com base na permissão
  const getBellColor = () => {
      switch (notificationPermission) {
          case 'granted':
              return 'text-green-400'; // Verde para ativado
          case 'denied':
              return 'text-red-500'; // Vermelho para bloqueado
          default:
              return 'text-gray-100'; // Padrão
      }
  }

  return (
    <header className="bg-violet-900 shadow-sm h-20 flex items-center justify-between px-8">
      <div className="flex-shrink-0">
        <LogoIcon />
      </div>
      <div className="flex-1 flex justify-center px-8">
        <div className="relative w-full max-w-xl"> {/* Ajustado para max-w-xl */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search" name="search" id="search"
            className="block w-full pl-10 pr-3 py-2.5 border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Pesquise por Ferramentas e Funcionários"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        {/* O botão do sino agora tem um onClick e uma classe dinâmica */}
        <button 
          onClick={handleNotificationClick} 
          className={`${getBellColor()} focus:outline-none transition-colors duration-300`}
          title="Ativar/Verificar Notificações"
        >
          <BellIcon className="h-7 w-7" />
        </button>
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/imgs/Logo_Fernandes-Prado.png"
            alt="Alessandra Fernandes Prado"
          />
          <div className="ml-3 text-right">
            <p className="text-sm font-medium text-stone-50">Alessandra</p>
            <p className="text-xs text-stone-400">Fernandes Prado</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;