import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OffersSection from './components/OffersSection';
import CarRentalSection from './components/CarRentalSection';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminPanel from './components/admin/AdminPanel'; // Import Admin
import { MOCK_PACKAGES } from './constants';
import { TravelPackage } from './types';
import { subscribeToAuthChanges, logoutUser } from './services/authService';
import { User } from 'firebase/auth';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [displayedPackages, setDisplayedPackages] = useState<TravelPackage[]>(MOCK_PACKAGES);
  
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  // View State (Client vs Admin)
  const [currentView, setCurrentView] = useState<'client' | 'admin'>('client');

  // Initialize Theme based on preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Auth Subscription
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoginModalOpen(false);
      } else {
        // If logged out, force client view
        setCurrentView('client');
      }
    });
    return () => unsubscribe();
  }, []);

  // Update HTML class for Tailwind Dark Mode
  useEffect(() => {
    const html = document.querySelector('html');
    if (isDarkMode) {
      html?.classList.add('dark');
    } else {
      html?.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSearchResults = (results: TravelPackage[]) => {
    setDisplayedPackages(results);
    document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- Render ---

  if (currentView === 'admin' && user) {
      return (
          <div className="font-sans antialiased text-gray-900 dark:text-gray-100">
             <AdminPanel onExit={() => setCurrentView('client')} />
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased relative">
      <Header 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={logoutUser}
        onAdminClick={() => setCurrentView('admin')}
      />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />

      <main className="flex-grow">
        <Hero onSearchResults={handleSearchResults} />
        
        {/* Floating overlap correction from Hero */}
        <div className="-mt-16 relative z-0" id="offers-section">
          {/* Spacer to push content below the floating search box on mobile/desktop appropriately */}
          <div className="h-20 lg:h-0"></div> 
        </div>

        <OffersSection 
          title="Pacotes em Destaque" 
          packages={displayedPackages} 
          isDarkMode={isDarkMode}
        />
        
        <CarRentalSection />

        <div className="bg-white dark:bg-slate-900 py-12 border-t border-gray-100 dark:border-slate-800">
           <div className="container mx-auto px-4">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Explore por Região</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {['América do Sul', 'Europa', 'América do Norte', 'Caribe', 'Nordeste', 'Sul', 'Sudeste', 'Centro-Oeste'].map(region => (
                 <a key={region} href="#" className="block p-4 bg-gray-50 dark:bg-slate-800 hover:bg-cvc-yellow hover:text-cvc-blue dark:hover:text-cvc-blue dark:text-white rounded-lg text-center font-medium transition-colors">
                   {region}
                 </a>
               ))}
             </div>
           </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
};

export default App;