// Em src/pages/SubscriptionPage.jsx

import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { ChevronUpIcon } from '@heroicons/react/24/solid';

// Componente para a opção de pagamento, agora com onClick para o efeito de "acordeão"
const PaymentOption = ({ title, children, isOpen = false, onClick }) => (
  <div className="mb-4">
    <div 
      onClick={onClick}
      className={`flex justify-between items-center p-4 bg-violet-600 text-white font-bold cursor-pointer ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}
    >
      <span>{title}</span>
      <ChevronUpIcon className={`h-5 w-5 transition-transform ${isOpen ? '' : 'transform rotate-180'}`} />
    </div>
    {isOpen && (
      <div className="bg-white p-6 rounded-b-lg">
        {children}
      </div>
    )}
  </div>
);

const CardForm = ({ formData, handleChange, handleSubmit, isProcessing, error }) => (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Número do Cartão</label>
        <input type="text" id="card-number" value={formData.cardNumber} onChange={(e) => handleChange('cardNumber', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="0000 0000 0000 0000" />
      </div>
      <div>
        <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Nome Impresso no Cartão</label>
        <input type="text" id="card-name" value={formData.cardName} onChange={(e) => handleChange('cardName', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700">Data de Validade</label>
          <IMaskInput
            mask="00/00"
            id="card-expiry"
            value={formData.cardExpiry}
            onAccept={(value) => handleChange('cardExpiry', value)}
            placeholder="MM/AA"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700">CVV</label>
          <IMaskInput
            mask="000"
            id="card-cvv"
            value={formData.cardCvv}
            onAccept={(value) => handleChange('cardCvv', value)}
            placeholder="123"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
        <input type="text" id="full-name" value={formData.fullName} onChange={(e) => handleChange('fullName', e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <button type="submit" disabled={isProcessing} className="w-full bg-yellow-400 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed">
        {isProcessing ? 'Processando...' : 'Confirmar compra'}
      </button>
    </form>
);

const SubscriptionPage = ({ onSubscriptionSuccess }) => {
  // Estado para controlar qual opção de pagamento está aberta (acordeão)
  const [activeOption, setActiveOption] = useState('credit'); // 'credit' ou 'debit'

  // Estado unificado para todos os campos do formulário
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    fullName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Função genérica para atualizar o estado do formulário
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validação simples
    if (!formData.cardNumber || !formData.cardName || !formData.cardExpiry || !formData.cardCvv || !formData.fullName) {
      setError('Por favor, preencha todos os campos do cartão.');
      return;
    }

    setIsProcessing(true);

    // Simula um pagamento fictício
    setTimeout(() => {
      console.log('Pagamento fictício processado com sucesso!');
      setIsProcessing(false);
      
      // Chama a função passada pelo App.jsx para navegar para a home
      onSubscriptionSuccess();

    }, 2000);
  };

  return (
    <div className="min-h-screen flex font-sans">
      <div className="w-1/2 bg-yellow-400 flex flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md flex flex-col items-center text-center">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-2xl">Faça uma</p>
            <h1 className="text-8xl font-extrabold leading-none">ASSINATURA</h1>
            <p className="text-3xl font-bold">Para continuar !</p>
          </div>
          <p className="mt-6 text-xl">Realize o pagamento e use nossos serviços</p>
          <img src="/imgs/Logo-Manejo_Laranja.png" alt="Logo Manejo" className="h-25 mt-10 bg-violet-900 rounded-full" />
        </div>
      </div>

      <div className="w-1/2 bg-violet-900 flex items-center justify-center p-12">
        <div className="w-full max-w-lg relative">
          <div className="bg-violet-900 text-white text-2xl font-bold p-4 rounded-xl text-center shadow-lg w-3/4 mx-auto mb-8 -mt-16 z-10 relative">
            Forma de Pagamento
          </div>
          <div className="bg-violet-800 p-8 rounded-2xl border-4 border-yellow-400 shadow-2xl">
            <div className="bg-violet-900 p-6 rounded-lg">
              <h2 className="text-white text-xl font-bold mb-4">Escolha a Forma de Pagamento</h2>
              
              <PaymentOption 
                title="Cartão de Crédito" 
                isOpen={activeOption === 'credit'}
                onClick={() => setActiveOption('credit')}
              >
                <p className="text-gray-600 text-sm mb-6">Digite os detalhes do seu cartão de crédito para confirmar a compra.</p>
                <CardForm 
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isProcessing={isProcessing}
                  error={error}
                />
              </PaymentOption>

              <PaymentOption 
                title="Cartão de Débito" 
                isOpen={activeOption === 'debit'}
                onClick={() => setActiveOption('debit')}
              >
                <p className="text-gray-600 text-sm mb-6">Digite os detalhes do seu cartão de débito para confirmar a compra.</p>
                <CardForm 
                  formData={formData}
                  handleChange={handleChange}
                  handleSubmit={handleSubmit}
                  isProcessing={isProcessing}
                  error={error}
                />
              </PaymentOption>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;