// frontend/src/components/Sidebar.js
import React from 'react'; 
import {
  HomeIcon,
  ShoppingCartIcon,
  UsersIcon,
  CalendarDaysIcon,
  WrenchIcon,
  Cog6ToothIcon,
  BuildingOfficeIcon,
} from './IconComponents'; 

// Recebe `activeItem` e `setActiveItem` como props para controlar o estado
const Sidebar = ({ activeItem, setActiveItem }) => {
  const navItems = [
    { name: 'Início', icon: HomeIcon },
    { name: 'Empréstimos', icon: ShoppingCartIcon },
    { name: 'Funcionários', icon: UsersIcon },
    { name: 'Agenda', icon: CalendarDaysIcon },
    { name: 'Estoque', icon: WrenchIcon },
    { name: 'Configuração', icon: Cog6ToothIcon },
    { name: 'Departamento', icon: BuildingOfficeIcon },
  ];

  return (
    <aside className="w-64 bg-gray-100 text-gray-800 flex-shrink-0">
        <nav className="p-4">
          <ul>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.name === activeItem;
              return (
                <li key={item.name} className="px-2 mb-1">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveItem(item.name);
                    }}
                    className={`flex items-center py-2.5 px-4 rounded-md transition-colors duration-200
                    ${isActive
                      ? 'bg-gray-300 text-violet-900 font-bold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className={`w-6 h-6 mr-3 ${isActive ? 'text-yellow-500' : 'text-gray-500'}`} />
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
  );
};

export default Sidebar;