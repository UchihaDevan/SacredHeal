export interface Track {
  id: string;
  name: string;
  hz?: number;
  duration: number; // em segundos
  url: string; // link público de áudio
  imageUrl: string;
  category: string;
  description?: string;
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
