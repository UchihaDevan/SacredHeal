import { useState, useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { MainContent } from './pages/MainContent';
import { Premium } from './pages/Premium';
import { Bonus } from './pages/Bonus';
import { ChatPastor } from './pages/ChatPastor';
import { SacredChallenge } from './pages/SacredChallenge';
import { DetailsModal } from './components/modals/DetailsModal';
import type { Product } from './types';
import { useUserStore } from './store/userStore';

function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { preferences } = useUserStore();

  // Aplica o tema dark/light globalmente com base nas preferências
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme]);

  // Função para abrir o modal de detalhes do produto
  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  // Renderização dinâmica baseada na aba ativa
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onOpenDetails={handleOpenDetails} onNavigateToTab={setActiveTab} />;
      case 'main':
        return <MainContent onOpenDetails={handleOpenDetails} onNavigateToTab={setActiveTab} />;
      case 'premium':
        return <Premium onOpenDetails={handleOpenDetails} onNavigateToTab={setActiveTab} />;
      case 'bonus':
        return <Bonus onOpenDetails={handleOpenDetails} onNavigateToTab={setActiveTab} />;
      case 'chat':
        return <ChatPastor />;
      case 'challenge':
        return <SacredChallenge />;
      default:
        return <Home onOpenDetails={handleOpenDetails} onNavigateToTab={setActiveTab} />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderContent()}
      </Layout>

      {/* Modal global de Detalhes do Produto */}
      {selectedProduct && (
        <DetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onNavigateToTab={setActiveTab}
        />
      )}
    </>
  );
}

export default App;
