import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'pt' | 'en';
  notifications: boolean;
}

interface UserState {
  favorites: string[];
  history: string[];
  preferences: UserPreferences;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  addToHistory: (id: string) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      favorites: [],
      history: [],
      preferences: {
        theme: 'dark',
        language: 'pt',
        notifications: true,
      },
      addFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites
            : [...state.favorites, id],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id),
        })),
      addToHistory: (id) =>
        set((state) => {
          const filtered = state.history.filter((histId) => histId !== id);
          return {
            history: [id, ...filtered].slice(0, 10), // Guarda os 10 últimos visitados
          };
        }),
      updatePreferences: (prefs) =>
        set((state) => ({
          preferences: { ...state.preferences, ...prefs },
        })),
    }),
    {
      name: 'sacred-heal-user-storage',
    }
  )
);
