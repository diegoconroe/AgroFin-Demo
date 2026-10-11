import React from 'react';

interface HeaderProps {
  currentTab: string;
  subTitle?: string;
  onOpenCalendar: () => void;
  onOpenProfile: () => void;
  onBack?: () => void;
  canBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  subTitle,
  onOpenCalendar,
  onOpenProfile,
  onBack,
  canBack,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(46,50,48,0.04)] border-b border-outline-variant/30">
      <div className="h-16 px-4 flex items-center justify-between gap-3 max-w-lg mx-auto">
        <div className="flex items-center gap-2.5 min-w-0">
          {canBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Volver"
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container transition-colors -ml-2"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : null}
          <img
            alt="AgroFinanzas Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida/AEtjO1V8uLO3f36LFMmb9pgm4_X44AJ6fLzz38APnPVDqhLG-e491ap8-dnjZxFB18GdfS1FuU7AwAYYPtABts6KrNkl6Fsswn6Vqrbjx4MBoWutfg20yKt0lt32yfF_ijvVy810g41vO8sNTfYHKAI0oVz-5X7nCxLHms8VeXTQlT8pj59k3b5N5WdFFCiCJPOpHgEAzSn85WYKbS0PGa1GSeoV5_W06QxAykd1EvkB2faD_Ejo_HzXCf7MfaF_"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-headline font-semibold text-base text-on-surface tracking-tight leading-tight truncate">
              AgroFinanzas
            </span>
            <span className="text-[11px] font-label text-on-surface-variant leading-none truncate">
              {subTitle || currentTab}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onOpenCalendar}
            className="min-h-[38px] px-2.5 py-1.5 rounded-lg bg-surface-container flex items-center gap-1 text-xs font-label text-on-surface-variant hover:text-on-surface transition-colors shadow-xs active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
            <span>Mes Actual</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
          <button
            onClick={onOpenProfile}
            type="button"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-xs active:scale-95 hover:opacity-90 transition-opacity"
            title="Perfil de Don Manuel"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
