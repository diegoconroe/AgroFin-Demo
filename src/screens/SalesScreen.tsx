import React, { useState } from 'react';
import { Sale } from '../data/mockData';

interface SalesScreenProps {
  sales: Sale[];
  onOpenNewSale: () => void;
  onViewSaleDetail: (saleId: string) => void;
  onOpenPaymentModal: (clientName: string, amount: number) => void;
}

export const SalesScreen: React.FC<SalesScreenProps> = ({
  sales,
  onOpenNewSale,
  onViewSaleDetail,
  onOpenPaymentModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'todas' | 'cobradas' | 'pendientes'>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredSales = sales.filter((sale) => {
    const matchesFilter =
      activeFilter === 'todas'
        ? true
        : activeFilter === 'cobradas'
        ? sale.paymentStatus === 'cobrado'
        : sale.paymentStatus === 'pendiente';

    const matchesSearch =
      sale.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.itemsSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.folio.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalFacturado = sales.reduce((acc, s) => acc + s.amount, 0);
  const totalPorCobrar = sales
    .filter((s) => s.paymentStatus === 'pendiente')
    .reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 space-y-4 max-w-lg mx-auto">
      {/* Banner Resumen Financiero */}
      <div className="w-full bg-surface-container rounded-xl p-5 shadow-sm border border-outline-variant/30">
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">analytics</span>
            <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-bold">
              Balance de Cosecha · Octubre
            </span>
          </div>
          <span className="text-[11px] font-label font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
            +12% vs sept.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="bg-surface-container-lowest/80 rounded-lg p-3.5 flex flex-col justify-between border border-outline-variant/20">
            <span className="text-[11px] font-label text-on-surface-variant leading-none font-medium">
              Total Facturado
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xs font-bold text-on-surface-variant font-label">S/.</span>
              <span className="text-xl font-headline font-bold text-on-surface tracking-tight">
                {totalFacturado > 0 ? totalFacturado.toFixed(2) : '7,240.00'}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-primary font-medium">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              <span>{sales.length} pedidos</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest/80 rounded-lg p-3.5 flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-label text-on-surface-variant leading-none font-medium">
                Por Cobrar
              </span>
              <span className="w-2 h-2 rounded-full bg-tertiary" />
            </div>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xs font-bold text-tertiary font-label">S/.</span>
              <span className="text-xl font-headline font-bold text-tertiary tracking-tight">
                {totalPorCobrar > 0 ? totalPorCobrar.toFixed(2) : '680.00'}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-[11px] text-tertiary font-medium">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              <span>3 pendientes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button Acción Nueva Venta & Search Bar */}
      <div className="flex items-center gap-2.5 pt-1">
        <button
          type="button"
          onClick={onOpenNewSale}
          className="flex-1 bg-primary text-on-primary py-3 px-4 rounded-xl font-label font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          <span>Anotar Nueva Venta</span>
        </button>

        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="w-12 h-12 bg-surface-container rounded-xl pl-10 pr-2 text-xs focus:w-44 transition-all focus:outline-none focus:ring-1 focus:ring-primary text-on-surface"
          />
          <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant text-[20px] pointer-events-none">
            search
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveFilter('todas')}
          className={`px-4 py-2 rounded-full text-xs font-label transition-all whitespace-nowrap ${
            activeFilter === 'todas'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'bg-surface-container text-on-surface-variant font-medium hover:text-on-surface'
          }`}
        >
          Todas ({sales.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('cobradas')}
          className={`px-4 py-2 rounded-full text-xs font-label transition-all whitespace-nowrap ${
            activeFilter === 'cobradas'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'bg-surface-container text-on-surface-variant font-medium hover:text-on-surface'
          }`}
        >
          Cobradas ({sales.filter((s) => s.paymentStatus === 'cobrado').length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter('pendientes')}
          className={`px-4 py-2 rounded-full text-xs font-label transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeFilter === 'pendientes'
              ? 'bg-primary text-on-primary font-bold shadow-sm'
              : 'bg-surface-container text-on-surface-variant font-medium hover:text-on-surface'
          }`}
        >
          <span>Pendientes de cobro</span>
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
        </button>
      </div>

      {/* Recent Sales List */}
      <div className="flex flex-col space-y-3 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-bold">
            Actividad Reciente
          </span>
          <button
            type="button"
            onClick={() => alert('Generando exportación de ventas en Excel...')}
            className="text-xs font-label text-primary font-semibold hover:underline"
          >
            Exportar Excel
          </button>
        </div>

        {filteredSales.map((sale) => {
          const isPending = sale.paymentStatus === 'pendiente';

          return (
            <div
              key={sale.id}
              className={`bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-transform active:scale-[0.99] border ${
                isPending ? 'border-tertiary/40 relative overflow-hidden' : 'border-outline-variant/30'
              }`}
            >
              {isPending && <div className="absolute top-0 left-0 right-0 h-1 bg-tertiary" />}

              <div
                className="flex items-start justify-between gap-3 cursor-pointer"
                onClick={() => onViewSaleDetail(sale.id)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isPending ? 'bg-secondary-container text-tertiary' : 'bg-surface-container text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isPending ? 'restaurant' : 'storefront'}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline font-semibold text-on-surface text-sm truncate">
                      {sale.clientName}
                    </span>
                    <span className="text-[11px] font-label text-on-surface-variant flex items-center gap-1">
                      <span>{sale.date}</span>
                      <span>·</span>
                      <span>Folio {sale.folio}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span
                    className={`font-headline font-bold text-base ${
                      isPending ? 'text-tertiary' : 'text-on-surface'
                    }`}
                  >
                    S/. {sale.amount.toFixed(2)}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-label font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                      isPending
                        ? 'text-on-tertiary-container bg-tertiary-fixed'
                        : 'text-primary bg-primary/10'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[11px]">
                      {isPending ? 'alarm' : 'check'}
                    </span>
                    {isPending ? sale.dueDate || 'Vence en 3 días' : sale.paymentMethod.toUpperCase()}
                  </span>
                </div>
              </div>

              <div
                className="bg-surface-container-low rounded-lg p-2.5 text-xs font-body text-on-surface-variant flex items-center gap-2 cursor-pointer"
                onClick={() => onViewSaleDetail(sale.id)}
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary flex-shrink-0">
                  inventory_2
                </span>
                <span className="truncate">{sale.itemsSummary}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-label text-on-surface-variant">
                  {sale.deliveryPoint}
                </span>

                <div className="flex items-center gap-1.5">
                  {isPending ? (
                    <>
                      <a
                        href={`https://wa.me/?text=Hola%20${encodeURIComponent(sale.clientName)},%20le%20escribimos%20de%20AgroFinanzas%20para%20coordinar%20el%20pago%20pendiente%20de%20S/.${sale.amount.toFixed(2)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-label flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[15px] text-primary">chat</span>
                        <span>Recordar</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => onOpenPaymentModal(sale.clientName, sale.amount)}
                        className="h-8 px-3 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-fixed-dim text-xs font-label font-bold flex items-center gap-1 transition-colors active:scale-95 shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">currency_exchange</span>
                        <span>Registrar Pago</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href={`https://wa.me/?text=Hola%20${encodeURIComponent(sale.clientName)},%20adjunto%20el%20recibo%20de%20su%20compra%20por%20S/.${sale.amount.toFixed(2)}.`}
                        target="_blank"
                        rel="noreferrer"
                        className="h-8 px-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant text-xs font-label flex items-center gap-1 transition-colors"
                        title="Compartir recibo por WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[15px] text-primary">share</span>
                        <span>WhatsApp</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => onViewSaleDetail(sale.id)}
                        className="w-8 h-8 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface-variant flex items-center justify-center transition-colors"
                        title="Ver detalle"
                      >
                        <span className="material-symbols-outlined text-[16px]">more_horiz</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner Informativo */}
      <div className="rounded-xl bg-secondary-container/60 p-4 flex items-center gap-3 mt-2 border border-secondary/20">
        <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-tertiary flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">energy_savings_leaf</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-headline font-semibold text-xs text-on-surface">
            Cierre de ventas semanal
          </span>
          <span className="text-[11px] font-body text-on-surface-variant leading-tight">
            Las liquidaciones automáticas de Yape y Plin se consolidarán mañana domingo a las 6:00 PM.
          </span>
        </div>
      </div>
    </div>
  );
};
