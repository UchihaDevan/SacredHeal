import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Challenge } from '../types';
import { challengesData } from '../data/challenges';

interface ChallengeStoreState {
  challenges: Challenge[];
  startChallenge: (id: string) => void;
  toggleTask: (challengeId: string, taskId: string) => void;
  completeDay: (challengeId: string) => void;
  resetChallenge: (challengeId: string) => void;
}

export const useChallengeStore = create<ChallengeStoreState>()(
  persist(
    (set) => ({
      // Inicializa os desafios mapeados da base estática
      challenges: challengesData.map((c) => ({
        ...c,
        startDate: '',
        streak: 0,
        completedDays: 0,
        dailyTasks: c.dailyTasks.map((t) => ({ ...t, completed: false }))
      })),

      startChallenge: (id) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === id && !c.startDate
              ? {
                  ...c,
                  startDate: new Date().toISOString(),
                  streak: 0,
                  completedDays: 0,
                  completed: false,
                  dailyTasks: c.dailyTasks.map((t) => ({ ...t, completed: false, completedAt: undefined }))
                }
              : c
          ),
        })),

      toggleTask: (challengeId, taskId) =>
        set((state) => ({
          challenges: state.challenges.map((c) => {
            if (c.id !== challengeId) return c;

            const updatedTasks = c.dailyTasks.map((t) =>
              t.id === taskId
                ? {
                    ...t,
                    completed: !t.completed,
                    completedAt: !t.completed ? new Date().toISOString() : undefined,
                  }
                : t
            );



            return {
              ...c,
              dailyTasks: updatedTasks,
              // Se todas completadas, pode opcionalmente somar o dia, mas deixaremos o botão de "Concluir Dia" ou faremos automático
            };
          }),
        })),

      completeDay: (challengeId) =>
        set((state) => ({
          challenges: state.challenges.map((c) => {
            if (c.id !== challengeId) return c;

            // Se ainda não iniciou, inicia agora
            const startDate = c.startDate || new Date().toISOString();
            const nextCompletedDays = c.completedDays + 1;
            const isFinished = nextCompletedDays >= c.duration;

            return {
              ...c,
              startDate,
              completedDays: nextCompletedDays,
              streak: c.streak + 1,
              completed: isFinished,
              // Reseta as tarefas diárias para o dia seguinte
              dailyTasks: c.dailyTasks.map((t) => ({ ...t, completed: false, completedAt: undefined }))
            };
          }),
        })),

      resetChallenge: (challengeId) =>
        set((state) => ({
          challenges: state.challenges.map((c) =>
            c.id === challengeId
              ? {
                  ...c,
                  startDate: '',
                  streak: 0,
                  completedDays: 0,
                  completed: false,
                  dailyTasks: c.dailyTasks.map((t) => ({ ...t, completed: false, completedAt: undefined }))
                }
              : c
          ),
        })),
    }),
    {
      name: 'sacred-heal-challenge-storage'
    }
  )
);
