import React from 'react';

interface BottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: 'dashboard' },
    { id: 'ventas', label: 'Ventas', icon: 'point_of_sale' },
    { id: 'productos', label: 'Productos', icon: 'potted_plant' },
    { id: 'gastos', label: 'Gastos', icon: 'receipt_long' },
    { id: 'clientes', label: 'Clientes', icon: 'groups' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(46,50,48,0.05)] border-t border-outline-variant/30">
      <div className="h-16 px-2 flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[54px] min-h-[44px] gap-0.5 transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-label font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
