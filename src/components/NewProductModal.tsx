import React, { useState } from 'react';
import { Product } from '../data/mockData';

interface NewProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProduct: (product: Partial<Product>) => void;
}

export const NewProductModal: React.FC<NewProductModalProps> = ({
  isOpen,
  onClose,
  onSaveProduct,
}) => {
  const [name, setName] = useState<string>('Palta Fuerte Extra de Exportación');
  const [selectedCrop, setSelectedCrop] = useState<string>('Paltas');
  const [category, setCategory] = useState<'paltas' | 'lacteos' | 'huevos' | 'otros'>('paltas');
  const [unit, setUnit] = useState<string>('Kilogramo (kg)');
  const [unitKey, setUnitKey] = useState<string>('kg');
  const [sellPrice, setSellPrice] = useState<number>(9.50);
  const [costPrice, setCostPrice] = useState<number>(5.20);
  const [stock, setStock] = useState<number>(120);
  const [minStock, setMinStock] = useState<number>(20);

  if (!isOpen) return null;

  const profit = Math.max(0, sellPrice - costPrice);
  const margin = sellPrice > 0 ? (profit / sellPrice) * 100 : 0;

  const cropImages: Record<string, string> = {
    Paltas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCnDEmEc-uAcSRxu9eDDVXvnAjVYPDJ8vlz5Z-EkIjoPl5Mp_B0Y-bAihdYwraMXmoQGUR22xNkPX8lSHRAuPc1BcR4SP1e9d7caXdoCEBc1Hd8UKqJh685BmOvq_kXpea3QzpjMs6cPyMj3q-UH2LriWfx9FtOn0lsweJtXylibpm1Dh_sugKCuVE7u1Wh_5QyH06KFJCKR0JaVRt5Xi_qwKmBX_BPVfcJb54GZKml7cF9rSmdRS79w',
    Lácteos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_0Gm5y99wqnUhUcgHoXEKFneoqDAs18_edCsps7uayF_PLgkiBijR7SAhRG5q9Ee_fTc_Kfu11t-pkyFRs_UjECS_q3O0idisCg5x5R-aQt5PxcbjN4lLp-HGEYg73xF6Gj4hJWCEWpKpj2IwbQhlvYtBEgCF-t8ri_7TdgLeHzizwBJLBfFUT33v1nUBN_LsGg106c1AtBuYPrDgtZfxxDa3EvYmoMhfZPN2yidwC5deGSGt98fiDA',
    Huevos: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW3GeuqL9TZ6aREAIjM06Nt6bHKhWbCKK0GEXcLAE-_5fSEr4SxyNxSiUPq3g2yN2Jx_wTqo5uAb4G4U2SicRg1RV7Guf-zKG5SFEKnJBhWEUuLLtWWy5WBaT88SXEE0RexmZpHAZh-Ztu9FveC_X93LrXPBzqZix8ge3L-2POU8aJ8Mbo195Ez70nXaEUB9bHj35Q-t7qsot8mmn_k9cqqlBl_JN_pUzQ9I1Mckgqh8xJr5L6wFCPuA',
    Hortalizas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6mE1kIS2FyhNbGkI2jU4SsUDxuQCMDUVqrF7YXlUBomMwwzlTxWlnF2h4MwNf12p8QHY-VtpPP31HTz5e3dRRSTw1KqNSLZZOJtT7W_jvfmPxcNWFwC3Yx3RYK0OGiy1FoMYbpfJydhaQackAsx41Z8iAxtQRUFz2iIhhIbkJBj5UzC5Ji9eSs9lSh4VAwHg4RjI1-BfAjKTlFWi3FNFWkvQBVSfrTUYBEU8CLWi-1DEhyRSDPrMLVA',
    Frutas: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1-cG_thmRTZEGS_NfXrWyNnaKePz4zOZBZ0wG8jSo9KQiOkXTOapUHRifZ-bc85pd3Ue9nKBoBdCmko2EMY6wTI1J33CYNC1F8QIKb_nvfDBGeYP5I3Ukw3Zk9mgUfBhFgXtJyPzbsZ-BQvxZ6ycFyqFjkYKgd_oPFQJbNbfuhAKcfmIk5QW4O4HrYaGXfTS5G4D5VdJ0wRlLdvpNDKN0QWn1hE9bShPZVzKUQCVSZhPQR2TCAUTVkg',
  };

  const handleSave = (addAnother: boolean = false) => {
    onSaveProduct({
      name,
      category,
      price: sellPrice,
      cost: costPrice,
      marginPercent: Math.round(margin),
      stock,
      unit: unitKey,
      stockUnit: unitKey,
      stockLabel: 'Stock en granja',
      image: cropImages[selectedCrop] || cropImages.Paltas,
      minStock,
      badge: margin >= 40 ? 'Óptimo' : 'Regular',
      badgeType: margin >= 40 ? 'optimo' : 'regular',
    });

    if (addAnother) {
      setName('');
      setStock(50);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex flex-col justify-end overflow-y-auto pt-6">
      <div className="w-full max-w-lg mx-auto bg-surface rounded-t-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 pt-3 pb-3 bg-surface-container-low flex items-start justify-between border-b border-outline-variant/30 flex-shrink-0">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
              <span className="material-symbols-outlined text-[14px] text-primary">eco</span>
              Inventario Productivo
            </div>
            <h2 className="font-headline text-xl font-semibold text-on-surface tracking-tight">
              Nuevo Producto en Catálogo
            </h2>
            <p className="font-body text-xs text-on-surface-variant">
              Añade cosechas, derivados o insumos con seguimiento de márgenes.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-all flex-shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-4 overflow-y-auto flex-1">
          {/* 1. Crop Icon selector */}
          <div className="bg-surface-container-low rounded-xl p-4 shadow-sm space-y-3 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <label className="font-headline text-sm font-semibold text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">photo_camera</span>
                Foto o Ilustración
              </label>
              <span className="text-xs font-label text-on-surface-variant">Opcional recomendado</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { name: 'Paltas', icon: '🥑', cat: 'paltas' },
                { name: 'Lácteos', icon: '🧀', cat: 'lacteos' },
                { name: 'Huevos', icon: '🥚', cat: 'huevos' },
                { name: 'Hortalizas', icon: '🥬', cat: 'otros' },
                { name: 'Frutas', icon: '🍊', cat: 'otros' },
              ].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => {
                    setSelectedCrop(c.name);
                    setCategory(c.cat as any);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-label transition-all flex-shrink-0 ${
                    selectedCrop === c.name
                      ? 'bg-primary text-on-primary font-bold shadow-xs'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            <div className="relative w-full rounded-xl overflow-hidden bg-surface-container flex flex-col items-center justify-center p-4 text-center">
              <img
                src={cropImages[selectedCrop] || cropImages.Paltas}
                alt="Crop preview"
                className="w-20 h-20 rounded-xl object-cover shadow-sm mb-2"
              />
              <p className="font-headline text-xs font-semibold text-on-surface">
                {selectedCrop} seleccionada para catálogo
              </p>
              <span className="text-[10px] text-on-surface-variant">Foto optimizada de alta calidad</span>
            </div>
          </div>

          {/* 2. Product name */}
          <div className="space-y-1.5">
            <label className="font-headline text-sm font-semibold text-on-surface flex items-center gap-1.5">
              <span>Nombre del Producto</span>
              <span className="text-error text-xs">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ej. Palta Fuerte Extra, Queso Mantecoso 1kg"
              className="w-full px-4 py-3 rounded-lg bg-surface-container text-on-surface placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:outline-none transition-all text-sm font-body border border-outline-variant/30"
            />
          </div>

          {/* 3. Category & Unit */}
          <div className="bg-surface-container-low rounded-xl p-4 shadow-sm space-y-4 border border-outline-variant/30">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-headline text-sm font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">scale</span>
                  <span>Unidad de Venta</span>
                </label>
                <span className="text-xs font-label font-bold text-primary">{unit}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Kilogramo (kg)', key: 'kg' },
                  { label: 'Jaba / Caja', key: 'jaba' },
                  { label: 'Molde (~1kg)', key: 'molde' },
                  { label: 'Docena', key: 'docena' },
                  { label: 'Unidad individual', key: 'unidad', colSpan: true },
                ].map((u) => (
                  <button
                    key={u.key}
                    type="button"
                    onClick={() => {
                      setUnit(u.label);
                      setUnitKey(u.key);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold text-left transition-all ${
                      u.colSpan ? 'col-span-2' : ''
                    } ${
                      unit === u.label
                        ? 'bg-primary text-on-primary shadow-xs'
                        : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{u.label}</span>
                    {unit === u.label && (
                      <span className="material-symbols-outlined text-base">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Cost, Price and Margin */}
          <div className="bg-surface-container-low rounded-xl p-4 shadow-sm space-y-4 border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-headline text-sm font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">payments</span>
                  Precios y Márgenes en Soles
                </h3>
                <p className="text-xs text-on-surface-variant font-body">Cálculo de rentabilidad por unidad</p>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                PEN (S/.)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-headline font-semibold text-on-surface">Precio Venta</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-on-surface-variant">S/.</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-container text-on-surface font-headline font-semibold text-base focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-headline font-semibold text-on-surface">Costo Cosecha/Prod.</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-on-surface-variant">S/.</span>
                  <input
                    type="number"
                    step="0.10"
                    min="0"
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-container text-on-surface font-headline font-semibold text-base focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic margin badge */}
            <div
              className={`rounded-xl p-3.5 flex items-center justify-between gap-3 transition-all duration-300 ${
                margin >= 30
                  ? 'bg-primary-fixed text-on-primary-fixed'
                  : margin >= 15
                  ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                  : 'bg-error-container text-on-error-container'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-surface-container-lowest/80 flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-xl">trending_up</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold font-label">Margen estimado:</span>
                    <span className="font-headline font-bold text-base text-primary">
                      {margin.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs font-body text-on-primary-fixed-variant truncate">
                    Ganancia neta: S/. {profit.toFixed(2)} por {unitKey}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded bg-surface-container-lowest/70 text-on-surface-variant">
                {margin >= 30 ? 'Saludable' : margin >= 15 ? 'Moderado' : 'Ajustado'}
              </span>
            </div>
          </div>

          {/* 5. Stock and Alerts */}
          <div className="bg-surface-container-low rounded-xl p-4 shadow-sm space-y-4 border border-outline-variant/30">
            <div className="space-y-0.5">
              <h3 className="font-headline text-sm font-semibold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[18px]">inventory</span>
                Control de Stock y Alertas de Merma
              </h3>
              <p className="text-xs text-on-surface-variant font-body">
                Monitorea tus existencias para no quedarte desabastecido
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-headline font-semibold text-on-surface">Stock Disponible</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-on-surface font-headline font-semibold text-base focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                  />
                  <span className="absolute right-3 text-xs text-on-surface-variant font-bold pointer-events-none">
                    {unitKey}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-headline font-semibold text-on-surface">Alerta Stock Bajo</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    min="0"
                    value={minStock}
                    onChange={(e) => setMinStock(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3 py-2.5 rounded-lg bg-surface-container text-on-surface font-headline font-semibold text-base focus:bg-surface-container-lowest focus:outline-none transition-all border border-outline-variant/30"
                  />
                  <span className="absolute right-3 text-xs text-on-surface-variant font-bold pointer-events-none">
                    {unitKey}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface-container flex items-center gap-2.5 text-xs text-on-surface-variant font-body">
              <span className="material-symbols-outlined text-tertiary text-base flex-shrink-0">
                notifications_active
              </span>
              <span>Recibirás un aviso en el resumen diario cuando tu stock descienda a {minStock} {unitKey}.</span>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-4 bg-surface border-t border-outline-variant/30 flex flex-col gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-headline font-semibold text-base shadow-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-xl">check</span>
            <span>Guardar Producto en Catálogo</span>
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-surface-container text-primary font-headline font-semibold text-xs hover:bg-surface-container-high active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>Guardar y agregar otro</span>
          </button>
        </div>
      </div>
    </div>
  );
};
