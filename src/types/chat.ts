export interface ChatMessage {
  id: string;
  sender: 'user' | 'pastor';
  message: string;
  timestamp: string; // ISO string
}

export interface BotResponse {
  keywords: string[];
  responses: string[];
  verse?: string;
  verseReference?: string;
}
