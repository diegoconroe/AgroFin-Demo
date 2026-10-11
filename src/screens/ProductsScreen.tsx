import React, { useState } from 'react';
import { Product } from '../data/mockData';

interface ProductsScreenProps {
  products: Product[];
  onOpenNewProduct: () => void;
  onUpdateStock: (productId: string, delta: number) => void;
  showToast: (msg: string) => void;
}

export const ProductsScreen: React.FC<ProductsScreenProps> = ({
  products,
  onOpenNewProduct,
  onUpdateStock,
  showToast,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForAction, setSelectedProductForAction] = useState<Product | null>(null);

  const filteredProducts = products.filter((prod) => {
    const matchesCat = activeCategory === 'todos' || prod.category === activeCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalStockValue = products.reduce((acc, p) => acc + p.stock * p.price, 0);

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto">
      {/* Search & Primary Action Row */}
      <section className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px] pointer-events-none">
              search
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar palta, queso, huevos..."
              className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline font-body text-sm focus:outline-none focus:bg-surface-container-lowest transition-colors shadow-xs border border-outline-variant/30"
            />
          </div>
          <button
            type="button"
            onClick={onOpenNewProduct}
            className="h-11 px-3.5 rounded-xl bg-primary text-on-primary font-body text-xs font-semibold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform flex-shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Nuevo</span>
          </button>
        </div>
      </section>

      {/* Quick Inventory Metrics Strip */}
      <section className="px-4 py-2">
        <div className="grid grid-cols-3 gap-2 bg-surface-container-low rounded-xl p-3 shadow-sm border border-outline-variant/30">
          <div className="flex flex-col items-center text-center px-1">
            <span className="text-[11px] font-label text-on-surface-variant font-medium leading-none mb-1">
              Categorías
            </span>
            <span className="font-headline text-lg font-bold text-on-surface">3</span>
            <span className="text-[9px] font-label text-primary font-semibold mt-0.5">Activas</span>
          </div>

          <div className="flex flex-col items-center text-center px-1 bg-surface-container/60 rounded-lg py-1 border border-outline-variant/20">
            <span className="text-[11px] font-label text-on-surface-variant font-medium leading-none mb-1">
              Catálogo
            </span>
            <span className="font-headline text-lg font-bold text-on-surface">{products.length}</span>
            <span className="text-[9px] font-label text-secondary font-semibold mt-0.5">Productos</span>
          </div>

          <div className="flex flex-col items-center text-center px-1">
            <span className="text-[11px] font-label text-on-surface-variant font-medium leading-none mb-1">
              Valor Stock
            </span>
            <span className="font-headline text-base font-bold text-primary truncate max-w-full">
              S/. {totalStockValue > 0 ? totalStockValue.toLocaleString('es-PE', { maximumFractionDigits: 0 }) : '3,420'}
            </span>
            <span className="text-[9px] font-label text-on-surface-variant mt-0.5">Estimado</span>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 whitespace-nowrap">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'paltas', label: '🥑 Paltas' },
            { id: 'lacteos', label: '🧀 Lácteos / Quesos' },
            { id: 'huevos', label: '🥚 Huevos' },
            { id: 'otros', label: '🌿 Otros' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-label transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container text-on-surface-variant font-medium hover:text-on-surface'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Catalog List */}
      <section className="px-4 pt-1 flex flex-col gap-3">
        {filteredProducts.map((prod) => {
          const isLowStock = prod.minStock !== undefined && prod.stock <= prod.minStock;

          return (
            <article
              key={prod.id}
              className={`bg-surface-container-lowest rounded-xl p-3.5 shadow-sm flex flex-col gap-3 transition-all border ${
                isLowStock ? 'border-error/40' : 'border-outline-variant/30'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden flex-shrink-0 relative border border-outline-variant/20">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="font-headline text-sm font-bold text-on-surface tracking-tight truncate">
                        {prod.name}
                      </h2>
                      {isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-label font-bold bg-error-container text-error">
                          <span className="material-symbols-outlined text-[12px]">warning</span>
                          Stock Bajo
                        </span>
                      ) : prod.badge ? (
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-label font-semibold ${
                            prod.badgeType === 'optimo'
                              ? 'bg-primary-fixed text-on-primary-fixed-variant'
                              : prod.badgeType === 'especial'
                              ? 'bg-tertiary-container text-on-tertiary-container'
                              : prod.badgeType === 'diario'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                              : 'bg-surface-container-high text-on-surface-variant'
                          }`}
                        >
                          {prod.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="font-headline text-base font-bold text-primary">
                        S/. {prod.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-label text-on-surface-variant">/ {prod.unit}</span>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-label text-on-surface-variant">
                        Costo: S/. {prod.cost.toFixed(2)}
                      </span>
                      <span className="inline-flex items-center text-[10px] font-label font-bold text-primary bg-on-primary-container/40 px-1.5 py-0.2 rounded">
                        Margen {prod.marginPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProductForAction(prod)}
                  aria-label="Opciones"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors -mr-1"
                >
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>

              {/* Quick Stock Control Bar */}
              <div
                className={`flex items-center justify-between pt-2 rounded-lg px-3 py-2 ${
                  isLowStock ? 'bg-error-container/20' : 'bg-surface-container-low/70'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider font-semibold">
                    {prod.stockLabel}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isLowStock ? 'text-error' : 'text-primary'
                      }`}
                    >
                      {prod.category === 'huevos' ? 'egg' : prod.category === 'lacteos' ? 'cookie' : 'scale'}
                    </span>
                    <span
                      className={`font-body font-bold text-sm ${
                        isLowStock ? 'text-error' : 'text-on-surface'
                      }`}
                    >
                      {prod.stock} {prod.stockUnit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (prod.stock > 0) {
                        onUpdateStock(prod.id, -1);
                        showToast(`-1 ${prod.stockUnit} descontado de inventario`);
                      }
                    }}
                    disabled={prod.stock <= 0}
                    className="w-8 h-8 rounded-lg bg-surface-container-lowest text-on-surface flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px]">remove</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onUpdateStock(prod.id, 1);
                      showToast(`+1 ${prod.stockUnit} registrado en inventario`);
                    }}
                    className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Action Sheet Modal */}
      {selectedProductForAction && (
        <div
          className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex flex-col justify-end p-3 sm:items-center sm:justify-center"
          onClick={() => setSelectedProductForAction(null)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl p-5 shadow-2xl max-w-sm w-full flex flex-col gap-3 border border-outline-variant/30 animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-surface-container-highest rounded-full self-center mb-1" />
            <div className="flex items-center justify-between pb-2 border-b border-outline-variant/30">
              <div className="flex flex-col">
                <span className="text-[11px] font-label text-on-surface-variant uppercase tracking-wider font-semibold">
                  Acciones de Producto
                </span>
                <h3 className="font-headline text-base font-bold text-on-surface">
                  {selectedProductForAction.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProductForAction(null)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedProductForAction(null);
                  showToast('Modo edición de precio abierto');
                }}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-body font-bold text-on-surface">
                    Editar Precio de Venta / Costo
                  </span>
                  <span className="text-xs font-label text-on-surface-variant">
                    Ajustar valor unitario en Soles (S/.)
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProductForAction(null);
                  showToast('Cargando historial de lotes vendidos');
                }}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">history</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-body font-bold text-on-surface">
                    Ver Historial de Ventas
                  </span>
                  <span className="text-xs font-label text-on-surface-variant">
                    Movimientos, lotes vendidos y balance
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onUpdateStock(selectedProductForAction.id, 10);
                  setSelectedProductForAction(null);
                  showToast(`+10 ${selectedProductForAction.stockUnit} añadidos de cosecha reciente`);
                }}
                className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[20px]">agriculture</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-body font-bold text-on-surface">
                    Ingreso Rápido de Cosecha (+10)
                  </span>
                  <span className="text-xs font-label text-on-surface-variant">
                    Registrar nueva recolección o producción láctea
                  </span>
                </div>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedProductForAction(null)}
              className="mt-2 w-full py-2.5 rounded-xl bg-surface-container text-on-surface text-xs font-bold font-body"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
