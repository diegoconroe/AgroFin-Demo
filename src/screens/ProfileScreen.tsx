import React, { useState } from 'react';

interface ProfileScreenProps {
  onBack: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onBack }) => {
  const [remindersActive, setRemindersActive] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [syncMessage, setSyncMessage] = useState<string>('Último respaldo: Hoy 06:00 AM');
  const [templateEditing, setTemplateEditing] = useState<boolean>(false);
  const [waTemplate, setWaTemplate] = useState<string>(
    '"¡Buen día estimado/a {cliente}! Saludos cordiales de Don Manuel de Fundo San Isidro. Le enviamos el resumen de su pedido por S/. {monto}. Puede abonar vía Yape/Plin o BCP. ¡Muchas gracias por apoyar nuestra cosecha!"'
  );

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncMessage('Sincronizado ahora mismo con éxito ✓');
      setTimeout(() => {
        setSyncMessage('Último respaldo: Hace unos instantes');
      }, 3000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-28 gap-5 max-w-lg mx-auto">
      {/* Perfil del Productor Hero Card */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-5 shadow-sm border border-outline-variant/30">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary/5 pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              className="w-18 h-18 rounded-full object-cover shadow-sm bg-surface-container border-2 border-primary/20"
              alt="Don Manuel Quispe"
              width={72}
              height={72}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdQhFAi08qufKhT88QxxS7Il40cxqP8om7spglJpOCfR1Z-v16g-FjlL6U-A69YzYV_YCAKjrFNg13VfxBPMIh21uTkomQf3A4OibB0sgx89L6AEv7i_S54L5zRjiFkyrMNoaieLfZRa3XY42mqUlOoOz9xt6U0cWR3UpvtMG3WaLiiMaJjUzzQkAtJH_h4MlfCecECpazVFuN43OwB36WOdaHevylLDyDxHOzki8A1DgYgBouxZRZIQ"
            />
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-[13px]">verified</span>
            </span>
          </div>

          <div className="flex flex-col min-w-0 flex-1">
            <h1 className="font-headline font-semibold text-xl text-on-surface truncate tracking-tight">
              Don Manuel Quispe
            </h1>
            <p className="font-body text-xs text-on-surface-variant font-medium flex items-center gap-1 mb-1">
              <span className="material-symbols-outlined text-[14px] text-tertiary">agriculture</span>
              <span>Fundo San Isidro</span>
            </p>
            <p className="font-body text-[11px] text-on-surface-variant tracking-wide font-mono">
              RUC 10458923411 • RUS Agrícola
            </p>
            <div className="mt-2.5 inline-flex items-center self-start gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-tertiary text-[10px] font-label font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>Verificada • Lunahuaná</span>
            </div>
          </div>
        </div>
      </div>

      {/* Resumen Rápido Financiero */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[11px] text-on-surface-variant font-semibold">
              Moneda Operativa
            </span>
            <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
          </div>
          <div>
            <div className="font-headline text-sm font-bold text-on-surface">PEN (S/.)</div>
            <p className="text-[10px] text-on-surface-variant font-body">Soles peruanos</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col justify-between border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label text-[11px] text-on-surface-variant font-semibold">
              Ciclo Contable
            </span>
            <span className="material-symbols-outlined text-tertiary text-[18px]">event_repeat</span>
          </div>
          <div>
            <div className="font-headline text-sm font-bold text-on-surface">Mensual</div>
            <p className="text-[10px] text-on-surface-variant font-body">Cierre a fin de mes</p>
          </div>
        </div>

        <div className="col-span-2 p-4 rounded-xl bg-surface-container-low shadow-sm flex items-center justify-between gap-3 border border-outline-variant/30">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary-fixed text-[22px]">trending_up</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-label font-medium text-on-surface-variant">Acumulado Anual 2024</p>
              <p className="font-headline text-lg font-bold text-on-surface truncate">S/. 78,400.00</p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-full bg-primary-fixed-dim/40 text-on-primary-fixed-variant text-[11px] font-label font-bold shrink-0">
            +14.8% vs 2023
          </div>
        </div>
      </div>

      {/* Negocio y Operaciones */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-headline font-semibold text-base text-on-surface">Negocio y Operaciones</h2>
          <button
            type="button"
            onClick={() => alert('Edición de datos de Fundo San Isidro')}
            className="text-[11px] font-label text-primary font-medium hover:underline"
          >
            Editar datos
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Card Fundo */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">home_work</span>
                </div>
                <div>
                  <h3 className="font-headline text-sm font-semibold text-on-surface">Fundo San Isidro</h3>
                  <p className="text-[11px] text-on-surface-variant">Km 14.5 Carretera a Cañete, Lunahuaná</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Parámetros de geolocalización y área de cultivo')}
                className="text-on-surface-variant hover:text-on-surface p-1"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-label font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-primary">eco</span>
                Paltas Hass
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-label font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-tertiary">egg</span>
                Huevos de Corral
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface text-[11px] font-label font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-secondary">lunch_dining</span>
                Queso Fresco
              </span>
            </div>
          </div>

          {/* Cuentas de Cobranza */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-3 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="font-headline text-sm font-semibold text-on-surface">Cuentas y Cobranza</h3>
                  <p className="text-[11px] text-on-surface-variant">Billeteras y transferencias activas</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => alert('Configuración de QR y llaves de cobro Yape/Plin')}
                className="text-xs font-label text-primary font-semibold hover:underline"
              >
                Gestionar
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 border border-outline-variant/20">
                <div className="w-6 h-6 rounded-full bg-[#752482]/20 text-[#752482] flex items-center justify-center text-[11px] font-bold">
                  Y
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Yape</p>
                  <p className="text-[10px] text-on-surface-variant truncate">940 *** 812</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 border border-outline-variant/20">
                <div className="w-6 h-6 rounded-full bg-[#009bde]/20 text-[#009bde] flex items-center justify-center text-[11px] font-bold">
                  P
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Plin</p>
                  <p className="text-[10px] text-on-surface-variant truncate">940 *** 812</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 border border-outline-variant/20">
                <div className="w-6 h-6 rounded-full bg-[#002a66]/20 text-[#002a66] flex items-center justify-center text-[10px] font-bold">
                  BCP
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">BCP Soles</p>
                  <p className="text-[10px] text-on-surface-variant truncate">Cta: 191-492...04</p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-secondary text-[18px]">local_atm</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-on-surface truncate">Efectivo</p>
                  <p className="text-[10px] text-on-surface-variant truncate">En fundo / entrega</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plantilla WhatsApp */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-2.5 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[19px]">chat</span>
                </div>
                <div>
                  <h3 className="font-headline text-sm font-semibold text-on-surface">Cobro por WhatsApp</h3>
                  <p className="text-[11px] text-on-surface-variant">Plantilla con saludo cordial y detalles</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTemplateEditing(!templateEditing)}
                className="text-xs font-label text-primary font-semibold hover:underline"
              >
                {templateEditing ? 'Listo' : 'Editar'}
              </button>
            </div>

            {templateEditing ? (
              <textarea
                value={waTemplate}
                onChange={(e) => setWaTemplate(e.target.value)}
                rows={3}
                className="p-2 rounded-lg bg-surface-container text-xs font-body text-on-surface outline-none border border-outline-variant/40"
              />
            ) : (
              <div className="p-3 rounded-lg bg-surface-container-low text-xs font-body text-on-surface-variant leading-relaxed border border-outline-variant/20">
                <p className="italic text-on-surface mb-1">{waTemplate}</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-secondary">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[13px] text-primary">check_circle</span>
                    Formato listo para enviar
                  </span>
                  <span className="font-mono text-[10px]">v1.4</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preferencias del Sistema */}
      <div className="flex flex-col gap-2">
        <h2 className="font-headline font-semibold text-base text-on-surface px-1">
          Preferencias del Sistema
        </h2>

        <div className="flex flex-col gap-2.5">
          {/* Recordatorios */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[19px]">notifications_active</span>
              </div>
              <div>
                <p className="font-headline text-sm font-semibold text-on-surface">Recordatorios automáticos</p>
                <p className="text-[11px] text-on-surface-variant">Alertas de fiados a 7 y 15 días</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRemindersActive(!remindersActive)}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                remindersActive ? 'bg-primary' : 'bg-surface-container-highest'
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full bg-surface shadow-sm transform transition-transform ${
                  remindersActive ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Backup Cloud */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between border border-outline-variant/30">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[19px]">cloud_done</span>
              </div>
              <div>
                <p className="font-headline text-sm font-semibold text-on-surface">Copia en la nube</p>
                <p className="text-[11px] text-on-surface-variant font-medium text-primary">
                  {syncMessage}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="text-xs font-label font-bold text-primary hover:underline px-2 py-1 flex items-center gap-1"
            >
              {syncing && <span className="material-symbols-outlined text-[14px] animate-spin">sync</span>}
              <span>{syncing ? 'Guardando...' : 'Sincronizar'}</span>
            </button>
          </div>

          {/* Exportación */}
          <div className="p-4 rounded-xl bg-surface-container-low shadow-sm flex items-center justify-between gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[19px]">table_chart</span>
              </div>
              <div className="min-w-0">
                <p className="font-headline text-sm font-semibold text-on-surface truncate">
                  Exportar Datos Agrícolas
                </p>
                <p className="text-[11px] text-on-surface-variant truncate">Libro de ventas y gastos 2024</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert('Descargando archivo Excel y balance PDF...')}
              className="px-3 py-2 rounded-lg bg-primary text-on-primary text-xs font-label font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform shrink-0"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Excel / PDF</span>
            </button>
          </div>

          {/* Soporte */}
          <div
            onClick={() => alert('Línea comunitaria: +51 984 000 123 (Lunahuaná)')}
            className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer border border-outline-variant/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[19px]">support_agent</span>
              </div>
              <div>
                <p className="font-headline text-sm font-semibold text-on-surface">
                  Ayuda y Soporte al Productor
                </p>
                <p className="text-[11px] text-on-surface-variant">Línea directa comunitaria de Lunahuaná</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">chevron_right</span>
          </div>
        </div>
      </div>

      {/* Footer session buttons */}
      <div className="pt-2 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={() => alert('Cambiando a Huerto Cañete...')}
          className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface font-label text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-tertiary">swap_horiz</span>
          <span>Cambiar de Fundo / Emprendimiento</span>
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-3 px-4 rounded-xl bg-surface-container-high text-on-surface font-label text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-container-highest transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Volver a Pantalla Principal</span>
        </button>

        <p className="text-center font-body text-[11px] text-on-surface-variant pt-1">
          AgroFinanzas Rural v2.4 • Fundo San Isidro
        </p>
      </div>
    </div>
  );
};
