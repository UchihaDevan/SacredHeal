import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Maximize2 } from 'lucide-react';
import { useAudioStore } from '../../store/audioStore';
import { AudioVisualizer } from './AudioVisualizer';

export const AudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    pause,
    resume,
    setVolume,
    setCurrentTime,
    nextTrack,
    previousTrack
  } = useAudioStore();

  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(0.8);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentTrack) return null;

  // Formatar tempo em mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      resume();
    }
  };

  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div
      role="region"
      aria-label="Audio player"
      className={`glass-effect-dark border-t border-white/10 px-4 py-3 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 shadow-[0_-15px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ${
        isMinimized ? 'h-12 md:h-12' : 'h-auto md:h-24'
      }`}
    >
      {/* Botão de Minimizar (Mobile/Desktop) */}
      <div className="absolute top-2 right-4 z-10 md:static md:order-last">
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          title={isMinimized ? 'Expand Player' : 'Minimize Player'}
        >
          {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
        </button>
      </div>

      {isMinimized ? (
        // Modo Minimizado
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-spiritual-gold">{currentTrack.hz ? `${currentTrack.hz}Hz` : 'Audio'}</span>
            <span className="text-xs text-slate-300 font-serif truncate max-w-[150px] sm:max-w-xs">{currentTrack.name}</span>
          </div>
          <div className="flex items-center gap-4 mr-8">
            <button onClick={handlePlayPause} className="p-1.5 rounded-full bg-spiritual-gold text-slate-900">
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
            <span className="text-[10px] text-slate-400">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>
        </div>
      ) : (
        // Modo Expandido Normal
        <>
          {/* Informações da Faixa */}
          <div className="w-full md:w-1/4 flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-spiritual-indigo/60">
              <img src={currentTrack.imageUrl} alt={currentTrack.name} className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">{currentTrack.category}</span>
                {currentTrack.hz && (
                  <span className="px-1 py-0.5 rounded text-[9px] font-bold bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/20">
                    {currentTrack.hz} Hz
                  </span>
                )}
              </div>
              <h4 className="text-sm font-serif text-slate-800 dark:text-slate-100 font-medium truncate" title={currentTrack.name}>
                {currentTrack.name}
              </h4>
            </div>
          </div>

          {/* Controles de Reprodução e Progresso */}
          <div className="w-full md:w-2/5 flex flex-col items-center gap-1.5">
            {/* Botões */}
            <div className="flex items-center gap-5">
              <button
                onClick={previousTrack}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                title="Previous Track"
                aria-label="Previous track"
              >
                <SkipBack className="w-5 h-5" />
              </button>
              <button
                onClick={handlePlayPause}
                className="p-3 rounded-full gold-bg-gradient text-slate-900 hover:scale-105 transition-all shadow-[0_0_15px_rgba(199,167,92,0.3)]"
                title={isPlaying ? 'Pause' : 'Play'}
                aria-label={isPlaying ? 'Pause track' : 'Play track'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-900" /> : <Play className="w-5 h-5 fill-slate-900" />}
              </button>
              <button
                onClick={nextTrack}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                title="Next Track"
                aria-label="Next track"
              >
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            {/* Barra de Progresso */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono w-8 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="flex-1 h-1 rounded-full bg-black/10 dark:bg-white/10 accent-spiritual-gold cursor-pointer"
              />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono w-8">{formatTime(duration)}</span>
            </div>
          </div>

          {/* Visualizador de Espectro e Volume (Oculto no celular em conformidade com mobile-first) */}
          <div className="w-full md:w-1/4 flex items-center gap-4 justify-between md:justify-end shrink-0 hidden md:flex">
            {/* Visualizador de Ondas */}
            <div className="flex-1 max-w-[120px] hidden lg:block">
              <AudioVisualizer isPlaying={isPlaying} hz={currentTrack.hz} />
            </div>

            {/* Controle de Volume */}
            <div className="flex items-center gap-2 w-full md:w-auto md:max-w-[140px]">
              <button
                onClick={handleMuteToggle}
                className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-full md:w-20 h-1 rounded-full bg-black/10 dark:bg-white/10 accent-spiritual-gold cursor-pointer"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
