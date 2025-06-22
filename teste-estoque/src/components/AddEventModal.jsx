// frontend/src/components/AddEventModal.js
import React, { useState, useEffect } from 'react';

const AddEventModal = ({ isOpen, onClose, onSaveEvent, eventToEdit, onDeleteEvent }) => {
  const initialFormState = { title: '', type: 'Evento', date: '' };
  const [event, setEvent] = useState(initialFormState);

  useEffect(() => {
    if (isOpen) {
      if (eventToEdit) {
        setEvent({
          title: eventToEdit.title,
          type: eventToEdit.type,
          date: eventToEdit.date,
        });
      } else {
        setEvent(initialFormState);
      }
    }
  }, [isOpen, eventToEdit]);

  // Função completa, sem "..."
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!event.title || !event.date) {
      alert('Título e Data são obrigatórios!');
      return;
    }
    onSaveEvent(event, eventToEdit);
  };

  const handleDeleteClick = () => {
      if (window.confirm('Tem certeza que deseja excluir este evento?')) {
          onDeleteEvent(eventToEdit);
      }
  }

  if (!isOpen) {
    return null;
  }

  return (
    // DIV PRINCIPAL COM TODAS AS CLASSES PARA CENTRALIZAR E DAR O FUNDO ESCURO
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* O CARD DO MODAL, COM O FUNDO BRANCO E SOMBRA */}
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-5 text-gray-800">
          {eventToEdit ? 'Editar Evento' : 'Adicionar Novo Evento'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campos do formulário com estilos completos */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título do Evento*</label>
            <input
              type="text" name="title" id="title" value={event.title} onChange={handleChange} required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
         
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data*</label>
            <input
              type="date" name="date" id="date" value={event.date} onChange={handleChange} required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          {/* Container dos botões */}
          <div className="mt-6 flex justify-between items-center">
            <div>
              {eventToEdit && (
                <button
                  type="button" onClick={handleDeleteClick}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm"
                >
                  Excluir
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button" onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-purple-700 hover:bg-purple-800 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {eventToEdit ? 'Salvar Alterações' : 'Salvar Evento'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;