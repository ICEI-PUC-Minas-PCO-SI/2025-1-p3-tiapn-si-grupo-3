import React, { useState, useEffect, useCallback } from 'react'; // Importa o useCallback
import Calendar from '../components/Calendar';
import AddEventModal from '../components/AddEventModal';
import { getEmprestimos, getEventos, addEvento, updateEvento, deleteEvento } from '../services/api'; 

const typeColorMap = {
    'Retirada': 'bg-green-500',
    'Devolução': 'bg-yellow-500',
    'Evento': 'bg-purple-500',
};


const Agenda = () => { 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  
  const fetchAllCalendarData = useCallback(async () => {
      setIsLoading(true);
      try {
        setError(null);
        const [emprestimosFromApi, eventosFromApi] = await Promise.all([getEmprestimos(), getEventos()]);
        
        const emprestimoEvents = [];
        emprestimosFromApi.forEach(emprestimo => {
        
          if (emprestimo.Data_Retirada) {
            emprestimoEvents.push({
              id: `emp-ret-${emprestimo.Codigo}`,
              date: emprestimo.Data_Retirada.slice(0, 10),
              title: `Retirada: ${emprestimo.Descricao}`,
              type: 'Retirada',
              color: typeColorMap['Retirada'],
              isManual: false,
            });
          }
          if (emprestimo.Data_Devolucao) {
            emprestimoEvents.push({
              id: `emp-dev-${emprestimo.Codigo}`,
              date: emprestimo.Data_Devolucao.slice(0, 10),
              title: `Devolução: ${emprestimo.Descricao}`,
              type: 'Devolução',
              color: typeColorMap['Devolução'],
              isManual: false,
            });
          }
        });

        const manualEvents = eventosFromApi.map(evento => ({
            id: evento.Codigo,
            date: evento.Data.slice(0, 10),
            title: evento.Titulo,
            color: typeColorMap['Evento'],
            isManual: true,
        }));

        setEvents([...emprestimoEvents, ...manualEvents]);

      } catch (err) {
        setError('Não foi possível carregar os dados completos da agenda.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
  }, []); // O array de dependências vazio significa que esta função não será recriada

  // MUDANÇA 2: Este useEffect agora apenas CHAMA a função fetchAllCalendarData na montagem inicial.
  useEffect(() => {
    fetchAllCalendarData();
  }, [fetchAllCalendarData]); // A dependência agora é a própria função

  // MUDANÇA 3: O useEffect duplicado foi removido.

  const handleEventClick = (event) => {
    if (!event.isManual) {
        alert('Eventos de empréstimo não podem ser editados diretamente.');
        return;
    }
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleOpenModalForCreate = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };


  const handleSaveEvent = async (eventData, eventToEdit) => {
    try {
      if (eventToEdit) {
        await updateEvento(eventToEdit.id, { title: eventData.title, date: eventData.date });
        alert('Evento atualizado com sucesso!');
      } else {
        await addEvento({ title: eventData.title, date: eventData.date });
        alert('Evento criado com sucesso!');
      }
      handleCloseModal();
      await fetchAllCalendarData(); 
    } catch (err) {
      alert('Erro ao salvar evento.');
    }
  };

 
  const handleDeleteEvent = async (eventToDelete) => {
    try {
        await deleteEvento(eventToDelete.id);
        alert('Evento excluído com sucesso!');
        handleCloseModal();
        await fetchAllCalendarData(); // Funciona!
    } catch (err) {
        alert('Erro ao excluir evento.');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-full"><p>Carregando agenda...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-full"><p className="text-red-600">{error}</p></div>;
  }

  return (
    <>
      <main className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Agenda</h1>
        <Calendar 
            onAddEvent={handleOpenModalForCreate} 
            events={events}
            onEventClick={handleEventClick}
        />
      </main>
      <AddEventModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSaveEvent={handleSaveEvent}
        eventToEdit={selectedEvent} 
        onDeleteEvent={handleDeleteEvent} 
      />
    </>
  );
};

export default Agenda; 