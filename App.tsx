
import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSimplifier } from './components/HeroSimplifier';
import { ProductShowcase } from './components/ProductShowcase';
import { Manifesto } from './components/Manifesto';
import { Footer } from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * App.tsx
 * Componente principal da Landing Page Institucional da Simplifier.
 */
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main>
          {/* Seção de Impacto Inicial */}
          <HeroSimplifier />
          
          {/* Manifesto: A alma e os princípios da marca (Antigo DNA Compartilhado) */}
          <Manifesto />
          
          {/* Vitrine do Produto Casar Inteligente */}
          <ProductShowcase />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;