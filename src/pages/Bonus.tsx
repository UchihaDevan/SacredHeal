import React, { useState } from 'react';
import { Gift, Star, Search, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import { prayers } from '../data/prayers';
import { biblicalWisdom } from '../data/biblicalVerses';
import { testimonials } from '../data/testimonials';
import { ProductCard } from '../components/cards/ProductCard';
import { useLayoutContext } from '../hooks/useLayoutContext';

export const Bonus: React.FC = () => {
  const { onOpenDetails } = useLayoutContext();
  const [subTab, setSubTab] = useState<'prayers' | 'wisdom' | 'testimonials' | 'downloads'>('prayers');
  
  // Local search states
  const [wisdomQuery, setWisdomQuery] = useState('');
  const [testimonialCategory, setTestimonialCategory] = useState<string>('All');
  const [recitedPrayers, setRecitedPrayers] = useState<string[]>([]);

  // Filter biblical wisdom
  const filteredWisdom = biblicalWisdom.filter((item) => {
    const q = wisdomQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const verse = item.verse.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const ref = item.reference.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const book = item.book.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const tags = item.tags.map((t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    
    return verse.includes(q) || ref.includes(q) || book.includes(q) || tags.some((t) => t.includes(q));
  });

  // Filter testimonials
  const filteredTestimonials = testimonialCategory === 'All'
    ? testimonials
    : testimonials.filter((t) => t.category === testimonialCategory);

  const toggleRecited = (id: string) => {
    setRecitedPrayers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const bonusCards = products.filter((p) => p.section === 'bonus');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            Additional Blessings
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Resources of <span className="text-emerald-400 font-serif">Bonus & Edification</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Explore anointed prayers, biblical faith oracles, and testimonies of deliverance achieved through faith.
        </p>
      </div>

      {/* Sub-Navigation (Tabs) */}
      <div className="flex border-b border-white/5 gap-2 scrollbar-none overflow-x-auto">
        <button
          onClick={() => setSubTab('prayers')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'prayers'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Anointed Prayers
        </button>
        <button
          onClick={() => setSubTab('wisdom')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'wisdom'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Studies & Wisdom
        </button>
        <button
          onClick={() => setSubTab('testimonials')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'testimonials'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Testimonies of Faith
        </button>
        <button
          onClick={() => setSubTab('downloads')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-widest border-b-2 transition-colors shrink-0 ${
            subTab === 'downloads'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Downloads (PDFs)
        </button>
      </div>

      {/* Tab 1: Anointed Prayers */}
      {subTab === 'prayers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prayers.map((prayer) => {
              const isRecited = recitedPrayers.includes(prayer.id);

              return (
                <div
                  key={prayer.id}
                  className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-emerald-400/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-400 uppercase tracking-wider">
                        {prayer.edition}
                      </span>
                      {prayer.recommendedTime && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          Recommended: {prayer.recommendedTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-slate-100 text-lg mb-3">
                      {prayer.name}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-emerald-400/30 pl-3 py-1 mb-4">
                      {prayer.instructions}
                    </p>

                    {/* Prayer Text */}
                    <div className="bg-spiritual-dark/50 p-4 rounded-2xl border border-white/5 max-h-48 overflow-y-auto">
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line text-center font-serif">
                        {prayer.text}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-medium">
                      {isRecited ? 'Recited Today' : 'Consecrate now'}
                    </span>
                    <button
                      onClick={() => toggleRecited(prayer.id)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                        isRecited
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-emerald-400 text-slate-900 font-semibold hover:opacity-90'
                      }`}
                    >
                      {isRecited && <CheckCircle className="w-3.5 h-3.5" />}
                      <span>{isRecited ? 'Completed' : 'Mark as Recited'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Biblical Wisdom */}
      {subTab === 'wisdom' && (
        <div className="space-y-6">
          {/* Local search bar */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-spiritual-indigo/20 border border-white/5 max-w-md">
            <Search className="w-4 h-4 text-emerald-400 shrink-0" />
            <input
              type="text"
              value={wisdomQuery}
              onChange={(e) => setWisdomQuery(e.target.value)}
              placeholder="Search proverbs or biblical books..."
              className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          {/* Proverbs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredWisdom.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5"
              >
                <div>
                  <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-4 bg-spiritual-indigo/10">
                    <img src={item.imageUrl} alt={item.reference} className="w-full h-full object-cover" />
                  </div>
                  
                  <blockquote className="space-y-2">
                    <p className="text-sm font-serif italic text-slate-200 leading-relaxed">
                      "{item.verse}"
                    </p>
                    <cite className="block text-xs font-semibold text-emerald-400 font-serif not-italic">
                      — {item.reference}
                    </cite>
                  </blockquote>

                  <p className="text-[11px] text-slate-400 leading-relaxed mt-4 pt-3 border-t border-white/5">
                    <span className="font-semibold text-slate-300">Explanation:</span> {item.interpretation}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/5 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Faith Testimonies */}
      {subTab === 'testimonials' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex gap-2 scrollbar-none overflow-x-auto">
            {['All', 'Physical Healing', 'Prosperity', 'Mental Peace'].map((cat) => (
              <button
                key={cat}
                onClick={() => setTestimonialCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shrink-0 ${
                  testimonialCategory === cat
                    ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
                    : 'bg-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTestimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 shadow-xl relative"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-spiritual-indigo/40 shrink-0">
                    <img src={item.userPhoto} alt={item.userName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{item.userName}</h4>
                    <span className="text-[9px] text-slate-500 font-medium">
                      {item.category} • {item.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Premium Resources / Downloads */}
      {subTab === 'downloads' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bonusCards.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      )}

    </div>
  );
};
