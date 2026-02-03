
import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSimplifier } from './components/HeroSimplifier';
import { ProductShowcase } from './components/ProductShowcase';
import { ValueProposition } from './components/ValueProposition';
import { Footer } from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * App.tsx
 * Componente principal da Landing Page Estática.
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main>
          <HeroSimplifier />
          <ValueProposition />
          <ProductShowcase />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;