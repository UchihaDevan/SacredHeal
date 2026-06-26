import React, { useState, useEffect } from 'react';
import { X, BookOpen, Heart, Copy, Check, Volume2, VolumeX, Share2, Sparkles } from 'lucide-react';
import { dailyVerses } from '../../data/biblicalVerses';
import { useUserStore } from '../../store/userStore';

interface DailyVerseModalProps {
  onClose: () => void;
}

export const DailyVerseModal: React.FC<DailyVerseModalProps> = ({ onClose }) => {
  const { favorites, addFavorite, removeFavorite } = useUserStore();
  
  // Calculate default verse of the day
  const dayOfMonth = new Date().getDate();
  const defaultIndex = dayOfMonth % dailyVerses.length;
  
  const [selectedVerse, setSelectedVerse] = useState(dailyVerses[defaultIndex]);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Text-To-Speech cleanup
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Whenever selected verse changes, stop speech synthesis if playing
  useEffect(() => {
    if (isSpeaking && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedVerse]);

  const isFavorite = favorites.includes(selectedVerse.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(selectedVerse.id);
    } else {
      addFavorite(selectedVerse.id);
    }
  };

  const handleCopy = () => {
    const textToCopy = `"${selectedVerse.verse}" — ${selectedVerse.reference}\n\nPastoral Reflection: ${selectedVerse.interpretation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(selectedVerse.verse);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Majestic pacing

      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Verse - Sacred Heal',
        text: `"${selectedVerse.verse}" — ${selectedVerse.reference}`,
        url: window.location.origin
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  // Check if a verse is the active default verse of the day
  const isDefaultVerseOfTheDay = (id: string) => {
    return dailyVerses[defaultIndex].id === id;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-slate-900/95 border border-white/10 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-spiritual-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-spiritual-indigo/10 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-spiritual-gold" />
            <h3 className="font-serif font-bold text-lg md:text-xl text-slate-100">
              Daily Nourishment
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 custom-scrollbar">
          {/* Active Verse Spotlight Card */}
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-spiritual-indigo/20 to-slate-900 border border-white/10 shadow-inner overflow-hidden">
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-spiritual-gold/10 text-[9px] text-spiritual-gold uppercase font-semibold tracking-wider">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{isDefaultVerseOfTheDay(selectedVerse.id) ? 'Verse of the Day' : 'Selected Scripture'}</span>
            </div>

            <blockquote className="space-y-4 text-left">
              <p className="text-lg md:text-xl font-serif italic text-slate-100 leading-relaxed font-medium">
                "{selectedVerse.verse}"
              </p>
              <cite className="block text-sm font-semibold text-spiritual-gold font-serif not-italic">
                — {selectedVerse.reference}
              </cite>
            </blockquote>

            <div className="text-left mt-5 pt-4 border-t border-white/5 space-y-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-widest">
                Pastoral Reflection
              </h4>
              <p className="text-xs text-slate-450 leading-relaxed">
                {selectedVerse.interpretation}
              </p>
            </div>

            {/* Verse Actions */}
            <div className="flex flex-wrap items-center gap-2.5 mt-6 pt-4 border-t border-white/5">
              <button
                onClick={handleFavorite}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${
                  isFavorite ? 'text-rose-400' : 'text-slate-400'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                onClick={handlePlayVoice}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${
                  isSpeaking ? 'text-spiritual-gold bg-spiritual-gold/10 border border-spiritual-gold/25' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-spiritual-gold animate-pulse" />
                    <span className="text-spiritual-gold">Stop Listening</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Historical List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Scripture History & Reflections
              </h4>
              <span className="text-[10px] text-slate-500 font-medium">
                {dailyVerses.length} verses loaded
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {dailyVerses.map((verse) => {
                const isActive = selectedVerse.id === verse.id;
                const isVerseFav = favorites.includes(verse.id);
                const isToday = isDefaultVerseOfTheDay(verse.id);
                
                return (
                  <button
                    key={verse.id}
                    onClick={() => setSelectedVerse(verse)}
                    className={`group w-full p-3.5 rounded-xl border text-left transition-all duration-300 relative flex flex-col justify-between overflow-hidden cursor-pointer ${
                      isActive 
                        ? 'bg-spiritual-gold/10 border-spiritual-gold/40' 
                        : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                    }`}
                  >
                    {isToday && (
                      <span className="absolute top-2 right-2 text-[8px] font-bold text-spiritual-gold uppercase tracking-wider bg-spiritual-gold/15 px-1.5 py-0.5 rounded-full">
                        Today
                      </span>
                    )}
                    
                    <p className={`text-xs font-serif italic mb-2 leading-relaxed transition-colors ${
                      isActive ? 'text-slate-105' : 'text-slate-300 group-hover:text-slate-100'
                    }`}>
                      "{verse.verse}"
                    </p>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-1">
                      <span className="text-[10px] font-bold text-spiritual-gold font-serif">
                        — {verse.reference}
                      </span>
                      <div className="flex items-center gap-2">
                        {isVerseFav && (
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                        )}
                        <span className="text-[9px] text-slate-450 group-hover:text-slate-350 transition-colors">
                          Read reflection &rarr;
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
