import React, { useState, useEffect } from 'react';
import { Play, Pause, Music, BookOpen, Clock, AlertCircle, X, Mail, CheckCircle } from 'lucide-react';
import { useAudioStore } from '../../store/audioStore';

interface DivineCodePreviewProps {
  onClose: () => void;
}

export const DivineCodePreview: React.FC<DivineCodePreviewProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState<'audio' | 'content'>('audio');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);

  const { play, pause, currentTrack, isPlaying } = useAudioStore();

  const isCurrentPlaying = isPlaying && currentTrack?.id === 'divine-code-preview';

  // Countdown para 7 de julho
  useEffect(() => {
    const calculateTimeLeft = () => {
      const releaseDate = new Date('2026-07-07T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = releaseDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePlayPreview = async () => {
    if (isCurrentPlaying) {
      pause();
    } else {
      await play({
        id: 'divine-code-preview',
        name: 'The Divine Energy Code - Preview',
        frequency: 528,
        duration: 30,
        audioType: 'generated',
        waveform: 'sine',
        imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?auto=format&fit=crop&w=600&q=80',
        category: 'Preview'
      });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const waitlist = JSON.parse(localStorage.getItem('sacred-heal-waitlist') || '[]');
    localStorage.setItem(
      'sacred-heal-waitlist',
      JSON.stringify([...waitlist, { email, productId: 'divine-code', date: new Date().toISOString() }])
    );
    setEmailSaved(true);
    setEmail('');
  };

  const teaserChapters = [
    {
      title: 'Chapter 1: The Foundation of Divine Energy',
      preview: 'Discover the ancient principles that underpin divine energy and how they apply to modern spirituality. Understand the relationship between spiritual frequencies and cell healing.'
    },
    {
      title: 'Chapter 2: The 7 Sacred Frequencies',
      preview: 'Learn the specific frequencies that unlock different aspects of spiritual awakening. Explores how Solfeggio scales connect directly to human DNA alignment.'
    },
    {
      title: 'Chapter 3: Practical Applications',
      preview: 'Step-by-step guide to integrating divine energy into your daily life. Learn fasts, consecrations, and sound schedules for morning and evening.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl rounded-3xl glass-effect border border-white/10 overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-spiritual-gold/20 to-spiritual-indigo/20 p-6 border-b border-white/5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-serif font-bold text-slate-100 mb-1">
              The Divine Energy Code
            </h2>
            <p className="text-xs text-slate-400">Releasing July 7, 2026</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Countdown Grid */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Launch Countdown</span>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-spiritual-indigo/20 p-3 rounded-xl border border-white/5">
                <span className="block text-2xl font-bold text-slate-100">{timeLeft.days}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">Days</span>
              </div>
              <div className="bg-spiritual-indigo/20 p-3 rounded-xl border border-white/5">
                <span className="block text-2xl font-bold text-slate-100">{timeLeft.hours}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">Hours</span>
              </div>
              <div className="bg-spiritual-indigo/20 p-3 rounded-xl border border-white/5">
                <span className="block text-2xl font-bold text-slate-100">{timeLeft.minutes}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">Mins</span>
              </div>
              <div className="bg-spiritual-indigo/20 p-3 rounded-xl border border-white/5">
                <span className="block text-2xl font-bold text-slate-100">{timeLeft.seconds}</span>
                <span className="text-[9px] text-slate-500 uppercase tracking-widest">Secs</span>
              </div>
            </div>
          </div>

          {/* Waitlist Form */}
          <div className="p-4 rounded-2xl bg-spiritual-indigo/10 border border-white/5">
            {emailSaved ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/25">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Subscribed! We will notify you the moment the code launches.</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <p className="text-xs text-slate-350 leading-relaxed">
                  Join the exclusive waitlist to receive private launching codes and early-bird discounts.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your best email"
                    className="flex-1 px-3 py-2 rounded-xl bg-spiritual-dark/40 border border-white/5 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-spiritual-gold/40"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl gold-bg-gradient text-slate-900 text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Join Waitlist</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button
              onClick={() => setSelectedTab('audio')}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 ${
                selectedTab === 'audio'
                  ? 'border-spiritual-gold text-spiritual-gold bg-white/[0.02]'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.01]'
              }`}
            >
              <Music className="w-4 h-4" />
              Audio Preview
            </button>
            <button
              onClick={() => setSelectedTab('content')}
              className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border-b-2 ${
                selectedTab === 'content'
                  ? 'border-spiritual-gold text-spiritual-gold bg-white/[0.02]'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.01]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Content Teaser
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {selectedTab === 'audio' ? (
              <div className="space-y-4">
                <div className="bg-spiritual-indigo/10 rounded-2xl p-6 text-center border border-white/5">
                  <Music className="w-10 h-10 text-spiritual-gold mx-auto mb-3" />
                  <h4 className="font-bold text-slate-200 text-sm mb-1">Transformative Audio Teaser</h4>
                  <p className="text-xs text-slate-400 mb-4 max-w-sm mx-auto">
                    Experience 30 seconds of pure 528Hz transformational frequency generated in real-time.
                  </p>
                  <button
                    onClick={handlePlayPreview}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl gold-bg-gradient text-slate-900 text-xs font-bold hover:scale-[1.01] active:scale-95 transition-all shadow-[0_4px_15px_rgba(199,167,92,0.2)]"
                  >
                    {isCurrentPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-900" />}
                    <span>{isCurrentPlaying ? 'Pause Teaser' : 'Play Teaser (528 Hz)'}</span>
                  </button>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/10 rounded-xl p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-200 leading-relaxed">
                    <strong>Exclusive Preview:</strong> The final release features full sequential solfeggio scales with binaural ambient waves and dynamic voice guides.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {teaserChapters.map((chapter, idx) => (
                  <div key={idx} className="border border-white/5 rounded-xl p-4 bg-white/[0.01] hover:border-spiritual-gold/20 transition-all">
                    <h5 className="font-serif font-bold text-sm text-slate-250 mb-1">{chapter.title}</h5>
                    <p className="text-xs text-slate-405 leading-relaxed">{chapter.preview}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-spiritual-dark/50 border-t border-white/5 p-4 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-350 text-xs font-bold hover:bg-white/10 transition-colors"
          >
            Close Teaser
          </button>
        </div>
      </div>
    </div>
  );
};
