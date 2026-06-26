import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Radio, Sparkles, Gift, MessageSquare, Award, HelpCircle, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSupportOpen: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onSupportOpen
}) => {
  const menuItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/frequencies', label: 'Frequencies Vault', icon: Radio },
    { path: '/premium', label: 'Premium Sintonizations', icon: Sparkles },
    { path: '/bonus', label: 'Bonus & Prayers', icon: Gift },
    { path: '/chat', label: 'Pastor Caleb', icon: MessageSquare },
    { path: '/challenge', label: 'Sacred Challenge', icon: Award },
  ];

  return (
    <>
      {/* Background overlay to close sidebar on mobile */}
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
          {/* Mobile Sidebar Header */}
          <div className="flex items-center justify-between md:hidden">
            <span className="text-xl font-bold font-serif gold-text-gradient">Menu</span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Inspirational Quote Shortcut */}
          <div className="hidden md:block p-4 rounded-xl bg-slate-200/50 dark:bg-spiritual-indigo/30 border border-slate-300/30 dark:border-white/5">
            <p className="text-[11px] text-slate-600 dark:text-slate-400 italic text-center">
              "Faith is the assurance of things hoped for, the conviction of things not seen."
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-spiritual-gold/10 text-spiritual-gold border border-spiritual-gold/20 shadow-[0_0_15px_rgba(199,167,92,0.05)]'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-spiritual-gold' : 'text-slate-500 dark:text-slate-400'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Technical Support Button */}
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
