import React from 'react';
import { Sparkles, ShieldAlert } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/cards/ProductCard';
import type { Product } from '../types';

interface PremiumProps {
  onOpenDetails: (product: Product) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const Premium: React.FC<PremiumProps> = ({ onOpenDetails, onNavigateToTab }) => {
  const premiumProducts = products.filter((p) => p.section === 'premium');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest">
            Portal Exclusivo
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Sintonizações <span className="text-purple-400 font-serif">Premium</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Tenha acesso aos métodos mais profundos e aceleradores de frequências criados para o seu bem-estar completo.
        </p>
      </div>

      {/* Caixa Informativa Premium */}
      <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-start gap-4">
        <ShieldAlert className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-purple-200">Acesso Premium Ativo</h4>
          <p className="text-xs text-purple-300/80 leading-relaxed">
            Como membro consagrado, você tem acesso irrestrito a todos os aceleradores sonoros, playlists turbo de meditação e aconselhamento direto com o bot simulado do Pastor Caleb.
          </p>
        </div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenDetails={onOpenDetails}
            onNavigateToTab={onNavigateToTab}
          />
        ))}
      </div>
      
    </div>
  );
};
