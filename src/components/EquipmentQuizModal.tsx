import React, { useState, useEffect } from 'react';
import { BladeItem, RubberItem } from '../data/equipmentData';
import {
  QUIZ_TRACKS,
  QuizTrack,
  evaluateSingleRubber,
  evaluateDualRubbers,
  evaluateBlade,
  evaluateFullSetup,
} from '../data/equipmentQuestions';
import { X, ArrowLeft, ArrowRight, Check, Sparkles, RotateCcw, Shield, Layers, Award } from 'lucide-react';

interface EquipmentQuizModalProps {
  trackId: 'rubber_single' | 'rubber_dual' | 'blade' | 'full_setup' | null;
  isOpen: boolean;
  onClose: () => void;
  onViewItemDetail: (item: BladeItem | RubberItem) => void;
}

export const EquipmentQuizModal: React.FC<EquipmentQuizModalProps> = ({
  trackId,
  isOpen,
  onClose,
  onViewItemDetail,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Results state
  const [singleResult, setSingleResult] = useState<ReturnType<typeof evaluateSingleRubber> | null>(null);
  const [dualResult, setDualResult] = useState<ReturnType<typeof evaluateDualRubbers> | null>(null);
  const [bladeResult, setBladeResult] = useState<ReturnType<typeof evaluateBlade> | null>(null);
  const [setupResult, setSetupResult] = useState<ReturnType<typeof evaluateFullSetup> | null>(null);

  const track: QuizTrack | undefined = trackId ? QUIZ_TRACKS[trackId] : undefined;

  // Reset state when track changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setIsCompleted(false);
      setSingleResult(null);
      setDualResult(null);
      setBladeResult(null);
      setSetupResult(null);
    }
  }, [trackId, isOpen]);

  if (!isOpen || !track) return null;

  const totalQuestions = track.questions.length;
  const currentQuestion = track.questions[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100);
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelectOption = (key: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: key,
    }));
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate results
      if (track.id === 'rubber_single') {
        const res = evaluateSingleRubber(answers);
        setSingleResult(res);
      } else if (track.id === 'rubber_dual') {
        const res = evaluateDualRubbers(answers);
        setDualResult(res);
      } else if (track.id === 'blade') {
        const res = evaluateBlade(answers);
        setBladeResult(res);
      } else if (track.id === 'full_setup') {
        const res = evaluateFullSetup(answers);
        setSetupResult(res);
      }
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-slate-950 rounded-2xl border border-cyan-500/40 p-6 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-slate-200 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="border-b border-slate-800 pb-4 mb-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                {track.title}
              </span>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isCompleted ? 'Match Diagnosis Complete' : track.subtitle}
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar (when answering questions) */}
          {!isCompleted && (
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>
                  Question <strong className="text-cyan-300">{currentStep + 1}</strong> of {totalQuestions}
                </span>
                <span className="text-cyan-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ============================================================== */}
        {/* ONE-BY-ONE QUESTION VIEW                                      */}
        {/* ============================================================== */}
        {!isCompleted && currentQuestion && (
          <div className="space-y-6 my-auto">
            {/* Question Prompt */}
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
                STEP {currentQuestion.questionNumber}
              </span>
              <h3 className="text-lg sm:text-xl font-mono font-bold text-white leading-snug">
                {currentQuestion.prompt}
              </h3>
            </div>

            {/* Options list */}
            <div className="space-y-2.5">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer === option.key;

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleSelectOption(option.key)}
                    className={`w-full text-left p-3.5 rounded-xl border font-mono transition-all duration-150 cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    {/* Key Pill (A, B, C, D) */}
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      {option.key}
                    </span>

                    {/* Option Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm font-semibold">{option.label}</div>
                      {option.sub && (
                        <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {option.sub}
                        </div>
                      )}
                    </div>

                    {/* Checkmark indicator */}
                    {isSelected && (
                      <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Navigation Footer for Questions */}
        {!isCompleted && (
          <div className="border-t border-slate-800/80 pt-5 mt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none text-slate-300 font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!currentAnswer}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-mono text-xs font-black tracking-wider transition-colors cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              <span>{currentStep === totalQuestions - 1 ? 'See Recommendations' : 'Next Question'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* COMPLETED RESULTS VIEW                                        */}
        {/* ============================================================== */}
        {isCompleted && (
          <div className="space-y-5 animate-fade-in my-auto">
            {/* 1. SINGLE RUBBER RESULT */}
            {singleResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 border border-cyan-400 text-cyan-300">
                    MATCH RATING: {singleResult.matchScore}%
                  </span>
                  <span className="text-xl font-mono font-black text-cyan-400">
                    {singleResult.rubber.priceFormatted}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {singleResult.rubber.brand} • {singleResult.rubber.type}
                  </div>
                  <h4 className="text-xl font-black text-white font-mono">
                    {singleResult.rubber.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    {singleResult.rubber.playstyle}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">SPEED</span>
                    <strong className="text-sm text-amber-400">{singleResult.rubber.speed} / 10</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">SPIN</span>
                    <strong className="text-sm text-rose-400">{singleResult.rubber.spin} / 10</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CONTROL</span>
                    <strong className="text-sm text-cyan-400">{singleResult.rubber.control} / 10</strong>
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-1">
                    Tactical Match Highlights:
                  </span>
                  {singleResult.reasons.map((r, i) => (
                    <div key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onViewItemDetail(singleResult.rubber);
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  VIEW COMPLETE RUBBER DOSSIER & FULL STATS
                </button>
              </div>
            )}

            {/* 2. DUAL RUBBERS RESULT */}
            {dualResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 border border-cyan-400 text-cyan-300">
                      MATCH RATING: {dualResult.matchScore}%
                    </span>
                    <h4 className="text-base font-black text-white font-mono mt-1">
                      Harmonized Dual-Wing Rubbers
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">TOTAL FOR BOTH</span>
                    <span className="text-xl font-mono font-black text-cyan-400">
                      {dualResult.totalPrice.toLocaleString()}৳
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Forehand */}
                  <div
                    onClick={() => onViewItemDetail(dualResult.forehand)}
                    className="bg-slate-900/80 hover:bg-slate-800 border border-rose-500/40 rounded-xl p-3.5 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block mb-1">
                      Forehand Rubber
                    </span>
                    <h5 className="text-sm font-bold text-white font-mono">{dualResult.forehand.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{dualResult.forehand.spongeHardness}</p>
                    <div className="mt-3 flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-400 font-bold">{dualResult.forehand.priceFormatted}</span>
                      <span className="text-slate-400 text-[10px]">View stats →</span>
                    </div>
                  </div>

                  {/* Backhand */}
                  <div
                    onClick={() => onViewItemDetail(dualResult.backhand)}
                    className="bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 rounded-xl p-3.5 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block mb-1">
                      Backhand Rubber
                    </span>
                    <h5 className="text-sm font-bold text-white font-mono">{dualResult.backhand.name}</h5>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{dualResult.backhand.spongeHardness}</p>
                    <div className="mt-3 flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-bold">{dualResult.backhand.priceFormatted}</span>
                      <span className="text-slate-400 text-[10px]">View stats →</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-1">
                    Dual Synergy Notes:
                  </span>
                  {dualResult.reasons.map((r, i) => (
                    <div key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. BLADE RESULT */}
            {bladeResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-950 border border-amber-500 text-amber-300">
                    MATCH RATING: {bladeResult.matchScore}%
                  </span>
                  <span className="text-xl font-mono font-black text-cyan-400">
                    {bladeResult.blade.priceFormatted}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                    {bladeResult.blade.brand} • {bladeResult.blade.bladeType} • {bladeResult.blade.plies}
                  </div>
                  <h4 className="text-xl font-black text-white font-mono">
                    {bladeResult.blade.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    {bladeResult.blade.playstyle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center font-mono bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">SPEED RATING</span>
                    <strong className="text-sm text-amber-400">{bladeResult.blade.speedRating} / 10</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">CONTROL RATING</span>
                    <strong className="text-sm text-cyan-400">{bladeResult.blade.controlRating} / 10</strong>
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase block mb-1">
                    Blade Synergy Breakdown:
                  </span>
                  {bladeResult.reasons.map((r, i) => (
                    <div key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onViewItemDetail(bladeResult.blade)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/50 text-amber-300 font-mono text-xs font-bold transition-colors cursor-pointer"
                >
                  VIEW COMPLETE BLADE DOSSIER & FULL STATS
                </button>
              </div>
            )}

            {/* 4. FULL SETUP RESULT */}
            {setupResult && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/30 pb-3">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-950 border border-cyan-400 text-cyan-300">
                      MATCH RATING: {setupResult.matchScore}%
                    </span>
                    <h4 className="text-base font-black text-white font-mono mt-1">
                      Complete 3-Piece Tournament Setup
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">TOTAL COMPLETE COST</span>
                    <span className="text-xl font-mono font-black text-cyan-400">
                      {setupResult.totalPrice.toLocaleString()}৳
                    </span>
                  </div>
                </div>

                {/* 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    onClick={() => onViewItemDetail(setupResult.blade)}
                    className="bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase block mb-1">
                      Blade
                    </span>
                    <h5 className="text-xs font-bold text-white font-mono truncate">{setupResult.blade.name}</h5>
                    <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{setupResult.blade.plies}</p>
                    <span className="text-xs font-mono font-bold text-amber-400 block mt-2">{setupResult.blade.priceFormatted}</span>
                  </div>

                  <div
                    onClick={() => onViewItemDetail(setupResult.forehand)}
                    className="bg-slate-900/80 hover:bg-slate-800 border border-rose-500/40 rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <span className="text-[10px] font-mono text-rose-400 font-bold uppercase block mb-1">
                      Forehand
                    </span>
                    <h5 className="text-xs font-bold text-white font-mono truncate">{setupResult.forehand.name}</h5>
                    <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{setupResult.forehand.spongeHardness}</p>
                    <span className="text-xs font-mono font-bold text-rose-400 block mt-2">{setupResult.forehand.priceFormatted}</span>
                  </div>

                  <div
                    onClick={() => onViewItemDetail(setupResult.backhand)}
                    className="bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.01]"
                  >
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase block mb-1">
                      Backhand
                    </span>
                    <h5 className="text-xs font-bold text-white font-mono truncate">{setupResult.backhand.name}</h5>
                    <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">{setupResult.backhand.spongeHardness}</p>
                    <span className="text-xs font-mono font-bold text-cyan-400 block mt-2">{setupResult.backhand.priceFormatted}</span>
                  </div>
                </div>

                <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase block mb-1">
                    Setup Architectural Assessment:
                  </span>
                  {setupResult.synergyNotes.map((note, i) => (
                    <div key={i} className="text-xs font-mono text-slate-300 flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer with Restart & Done */}
            <div className="border-t border-slate-800/80 pt-4 mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-black tracking-wider transition-colors cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
