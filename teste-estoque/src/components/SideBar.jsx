  import React, { useState, useEffect } from 'react'; // Ou apenas os hooks que você realmente usa
  import {
    HomeIcon,
    ShoppingCartIcon,
    UsersIcon,
    CalendarDaysIcon,
    WrenchIcon,
    Cog6ToothIcon,
    BuildingOfficeIcon,
  } from './IconComponents'; 

  const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Estoque');

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
                <li key={item.name} className="px-2">
                  <a
                    href="#"
                    onClick={() => setActiveItem(item.name)}
                   className={`flex items-center py-2.5 px-4 rounded-md transition-colors duration-200
                    ${isActive
                      ? 'bg-gray-300 text-violet-900 font-bold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-6 h-6 mr-3 text-yellow-500" />
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