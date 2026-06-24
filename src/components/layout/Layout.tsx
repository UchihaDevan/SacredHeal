import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AudioPlayer } from '../audio/AudioPlayer';
import { SupportModal } from '../modals/SupportModal';
import { ChatWidget } from '../chat/ChatWidget';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-spiritual-dark text-slate-100">
      <div className="flex flex-1 relative">
        {/* Barra Lateral Navegacional */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSupportOpen={() => setIsSupportOpen(true)}
        />

        {/* Área de Conteúdo Principal */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Cabeçalho superior */}
          <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Conteúdo Dinâmico com Scroll */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
            <div className="max-w-6xl mx-auto space-y-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Botão de Chat Flutuante */}
      {activeTab !== 'chat' && <ChatWidget onNavigateToTab={onTabChange} />}

      {/* Player de Áudio Fixo Persistente na Base */}
      <footer className="fixed bottom-0 left-0 right-0 z-30">
        <AudioPlayer />
      </footer>

      {/* Modal de Suporte Técnico */}
      {isSupportOpen && <SupportModal onClose={() => setIsSupportOpen(false)} />}
    </div>
  );
};
