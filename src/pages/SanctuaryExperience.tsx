import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Maximize,
  Minimize,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Timer,
  Sparkles,
  Leaf,
  Square,
} from 'lucide-react';
import { playPureTone, stopPureTone } from '../services/audioService';
import { useAudioStore } from '../store/audioStore';

// --- Data ---

const healingAffirmations = [
  'I am surrounded by divine healing light',
  'Peace flows through every cell of my body',
  'I release all tension and welcome serenity',
  'My mind is calm, my body is restored',
  'I am worthy of complete healing and wholeness',
  'The universe holds me in perfect peace',
  'Every breath brings deeper healing into my life',
  'I trust the divine process of my restoration',
  'Love and light fill every part of my being',
  'I am at peace with myself and the world around me',
];

const TIMER_OPTIONS = [
  { label: '5 min', value: 300 },
  { label: '10 min', value: 600 },
  { label: '15 min', value: 900 },
  { label: '30 min', value: 1800 },
];

// --- Particle Component ---

interface ParticleProps {
  index: number;
}

const Particle: React.FC<ParticleProps> = React.memo(({ index }) => {
  const style = useMemo(() => {
    const size = 2 + Math.random() * 4;
    const left = Math.random() * 100;
    const animDuration = 8 + Math.random() * 12;
    const delay = Math.random() * animDuration;
    const opacity = 0.15 + Math.random() * 0.4;

    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      bottom: `-${size}px`,
      opacity,
      animation: `sanctuaryFloat ${animDuration}s ${delay}s ease-in infinite`,
    };
  }, [index]);

  return (
    <div
      className="absolute rounded-full bg-spiritual-gold pointer-events-none"
      style={style}
    />
  );
});

// --- Component ---

