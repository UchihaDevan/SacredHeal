import React, { useState } from 'react';
import { Search, Sun, Moon, Bell, Menu } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { SearchOverlay } from '../modals/SearchOverlay';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { preferences, updatePreferences } = useUserStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleTheme = () => {
    updatePreferences({
      theme: preferences.theme === 'dark' ? 'light' : 'dark',
    });
    // Atualiza a classe dark na tag html para o Tailwind
    if (preferences.theme === 'dark') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-effect border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Menu Hambúrguer para Telas Menores */}
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-white/5 md:hidden text-slate-300 hover:text-white transition-colors"
            aria-label="Abrir menu"
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
            className="w-full flex items-center gap-3 px-4 py-2 rounded-full bg-spiritual-indigo/40 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-spiritual-gold/30 transition-all text-left text-sm"
          >
            <Search className="w-4 h-4 text-spiritual-gold" />
            <span>Buscar frequências, orações, versículos...</span>
            <span className="ml-auto text-xs bg-white/10 px-2 py-0.5 rounded text-slate-400">/</span>
          </button>
        </div>

        {/* Ações do Header */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Botão de Busca Mobile */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Tema Claro/Escuro */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-white/5 text-slate-300 hover:text-white transition-colors"
            title={preferences.theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
          >
            {preferences.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
          </button>

          {/* Notificações */}
          <button
            onClick={() => updatePreferences({ notifications: !preferences.notifications })}
            className={`p-2 rounded-full hover:bg-white/5 transition-colors relative ${
              preferences.notifications ? 'text-slate-300 hover:text-white' : 'text-slate-500'
            }`}
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            {preferences.notifications && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-spiritual-gold animate-pulse" />
            )}
          </button>

          {/* Avatar / Perfil rápido */}
          <div className="w-8 h-8 rounded-full border border-spiritual-gold/30 overflow-hidden bg-spiritual-indigo/80 flex items-center justify-center">
            <span className="text-xs font-bold text-spiritual-gold">SH</span>
          </div>
        </div>
      </header>

      {/* Overlay de busca global */}
      {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
    </>
  );
};
