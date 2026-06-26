import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  Gauge,
  Timer,
  TrendingUp,
  Square,
} from 'lucide-react';
import { playPureTone, stopPureTone } from '../services/audioService';
import { useAudioStore } from '../store/audioStore';

// --- Constants ---

const MIN_HZ = 100;
const MAX_HZ = 999;
const DURATION_OPTIONS = [
  { label: '1 min', value: 60 },
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
];

// --- Component ---

export const AcceleratorExperience: React.FC = () => {
  const [currentHz, setCurrentHz] = useState(MIN_HZ);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(180); // 3 min default
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTonePlaying, setIsTonePlaying] = useState(false);
  const [visualBars, setVisualBars] = useState<number[]>(Array(24).fill(0));

  const intervalRef = useRef<number | null>(null);
  const toneRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopPureTone();
    };
  }, []);

  // Auto-accelerator loop
  useEffect(() => {
    if (!isAccelerating) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const stepInterval = 100; // update every 100ms for smooth animation
    const totalSteps = (selectedDuration * 1000) / stepInterval;
    const hzPerStep = (MAX_HZ - MIN_HZ) / totalSteps;

    intervalRef.current = window.setInterval(() => {
      setElapsedTime((prev) => {
        const newElapsed = prev + stepInterval / 1000;
        if (newElapsed >= selectedDuration) {
          // Session complete
          setIsAccelerating(false);
          setCurrentHz(MAX_HZ);
          return selectedDuration;
        }
        return newElapsed;
      });

      setCurrentHz((prev) => {
        const newHz = Math.min(MAX_HZ, prev + hzPerStep);
        // Update the tone if playing
        if (toneRef.current) {
          stopPureTone();
          playPureTone(Math.round(newHz), 0.4);
        }
        return newHz;
      });
    }, stepInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAccelerating, selectedDuration]);

  // Update visualization bars
  useEffect(() => {
    const intensity = (currentHz - MIN_HZ) / (MAX_HZ - MIN_HZ);
    const newBars = Array(24)
      .fill(0)
      .map((_, i) => {
        const centerDistance = Math.abs(i - 12) / 12;
        const baseHeight = (1 - centerDistance * 0.6) * intensity;
        const variation = isAccelerating || isTonePlaying
          ? Math.random() * 0.3
          : 0;
        return Math.max(0.05, baseHeight + variation);
      });
    setVisualBars(newBars);
  }, [currentHz, isAccelerating, isTonePlaying]);

  const handleStartAccelerate = useCallback(() => {
    // Pause audio store if playing
    const { isPlaying, pause } = useAudioStore.getState();
    if (isPlaying) pause();

    setIsAccelerating(true);
    setCurrentHz(MIN_HZ);
    setElapsedTime(0);

    // Start tone
    playPureTone(MIN_HZ, 0.4);
    toneRef.current = true;
    setIsTonePlaying(true);
  }, []);

  const handlePause = useCallback(() => {
    setIsAccelerating(false);
    if (toneRef.current) {
      stopPureTone();
      toneRef.current = false;
      setIsTonePlaying(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setIsAccelerating(false);
    setCurrentHz(MIN_HZ);
    setElapsedTime(0);
    if (toneRef.current) {
      stopPureTone();
      toneRef.current = false;
      setIsTonePlaying(false);
    }
  }, []);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseInt(e.target.value, 10);
      setCurrentHz(val);
      if (isTonePlaying) {
        stopPureTone();
        playPureTone(val, 0.4);
      }
    },
    [isTonePlaying]
  );

  const toggleManualTone = useCallback(() => {
    if (isTonePlaying) {
      stopPureTone();
      toneRef.current = false;
      setIsTonePlaying(false);
    } else {
      const { isPlaying, pause } = useAudioStore.getState();
      if (isPlaying) pause();
      playPureTone(Math.round(currentHz), 0.4);
      toneRef.current = true;
      setIsTonePlaying(true);
    }
  }, [isTonePlaying, currentHz]);

  const progress = selectedDuration > 0 ? (elapsedTime / selectedDuration) * 100 : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-purple-400/70 mb-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Accelerator Experience</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Divine Frequencies{' '}
          <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent font-serif">
            Accelerator
          </span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Elevate your vibrational state with a progressive frequency sequencer. Go from 100Hz to 999Hz for deep spiritual acceleration.
        </p>
      </div>

      {/* Current Hz Display */}
      <div className="rounded-3xl glass-effect p-8 md:p-10 border border-purple-500/15 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/3 to-violet-500/3 pointer-events-none" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -mt-20 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-purple-400" />
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Current Frequency
          </span>
        </div>

        {/* Large Hz Display */}
        <div className="relative">
          <p className="text-7xl md:text-8xl font-serif font-bold tabular-nums bg-gradient-to-r from-purple-300 via-violet-400 to-purple-400 bg-clip-text text-transparent">
            {Math.round(currentHz)}
          </p>
          <p className="text-lg text-purple-400/60 font-serif">Hz</p>
        </div>

        {/* Intensity Visualization */}
        <div className="flex items-end justify-center gap-1 mt-8 h-20">
          {visualBars.map((height, i) => (
            <div
              key={i}
              className="w-1.5 md:w-2 rounded-full transition-all"
              style={{
                height: `${Math.max(4, height * 80)}px`,
                background: `linear-gradient(to top, rgba(168,85,247,${0.3 + height * 0.5}), rgba(139,92,246,${0.5 + height * 0.4}))`,
                transitionDuration: isAccelerating ? '100ms' : '300ms',
              }}
            />
          ))}
        </div>

        {/* Frequency Slider */}
        <div className="mt-8 px-4 max-w-lg mx-auto">
          <input
            type="range"
            min={MIN_HZ}
            max={MAX_HZ}
            value={Math.round(currentHz)}
            onChange={handleSliderChange}
            disabled={isAccelerating}
            className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed accent-purple-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>{MIN_HZ}Hz</span>
            <span>{MAX_HZ}Hz</span>
          </div>
        </div>

        {/* Manual play button when not accelerating */}
        {!isAccelerating && (
          <button
            onClick={toggleManualTone}
            className={`mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              isTonePlaying
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'
            }`}
          >
            {isTonePlaying ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isTonePlaying ? 'Stop Tone' : 'Play Current Frequency'}
          </button>
        )}
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Duration Selector */}
        <div className="rounded-3xl glass-effect p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Acceleration Duration
            </span>
          </div>
          <div className="flex gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedDuration(opt.value)}
                disabled={isAccelerating}
                className={`flex-1 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedDuration === opt.value
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                } disabled:opacity-40`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="rounded-3xl glass-effect p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Controls
            </span>
          </div>
          <div className="flex items-center gap-2">
            {!isAccelerating ? (
              <button
                onClick={handleStartAccelerate}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25 hover:bg-purple-500/25 transition-colors text-sm font-bold"
              >
                <Play className="w-4 h-4 fill-current" />
                {elapsedTime > 0 ? 'Restart' : 'Accelerate'}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25 hover:bg-purple-500/25 transition-colors text-sm font-bold"
              >
                <Pause className="w-4 h-4" />
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-3xl glass-effect p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Gauge className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Progress
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-serif font-bold text-slate-100 tabular-nums">
                {formatTime(elapsedTime)}
              </span>
              <span className="text-xs text-slate-500">/ {formatTime(selectedDuration)}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${Math.min(100, progress)}%`,
                  background: 'linear-gradient(90deg, #a855f7, #8b5cf6)',
                }}
              />
            </div>
            <p className="text-[10px] text-slate-500">{Math.round(progress)}% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};
