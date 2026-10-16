import React, { useState, useMemo } from 'react';
import {
  BLADES_CATALOG,
  RUBBERS_CATALOG,
  BladeItem,
  RubberItem,
} from '../data/equipmentData';
import {
  Search,
  ArrowRight,
  SlidersHorizontal,
  Compass,
  Layers,
  Shield,
  Zap,
} from 'lucide-react';
import { EquipmentDetailModal } from './EquipmentDetailModal';
import { EquipmentQuizModal } from './EquipmentQuizModal';

export type EquipmentQuizTrackId = 'rubber_single' | 'rubber_dual' | 'blade' | 'full_setup';

interface EquipmentLabTabProps {
  initialMode?: string;
}

export const EquipmentLabTab: React.FC<EquipmentLabTabProps> = ({
  initialMode,
}) => {
  // Detail popup state
  const [selectedDetailItem, setSelectedDetailItem] = useState<BladeItem | RubberItem | null>(null);

  // Active Quiz Modal state (null when closed)
  const [activeQuizTrack, setActiveQuizTrack] = useState<EquipmentQuizTrackId | null>(
    initialMode === 'rubber_single' ||
      initialMode === 'rubber_dual' ||
      initialMode === 'blade' ||
      initialMode === 'full_setup'
      ? (initialMode as EquipmentQuizTrackId)
      : null
  );

  // Price Catalog filtering
  const [catalogCategory, setCatalogCategory] = useState<'all' | 'blades' | 'rubbers'>('all');
  const [catalogSearch, setCatalogSearch] = useState('');

  // -------------------------------------------------------------
  // COMBINED SORTED LIST (Lowest to Highest Price)
  // -------------------------------------------------------------
  const allEquipmentSorted = useMemo(() => {
    const items: (
      | (BladeItem & { itemCategory: 'blade' })
      | (RubberItem & { itemCategory: 'rubber' })
    )[] = [
      ...BLADES_CATALOG.map((b) => ({ ...b, itemCategory: 'blade' as const })),
      ...RUBBERS_CATALOG.map((r) => ({ ...r, itemCategory: 'rubber' as const })),
    ];
    return items.sort((a, b) => a.price - b.price);
  }, []);

  const filteredEquipment = useMemo(() => {
    return allEquipmentSorted.filter((item) => {
      const matchesCat =
        catalogCategory === 'all' ||
        (catalogCategory === 'blades' && item.itemCategory === 'blade') ||
        (catalogCategory === 'rubbers' && item.itemCategory === 'rubber');
      if (!matchesCat) return false;

      if (!catalogSearch.trim()) return true;
      const q = catalogSearch.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        ('bladeType' in item && item.bladeType.toLowerCase().includes(q)) ||
        ('type' in item && item.type.toLowerCase().includes(q))
      );
    });
  }, [allEquipmentSorted, catalogCategory, catalogSearch]);

  return (
    <div className="space-y-6 animate-fade-in text-slate-200">
      {/* Detail Pop-up Modal for any clicked blade or rubber */}
      <EquipmentDetailModal
        item={selectedDetailItem}
        isOpen={!!selectedDetailItem}
        onClose={() => setSelectedDetailItem(null)}
      />

      {/* 1-by-1 Question Diagnostic Pop-up Modal */}
      <EquipmentQuizModal
        trackId={activeQuizTrack}
        isOpen={!!activeQuizTrack}
        onClose={() => setActiveQuizTrack(null)}
        onViewItemDetail={(item) => setSelectedDetailItem(item)}
      />

      {/* Clean Minimalist Header (NO emojis) */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/30 p-6 shadow-[0_0_30px_rgba(6,182,212,0.12)]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-mono text-xs font-bold text-cyan-400 tracking-widest uppercase">
            Omni Evolution Lab
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
          EQUIPMENT LAB & TECHNICAL CATALOG
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1 max-w-3xl leading-relaxed">
          Comprehensive inventory of blades and rubbers sorted strictly lowest to highest price.
          Click any item to view complete technical metrics, or launch a diagnostic selector to answer questions one by one.
        </p>

        {/* 4 Interactive Finders / Track Selectors (NO weird emojis) */}
        <div className="mt-5 pt-4 border-t border-slate-800/80">
          <div className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch Equipment Diagnostic (Questions One by One):</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveQuizTrack('rubber_single')}
              className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 text-left transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Rubber Selector (Single)
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                7 Questions • Forehand or Backhand
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveQuizTrack('rubber_dual')}
              className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 text-left transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Dual Rubber Selector (Both)
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                9 Questions • Forehand + Backhand Pair
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveQuizTrack('blade')}
              className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 text-left transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Blade Selector
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                7 Questions • Plies, Stiffness & Weight
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveQuizTrack('full_setup')}
              className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/60 text-left transition-all cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-300 transition-colors">
                  Full Setup Builder
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                13 Questions • Complete 3-Piece Racket
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* FULL PRICE CATALOG (Sorted Lowest to Highest Price)       */}
      {/* ========================================================= */}
      <div className="space-y-4">
        {/* Controls Bar: Category Filter & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setCatalogCategory('all')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md font-bold transition-colors cursor-pointer ${
                catalogCategory === 'all'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Equipment ({allEquipmentSorted.length})
            </button>
            <button
              onClick={() => setCatalogCategory('blades')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md font-bold transition-colors cursor-pointer ${
                catalogCategory === 'blades'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Blades ({BLADES_CATALOG.length})
            </button>
            <button
              onClick={() => setCatalogCategory('rubbers')}
              className={`px-3 py-1.5 text-xs font-mono rounded-md font-bold transition-colors cursor-pointer ${
                catalogCategory === 'rubbers'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Rubbers ({RUBBERS_CATALOG.length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gear, brand, or plies..."
              value={catalogSearch}
              onChange={(e) => setCatalogSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Counter & Instruction */}
        <div className="text-xs font-mono text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <span>Showing {filteredEquipment.length} items (sorted lowest to highest price)</span>
          <span className="text-cyan-400 font-semibold">Click any card to open complete stats & playstyle dossier</span>
        </div>

        {/* Price Sorted Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredEquipment.map((item) => {
            const isBlade = item.itemCategory === 'blade';
            const blade = isBlade ? (item as BladeItem) : null;
            const rubber = !isBlade ? (item as RubberItem) : null;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedDetailItem(item)}
                className="group relative bg-slate-950/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/60 rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Cost */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isBlade
                          ? 'bg-amber-950/70 border border-amber-500/40 text-amber-300'
                          : 'bg-rose-950/70 border border-rose-500/40 text-rose-300'
                      }`}
                    >
                      {isBlade ? 'BLADE' : 'RUBBER'} • {item.brand}
                    </span>
                    <span className="text-sm font-mono font-black text-cyan-400">
                      {item.priceFormatted}
                    </span>
                  </div>

                  {/* Item Name */}
                  <h4 className="text-base font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                    {item.name}
                  </h4>

                  {/* Secondary Type Info */}
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {isBlade ? blade?.bladeType : rubber?.type}
                  </p>

                  {/* Key Stats Bar */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-900 text-[11px] font-mono text-slate-400">
                    {isBlade ? (
                      <>
                        <span>Speed: <strong className="text-amber-400">{blade?.speedRating}</strong></span>
                        <span>Control: <strong className="text-cyan-400">{blade?.controlRating}</strong></span>
                        <span className="truncate">{blade?.touch}</span>
                      </>
                    ) : (
                      <>
                        <span>Spd: <strong className="text-amber-400">{rubber?.speed}</strong></span>
                        <span>Spn: <strong className="text-rose-400">{rubber?.spin}</strong></span>
                        <span>Ctrl: <strong className="text-cyan-400">{rubber?.control}</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* Bottom link */}
                <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-mono text-cyan-400/80 group-hover:text-cyan-300">
                  <span>View full dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
