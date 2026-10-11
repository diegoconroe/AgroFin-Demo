import React, { useState } from 'react';
import { Expense } from '../data/mockData';

interface ExpensesScreenProps {
  expenses: Expense[];
  onOpenNewExpense: () => void;
}

export const ExpensesScreen: React.FC<ExpensesScreenProps> = ({
  expenses,
  onOpenNewExpense,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const filteredExpenses = expenses.filter((e) => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'flete') return e.category === 'flete';
    if (activeCategory === 'insumos') return e.category === 'insumos';
    if (activeCategory === 'empaques') return e.category === 'empaques';
    if (activeCategory === 'jornales') return e.category === 'jornales' || e.category === 'mantenimiento';
    return true;
  });

  const totalSpent = expenses.reduce((acc, e) => acc + e.amount, 0);
  const budgetLimit = 3200.00;
  const percentUsed = Math.min(100, Math.round((totalSpent / budgetLimit) * 100));
  const remainingBudget = Math.max(0, budgetLimit - totalSpent);

  return (
    <div className="flex flex-col w-full pb-28 max-w-lg mx-auto">
      {/* Tarjeta Resumen Mensual & Presupuesto */}
      <section className="px-4 pt-2">
        <div className="bg-surface-container-low rounded-xl p-5 shadow-sm relative overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-primary-fixed/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
              <span className="font-label text-xs uppercase tracking-wider text-secondary font-semibold">
                Octubre 2024
              </span>
            </div>
            <div className="flex items-center gap-1 bg-surface-container px-2.5 py-1 rounded-full text-primary font-label text-xs font-bold">
              <span className="material-symbols-outlined text-[15px]">trending_down</span>
              <span>-8% vs Sept.</span>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-xs font-label text-secondary block mb-0.5">Total ejecutado en el mes</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-headline text-3xl font-bold text-on-surface tracking-tight">
                S/. {totalSpent > 0 ? totalSpent.toFixed(2) : '2,390.00'}
              </span>
              <span className="text-xs font-label text-secondary">gastados</span>
            </div>
          </div>

          {/* Barra de Progreso de Presupuesto */}
          <div className="bg-surface-container-high rounded-xl p-3.5 flex flex-col gap-2 border border-outline-variant/20">
            <div className="flex justify-between items-center text-xs font-label">
              <span className="text-on-surface font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-tertiary text-sm">savings</span>
                Límite mensual sugerido
              </span>
              <span className="text-secondary font-medium">S/. {budgetLimit.toFixed(2)}</span>
            </div>
            <div className="w-full bg-surface-container-lowest h-2.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${percentUsed}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-label">
              <span className="text-primary font-bold">{percentUsed}% consumido</span>
              <span className="text-secondary">
                Margen disponible: <strong className="text-on-surface">S/. {remainingBudget.toFixed(2)}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Acciones */}
      <section className="px-4 mt-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenNewExpense}
          className="flex-1 bg-primary text-on-primary font-label font-bold text-sm h-12 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Anotar Nuevo Gasto</span>
        </button>
        <button
          type="button"
          onClick={() => alert('Filtro avanzado por proveedor y tipo de comprobante')}
          aria-label="Buscar gastos"
          className="w-12 h-12 rounded-xl bg-surface-container-low text-on-surface flex items-center justify-center hover:bg-surface-container transition-colors shadow-xs border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </section>

      {/* Filtro Horizontal de Categorías */}
      <section className="mt-4">
        <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar py-1">
          {[
            { id: 'todos', label: `Todos (${expenses.length})` },
            { id: 'flete', label: 'Fletes y Transporte' },
            { id: 'insumos', label: 'Alimento / Insumos' },
            { id: 'empaques', label: 'Empaques y Jabas' },
            { id: 'jornales', label: 'Mano de obra' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-label text-xs transition-colors ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary font-bold shadow-sm'
                  : 'bg-surface-container-low text-secondary font-semibold hover:text-on-surface'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Desglose Gráfico por Rubro */}
      <section className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-headline font-semibold text-sm text-on-surface">Distribución de Costos</h2>
          <span className="font-label text-xs text-secondary">Octubre</span>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between shadow-xs border border-outline-variant/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              </div>
              <span className="text-[11px] font-label font-bold text-secondary">34%</span>
            </div>
            <div>
              <span className="text-[11px] font-label text-secondary line-clamp-1 block">Transporte & Envíos</span>
              <span className="font-headline font-bold text-sm text-on-surface">S/. 820.00</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between shadow-xs border border-outline-variant/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[18px]">agriculture</span>
              </div>
              <span className="text-[11px] font-label font-bold text-secondary">31%</span>
            </div>
            <div>
              <span className="text-[11px] font-label text-secondary line-clamp-1 block">Alimento aves & insumos</span>
              <span className="font-headline font-bold text-sm text-on-surface">S/. 750.00</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between shadow-xs border border-outline-variant/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </div>
              <span className="text-[11px] font-label font-bold text-secondary">20%</span>
            </div>
            <div>
              <span className="text-[11px] font-label text-secondary line-clamp-1 block">Cajas, Jabas & Cintas</span>
              <span className="font-headline font-bold text-sm text-on-surface">S/. 480.00</span>
            </div>
          </div>

          <div className="bg-surface-container-low p-3 rounded-xl flex flex-col justify-between shadow-xs border border-outline-variant/20">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">handyman</span>
              </div>
              <span className="text-[11px] font-label font-bold text-secondary">15%</span>
            </div>
            <div>
              <span className="text-[11px] font-label text-secondary line-clamp-1 block">Mantenimiento & Otros</span>
              <span className="font-headline font-bold text-sm text-on-surface">S/. 340.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Movimientos Recientes */}
      <section className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-headline font-semibold text-sm text-on-surface">Egresos Recientes</h2>
          <button
            type="button"
            onClick={() => alert('Mostrando historial completo de egresos')}
            className="text-xs font-label text-primary font-bold hover:underline"
          >
            Ver histórico
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {filteredExpenses.map((exp) => (
            <div
              key={exp.id}
              className="bg-surface-container-low rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-outline-variant/20"
            >
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">
                  {exp.category === 'flete'
                    ? 'local_shipping'
                    : exp.category === 'insumos'
                    ? 'egg'
                    : exp.category === 'empaques'
                    ? 'inventory_2'
                    : 'handyman'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-label font-bold text-sm text-on-surface truncate">
                  {exp.concept}
                </h3>
                <div className="flex items-center gap-2 text-[11px] font-label text-secondary mt-0.5">
                  <span>{exp.date}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="px-1.5 py-0.2 rounded bg-surface-container text-on-surface-variant font-medium">
                    {exp.receiptType}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant" />
                  <span className="truncate">{exp.paymentMethod}</span>
                </div>
              </div>

              <div className="flex flex-col items-end flex-shrink-0">
                <span className="font-headline font-bold text-sm text-error">
                  - S/. {exp.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tip Financiero Agrícola */}
      <section className="px-4 mt-5">
        <div className="bg-secondary-fixed/60 rounded-xl p-4 flex items-start gap-3 relative overflow-hidden border border-secondary/20">
          <div className="w-9 h-9 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">lightbulb</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-headline font-bold text-xs text-on-secondary-fixed mb-1">
              Consejo de Rentabilidad Agrícola
            </h4>
            <p className="font-body text-xs text-on-secondary-fixed-variant leading-relaxed">
              Tus costos de flete representan el <strong>34%</strong> de tus salidas. Agrupar entregas de paltas y quesos dos días fijos a la semana puede ahorrarte hasta <strong>S/. 190.00</strong> al mes en combustible y peajes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
