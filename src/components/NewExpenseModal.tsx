import React, { useState } from 'react';
import { Expense } from '../data/mockData';

interface NewExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveExpense: (expense: Partial<Expense>) => void;
}

export const NewExpenseModal: React.FC<NewExpenseModalProps> = ({
  isOpen,
  onClose,
  onSaveExpense,
}) => {
  const [amount, setAmount] = useState<number>(180.00);
  const [category, setCategory] = useState<'flete' | 'insumos' | 'empaques' | 'jornales' | 'mantenimiento'>('flete');
  const [concept, setConcept] = useState<string>('Flete a Mercado Central');
  const [paymentMethod, setPaymentMethod] = useState<'Yape Empresa' | 'Efectivo' | 'Tarjeta Débito' | 'Plin / Transf.'>('Yape Empresa');
  const [receiptType, setReceiptType] = useState<'Factura' | 'Boleta' | 'Recibo simple' | 'Sin ticket'>('Boleta');
  const [dateOption, setDateOption] = useState<string>('Hoy (24 Oct)');

  if (!isOpen) return null;

  const addAmount = (val: number) => {
    setAmount((prev) => Math.round((prev + val) * 100) / 100);
  };

  const resetAmount = () => {
    setAmount(0);
  };

  const handleSave = () => {
    const categoryLabels: Record<string, string> = {
      flete: 'Transporte & Envíos',
      insumos: 'Alimento aves & insumos',
      empaques: 'Cajas, Jabas & Cintas',
      jornales: 'Jornales Cosecha',
      mantenimiento: 'Mantenimiento & Otros',
    };

    onSaveExpense({
      concept: concept || 'Gasto operativo de campo',
      category,
      categoryLabel: categoryLabels[category],
      amount: amount > 0 ? amount : 50,
      date: dateOption,
      time: '10:15 AM',
      receiptType,
      paymentMethod,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex flex-col justify-end overflow-y-auto pt-6">
      <div className="w-full max-w-lg mx-auto bg-surface rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 pt-3 pb-3 bg-surface-container-low flex items-center justify-between border-b border-outline-variant/30 flex-shrink-0">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider font-bold text-tertiary">
              Egresos Agrícolas
            </span>
            <h2 className="font-headline text-xl font-bold text-on-surface tracking-tight">
              Anotar Nuevo Gasto
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Controla salidas de dinero e insumos en tiempo real
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {/* Main Amount Card */}
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col items-center justify-center relative overflow-hidden border border-outline-variant/30">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-primary-fixed/30 pointer-events-none blur-xl" />
            <span className="text-xs font-label uppercase tracking-widest text-secondary mb-1">
              Monto Total a Registrar
            </span>
            <div className="flex items-baseline justify-center gap-1.5 my-1">
              <span className="font-headline text-2xl font-bold text-primary">S/.</span>
              <input
                type="number"
                step="0.50"
                value={amount === 0 ? '' : amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="font-headline text-4xl sm:text-5xl font-bold text-on-surface text-center bg-transparent focus:outline-none w-48 tracking-tight"
              />
            </div>

            {/* Quick Add Pills */}
            <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
              <button
                type="button"
                onClick={() => addAmount(10)}
                className="px-3 py-1.5 rounded-full bg-surface-container-low text-xs font-label font-bold text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-xs"
              >
                + S/. 10
              </button>
              <button
                type="button"
                onClick={() => addAmount(50)}
                className="px-3 py-1.5 rounded-full bg-surface-container-low text-xs font-label font-bold text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-xs"
              >
                + S/. 50
              </button>
              <button
                type="button"
                onClick={() => addAmount(100)}
                className="px-3 py-1.5 rounded-full bg-surface-container-low text-xs font-label font-bold text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors shadow-xs"
              >
                + S/. 100
              </button>
              <button
                type="button"
                onClick={resetAmount}
                title="Limpiar"
                className="px-2.5 py-1.5 rounded-full bg-surface-container-highest text-xs font-label text-on-surface-variant hover:text-error transition-colors"
              >
                <span className="material-symbols-outlined text-[15px] align-middle">backspace</span>
              </button>
            </div>
          </div>

          {/* Category Selector */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-headline text-sm font-semibold text-on-surface">Categoría del Gasto</label>
              <span className="text-[11px] font-label text-tertiary font-medium">Obligatorio</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'flete', icon: 'local_shipping', title: 'Flete y Transporte', sub: 'Camión, combustible' },
                { id: 'insumos', icon: 'grass', title: 'Insumos y Abono', sub: 'Granos, fertilizante' },
                { id: 'empaques', icon: 'inventory_2', title: 'Envases y Jabas', sub: 'Plásticos, cartón' },
                { id: 'jornales', icon: 'engineering', title: 'Jornales Cosecha', sub: 'Mano de obra' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id as any)}
                  className={`p-3 rounded-xl flex flex-col items-start gap-1 text-left transition-all ${
                    category === c.id
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      category === c.id ? 'bg-surface-container-lowest/20' : 'bg-surface-container text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{c.icon}</span>
                  </div>
                  <span className="text-xs font-bold font-headline leading-tight mt-0.5">{c.title}</span>
                  <span
                    className={`text-[10px] leading-none ${
                      category === c.id ? 'opacity-80' : 'text-on-surface-variant'
                    }`}
                  >
                    {c.sub}
                  </span>
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCategory('mantenimiento')}
                className={`p-3 rounded-xl flex flex-col items-start gap-1 text-left col-span-2 transition-all ${
                  category === 'mantenimiento'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    category === 'mantenimiento'
                      ? 'bg-surface-container-lowest/20'
                      : 'bg-surface-container text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">handyman</span>
                </div>
                <span className="text-xs font-bold font-headline leading-tight mt-0.5">
                  Mantenimiento & Riego
                </span>
                <span
                  className={`text-[10px] leading-none ${
                    category === 'mantenimiento' ? 'opacity-80' : 'text-on-surface-variant'
                  }`}
                >
                  Herramientas, motobomba, repuestos
                </span>
              </button>
            </div>
          </div>

          {/* Description & Suggestions */}
          <div className="flex flex-col gap-2">
            <label className="font-headline text-sm font-semibold text-on-surface">Concepto / Glosa</label>
            <div className="relative w-full">
              <input
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Ej: Pago de flete camión..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-container-lowest text-sm text-on-surface placeholder-on-surface-variant focus:outline-none focus:bg-surface-container-low shadow-sm border border-outline-variant/30"
              />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant text-[18px]">
                edit_note
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[11px] font-label text-secondary whitespace-nowrap mr-0.5">
                Sugerencias:
              </span>
              {[
                'Flete a Mercado Mayorista',
                'Combustible motofurgón',
                'Compra de jabas nuevas',
                'Fertilizante foliar',
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setConcept(s)}
                  className="px-2.5 py-1 rounded-md bg-secondary-container text-[11px] font-body text-on-secondary-container hover:bg-secondary-fixed transition-colors whitespace-nowrap shadow-xs"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method & Receipt */}
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 shadow-sm border border-outline-variant/30">
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-headline font-bold text-on-surface">Medio de Pago</span>
              <div className="flex items-center gap-2 flex-wrap">
                {[
                  { name: 'Yape Empresa', icon: 'qr_code_2' },
                  { name: 'Efectivo', icon: 'payments' },
                  { name: 'Tarjeta Débito', icon: 'credit_card' },
                  { name: 'Plin / Transf.', icon: 'sync_alt' },
                ].map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setPaymentMethod(m.name as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-label font-bold flex items-center gap-1.5 transition-all ${
                      paymentMethod === m.name
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[15px]">{m.icon}</span>
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Receipt Type */}
            <div className="flex flex-col gap-1.5 pt-1">
              <span className="text-xs font-headline font-bold text-on-surface">Tipo de Comprobante</span>
              <div className="grid grid-cols-4 gap-1.5 text-center">
                {['Boleta', 'Factura', 'Recibo simple', 'Sin ticket'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setReceiptType(r as any)}
                    className={`py-1.5 px-2 rounded-md font-bold text-xs font-label transition-colors ${
                      receiptType === r
                        ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-xs'
                        : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Receipt Photo preview */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-lowest mt-1 shadow-sm border border-outline-variant/20">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBJtttR28Xd6_UGDvBIcMRvqvFs1UH1Mgzg3RywqAoxYnMU6vr4RuOps18ZUBxDRAq-RKNbkuto6Kfril4WdjqSIZTVzKlbnOHmZIQhHpMjwLdELcm8cHRA6jU1za6wFTI47-v7m4xU6-IOqn3XctYmNvwp0cJMo1aH-b3fd7lxsJwBZiaMBd8TqilALoEONO5kKYsQ58xbfbcHreASnlgPW4a460Alt_1ibp9jFrQ2_JgNLRVODu3yQ"
                    alt="Receipt"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-tl p-0.5 leading-none">
                    <span className="material-symbols-outlined text-[12px] block">check</span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold font-headline text-on-surface truncate">
                    boleta_flete_central_084.jpg
                  </span>
                  <span className="text-[11px] font-body text-secondary truncate">
                    1.2 MB · Foto adjunta
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-xs font-label font-bold text-primary flex items-center gap-1 transition-colors flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                <span>Cambiar</span>
              </button>
            </div>
          </div>

          {/* Date selection */}
          <div className="flex flex-col gap-1.5">
            <label className="font-headline text-sm font-semibold text-on-surface">Fecha de Operación</label>
            <div className="grid grid-cols-3 gap-2">
              {['Hoy (24 Oct)', 'Ayer', 'Elegir fecha'].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDateOption(d)}
                  className={`py-2 px-3 rounded-lg text-xs font-label font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    dateOption === d
                      ? 'bg-primary-fixed text-on-primary-fixed ring-1 ring-primary'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">today</span>
                  <span>{d}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Cash Impact Card */}
          <div className="bg-secondary-fixed/40 rounded-xl p-3 flex items-center gap-3 border border-secondary/20">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">psychology</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-headline font-bold text-on-secondary-fixed leading-tight">
                Impacto en Caja de Campo
              </span>
              <p className="text-[11px] font-body text-on-secondary-fixed-variant leading-snug">
                Se descontará de la caja chica de Huerto Norte. Saldo restante estimado: S/. 1,420.00.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface border-t border-outline-variant/30 flex flex-col gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-headline text-base font-bold shadow-md hover:bg-surface-tint active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>Registrar Gasto (S/. {amount.toFixed(2)})</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-transparent text-secondary hover:text-on-surface font-label text-xs font-semibold tracking-wide transition-colors text-center"
          >
            Cancelar y volver a resumen
          </button>
        </div>
      </div>
    </div>
  );
};
