import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  Clock,
  SkipForward,
  Music2,
  CheckCircle2,
  Circle,
} from 'lucide-react';
import { frequenciesData } from '../data/products';
import { useAudioStore } from '../store/audioStore';
import { playPureTone, stopPureTone } from '../services/audioService';

// --- Constants ---

const TIME_OPTIONS = [
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
  { label: '7 min', value: 420 },
];

// --- Component ---

export const TurboExperience: React.FC = () => {
  const [timePerTrack, setTimePerTrack] = useState(300); // 5 min default
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [trackElapsed, setTrackElapsed] = useState(0);
  const [completedTracks, setCompletedTracks] = useState<Set<number>>(new Set());

  const intervalRef = useRef<number | null>(null);

  const totalTracks = frequenciesData.length;
  const totalSessionTime = totalTracks * timePerTrack;
  const totalElapsed =
    completedTracks.size * timePerTrack + (isSessionActive || isPaused ? trackElapsed : 0);
  const totalProgress = totalSessionTime > 0 ? (totalElapsed / totalSessionTime) * 100 : 0;
  const trackProgress = timePerTrack > 0 ? (trackElapsed / timePerTrack) * 100 : 0;

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      stopPureTone();
    };
  }, []);

  // Track timer
  useEffect(() => {
    if (!isSessionActive || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTrackElapsed((prev) => {
        if (prev + 1 >= timePerTrack) {
          // Track complete - advance to next
          setCompletedTracks((completed) => {
            const updated = new Set(completed);
            updated.add(currentTrackIndex);
            return updated;
          });

          if (currentTrackIndex + 1 < totalTracks) {
            // Move to next track
            setCurrentTrackIndex((i) => i + 1);
            // Play next frequency
            const nextFreq = frequenciesData[currentTrackIndex + 1];
            stopPureTone();
            setTimeout(() => playPureTone(nextFreq.hz, 0.4), 100);
            return 0;
          } else {
            // Session complete
            setIsSessionActive(false);
            stopPureTone();
            return timePerTrack;
          }
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSessionActive, isPaused, currentTrackIndex, timePerTrack, totalTracks]);

  const handleStartSession = useCallback(() => {
    // Pause audio store if playing
    const { isPlaying, pause } = useAudioStore.getState();
    if (isPlaying) pause();

    setIsSessionActive(true);
    setIsPaused(false);
    setCurrentTrackIndex(0);
    setTrackElapsed(0);
    setCompletedTracks(new Set());

    // Start playing first frequency
    const firstFreq = frequenciesData[0];
    playPureTone(firstFreq.hz, 0.4);
  }, []);

  const handlePause = useCallback(() => {
    setIsPaused(true);
    stopPureTone();
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
    const currentFreq = frequenciesData[currentTrackIndex];
    playPureTone(currentFreq.hz, 0.4);
  }, [currentTrackIndex]);

  const handleReset = useCallback(() => {
    setIsSessionActive(false);
    setIsPaused(false);
    setCurrentTrackIndex(0);
    setTrackElapsed(0);
    setCompletedTracks(new Set());
    stopPureTone();
  }, []);

  const handleSkipTrack = useCallback(() => {
    if (currentTrackIndex + 1 < totalTracks) {
      setCompletedTracks((completed) => {
        const updated = new Set(completed);
        updated.add(currentTrackIndex);
        return updated;
      });
      setCurrentTrackIndex((i) => i + 1);
      setTrackElapsed(0);

      if (isSessionActive && !isPaused) {
        const nextFreq = frequenciesData[currentTrackIndex + 1];
        stopPureTone();
        setTimeout(() => playPureTone(nextFreq.hz, 0.4), 100);
      }
    }
  }, [currentTrackIndex, totalTracks, isSessionActive, isPaused]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const isSessionComplete = completedTracks.size === totalTracks;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-spiritual-gold/70 mb-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Turbo Experience</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Turbo <span className="gold-text-gradient font-serif">Solfeggio Session</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Sequential playback of all 7 Solfeggio frequencies for comprehensive body and mind alignment.
        </p>
      </div>

      {/* Session Controls Header */}
      <div className="rounded-3xl glass-effect p-6 border border-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-spiritual-gold" />
              <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                Session Control
              </span>
            </div>

            {/* Time per track selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider mr-1">Time per track:</span>
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => !isSessionActive && setTimePerTrack(opt.value)}
                  disabled={isSessionActive}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    timePerTrack === opt.value
                      ? 'bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/30'
                      : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isSessionActive ? (
              <button
                onClick={handleStartSession}
                disabled={isSessionComplete}
                className="flex items-center gap-2 px-6 py-3 rounded-xl gold-bg-gradient text-slate-900 font-bold text-sm hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(199,167,92,0.2)]"
              >
                <Play className="w-4 h-4 fill-current" />
                Start Turbo Session
              </button>
            ) : (
              <>
                {isPaused ? (
                  <button
                    onClick={handleResume}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-spiritual-gold/15 text-spiritual-gold border border-spiritual-gold/25 hover:bg-spiritual-gold/25 transition-colors text-sm font-bold"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-spiritual-gold/15 text-spiritual-gold border border-spiritual-gold/25 hover:bg-spiritual-gold/25 transition-colors text-sm font-bold"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                )}
                <button
                  onClick={handleSkipTrack}
                  disabled={currentTrackIndex >= totalTracks - 1}
                  className="p-3 rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors disabled:opacity-30"
                  title="Skip to next"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={handleReset}
              className="p-3 rounded-xl bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-slate-200 transition-colors"
              title="Reset session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Total Session Progress */}
        <div className="mt-5 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Total Session Progress
            </span>
            <span className="font-bold text-slate-200 tabular-nums">
              {formatTime(totalElapsed)} / {formatTime(totalSessionTime)}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full gold-bg-gradient rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, totalProgress)}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[10px] text-slate-500">
              {completedTracks.size} / {totalTracks} tracks completed
            </span>
            <span className="text-[10px] text-slate-500">{Math.round(totalProgress)}%</span>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="space-y-2">
        {frequenciesData.map((freq, index) => {
          const isActive = isSessionActive && currentTrackIndex === index;
          const isCompleted = completedTracks.has(index);

          return (
            <div
              key={freq.id}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl transition-all duration-300 gap-3 ${
                isActive
                  ? 'glass-effect border border-spiritual-gold/30 shadow-[0_0_20px_rgba(199,167,92,0.08)]'
                  : isCompleted
                  ? 'glass-effect border border-emerald-500/15 opacity-70'
                  : 'glass-effect border border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Status icon */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-spiritual-gold flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-spiritual-gold animate-pulse" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                {/* Track info */}
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <img src={freq.imageUrl} alt={freq.name} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3
                      className={`font-serif font-bold text-sm truncate ${
                        isActive ? 'text-spiritual-gold' : isCompleted ? 'text-slate-400' : 'text-slate-200'
                      }`}
                    >
                      {freq.name}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        isActive
                          ? 'bg-spiritual-gold/20 text-spiritual-gold'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {freq.hz} Hz
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{freq.description}</p>
                </div>
              </div>

              {/* Track duration / progress */}
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                {isActive && (
                  <div className="flex-1 sm:w-32">
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full gold-bg-gradient rounded-full transition-all duration-500"
                        style={{ width: `${trackProgress}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-spiritual-gold mt-1 tabular-nums text-right">
                      {formatTime(trackElapsed)} / {formatTime(timePerTrack)}
                    </p>
                  </div>
                )}

                {!isActive && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Music2 className="w-3.5 h-3.5" />
                    <span className="tabular-nums">{formatTime(timePerTrack)}</span>
                  </div>
                )}

                {isActive && !isPaused && (
                  <div className="flex items-center gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-0.5 bg-spiritual-gold rounded-full"
                        style={{
                          height: `${8 + Math.random() * 12}px`,
                          animation: `pulse ${0.3 + i * 0.1}s ease-in-out infinite alternate`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Session Complete Banner */}
      {isSessionComplete && (
        <div className="rounded-3xl glass-effect p-6 border border-emerald-500/20 text-center">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-lg font-serif font-bold text-slate-100 mb-1">Turbo Session Complete!</h3>
          <p className="text-sm text-slate-400 mb-4">
            You have completed all 7 Solfeggio frequencies. Your body and mind are now fully aligned.
          </p>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Start New Session
          </button>
        </div>
      )}
    </div>
  );
};
