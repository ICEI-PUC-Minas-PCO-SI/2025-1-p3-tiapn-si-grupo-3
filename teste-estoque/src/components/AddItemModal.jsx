// frontend/src/components/AddItemModal.js
import React, { useEffect, useState } from 'react';

const AddItemModal = ({ isOpen, onClose, onSaveItem, itemToEdit }) => {
  const initialFormState = {
    codigo: '',
    nome: '',
    tipo: '', // <-- MUDANÇA: Campo 'tipo' de volta
    quantidade: '', // <-- MUDANÇA: Campo 'quantidade' de volta
    localizacao: '',
  };

  const [item, setItem] = useState(initialFormState);

  useEffect(() => {
    if (itemToEdit) {
      // Mapeamento das propriedades do DB (PascalCase) para o estado (camelCase)
      setItem({
        codigo: itemToEdit.Codigo,
        nome: itemToEdit.Nome,
        tipo: itemToEdit.Tipo,           // <-- MUDANÇA
        quantidade: itemToEdit.Quantidade, // <-- MUDANÇA
        localizacao: itemToEdit.Localizacao,
      });
    } else {
      setItem(initialFormState);
    }
  }, [itemToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('[Modal] Submetendo item:', item);

    // Validação: nome, tipo, quantidade (número), localizacao são obrigatórios
    if (!item.nome || !item.tipo || item.quantidade === '' || !item.localizacao) {
      alert('Nome, Tipo, Quantidade e Localização são obrigatórios!');
      return;
    }
    if (isNaN(parseInt(item.quantidade, 10))) {
        alert('Quantidade deve ser um número válido!');
        return;
    }
    
    onSaveItem(item);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {itemToEdit ? 'Editar Ferramenta' : 'Adicionar Nova Ferramenta'}
        </h2>
        <form onSubmit={handleSubmit}>
          {itemToEdit && (
            <div className="mb-4">
              <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">Código</label>
              <input
                type="text"
                name="codigo"
                id="codigo"
                value={item.codigo}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                readOnly
                disabled
              />
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome*</label>
            <input
              type="text"
              name="nome"
              id="nome"
              value={item.nome}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Campo Tipo */}
          <div className="mb-4">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo*</label>
            <input
              type="text"
              name="tipo"
              id="tipo"
              value={item.tipo}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Campo Quantidade */}
          <div className="mb-4">
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">Quantidade*</label>
            <input
              type="number"
              name="quantidade"
              id="quantidade"
              value={item.quantidade}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="localizacao" className="block text-sm font-medium text-gray-700">Localização*</label>
            <input
              type="text"
              name="localizacao"
              id="localizacao"
              value={item.localizacao}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              {itemToEdit ? 'Salvar Alterações' : 'Adicionar Ferramenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;