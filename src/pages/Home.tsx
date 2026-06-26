import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Award,
  Heart,
  Copy,
  Check,
  Users,
  Music,
  Zap,
  Trophy,
  MessageSquare,
  Volume2,
  VolumeX
} from 'lucide-react';
import { dailyVerses } from '../data/biblicalVerses';
import { products } from '../data/products';
import { ProductCard } from '../components/cards/ProductCard';
import { useUserStore } from '../store/userStore';
import { useChallengeStore } from '../store/challengeStore';
import { useLayoutContext } from '../hooks/useLayoutContext';

// --- SUB-COMPONENTS ---

// 1. HeroSection Component
interface HeroSectionProps {
  onScrollToBenefits: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToBenefits }) => {
  const navigate = useNavigate();

  return (
    <div className="relative -mx-6 -mt-6 mb-8 overflow-hidden rounded-b-[2.5rem] border-b border-white/5 shadow-2xl">
      {/* Background visual graphics */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-spiritual-indigo/40 to-slate-950" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-spiritual-gold/5 blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-spiritual-indigo/10 blur-[120px] -ml-48 -mb-48 pointer-events-none" />

      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-spiritual-gold/20 via-transparent to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-spiritual-gold/15 border border-spiritual-gold/30 text-spiritual-gold text-[10px] font-semibold uppercase tracking-widest mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Vibrational Spiritual Sanctuary</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-100 leading-[1.1] mb-6 max-w-4xl tracking-tight">
          Your Journey of <br />
          <span className="gold-text-gradient font-serif font-bold">Healing & Faith</span>
        </h1>

        <p className="text-slate-300 text-sm md:text-lg max-w-2xl leading-relaxed mb-8">
          Transform your spiritual life. Align your mind with the frequencies of the Creator, meditate on the scriptures, and strengthen your faith with daily habits.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
          <button
            onClick={() => navigate('/frequencies')}
            className="flex-1 px-8 py-3.5 rounded-xl gold-bg-gradient text-slate-900 font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_20px_rgba(199,167,92,0.3)] cursor-pointer text-center"
          >
            Explore Frequencies
          </button>
          <button
            onClick={onScrollToBenefits}
            className="flex-1 px-8 py-3.5 rounded-xl border border-spiritual-gold/40 text-spiritual-gold font-bold hover:bg-spiritual-gold/10 hover:border-spiritual-gold transition-all cursor-pointer text-center"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. StatsSection Component
const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Faithful Seekers', value: '50K+', icon: Users },
    { label: 'Healing Frequencies', value: '16', icon: Music },
    { label: 'Daily Devotionals', value: '365+', icon: BookOpen },
    { label: 'Sessions Completed', value: '1M+', icon: Heart }
  ];

  return (
    <div 
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl glass-effect border border-white/5 shadow-xl relative overflow-hidden"
      role="region"
      aria-label="Application statistics summary"
    >
      <div className="absolute -right-24 -top-24 w-48 h-48 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div key={i} className="text-center p-4 border-r border-white/5 last:border-r-0 max-lg:nth-child-2n:border-r-0">
            <div className="w-10 h-10 rounded-full bg-spiritual-gold/10 flex items-center justify-center mx-auto mb-3">
              <Icon className="w-5 h-5 text-spiritual-gold" />
            </div>
            <p className="text-2xl md:text-3xl font-serif font-bold gold-text-gradient">{stat.value}</p>
            <p className="text-[10px] md:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
          </div>
        );
      })}
    </div>
  );
};

