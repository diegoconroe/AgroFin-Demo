import React, { useState } from 'react';
import { Product, Client, Sale } from '../data/mockData';

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  clients: Client[];
  onSaveSale: (sale: Partial<Sale>) => void;
}

export const NewSaleModal: React.FC<NewSaleModalProps> = ({
  isOpen,
  onClose,
  products,
  clients,
  onSaveSale,
}) => {
  const [selectedClient, setSelectedClient] = useState<string>('Mercado San José (Puesto 14)');
  const [clientSubtext, setClientSubtext] = useState<string>('Comprador habitual • Sin deudas pendientes');
  
  // Quantities for items
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({
    'prod-1': 15,
    'prod-5': 2,
    'prod-3': 0,
  });

  const [paymentCondition, setPaymentCondition] = useState<'contado' | 'credito'>('contado');
  const [creditDays, setCreditDays] = useState<number>(7);
  const [paymentChannel, setPaymentChannel] = useState<string>('Yape');
  const [notes, setNotes] = useState<string>('');
  const [sendWhatsApp, setSendWhatsApp] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentProducts = products.filter((p) => quantities[p.id] !== undefined || p.id === 'prod-1' || p.id === 'prod-5' || p.id === 'prod-3');

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const calculateSubtotal = () => {
    let sum = 0;
    currentProducts.forEach((prod) => {
      const qty = quantities[prod.id] || 0;
      sum += qty * prod.price;
    });
    return sum;
  };

  const subtotal = calculateSubtotal();
  const discount = 0;
  const total = subtotal - discount;

  const handleSelectClient = (name: string, desc: string) => {
    setSelectedClient(name);
    setClientSubtext(desc);
  };

  const handleSave = (emitReceipt: boolean = false) => {
    const saleItems = currentProducts
      .filter((prod) => (quantities[prod.id] || 0) > 0)
      .map((prod) => ({
        productId: prod.id,
        productName: prod.name,
        unitPrice: prod.price,
        quantity: quantities[prod.id] || 0,
        unit: prod.stockUnit || prod.unit,
        total: (quantities[prod.id] || 0) * prod.price,
        image: prod.image,
      }));

    const summary = saleItems.map((item) => `${item.quantity} ${item.unit} ${item.productName}`).join(' + ');

    onSaveSale({
      clientName: selectedClient,
      clientType: 'Comercial',
      amount: total > 0 ? total : 164.50,
      paymentStatus: paymentCondition === 'contado' ? 'cobrado' : 'pendiente',
      paymentMethod: (paymentChannel.toLowerCase() === 'yape' ? 'yape' : paymentChannel.toLowerCase() === 'plin' ? 'plin' : paymentChannel.toLowerCase() === 'efectivo' ? 'efectivo' : 'bcp') as any,
      itemsSummary: summary || '15 kg Palta Hass + 2 jabas huevos',
      items: saleItems,
      deliveryPoint: 'Despacho Local',
      notes: notes || 'Entregado en feria local',
      creditDays: paymentCondition === 'credito' ? creditDays : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex flex-col justify-end overflow-y-auto pt-8">
      <div className="w-full max-w-lg mx-auto bg-surface-container-lowest rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 pt-3 pb-3 bg-surface-container-low flex flex-col gap-2 border-b border-outline-variant/30 flex-shrink-0">
          <div className="w-12 h-1 bg-outline-variant/60 rounded-full mx-auto" />
          <div className="flex items-start justify-between mt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-[22px]">eco</span>
              </div>
              <div>
                <h2 className="font-headline font-semibold text-lg text-on-surface leading-tight">
                  Anotar Nueva Venta
                </h2>
                <p className="text-xs text-on-surface-variant font-label">
                  Registra una salida de cosecha o pedido fresco
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar modal"
              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-1 pt-1 text-xs font-label text-secondary">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-primary">storefront</span>
              Feria • Despacho Local
            </span>
            <span className="bg-secondary-fixed text-on-secondary-fixed px-2.5 py-0.5 rounded-full font-medium text-[11px]">
              Lote #24-Mayo
            </span>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-5 overflow-y-auto flex-1">
          {/* 1. Cliente Selector */}
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[17px]">person_pin</span>
                Cliente Destino
              </label>
              <span className="text-xs font-semibold text-primary flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[15px]">person_add</span>
                Comprador registrado
              </span>
            </div>

            <div className="w-full bg-surface-container-low rounded-lg p-3 flex items-center justify-between shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-xs flex-shrink-0">
                  {selectedClient.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-on-surface truncate">{selectedClient}</p>
                  <p className="text-[11px] text-on-surface-variant">{clientSubtext}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">check</span>
            </div>

            {/* Frecuentes Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 text-xs no-scrollbar">
              <span className="text-[11px] text-on-surface-variant whitespace-nowrap">Frecuentes:</span>
              {[
                { name: 'Bodega Don Lucho', desc: 'Bodega local • Despacho en campo' },
                { name: 'Restaurante Sabores del Valle', desc: 'Mayorista gastronómico • Crédito activo' },
                { name: 'Mercado San José (Puesto 14)', desc: 'Comprador habitual • Sin deudas' },
                { name: 'Frutería Doña Rosa', desc: 'Puesto de frutas • Pago al contado' },
              ].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => handleSelectClient(c.name, c.desc)}
                  className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                    selectedClient === c.name
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'bg-surface-container text-on-surface-variant hover:bg-primary-fixed hover:text-primary'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </section>

          {/* 2. Detalle de Productos */}
          <section className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[17px]">inventory_2</span>
                Cosecha y Productos
              </label>
              <span className="text-[11px] text-on-surface-variant font-medium">
                {currentProducts.length} disponibles
              </span>
            </div>

            <div className="space-y-2.5">
              {currentProducts.map((prod) => {
                const qty = quantities[prod.id] || 0;
                const totalItem = qty * prod.price;
                return (
                  <div
                    key={prod.id}
                    className="bg-surface-container-low p-3 rounded-lg shadow-sm flex flex-col gap-2.5 border border-outline-variant/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-on-surface truncate">{prod.name}</h4>
                          <p className="text-xs text-on-surface-variant">
                            Precio unit.:{' '}
                            <span className="font-medium text-on-surface">
                              S/. {prod.price.toFixed(2)} / {prod.unit}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-label text-secondary font-medium">
                        Stock: {prod.stock} {prod.stockUnit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 bg-surface-container/60 rounded-md p-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(prod.id, -1)}
                          disabled={qty === 0}
                          className={`w-7 h-7 rounded-md bg-surface-container-lowest text-on-surface font-bold flex items-center justify-center shadow-xs active:scale-95 transition-transform ${
                            qty === 0 ? 'opacity-40 cursor-not-allowed' : ''
                          }`}
                        >
                          -
                        </button>
                        <div className="flex items-baseline gap-1 min-w-[50px] justify-center">
                          <span className="text-sm font-bold text-on-surface">{qty}</span>
                          <span className="text-xs text-on-surface-variant">{prod.stockUnit || prod.unit}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateQuantity(prod.id, 1)}
                          className="w-7 h-7 rounded-md bg-surface-container-lowest text-on-surface font-bold flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-on-surface-variant block leading-tight">Total item</span>
                        <span className="text-sm font-bold text-on-surface">
                          S/. {totalItem.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 3. Desglose de Totales */}
          <section className="bg-surface-container-low rounded-lg p-3.5 space-y-2 border border-outline-variant/30">
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>Subtotal estimado</span>
              <span className="font-semibold text-on-surface">S/. {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span>Ajuste / Descuento amigo</span>
                <span className="material-symbols-outlined text-[14px] text-tertiary">loyalty</span>
              </div>
              <span className="text-tertiary font-semibold">- S/. {discount.toFixed(2)}</span>
            </div>
            <div className="pt-2 mt-1 flex items-center justify-between bg-primary-fixed/40 px-3 py-2.5 rounded-lg border border-primary/20">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-on-primary-fixed-variant block">
                  Total a Cobrar
                </span>
                <span className="text-[11px] text-on-surface-variant">Incluye traslado a feria</span>
              </div>
              <div className="text-right">
                <span className="font-headline font-bold text-2xl text-primary leading-none">
                  S/. {total.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          {/* 4. Estado y Condiciones de Cobro */}
          <section className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[17px]">payments</span>
              Condición de Pago
            </label>

            {/* Toggle Cobrado vs Crédito */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-low rounded-lg">
              <button
                type="button"
                onClick={() => setPaymentCondition('contado')}
                className={`py-2 px-3 rounded-md font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all ${
                  paymentCondition === 'contado'
                    ? 'bg-surface-container-lowest text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                Cobrado al instante
              </button>
              <button
                type="button"
                onClick={() => setPaymentCondition('credito')}
                className={`py-2 px-3 rounded-md font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  paymentCondition === 'credito'
                    ? 'bg-surface-container-lowest text-tertiary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Crédito / Por Cobrar
              </button>
            </div>

            {paymentCondition === 'credito' && (
              <div className="flex items-center justify-between gap-1.5 text-xs bg-tertiary-fixed/30 p-2.5 rounded-lg">
                <span className="text-[11px] text-on-surface-variant font-medium">Plazo de vencimiento:</span>
                <div className="flex gap-1.5">
                  {[3, 7, 15].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setCreditDays(days)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                        creditDays === days
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {days} días
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Método de Pago */}
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase">Canal de Recepción</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { name: 'Yape', icon: 'phone_iphone' },
                  { name: 'Plin', icon: 'send_to_mobile' },
                  { name: 'Efectivo', icon: 'payments' },
                  { name: 'BCP/BBVA', icon: 'account_balance' },
                ].map((ch) => (
                  <button
                    key={ch.name}
                    type="button"
                    onClick={() => setPaymentChannel(ch.name)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-bold transition-all ${
                      paymentChannel === ch.name
                        ? 'bg-primary-fixed text-primary shadow-xs ring-1 ring-primary'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">{ch.icon}</span>
                    <span className="text-[11px] mt-0.5">{ch.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Nota de Pedido y WhatsApp */}
          <section className="flex flex-col gap-2">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[17px]">edit_note</span>
              Nota de Pedido (Opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej. Entregar en puerta 4 del mercado antes de las 9am"
              className="w-full bg-surface-container-low text-on-surface text-xs rounded-lg px-3 py-2.5 outline-none focus:bg-surface-container transition-colors placeholder:text-on-surface-variant/70 border border-outline-variant/30"
            />
            <label className="flex items-center gap-2.5 mt-1 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={sendWhatsApp}
                onChange={(e) => setSendWhatsApp(e.target.checked)}
                className="w-4 h-4 text-primary rounded accent-primary"
              />
              <span className="text-xs font-medium text-on-surface">
                Enviar recibo digital por WhatsApp al cliente
              </span>
            </label>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-surface border-t border-outline-variant/30 flex flex-col gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-headline font-bold text-sm tracking-wide shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">save</span>
            Guardar Venta (S/. {total.toFixed(2)})
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[17px]">receipt</span>
            Guardar y Emitir Nota de Salida
          </button>
        </div>
      </div>
    </div>
  );
};
