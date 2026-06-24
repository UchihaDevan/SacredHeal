import { create } from 'zustand';
import { Howl } from 'howler';
import type { Track } from '../types';

interface AudioStoreState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number; // 0 a 1
  playlist: Track[];
  playlistIndex: number;
  
  play: (track: Track, newPlaylist?: Track[]) => void;
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
      if (activeHowl && activeHowl.playing()) {
        const time = activeHowl.seek();
        set({ currentTime: typeof time === 'number' ? Math.floor(time) : 0 });
      }
    }, 250);
  };

  const stopProgressTimer = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
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

    play: (track: Track, newPlaylist?: Track[]) => {
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
      }
      stopProgressTimer();

      // Configurar playlist se uma nova lista for fornecida
      let nextPlaylist = state.playlist;
      let nextIndex = state.playlistIndex;
      
      if (newPlaylist) {
        nextPlaylist = newPlaylist;
        nextIndex = newPlaylist.findIndex((t) => t.id === track.id);
      } else {
        // Se a faixa já existe na playlist atual, localiza o índice
        const index = nextPlaylist.findIndex((t) => t.id === track.id);
        if (index !== -1) {
          nextIndex = index;
        } else {
          // Se não existir, insere e seleciona
          nextPlaylist = [...nextPlaylist, track];
          nextIndex = nextPlaylist.length - 1;
        }
      }

      // Criar novo Howl
      const sound = new Howl({
        src: [track.url],
        html5: true, // Importante para reproduzir links externos grandes e fluidez
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
          get().nextTrack(); // Passa para a próxima automaticamente
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

      set({
        currentTrack: track,
        playlist: nextPlaylist,
        playlistIndex: nextIndex,
        currentTime: 0,
        isPlaying: true,
      });
    },

    pause: () => {
      if (activeHowl && activeHowl.playing()) {
        activeHowl.pause();
      }
    },

    resume: () => {
      const state = get();
      if (activeHowl) {
        if (!activeHowl.playing()) {
          activeHowl.play();
        }
      } else if (state.currentTrack) {
        // Se há uma faixa selecionada mas sem Howl ativo, recria
        get().play(state.currentTrack);
      }
    },

    stop: () => {
      if (activeHowl) {
        activeHowl.stop();
        activeHowl.unload();
        activeHowl = null;
      }
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
      if (activeHowl) {
        activeHowl.seek(time);
        set({ currentTime: Math.floor(time) });
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

      // Se passou de 3 segundos, reinicia a faixa atual, senão vai para a anterior
      if (currentTime > 3) {
        get().setCurrentTime(0);
        return;
      }

      const prevIndex = (playlistIndex - 1 + playlist.length) % playlist.length;
      get().play(playlist[prevIndex]);
    },

    setPlaylist: (playlist: Track[]) => {
      set({ playlist });
    }
  };
});
