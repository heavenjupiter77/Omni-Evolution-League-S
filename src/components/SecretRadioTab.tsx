import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Volume2,
  VolumeX,
  Send,
  RotateCcw,
  Zap,
  Activity,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface SecretPopupState {
  title?: string;
  message: string;
  isRedText?: boolean;
  autoCloseMs?: number;
}

interface SecretRadioTabProps {
  onKickOut: (popup: SecretPopupState) => void;
  onOpenDossier: (character: 'aryan' | 'dipayan') => void;
  onTriggerRedAlert: () => void;
  onCustomBatNo: () => void;
}

export const SecretRadioTab: React.FC<SecretRadioTabProps> = ({
  onKickOut,
  onOpenDossier,
  onTriggerRedAlert,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [dialFrequency, setDialFrequency] = useState(99.9);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Custom bat dialog flow states
  const [customBatStage, setCustomBatStage] = useState<'none' | 'prompt' | 'form' | 'result'>('none');
  const [customBatResult, setCustomBatResult] = useState<string | null>(null);

  // General in-tab popup modal
  const [tabPopup, setTabPopup] = useState<SecretPopupState | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // Play a brief synth blip / static beep
  const playRadioBeep = (type: 'beep' | 'static' | 'alert' | 'glitch') => {
    if (!audioEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === 'beep') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'alert') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(680, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else {
        // Noise buffer
        const bufferSize = ctx.sampleRate * 0.12;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // AudioContext unavailable or restricted by browser
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTransmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const raw = inputCode.trim();
    if (!raw) return;

    // Normalize for matching: lower case, remove surrounding quotes or spaces
    const clean = raw.toLowerCase().replace(/['"]/g, '');

    setIsTransmitting(true);
    playRadioBeep('beep');
    setDialFrequency(Number((Math.random() * 20 + 90).toFixed(1)));

    setTimeout(() => {
      setIsTransmitting(false);
      executeCodeAction(clean);
    }, 250);
  };

  const executeCodeAction = (clean: string) => {
    // 1. zadeedzuhair
    if (clean === 'zadeedzuhair') {
      playRadioBeep('alert');
      onTriggerRedAlert();
      setTabPopup({
        title: 'EMERGENCY TRANSMISSION',
        message: 'OEL Auditor detected!',
        autoCloseMs: 3000,
      });
      setFeedback('FREQUENCY LOCK: OEL Auditor detected!');
      return;
    }

    // 2. diputhepipu
    if (clean === 'diputhepipu') {
      playRadioBeep('glitch');
      setTabPopup({
        title: 'INTERCEPTED TRANSMISSION',
        message: 'this damn lucky gooner...',
        autoCloseMs: 3000,
      });
      setFeedback('TRANSMISSION: "this damn lucky gooner..."');
      return;
    }

    // 3. sayorihandle
    if (clean === 'sayorihandle') {
      playRadioBeep('alert');
      setTabPopup({
        title: 'ANCIENT INCANTATION',
        message:
          'with this treasure, i summon, the indentation checker, the hentai artist, the bat thrower, the gooner, NAZEEF HASAN!!',
        autoCloseMs: 3000,
      });
      setFeedback('SUMMONING RITUAL INITIATED...');

      // 3 seconds later, close and kick out with "too much gooner activity detected."
      setTimeout(() => {
        setTabPopup(null);
        onKickOut({
          title: 'PROTOCOL DISCONNECT',
          message: 'too much gooner activity detected.',
        });
      }, 3000);
      return;
    }

    // 4. thedictator
    if (clean === 'thedictator') {
      playRadioBeep('beep');
      setFeedback('DIRECTIVE RECEIVED: ACCESSING ARYAN ZOHAN DOSSIER...');
      onOpenDossier('aryan');
      return;
    }

    // 5. stealanegg
    if (clean === 'stealanegg') {
      playRadioBeep('glitch');
      onKickOut({
        title: 'TRANSMISSION TERMINATED',
        message: 'f#ck you',
      });
      return;
    }

    // 6. custombat
    if (clean === 'custombat') {
      playRadioBeep('beep');
      setCustomBatStage('prompt');
      setFeedback('CONSULTATION PROTOCOL INITIALIZED.');
      return;
    }

    // 7. kingsmerchant
    if (clean === 'kingsmerchant') {
      playRadioBeep('glitch');
      onKickOut({
        title: 'FREQUENCY EXPELLING',
        message: 'holy gooner affan',
      });
      return;
    }

    // 8. whos the husband of all edges and nets (with or without punctuation)
    const normalizedHusband = clean.replace(/[^a-z]/g, '');
    if (
      normalizedHusband === 'whosthehusbandofalledgesandnets' ||
      clean.includes('husband of all edges and nets')
    ) {
      playRadioBeep('beep');
      setFeedback('VERIFIED IDENTITY: ACCESSING DIPAYAN DOSSIER...');
      onOpenDossier('dipayan');
      return;
    }

    // Unknown signal
    playRadioBeep('static');
    setFeedback(`*kzzzzt* Static hiss... Unknown transmission "${inputCode}". Signal lost.`);
  };

  // Auto-closing pop-up timer
  useEffect(() => {
    if (tabPopup?.autoCloseMs) {
      const t = setTimeout(() => {
        setTabPopup(null);
      }, tabPopup.autoCloseMs);
      return () => clearTimeout(t);
    }
  }, [tabPopup]);

  // Handle Custom Bat No choice
  const handleCustomBatNo = () => {
    setCustomBatStage('none');
    playRadioBeep('alert');
    onKickOut({
      title: 'DISCONNECT',
      message: '. . .',
      isRedText: true,
    });
  };

  // Handle Custom Bat Yes choice
  const handleCustomBatYes = () => {
    playRadioBeep('beep');
    setCustomBatStage('form');
  };

  // Handle Custom Bat Form Options
  const handleSelectBatArchetype = (choice: 'attacker' | 'defender' | 'nazeef') => {
    if (choice === 'attacker') {
      playRadioBeep('beep');
      setCustomBatStage('result');
      setCustomBatResult('razer l2 with two loki rxton 5');
    } else if (choice === 'defender') {
      playRadioBeep('beep');
      setCustomBatStage('result');
      setCustomBatResult('loki kirin k2 with two mercury ii');
    } else if (choice === 'nazeef') {
      playRadioBeep('alert');
      setCustomBatStage('none');
      onKickOut({
        title: 'EQUIPMENT DENIED',
        message: "nazeef you BUM you don't need a new bat",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto" id="secret-radio-console">
      {/* Radio Chassis Container */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-3xl border-2 border-rose-500/60 p-6 sm:p-8 shadow-[0_0_50px_rgba(244,63,94,0.25)] relative overflow-hidden">
        {/* Glow ambient lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Chassis Top Plate */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-rose-500/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-500/70 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-extrabold text-2xl text-white tracking-wider">
                  CLASSIFIED TRANSCEIVER ???
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-rose-950 border border-rose-500 text-rose-300 font-mono text-[10px] font-bold animate-pulse">
                  RESTRICTED FREQ
                </span>
              </div>
              <p className="text-xs text-rose-300/70 font-mono mt-0.5">
                OEL Tactical Shortwave Encrypted Station • Channel [???]
              </p>
            </div>
          </div>

          {/* Audio toggle & status */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              type="button"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 text-xs font-mono hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>SYNTH SOUND ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span>MUTED</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Vintage Radio Display & Frequency Tuner Dial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          {/* Green CRT Screen */}
          <div className="md:col-span-2 bg-black/90 rounded-2xl border-2 border-emerald-500/40 p-5 shadow-[inset_0_0_30px_rgba(16,185,129,0.15)] relative overflow-hidden font-mono flex flex-col justify-between min-h-[160px]">
            {/* Scanlines overlay effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

            <div className="flex items-center justify-between text-xs text-emerald-400/90 pb-2 border-b border-emerald-900/60 relative z-10">
              <span className="flex items-center gap-1.5 font-bold">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                TUNED FREQUENCY: {dialFrequency} MHz
              </span>
              <span className="text-[10px] text-emerald-500 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                SIGNAL: SECURE
              </span>
            </div>

            {/* Main LCD screen output */}
            <div className="my-3 relative z-10">
              <p className="text-emerald-300 text-xs leading-relaxed font-mono">
                {feedback ? (
                  <span className="text-emerald-200 font-bold">{feedback}</span>
                ) : (
                  <span className="text-emerald-600">
                    &gt; READY FOR TRANSMISSION. Enter codeword or frequency directive below...
                  </span>
                )}
              </p>
            </div>

            {/* Visualizer bars */}
            <div className="flex items-end gap-1 h-6 relative z-10 pt-2 border-t border-emerald-900/40">
              {[40, 75, 55, 90, 30, 80, 60, 95, 45, 70, 85, 35, 65, 80, 50, 90, 70, 40].map(
                (height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-emerald-400/80 rounded-t-sm transition-all duration-150"
                    style={{
                      height: isTransmitting
                        ? `${Math.floor(Math.random() * 100)}%`
                        : `${height}%`,
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* Analog Speaker Grille & Status LEDs */}
          <div className="bg-slate-950 rounded-2xl border border-rose-500/30 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
                HARDWARE STATUS
              </span>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">CARRIER WAVE</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">AMPLIFIER</span>
                  <span className="text-rose-400 font-bold">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">STATION</span>
                  <span className="text-cyan-400 font-bold">???</span>
                </div>
              </div>
            </div>

            {/* Speaker Mesh Pattern */}
            <div className="mt-4 pt-3 border-t border-slate-900">
              <div className="grid grid-cols-8 gap-1.5 p-2 rounded-xl bg-black/60 border border-slate-900">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800 mx-auto" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Input Form for codewords & letters */}
        <form onSubmit={handleTransmit} className="space-y-3 pt-4 border-t border-rose-500/20">
          <label className="block text-xs font-mono text-rose-300 font-bold uppercase tracking-wider">
            TRANSMIT CODEWORD / LETTERS:
          </label>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                ref={inputRef}
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Type in a secret codeword..."
                className="w-full px-4 py-3 bg-black/80 border-2 border-rose-500/50 focus:border-rose-400 rounded-xl text-sm font-mono text-white placeholder-rose-700/60 focus:outline-none shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all"
              />
              {inputCode && (
                <button
                  type="button"
                  onClick={() => setInputCode('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-white"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isTransmitting || !inputCode.trim()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:pointer-events-none text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{isTransmitting ? 'TRANSMITTING...' : 'TRANSMIT SIGNAL'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* ─── MODAL 1: General Secret Popup (zadeedzuhair, diputhepipu, sayorihandle) ─── */}
      <AnimatePresence>
        {tabPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-slate-950 rounded-2xl border-2 border-rose-500/80 p-6 shadow-[0_0_50px_rgba(244,63,94,0.5)] text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center mx-auto text-rose-400">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>

              {tabPopup.title && (
                <h4 className="font-mono text-xs font-bold text-rose-400 tracking-wider uppercase">
                  {tabPopup.title}
                </h4>
              )}

              <p
                className={`text-base font-mono leading-relaxed ${
                  tabPopup.isRedText ? 'text-rose-500 font-bold' : 'text-white'
                }`}
              >
                {tabPopup.message}
              </p>

              {tabPopup.autoCloseMs && (
                <div className="pt-2">
                  <span className="text-[11px] font-mono text-slate-400 animate-pulse">
                    (Auto-closing in 3 seconds...)
                  </span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setTabPopup(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold cursor-pointer"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 2: custombat Stage 1 (Yes/No discussion prompt) ─── */}
      <AnimatePresence>
        {customBatStage === 'prompt' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-slate-950 rounded-2xl border-2 border-cyan-500/70 p-6 shadow-[0_0_50px_rgba(6,182,212,0.4)] text-center space-y-5"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center mx-auto text-cyan-300">
                <HelpCircle className="w-6 h-6" />
              </div>

              <h4 className="font-mono font-bold text-base text-white leading-relaxed">
                Would you like to discuss about what type of bat would fit you?
              </h4>

              <div className="flex items-center justify-center gap-4 pt-2">
                {/* YES Option in Green */}
                <button
                  type="button"
                  id="btn-custombat-yes"
                  onClick={handleCustomBatYes}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                >
                  YES
                </button>

                {/* NO Option in Red */}
                <button
                  type="button"
                  id="btn-custombat-no"
                  onClick={handleCustomBatNo}
                  className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all cursor-pointer"
                >
                  NO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 3: custombat Stage 2 (Form Questionnaire) ─── */}
      <AnimatePresence>
        {customBatStage === 'form' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-slate-950 rounded-2xl border-2 border-cyan-500/70 p-6 shadow-[0_0_50px_rgba(6,182,212,0.4)] space-y-5"
            >
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wider">
                  EQUIPMENT CONSULTATION
                </span>
                <h4 className="font-mono font-bold text-lg text-white">
                  What type of player are you?
                </h4>
              </div>

              {/* 3 Options: Nazeef, Attacker, Defender */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => handleSelectBatArchetype('nazeef')}
                  className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-purple-950/60 border border-slate-700 hover:border-purple-500 text-left font-mono text-sm text-slate-200 hover:text-purple-300 font-bold transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>Nazeef</span>
                  <span className="text-xs text-slate-500 font-normal">Select &rarr;</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectBatArchetype('attacker')}
                  className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-red-950/60 border border-slate-700 hover:border-red-500 text-left font-mono text-sm text-slate-200 hover:text-red-300 font-bold transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>Attacker</span>
                  <span className="text-xs text-slate-500 font-normal">Select &rarr;</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectBatArchetype('defender')}
                  className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500 text-left font-mono text-sm text-slate-200 hover:text-emerald-300 font-bold transition-all cursor-pointer flex items-center justify-between"
                >
                  <span>Defender</span>
                  <span className="text-xs text-slate-500 font-normal">Select &rarr;</span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setCustomBatStage('none')}
                  className="text-xs font-mono text-slate-500 hover:text-slate-300"
                >
                  Cancel consultation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── MODAL 4: custombat Stage 3 (Result popup for Attacker / Defender) ─── */}
      <AnimatePresence>
        {customBatStage === 'result' && customBatResult && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-md w-full bg-slate-950 rounded-2xl border-2 border-emerald-500/80 p-6 shadow-[0_0_50px_rgba(16,185,129,0.4)] text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-300">
                <Sparkles className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 tracking-wider block">
                CUSTOM BAT PRESCRIPTION
              </span>

              <p className="text-base font-mono font-bold text-white leading-relaxed">
                "{customBatResult}"
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setCustomBatStage('none');
                    setCustomBatResult(null);
                  }}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold tracking-wider cursor-pointer"
                >
                  ACKNOWLEDGE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
