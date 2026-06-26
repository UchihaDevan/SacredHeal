import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Play, MessageSquare, Award, ArrowRight, Lock, Download, BookOpen, Radio, Shield, CheckCircle } from 'lucide-react';
import type { Product } from '../../types';
import { useUserStore } from '../../store/userStore';
import { useAudioStore } from '../../store/audioStore';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails
}) => {
  const navigate = useNavigate();
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

    if (product.id === 'daily-verses') {
      onOpenDetails(product);
      return;
    }

    // Direct pages & custom experience pages
    const routes: Record<string, string> = {
      'chat-pastor': '/chat',
      'sacred-challenge': '/challenge',
      'prosperity-frequencies': '/experience/prosperity',
      'mental-frequencies': '/experience/mental',
      'divine-accelerator': '/experience/accelerator',
      'turbo-session': '/experience/turbo',
      'sanctuary-healing': '/experience/sanctuary',
    };

    if (product.id in routes) {
      navigate(routes[product.id]);
      return;
    }

    // Sub-tab pages
    if (product.id === 'healing-vault') {
      navigate('/frequencies', { state: { subTab: 'programs' } });
      return;
    }
    if (product.id === 'archangel-frequencies') {
      navigate('/frequencies', { state: { subTab: 'archangels' } });
      return;
    }

    if (product.id === 'testimonials') {
      navigate('/bonus', { state: { subTab: 'testimonials' } });
      return;
    }
    if (product.id === 'biblical-wisdom') {
      navigate('/bonus', { state: { subTab: 'wisdom' } });
      return;
    }
    if (product.id === 'anointed-prayer-1' || product.id === 'anointed-prayer-2') {
      navigate('/bonus', { state: { subTab: 'prayers' } });
      return;
    }
    if (product.id === 'premium-resources') {
      navigate('/bonus', { state: { subTab: 'downloads' } });
      return;
    }

    // Default cases: play audio directly or open details modal
    if (product.audioUrl || product.audioType === 'generated') {
      playTrack({
        id: product.id,
        name: product.name,
        url: product.audioUrl,
        duration: product.duration || 300,
        imageUrl: product.imageUrl,
        category: product.category,
        hz: product.hz,
        frequency: product.frequency,
        waveform: product.waveform,
        audioType: product.audioType
      });
      return;
    }

    onOpenDetails(product);
  };

  const getActionLabel = () => {
    if (product.isComingSoon) return 'Open Preview';
    
    const labels: Record<string, string> = {
      'healing-vault': 'Open Vault',
      'daily-verses': 'Read Verse',
      'archangel-frequencies': 'Tune Archangels',
      'prosperity-frequencies': 'Enter Experience',
      'mental-frequencies': 'Breathing Exercise',
      'divine-accelerator': 'Accelerate',
      'turbo-session': 'Start Session',
      'sanctuary-healing': 'Enter Sanctuary',
      'testimonials': 'Read Testimonies',
      'biblical-wisdom': 'Read Studies',
      'anointed-prayer-1': 'Pray Now',
      'anointed-prayer-2': 'Pray Now',
      'premium-resources': 'Get Resources',
      'chat-pastor': 'Start Chat',
      'sacred-challenge': 'View Streak',
      'emotional-frequencies': 'Start Healing'
    };

    if (product.id in labels) return labels[product.id];
    return (product.audioUrl || product.audioType === 'generated') ? 'Play Now' : 'Access';
  };

  const renderActionIcon = () => {
    if (product.isComingSoon) return <ArrowRight className="w-4 h-4" />;

    switch (product.id) {
      case 'healing-vault':
        return <Radio className="w-4 h-4" />;
      case 'archangel-frequencies':
        return <Shield className="w-4 h-4" />;
      case 'daily-verses':
      case 'biblical-wisdom':
        return <BookOpen className="w-4 h-4" />;
      case 'chat-pastor':
        return <MessageSquare className="w-4 h-4" />;
      case 'sacred-challenge':
        return <Award className="w-4 h-4" />;
      case 'anointed-prayer-1':
      case 'anointed-prayer-2':
        return <CheckCircle className="w-4 h-4" />;
      case 'premium-resources':
        return <Download className="w-4 h-4" />;
      case 'prosperity-frequencies':
      case 'mental-frequencies':
      case 'divine-accelerator':
      case 'turbo-session':
      case 'sanctuary-healing':
      case 'emotional-frequencies':
        return <Play className="w-4 h-4 fill-current" />;
      default:
        return (product.audioUrl || product.audioType === 'generated') ? <Play className="w-4 h-4 fill-current" /> : <ArrowRight className="w-4 h-4" />;
    }
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col rounded-2xl glass-effect border border-white/5 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-spiritual-gold/20 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] cursor-pointer"
    >
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-spiritual-indigo/20">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-spiritual-dark/80 via-transparent to-transparent" />
        
        {/* Favorite Button (Heart) */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 p-2 rounded-full bg-spiritual-dark/60 backdrop-blur-md border border-white/5 text-slate-300 hover:text-rose-500 hover:scale-110 active:scale-95 transition-all"
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isPremium && (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Lock className="w-3 h-3" /> PREMIUM
            </span>
          )}
          {product.isComingSoon && (
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              COMING SOON
            </span>
          )}
        </div>
      </div>

      {/* Content */}
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

        {/* Card Footer with Action Button */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
            {getActionLabel()}
          </span>
          
          <button
            onClick={handleAction}
            className="flex items-center justify-center p-2.5 rounded-xl bg-spiritual-indigo/40 hover:bg-spiritual-gold text-slate-300 hover:text-slate-900 transition-all"
          >
            {renderActionIcon()}
          </button>
        </div>
      </div>
    </div>
  );
};
