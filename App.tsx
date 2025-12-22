import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSimplifier } from './components/HeroSimplifier';
import { ProductShowcase } from './components/ProductShowcase';
// import { ValueProposition } from './components/ValueProposition';
import { Footer } from './components/Footer';
import { CasarInteligenteApp } from './components/CasarInteligenteApp';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  const handleStartApp = () => {
    setCurrentView('app');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
    window.scrollTo(0, 0);
  };

  const content = currentView === 'app' 
    ? <CasarInteligenteApp onBack={handleBackToHome} />
    : (
      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main>
          {/* Marca Mãe: Introdução Institucional */}
          <HeroSimplifier />
          
          {/* Produto: Casar Inteligente */}
          <ProductShowcase onStartApp={handleStartApp} />
          
          {/* Lógica: O elo entre as duas inteligências */}
          {/* <ValueProposition /> */}
        </main>
        <Footer />
      </div>
    );

  return (
    <ErrorBoundary>
      {content}
    </ErrorBoundary>
  );
};

export default App;
