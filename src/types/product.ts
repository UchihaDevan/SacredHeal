export interface Product {
  id: string;
  name: string;
  section: 'main' | 'premium' | 'bonus';
  description: string;
  imageUrl: string;
  audioUrl?: string; // Links públicos conforme definido para o MVP
  category: string;
  tags: string[];
  benefits?: string[];
  duration?: number; // em segundos
  hz?: number; // frequência específica se aplicável
  intensity?: 'beginner' | 'intermediate' | 'advanced';
  releaseDate?: string; // para "Divine Energy Code"
  isComingSoon?: boolean;
  isPremium?: boolean;
  edition?: string; // para orações (ex: "2023", "2023 - Segunda Edição")
  frequency?: number;
  waveform?: 'sine' | 'square' | 'triangle' | 'sawtooth';
  audioType?: 'external' | 'generated' | 'binaural';
}
