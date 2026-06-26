import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Wind,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  Timer,
  Music,
  Square,
} from 'lucide-react';
import { useAudioStore } from '../store/audioStore';
import { playPureTone, stopPureTone } from '../services/audioService';

// --- Constants ---

type BreathingPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

const PHASES: { key: BreathingPhase; label: string; duration: number }[] = [
  { key: 'inhale', label: 'Inhale', duration: 4 },
  { key: 'hold-in', label: 'Hold', duration: 4 },
  { key: 'exhale', label: 'Exhale', duration: 4 },
  { key: 'hold-out', label: 'Hold', duration: 4 },
];


// --- Component ---

export const MentalExperience: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseCountdown, setPhaseCountdown] = useState(PHASES[0].duration);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isTonePlaying, setIsTonePlaying] = useState(false);

  const intervalRef = useRef<number | null>(null);

  const currentPhase = PHASES[phaseIndex];

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopPureTone();
    };
  }, []);

  // Main breathing timer
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setPhaseCountdown((prev) => {
        if (prev <= 1) {
          // Move to next phase
          setPhaseIndex((prevPhase) => {
            const nextPhase = (prevPhase + 1) % PHASES.length;
            if (nextPhase === 0) {
              setCompletedCycles((c) => c + 1);
            }
            // Set countdown for next phase
            setTimeout(() => setPhaseCountdown(PHASES[nextPhase].duration), 0);
            return nextPhase;
          });
          return 1; // temporary, will be overridden
        }
        return prev - 1;
      });

      setTotalElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStart = useCallback(() => {
    setIsRunning(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setPhaseIndex(0);
    setPhaseCountdown(PHASES[0].duration);
    setTotalElapsed(0);
    setCompletedCycles(0);
  }, []);

  const toggleTone = useCallback(() => {
    if (isTonePlaying) {
      stopPureTone();
      setIsTonePlaying(false);
    } else {
      const { isPlaying, pause } = useAudioStore.getState();
      if (isPlaying) pause();
      playPureTone(432, 0.35);
      setIsTonePlaying(true);
    }
  }, [isTonePlaying]);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Calculate circle scale based on phase
  const getCircleScale = () => {
    if (!isRunning) return 0.6;
    const phaseProgress = 1 - phaseCountdown / currentPhase.duration;

    switch (currentPhase.key) {
      case 'inhale':
        return 0.6 + 0.4 * phaseProgress; // 0.6 → 1.0
      case 'hold-in':
        return 1.0;
      case 'exhale':
        return 1.0 - 0.4 * phaseProgress; // 1.0 → 0.6
      case 'hold-out':
        return 0.6;
      default:
        return 0.6;
    }
  };

  const circleScale = getCircleScale();

  // Phase-specific colors
  const getPhaseColor = () => {
    switch (currentPhase.key) {
      case 'inhale':
        return 'text-blue-400';
      case 'hold-in':
        return 'text-indigo-400';
      case 'exhale':
        return 'text-cyan-400';
      case 'hold-out':
        return 'text-indigo-400';
      default:
        return 'text-blue-400';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-blue-400/70 mb-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Mental Experience</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Guided <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-serif">Box Breathing</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Follow the 4-4-4-4 box breathing technique to calm your mind, reduce anxiety, and restore mental clarity.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Breathing Circle - Main Focus */}
        <div className="lg:col-span-2 rounded-3xl glass-effect p-8 md:p-12 border border-blue-500/10 relative overflow-hidden flex flex-col items-center justify-center min-h-[420px]">
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-indigo-500/3 pointer-events-none" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

          {/* Phase Label */}
          <div className={`text-center mb-8 transition-all duration-500 ${getPhaseColor()}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-1">
              {isRunning ? currentPhase.label : 'Ready'}
            </p>
            <p className="text-5xl font-serif font-bold tabular-nums">
              {isRunning ? phaseCountdown : '—'}
            </p>
          </div>

          {/* Breathing Circle */}
          <div className="relative w-52 h-52 md:w-64 md:h-64">
            {/* Outer ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-blue-500/20 transition-transform"
              style={{
                transform: `scale(${circleScale})`,
                transitionDuration: isRunning ? '1000ms' : '500ms',
                transitionTimingFunction: 'ease-in-out',
              }}
            />
            {/* Main circle */}
            <div
              className="absolute inset-2 rounded-full transition-transform"
              style={{
                background: `radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.08) 60%, transparent 100%)`,
                border: '1px solid rgba(59,130,246,0.25)',
                boxShadow: isRunning
                  ? '0 0 60px rgba(59,130,246,0.12), inset 0 0 40px rgba(59,130,246,0.05)'
                  : 'none',
                transform: `scale(${circleScale})`,
                transitionDuration: isRunning ? '1000ms' : '500ms',
                transitionTimingFunction: 'ease-in-out',
              }}
            />
            {/* Inner glow */}
            <div
              className="absolute inset-6 rounded-full transition-transform"
              style={{
                background: `radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)`,
                transform: `scale(${circleScale})`,
                transitionDuration: isRunning ? '1000ms' : '500ms',
                transitionTimingFunction: 'ease-in-out',
              }}
            />
          </div>

          {/* Phase indicators */}
          <div className="flex items-center gap-3 mt-8">
            {PHASES.map((phase, i) => (
              <div key={phase.key + i} className="flex items-center gap-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === phaseIndex && isRunning
                      ? 'bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                      : 'bg-white/10'
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                    i === phaseIndex && isRunning ? 'text-blue-400' : 'text-slate-600'
                  }`}
                >
                  {phase.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Controls & Stats */}
        <div className="space-y-4">
          {/* Session Stats */}
          <div className="rounded-3xl glass-effect p-6 border border-white/5 relative overflow-hidden">
            <div className="absolute right-0 top-0 -mr-12 -mt-12 w-32 h-32 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 mb-5">
              <Timer className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Session Stats
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Total Time</p>
                <p className="text-3xl font-serif font-bold text-slate-100 tabular-nums">
                  {formatTime(totalElapsed)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Cycles</p>
                  <p className="text-xl font-bold text-slate-200 tabular-nums">{completedCycles}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Pattern</p>
                  <p className="text-xl font-bold text-blue-400">4-4-4-4</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-3xl glass-effect p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-5">
              <Wind className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Controls
              </span>
            </div>

            <div className="flex items-center gap-3">
              {!isRunning ? (
                <button
                  onClick={handleStart}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/25 transition-colors text-sm font-bold"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {totalElapsed > 0 ? 'Resume' : 'Start'}
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/25 transition-colors text-sm font-bold"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              )}
              <button
                onClick={handleReset}
                className="p-3 rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 432Hz Ambient */}
          <div className="rounded-3xl glass-effect p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Music className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                Background Frequency
              </span>
            </div>

            <button
              onClick={toggleTone}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                isTonePlaying
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.12)]'
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20'
              }`}
            >
              {isTonePlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              {isTonePlaying ? 'Stop 432Hz' : 'Play 432Hz Calm Tone'}
            </button>

            {isTonePlaying && (
              <p className="text-[10px] text-indigo-400/60 text-center mt-2">
                432Hz • Natural calming frequency
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
