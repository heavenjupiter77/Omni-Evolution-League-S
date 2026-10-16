import React from 'react';
import { BladeItem, RubberItem } from '../data/equipmentData';
import { X, Shield, Sparkles, Layers, Zap, Target, Gauge, Award, CheckCircle2 } from 'lucide-react';

interface EquipmentDetailModalProps {
  item: BladeItem | RubberItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EquipmentDetailModal: React.FC<EquipmentDetailModalProps> = ({
  item,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !item) return null;

  const isBlade = 'bladeType' in item;
  const blade = isBlade ? (item as BladeItem) : null;
  const rubber = !isBlade ? (item as RubberItem) : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-slate-950 rounded-2xl border border-cyan-500/40 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge & Brand */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
            {isBlade ? 'TABLE TENNIS BLADE' : 'TABLE TENNIS RUBBER'}
          </span>
          <span className="text-xs font-mono text-slate-400 font-semibold">{item.brand}</span>
        </div>

        {/* Item Title & Price */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800/80 pb-4 mb-4">
          <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            {item.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">COST:</span>
            <span className="text-2xl font-mono font-extrabold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
              {item.priceFormatted}
            </span>
          </div>
        </div>

        {/* Core Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          {blade && (
            <>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Class / Type</span>
                <span className="text-sm font-bold text-white font-mono">{blade.bladeType}</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Thickness</span>
                <span className="text-sm font-bold text-white font-mono">{blade.thickness}</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Weight</span>
                <span className="text-sm font-bold text-white font-mono">{blade.weight}</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 col-span-2 sm:col-span-2">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Plies / Composition</span>
                <span className="text-xs font-semibold text-cyan-300 font-mono">{blade.plies}</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Touch / Feel</span>
                <span className="text-xs font-bold text-white font-mono">{blade.touch}</span>
              </div>
            </>
          )}

          {rubber && (
            <>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 col-span-2 sm:col-span-2">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Rubber Type</span>
                <span className="text-xs font-bold text-white font-mono">{rubber.type}</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Sponge Thickness</span>
                <span className="text-sm font-bold text-white font-mono">{rubber.spongeThickness}</span>
              </div>
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3 col-span-2 sm:col-span-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Sponge Hardness</span>
                <span className="text-xs font-semibold text-cyan-300 font-mono">{rubber.spongeHardness}</span>
              </div>
            </>
          )}
        </div>

        {/* Ratings Breakdown */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 mb-5 space-y-3">
          <h4 className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            Performance Ratings (Out of 10)
          </h4>

          {blade && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-400" /> Speed
                  </span>
                  <span className="font-bold text-amber-400">{blade.speedRating} / 10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full"
                    style={{ width: `${(blade.speedRating / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-slate-300 flex items-center gap-1">
                    <Target className="w-3 h-3 text-cyan-400" /> Control
                  </span>
                  <span className="font-bold text-cyan-400">{blade.controlRating} / 10</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                    style={{ width: `${(blade.controlRating / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {rubber && (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-slate-300">Speed</span>
                  <span className="font-bold text-amber-400">{rubber.speed}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{ width: `${(rubber.speed / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-slate-300">Spin</span>
                  <span className="font-bold text-rose-400">{rubber.spin}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-rose-400 rounded-full"
                    style={{ width: `${(rubber.spin / 10) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span className="text-slate-300">Control</span>
                  <span className="font-bold text-cyan-400">{rubber.control}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full"
                    style={{ width: `${(rubber.control / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Playstyle & Inspiration */}
        <div className="mb-5">
          <h4 className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Playstyle & Technical Feedback
          </h4>
          <p className="text-xs leading-relaxed text-slate-300 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
            {item.playstyle}
          </p>
        </div>

        {/* Best For Highlights */}
        {item.bestFor && item.bestFor.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-mono font-bold text-slate-400 tracking-wider uppercase mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Recommended Application
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {item.bestFor.map((itemStr, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700/80 text-emerald-300"
                >
                  ✓ {itemStr}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800">
            {item.tags.map((t, idx) => (
              <span
                key={idx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
