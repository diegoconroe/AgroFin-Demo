import React from 'react';
import { Sale } from '../data/mockData';

interface SaleDetailScreenProps {
  sale: Sale;
  onBack: () => void;
  onViewClientDetail?: (clientName: string) => void;
}

export const SaleDetailScreen: React.FC<SaleDetailScreenProps> = ({
  sale,
  onBack,
  onViewClientDetail,
}) => {
  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-2 gap-5 max-w-lg mx-auto">
      {/* Status Bar Banner */}
      <div className="bg-surface-container rounded-xl p-4 flex flex-col gap-2.5 shadow-sm border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-lg text-on-surface">
              Venta {sale.folio || '#0412'}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                sale.paymentStatus === 'cobrado'
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {sale.paymentStatus === 'cobrado' ? 'check_circle' : 'schedule'}
              </span>
              {sale.paymentStatus === 'cobrado'
                ? `Cobrado vía ${sale.paymentMethod?.toUpperCase() || 'YAPE'}`
                : 'Pendiente de cobro'}
            </span>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">
            {sale.date} - {sale.time}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-secondary">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary">storefront</span>
            Lote Cosecha Valle Central
          </span>
          <span className="text-[11px] bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-md font-medium">
            Despacho Inmediato
          </span>
        </div>
      </div>

      {/* Digital Receipt Card */}
      <div className="relative bg-surface-container-lowest rounded-xl p-5 shadow-sm overflow-hidden flex flex-col gap-5 border border-outline-variant/30">
        {/* Decorative Stamp Watermark */}
        <div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none select-none">
          <span className="material-symbols-outlined text-[140px] text-primary">verified</span>
        </div>

        {/* Amount Hero Inside Ticket */}
        <div className="flex flex-col items-center justify-center text-center py-2 bg-surface-container-low rounded-lg border border-outline-variant/20">
          <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">
            Monto Total Liquidado
          </span>
          <div className="flex items-baseline gap-1 mt-1 text-on-surface">
            <span className="text-xl font-headline font-medium text-primary">S/.</span>
            <span className="text-4xl font-headline font-bold tracking-tight text-on-surface">
              {sale.amount.toFixed(2)}
            </span>
          </div>
          <span className="mt-1 text-[11px] text-primary font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">shield</span>
            {sale.paymentStatus === 'cobrado'
              ? 'Pago validado sin saldos pendientes'
              : 'Saldo sujeto a crédito pactado'}
          </span>
        </div>

        {/* Buyer & Logistics Details */}
        <div className="flex flex-col gap-3.5 text-sm">
          <div className="flex items-start justify-between gap-3 bg-surface-container-low p-3.5 rounded-lg border border-outline-variant/20">
            <div className="flex items-start gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed flex-shrink-0 mt-0.5 font-bold text-xs">
                <span className="material-symbols-outlined text-[18px]">person</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">
                  Cliente Mayorista
                </span>
                <span className="font-headline font-bold text-on-surface leading-snug truncate">
                  {sale.clientName}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <a
                    className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                    href="tel:+51977102938"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>
                    +51 977 102 938
                  </a>
                  <span className="text-outline-variant">•</span>
                  <button
                    type="button"
                    onClick={() => onViewClientDetail && onViewClientDetail(sale.clientName)}
                    className="text-xs text-tertiary font-semibold hover:underline flex items-center gap-0.5"
                  >
                    Ver ficha <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Point */}
          <div className="flex items-start gap-2.5 px-1">
            <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] text-on-surface-variant font-medium">Punto de entrega registrado</span>
              <span className="text-xs text-on-surface font-semibold">{sale.deliveryPoint}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Produce Breakdown Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline font-bold text-base text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">agriculture</span>
            Cosecha Despachada
          </h2>
          <span className="text-xs text-on-surface-variant">
            {sale.items && sale.items.length > 0 ? `${sale.items.length} productos` : '3 categorías'}
          </span>
        </div>

        {/* Items List */}
        <div className="flex flex-col gap-2.5">
          {sale.items && sale.items.length > 0 ? (
            sale.items.map((it, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-center justify-between gap-3 border border-outline-variant/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0 border border-outline-variant/20">
                    <img
                      src={
                        it.image ||
                        'https://lh3.googleusercontent.com/aida-public/AB6AXuC6mE1kIS2FyhNbGkI2jU4SsUDxuQCMDUVqrF7YXlUBomMwwzlTxWlnF2h4MwNf12p8QHY-VtpPP31HTz5e3dRRSTw1KqNSLZZOJtT7W_jvfmPxcNWFwC3Yx3RYK0OGiy1FoMYbpfJydhaQackAsx41Z8iAxtQRUFz2iIhhIbkJBj5UzC5Ji9eSs9lSh4VAwHg4RjI1-BfAjKTlFWi3FNFWkvQBVSfrTUYBEU8CLWi-1DEhyRSDPrMLVA'
                      }
                      alt={it.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-on-surface truncate">{it.productName}</span>
                    <span className="text-xs text-on-surface-variant">
                      {it.quantity} {it.unit}
                    </span>
                    <span className="text-[11px] text-secondary font-medium">
                      S/. {it.unitPrice.toFixed(2)} por unidad
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-headline font-bold text-sm text-on-surface">
                    S/. {it.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* Default fallback items */}
              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-center justify-between gap-3 border border-outline-variant/30">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjhrps5iqSgHQkrNKOP0z-uNURacW8KSZDPEDoQjSDOlX8-_J4tAlyMYhrj-i2lSCQx5rYbWPmsnLAWk_9l7iBAyT_szbq59D4dAHSuw1JqpgKW3BVTqZSnMYM4LEEOLrzMJ4UpMN-WCtKkARONa2qbHfxkwXXPzHFEaRPBJghR48oZkwLFSK48ee08mbACYUtGkP1GydMGSoHsJyrxhYrZ9MjS9IXiWqF-Gq43rRif0q9vLqCo3VbcQ"
                      alt="Huevos"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-on-surface truncate">Huevos de Corral</span>
                    <span className="text-xs text-on-surface-variant">15 Jabas (30 u. c/u)</span>
                    <span className="text-[11px] text-secondary font-medium">S/. 18.50 por jaba</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-headline font-bold text-sm text-on-surface">S/. 277.50</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-center justify-between gap-3 border border-outline-variant/30">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1sFn1HycitpoQU6ps-KUs6LNSFPu1s3QLDsYetS6h1BSGB3qvci9T9UzcibS9tdw3qh2SnxHSjAdlvL2aC9p2euw1kRo6gEB9lgX_knE8fDvSSXDWTMLSwQ7r_awYcxwr93HjD0HTUcFpy-UEXhiBONqwuddMoAIeHong7hYac9mIOc8qhzgkJvV9xv7YKY9vxMhd4XqluI2b77MH12ZJIgdUVYLXJi2npptYkE-1AJXtIgBsypaTew"
                      alt="Palta"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-on-surface truncate">
                      Palta Hass de Exportación
                    </span>
                    <span className="text-xs text-on-surface-variant">75 kg seleccionados</span>
                    <span className="text-[11px] text-secondary font-medium">S/. 8.50 por kg</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-headline font-bold text-sm text-on-surface">S/. 637.50</span>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-3.5 rounded-xl shadow-sm flex items-center justify-between gap-3 border border-outline-variant/30">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high overflow-hidden flex-shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeXm07fIjod1qZlSlP_L81IgEr7LTC0lPLLUWk4S2EXKylxDmFzxN_ouN12cvr6UUvl5J4rftNcCu_tjbl3e8sKmwh3Pj25XcSMTrr1ToMCjohsalQuhUYnegh9JuuYQIwphXV8fnCK7C_-6EzDeUV36M6cFvM8dxRHP_dK7aNGHBmUVC9EcQ5AUhFEIbvXCEyVr2ql5jpxXRGg0GQ383MFotzqpLeWu3fhTshe6iGBczMKWIWKZqZWg"
                      alt="Queso"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm text-on-surface truncate">Queso Fresco Andino</span>
                    <span className="text-xs text-on-surface-variant">4 Moldes sellados</span>
                    <span className="text-[11px] text-secondary font-medium">S/. 20.00 por molde</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-headline font-bold text-sm text-on-surface">S/. 80.00</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Calculations Summary Box */}
        <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-2 mt-1 border border-outline-variant/20">
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span>Subtotal productos</span>
            <span className="font-medium text-on-surface">S/. {sale.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span className="flex items-center gap-1">
              Flete y despacho{' '}
              <span className="bg-primary-fixed text-on-primary-fixed-variant text-[10px] px-1.5 py-0.2 rounded font-semibold">
                Cortesía
              </span>
            </span>
            <span className="font-medium text-primary">S/. 0.00</span>
          </div>
          <div className="flex justify-between items-center text-xs text-on-surface-variant">
            <span>Descuento por volumen</span>
            <span className="font-medium text-on-surface">S/. 0.00</span>
          </div>
          <div className="h-px bg-outline-variant opacity-40 my-1" />
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="font-headline text-on-surface">Total Neto Cancelado</span>
            <span className="font-headline text-base text-primary font-bold">
              S/. {sale.amount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment & Invoice Info Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3.5 border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-sm text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary text-[18px]">
              account_balance_wallet
            </span>
            Liquidación & Facturación
          </h3>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Conciliado
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col border border-outline-variant/20">
            <span className="text-[11px] text-on-surface-variant font-medium">Medio de pago</span>
            <span className="text-xs font-bold text-on-surface mt-0.5">Yape Empresa</span>
            <span className="text-[11px] text-secondary">N° 940 *** 812</span>
          </div>
          <div className="bg-surface-container-low p-3 rounded-lg flex flex-col border border-outline-variant/20">
            <span className="text-[11px] text-on-surface-variant font-medium">N° Operación</span>
            <span className="text-xs font-mono font-bold text-on-surface mt-0.5 tracking-wide">
              84920491
            </span>
            <span className="text-[11px] text-primary font-medium">Aprobado</span>
          </div>
        </div>

        <div className="bg-surface-container p-3 rounded-lg flex items-center justify-between gap-3 border border-outline-variant/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-on-surface truncate">
                Boleta Electrónica B001-00284
              </span>
              <span className="text-[11px] text-on-surface-variant">SUNAT RUC 20601839281</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => alert('Abriendo Boleta Electrónica PDF oficial...')}
            className="text-xs font-semibold text-primary hover:text-surface-tint flex items-center gap-1 flex-shrink-0 py-1 px-2.5 rounded-lg bg-surface-container-lowest"
          >
            <span>PDF</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </button>
        </div>
      </div>

      {/* Order Timeline History */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-sm text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">history</span>
            Historial de la Venta
          </h3>
          <span className="text-[11px] text-secondary font-medium">3 etapas cumplidas</span>
        </div>

        <div className="relative pl-6 flex flex-col gap-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-primary-fixed">
          <div className="relative flex flex-col">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-on-surface">Pedido tomado en campo</span>
              <span className="text-[11px] text-on-surface-variant font-mono">08:30 AM</span>
            </div>
            <span className="text-[11px] text-secondary">Registro inicial en pesaje de huerto</span>
          </div>

          <div className="relative flex flex-col">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-on-surface">Despacho cargado en furgón</span>
              <span className="text-[11px] text-on-surface-variant font-mono">08:40 AM</span>
            </div>
            <span className="text-[11px] text-secondary">Guía de remisión y control fitosanitario</span>
          </div>

          <div className="relative flex flex-col">
            <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary" />
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold text-on-surface">Pago confirmado y boleta generada</span>
              <span className="text-[11px] text-on-surface-variant font-mono">08:45 AM</span>
            </div>
            <span className="text-[11px] text-primary font-medium">Liquidado exitosamente vía Yape</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-1">
        <a
          href={`https://wa.me/?text=Hola%20${encodeURIComponent(
            sale.clientName
          )},%20adjunto%20el%20recibo%20de%20su%20pedido%20${sale.folio}%20por%20S/.${sale.amount.toFixed(2)}.`}
          target="_blank"
          rel="noreferrer"
          className="w-full h-12 bg-primary hover:bg-surface-tint active:scale-[0.99] text-on-primary font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          Compartir Recibo por WhatsApp
        </a>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => alert('Descargando comprobante en PDF...')}
            className="h-11 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">download</span>
            Descargar Nota (PDF)
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="h-11 bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">print</span>
            Imprimir Térmico
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="mt-1 py-2 text-xs font-semibold text-secondary hover:text-on-surface transition-colors flex items-center justify-center gap-1.5 self-center"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Volver a Ventas
        </button>
      </div>
    </div>
  );
};
