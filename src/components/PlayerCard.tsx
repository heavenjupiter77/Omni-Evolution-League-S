import React, { useState } from 'react';
import { PlayerProfile } from '../types';
import { getArchetypeInfo } from '../utils/ranks';
import { PlayerDossierModal } from './PlayerDossierModal';
import {
  Shield,
  Zap,
  Crosshair,
  Flame,
  Wind,
  Swords,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  ExternalLink,
  Award,
} from 'lucide-react';

interface PlayerCardProps {
  player: PlayerProfile;
  onCompareSelect?: (player: PlayerProfile) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  onCompareSelect,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const archetypeInfo = getArchetypeInfo(player.archetype);

  const currentPerformance = player.currentPerformance ?? 100;
  const performanceDiff = currentPerformance - 100;

  const renderArchetypeIcon = () => {
    switch (player.archetype) {
      case 'Attacker':
        return <Zap className="w-3.5 h-3.5 text-red-400" />;
      case 'Chopper':
        return <Shield className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Blocker':
        return <Crosshair className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Finisher':
        return <Flame className="w-3.5 h-3.5 text-purple-400" />;
      case 'Lobber':
        return <Wind className="w-3.5 h-3.5 text-amber-400" />;
    }
  };

  return (
    <>
      {/* ─── COMPACT ATHLETE CARD (IN ROSTER GRID) ─── */}
      <div
        id={`player-card-${player.id}`}
        className="group relative bg-slate-950/90 rounded-2xl border border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.08)] hover:shadow-[0_0_24px_rgba(6,182,212,0.22)] transition-all duration-200 flex flex-col justify-between overflow-hidden"
      >
        {/* Top subtle glow bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          {/* Header Row: Avatar + Name + Badges */}
          <div>
            <div className="flex items-start justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cyan-500/50 flex-shrink-0 bg-slate-900 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.25)] group-hover:border-cyan-400 transition-colors">
                  {player.avatarUrl ? (
                    <img
                      src={player.avatarUrl}
                      alt={player.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <User className="w-6 h-6 text-cyan-400/60" />
                  )}
                </div>

                {/* Name & Title */}
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white tracking-wide truncate group-hover:text-cyan-200 transition-colors">
                    {player.name}
                  </h3>
                  {player.nickname ? (
                    <p className="text-xs text-cyan-400/90 font-mono tracking-tight truncate">
                      "{player.nickname}"
                    </p>
                  ) : (
                    <p className="text-[11px] text-slate-400 font-mono">
                      ID: {player.id.substring(0, 8)}
                    </p>
                  )}
                </div>
              </div>

              {/* Archetype Badge */}
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-mono font-bold tracking-wider flex-shrink-0 ${archetypeInfo.bg} ${archetypeInfo.border} ${archetypeInfo.color}`}
              >
                {renderArchetypeIcon()}
                <span className="text-[11px]">{player.archetype.toUpperCase()}</span>
              </div>
            </div>

            {/* Performance Pill + World Rank */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80 mb-1 font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-[11px]">MONTHLY INDEX:</span>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md border font-bold text-[11px] ${
                    currentPerformance > 100
                      ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                      : currentPerformance < 100
                      ? 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                      : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                  }`}
                  title="Current monthly performance index (100% baseline)"
                >
                  {currentPerformance > 100 ? (
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                  ) : currentPerformance < 100 ? (
                    <TrendingDown className="w-3 h-3 text-rose-400" />
                  ) : (
                    <Minus className="w-3 h-3 text-cyan-400" />
                  )}
                  <span>{currentPerformance}%</span>
                  <span className="text-[10px] opacity-75">
                    ({performanceDiff >= 0 ? `+${performanceDiff}` : performanceDiff}%)
                  </span>
                </div>
              </div>

              {player.worldRank && (
                <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" />#{player.worldRank}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Pop-up Trigger & Quick Clash Compare */}
          <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 mt-2">
            <button
              id={`btn-open-dossier-${player.id}`}
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-mono text-xs font-bold tracking-wider transition-all duration-150 cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.15)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              <span>DOSSIER</span>
            </button>

            {onCompareSelect && (
              <button
                id={`btn-compare-${player.id}`}
                type="button"
                onClick={() => onCompareSelect(player)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-150 cursor-pointer"
              >
                <Swords className="w-3.5 h-3.5 text-cyan-400" />
                <span>CLASH</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── FULL DOSSIER POP-UP MODAL ─── */}
      <PlayerDossierModal
        player={player}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCompareSelect={onCompareSelect}
      />
    </>
  );
};
