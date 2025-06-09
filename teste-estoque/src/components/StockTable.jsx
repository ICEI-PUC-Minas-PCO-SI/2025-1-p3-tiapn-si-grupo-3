// frontend/src/components/StockTable.js
import React from 'react';
import { PencilIcon, TrashIcon } from './IconComponents'; // Certifique-se de que estes imports estão corretos

const StockTable = ({ dataToDisplay, onDeleteItem, onEditItem }) => {
  if (!dataToDisplay || dataToDisplay.length === 0) {
    return <p className="text-center text-gray-500 mt-4">Nenhuma ferramenta encontrada.</p>;
  }

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-violet-900">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Código
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Nome
            </th>
            {/* Cabeçalhos alterados */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Tipo
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Quantidade
            </th>
            {/* Fim dos cabeçalhos alterados */}
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Localização
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100 divide-y divide-gray-200">
          {dataToDisplay.map((item) => (
            <tr key={item.Codigo} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.Codigo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Nome}</td>
              {/* Células de dados alteradas */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Tipo}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Quantidade}</td>
              {/* Fim das células de dados alteradas */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Localizacao}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                <button
                  onClick={() => onEditItem(item.Codigo)}
                  className="text-yellow-500 hover:text-yellow-700"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDeleteItem(item.Codigo)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;