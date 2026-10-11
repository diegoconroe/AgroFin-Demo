import React, { useState } from 'react';

interface ReportsScreenProps {
  onBack: () => void;
}

export const ReportsScreen: React.FC<ReportsScreenProps> = ({ onBack }) => {
  const [period, setPeriod] = useState<string>('mes');

  return (
    <div className="flex flex-col w-full pb-28 space-y-5 px-4 pt-2 max-w-lg mx-auto">
      {/* Micro Hero / Status Card */}
      <div className="relative overflow-hidden rounded-2xl bg-surface-container-low p-5 shadow-sm border border-outline-variant/30">
        <div className="flex items-start justify-between">
          <div className="space-y-1 pr-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Cierre Campaña Activo
            </div>
            <h2 className="font-headline font-bold text-xl text-on-surface leading-tight pt-1">
              Balance & Rendimiento
            </h2>
            <p className="text-xs text-on-surface-variant font-body leading-relaxed">
              Fundo San Isidro • Valle del Mantaro
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary flex-shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-2xl">analytics</span>
          </div>
        </div>

        {/* Quick Tip Banner */}
        <div className="mt-4 pt-3.5 flex items-start gap-2.5 rounded-xl bg-surface-container px-3 py-2.5 border border-outline-variant/20">
          <span className="material-symbols-outlined text-primary text-[19px] mt-0.5 flex-shrink-0">
            eco
          </span>
          <p className="text-[12px] text-on-surface-variant leading-relaxed">
            <strong className="text-on-surface font-semibold">¡Ahorro detectado!</strong> El costo de flete bajó{' '}
            <span className="text-primary font-bold">8%</span> al concentrar repartos en martes y sábados.
          </p>
        </div>
      </div>

      {/* Período & Filtros */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-on-surface-variant tracking-wider uppercase font-label">
            Período de Análisis
          </span>
          <button
            type="button"
            onClick={() => alert('Selector personalizado de rango de fechas')}
            className="text-[11px] text-primary font-medium flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-[14px]">tune</span> Personalizar
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'mes', label: 'Mes Actual (Octubre)' },
            { id: 'q3', label: 'Tercer Trimestre' },
            { id: 'primavera', label: 'Campaña Primavera 2024' },
            { id: 'anual', label: 'Anual 2024' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                period === p.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {period === p.id && (
                <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              )}
              <span>{p.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Estado de Resultados Agrícola */}
      <div className="rounded-2xl bg-surface-container-low p-5 space-y-4 shadow-sm border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
            </div>
            <span className="font-headline font-semibold text-base text-on-surface">
              Estado de Resultados
            </span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary-fixed/60 px-2 py-0.5 rounded-full">
            Margen Neto: 67%
          </span>
        </div>

        {/* KPI Principal */}
        <div className="rounded-xl bg-surface-container p-4 flex flex-col space-y-1 relative overflow-hidden border border-outline-variant/20">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
          <span className="text-xs font-medium text-on-surface-variant">
            Utilidad Neta en Campo (Octubre)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-headline font-bold text-3xl tracking-tight text-on-surface">
              S/. 4,850<span className="text-lg font-normal text-on-surface-variant">.00</span>
            </span>
            <span className="text-xs font-semibold text-primary flex items-center">
              <span className="material-symbols-outlined text-[14px]">trending_up</span> +12.4%
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant pt-0.5">
            Rendimiento óptimo tras cubrir insumos, jornal y riego.
          </p>
        </div>

        {/* Mini Desglose */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-on-surface-variant">Ventas Totales</span>
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px]">add</span>
              </span>
            </div>
            <p className="font-headline font-semibold text-base text-on-surface">+S/. 7,240.00</p>
            <span className="text-[10px] text-on-surface-variant mt-0.5">32 transacciones</span>
          </div>

          <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-medium text-on-surface-variant">Insumos & Operación</span>
              <span className="w-5 h-5 rounded-full bg-error-container text-error flex items-center justify-center">
                <span className="material-symbols-outlined text-[13px]">remove</span>
              </span>
            </div>
            <p className="font-headline font-semibold text-base text-error">-S/. 2,390.00</p>
            <span className="text-[10px] text-on-surface-variant mt-0.5">Abono, jornal y cajas</span>
          </div>
        </div>

        {/* Cuentas por Cobrar Pendientes */}
        <div className="rounded-xl bg-secondary-fixed/50 p-3 flex items-center justify-between border border-secondary/20">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-sm">schedule</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-on-secondary-fixed">Cuentas por Cobrar Pendientes</p>
              <p className="text-[10px] text-on-secondary-fixed-variant">3 pedidos entregados a feria local</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-headline font-bold text-xs text-on-secondary-fixed">S/. 680.00</p>
            <span className="text-[10px] text-tertiary font-semibold underline cursor-pointer">
              Ver fiados
            </span>
          </div>
        </div>
      </div>

      {/* Desglose de Rentabilidad por Cosecha */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="font-headline font-semibold text-base text-on-surface">Rentabilidad por Cosecha</h3>
            <p className="text-[11px] text-on-surface-variant">Margen sobre costo directo por producto</p>
          </div>
          <span className="text-[11px] text-on-surface-variant font-medium">3 líneas activas</span>
        </div>

        <div className="space-y-2.5">
          {/* Producto 1: Paltas */}
          <div className="rounded-2xl bg-surface-container-low p-3.5 space-y-2.5 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-11 h-11 rounded-xl object-cover bg-surface-container"
                  alt="Paltas"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCl5agftuAoxyG-XfFuuWpP8R6HaCz2ydUFbzqMav_9jR9t4IWcG7Bvoc5hgZ-0RuLALPCvLTeqGbU_AZwPoMqHoR0fAeV8IBY1LSdGHKkgb6mGbL_TAdK_9xaDKzjOnRPmw_y0zvSdnAKo8DRKfwBkYKk-9vOpy-AIVTmMiwpDjsNeDJFrMueCoWHb85s7t8OKpKI010FOHJ2mLQF6t5SmpmqEYOlETI9vPF8ENLJ97OXDr_aMGpsL_g"
                />
                <div>
                  <p className="font-headline font-semibold text-sm text-on-surface">Paltas (Hass & Fuerte)</p>
                  <p className="text-[11px] text-on-surface-variant">740 kg recolectados • Fundo Sur</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-sm text-on-surface">S/. 3,820.00</p>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  44% Margen
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '53%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant">
                <span>52.7% del total de ventas</span>
                <span>Costo est.: S/. 2,139.20</span>
              </div>
            </div>
          </div>

          {/* Producto 2: Quesos */}
          <div className="rounded-2xl bg-surface-container-low p-3.5 space-y-2.5 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-11 h-11 rounded-xl object-cover bg-surface-container"
                  alt="Quesos"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQakb6ZCb0FMfcgbT2SsguZXm7CT5DD1CHksaYTbyWZfLWwNaJybMit124AtEIeW2_Sq7mSXpCgGze8UIL2IX0EN_tg529TBxQNiNpuSafKrQvd2QmOwTuKsiPorxMKKoXsStQlt2MARW4YFXyBTvSpR6-Lv8C-zL3IQETZ8N9Ynn5XgsFdwNGq8KHu6ZDQ-RnHfs8q8kcgKwsG9I8xkAKD-dCB5fhJUOOyELZn6laVikPoeiz2G_MdA"
                />
                <div>
                  <p className="font-headline font-semibold text-sm text-on-surface">Quesos Artesanales</p>
                  <p className="text-[11px] text-on-surface-variant">145 moldes frescos de pastura</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-sm text-on-surface">S/. 2,180.00</p>
                <span className="text-[10px] font-bold text-tertiary bg-tertiary-fixed px-1.5 py-0.5 rounded">
                  34% Margen
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '30%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant">
                <span>30.1% del total de ventas</span>
                <span>Costo est.: S/. 1,438.80</span>
              </div>
            </div>
          </div>

          {/* Producto 3: Huevos */}
          <div className="rounded-2xl bg-surface-container-low p-3.5 space-y-2.5 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-11 h-11 rounded-xl object-cover bg-surface-container"
                  alt="Huevos"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD07x1Y7vR2y1DBylxbg0HCax2CoBx_b864jO5AAuaN_pkmwZFQjxoVgIVykEIW9iile6Fx82eWRzhJMxtGNUkvotO7ZYYVgj4kv2q5PW2g4JXZGVW6ue_UEPNMSZPldNNnBU_JC2XVQxJin51B2JiHH3Qe8sRXkKCwB2OQQWTYVBDEMeKvzj2mBEz29lfQQgNdiz1S4UdFTblDjQp37kprJHOJpgWQy2HQGK6fOH6yAOGOnwIfBKtInQ"
                />
                <div>
                  <p className="font-headline font-semibold text-sm text-on-surface">Huevos de Corral</p>
                  <p className="text-[11px] text-on-surface-variant">88 jaulas • Gallinas libres</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-sm text-on-surface">S/. 1,240.00</p>
                <span className="text-[10px] font-bold text-secondary bg-secondary-fixed px-1.5 py-0.5 rounded">
                  26% Margen
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-fixed-dim h-full rounded-full" style={{ width: '17%' }} />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant">
                <span>17.2% del total de ventas</span>
                <span>Costo est.: S/. 917.60</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Canales de Cobro */}
      <div className="rounded-2xl bg-surface-container-low p-5 space-y-4 shadow-sm border border-outline-variant/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">payments</span>
            </div>
            <div>
              <h3 className="font-headline font-semibold text-base text-on-surface">Canales de Cobro</h3>
              <p className="text-[11px] text-on-surface-variant">Liquidez y velocidad de cobro</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-primary bg-primary-fixed/80 px-2 py-0.5 rounded-full">
            90% Cobrado
          </span>
        </div>

        {/* Barra Segmentada */}
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded-full flex overflow-hidden bg-surface-container">
            <div className="bg-primary h-full" style={{ width: '62%' }} />
            <div className="bg-tertiary-container h-full" style={{ width: '28%' }} />
            <div className="bg-secondary-fixed-dim h-full" style={{ width: '10%' }} />
          </div>
          <div className="flex justify-between text-[10px] text-on-surface-variant px-0.5 font-medium">
            <span>Digital (62%)</span>
            <span>Efectivo (28%)</span>
            <span>Fiado (10%)</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-base">qr_code_scanner</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface">Yape / Plin</p>
                <p className="text-[10px] text-primary font-medium">Liquidación inmediata en cuenta</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-headline font-bold text-xs text-on-surface">S/. 4,488.80</p>
              <span className="text-[10px] text-on-surface-variant font-medium">62.0%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-base">point_of_sale</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface">Efectivo en Puesto / Fundo</p>
                <p className="text-[10px] text-on-surface-variant">Caja chica y ferias dominicales</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-headline font-bold text-xs text-on-surface">S/. 2,027.20</p>
              <span className="text-[10px] text-on-surface-variant font-medium">28.0%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-base">pending_actions</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-on-surface">Crédito / Fiado</p>
                <p className="text-[10px] text-error font-medium">Cobro programado a 7-15 días</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-headline font-bold text-xs text-on-surface">S/. 724.00</p>
              <span className="text-[10px] text-on-surface-variant font-medium">10.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exportación & Trámites */}
      <div className="space-y-3 pt-1">
        <div className="px-1">
          <h3 className="font-headline font-semibold text-base text-on-surface">Exportación y Trámites</h3>
          <p className="text-[11px] text-on-surface-variant">
            Documentos oficiales listos para SUNAT o entidades financieras
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Generando y descargando archivo Excel .xlsx adaptado para SUNAT / Nuevo RUS...')}
          className="w-full bg-primary text-on-primary rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-[0.99] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-2xl">table_view</span>
            </div>
            <div className="text-left">
              <p className="font-headline font-bold text-sm tracking-tight leading-tight">
                Descargar Reporte en Excel (.xlsx)
              </p>
              <p className="text-[11px] text-on-primary-container font-medium mt-0.5">
                Adaptado a Formato SUNAT / Nuevo RUS
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-xl">download</span>
        </button>

        <button
          type="button"
          onClick={() => alert('Generando Balance oficial en PDF para Caja Huancayo & Agrobanco...')}
          className="w-full bg-surface-container-low text-on-surface rounded-2xl p-4 flex items-center justify-between hover:bg-surface-container active:scale-[0.99] transition-all border border-outline-variant/30"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-2xl">picture_as_pdf</span>
            </div>
            <div className="text-left">
              <p className="font-headline font-semibold text-sm text-on-surface leading-tight">
                Exportar Balance en PDF
              </p>
              <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">
                Aprobado para Caja Huancayo & Agrobanco
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-xl text-on-surface-variant">chevron_right</span>
        </button>

        <div className="rounded-2xl bg-surface-container-low p-4 flex items-center justify-between border border-outline-variant/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed/50 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">send</span>
            </div>
            <div>
              <p className="font-headline font-semibold text-sm text-on-surface">Enviar Cierre al Contador</p>
              <p className="text-[11px] text-on-surface-variant">Vía WhatsApp o Correo electrónico</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <a
              href="https://wa.me/?text=Hola%20Contador,%20le%20hago%20llegar%20el%20resumen%20del%20cierre%20financiero%20del%20Fundo%20San%20Isidro%20para%20la%20declaración%20RUS."
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary-fixed transition-colors"
              title="Compartir vía WhatsApp"
            >
              <span className="material-symbols-outlined text-lg">chat</span>
            </a>
            <a
              href="mailto:contador@fundo.pe?subject=Cierre%20Mensual%20Fundo%20San%20Isidro&body=Adjunto%20resumen%20financiero%20de%20la%20cosecha."
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
              title="Compartir vía Correo"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>
          </div>
        </div>
      </div>

      <div className="pt-2 pb-4 text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1 mx-auto"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Volver a Pantalla Principal
        </button>
      </div>
    </div>
  );
};