// 3. BenefitsSection Component
const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Sacred Frequencies',
      description: 'Tune into 16 pure solfeggio oscillator frequencies generated client-side for cellular and spiritual regeneration.'
    },
    {
      icon: BookOpen,
      title: 'Biblical Wisdom',
      description: 'Strengthen your soul with custom daily verses, pastoral reflections, and booklets of anointed prayers.'
    },
    {
      icon: MessageSquare,
      title: 'Spiritual Counseling',
      description: 'Connect with Pastor Caleb for private, real-time chat guidance rooted in holy scriptures.'
    },
    {
      icon: Trophy,
      title: 'Consecration Habits',
      description: 'Engage in streak challenges, log daily devotionals, and light up your progress calendar.'
    }
  ];

  return (
    <section className="py-8" aria-labelledby="benefits-heading">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 id="benefits-heading" className="text-3xl font-serif font-bold text-slate-100">
          Transform Your Spiritual Journey
        </h2>
        <div className="w-16 h-0.5 bg-spiritual-gold mx-auto mt-3" />
        <p className="text-sm text-slate-400 mt-3 leading-relaxed">
          Sacred Heal combines ancient biblical principles with sound alignment technology to nurture your spirit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, idx) => {
          const Icon = benefit.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-effect border border-white/5 hover:border-spiritual-gold/20 hover:scale-[1.01] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-spiritual-gold/15 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-spiritual-gold" />
              </div>
              <h3 className="font-serif font-bold text-slate-100 text-lg mb-2">{benefit.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};


// 5. NewsletterSection Component
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      // Save subscription in localStorage to mock backend
      const existing = localStorage.getItem('newsletter_subscribers');
      const list = existing ? JSON.parse(existing) : [];
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem('newsletter_subscribers', JSON.stringify(list));
      }
    } catch (err) {
      console.error('Newsletter save error:', err);
    }

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section 
      className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-spiritual-indigo/25 via-slate-900 to-spiritual-gold/10 border border-white/5 shadow-xl relative overflow-hidden"
      aria-labelledby="newsletter-heading"
    >
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-spiritual-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-spiritual-indigo/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-xl">
        <h2 id="newsletter-heading" className="text-2xl font-serif font-bold text-slate-100 mb-2">
          Stay Connected in Faith
        </h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          Subscribe to receive weekly spiritual insights, new Solfeggio studies, and direct notifications for daily prayer events.
        </p>

        {subscribed ? (
          <div className="p-4 rounded-xl bg-spiritual-gold/15 border border-spiritual-gold/30 text-spiritual-gold text-xs font-semibold flex items-center gap-2 animate-in fade-in zoom-in duration-300">
            <Check className="w-4 h-4 text-spiritual-gold" />
            <span>Blessings! You have successfully subscribed to the newsletter.</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-slate-200 placeholder-slate-500 text-xs outline-none focus:border-spiritual-gold/40 transition-colors"
              required
              aria-label="Email address for newsletter"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl gold-bg-gradient text-slate-900 font-bold text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_4px_12px_rgba(199,167,92,0.2)] cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

// --- MAIN HOME COMPONENT ---

export const Home: React.FC = () => {
  const { onOpenDetails } = useLayoutContext();
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite } = useUserStore();
  const challenges = useChallengeStore((state) => state.challenges);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Dynamic verse calculation
  const dayOfMonth = new Date().getDate();
  const verseIndex = dayOfMonth % dailyVerses.length;
  const currentVerse = dailyVerses[verseIndex];

  const isVerseFavorite = favorites.includes(currentVerse.id);

  // Text-To-Speech lifecycle & controls
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayVerse = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // Cancel any current utterances
      
      const utterance = new SpeechSynthesisUtterance(currentVerse.verse);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // Slightly slower, majestic pace

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

  const handleScrollToBenefits = () => {
    const element = document.getElementById('benefits-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Recommendations: Dynamic selection based on the hour of the day
  const getRecommendedProductIds = (): string[] => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      // Morning (6 AM - 12 PM): Energy, Vault, Prosperity, Celestial Archangels
      return ['healing-vault', 'prosperity-frequencies', 'archangel-frequencies'];
    } else if (hour >= 12 && hour < 18) {
      // Afternoon (12 PM - 6 PM): Focus, sequencing, acceleration
      return ['mental-frequencies', 'divine-accelerator', 'turbo-session'];
    } else {
      // Night (6 PM - 6 AM): Relaxation sanctuary, pastor chat, daily verses
      return ['sanctuary-healing', 'chat-pastor', 'daily-verses'];
    }
  };

  const recommendedIds = getRecommendedProductIds();
  const featuredProducts = recommendedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is typeof products[0] => !!p);

  const activeChallenge = challenges.find((c) => c.startDate && !c.completed);

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-12">
      {/* 1. Hero Banner */}
      <HeroSection onScrollToBenefits={handleScrollToBenefits} />

      {/* 2. Stats Section */}
      <StatsSection />

      {/* 3. Benefits Section */}
      <div id="benefits-section" className="scroll-mt-6">
        <BenefitsSection />
      </div>

      {/* 4. Main Grid: Daily Verse of the Day & Active Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Widget: Verse of the Day */}
        <section 
          role="region" 
          aria-label="Daily Verse of the Day"
          className="lg:col-span-2 relative rounded-3xl glass-effect p-6 md:p-8 flex flex-col justify-between overflow-hidden border border-white/5 shadow-xl"
        >
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-spiritual-gold/5 blur-3xl pointer-events-none" />
          
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-spiritual-gold" />
              <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                Daily Nourishment • Verse of the Day
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
              <span className="font-semibold text-slate-300">Pastoral Reflection:</span> {currentVerse.interpretation}
            </p>
          </div>

          {/* Verse Actions */}
          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-white/5">
            <button
              onClick={handleFavoriteVerse}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${
                isVerseFavorite ? 'text-rose-400' : 'text-slate-400'
              }`}
              aria-label={isVerseFavorite ? 'Remove verse from favorites' : 'Save verse to favorites'}
            >
              <Heart className={`w-4 h-4 ${isVerseFavorite ? 'fill-rose-500' : ''}`} />
              <span>{isVerseFavorite ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleCopyVerse}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              aria-label="Copy verse text to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              onClick={handlePlayVerse}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-white/5 hover:bg-white/10 transition-colors cursor-pointer ${
                isSpeaking ? 'text-spiritual-gold bg-spiritual-gold/10' : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={isSpeaking ? 'Stop reading verse aloud' : 'Read verse aloud'}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 animate-pulse text-spiritual-gold" />
                  <span className="text-spiritual-gold">Stop</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Listen</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Widget: Sacred Challenge Status */}
        <section 
          role="region" 
          aria-label="Active Sacred Challenge Status"
          className="rounded-3xl glass-effect p-6 flex flex-col justify-between border border-white/5 shadow-xl relative overflow-hidden"
        >
          <div className="absolute right-0 bottom-0 -mb-16 -mr-16 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-6">
              <Award className="w-5 h-5 text-spiritual-gold" />
              <span className="text-xs font-semibold text-spiritual-gold uppercase tracking-wider">
                Active Sacred Challenge
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
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Days streak</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Total progress</span>
                    <span className="font-bold text-slate-200">
                      {activeChallenge.completedDays} / {activeChallenge.duration} days
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden" role="progressbar" aria-valuenow={(activeChallenge.completedDays / activeChallenge.duration) * 100} aria-valuemin={0} aria-valuemax={100}>
                    <div
                      className="h-full gold-bg-gradient rounded-full transition-all duration-500"
                      style={{ width: `${(activeChallenge.completedDays / activeChallenge.duration) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => navigate('/challenge')}
                  className="w-full mt-2 py-2 px-4 rounded-xl text-xs font-bold bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/30 hover:bg-spiritual-gold hover:text-slate-900 transition-all cursor-pointer text-center block"
                >
                  Go to Challenge
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  You do not have any active spiritual challenge at the moment. Create a daily habit of consecration and track your streaks.
                </p>
                <button
                  onClick={() => navigate('/challenge')}
                  className="px-4 py-2 rounded-full text-xs font-bold bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/30 hover:bg-spiritual-gold hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Start Challenge
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Your spiritual status:</span>
            <span className="font-bold text-spiritual-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3 animate-pulse" /> Consecrated
            </span>
          </div>
        </section>
      </div>

      {/* 5. Dynamic Featured Recommendations */}
      <section className="space-y-4" aria-labelledby="recommendations-heading">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="recommendations-heading" className="text-xl md:text-2xl font-serif font-bold text-slate-100">
              Recommended for You
            </h2>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-semibold text-spiritual-gold">
              {new Date().getHours() >= 6 && new Date().getHours() < 12 ? '☀️ Morning Energy & Abundance' : 
               new Date().getHours() >= 12 && new Date().getHours() < 18 ? '⚡ Afternoon Focus & Alignment' : 
               '🌙 Night Relaxation & Counsel'}
            </p>
          </div>
          <button
            onClick={() => navigate('/frequencies')}
            className="text-xs font-bold text-spiritual-gold hover:underline cursor-pointer"
          >
            View All Frequencies
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenDetails={onOpenDetails}
            />
          ))}
        </div>
      </section>

      {/* 6. Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
};
