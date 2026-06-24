import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';

interface ChatWidgetProps {
  onNavigateToTab: (tabId: string) => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ onNavigateToTab }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    // 1. Após 8 segundos, o Pastor Caleb "envia" uma notificação simulada
    const notificationTimer = setTimeout(() => {
      setHasNotification(true);
      setShowPopup(true);
      setBounce(true);
      
      // Para a animação de balanço após 4 segundos para não incomodar o usuário
      setTimeout(() => setBounce(false), 4000);
    }, 8000);

    return () => clearTimeout(notificationTimer);
  }, []);

  const handleWidgetClick = () => {
    onNavigateToTab('chat');
    setHasNotification(false);
    setShowPopup(false);
  };

  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita navegar para a aba ao clicar no botão Fechar
    setShowPopup(false);
  };

  return (
    <div className="fixed bottom-24 md:bottom-28 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Balão de Pop-up dinâmico */}
      {showPopup && (
        <div className="pointer-events-auto max-w-[240px] bg-slate-900/95 dark:bg-spiritual-navy/95 text-slate-100 p-3.5 rounded-2xl border border-spiritual-gold/30 shadow-2xl animate-in slide-in-from-bottom-2 duration-300 relative flex items-start gap-2.5">
          <div className="flex-1">
            <span className="text-[9px] font-bold text-spiritual-gold uppercase tracking-wider block mb-0.5">
              Mensagem do Pastor Caleb
            </span>
            <p className="text-[11px] leading-relaxed text-slate-300">
              "Precisa de um conselho bíblico ou oração especial hoje? Fale comigo!"
            </p>
          </div>
          <button
            onClick={handleClosePopup}
            className="p-0.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors shrink-0"
            aria-label="Fechar pop-up"
          >
            <X className="w-3 h-3" />
          </button>
          
          {/* Seta do Pop-up apontando para o botão */}
          <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-slate-900 dark:bg-spiritual-navy border-r border-b border-spiritual-gold/30 rotate-45" />
        </div>
      )}

      {/* Botão Flutuante */}
      <button
        onClick={handleWidgetClick}
        className={`pointer-events-auto p-4 rounded-full gold-bg-gradient text-slate-900 shadow-[0_10px_25px_rgba(199,167,92,0.4)] transition-all hover:scale-110 active:scale-95 relative border border-spiritual-gold-light/20 ${
          bounce ? 'animate-bounce' : ''
        }`}
        title="Falar com o Pastor Caleb"
      >
        <MessageSquare className="w-6 h-6 fill-slate-950" />
        
        {/* Ponto Vermelho de Notificação */}
        {hasNotification && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-slate-900 rounded-full animate-pulse" />
        )}
      </button>
    </div>
  );
};
