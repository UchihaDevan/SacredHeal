import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    // Simula salvamento no banco (e grava no LocalStorage)
    setTimeout(() => {
      const tickets = JSON.parse(localStorage.getItem('sacred-heal-support-tickets') || '[]');
      const newTicket = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        message,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem(
        'sacred-heal-support-tickets',
        JSON.stringify([...tickets, newTicket])
      );

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl glass-effect border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-lg font-serif font-bold text-slate-100">
            Suporte Técnico
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo */}
        {status === 'success' ? (
          <div className="p-8 text-center flex flex-col items-center space-y-4">
            <CheckCircle className="w-16 h-16 text-emerald-400 animate-bounce" />
            <h3 className="text-xl font-serif font-bold text-slate-100">Mensagem Enviada!</h3>
            <p className="text-sm text-slate-400">
              Sua mensagem foi entregue com sucesso ao suporte técnico. Responderemos em até 24 horas no e-mail informado.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-full gold-bg-gradient text-slate-900 font-semibold hover:opacity-90 transition-opacity"
            >
              Concluir
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Teve problemas com a reprodução das frequências ou deseja esclarecer dúvidas sobre os planos? Envie-nos uma mensagem.
            </p>

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                Por favor, preencha todos os campos corretamente.
              </div>
            )}

            <div>
              <label htmlFor="support-name" className="block text-xs font-semibold text-slate-400 mb-1">
                Seu Nome
              </label>
              <input
                id="support-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maria Silva"
                className="w-full px-4 py-2.5 rounded-xl bg-spiritual-indigo/40 border border-white/5 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-spiritual-gold/40 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="support-email" className="block text-xs font-semibold text-slate-400 mb-1">
                E-mail de Contato
              </label>
              <input
                id="support-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: maria@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-spiritual-indigo/40 border border-white/5 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-spiritual-gold/40 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="support-message" className="block text-xs font-semibold text-slate-400 mb-1">
                Descreva o Problema ou Dúvida
              </label>
              <textarea
                id="support-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Como podemos te ajudar hoje?"
                rows={4}
                className="w-full px-4 py-2.5 rounded-xl bg-spiritual-indigo/40 border border-white/5 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-spiritual-gold/40 transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 py-3 mt-2 rounded-xl gold-bg-gradient text-slate-900 font-semibold hover:opacity-95 transition-opacity disabled:opacity-50"
            >
              {status === 'loading' ? (
                <span>Enviando...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
