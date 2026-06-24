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
            Technical Support
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
            <h3 className="text-xl font-serif font-bold text-slate-100">Message Sent!</h3>
            <p className="text-sm text-slate-400">
              Your message was successfully delivered to technical support. We will respond within 24 hours at the email provided.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 rounded-full gold-bg-gradient text-slate-900 font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed">
              Had trouble playing frequencies or want to clarify doubts about plans? Send us a message.
            </p>

            {status === 'error' && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                Please fill in all fields correctly.
              </div>
            )}

            <div>
              <label htmlFor="support-name" className="block text-xs font-semibold text-slate-400 mb-1">
                Your Name
              </label>
              <input
                id="support-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Maria Silva"
                className="w-full px-4 py-2.5 rounded-xl bg-spiritual-indigo/40 border border-white/5 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-spiritual-gold/40 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="support-email" className="block text-xs font-semibold text-slate-400 mb-1">
                Contact Email
              </label>
              <input
                id="support-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g., maria@email.com"
                className="w-full px-4 py-2.5 rounded-xl bg-spiritual-indigo/40 border border-white/5 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-spiritual-gold/40 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="support-message" className="block text-xs font-semibold text-slate-400 mb-1">
                Describe the Problem or Question
              </label>
              <textarea
                id="support-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you today?"
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
                <span>Sending...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
