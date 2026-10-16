import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlayerProfile, METRIC_DEFINITIONS } from '../types';
import { MetricBar } from './MetricBar';
import { ImprovementTrackerGraph } from './ImprovementTrackerGraph';
import { getArchetypeInfo } from '../utils/ranks';
import {
  Shield,
  Zap,
  Crosshair,
  Flame,
  Wind,
  CheckCircle2,
  AlertTriangle,
  Swords,
  User,
  TrendingUp,
  TrendingDown,
  Minus,
  X,
  Award,
  Layers,
  Activity,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlayerDossierModalProps {
  player: PlayerProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onCompareSelect?: (player: PlayerProfile) => void;
}

const ZOHAN_FLASHBANG_IMAGE_URL =
  'https://wimg.rule34.xxx//images/2135/75f2c97684e1f081f0c00d9b03a8d38f.png?16624174';

export const PlayerDossierModal: React.FC<PlayerDossierModalProps> = ({
  player,
  isOpen,
  onClose,
  onCompareSelect,
}) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [nameClickCount, setNameClickCount] = useState(0);
  const [milestonePopupMessage, setMilestonePopupMessage] = useState<string | null>(null);
  const [flashbangState, setFlashbangState] = useState<'idle' | 'active' | 'fading'>('idle');
  const flashbangTimersRef = useRef<number[]>([]);

  const isAryanZohan = Boolean(
    player &&
      (player.id === 'player-aryan-zohan' ||
        player.name.toLowerCase().includes('aryan') ||
        player.name.toLowerCase().includes('zohan'))
  );

  // Preload the 40-click image into browser cache so it appears instantaneously
  useEffect(() => {
    const preloadImg = new Image();
    preloadImg.referrerPolicy = 'no-referrer';
    preloadImg.src = ZOHAN_FLASHBANG_IMAGE_URL;
  }, [isOpen, isAryanZohan]);

  // Clear timers helper
  const clearFlashbangTimers = useCallback(() => {
    flashbangTimersRef.current.forEach((id) => window.clearTimeout(id));
    flashbangTimersRef.current = [];
  }, []);

  // Reset click count and milestone states whenever dossier opens/closes or player changes
  useEffect(() => {
    setNameClickCount(0);
    setMilestonePopupMessage(null);
    setFlashbangState('idle');
    clearFlashbangTimers();
  }, [isOpen, player?.id, clearFlashbangTimers]);

  useEffect(() => {
    return () => {
      clearFlashbangTimers();
    };
  }, [clearFlashbangTimers]);

  // Handle clicking/tapping on Aryan Zohan's name in his dossier
  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAryanZohan || flashbangState !== 'idle') return;

    const nextCount = nameClickCount + 1;

    if (nextCount === 10) {
      setNameClickCount(nextCount);
      setMilestonePopupMessage('dude stop doing that.');
    } else if (nextCount === 20) {
      setNameClickCount(nextCount);
      setMilestonePopupMessage('nah man ur annoying me.');
    } else if (nextCount === 30) {
      setNameClickCount(nextCount);
      setMilestonePopupMessage("im about to flashbang you with zohan's favorite girl");
    } else if (nextCount >= 40) {
      // Reset back to 0 so user can click again after and receive the same image
      setNameClickCount(0);
      setMilestonePopupMessage(null);
      setFlashbangState('active');

      clearFlashbangTimers();
      // Appear for 1 second, then immediately fade out
      const fadeTimer = window.setTimeout(() => {
        setFlashbangState('fading');
      }, 1000);

      const endTimer = window.setTimeout(() => {
        setFlashbangState('idle');
      }, 1600);

      flashbangTimersRef.current = [fadeTimer, endTimer];
    } else {
      setNameClickCount(nextCount);
    }
  };

  // Lock body scroll and listen for Escape key when pop-up is active
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Do not allow closing while the 40-click flashbang image is on screen
        if (flashbangState !== 'idle') {
          e.preventDefault();
          return;
        }
        if (milestonePopupMessage) {
          setMilestonePopupMessage(null);
          return;
        }
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, flashbangState, milestonePopupMessage]);

  if (!player) return null;

  const archetypeInfo = getArchetypeInfo(player.archetype);
  const currentPerformance = player.currentPerformance ?? 100;

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
    <AnimatePresence>
      {isOpen && (
        <div
          id={`player-modal-backdrop-${player.id}`}
          onClick={() => {
            if (flashbangState !== 'idle') return;
            onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-slate-950 rounded-2xl border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.28)] flex flex-col max-h-[92vh] overflow-hidden my-auto"
          >
            {/* Modal Top Header Bar */}
            <div className="p-4 sm:p-5 border-b border-cyan-500/30 bg-slate-900/80 flex items-center justify-between gap-4 flex-shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Avatar */}
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-cyan-400/80 flex-shrink-0 bg-slate-900 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.35)]">
                  {player.avatarUrl ? (
                    <img
                      src={player.avatarUrl}
                      alt={player.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <User className="w-8 h-8 text-cyan-400/60" />
                  )}
                </div>

                {/* Title and details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2
                      id={`dossier-player-name-${player.id}`}
                      onClick={handleNameClick}
                      className={`font-display font-extrabold text-lg sm:text-2xl text-white tracking-wide truncate ${
                        isAryanZohan
                          ? 'cursor-pointer select-none touch-manipulation active:scale-95 transition-transform'
                          : ''
                      }`}
                    >
                      {player.name}
                    </h2>
                    {player.nickname && (
                      <span className="text-xs sm:text-sm text-cyan-400 font-mono">
                        "{player.nickname}"
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 mt-1 flex-wrap font-mono text-xs">
                    {/* Archetype */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${archetypeInfo.bg} ${archetypeInfo.border} ${archetypeInfo.color}`}
                    >
                      {renderArchetypeIcon()}
                      {player.archetype.toUpperCase()}
                    </span>

                    {/* World Rank */}
                    {player.worldRank && (
                      <span className="text-amber-400 font-semibold text-[11px] flex items-center gap-1">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        WORLD RANK #{player.worldRank}
                      </span>
                    )}

                    {/* Performance rating pill */}
                    <div
                      className={`flex items-center gap-1 px-2.5 py-0.5 rounded-md border font-bold text-[11px] ${
                        currentPerformance > 100
                          ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                          : currentPerformance < 100
                          ? 'bg-rose-950/70 border-rose-500/40 text-rose-300'
                          : 'bg-cyan-950/70 border-cyan-500/40 text-cyan-300'
                      }`}
                    >
                      {currentPerformance > 100 ? (
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                      ) : currentPerformance < 100 ? (
                        <TrendingDown className="w-3 h-3 text-rose-400" />
                      ) : (
                        <Minus className="w-3 h-3 text-cyan-400" />
                      )}
                      <span>{currentPerformance}% CURRENT INDEX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                id={`btn-close-modal-${player.id}`}
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer flex-shrink-0"
                title="Close dossier (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable Dossier Content */}
            <div
              ref={modalBodyRef}
              className="p-4 sm:p-6 space-y-6 overflow-y-auto overscroll-contain flex-1"
              style={{ overscrollBehavior: 'contain' }}
            >
              {/* 1. Improvement Tracker Graph */}
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    WEEKLY PERFORMANCE INDEX & SHIFTS
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Normal Baseline: 100% (Cycle resets monthly)
                  </span>
                </div>

                <ImprovementTrackerGraph
                  history={player.performanceHistory}
                  currentPerformance={player.currentPerformance}
                  playerName={player.name}
                />
              </div>

              {/* 2. Core Hexagonal Attributes (Tokyo Olympic text removed per user request) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                  <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    TACTICAL ATTRIBUTE MATRIX [D - S]
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {METRIC_DEFINITIONS.map((def) => (
                    <MetricBar
                      key={def.key}
                      metricKey={def.key}
                      rank={player.metrics[def.key]}
                      showDescription={true}
                    />
                  ))}
                </div>
              </div>

              {/* 3. Strengths and Weaknesses */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                id={`modal-strengths-weaknesses-${player.id}`}
              >
                {/* Strengths */}
                <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tactical Strengths</span>
                  </div>
                  <ul className="space-y-2 font-mono">
                    {player.strengths.map((str, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 leading-snug flex items-start gap-2"
                      >
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Tactical Vulnerabilities</span>
                  </div>
                  <ul className="space-y-2 font-mono">
                    {player.weaknesses.map((weak, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-300 leading-snug flex items-start gap-2"
                      >
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{weak}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 4. Equipment & Career Highlights */}
              {(player.bladeRubber || player.careerHighlights) && (
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-mono space-y-2.5">
                  {player.bladeRubber && (
                    <p className="text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold uppercase tracking-wider min-w-[90px]">
                        Equipment:
                      </span>
                      <span>{player.bladeRubber}</span>
                    </p>
                  )}
                  {player.careerHighlights && (
                    <p className="text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold uppercase tracking-wider min-w-[90px]">
                        Highlights:
                      </span>
                      <span>{player.careerHighlights}</span>
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-mono text-xs font-bold tracking-wider cursor-pointer transition-colors"
              >
                CLOSE DOSSIER
              </button>

              {onCompareSelect && (
                <button
                  id={`modal-btn-compare-${player.id}`}
                  type="button"
                  onClick={() => {
                    onClose();
                    onCompareSelect(player);
                  }}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] text-cyan-300 font-mono text-xs font-bold tracking-wider transition-all cursor-pointer"
                >
                  <Swords className="w-4 h-4 text-cyan-400" />
                  <span>LOAD IN HEAD-TO-HEAD CLASH</span>
                </button>
              )}
            </div>

            {/* ─── ARYAN ZOHAN MILESTONE POPUP (10, 20, 30 CLICKS) ─── */}
            <AnimatePresence>
              {milestonePopupMessage && (
                <div
                  id="zohan-milestone-popup-backdrop"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMilestonePopupMessage(null);
                  }}
                  className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="max-w-md w-full bg-slate-950 rounded-2xl border-2 border-rose-500/80 p-6 shadow-[0_0_50px_rgba(244,63,94,0.5)] text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center mx-auto text-rose-400">
                      <AlertCircle className="w-6 h-6 animate-pulse" />
                    </div>

                    <p className="text-base font-mono font-bold text-white leading-relaxed">
                      "{milestonePopupMessage}"
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        id="btn-dismiss-zohan-milestone"
                        onClick={() => setMilestonePopupMessage(null)}
                        className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold cursor-pointer transition-colors"
                      >
                        DISMISS
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── 40 CLICKS: PRELOADED UNCLOSEABLE FULLSCREEN IMAGE (1 SECOND THEN FADES OUT) ─── */}
          {isAryanZohan && (
            <div
              id="zohan-flashbang-fullscreen-overlay"
              onClick={(e) => {
                if (flashbangState !== 'idle') e.stopPropagation();
              }}
              className={`fixed inset-0 z-[9999] w-screen h-screen overflow-hidden select-none ${
                flashbangState === 'active'
                  ? 'opacity-100 visible pointer-events-auto transition-none'
                  : flashbangState === 'fading'
                  ? 'opacity-0 visible pointer-events-auto transition-opacity duration-500 ease-out'
                  : 'opacity-0 invisible pointer-events-none transition-none'
              }`}
            >
              {/* SVG Unsharp/Crispness Filter to maintain sharp line art quality when stretched full-screen */}
              <svg className="hidden" aria-hidden="true">
                <defs>
                  <filter id="zohan-crisp-upscale" colorInterpolationFilters="sRGB">
                    <feConvolveMatrix
                      order="3"
                      kernelMatrix="0 -0.35 0 -0.35 2.4 -0.35 0 -0.35 0"
                      preserveAlpha="true"
                    />
                  </filter>
                </defs>
              </svg>
              <img
                src={ZOHAN_FLASHBANG_IMAGE_URL}
                alt="Zohan's Favorite Girl"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="sync"
                draggable={false}
                style={{
                  filter: 'url(#zohan-crisp-upscale) contrast(1.04) saturate(1.05)',
                }}
                className="w-screen h-screen object-fill scale-x-[1.14] origin-center select-none pointer-events-none"
              />
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};
