import React, { useState, useEffect } from 'react';
import { X, Heart, Play, Mail, CheckCircle, Clock } from 'lucide-react';
import type { Product } from '../../types';
import { useUserStore } from '../../store/userStore';
import { useAudioStore } from '../../store/audioStore';

interface DetailsModalProps {
  product: Product;
  onClose: () => void;
  onNavigateToTab: (tabId: string) => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  product,
  onClose,
  onNavigateToTab
}) => {
  const { favorites, addFavorite, removeFavorite } = useUserStore();
  const playTrack = useAudioStore((state) => state.play);
  const isFavorite = favorites.includes(product.id);

  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  
  // Estado para contagem regressiva (Divine Energy Code - Lançamento 07/07)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!product.isComingSoon || !product.releaseDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(product.releaseDate!) - +new Date();
      let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [product]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  const handlePlayAction = () => {
    if (product.audioUrl) {
      playTrack({
        id: product.id,
        name: product.name,
        url: product.audioUrl,
        duration: product.duration || 300,
        imageUrl: product.imageUrl,
        category: product.category,
        hz: product.hz
      });
      onClose();
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Gravação simulada na lista de espera local
    const waitlist = JSON.parse(localStorage.getItem('sacred-heal-waitlist') || '[]');
    localStorage.setItem(
      'sacred-heal-waitlist',
      JSON.stringify([...waitlist, { email, productId: product.id, date: new Date().toISOString() }])
    );
    setEmailSaved(true);
    setEmail('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl glass-effect border border-white/10 overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300">
        
        {/* Banner esquerdo da Imagem */}
        <div className="relative w-full md:w-5/12 aspect-video md:aspect-auto md:h-auto overflow-hidden bg-spiritual-indigo/10 shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-spiritual-dark md:from-transparent to-transparent" />
          
          {product.hz && (
            <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-spiritual-gold text-slate-900 shadow-lg">
              {product.hz} Hz
            </span>
          )}
        </div>

        {/* Detalhes do Produto */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-spiritual-gold uppercase tracking-widest">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleFavorite}
                  className={`p-2 rounded-full hover:bg-white/5 transition-colors ${
                    isFavorite ? 'text-rose-500' : 'text-slate-400'
                  }`}
                  title={isFavorite ? 'Remover dos favoritos' : 'Favoritar'}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <h2 className="text-2xl font-serif font-bold text-slate-100 leading-tight">
              {product.name}
            </h2>
          </div>

          {/* Descrição & Benefícios */}
          <div className="my-6 space-y-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {product.benefits && product.benefits.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Benefícios esperados:
                </h4>
                <ul className="space-y-1.5">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-spiritual-gold font-bold mt-0.5">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Caso de Lançamento ( Divine Energy Code ) */}
            {product.isComingSoon && (
              <div className="p-4 rounded-2xl bg-spiritual-indigo/40 border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span>Contagem Regressiva para o Lançamento</span>
                </div>
                
                {/* Grid Cronômetro */}
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-spiritual-dark/60 p-2.5 rounded-xl border border-white/5">
                    <span className="block text-lg font-bold text-slate-100">{timeLeft.days}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Dias</span>
                  </div>
                  <div className="bg-spiritual-dark/60 p-2.5 rounded-xl border border-white/5">
                    <span className="block text-lg font-bold text-slate-100">{timeLeft.hours}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Horas</span>
                  </div>
                  <div className="bg-spiritual-dark/60 p-2.5 rounded-xl border border-white/5">
                    <span className="block text-lg font-bold text-slate-100">{timeLeft.minutes}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Min</span>
                  </div>
                  <div className="bg-spiritual-dark/60 p-2.5 rounded-xl border border-white/5">
                    <span className="block text-lg font-bold text-slate-100">{timeLeft.seconds}</span>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest">Seg</span>
                  </div>
                </div>

                {/* Formulário Lista de Espera */}
                {emailSaved ? (
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/25">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>Inscrito na lista de espera! Enviaremos avisos de lançamento.</span>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex gap-2">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu melhor e-mail"
                      className="flex-1 px-3 py-2 rounded-xl bg-spiritual-dark/40 border border-white/5 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-spiritual-gold/40"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl gold-bg-gradient text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Inscrever</span>
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Ações principais na base */}
          <div className="pt-4 border-t border-white/5 flex gap-3">
            {product.audioUrl ? (
              <button
                onClick={handlePlayAction}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl gold-bg-gradient text-slate-900 font-bold hover:scale-[1.01] active:scale-95 transition-all shadow-[0_4px_15px_rgba(199,167,92,0.3)]"
              >
                <Play className="w-4 h-4 fill-slate-900" />
                <span>Tocar Frequência</span>
              </button>
            ) : product.id === 'chat-pastor' ? (
              <button
                onClick={() => {
                  onNavigateToTab('chat');
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl gold-bg-gradient text-slate-900 font-bold hover:opacity-90 transition-opacity text-center"
              >
                Iniciar Chat Privado
              </button>
            ) : product.id === 'sacred-challenge' ? (
              <button
                onClick={() => {
                  onNavigateToTab('challenge');
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl gold-bg-gradient text-slate-900 font-bold hover:opacity-90 transition-opacity text-center"
              >
                Ver Meu Desafio
              </button>
            ) : (
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 font-semibold hover:bg-white/10 transition-colors text-center text-slate-300"
              >
                Fechar Detalhes
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
