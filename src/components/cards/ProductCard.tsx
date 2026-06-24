import React from 'react';
import { Heart, Play, MessageSquare, Award, ArrowRight, Lock } from 'lucide-react';
import type { Product } from '../../types';
import { useUserStore } from '../../store/userStore';
import { useAudioStore } from '../../store/audioStore';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onNavigateToTab
}) => {
  const { favorites, addFavorite, removeFavorite } = useUserStore();
  const playTrack = useAudioStore((state) => state.play);

  const isFavorite = favorites.includes(product.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (product.isComingSoon) {
      onOpenDetails(product);
      return;
    }

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
      return;
    }

    // Se for o chat, navega para a aba de chat
    if (product.id === 'chat-pastor') {
      onNavigateToTab('chat');
      return;
    }

    // Se for o desafio sagrado, navega para a aba de desafio
    if (product.id === 'sacred-challenge') {
      onNavigateToTab('challenge');
      return;
    }

    // Caso padrão, abre o modal de detalhes
    onOpenDetails(product);
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col rounded-2xl glass-effect border border-white/5 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-spiritual-gold/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] cursor-pointer"
    >
      {/* Imagem de Capa */}
      <div className="relative aspect-video w-full overflow-hidden bg-spiritual-indigo/20">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay de proteção/gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-spiritual-dark/80 via-transparent to-transparent" />
        
        {/* Botão de Favorito (Coração) */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-spiritual-dark/60 backdrop-blur-md border border-white/5 text-slate-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all"
          title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badges no Canto Esquerdo */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isPremium && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Lock className="w-3 h-3" /> PREMIUM
            </span>
          )}
          {product.isComingSoon && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              BREVE
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold text-spiritual-gold uppercase tracking-wider">
              {product.category}
            </span>
            {product.hz && (
              <span className="text-xs font-semibold text-spiritual-gold bg-spiritual-gold/10 px-2 py-0.5 rounded-full">
                {product.hz} Hz
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-serif font-bold text-slate-100 group-hover:text-spiritual-gold-light transition-colors line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rodapé do Card com Botão de Ação */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
            {product.isComingSoon ? 'Saiba Mais' : product.audioUrl ? 'Tocar Agora' : 'Acessar'}
          </span>
          
          <button
            onClick={handleAction}
            className="flex items-center justify-center p-2.5 rounded-xl bg-spiritual-indigo/40 hover:bg-spiritual-gold text-slate-300 hover:text-slate-900 transition-all"
          >
            {product.isComingSoon ? (
              <ArrowRight className="w-4 h-4" />
            ) : product.audioUrl ? (
              <Play className="w-4 h-4 fill-current" />
            ) : product.id === 'chat-pastor' ? (
              <MessageSquare className="w-4 h-4" />
            ) : product.id === 'sacred-challenge' ? (
              <Award className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
