import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import CreatorPage from './pages/CreatorPage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import CreateContentPage from './pages/CreateContentPage';
import ContentDetailsPage from './pages/ContentDetailsPage';

// Context
import { WalletProvider } from './context/WalletContext';
import { AlertProvider } from './context/AlertContext';

function App() {
  return (
    <AlertProvider>
      <WalletProvider>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="creator/:id" element={<CreatorPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="create" element={<CreateContentPage />} />
              <Route path="content/:id" element={<ContentDetailsPage />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </WalletProvider>
    </AlertProvider>
  );
}

export default App;
