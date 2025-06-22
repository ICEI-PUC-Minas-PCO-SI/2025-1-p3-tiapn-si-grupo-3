import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';
import { ChevronUpIcon } from '@heroicons/react/24/solid';


const PaymentOption = ({ title, children, isOpen = false }) => (
  <div className="mb-4">
    <div className={`flex justify-between items-center p-4 bg-violet-600 text-white font-bold cursor-pointer ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}>
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

const SubscriptionPage = () => {
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  return (
    <div className="min-h-screen flex font-sans">
     <div className="w-1/2 bg-yellow-400 flex flex-col items-center justify-center p-12 text-white">

  <div className="max-w-md flex flex-col items-center text-center">
    

    <div className="flex flex-col items-center space-y-2">
      <p className="text-2xl">Faça uma</p>
      <h1 className="text-8xl font-extrabold leading-none">ASSINATURA</h1>
      <p className="text-3xl font-bold">Para continuar !</p>
    </div>


    <p className="mt-6 text-xl">
      Realize o pagamento e use nossos serviços
    </p>


    <img src="/imgs/Logo-Manejo_Laranja.png" alt="Logo Manejo" className="h-25 mt-10 bg-violet-900" />
  </div>
</div>

      {}
      <div className="w-1/2 bg-violet-900 flex items-center justify-center p-12">
        <div className="w-full max-w-lg relative">
          <div className="bg-violet-900 text-white text-2xl font-bold p-4 rounded-xl text-center shadow-lg w-3/4 mx-auto mb-8 -mt-16 z-10 relative">
            Forma de Pagamento
          </div>
          <div className="bg-violet-800 p-8 rounded-2xl border-4 border-yellow-400 shadow-2xl">
            <div className="bg-violet-900 p-6 rounded-lg">
              <h2 className="text-white text-xl font-bold mb-4">Escolha a Forma de Pagamento</h2>
              <PaymentOption title="Cartão de Crédito" isOpen={true}>
                <p className="text-gray-600 text-sm mb-6">
                  Digite os detalhes do seu cartão de crédito para confirmar a compra.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Número do Cartão</label>
                    <input type="text" id="card-number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Nome Impresso no Cartão</label>
                    <input type="text" id="card-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700">Data de Validade</label>
                      <IMaskInput
                        mask="00/00"
                        id="card-expiry"
                        name="card-expiry"
                        value={cardExpiry}
                        onAccept={(value) => setCardExpiry(value)}
                        placeholder="MM/AA"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <IMaskInput
                        mask="000"
                        id="card-cvv"
                        name="card-cvv"
                        value={cardCvv}
                        onAccept={(value) => setCardCvv(value)}
                        placeholder="123"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="full-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <button type="button" className="w-full bg-yellow-400 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors mt-6">
                    Confirmar compra
                  </button>
                </form>
              </PaymentOption>
              <PaymentOption title="Cartão de Débito" isOpen={true}>
                 <p className="text-gray-600 text-sm mb-6">
                  Digite os detalhes do seu cartão de débito para confirmar a compra.
                </p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Número do Cartão</label>
                    <input type="text" id="card-number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">Nome Impresso no Cartão</label>
                    <input type="text" id="card-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label htmlFor="card-expiry" className="block text-sm font-medium text-gray-700">Data de Validade</label>
                      <IMaskInput
                        mask="00/00"
                        id="card-expiry"
                        name="card-expiry"
                        value={cardExpiry}
                        onAccept={(value) => setCardExpiry(value)}
                        placeholder="MM/AA"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="w-1/2">
                      <label htmlFor="card-cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                      <IMaskInput
                        mask="000"
                        id="card-cvv"
                        name="card-cvv"
                        value={cardCvv}
                        onAccept={(value) => setCardCvv(value)}
                        placeholder="123"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                    <input type="text" id="full-name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <button type="button" className="w-full bg-yellow-400 text-slate-800 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors mt-6">
                    Confirmar compra
                  </button>
                </form>
              </PaymentOption>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;