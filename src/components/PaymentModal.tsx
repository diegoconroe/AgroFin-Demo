import React, { useState, useEffect } from 'react';

interface PaymentModalProps {
  isOpen: boolean;
  clientName: string;
  defaultAmount: number;
  onClose: () => void;
  onConfirm: (amount: number, method: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  clientName,
  defaultAmount,
  onClose,
  onConfirm,
}) => {
  const [amount, setAmount] = useState<string>(defaultAmount.toFixed(2));
  const [method, setMethod] = useState<string>('Yape / Plin');

  useEffect(() => {
    setAmount(defaultAmount.toFixed(2));
  }, [defaultAmount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-3">
      <div className="bg-surface rounded-2xl w-full max-w-sm p-5 shadow-2xl flex flex-col gap-4 border border-outline-variant/30 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <h4 className="font-headline font-bold text-base text-on-surface">Registrar Cobranza</h4>
          </div>
          <button
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div>
          <p className="text-xs font-label text-on-surface-variant font-semibold">{clientName}</p>
          <p className="text-xs font-label text-on-surface-variant mt-0.5">Monto recibido:</p>
          <div className="flex items-center gap-1.5 mt-1 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/40">
            <span className="font-headline font-bold text-lg text-primary">S/.</span>
            <input
              className="w-full bg-transparent font-headline font-bold text-xl text-on-surface outline-none"
              step="0.50"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-label text-on-surface-variant font-medium">Método de cobro:</label>
          <div className="grid grid-cols-3 gap-1.5 text-xs font-label">
            {['Yape / Plin', 'Efectivo', 'Transferencia'].map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`py-2 rounded-lg font-semibold transition-colors ${
                  method === m
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                }`}
                type="button"
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <button
            className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-label text-xs font-bold hover:bg-surface-container-high transition-colors"
            onClick={onClose}
            type="button"
          >
            Cancelar
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label text-xs font-bold hover:bg-primary-container transition-colors shadow-md"
            onClick={() => {
              const val = parseFloat(amount) || defaultAmount;
              onConfirm(val, method);
            }}
            type="button"
          >
            Confirmar Cobro
          </button>
        </div>
      </div>
    </div>
  );
};
