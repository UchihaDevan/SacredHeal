import React, { useState, useEffect, useCallback } from 'react';
import {
  Sparkles,
  BookOpen,
  Trash2,
  ChevronLeft,
  Play,
  Square,
  Plus,
  Calendar,
  Coins,
} from 'lucide-react';
import { useAudioStore } from '../store/audioStore';
import { playPureTone, stopPureTone } from '../services/audioService';

// --- Data ---

const prosperityAffirmations = [
  'I am worthy of abundance and divine wealth',
  'Divine wealth flows to me freely and effortlessly',
  'I attract prosperity in all areas of my life',
  'The universe conspires to bring me financial blessings',
  'I release all limiting beliefs about money',
  'My income grows constantly and abundantly',
  'I am aligned with the frequency of abundance',
  'Gratitude opens the doors to even greater prosperity',
  'I am a magnet for miracles and opportunities',
  'God provides for all my needs beyond measure',
];

interface JournalEntry {
  id: string;
  date: string;
  text: string;
}

const JOURNAL_KEY = 'sacred-heal-prosperity-journal';

// --- Component ---

export const ProsperityExperience: React.FC = () => {
  // Affirmation state
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // Journal state
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Audio state
  const [isTonePlaying, setIsTonePlaying] = useState(false);

  // Load entries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(JOURNAL_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Cycle affirmations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setAffirmationIndex((prev) => (prev + 1) % prosperityAffirmations.length);
        setIsFading(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Cleanup tone on unmount
  useEffect(() => {
    return () => {
      stopPureTone();
    };
  }, []);

  const saveEntry = useCallback(() => {
    if (!journalText.trim()) return;

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      text: journalText.trim(),
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    setJournalText('');
  }, [journalText, entries]);

  const deleteEntry = useCallback(
    (id: string) => {
      const updated = entries.filter((e) => e.id !== id);
      setEntries(updated);
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(updated));
    },
    [entries]
  );

  const toggleTone = useCallback(() => {
    if (isTonePlaying) {
      stopPureTone();
      setIsTonePlaying(false);
    } else {
      // Pause any playing track in the audio store
      const { isPlaying, pause } = useAudioStore.getState();
      if (isPlaying) pause();
      playPureTone(888, 0.5);
      setIsTonePlaying(true);
    }
  }, [isTonePlaying]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-amber-400/70 mb-1">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-xs font-semibold uppercase tracking-wider">Prosperity Experience</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-100">
          Frequency of <span className="gold-text-gradient font-serif">Divine Abundance</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
          Tune your mind to the 888Hz prosperity frequency. Affirm your worthiness and manifest your goals through daily journaling.
        </p>
      </div>

      {/* 888Hz Play Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTone}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
            isTonePlaying
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_25px_rgba(245,158,11,0.15)]'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40'
          }`}
        >
          {isTonePlaying ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          {isTonePlaying ? 'Stop 888Hz Tone' : 'Play 888Hz Prosperity Tone'}
        </button>
        {isTonePlaying && (
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-amber-400 rounded-full"
                style={{
                  height: `${12 + Math.random() * 16}px`,
                  animation: `pulse ${0.4 + i * 0.15}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Affirmation Player */}
        <div className="rounded-3xl glass-effect p-6 md:p-8 border border-amber-500/10 relative overflow-hidden min-h-[280px] flex flex-col justify-between">
          {/* Decorative glow */}
          <div className="absolute right-0 top-0 -mr-20 -mt-20 w-56 h-56 rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 -ml-16 -mb-16 w-40 h-40 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Prosperity Affirmations
              </span>
            </div>

            <div
              className={`transition-all duration-500 ${
                isFading ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              <p className="text-xl md:text-2xl font-serif italic text-slate-100 leading-relaxed">
                "{prosperityAffirmations[affirmationIndex]}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-8">
            {prosperityAffirmations.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === affirmationIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Manifestation Journal */}
        <div className="rounded-3xl glass-effect p-6 md:p-8 border border-white/5 relative overflow-hidden flex flex-col">
          <div className="absolute right-0 bottom-0 -mr-16 -mb-16 w-48 h-48 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
              Manifestation Journal
            </span>
          </div>

          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write your gratitude, financial goals, and prosperity intentions here..."
            className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-amber-500/30 transition-colors"
          />

          <button
            onClick={saveEntry}
            disabled={!journalText.trim()}
            className="mt-3 flex items-center gap-2 self-end px-5 py-2 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/25 hover:bg-amber-500/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
            Save Entry
          </button>
        </div>
      </div>

      {/* Journal Entries List */}
      {entries.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Previous Entries ({entries.length})
            </h3>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl glass-effect p-4 border border-white/5 hover:border-amber-500/15 transition-all group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span className="text-[10px] text-slate-500 font-medium">{entry.date}</span>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {entry.text}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
