import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ChatMessage } from '../types';
import { botResponses, fallbackResponses } from '../data/botResponses';

interface ChatStoreState {
  messages: ChatMessage[];
  isLoading: boolean;
  addMessage: (text: string, sender: 'user' | 'pastor') => void;
  sendMessageToPastor: (text: string) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStoreState>()(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 'welcome',
          sender: 'pastor',
          message: 'Graça e paz, meu irmão! Sou o Pastor Caleb. Estou aqui para ouvir você, oferecer aconselhamento bíblico e orar pelas suas necessidades. Como posso ajudar seu coração hoje?',
          timestamp: new Date().toISOString()
        }
      ],
      isLoading: false,

      addMessage: (text: string, sender: 'user' | 'pastor') => {
        const newMessage: ChatMessage = {
          id: Math.random().toString(36).substr(2, 9),
          sender,
          message: text,
          timestamp: new Date().toISOString()
        };
        set((state) => ({
          messages: [...state.messages, newMessage]
        }));
      },

      sendMessageToPastor: (text: string) => {
        // 1. Adicionar mensagem do usuário
        get().addMessage(text, 'user');
        set({ isLoading: true });

        // 2. Analisar palavras-chave e obter resposta
        const normalizedText = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        
        let matchedResponse = '';
        let matchedVerse = '';
        let matchedVerseRef = '';

        for (const item of botResponses) {
          const match = item.keywords.some((keyword) => {
            const normalizedKeyword = keyword.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return normalizedText.includes(normalizedKeyword);
          });

          if (match) {
            // Seleciona uma resposta aleatória das correspondentes
            const randomIndex = Math.floor(Math.random() * item.responses.length);
            matchedResponse = item.responses[randomIndex];
            matchedVerse = item.verse || '';
            matchedVerseRef = item.verseReference || '';
            break;
          }
        }

        // Se não deu match, usa fallback
        if (!matchedResponse) {
          const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
          matchedResponse = fallbackResponses[randomIndex];
        }

        // 3. Simular atraso na digitação do Pastor Caleb (1 a 2 segundos)
        const delay = 1000 + Math.random() * 1000;
        setTimeout(() => {
          get().addMessage(matchedResponse, 'pastor');
          
          // Se tiver um versículo bíblico associado, envia logo em seguida
          if (matchedVerse && matchedVerseRef) {
            setTimeout(() => {
              get().addMessage(`"${matchedVerse}" — ${matchedVerseRef}`, 'pastor');
              set({ isLoading: false });
            }, 800);
          } else {
            set({ isLoading: false });
          }
        }, delay);
      },

      clearChat: () => {
        set({
          messages: [
            {
              id: 'welcome',
              sender: 'pastor',
              message: 'Graça e paz, meu irmão! Sou o Pastor Caleb. Como posso ajudar seu coração hoje?',
              timestamp: new Date().toISOString()
            }
          ]
        });
      }
    }),
    {
      name: 'sacred-heal-chat-storage'
    }
  )
);
