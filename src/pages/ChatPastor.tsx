import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Shield } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

export const ChatPastor: React.FC = () => {
  const { messages, isLoading, sendMessageToPastor, clearChat } = useChatStore();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Rolagem automática para a última mensagem
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendMessageToPastor(inputText);
    setInputText('');
  };

  const handleSuggestionClick = (text: string) => {
    sendMessageToPastor(text);
  };

  const suggestions = [
    'I am feeling sad today',
    'I need a prayer for my health',
    'How to have peace amidst anxiety?',
    'I am going through a financial crisis',
  ];

  return (
    <div className="flex flex-col h-[70vh] rounded-3xl glass-effect border border-white/5 overflow-hidden shadow-2xl animate-in fade-in duration-500">
      
      {/* Header do Chat */}
      <div className="px-6 py-4 bg-spiritual-navy/80 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-spiritual-gold/40 bg-spiritual-indigo/80 overflow-hidden flex items-center justify-center shrink-0 relative">
            <span className="text-sm font-bold text-spiritual-gold">PC</span>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-spiritual-navy" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100 font-serif">Pastor Caleb</h2>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">
              Faith Counselor • Online
            </span>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-rose-400 transition-colors"
          title="Clear Conversation History"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Área de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        
        {/* Aviso de Privacidade */}
        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-[10px] text-slate-400 max-w-md mx-auto justify-center mb-4">
          <Shield className="w-3.5 h-3.5 text-spiritual-gold" />
          <span>Your conversations are 100% confidential and saved locally on your device.</span>
        </div>

        {/* Mapeamento de Mensagens */}
        {messages.map((msg) => {
          const isPastor = msg.sender === 'pastor';
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isPastor ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  isPastor
                    ? 'bg-spiritual-indigo/60 text-slate-200 rounded-tl-none border border-white/5'
                    : 'gold-bg-gradient text-slate-900 rounded-tr-none font-medium'
                }`}
              >
                {/* Formatar versículos com destaque de citação no chat */}
                {isPastor && msg.message.startsWith('"') ? (
                  <p className="font-serif italic border-l border-spiritual-gold/40 pl-2 text-spiritual-gold-light py-0.5">
                    {msg.message}
                  </p>
                ) : (
                  <p className="whitespace-pre-line">{msg.message}</p>
                )}
                
                {/* Hora da mensagem */}
                <span
                  className={`block text-[9px] mt-1.5 text-right ${
                    isPastor ? 'text-slate-500' : 'text-slate-800 font-semibold'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          );
        })}

        {/* Efeito de Digitanto... */}
        {isLoading && (
          <div className="flex w-full justify-start">
            <div className="bg-spiritual-indigo/60 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 border border-white/5 flex items-center gap-1.5">
              <span className="text-xs italic">Pastor Caleb is typing</span>
              <span className="flex gap-0.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Sugestões de Perguntas Rápidas (Ocultas se o chat estiver digitando) */}
      {!isLoading && messages.length <= 2 && (
        <div className="px-6 py-2 bg-spiritual-navy/35 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
          {suggestions.map((text) => (
            <button
              key={text}
              onClick={() => handleSuggestionClick(text)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] text-slate-300 hover:text-slate-100 hover:border-spiritual-gold/40 transition-colors shrink-0"
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Formulário de Envio */}
      <form onSubmit={handleSend} className="p-4 bg-spiritual-navy/50 border-t border-white/5 flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write your message or prayer request..."
          disabled={isLoading}
          className="flex-1 px-4 py-3 rounded-xl bg-spiritual-dark/60 border border-white/5 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-spiritual-gold/40 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="p-3 rounded-xl gold-bg-gradient text-slate-900 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shrink-0"
        >
          <Send className="w-4.5 h-4.5 fill-slate-900" />
        </button>
      </form>

    </div>
  );
};
