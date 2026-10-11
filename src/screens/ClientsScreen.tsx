import React, { useState } from 'react';
import { Client } from '../data/mockData';

interface ClientsScreenProps {
  clients: Client[];
  onOpenNewClient: () => void;
  onViewClientDetail: (clientId: string) => void;
  onOpenPaymentModal: (clientName: string, amount: number) => void;
  onOpenNewSale: () => void;
}

export const ClientsScreen: React.FC<ClientsScreenProps> = ({
  clients,
  onOpenNewClient,
  onViewClientDetail,
  onOpenPaymentModal,
  onOpenNewSale,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredClients = clients.filter((cli) => {
    const matchesSearch =
      cli.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cli.phone.includes(searchQuery) ||
      cli.address.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'todos') return true;
    if (activeFilter === 'pendiente') return cli.status === 'pendiente';
    if (activeFilter === 'mayoristas') return cli.type === 'restaurante' || cli.type === 'mercado';
    if (activeFilter === 'bodegas') return cli.type === 'bodega';
    if (activeFilter === 'particulares') return cli.type === 'particular';
    return true;
  });

  const totalPorCobrar = clients
    .filter((c) => c.status === 'pendiente')
    .reduce((acc, c) => acc + c.debtAmount, 0);

  const pendingCount = clients.filter((c) => c.status === 'pendiente').length;

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto">
      {/* Dynamic notification banner for agro collections */}
      <div className="px-4 pt-3 pb-1">
        <div className="bg-primary/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-2 text-on-surface border border-primary/20">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="material-symbols-outlined text-primary text-[20px] flex-shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              eco
            </span>
            <p className="text-xs font-label leading-tight truncate">
              Cosecha de palta y quesos frescos al día.{' '}
              <strong className="font-semibold text-primary">{pendingCount} cobros sugeridos hoy</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveFilter('pendiente')}
            className="text-xs font-bold font-label text-primary hover:text-on-surface transition-colors flex-shrink-0"
          >
            Ver
          </button>
        </div>
      </div>

      {/* Resumen de Cartera y Cobranzas */}
      <section className="px-4 pt-3 pb-2">
        <div className="grid grid-cols-12 gap-2.5">
          {/* Total por Cobrar */}
          <div className="col-span-12 bg-surface-container-low rounded-xl p-3.5 flex flex-col justify-between relative overflow-hidden shadow-sm border border-outline-variant/30">
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-error/5 rounded-full pointer-events-none" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-error-container/60 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined text-[19px]">pending_actions</span>
                </div>
                <div>
                  <span className="text-xs font-label text-on-surface-variant font-medium">
                    Total por Cobrar
                  </span>
                  <span className="block text-[11px] font-label text-on-surface-variant/80">
                    {pendingCount} clientes pendientes
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[11px] font-bold font-label">
                Atención
              </span>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-headline font-bold text-2xl text-on-surface tracking-tight">
                S/. {totalPorCobrar > 0 ? totalPorCobrar.toFixed(2) : '680.00'}
              </span>
              <button
                type="button"
                onClick={() => setActiveFilter('pendiente')}
                className="text-xs font-label text-primary font-bold hover:underline flex items-center gap-0.5"
              >
                <span>Gestionar</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Cobrado este mes */}
          <div className="col-span-7 bg-surface-container-low rounded-xl p-3 flex flex-col justify-between shadow-sm border border-outline-variant/20">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[17px] text-primary">payments</span>
              <span className="text-[11px] font-label font-medium truncate">Cobrado este mes</span>
            </div>
            <div className="mt-2">
              <p className="font-headline font-semibold text-lg text-on-surface leading-tight">
                S/. 6,560.00
              </p>
              <div className="flex items-center gap-1 mt-0.5 text-primary text-[10px] font-label font-bold">
                <span className="material-symbols-outlined text-[13px]">trending_up</span>
                <span>+18% vs mes ant.</span>
              </div>
            </div>
          </div>

          {/* Clientes Activos */}
          <div className="col-span-5 bg-surface-container-low rounded-xl p-3 flex flex-col justify-between shadow-sm border border-outline-variant/20">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[17px] text-tertiary">groups</span>
              <span className="text-[11px] font-label font-medium truncate">Clientes</span>
            </div>
            <div className="mt-2">
              <p className="font-headline font-semibold text-lg text-on-surface leading-tight">
                {clients.length} <span className="text-xs font-normal text-on-surface-variant">activos</span>
              </p>
              <span className="text-[10px] font-label text-on-surface-variant block mt-0.5">
                Campo y mercado
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Buscador y Botón Acción Principal */}
      <section className="px-4 py-2 flex items-center gap-2">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cliente, bodega, feria..."
            className="w-full bg-surface-container-low text-on-surface placeholder-on-surface-variant/70 text-xs font-label rounded-xl pl-9 pr-3 py-3 outline-none focus:bg-surface-container border border-outline-variant/30 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={onOpenNewClient}
          className="flex-shrink-0 bg-primary hover:bg-primary-container text-on-primary min-h-[44px] px-3.5 rounded-xl font-label text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[19px]">person_add</span>
          <span>Nuevo</span>
        </button>
      </section>

      {/* Filtros Rápidos */}
      <section className="py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 px-4">
        {[
          { id: 'todos', label: `Todos (${clients.length})` },
          { id: 'pendiente', label: `Con saldo pendiente (${pendingCount})`, isAlert: true },
          { id: 'mayoristas', label: 'Mayoristas' },
          { id: 'bodegas', label: 'Bodegas y Puestos' },
          { id: 'particulares', label: 'Particulares' },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActiveFilter(f.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-label whitespace-nowrap transition-all flex items-center gap-1 ${
              activeFilter === f.id
                ? 'bg-primary text-on-primary font-bold shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant hover:text-on-surface font-semibold'
            }`}
          >
            {f.isAlert && <span className="w-1.5 h-1.5 rounded-full bg-error" />}
            <span>{f.label}</span>
          </button>
        ))}
      </section>

      {/* Lista de Clientes */}
      <section className="px-4 pt-2 flex flex-col gap-3">
        {filteredClients.map((client) => {
          const isPending = client.status === 'pendiente';

          return (
            <article
              key={client.id}
              className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 relative border border-outline-variant/30"
            >
              <div
                className="flex items-start justify-between gap-2 cursor-pointer"
                onClick={() => onViewClientDetail(client.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-headline font-bold text-base ${
                      client.type === 'restaurante'
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                        : client.type === 'mercado'
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : client.type === 'bodega'
                        ? 'bg-surface-container-highest text-on-surface-variant'
                        : 'bg-tertiary-container/30 text-tertiary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {client.type === 'restaurante'
                        ? 'restaurant'
                        : client.type === 'mercado'
                        ? 'storefront'
                        : client.type === 'bodega'
                        ? 'shopping_bag'
                        : 'person'}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-headline font-bold text-sm text-on-surface truncate">
                        {client.name}
                      </h3>
                      {client.isGold && (
                        <span
                          className="material-symbols-outlined text-[15px] text-tertiary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          title="Cliente Frecuente"
                        >
                          star
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] font-label text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <span>{client.typeLabel}</span>
                      <span>•</span>
                      <span className="text-on-surface-variant/90">{client.phone}</span>
                    </p>
                  </div>
                </div>

                {!isPending && (
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-[10px] font-bold font-label flex-shrink-0 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Al día
                  </span>
                )}
              </div>

              {/* Detalle de Deuda si pendiente */}
              {isPending && (
                <div className="bg-error-container/30 rounded-lg p-2.5 flex items-center justify-between border border-error/20">
                  <div>
                    <span className="text-[10px] font-label uppercase tracking-wider text-error font-bold block">
                      {client.dueDate || 'Saldo Pendiente'}
                    </span>
                    <span className="text-xs font-label text-on-surface-variant">
                      {client.debtDescription || 'Despacho reciente'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-headline font-bold text-base text-error">
                      S/. {client.debtAmount.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Detalle de Consumo si al día */}
              {!isPending && (
                <div className="bg-surface-container rounded-lg p-2.5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-label text-on-surface-variant font-medium">
                      Compras este mes
                    </span>
                    <span className="font-headline font-semibold text-sm text-on-surface">
                      S/. {client.totalPurchased > 0 ? client.totalPurchased.toFixed(2) : '820.00'}
                    </span>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="text-[10px] font-label text-on-surface-variant font-medium">
                      {client.lastOrderDate ? 'Último pedido' : 'Frecuencia'}
                    </span>
                    <span className="text-xs font-label text-primary font-bold">
                      {client.lastOrderDate || client.frequency}
                    </span>
                  </div>
                </div>
              )}

              {/* Acciones Rápidas */}
              <div className="grid grid-cols-2 gap-2 pt-0.5">
                {isPending ? (
                  <>
                    <a
                      href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(
                        client.name
                      )},%20le%20escribimos%20de%20AgroFinanzas%20para%20coordinar%20el%20pago%20pendiente%20de%20S/.${client.debtAmount.toFixed(
                        2
                      )}.%20¡Muchas%20gracias!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[42px] px-3 rounded-lg bg-surface-container flex items-center justify-center gap-1.5 text-xs font-label font-bold text-primary hover:bg-surface-container-high transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px]">chat</span>
                      <span>Cobrar WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onOpenPaymentModal(client.name, client.debtAmount)}
                      className="min-h-[42px] px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center gap-1.5 text-xs font-label font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px]">price_check</span>
                      <span>Registrar Cobro</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1">
                      <a
                        href={`tel:${client.phone}`}
                        className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        title="Llamar"
                      >
                        <span className="material-symbols-outlined text-[18px]">call</span>
                      </a>
                      <a
                        href={`https://wa.me/${client.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                        title="WhatsApp"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={onOpenNewSale}
                      className="min-h-[38px] px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center gap-1 text-xs font-label font-bold transition-colors"
                    >
                      <span className="material-symbols-outlined text-[17px]">add_shopping_cart</span>
                      <span>Nuevo Pedido</span>
                    </button>
                  </>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
