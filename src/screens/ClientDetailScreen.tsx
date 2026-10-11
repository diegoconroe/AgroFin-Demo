import React, { useState } from 'react';
import { Client } from '../data/mockData';

interface ClientDetailScreenProps {
  client: Client;
  onBack: () => void;
  onOpenPaymentModal: (clientName: string, amount: number) => void;
  onOpenNewSale: () => void;
}

export const ClientDetailScreen: React.FC<ClientDetailScreenProps> = ({
  client,
  onBack,
  onOpenPaymentModal,
  onOpenNewSale,
}) => {
  const [activeTab, setActiveTab] = useState<'pendientes' | 'todos'>('pendientes');
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);

  const debt = client.debtAmount || 216.00;
  const creditLimit = client.creditLimit || 600.00;
  const usedPercent = Math.min(100, Math.round((debt / creditLimit) * 100));
  const availableCredit = Math.max(0, creditLimit - debt);

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-1 space-y-5 max-w-lg mx-auto">
      {/* Tarjeta Principal del Cliente */}
      <div className="relative bg-surface-container-low rounded-xl p-5 shadow-sm overflow-hidden border border-outline-variant/30">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full pointer-events-none" />
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary font-headline font-bold text-xl shadow-xs">
              {client.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold mb-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">restaurant</span>
                {client.typeLabel || 'Gastronómico Mayorista'}
              </div>
              <h2 className="font-headline font-bold text-lg text-on-surface leading-tight">
                {client.name}
              </h2>
              <p className="text-xs text-on-surface-variant font-label mt-0.5">RUC: 20601928374</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 rounded-full text-xs font-bold shrink-0">
            <span className="material-symbols-outlined text-[15px]">workspace_premium</span>
            Oro
          </div>
        </div>

        {/* Contacto & Ubicación */}
        <div className="mt-4 pt-3.5 border-t border-outline-variant/30 flex flex-col gap-2 text-xs text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-primary">person</span>
            <span className="font-semibold text-on-surface">Chef Carlos Meza</span>
            <span className="text-on-surface-variant">(Administrador)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[17px] text-secondary">location_on</span>
            <span className="text-on-surface-variant">{client.address}</span>
          </div>
        </div>

        {/* Acciones Rápidas de Comunicación */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a
            className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-surface-container text-on-surface font-semibold text-xs transition-colors active:bg-surface-container-highest"
            href={`tel:${client.phone}`}
          >
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            Llamar ({client.phone.slice(0, 8)}...)
          </a>
          <a
            className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-primary-container/40 text-on-surface font-semibold text-xs transition-colors active:bg-primary-container"
            href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=Estimado%20Chef%20Carlos%2C%20un%20saludo%20desde%20AgroFinanzas...`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
            WhatsApp Directo
          </a>
        </div>
      </div>

      {/* Resumen Financiero */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-headline font-semibold text-sm text-on-surface tracking-tight">
            Estado de Cuenta
          </h3>
          <span className="text-[11px] font-label text-on-surface-variant">Actualizado hoy</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {/* Tarjeta Deuda Pendiente */}
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-sm border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-medium text-on-surface-variant block mb-0.5">
                  Saldo por Cobrar
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-semibold text-on-surface">S/.</span>
                  <span className="text-2xl font-headline font-bold text-on-surface">
                    {debt.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {client.dueDate || 'Vence en 3 días (27 Oct)'}
              </div>
            </div>

            {/* Indicador de Crédito */}
            <div className="mt-4 pt-3 border-t border-outline-variant/20">
              <div className="flex justify-between text-[11px] font-medium text-on-surface-variant mb-1.5">
                <span>
                  Límite Utilizado: S/. {debt.toFixed(2)} / S/. {creditLimit.toFixed(2)}
                </span>
                <span className="font-semibold text-on-surface">{usedPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${usedPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Métricas Secundarias */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-surface-container-low rounded-xl p-3.5 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-secondary text-xs mb-1">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Histórico Total</span>
              </div>
              <p className="font-headline font-bold text-base text-on-surface">
                S/. {client.totalPurchased > 0 ? client.totalPurchased.toFixed(2) : '8,450.00'}
              </p>
              <span className="text-[10px] text-primary font-semibold">18 pedidos completados</span>
            </div>
            <div className="bg-surface-container-low rounded-xl p-3.5 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-secondary text-xs mb-1">
                <span className="material-symbols-outlined text-[16px]">credit_score</span>
                <span>Crédito Disponible</span>
              </div>
              <p className="font-headline font-bold text-base text-on-surface">
                S/. {availableCredit.toFixed(2)}
              </p>
              <span className="text-[10px] text-on-surface-variant font-medium">
                De S/. {creditLimit.toFixed(2)} total
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de Acción Primaria */}
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setShowReminderModal(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-sm active:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-[19px]">send</span>
          Enviar Recordatorio por WhatsApp
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenPaymentModal(client.name, debt)}
            className="w-full py-3 px-3 rounded-xl bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 active:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-[17px] text-primary">payments</span>
            Registrar Pago / Abono
          </button>
          <button
            type="button"
            onClick={onOpenNewSale}
            className="w-full py-3 px-3 rounded-xl bg-surface-container text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 active:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-[17px] text-tertiary">add_shopping_cart</span>
            + Nuevo Pedido
          </button>
        </div>
      </div>

      {/* Sección Compras y Comprobantes */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-semibold text-sm text-on-surface">Movimientos y Facturación</h3>
        </div>

        {/* Pestañas Filtro */}
        <div className="flex p-1 bg-surface-container rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('pendientes')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
              activeTab === 'pendientes'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant'
            }`}
          >
            Pendientes (1)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('todos')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all text-center ${
              activeTab === 'todos'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant'
            }`}
          >
            Historial Completo (3)
          </button>
        </div>

        {/* Lista de Compras */}
        <div className="space-y-2.5">
          {/* Item 1: Pendiente */}
          <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[17px]">pending_actions</span>
                </div>
                <div>
                  <span className="font-headline font-semibold text-xs text-on-surface">Venta #0408</span>
                  <p className="text-[11px] text-on-surface-variant">20 Octubre, 2024</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-headline font-bold text-sm text-error">S/. 216.00</span>
                <span className="block text-[10px] font-bold text-tertiary">Vence 27 Oct</span>
              </div>
            </div>
            <div className="bg-surface-container p-2.5 rounded-lg flex items-center justify-between text-xs text-on-surface">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-primary">inventory_2</span>
                <span>8 Moldes Queso Andino Madurado</span>
              </div>
              <span className="font-semibold text-[11px]">8 un.</span>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-tertiary">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
                Crédito 7 días activo
              </span>
              <button
                type="button"
                onClick={() => onOpenPaymentModal(client.name, 216)}
                className="text-xs font-bold text-primary hover:underline"
              >
                Cobrar ahora
              </button>
            </div>
          </div>

          {/* Historial adicional si tab es 'todos' */}
          {activeTab === 'todos' && (
            <>
              <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[17px]">check_circle</span>
                    </div>
                    <div>
                      <span className="font-headline font-semibold text-xs text-on-surface">Venta #0392</span>
                      <p className="text-[11px] text-on-surface-variant">12 Octubre, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline font-bold text-sm text-on-surface">S/. 207.00</span>
                    <span className="block text-[10px] text-primary font-bold">PAGADO</span>
                  </div>
                </div>
                <div className="bg-surface-container p-2.5 rounded-lg flex items-center justify-between text-xs text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">eco</span>
                    <span>20 kg Palta Hass + 2 jabas huevos</span>
                  </div>
                  <span className="font-semibold text-[11px]">Mix</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Cancelado vía Transferencia BCP</span>
                  <span className="text-[10px] text-secondary">Op. #948271</span>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[17px]">check_circle</span>
                    </div>
                    <div>
                      <span className="font-headline font-semibold text-xs text-on-surface">Venta #0375</span>
                      <p className="text-[11px] text-on-surface-variant">02 Octubre, 2024</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-headline font-bold text-sm text-on-surface">S/. 270.00</span>
                    <span className="block text-[10px] text-primary font-bold">PAGADO</span>
                  </div>
                </div>
                <div className="bg-surface-container p-2.5 rounded-lg flex items-center justify-between text-xs text-on-surface">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-primary">inventory_2</span>
                    <span>10 Moldes Queso Fresco</span>
                  </div>
                  <span className="font-semibold text-[11px]">10 un.</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Cancelado vía Yape</span>
                  <span className="text-[10px] text-secondary">Op. #331802</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Acuerdos y Condiciones */}
      <div className="bg-surface-container-low rounded-xl p-4 shadow-sm space-y-3 border border-outline-variant/30">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[19px] text-tertiary">tune</span>
          <h3 className="font-headline font-semibold text-sm text-on-surface">Condiciones y Preferencias</h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5 text-xs">
          <div className="flex items-start gap-2.5 bg-surface-container p-3 rounded-lg">
            <span className="material-symbols-outlined text-[17px] text-primary shrink-0 mt-0.5">
              local_shipping
            </span>
            <div>
              <span className="font-bold text-on-surface block">Día y horario de entrega</span>
              <p className="text-on-surface-variant text-[11px] mt-0.5">
                Jueves temprano (antes de las 9:00 AM) para abastecimiento del fin de semana.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-surface-container p-3 rounded-lg">
            <span className="material-symbols-outlined text-[17px] text-tertiary shrink-0 mt-0.5">
              verified
            </span>
            <div>
              <span className="font-bold text-on-surface block">Exigencias de Calidad</span>
              <p className="text-on-surface-variant text-[11px] mt-0.5">
                Queso madurado en molde entero protegido y palta firme con punto óptimo para maduración en cocina.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 bg-surface-container p-3 rounded-lg">
            <span className="material-symbols-outlined text-[17px] text-secondary shrink-0 mt-0.5">
              handshake
            </span>
            <div>
              <span className="font-bold text-on-surface block">Línea de Crédito</span>
              <p className="text-on-surface-variant text-[11px] mt-0.5">
                Plazo acordado de 7 días naturales por despacho con límite rotativo de S/. 600.00.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Recordatorio WhatsApp */}
      {showReminderModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 border border-outline-variant/30 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-container/40 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                </div>
                <span className="font-headline font-bold text-sm text-on-surface">Recordatorio Amable</span>
              </div>
              <button
                type="button"
                className="w-7 h-7 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container"
                onClick={() => setShowReminderModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant/30 text-xs text-on-surface space-y-1.5">
              <p className="font-bold text-primary">Mensaje predeterminado:</p>
              <p className="italic text-on-surface-variant leading-relaxed">
                "Hola estimado Chef Carlos, un cordial saludo de AgroFinanzas. Le adjuntamos el detalle del pedido #0408 por S/. {debt.toFixed(2)} que vence este 27 de octubre. ¡Muchas gracias por su preferencia!"
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-lg bg-surface-container text-on-surface font-semibold text-xs"
                onClick={() => setShowReminderModal(false)}
              >
                Cancelar
              </button>
              <a
                className="flex-1 py-2.5 rounded-lg bg-primary text-on-primary font-semibold text-xs flex items-center justify-center gap-1.5"
                href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=Hola%20estimado%20Chef%20Carlos%2C%20un%20cordial%20saludo%20de%20AgroFinanzas.%20Le%20adjuntamos%20el%20detalle%20del%20pedido%20%230408%20por%20S%2F.%20${debt.toFixed(2)}%20que%20vence%20este%2027%20de%20octubre.%20%C2%A1Muchas%20gracias%20por%20su%20preferencia!`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setShowReminderModal(false)}
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                Enviar
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
