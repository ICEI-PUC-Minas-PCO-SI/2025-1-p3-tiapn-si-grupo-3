import React, { useState, useEffect } from 'react'; // Ou apenas os hooks que você realmente usa
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from './IconComponents';

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
  return (
    <header className="bg-violet-900 shadow-sm h-20 flex items-center justify-between px-8">
      <div className="flex-shrink-0">
        <LogoIcon />
      </div>
      <div className="flex-1 flex justify-center px-8">
        <div className="relative w-full max-w-x1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="block w-full pl-10 pr-3 py-2.5 border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Pesquise por Ferramentas e Funcionários"
          />
        </div>
      </div>
     <div className="flex items-center space-x-6">
        <button className="text-gray-100 focus:outline-none">
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