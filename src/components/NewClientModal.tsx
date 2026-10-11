import React, { useState } from 'react';
import { Client } from '../data/mockData';

interface NewClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveClient: (client: Partial<Client>) => void;
}

export const NewClientModal: React.FC<NewClientModalProps> = ({
  isOpen,
  onClose,
  onSaveClient,
}) => {
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<'bodega' | 'mercado' | 'restaurante' | 'particular'>('bodega');
  const [phone, setPhone] = useState<string>('+51 987 654 321');
  const [address, setAddress] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('Semanal (Cada martes y viernes de cosecha)');
  const [creditAllowed, setCreditAllowed] = useState<boolean>(true);
  const [creditLimit, setCreditLimit] = useState<number>(500.00);
  const [paymentDays, setPaymentDays] = useState<number>(7);
  const [notes, setNotes] = useState<string>('');
  const [verifiedPhone, setVerifiedPhone] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = () => {
    const typeLabels: Record<string, string> = {
      bodega: 'Bodega local',
      mercado: 'Puesto / Mayorista',
      restaurante: 'Restaurante',
      particular: 'Cliente particular',
    };

    onSaveClient({
      name: name || 'Nuevo Cliente Agrícola',
      type,
      typeLabel: typeLabels[type],
      phone,
      address: address || 'Lunahuaná / Cañete',
      creditAllowed,
      creditLimit,
      creditUsed: 0,
      paymentTermDays: paymentDays,
      totalPurchased: 0,
      status: 'al_dia',
      debtAmount: 0,
      frequency,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex flex-col justify-end overflow-y-auto pt-6">
      <div className="w-full max-w-lg mx-auto bg-surface rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 pt-3 pb-3 bg-surface-container-low flex items-start justify-between border-b border-outline-variant/30 flex-shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse" />
              Gestión Comercial
            </div>
            <h2 className="font-headline text-xl font-bold text-on-surface tracking-tight mt-0.5">
              Registrar Nuevo Cliente
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Añade contactos para ventas, cobranzas y pedidos frecuentes
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {/* 1. Datos Básicos */}
          <section className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <span className="material-symbols-outlined text-[20px]">badge</span>
              <h3 className="font-headline text-sm tracking-wide">1. Datos Básicos</h3>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label text-xs font-semibold text-on-surface">
                Nombre o Razón Social <span className="text-error">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ej. Restaurante El Portón, Sra. Bertha - Puesto 45"
                className="w-full bg-surface-container rounded-lg py-2.5 px-3.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-label text-xs font-semibold text-on-surface">Tipo de Cliente</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'bodega', label: 'Bodega local', icon: 'storefront' },
                  { id: 'mercado', label: 'Puesto / Mayorista', icon: 'pallet' },
                  { id: 'restaurante', label: 'Restaurante', icon: 'restaurant' },
                  { id: 'particular', label: 'Cliente particular', icon: 'person' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setType(t.id as any)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left flex items-center gap-2 transition-all ${
                      type === t.id
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                    <span className="truncate">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Contacto y Despacho */}
          <section className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              <h3 className="font-headline text-sm tracking-wide">2. Contacto y Despacho</h3>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label text-xs font-semibold text-on-surface">Teléfono / WhatsApp</label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container rounded-lg py-2.5 pl-9 pr-3 text-sm text-on-surface font-medium focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setVerifiedPhone(true)}
                  className={`min-h-[40px] px-3.5 rounded-lg font-label text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs flex-shrink-0 ${
                    verifiedPhone
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : 'bg-surface-container-high text-primary hover:bg-surface-container-highest'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {verifiedPhone ? 'check_circle' : 'chat'}
                  </span>
                  <span>{verifiedPhone ? 'Verificado' : 'Verificar'}</span>
                </button>
              </div>
              <p className="text-[11px] text-on-surface-variant font-label">
                Permite enviar recordatorios de cobranza y lista de cosecha semanal.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label text-xs font-semibold text-on-surface">Dirección / Punto de entrega</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-tertiary text-[18px]">
                  location_on
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Mercado San Camilo Puesto #12, Jr. Los Rosales 340"
                  className="w-full bg-surface-container rounded-lg py-2.5 pl-9 pr-3.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label text-xs font-semibold text-on-surface">Frecuencia de pedido habitual</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-surface-container rounded-lg py-2.5 px-3 text-sm text-on-surface font-medium focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
              >
                <option value="Semanal (Cada martes y viernes de cosecha)">Semanal (Cada martes y viernes de cosecha)</option>
                <option value="Quincenal (A mitad y fin de mes)">Quincenal (A mitad y fin de mes)</option>
                <option value="Diario (Abastecimiento continuo)">Diario (Abastecimiento continuo)</option>
                <option value="Ocasional / A pedido especial">Ocasional / A pedido especial</option>
              </select>
            </div>
          </section>

          {/* 3. Condiciones Comerciales */}
          <section className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                <span className="material-symbols-outlined text-[20px]">payments</span>
                <h3 className="font-headline text-sm tracking-wide">3. Condiciones Comerciales</h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed">
                Crédito Rural
              </span>
            </div>

            <div className="flex items-center justify-between bg-surface-container p-3 rounded-lg">
              <div className="flex flex-col pr-2">
                <span className="font-label text-xs font-bold text-on-surface">¿Permite venta al crédito?</span>
                <span className="text-[11px] text-on-surface-variant">Habilitar saldo pendiente para este cliente</span>
              </div>
              <button
                type="button"
                onClick={() => setCreditAllowed(!creditAllowed)}
                className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors ${
                  creditAllowed ? 'bg-primary' : 'bg-surface-container-highest'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-surface-container-lowest shadow-md transform transition-transform ${
                    creditAllowed ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {creditAllowed && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label text-xs font-semibold text-on-surface">Límite de crédito sugerido</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-headline font-bold text-sm text-primary">
                      S/.
                    </span>
                    <input
                      type="number"
                      step="50"
                      value={creditLimit}
                      onChange={(e) => setCreditLimit(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container rounded-lg py-2.5 pl-11 pr-4 text-base font-bold text-on-surface focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-label text-xs font-semibold text-on-surface">Plazo de pago acordado</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { label: 'Contado', days: 0 },
                      { label: '3 días', days: 3 },
                      { label: '7 días', days: 7 },
                      { label: '15 días', days: 15 },
                    ].map((p) => (
                      <button
                        key={p.days}
                        type="button"
                        onClick={() => setPaymentDays(p.days)}
                        className={`py-2 px-1 text-center rounded-lg text-xs font-bold transition-all ${
                          paymentDays === p.days
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 4. Notas */}
          <section className="bg-surface-container-low rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-outline-variant/30">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
              <h3 className="font-headline text-sm tracking-wide">4. Notas de Cosecha & Preferencias</h3>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ej. Prefiere palta madura los jueves y jabas de huevos grandes. Llamar antes de las 7:00 a.m."
              rows={2}
              className="w-full bg-surface-container rounded-lg p-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30 resize-none"
            />
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface border-t border-outline-variant/30 flex flex-col gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Guardar Cliente</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-on-surface-variant hover:text-on-surface font-label text-xs font-semibold transition-colors"
          >
            Cancelar y volver al catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