export const SanctuaryExperience: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState(600); // 10 min
  const [timeRemaining, setTimeRemaining] = useState(600);
  const [volume, setVolume] = useState(0.5);
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isTonePlaying, setIsTonePlaying] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Particle array
  const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => i), []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopPureTone();
    };
  }, []);

  // Session countdown
  useEffect(() => {
    if (!isSessionActive || isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsSessionActive(false);
          setIsPaused(false);
          stopPureTone();
          setIsTonePlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive, isPaused]);

  // Cycle affirmations
  useEffect(() => {
    if (!isSessionActive || isPaused) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setAffirmationIndex((prev) => (prev + 1) % healingAffirmations.length);
        setIsFading(false);
      }, 800);
    }, 7000);

    return () => clearInterval(interval);
  }, [isSessionActive, isPaused]);

  // Fullscreen handling
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const handleStartSession = useCallback(() => {
    const { isPlaying, pause } = useAudioStore.getState();
    if (isPlaying) pause();

    setIsSessionActive(true);
    setIsPaused(false);
    setTimeRemaining(selectedTimer);
    setAffirmationIndex(0);

    // Start ambient tone (528Hz healing frequency)
    playPureTone(528, volume * 0.3);
    setIsTonePlaying(true);
  }, [selectedTimer, volume]);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    stopPureTone();
    setIsTonePlaying(false);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    playPureTone(528, volume * 0.3);
    setIsTonePlaying(true);
  }, [volume]);

  const handleReset = useCallback(() => {
    setIsSessionActive(false);
    setIsPaused(false);
    setTimeRemaining(selectedTimer);
    setAffirmationIndex(0);
    stopPureTone();
    setIsTonePlaying(false);
  }, [selectedTimer]);

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVol = parseFloat(e.target.value);
      setVolume(newVol);
      if (isTonePlaying) {
        stopPureTone();
        playPureTone(528, newVol * 0.3);
      }
    },
    [isTonePlaying]
  );

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const sessionProgress = selectedTimer > 0 ? ((selectedTimer - timeRemaining) / selectedTimer) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[600px] animate-in fade-in duration-500 ${
        isFullscreen ? 'fixed inset-0 z-50 flex flex-col' : 'space-y-8'
      }`}
      style={
        isFullscreen
          ? {
              background:
                'linear-gradient(135deg, #07070f 0%, #0d0d21 30%, #1b1b3a 60%, #0d0d21 100%)',
              animation: 'sanctuaryGradient 20s ease infinite',
              backgroundSize: '400% 400%',
            }
          : undefined
      }
    >
      {/* CSS Keyframes */}
      <style>{`
        @keyframes sanctuaryFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: var(--particle-opacity, 0.3);
          }
          90% {
            opacity: var(--particle-opacity, 0.3);
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px);
            opacity: 0;
          }
        }
        @keyframes sanctuaryGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Particles Layer */}
      {(isSessionActive || isFullscreen) && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map((i) => (
            <Particle key={i} index={i} />
          ))}
        </div>
      )}

      {/* Header - Hidden in fullscreen session mode */}
      {!isFullscreen && (
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-spiritual-gold/70 mb-1">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Sanctuary Experience</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
            Sanctuary of <span className="gold-text-gradient font-serif">Healing & Peace</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
            An immersive meditation space with golden particles and healing affirmations. Enter fullscreen for the complete sanctuary experience.
          </p>
        </div>
      )}

      {/* Main Sanctuary Area */}
      <div
        className={`relative z-10 ${
          isFullscreen
            ? 'flex-1 flex flex-col items-center justify-center p-8'
            : 'rounded-3xl glass-effect p-8 md:p-12 border border-spiritual-gold/10 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden'
        }`}
      >
        {/* Background glow (non-fullscreen) */}
        {!isFullscreen && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-spiritual-gold/3 to-spiritual-purple/3 pointer-events-none" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />
            {/* Particles inside card for non-fullscreen */}
            {isSessionActive && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.slice(0, 15).map((i) => (
                  <Particle key={i} index={i} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Fullscreen toggle */}
        <button
          onClick={toggleFullscreen}
          className={`absolute top-4 right-4 p-2.5 rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors z-20 ${
            isFullscreen ? 'top-6 right-6' : ''
          }`}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>

        {/* Session Content */}
        {isSessionActive ? (
          <div className="text-center max-w-lg mx-auto relative z-10">
            {/* Decorative icon */}
            <Leaf className="w-8 h-8 text-spiritual-gold/40 mx-auto mb-6" />

            {/* Healing Affirmation */}
            <div
              className={`transition-all duration-800 min-h-[80px] flex items-center justify-center ${
                isFading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{ transitionDuration: '800ms' }}
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-serif italic text-slate-100 leading-relaxed">
                "{healingAffirmations[affirmationIndex]}"
              </p>
            </div>

            {/* Timer Display */}
            <div className="mt-10">
              <p className="text-5xl md:text-6xl font-serif font-bold tabular-nums gold-text-gradient">
                {formatTime(timeRemaining)}
              </p>
              <p className="text-xs text-slate-500 mt-2">remaining</p>
            </div>

            {/* Progress Ring (simple bar) */}
            <div className="mt-6 w-48 mx-auto">
              <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full gold-bg-gradient rounded-full transition-all duration-1000"
                  style={{ width: `${sessionProgress}%` }}
                />
              </div>
            </div>

            {/* Session Controls */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {isPaused ? (
                <button
                  onClick={handleResume}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-spiritual-gold/15 text-spiritual-gold border border-spiritual-gold/25 hover:bg-spiritual-gold/25 transition-colors text-sm font-bold"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Resume
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              )}
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors"
                title="End session"
              >
                <Square className="w-4 h-4" />
              </button>
            </div>

            {/* Volume control during session */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <Volume2 className="w-4 h-4 text-slate-500" />
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-spiritual-gold"
              />
              <span className="text-[10px] text-slate-500 tabular-nums w-8">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        ) : (
          /* Pre-session Setup */
          <div className="text-center max-w-md mx-auto relative z-10">
            <Sparkles className="w-10 h-10 text-spiritual-gold/50 mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-100 mb-2">
              Enter Your Sanctuary
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Set your timer and volume, then begin your healing meditation journey with soothing visuals and affirmations.
            </p>

            {/* Timer Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-spiritual-gold" />
                <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                  Session Duration
                </span>
              </div>
              <div className="flex justify-center gap-2">
                {TIMER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSelectedTimer(opt.value);
                      setTimeRemaining(opt.value);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedTimer === opt.value
                        ? 'bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/30'
                        : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume Slider */}
            <div className="mb-8">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Volume2 className="w-4 h-4 text-spiritual-gold" />
                <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                  Ambient Volume
                </span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-48 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-spiritual-gold"
                />
                <span className="text-xs text-slate-400 tabular-nums w-10">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartSession}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl gold-bg-gradient text-slate-900 font-bold text-sm hover:opacity-90 transition-all shadow-[0_0_25px_rgba(199,167,92,0.2)]"
            >
              <Play className="w-4 h-4 fill-current" />
              Begin Meditation
            </button>
          </div>
        )}

        {/* Session Complete */}
        {!isSessionActive && timeRemaining === 0 && (
          <div className="text-center max-w-md mx-auto relative z-10 mt-6">
            <Sparkles className="w-8 h-8 text-spiritual-gold mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-slate-100 mb-1">Session Complete</h3>
            <p className="text-sm text-slate-400 mb-4">
              Your sanctuary meditation is complete. May peace continue to fill your spirit.
            </p>
            <button
              onClick={() => {
                setTimeRemaining(selectedTimer);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-spiritual-gold/15 text-spiritual-gold border border-spiritual-gold/25 hover:bg-spiritual-gold/25 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
