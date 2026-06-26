import React, { useState, useEffect, useRef } from 'react';
import { Search, Sun, Moon, Bell, Menu, Settings, HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { SearchOverlay } from '../modals/SearchOverlay';

interface HeaderProps {
  onMenuToggle: () => void;
  onSupportOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle, onSupportOpen }) => {
  const { preferences, updatePreferences } = useUserStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextTheme = preferences.theme === 'dark' ? 'light' : 'dark';
    updatePreferences({ theme: nextTheme });
    
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const toggleNotifications = () => {
    updatePreferences({ notifications: !preferences.notifications });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-effect border-b border-slate-200 dark:border-white/5 px-4 md:px-8 py-4 flex items-center justify-between transition-colors duration-300">
        <div className="flex items-center gap-3">
          {/* Menu Hambúrguer para Telas Menores */}
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 md:hidden text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold font-serif gold-text-gradient tracking-wide">
              Sacred Heal
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-spiritual-gold/20 text-spiritual-gold border border-spiritual-gold/30">
              v2.0
            </span>
          </div>
        </div>

        {/* Barra de Busca (Desktop / Abre Overlay no Clique) */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-full bg-slate-200/50 dark:bg-spiritual-indigo/40 border border-slate-300/30 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:border-spiritual-gold/30 dark:hover:border-spiritual-gold/30 transition-all text-left text-sm cursor-pointer"
          >
            <Search className="w-4 h-4 text-spiritual-gold" />
            <span>Search frequencies, prayers, verses...</span>
            <span className="ml-auto text-xs bg-black/10 dark:bg-white/10 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">/</span>
          </button>
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
          {/* Botão de Busca Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Avatar / Perfil rápido clicável */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1.5 p-1 rounded-full border border-slate-300 dark:border-spiritual-gold/30 hover:border-spiritual-gold/60 transition-colors bg-slate-200/35 dark:bg-spiritual-indigo/40 cursor-pointer"
            aria-label="Open profile settings menu"
            aria-expanded={isProfileOpen}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-spiritual-indigo/80 flex items-center justify-center">
              <span className="text-xs font-bold text-slate-700 dark:text-spiritual-gold">SH</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500 dark:text-slate-400 hidden sm:block mr-1" />
          </button>

          {/* Dropdown de Configurações / Perfil */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl glass-effect border border-slate-200 dark:border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header do Dropdown */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-white/5 mb-3">
                <div className="w-10 h-10 rounded-full bg-spiritual-gold/10 flex items-center justify-center text-spiritual-gold font-bold">
                  SH
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 font-serif">Guest Seeker</h4>
                  <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-spiritual-gold/15 text-spiritual-gold text-[8px] font-semibold uppercase tracking-wider mt-0.5">
                    <Sparkles className="w-2 h-2" /> Consecrated
                  </div>
                </div>
              </div>

              {/* Lista de Ações / Toggles */}
              <div className="space-y-2">
                {/* Interruptor de Tema */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {preferences.theme === 'dark' ? (
                      <>
                        <Sun className="w-4 h-4 text-amber-400" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-indigo-400" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                    {preferences.theme}
                  </span>
                </button>

                {/* Interruptor de Notificações */}
                <button
                  onClick={toggleNotifications}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-spiritual-gold" />
                    <span>Notifications</span>
                  </div>
                  <div className="relative">
                    <div className={`w-8 h-4 rounded-full transition-colors duration-200 ${preferences.notifications ? 'bg-spiritual-gold/40' : 'bg-slate-400/30'}`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-slate-200 shadow-md transform transition-transform duration-200 ${preferences.notifications ? 'translate-x-4 bg-spiritual-gold' : 'translate-x-0.5'}`} />
                    </div>
                  </div>
                </button>

                {/* Idioma */}
                <button
                  onClick={() => updatePreferences({ language: preferences.language === 'en' ? 'pt' : 'en' })}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Language</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {preferences.language}
                  </span>
                </button>

                {/* Suporte Técnico */}
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    onSupportOpen();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-spiritual-gold transition-colors cursor-pointer border-t border-slate-200 dark:border-white/5 mt-1 pt-3"
                >
                  <HelpCircle className="w-4 h-4 text-spiritual-gold" />
                  <span>Technical Support</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Overlay de busca global */}
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};
