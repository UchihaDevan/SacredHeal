import React, { useState } from 'react';
import { BookOpen, Sparkles, Award, Heart, Copy, Check } from 'lucide-react';
import { dailyVerses } from '../data/biblicalVerses';
import { products } from '../data/products';
import { ProductCard } from '../components/cards/ProductCard';
import type { Product } from '../types';
import { useUserStore } from '../store/userStore';
import { useChallengeStore } from '../store/challengeStore';

interface HomeProps {
  onOpenDetails: (product: Product) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenDetails, onNavigateToTab }) => {
  const { favorites, addFavorite, removeFavorite } = useUserStore();
  const challenges = useChallengeStore((state) => state.challenges);
  const [copied, setCopied] = useState(false);

  // Seleciona o versículo do dia dinamicamente com base no dia do mês
  const dayOfMonth = new Date().getDate();
  const verseIndex = dayOfMonth % dailyVerses.length;
  const currentVerse = dailyVerses[verseIndex];

  const isVerseFavorite = favorites.includes(currentVerse.id);

  const handleCopyVerse = () => {
    const textToCopy = `"${currentVerse.verse}" — ${currentVerse.reference}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteVerse = () => {
    if (isVerseFavorite) {
      removeFavorite(currentVerse.id);
    } else {
      addFavorite(currentVerse.id);
    }
  };

  // Filtrar os produtos recomendados em destaque na Home (seleciona alguns dos 16)
  const featuredProducts = products.filter(
    (p) => p.id === 'healing-vault' || p.id === 'chat-pastor' || p.id === 'sacred-challenge'
  );

  // Encontra se existe algum desafio iniciado
  const activeChallenge = challenges.find((c) => c.startDate && !c.completed);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Mensagem de Boas-Vindas */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 leading-tight">
          Sua Jornada de <span className="gold-text-gradient font-serif">Cura e Fé</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base max-w-xl leading-relaxed">
          Sintonize sua mente nas frequências do Criador, medite na sabedoria das escrituras e fortaleça seu espírito hoje.
        </p>
      </div>

      {/* Grid Principal: Versículo do Dia + Status do Desafio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Widget: Versículo do Dia */}
        <div className="lg:col-span-2 relative rounded-3xl glass-effect p-6 md:p-8 flex flex-col justify-between overflow-hidden border border-white/5 shadow-xl">
          {/* Fundo decorativo sutil */}
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-spiritual-gold" />
              <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                Alimento Diário • Versículo do Dia
              </span>
            </div>

            <blockquote className="space-y-4">
              <p className="text-lg md:text-xl font-serif italic text-slate-100 leading-relaxed">
                "{currentVerse.verse}"
              </p>
              <cite className="block text-sm font-semibold text-spiritual-gold font-serif not-italic">
                — {currentVerse.reference}
              </cite>
            </blockquote>

            <p className="text-xs text-slate-400 leading-relaxed mt-5 border-t border-white/5 pt-4">
              <span className="font-semibold text-slate-300">Reflexão Pastoral:</span> {currentVerse.interpretation}
            </p>
          </div>

          {/* Ações do Versículo */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
            <button
              onClick={handleFavoriteVerse}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors ${
                isVerseFavorite ? 'text-rose-400' : 'text-slate-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isVerseFavorite ? 'fill-rose-500' : ''}`} />
              <span>{isVerseFavorite ? 'Salvo' : 'Salvar'}</span>
            </button>
            <button
              onClick={handleCopyVerse}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Widget: Estado do Desafio Sagrado */}
        <div className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 -mb-16 -mr-16 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-spiritual-gold" />
              <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                Desafio Sagrado Ativo
              </span>
            </div>

            {activeChallenge ? (
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-200 leading-snug">
                  {activeChallenge.name}
                </h3>
                
                {/* Streak Counter */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-4xl font-bold font-serif gold-text-gradient">{activeChallenge.streak}</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Dias seguidos</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Progresso total</span>
                    <span className="font-bold text-slate-200">
                      {activeChallenge.completedDays} / {activeChallenge.duration} dias
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full gold-bg-gradient rounded-full transition-all duration-500"
                      style={{ width: `${(activeChallenge.completedDays / activeChallenge.duration) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Você não tem nenhum desafio espiritual ativo no momento. Crie o hábito diário de consagração e acompanhe seus streaks.
                </p>
                <button
                  onClick={() => onNavigateToTab('challenge')}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/30 hover:bg-spiritual-gold hover:text-slate-900 transition-colors"
                >
                  Começar Desafio
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Seu status espiritual:</span>
            <span className="font-bold text-spiritual-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Consagrado
            </span>
          </div>
        </div>

      </div>

      {/* Seção: Recomendados em Destaque */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-100">
            Recomendado para Você
          </h2>
          <button
            onClick={() => onNavigateToTab('main')}
            className="text-xs font-bold text-spiritual-gold hover:underline"
          >
            Ver Todas as Frequências
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
              onNavigateToTab={onNavigateToTab}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
