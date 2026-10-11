import React, { useState } from 'react';

interface CalendarScreenProps {
  onBack: () => void;
  onOpenNewSale: () => void;
  onOpenNewExpense: () => void;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  onBack,
  onOpenNewSale,
  onOpenNewExpense,
}) => {
  const [viewMode, setViewMode] = useState<'mes' | 'semana'>('mes');
  const [selectedDay, setSelectedDay] = useState<number>(24);
  const [fletePaid, setFletePaid] = useState<boolean>(false);
  const [showProgramModal, setShowProgramModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 gap-5 max-w-lg mx-auto">
      {/* Selector de Período y Alternador de Vista */}
      <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="Mes anterior"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="flex flex-col">
              <span className="font-headline font-bold text-lg text-on-surface tracking-tight">
                Octubre 2024
              </span>
              <span className="text-[11px] font-label font-medium text-tertiary">
                Campaña de Primavera
              </span>
            </div>
            <button
              aria-label="Mes siguiente"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>

          <div className="bg-surface-container-highest p-1 rounded-lg flex items-center gap-1 text-xs font-label">
            <button
              className={`px-2.5 py-1 rounded transition-all ${
                viewMode === 'mes'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant font-medium'
              }`}
              onClick={() => setViewMode('mes')}
              type="button"
            >
              Mes
            </button>
            <button
              className={`px-2.5 py-1 rounded transition-all ${
                viewMode === 'semana'
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-xs'
                  : 'text-on-surface-variant font-medium'
              }`}
              onClick={() => setViewMode('semana')}
              type="button"
            >
              Semana
            </button>
          </div>
        </div>

        {/* Leyenda de colores */}
        <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-label text-on-surface-variant border-t border-outline-variant/20">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
            <span>Cobros / Ingresos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container inline-block" />
            <span>Cosecha / Entrega</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-error inline-block" />
            <span>Pagos / Fletes</span>
          </div>
        </div>
      </div>

      {/* Vista Calendario */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-outline-variant/30">
        <div className="grid grid-cols-7 text-center text-xs font-label font-semibold text-on-surface-variant mb-1">
          <span>L</span>
          <span>M</span>
          <span>M</span>
          <span>J</span>
          <span>V</span>
          <span>S</span>
          <span>D</span>
        </div>

        <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-label">
          {/* Calendar days simulation */}
          <div className="py-1.5 text-outline-variant opacity-40">30</div>
          {[
            { day: 1, dots: ['bg-primary'] },
            { day: 2, dots: [] },
            { day: 3, dots: ['bg-tertiary-container'] },
            { day: 4, dots: ['bg-error'] },
            { day: 5, dots: [] },
            { day: 6, dots: ['bg-primary'] },
            { day: 7, dots: [] },
            { day: 8, dots: ['bg-tertiary-container'] },
            { day: 9, dots: [] },
            { day: 10, dots: ['bg-primary'] },
            { day: 11, dots: ['bg-error'] },
            { day: 12, dots: [] },
            { day: 13, dots: ['bg-tertiary-container'] },
            { day: 14, dots: [] },
            { day: 15, dots: ['bg-primary', 'bg-error'] },
            { day: 16, dots: [] },
            { day: 17, dots: ['bg-tertiary-container'] },
            { day: 18, dots: [] },
            { day: 19, dots: ['bg-primary'] },
            { day: 20, dots: [] },
            { day: 21, dots: [] },
            { day: 22, dots: ['bg-tertiary-container'] },
            { day: 23, dots: ['bg-primary'] },
            { day: 24, dots: ['bg-tertiary-container', 'bg-primary', 'bg-error'], selected: true },
            { day: 25, dots: ['bg-error'] },
            { day: 26, dots: ['bg-tertiary-container'] },
            { day: 27, dots: ['bg-primary'] },
            { day: 28, dots: [] },
            { day: 29, dots: ['bg-tertiary-container'] },
            { day: 30, dots: [] },
            { day: 31, dots: ['bg-primary'] },
          ].map((d) => {
            const isSelected = selectedDay === d.day;
            return (
              <div
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className="py-1.5 flex flex-col items-center cursor-pointer transition-transform active:scale-90"
              >
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full ${
                    isSelected
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {d.day}
                </span>
                <div className="flex gap-0.5 mt-0.5 h-1.5">
                  {d.dots.map((dotColor, idx) => (
                    <span key={idx} className={`w-1 h-1 rounded-full ${dotColor}`} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Foto de Campo / Clima */}
      <div className="relative w-full h-24 rounded-xl overflow-hidden shadow-sm flex items-end p-3 bg-secondary-container border border-outline-variant/30">
        <img
          className="absolute inset-0 w-full h-full object-cover opacity-85"
          alt="Valle Central"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6QaGqADYIY0g9heW_U1TLFD7I7h0csCe2NeehaxySXON5w0_8U3Q8xL4StoGeiy4-deQoustZztzQe67_TApNXDh1kBdYbsUtwEMJFxmmLe7UUeSOQyGOG3QSsKwNnviVNP-b6dq0I7hH6E1VNKtF5eTB1mHDUa-orsoSwuy_J7BnyvxzChpYLk4w6MNCe2BCOCv8hEXdZhfa3nNpLAi9Qo0YX1qcSFIgJz_PF7w7JKp9CCHqjoCe7g"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/85 via-on-surface/30 to-transparent" />
        <div className="relative z-10 flex items-center justify-between w-full text-inverse-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">sunny</span>
            <span className="text-xs font-label font-semibold">22°C Soleado en Valle Central</span>
          </div>
          <span className="text-[11px] font-label bg-surface/30 backdrop-blur-md px-2 py-0.5 rounded-full text-inverse-on-surface">
            Óptimo para cosecha
          </span>
        </div>
      </div>

      {/* Resumen del Día Seleccionado */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 rounded-full bg-primary" />
            <h2 className="font-headline font-bold text-lg text-on-surface tracking-tight">
              Jueves, {selectedDay} de Octubre
            </h2>
          </div>
          <span className="text-xs font-label font-bold text-primary bg-primary-fixed/50 px-2.5 py-1 rounded-full">
            4 Actividades
          </span>
        </div>

        {/* 1. Entregas y Cosecha */}
        <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span className="material-symbols-outlined text-[18px]">agriculture</span>
              </div>
              <span className="font-headline font-semibold text-sm text-on-surface">Cosecha y Entregas</span>
            </div>
            <span className="text-[11px] font-label font-bold text-tertiary">En Ruta</span>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[22px]">egg</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-label font-bold text-on-surface">15 jabas de huevo de campo</span>
                <span className="text-[11px] font-label text-on-surface-variant">Feria Dominical Central • 07:00 AM</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          </div>

          <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">nutrition</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-label font-bold text-on-surface">40 kg palta Hass seleccionada</span>
                <span className="text-[11px] font-label text-on-surface-variant">Bodega Don Lucho • 10:30 AM</span>
              </div>
            </div>
            <span className="text-[11px] font-label font-semibold text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded">
              Pendiente
            </span>
          </div>
        </div>

        {/* 2. Cobro por vencer */}
        <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-[18px]">payments</span>
              </div>
              <span className="font-headline font-semibold text-sm text-on-surface">Cobro por Vencer</span>
            </div>
            <span className="text-[11px] font-label font-bold text-error bg-error-container/60 px-2 py-0.5 rounded">
              Vence Hoy
            </span>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg flex flex-col gap-3 border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-label font-bold text-on-surface">Restaurante Sabores del Valle</span>
                <span className="text-[11px] font-label text-on-surface-variant">Factura #0192 • Lote Palta y Hortalizas</span>
              </div>
              <span className="font-headline font-bold text-base text-primary">S/. 216.00</span>
            </div>
            <a
              className="w-full py-2.5 px-3 rounded-lg bg-primary text-on-primary font-label text-xs font-bold flex items-center justify-center gap-2 hover:bg-opacity-95 active:scale-[0.99] transition-all shadow-xs"
              href="https://wa.me/51984221094?text=Hola%20Don%20Sabores%20del%20Valle,%20le%20saludamos%20de%20AgroFinanzas%20recordando%20el%20cobro%20programado%20de%20hoy%20por%20S/.%20216.00"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Cobrar por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3. Pago de servicio */}
        <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
              <span className="font-headline font-semibold text-sm text-on-surface">Pago de Servicio</span>
            </div>
            <span className="text-[11px] font-label font-bold text-on-surface-variant">Flete Diario</span>
          </div>
          <div className="bg-surface-container-lowest p-3 rounded-lg flex items-center justify-between border border-outline-variant/20">
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-label font-bold text-on-surface">Flete de camión interprovincial</span>
              <span className="text-[11px] font-label text-on-surface-variant">Transportes Don Teófilo • 04:00 PM</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-headline font-bold text-base text-error">- S/. 180.00</span>
              <button
                className={`text-[11px] font-label font-bold transition-colors ${
                  fletePaid ? 'text-primary' : 'text-primary hover:underline'
                }`}
                onClick={() => setFletePaid(true)}
                type="button"
              >
                {fletePaid ? '✓ Pagado' : 'Marcar Pagado'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Próximos días clave (Timeline) */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-base text-on-surface">Próximos días clave</h3>
          <span className="text-xs font-label text-on-surface-variant">Semana 43</span>
        </div>

        <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-4 border border-outline-variant/30">
          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold flex items-center justify-center">
                25
              </span>
              <div className="w-0.5 h-12 bg-outline-variant/40 mt-1" />
            </div>
            <div className="flex-1 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label font-bold text-on-surface">Viernes • Pago Abono Orgánico</span>
                <span className="text-[11px] font-label font-bold text-error">- S/. 340.00</span>
              </div>
              <span className="text-[11px] font-label text-on-surface-variant">
                Entrega de 12 sacos de compost en parcela norte.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3 relative">
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold flex items-center justify-center">
                26
              </span>
              <div className="w-0.5 h-12 bg-outline-variant/40 mt-1" />
            </div>
            <div className="flex-1 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label font-bold text-on-surface">Sábado • Cosecha Mandarinas</span>
                <span className="text-[11px] font-label font-bold text-tertiary">30 Cajas</span>
              </div>
              <span className="text-[11px] font-label text-on-surface-variant">
                Recojo de cuadrilla 06:00 AM para mercado mayorista.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold flex items-center justify-center">
                27
              </span>
            </div>
            <div className="flex-1 bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label font-bold text-on-surface">Domingo • Cobro Feria de Productores</span>
                <span className="text-[11px] font-label font-bold text-primary">+ S/. 890.00</span>
              </div>
              <span className="text-[11px] font-label text-on-surface-variant">
                Venta directa de hortalizas y huevos frescos.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botón Programar */}
      <div className="pt-2">
        <button
          onClick={() => setShowProgramModal(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-headline font-semibold text-base flex items-center justify-center gap-2.5 shadow-md hover:bg-opacity-95 active:scale-[0.99] transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          <span>+ Programar Cobro / Entrega</span>
        </button>
      </div>

      {showProgramModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-surface rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4 border border-outline-variant/30 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h4 className="font-headline font-bold text-base text-on-surface">Programar Actividad</h4>
              <button
                type="button"
                onClick={() => setShowProgramModal(false)}
                className="w-7 h-7 flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              ¿Qué tipo de actividad deseas registrar para el calendario del fundo?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowProgramModal(false);
                  onOpenNewSale();
                }}
                className="p-3 rounded-xl bg-primary text-on-primary font-bold text-xs flex flex-col items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-2xl">point_of_sale</span>
                <span>Entrega / Cobro</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowProgramModal(false);
                  onOpenNewExpense();
                }}
                className="p-3 rounded-xl bg-surface-container text-on-surface font-bold text-xs flex flex-col items-center gap-1.5 hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-2xl text-tertiary">local_shipping</span>
                <span>Pago / Flete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
