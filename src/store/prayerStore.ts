import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecitationRecord {
  prayerId: string;
  date: string;
}

interface PrayerState {
  recitationHistory: RecitationRecord[];
  addRecitation: (prayerId: string) => void;
  getRecitationDates: (prayerId: string) => string[];
  hasRecitedToday: (prayerId: string) => boolean;
}

export const usePrayerStore = create<PrayerState>()(
  persist(
    (set, get) => ({
      recitationHistory: [],

      addRecitation: (prayerId: string) => {
        const today = new Date().toISOString().split('T')[0];
        const history = get().recitationHistory;

        // Evitar duplicatas no mesmo dia
        if (history.some(r => r.prayerId === prayerId && r.date === today)) {
          return;
        }

        set({
          recitationHistory: [
            ...history,
            { prayerId, date: today }
          ]
        });
      },

      getRecitationDates: (prayerId: string) => {
        return get().recitationHistory
          .filter(r => r.prayerId === prayerId)
          .map(r => r.date);
      },

      hasRecitedToday: (prayerId: string) => {
        const today = new Date().toISOString().split('T')[0];
        return get().recitationHistory.some(
          r => r.prayerId === prayerId && r.date === today
        );
      }
    }),
    { name: 'prayer-storage' }
  )
);
