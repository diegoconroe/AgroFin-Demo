import React from 'react';
import { Sale, Expense } from '../data/mockData';

interface HomeScreenProps {
  onOpenNewSale: () => void;
  onOpenNewExpense: () => void;
  onOpenReports: () => void;
  onNavigateTab: (tab: string) => void;
  onViewSaleDetail: (saleId: string) => void;
  sales: Sale[];
  expenses: Expense[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onOpenNewSale,
  onOpenNewExpense,
  onOpenReports,
  onNavigateTab,
  onViewSaleDetail,
  sales,
  expenses,
}) => {
  return (
    <div className="flex flex-col w-full px-4 py-3 gap-5 max-w-lg mx-auto pb-24">
      {/* Greeting Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm flex-shrink-0 border border-primary/20">
            <img
              className="w-full h-full object-cover"
              alt="Don Manuel Quispe"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7TNIcIajDakWMeL3vwfYoe9yJndalbNn8dxjsVOSEf8Hp0dsa31MaxJR_FZkCzsxzN9tqlCEPqFOuIGjXNYgbPmRtChEQ6CV6w3Uer7q3HluabJhKSey6Do-XVG7VnbCKW0fWVW1sZ_wRCsc4X5z4gjNjiD6afwv_FGmK8Krikjvc59AbaZeffiY37uFjFCvLeOi0gp4xleBuT0gFljApq_9ULtFM25aR_91rUoNY2cWK9J2jNeaWXQ"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full ring-2 ring-surface" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant font-semibold">
                Fundo San Isidro
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-container" />
            </div>
            <h1 className="font-headline font-bold text-xl text-on-surface leading-tight">
              ¡Buen día, Don Manuel!
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded-full shadow-xs text-tertiary">
          <span className="material-symbols-outlined text-[16px]">wb_sunny</span>
          <span className="text-xs font-label font-bold text-on-surface">22°C</span>
        </div>
      </div>

      {/* Balance Neto Card */}
      <div className="bg-surface-container-low rounded-xl p-5 shadow-sm relative overflow-hidden border border-outline-variant/30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-start justify-between mb-2">
          <span className="text-xs font-label uppercase tracking-wide text-on-surface-variant font-medium">
            Balance Neto Disponible
          </span>
          <span className="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            +14.2%
          </span>
        </div>

        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-lg font-headline text-on-surface-variant font-semibold">S/.</span>
          <span className="text-3xl font-headline font-bold text-on-surface tracking-tight">4,850.00</span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 bg-surface-container rounded-lg p-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-[11px] font-label text-on-surface-variant uppercase tracking-wider">
                Ingresos del Mes
              </span>
            </div>
            <span className="text-base font-bold font-headline text-primary">S/. 7,240.00</span>
          </div>
          <div className="flex flex-col pl-3 border-l border-outline-variant/30">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-tertiary" />
              <span className="text-[11px] font-label text-on-surface-variant uppercase tracking-wider">
                Gastos Incurridos
              </span>
            </div>
            <span className="text-base font-bold font-headline text-tertiary">S/. 2,390.00</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Strip */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={onOpenNewSale}
          className="flex-1 min-w-[130px] flex items-center justify-center gap-2 bg-primary text-on-primary px-3.5 py-3 rounded-xl font-label font-bold text-xs shadow-sm hover:opacity-95 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Registrar Venta</span>
        </button>
        <button
          type="button"
          onClick={onOpenNewExpense}
          className="flex-1 min-w-[125px] flex items-center justify-center gap-2 bg-surface-container text-on-surface px-3.5 py-3 rounded-xl font-label font-bold text-xs shadow-xs hover:bg-surface-container-high active:scale-[0.98] transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-tertiary">receipt</span>
          <span>Nuevo Gasto</span>
        </button>
        <button
          type="button"
          onClick={onOpenReports}
          className="flex items-center justify-center gap-1.5 bg-surface-container text-on-surface-variant px-3 py-3 rounded-xl font-label font-bold text-xs shadow-xs hover:text-on-surface active:scale-[0.98] transition-colors flex-shrink-0"
        >
          <span className="material-symbols-outlined text-[18px]">bar_chart</span>
          <span>Reporte</span>
        </button>
      </div>

      {/* Low Stock Alert */}
      <div
        onClick={() => onNavigateTab('productos')}
        className="bg-surface-container-low rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer hover:bg-surface-container transition-colors border border-outline-variant/30"
      >
        <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">inventory_2</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-headline font-bold text-sm text-on-surface truncate">
              2 productos con bajo stock
            </h3>
            <span className="w-2 h-2 rounded-full bg-error flex-shrink-0 animate-pulse" />
          </div>
          <p className="text-xs font-body text-on-surface-variant truncate">
            Huevos de corral: solo 4 jabas restantes en almacén
          </p>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
      </div>

      {/* Weekly Sales Flow Bar Chart */}
      <div className="bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline font-bold text-sm text-on-surface">Flujo de Ventas Semanal</h2>
            <span className="text-[11px] font-label text-on-surface-variant">Promedio: S/. 410 / día</span>
          </div>
          <span className="text-xs font-label font-bold text-primary bg-primary-fixed px-2.5 py-1 rounded-full">
            S/. 2,870 Total
          </span>
        </div>

        <div className="w-full pt-4">
          <div className="flex items-end justify-between gap-2 h-28 px-1">
            {[
              { day: 'Lun', amount: 260, height: '38%', active: false },
              { day: 'Mar', amount: 340, height: '48%', active: false },
              { day: 'Mié', amount: 190, height: '28%', active: false },
              { day: 'Jue', amount: 480, height: '65%', active: false },
              { day: 'Vie', amount: 520, height: '72%', active: false },
              { day: 'Sáb', amount: 680, height: '94%', active: true },
              { day: 'Dom', amount: 400, height: '55%', active: false },
            ].map((col) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span
                  className={`text-[10px] font-label font-bold ${
                    col.active ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  S/.{col.amount}
                </span>
                <div
                  className={`w-full rounded-t-md transition-colors ${
                    col.active ? 'bg-primary shadow-xs' : 'bg-primary-container/40 hover:bg-primary'
                  }`}
                  style={{ height: col.height }}
                />
                <span
                  className={`text-[11px] font-label ${
                    col.active ? 'text-primary font-bold' : 'text-on-surface-variant font-medium'
                  }`}
                >
                  {col.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Movements */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-bold text-base text-on-surface">Últimos Movimientos</h2>
          <button
            type="button"
            onClick={() => onNavigateTab('ventas')}
            className="text-xs font-label font-bold text-primary hover:underline"
          >
            Ver todas
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Card 1: Bodega Don Lucho */}
          <div
            onClick={() => onViewSaleDetail('sale-0412')}
            className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/30 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Palta Hass"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcwJbY8ZWI9EZiD_3wJSmGIG5s-1vshDHOvLayPGw6adqmU2ODNbTC5E3XD6tuO6N6dl4uE4yLcfVfKQ85-HKrLrEwu5H_mLosLYfiZn0bXgNj8VVNctUKqIaw0KNKFiXNy7_OzfNfMFC2GE0L2IomgTdDHho68g3gMZLZywNGO9dq29KO-Gy2-ldTLr0Js_XxlBuBZOGWGJ1S7oTfUhLtLYgJ3MJgynLojs3TD3VEjKkSnP2Xav_YRg"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-headline font-bold text-sm text-on-surface truncate">
                  Bodega Don Lucho
                </span>
                <span className="text-[11px] font-body text-on-surface-variant truncate">
                  10 kg Palta Hass • Hoy 10:30 am
                </span>
                <span className="text-[10px] font-label text-primary font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span> Cobrado vía Yape
                </span>
              </div>
            </div>
            <span className="font-headline font-bold text-sm text-primary flex-shrink-0">+ S/. 85.00</span>
          </div>

          {/* Card 2: Restaurante El Huerto */}
          <div
            onClick={() => onViewSaleDetail('sale-0405')}
            className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/30 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Queso Andino"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0m_GkCExbnz3GQkTJbx3VznGz1p2uMTMN2L9k3kVSZUYKOos85Ps8Os7_mtUannv5wniuytix8JovzrdTz6D2v2w8iK_GrvifONJ1lL1fnB7DwjzGu8enxrZ6u8k-es82sNrdDpSB3NlY3iPivILhHnPtHeefsRJe6WpANGZypU9S6Bn7Im-a5Bre9lmgp6nL89-qp993xpM2fvZbanwVWLnIDAGT7P-6IxOeGExG4lZK8JpNnXVZTg"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-headline font-bold text-sm text-on-surface truncate">
                  Restaurante El Huerto
                </span>
                <span className="text-[11px] font-body text-on-surface-variant truncate">
                  5 Moldes Queso Andino • Ayer
                </span>
                <span className="text-[10px] font-label text-primary font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[12px]">payments</span> En Efectivo
                </span>
              </div>
            </div>
            <span className="font-headline font-bold text-sm text-primary flex-shrink-0">+ S/. 140.00</span>
          </div>

          {/* Card 3: Sra. Carmen */}
          <div
            onClick={() => onViewSaleDetail('sale-0402')}
            className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/30 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img
                  className="w-full h-full object-cover"
                  alt="Huevos de corral"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq37NFuySrcv0jUn0n5phUdBFZQcwhlZfRxHsQ4ngnADOb6kKJk_oH_ClbswZYt39_dck2drnD7iJQPau2tzAlJ6rczhsWnDVqwpksKkuc3aFaL_0-PRrvp6vCBbVMHXQ6iXRsz1wgnevQjpPBfHjNQq7pmZdBiwH8MKsgvaLFbnzL45Sektk55QI8OQv90aeqtjThtjOW9tZ1DjgjBWg-vjaOmbJBv5q93ozAZm5mHZZ7IAqgEAy37A"
                />
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-headline font-bold text-sm text-on-surface truncate">
                  Sra. Carmen
                </span>
                <span className="text-[11px] font-body text-on-surface-variant truncate">
                  2 Jabas Huevos corral • Ayer
                </span>
                <span className="text-[10px] font-label text-tertiary font-semibold flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[12px]">schedule</span> Por cobrar (Pendiente)
                </span>
              </div>
            </div>
            <span className="font-headline font-bold text-sm text-tertiary flex-shrink-0">S/. 110.00</span>
          </div>

          {/* Card 4: Gasto Flete */}
          <div
            onClick={() => onNavigateTab('gastos')}
            className="bg-surface-container-low p-3.5 rounded-xl flex items-center justify-between gap-3 shadow-sm border border-outline-variant/30 cursor-pointer hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-headline font-bold text-sm text-on-surface truncate">
                  Flete y Transporte
                </span>
                <span className="text-[11px] font-body text-on-surface-variant truncate">
                  Mercado Central • 14 Mar
                </span>
                <span className="text-[10px] font-label text-on-surface-variant font-medium flex items-center gap-0.5 mt-0.5">
                  <span className="material-symbols-outlined text-[12px]">receipt_long</span> Gasto Operativo
                </span>
              </div>
            </div>
            <span className="font-headline font-bold text-sm text-error flex-shrink-0">- S/. 45.00</span>
          </div>
        </div>
      </div>

      {/* Advice card */}
      <div className="bg-secondary-container/60 rounded-xl p-4 flex items-center gap-3 border border-secondary/20">
        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 text-on-secondary-container">
          <span className="material-symbols-outlined text-[18px]">lightbulb</span>
        </div>
        <p className="text-xs font-body text-on-secondary-container leading-relaxed">
          <span className="font-bold">Consejo de Don Manuel:</span> Los sábados tu venta de Palta se incrementa un 35%. Asegura abastecimiento para el fin de semana.
        </p>
      </div>
    </div>
  );
};
