import type { Challenge } from '../types';

export const challengesData: Omit<Challenge, 'startDate' | 'streak'>[] = [
  {
    id: 'desafio-7-dias',
    name: '7-Day Consecration and Protection Challenge',
    description: 'A short daily program focused on building the fortress of faith in your home with prayers and tuning in to angelic frequencies.',
    duration: 7,
    dailyTasks: [
      { id: 'd7-t1', taskName: "Listen to Michael's Protection Frequency (111Hz) for 5 minutes", completed: false },
      { id: 'd7-t2', taskName: 'Recite the 1st Edition Deliverance Prayer', completed: false },
      { id: 'd7-t3', taskName: 'Meditate on the Verse of the Day', completed: false }
    ],
    completed: false,
    completedDays: 0
  },
  {
    id: 'desafio-21-dias',
    name: '21-Day Health Restoration Challenge',
    description: 'Focus on biological renewal, chronic pain relief, and mental balance through deep meditations with Solfeggio frequencies.',
    duration: 21,
    dailyTasks: [
      { id: 'd21-t1', taskName: 'Listen to the Physical Healing Frequency (333Hz or 528Hz) for 10 minutes', completed: false },
      { id: 'd21-t2', taskName: 'Practice the guided breathing exercise in the Mind section', completed: false },
      { id: 'd21-t3', taskName: 'Write down a blessing of the day in a journal or give thanks out loud', completed: false }
    ],
    completed: false,
    completedDays: 0
  },
  {
    id: 'desafio-30-dias',
    name: '30-Day Active Prosperity Challenge',
    description: 'Transform your mind by eliminating beliefs of scarcity and sintonizing divine abundance through affirmations and prosperity Hz frequencies.',
    duration: 30,
    dailyTasks: [
      { id: 'd30-t1', taskName: 'Listen to the Prosperity Frequency (888Hz) for 15 minutes', completed: false },
      { id: 'd30-t2', taskName: 'Write down or recite out loud 3 positive affirmations of abundance', completed: false },
      { id: 'd30-t3', taskName: 'Share a verse or message of encouragement with someone', completed: false }
    ],
    completed: false,
    completedDays: 0
  }
];
