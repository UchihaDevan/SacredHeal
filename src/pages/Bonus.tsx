import React, { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Gift, Star, Search, Calendar, ChevronLeft, ChevronRight, Download, FileText, Music, Info, CheckCircle2 } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { frequenciesData } from '../data/products';
import { prayers } from '../data/prayers';
import { biblicalWisdom } from '../data/biblicalVerses';
import { testimonials } from '../data/testimonials';
import { usePrayerStore } from '../store/prayerStore';
import { generatePrayerPDF, generateFrequencyGuide } from '../services/pdfGenerator';

export const Bonus: React.FC = () => {
  const location = useLocation();
  const [subTab, setSubTab] = useState<'prayers' | 'wisdom' | 'testimonials' | 'downloads'>(() => {
    return (location.state as any)?.subTab || 'prayers';
  });

  useEffect(() => {
    if (location.state && (location.state as any).subTab) {
      setSubTab((location.state as any).subTab);
    }
  }, [location.state]);
  
  // Local search states
  const [wisdomQuery, setWisdomQuery] = useState('');
  
  // Testimonials state
  const [testimonialCategory, setTestimonialCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'date' | 'rating'>('date');
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Prayer Recitation state
  const { recitationHistory, addRecitation } = usePrayerStore();

  // Testimonials carousel listeners
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Filter biblical wisdom
  const filteredWisdom = biblicalWisdom.filter((item) => {
    const q = wisdomQuery.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const verse = item.verse.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const ref = item.reference.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const book = item.book.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const tags = item.tags.map((t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
    
    return verse.includes(q) || ref.includes(q) || book.includes(q) || tags.some((t) => t.includes(q));
  });

  // Filter & Sort Testimonials
  const filteredTestimonials = testimonialCategory === 'All'
    ? testimonials
    : testimonials.filter((t) => t.category === testimonialCategory);

  const sortedTestimonials = [...filteredTestimonials].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.rating - a.rating;
  });

  // Re-initialize Embla Carousel when data change
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, testimonialCategory, sortBy]);

  // Calendar parameters
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDayOfWeek = firstDayOfMonth.getDay();

  const getCalendarDays = () => {
    const days: (number | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  };

  const getRecitedDates = (prayerId: string) => {
    const dates = recitationHistory
      .filter((r) => r.prayerId === prayerId)
      .map((r) => {
        const parts = r.date.split('-'); // YYYY-MM-DD
        return Number(parts[2]);
      });
    return dates;
  };

  const isRecitedToday = (prayerId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    return recitationHistory.some((r) => r.prayerId === prayerId && r.date === todayStr);
  };

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
          Explore anointed prayers, biblical faith studies, and testimonies of deliverance achieved through faith.
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {prayers.map((prayer) => {
              const completedToday = isRecitedToday(prayer.id);
              const dates = getRecitedDates(prayer.id);

              return (
                <div
                  key={prayer.id}
                  className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden group hover:border-emerald-400/20 transition-all gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-400/20 text-emerald-400 uppercase tracking-wider">
                        {prayer.edition}
                      </span>
                      {prayer.recommendedTime && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          Recommended: {prayer.recommendedTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-slate-100 text-xl">
                      {prayer.name}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed italic border-l-2 border-emerald-400/30 pl-3 py-1">
                      {prayer.instructions}
                    </p>

                    {/* Prayer Text */}
                    <div className="bg-spiritual-dark/50 p-5 rounded-2xl border border-white/5 max-h-52 overflow-y-auto">
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line text-center font-serif">
                        {prayer.text}
                      </p>
                    </div>

                    {/* Consecration Button */}
                    <button
                      onClick={() => addRecitation(prayer.id)}
                      disabled={completedToday}
                      className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                        completedToday
                          ? 'bg-emerald-500/25 text-emerald-350 border border-emerald-500/40'
                          : 'gold-bg-gradient text-slate-900 hover:scale-[1.01] active:scale-95 shadow-[0_4px_15px_rgba(199,167,92,0.15)]'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{completedToday ? 'Recited Today (Streak Saved)' : 'Mark as Recited Today'}</span>
                    </button>
                  </div>

                  {/* Monthly Streak Calendar */}
                  <div className="border-t border-white/5 pt-5 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-350 uppercase tracking-wider">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>
                        Streak History: {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-semibold text-slate-500">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day}>{day}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {getCalendarDays().map((day, idx) => (
                        <div
                          key={idx}
                          className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                            day === null
                              ? ''
                              : dates.includes(day)
                              ? 'bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/40 shadow-[0_0_10px_rgba(199,167,92,0.15)]'
                              : 'bg-white/5 text-slate-500 hover:bg-white/10'
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 bg-white/5 rounded-xl p-3 border border-white/5">
                      <span>Total recitations this month:</span>
                      <span className="font-bold text-spiritual-gold">{dates.length} days</span>
                    </div>
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
          {/* Controls Panel */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex gap-1.5 scrollbar-none overflow-x-auto">
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

            {/* Sort Filter */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Sort by:</span>
              <button
                onClick={() => setSortBy('date')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === 'date'
                    ? 'bg-emerald-400/10 text-emerald-450 border border-emerald-400/20'
                    : 'bg-white/5 text-slate-400 hover:text-slate-205'
                }`}
              >
                Date
              </button>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  sortBy === 'rating'
                    ? 'bg-emerald-400/10 text-emerald-455 border border-emerald-400/20'
                    : 'bg-white/5 text-slate-400 hover:text-slate-205'
                }`}
              >
                Rating
              </button>
            </div>
          </div>

          {/* Testimonials Carousel Container */}
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
              <div className="flex gap-5">
                {sortedTestimonials.map((item) => (
                  <div
                    key={item.id}
                    className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0"
                  >
                    <div className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 shadow-xl h-full min-h-[220px]">
                      <div>
                        {/* Stars */}
                        <div className="flex items-center gap-0.5 mb-4">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        <p className="text-xs text-slate-350 leading-relaxed italic">
                          "{item.text}"
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-spiritual-indigo/40 shrink-0">
                          <img src={item.userPhoto} alt={item.userName} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-250">{item.userName}</h4>
                          <span className="text-[9px] text-slate-500 font-medium">
                            {item.category} • {item.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Buttons */}
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canScrollPrev}
                className="p-2 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-slate-250 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canScrollNext}
                className="p-2 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-slate-250 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Downloads */}
      {subTab === 'downloads' && (
        <div className="space-y-6">
          <div className="bg-spiritual-indigo/10 border border-white/5 p-4 rounded-2xl flex gap-3 max-w-xl">
            <Info className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Premium Library:</strong> Download resources dynamically created on-the-fly. Frequencies guides contain detailed frequency benefits and summaries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {/* Resource 1: Prayers PDF */}
            <div className="bg-spiritual-indigo/10 border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/20 transition-colors gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 shrink-0">
                  <FileText className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-100 text-lg mb-1">
                    Anointed Prayers PDF
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A beautiful eBook containing all first and second edition Anointed Prayers, with full instructions and recommended guidelines.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">File Format: PDF • Size: ~24 KB</p>
                </div>
              </div>
              <button
                onClick={() => generatePrayerPDF(prayers)}
                className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Generate & Download</span>
              </button>
            </div>

            {/* Resource 2: Frequencies Guide PDF */}
            <div className="bg-spiritual-indigo/10 border border-white/5 rounded-3xl p-6 flex flex-col justify-between hover:border-emerald-500/20 transition-colors gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 shrink-0">
                  <Music className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-100 text-lg mb-1">
                    Sacred Frequencies Guide
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Deep theological and energetic reference guide detailing the seven main Solfeggio Hz frequencies, their benefits, and instructions.
                  </p>
                  <p className="text-[10px] text-slate-500 mt-2">File Format: PDF • Size: ~35 KB</p>
                </div>
              </div>
              <button
                onClick={() => generateFrequencyGuide(frequenciesData as any[])}
                className="w-full py-3 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-500/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Generate & Download</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
