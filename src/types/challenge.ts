export interface DailyTask {
  id: string;
  taskName: string;
  completed: boolean;
  completedAt?: string; // ISO string se concluído
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  duration: number; // duração em dias (ex: 7, 21, 30)
  dailyTasks: DailyTask[];
  startDate: string; // ISO string de início
  endDate?: string; // ISO string de fim
  completed: boolean;
  completedDays: number;
  streak: number;
}
