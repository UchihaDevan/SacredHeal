import React from 'react';
import { Home, Radio, Sparkles, Gift, MessageSquare, Award, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  onSupportOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpen,
  onClose,
  onSupportOpen
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'main', label: 'Frequencies Vault', icon: Radio },
    { id: 'premium', label: 'Premium Sintonizations', icon: Sparkles },
    { id: 'bonus', label: 'Bonus & Prayers', icon: Gift },
    { id: 'chat', label: 'Pastor Caleb', icon: MessageSquare },
    { id: 'challenge', label: 'Sacred Challenge', icon: Award },
  ];

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId);
    onClose(); // Fecha no mobile
  };

  return (
    <>
      {/* Overlay de fundo para fechar a sidebar no mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-45 w-64 h-screen bg-slate-100 dark:bg-spiritual-navy border-r border-slate-200 dark:border-white/5 p-6 flex flex-col justify-between transition-all duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Header da Sidebar no Mobile */}
          <div className="flex items-center justify-between md:hidden">
            <span className="text-xl font-bold font-serif gold-text-gradient">Menu</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Atalho de Frase Inspiradora no topo do menu */}
          <div className="hidden md:block p-4 rounded-xl bg-slate-200/50 dark:bg-spiritual-indigo/30 border border-slate-300/30 dark:border-white/5">
            <p className="text-[11px] text-slate-600 dark:text-slate-400 italic text-center">
              "Faith is the assurance of things hoped for, the conviction of things not seen."
            </p>
          </div>

          {/* Links de Navegação */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-spiritual-gold/10 text-spiritual-gold border border-spiritual-gold/20 shadow-[0_0_15px_rgba(199,167,92,0.05)]'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-spiritual-gold' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Botão de Suporte Técnico */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/5">
          <button
            onClick={() => {
              onSupportOpen();
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-all border border-transparent"
          >
            <HelpCircle className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            <span>Technical Support</span>
          </button>
        </div>
      </aside>
    </>
  );
};
