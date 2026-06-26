export interface Track {
  id: string;
  name: string;
  hz?: number;
  duration: number; // em segundos
  url?: string; // link público de áudio (opcional para gerados)
  imageUrl: string;
  category: string;
  description?: string;
  frequency?: number;
  waveform?: 'sine' | 'square' | 'triangle' | 'sawtooth';
  audioType?: 'external' | 'generated' | 'binaural';
}

export interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playlist: Track[];
  playlistIndex: number;
}
