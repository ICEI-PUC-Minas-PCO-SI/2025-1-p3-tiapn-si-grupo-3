import React, { useState, useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "./IconComponents";

const Calendar = ({ onAddEvent, events, onEventClick, typeColorMap }) => {

  const [currentDate, setCurrentDate] = useState(new Date());

  const eventsByDate = useMemo(() => {
    return events.reduce((acc, event) => {
      const date = event.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});
  }, [events]);

  const daysOfWeek = [ "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado" ];

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getMonthYearLabel = () => {
    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(currentDate).replace(/^\w/, (c) => c.toUpperCase());
  };

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-start-${i}`} className="border-r border-b border-gray-200"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const dayEvents = eventsByDate[dateKey] || [];
      
    
      const today = new Date();
      const isToday = day === today.getDate() &&
                    currentDate.getMonth() === today.getMonth() &&
                    currentDate.getFullYear() === today.getFullYear();

      days.push(
        <div
          key={day}
    
          className="p-2 border-r border-b border-gray-200 flex flex-col h-32 bg-white hover:bg-gray-300 transition-colors duration-200"
        >
      
          <div className={`flex items-center justify-center h-7 w-7 rounded-full ${isToday ? 'bg-violet-600 text-white' : ''}`}>
            <span className="text-sm font-medium">{day}</span>
          </div>

          <div className="flex-grow mt-1 space-y-1 overflow-y-auto">
            {dayEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick(event)}
                className={`text-xs px-2 py-1 rounded-md text-white font-semibold cursor-pointer hover:opacity-80 transition-opacity ${event.color}`}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    const totalCells = startingDayOfWeek + totalDays;
    const remainingCells = (7 - (totalCells % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      days.push(<div key={`empty-end-${i}`} className="border-r border-b border-gray-200 bg-white"></div>);
    }

    return days;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {getMonthYearLabel()}
          </h2>
          <div className="ml-4 flex items-center space-x-2">
            <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <button
          onClick={onAddEvent}
          className="bg-yellow-400 hover:bg-yellow-500 text-slate-800 font-semibold py-2.5 px-5 rounded-md flex items-center transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Adicionar Evento
        </button>
      </div>

      <div className="grid grid-cols-7 border-t border-l border-gray-200">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-left font-semibold py-3 px-4 border-r border-b border-gray-200 bg-gray-50 text-gray-600 text-sm">
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
       {typeColorMap && (
        <div className="mt-6 flex items-center justify-center space-x-4 sm:space-x-6">
          {Object.entries(typeColorMap).map(([name, colorClass]) => (
            <div key={name} className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${colorClass}`}></div>
              <span className="text-sm text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;