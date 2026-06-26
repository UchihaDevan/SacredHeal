import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { AudioPlayer } from '../audio/AudioPlayer';
import { SupportModal } from '../modals/SupportModal';
import { ChatWidget } from '../chat/ChatWidget';
import { DetailsModal } from '../modals/DetailsModal';
import type { Product } from '../../types';

export const RootLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const location = useLocation();

  const isOnChatPage = location.pathname === '/chat';

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="flex flex-col min-h-screen bg-spiritual-dark text-slate-100">
      <div className="flex flex-1 relative">
        {/* Navigation Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSupportOpen={() => setIsSupportOpen(true)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <Header 
            onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
            onSupportOpen={() => setIsSupportOpen(true)}
          />

          {/* Dynamic Content with Scroll */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-32">
            <div className="max-w-6xl mx-auto space-y-8">
              <Outlet context={{ onOpenDetails: handleOpenDetails }} />
            </div>
          </main>
        </div>
      </div>

      {/* Floating Chat Button */}
      {!isOnChatPage && <ChatWidget />}

      {/* Persistent Audio Player fixed at Bottom */}
      <footer className="fixed bottom-0 left-0 right-0 z-30">
        <AudioPlayer />
      </footer>

      {/* Technical Support Modal */}
      {isSupportOpen && <SupportModal onClose={() => setIsSupportOpen(false)} />}

      {/* Global Product Details Modal */}
      {selectedProduct && (
        <DetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
