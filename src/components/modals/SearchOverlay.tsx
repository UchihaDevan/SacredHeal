import React, { useState, useEffect, useRef } from 'react';
import { X, Search, Volume2, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import type { Product } from '../../types';
import { useAudioStore } from '../../store/audioStore';

interface SearchOverlayProps {
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const playTrack = useAudioStore((state) => state.play);

  useEffect(() => {
    inputRef.current?.focus();
    
    // Atalho Esc para fechar
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const normalizedQuery = query.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filtered = products.filter((p) => {
      const name = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const description = p.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const category = p.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const tags = p.tags.map((t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
      
      return (
        name.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        category.includes(normalizedQuery) ||
        tags.some((tag) => tag.includes(normalizedQuery))
      );
    });

    setResults(filtered);
  }, [query]);

  const handleProductAction = (product: Product) => {
    // Se o produto for uma frequência / oração com áudio direto, toca
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
    }
    onClose();
    
    // Roteia ou abre o modal
    const sectionElement = document.getElementById(product.id);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Agrupar resultados por seção
  const mainResults = results.filter((r) => r.section === 'main');
  const premiumResults = results.filter((r) => r.section === 'premium');
  const bonusResults = results.filter((r) => r.section === 'bonus');

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-spiritual-dark/95 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-2xl glass-effect border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Barra superior de Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <Search className="w-5 h-5 text-spiritual-gold" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you need to tune in to today? (e.g., healing, peace, caleb, 528hz...)"
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-400 outline-none text-base border-none focus:ring-0"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resultados */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              Start typing to find healing frequencies, anointed prayers, verses, and more.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-sm">
              No results found for "{query}". Try searching for terms like "healing", "prosperity", "Caleb", "prayer" or "Hz".
            </div>
          ) : (
            <>
              {/* Categoria Main Content */}
              {mainResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-spiritual-gold uppercase tracking-widest px-3 mb-2">
                    Frequencies & Wisdom (Main Content)
                  </h3>
                  <div className="space-y-1">
                    {mainResults.map((item) => (
                      <SearchItem key={item.id} product={item} onClick={() => handleProductAction(item)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Categoria Premium */}
              {premiumResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-widest px-3 mb-2">
                    Premium Sintonizations
                  </h3>
                  <div className="space-y-1">
                    {premiumResults.map((item) => (
                      <SearchItem key={item.id} product={item} onClick={() => handleProductAction(item)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Categoria Bonus */}
              {bonusResults.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 mb-2">
                    Bonus & Prayers
                  </h3>
                  <div className="space-y-1">
                    {bonusResults.map((item) => (
                      <SearchItem key={item.id} product={item} onClick={() => handleProductAction(item)} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

interface SearchItemProps {
  product: Product;
  onClick: () => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ product, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all text-left group border border-transparent hover:border-white/5"
    >
      <div className="w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 bg-spiritual-indigo/40">
        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-serif text-slate-200 group-hover:text-spiritual-gold-light transition-colors truncate">
            {product.name}
          </span>
          {product.hz && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-spiritual-gold/20 text-spiritual-gold">
              {product.hz} Hz
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 truncate mt-0.5">{product.description}</p>
      </div>
      <div className="flex items-center text-slate-400 group-hover:text-spiritual-gold transition-colors shrink-0">
        {product.audioUrl ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <ArrowRight className="w-4 h-4" />
        )}
      </div>
    </button>
  );
};
