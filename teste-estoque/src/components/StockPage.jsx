// frontend/src/pages/StockPage.js
import React, { useEffect, useState } from 'react';
import StockTable from '../components/StockTable';
import AddItemModal from '../components/AddItemModal';
import { PlusIcon } from '../components/IconComponents';
import { getFerramentas, addFerramenta, updateFerramenta, deleteFerramenta } from '../services/api';

function StockPage() {
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
      item.Nome.toLowerCase().includes(lowercasedSearchTerm) ||
      (item.Codigo && String(item.Codigo).toLowerCase().includes(lowercasedSearchTerm)) ||
      item.Tipo.toLowerCase().includes(lowercasedSearchTerm) ||
      (item.Quantidade !== undefined && String(item.Quantidade).toLowerCase().includes(lowercasedSearchTerm)) ||
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
    const processedData = {
      nome: itemDataFromModal.nome,
      tipo: itemDataFromModal.tipo,
      quantidade: parseInt(itemDataFromModal.quantidade, 10),
      localizacao: itemDataFromModal.localizacao
    };

    try {
      if (currentItem) {
        await updateFerramenta(currentItem.Codigo, processedData);
        alert('Item atualizado com sucesso!');
      } else {
        await addFerramenta(processedData);
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
    <>
      <main className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Estoque</h1>
          <div className="flex items-center space-x-3">
             <input
              type="text"
              placeholder="Pesquisar no Estoque..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-80"
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
      <AddItemModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSaveItem={handleSaveItem}
        itemToEdit={currentItem}
      />
    </>
  );
}

export default StockPage;