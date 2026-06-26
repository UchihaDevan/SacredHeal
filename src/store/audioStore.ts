import { create } from 'zustand';
import { Howl } from 'howler';
import type { Track } from '../types';
import { audioGenerator } from '../services/audioGenerator';

interface AudioStoreState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number; // 0 a 1
  playlist: Track[];
  playlistIndex: number;
  
  play: (track: Track, newPlaylist?: Track[]) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  setCurrentTime: (time: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setPlaylist: (playlist: Track[]) => void;
}

let activeHowl: Howl | null = null;
let progressInterval: number | null = null;

export const useAudioStore = create<AudioStoreState>((set, get) => {
  const startProgressTimer = () => {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = window.setInterval(() => {
      const state = get();
      if (!state.isPlaying) return;

      if (state.currentTrack?.audioType === 'generated' || state.currentTrack?.audioType === 'binaural') {
        const nextTime = state.currentTime + 1;
        if (nextTime >= state.duration) {
          stopProgressTimer();
          set({ isPlaying: false, currentTime: 0 });
          get().nextTrack();
        } else {
          set({ currentTime: nextTime });
        }
      } else if (activeHowl && activeHowl.playing()) {
        const time = activeHowl.seek();
        set({ currentTime: typeof time === 'number' ? Math.floor(time) : 0 });
      }
    }, 1000);
  };

  const stopProgressTimer = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  };

  const playGeneratedTrack = async (track: Track, startTime = 0) => {
    const volumeDb = -20 + get().volume * 15; // Mapeia volume (0-1) para dB (ex: -20dB a -5dB)
    const remaining = track.duration - startTime;

    if (remaining <= 0) return;

    if (track.audioType === 'generated' && track.frequency) {
      await audioGenerator.playFrequency({
        frequency: track.frequency,
        duration: remaining,
        waveform: track.waveform || 'sine',
        volume: volumeDb,
        fadeIn: 0.5,
        fadeOut: 0.5
      });
    } else if (track.audioType === 'binaural' && track.frequency) {
      await audioGenerator.playBinauralBeats(
        track.frequency,
        40, // 40 Hz offset para ondas gama/alfa
        remaining
      );
    }
  };

  return {
    currentTrack: null,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    playlist: [],
    playlistIndex: -1,

    play: async (track: Track, newPlaylist?: Track[]) => {
      const state = get();
      
      // Se for a mesma música tocando, apenas resume
      if (state.currentTrack?.id === track.id) {
        state.resume();
        return;
      }

      // Parar áudio anterior se houver
      if (activeHowl) {
        activeHowl.stop();
        activeHowl.unload();
        activeHowl = null;
      }
      audioGenerator.stop();
      stopProgressTimer();

      // Configurar playlist se uma nova lista for fornecida
      let nextPlaylist = state.playlist;
      let nextIndex = state.playlistIndex;
      
      if (newPlaylist) {
        nextPlaylist = newPlaylist;
        nextIndex = newPlaylist.findIndex((t) => t.id === track.id);
      } else {
        const index = nextPlaylist.findIndex((t) => t.id === track.id);
        if (index !== -1) {
          nextIndex = index;
        } else {
          nextPlaylist = [...nextPlaylist, track];
          nextIndex = nextPlaylist.length - 1;
        }
      }

      const isGenerated = track.audioType === 'generated' || track.audioType === 'binaural';

      set({
        currentTrack: track,
        playlist: nextPlaylist,
        playlistIndex: nextIndex,
        currentTime: 0,
        duration: track.duration,
        isPlaying: true,
      });

      if (isGenerated) {
        await playGeneratedTrack(track, 0);
        startProgressTimer();
      } else if (track.url) {
        // Criar novo Howl para links externos
        const sound = new Howl({
          src: [track.url],
          html5: true,
          volume: state.volume,
          onload: () => {
            set({ duration: Math.floor(sound.duration()) });
          },
          onplay: () => {
            set({ isPlaying: true });
            startProgressTimer();
          },
          onpause: () => {
            set({ isPlaying: false });
            stopProgressTimer();
          },
          onstop: () => {
            set({ isPlaying: false, currentTime: 0 });
            stopProgressTimer();
          },
          onend: () => {
            set({ isPlaying: false, currentTime: 0 });
            stopProgressTimer();
            get().nextTrack();
          },
          onloaderror: (_, err) => {
            console.error('Erro ao carregar áudio:', err);
            set({ isPlaying: false });
          },
          onplayerror: (_, err) => {
            console.error('Erro ao reproduzir áudio:', err);
            set({ isPlaying: false });
          }
        });

        activeHowl = sound;
        sound.play();
      }
    },

    pause: () => {
      const state = get();
      if (state.currentTrack?.audioType === 'generated' || state.currentTrack?.audioType === 'binaural') {
        audioGenerator.stop();
      } else if (activeHowl && activeHowl.playing()) {
        activeHowl.pause();
      }
      set({ isPlaying: false });
      stopProgressTimer();
    },

    resume: () => {
      const state = get();
      if (!state.currentTrack) return;

      const isGenerated = state.currentTrack.audioType === 'generated' || state.currentTrack.audioType === 'binaural';

      set({ isPlaying: true });

      if (isGenerated) {
        playGeneratedTrack(state.currentTrack, state.currentTime);
        startProgressTimer();
      } else if (activeHowl) {
        if (!activeHowl.playing()) {
          activeHowl.play();
        }
      } else {
        get().play(state.currentTrack);
      }
    },

    stop: () => {
      if (activeHowl) {
        activeHowl.stop();
        activeHowl.unload();
        activeHowl = null;
      }
      audioGenerator.stop();
      stopProgressTimer();
      set({ currentTrack: null, isPlaying: false, currentTime: 0, duration: 0 });
    },

    setVolume: (volume: number) => {
      const vol = Math.max(0, Math.min(1, volume));
      if (activeHowl) {
        activeHowl.volume(vol);
      }
      set({ volume: vol });
    },

    setCurrentTime: (time: number) => {
      const state = get();
      const targetTime = Math.floor(time);

      if (state.currentTrack?.audioType === 'generated' || state.currentTrack?.audioType === 'binaural') {
        audioGenerator.stop();
        set({ currentTime: targetTime });
        if (state.isPlaying) {
          playGeneratedTrack(state.currentTrack, targetTime);
        }
      } else if (activeHowl) {
        activeHowl.seek(targetTime);
        set({ currentTime: targetTime });
      }
    },

    nextTrack: () => {
      const { playlist, playlistIndex } = get();
      if (playlist.length === 0) return;
      
      const nextIndex = (playlistIndex + 1) % playlist.length;
      get().play(playlist[nextIndex]);
    },

    previousTrack: () => {
      const { playlist, playlistIndex, currentTime } = get();
      if (playlist.length === 0) return;

      if (currentTime > 3) {
        get().setCurrentTime(0);
        return;
      }

      const prevIndex = (prevIndex: number) => (prevIndex - 1 + playlist.length) % playlist.length;
      get().play(playlist[prevIndex(playlistIndex)]);
    },

    setPlaylist: (playlist: Track[]) => {
      set({ playlist });
    }
  };
});
