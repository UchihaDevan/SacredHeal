import React, { useState } from 'react';
import { Play, Volume2, Radio, Shield } from 'lucide-react';
import { products, frequenciesData, archangelsData } from '../data/products';
import { ProductCard } from '../components/cards/ProductCard';
import type { Product } from '../types';
import { useAudioStore } from '../store/audioStore';
import { playPureTone, stopPureTone } from '../services/audioService';

interface MainContentProps {
  onOpenDetails: (product: Product) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const MainContent: React.FC<MainContentProps> = ({
  onOpenDetails,
  onNavigateToTab
}) => {
  const [subTab, setSubTab] = useState<'programs' | 'hz-vault' | 'archangels'>('programs');
  const playTrack = useAudioStore((state) => state.play);
  const currentTrack = useAudioStore((state) => state.currentTrack);
  const isPlaying = useAudioStore((state) => state.isPlaying);
  
  // Estado para controlar qual tom puro Hz está gerando áudio local no momento
  const [activePureHz, setActivePureHz] = useState<number | null>(null);

  const mainPrograms = products.filter((p) => p.section === 'main');

  const handlePlayTrack = (track: any) => {
    // Para o tom puro se estiver tocando
    if (activePureHz) {
      stopPureTone();
      setActivePureHz(null);
    }
    
    playTrack({
      id: track.id,
      name: track.name,
      url: track.audioUrl,
      duration: track.duration,
      imageUrl: track.imageUrl,
      category: track.category === 'healing' ? 'Cura' : 'Celestial',
      hz: track.hz
    });
  };

  const handleTogglePureTone = (hz: number) => {
    if (activePureHz === hz) {
      stopPureTone();
      setActivePureHz(null);
    } else {
      // Para o player de música se estiver tocando
      if (isPlaying) {
        useAudioStore.getState().pause();
      }
      playPureTone(hz, 0.5);
      setActivePureHz(hz);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Cabeçalho */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Vault of <span className="gold-text-gradient font-serif">Sacred Frequencies</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Browse between holistic wellness programs and scientific audio frequencies for spiritual healing.
        </p>
      </div>

      {/* Sub-Navegação interna (Abas) */}
      <div className="flex border-b border-white/5 gap-2 scrollbar-none overflow-x-auto">
        <button
          onClick={() => setSubTab('programs')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'programs'
              ? 'border-spiritual-gold text-spiritual-gold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Full Programs
        </button>
        <button
          onClick={() => setSubTab('hz-vault')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'hz-vault'
              ? 'border-spiritual-gold text-spiritual-gold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Healing Hz Frequencies (7)
        </button>
        <button
          onClick={() => setSubTab('archangels')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'archangels'
              ? 'border-spiritual-gold text-spiritual-gold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Archangels Frequencies
        </button>
      </div>

      {/* Exibição da Sub-Aba 1: Programas Completos */}
      {subTab === 'programs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainPrograms.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
              onNavigateToTab={onNavigateToTab}
            />
          ))}
        </div>
      )}

      {/* Exibição da Sub-Aba 2: Cofre de Frequências Hz Individuais */}
      {subTab === 'hz-vault' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-spiritual-indigo/20 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Radio className="w-5 h-5 text-spiritual-gold" />
              <p className="text-xs text-slate-300 max-w-md">
                Solfeggio frequencies work by balancing the mind and stimulating cellular self-regeneration. Listen to the MVP sound files or tune the pure sine wave direct from the Web Audio API.
              </p>
            </div>
            {activePureHz && (
              <button
                onClick={() => handleTogglePureTone(activePureHz)}
                className="px-4 py-2 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold hover:bg-rose-500/30 transition-colors shrink-0"
              >
                Stop Pure Tone ({activePureHz}Hz)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {frequenciesData.map((freq) => {
              const isPlayingThis = currentTrack?.id === freq.id && isPlaying;
              const isPurePlaying = activePureHz === freq.hz;

              return (
                <div
                  key={freq.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl glass-effect border border-white/5 hover:border-spiritual-gold/20 transition-all gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                      <img src={freq.imageUrl} alt={freq.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif font-bold text-slate-200 text-base">{freq.name}</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-spiritual-gold/15 text-spiritual-gold">
                          {freq.hz} Hz
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{freq.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {/* Botão Tom Puro */}
                    <button
                      onClick={() => handleTogglePureTone(freq.hz)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                        isPurePlaying
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : 'bg-white/5 text-slate-300 border-white/5 hover:border-spiritual-gold/30'
                      }`}
                    >
                      {isPurePlaying ? 'Mute Tone' : 'Play Pure Tone'}
                    </button>

                    {/* Botão Play Faixa MVP */}
                    <button
                      onClick={() => handlePlayTrack(freq)}
                      className={`p-2.5 rounded-xl transition-all ${
                        isPlayingThis
                          ? 'bg-spiritual-gold text-slate-900 shadow-[0_0_15px_rgba(199,167,92,0.3)]'
                          : 'bg-spiritual-indigo/40 hover:bg-spiritual-gold text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {isPlayingThis ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Exibição da Sub-Aba 3: Frequências dos Arcanjos */}
      {subTab === 'archangels' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {archangelsData.map((arch) => {
              const isPlayingThis = currentTrack?.id === arch.id && isPlaying;

              return (
                <div
                  key={arch.id}
                  className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 hover:border-spiritual-gold/20 transition-all group"
                >
                  <div>
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-4 bg-spiritual-indigo/10">
                      <img src={arch.imageUrl} alt={arch.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <span className="text-[10px] font-bold text-spiritual-gold uppercase tracking-wider block mb-1">
                      {arch.role}
                    </span>
                    
                    <h3 className="font-serif font-bold text-slate-100 text-lg leading-snug">
                      {arch.name}
                    </h3>
                    
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {arch.description}
                    </p>

                    <div className="mt-4 space-y-1.5">
                      {arch.properties.map((prop, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-slate-300">
                          <Shield className="w-3.5 h-3.5 text-spiritual-gold" />
                          <span>{prop}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-bold bg-spiritual-gold/15 px-2 py-0.5 rounded-full">
                      {arch.hz} Hz
                    </span>
                    <button
                      onClick={() => handlePlayTrack(arch)}
                      className={`flex items-center justify-center p-2.5 rounded-xl transition-all ${
                        isPlayingThis
                          ? 'bg-spiritual-gold text-slate-900 shadow-[0_0_15px_rgba(199,167,92,0.3)]Scale-105'
                          : 'bg-spiritual-indigo/40 hover:bg-spiritual-gold text-slate-300 hover:text-slate-900'
                      }`}
                    >
                      {isPlayingThis ? <Volume2 className="w-4.5 h-4.5" /> : <Play className="w-4.5 h-4.5 fill-current" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
