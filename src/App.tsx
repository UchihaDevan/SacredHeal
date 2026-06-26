import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Home } from './pages/Home';
import { MainContent } from './pages/MainContent';
import { Premium } from './pages/Premium';
import { Bonus } from './pages/Bonus';
import { ChatPastor } from './pages/ChatPastor';
import { SacredChallenge } from './pages/SacredChallenge';
import { ProsperityExperience } from './pages/ProsperityExperience';
import { MentalExperience } from './pages/MentalExperience';
import { AcceleratorExperience } from './pages/AcceleratorExperience';
import { TurboExperience } from './pages/TurboExperience';
import { SanctuaryExperience } from './pages/SanctuaryExperience';
import { useUserStore } from './store/userStore';

function App() {
  const { preferences } = useUserStore();

  // Apply dark/light theme globally based on preferences
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/frequencies" element={<MainContent />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/bonus" element={<Bonus />} />
          <Route path="/chat" element={<ChatPastor />} />
          <Route path="/challenge" element={<SacredChallenge />} />
          {/* Experience pages */}
          <Route path="/experience/prosperity" element={<ProsperityExperience />} />
          <Route path="/experience/mental" element={<MentalExperience />} />
          <Route path="/experience/accelerator" element={<AcceleratorExperience />} />
          <Route path="/experience/turbo" element={<TurboExperience />} />
          <Route path="/experience/sanctuary" element={<SanctuaryExperience />} />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
