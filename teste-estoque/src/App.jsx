// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from './components/SideBar';
import Header from './components/Header';
import StockTable from './components/StockTable';
import AddItemModal from './components/AddItemModal';
import { PlusIcon } from './components/IconComponents';

import { getFerramentas, addFerramenta, updateFerramenta, deleteFerramenta } from './services/api';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [stockItems, setStockItems] = useState([]);
  const [filteredStockItems, setFilteredStockItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStockItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getFerramentas();
      setStockItems(data);
      setFilteredStockItems(data);
    } catch (err) {
      console.error("Failed to fetch stock items:", err);
      setError("Não foi possível carregar os itens de estoque. Verifique a conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = stockItems.filter(item =>
      // Ajuste para as propriedades reais: Nome, Tipo, Quantidade, Localizacao
      item.Nome.toLowerCase().includes(lowercasedSearchTerm) ||
      (item.Codigo && String(item.Codigo).toLowerCase().includes(lowercasedSearchTerm)) ||
      item.Tipo.toLowerCase().includes(lowercasedSearchTerm) || // <-- MUDANÇA
      (item.Quantidade !== undefined && String(item.Quantidade).toLowerCase().includes(lowercasedSearchTerm)) || // <-- MUDANÇA
      item.Localizacao.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredStockItems(results);
  }, [searchTerm, stockItems]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleEditItemStart = (itemCodigo) => {
    const item = stockItems.find(i => i.Codigo === itemCodigo);
    if (item) {
      setCurrentItem(item);
      openModal();
    }
  };

  const handleSaveItem = async (itemDataFromModal) => {
    // MUDANÇA AQUI: Envie os dados em camelCase, para corresponder ao req.body do backend
    const processedData = {
      nome: itemDataFromModal.nome,
      tipo: itemDataFromModal.tipo,
      quantidade: parseInt(itemDataFromModal.quantidade, 10),
      localizacao: itemDataFromModal.localizacao
    };

    try {
      if (currentItem) {
        // Para PUT, o código é o Codigo do item (PascalCase) e o body é processedData (camelCase)
        await updateFerramenta(currentItem.Codigo, processedData);
        alert('Item atualizado com sucesso!');
      } else {
        await addFerramenta(processedData); // Envia processedData (camelCase)
        alert('Item adicionado com sucesso!');
      }
      fetchStockItems();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar item:', error);
      alert('Erro ao salvar item. Verifique o console para mais detalhes.');
    }
};

  const handleDeleteItem = async (codigo) => {
    if (!window.confirm(`Tem certeza que deseja excluir o item com código ${codigo}?`)) {
      return;
    }
    try {
      await deleteFerramenta(codigo);
      alert('Item excluído com sucesso!');
      fetchStockItems();
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      alert('Erro ao excluir item. Verifique o console para mais detalhes.');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Carregando dados...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Pesquisar"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex space-x-3">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 font-semibold py-2.5 px-5 rounded-md flex items-center transition-colors duration-200">
                <PlusIcon className="w-5 h-5 mr-2" />
                Criar Estoque
              </button>
              <button
                onClick={() => {
                  setCurrentItem(null);
                  openModal();
                }}
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 font-semibold py-2.5 px-5 rounded-md flex items-center transition-colors duration-200"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Nova Ferramenta
              </button>
            </div>
          </div>
          <StockTable
            dataToDisplay={filteredStockItems}
            onDeleteItem={handleDeleteItem}
            onEditItem={handleEditItemStart}
          />
        </main>
      </div>
      <AddItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveItem={handleSaveItem}
        itemToEdit={currentItem}
      />
    </div>
  );
}

export default App;