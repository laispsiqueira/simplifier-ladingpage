import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSimplifier } from './components/HeroSimplifier';
import { ProductShowcase } from './components/ProductShowcase';
// import { ValueProposition } from './components/ValueProposition';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-brand-orange selection:text-white">
      <Navbar />
      <main>
        {/* Marca Mãe: Introdução Institucional */}
        <HeroSimplifier />
        
        {/* Produto: Casar Inteligente */}
        <ProductShowcase />
        
        {/* Lógica: O elo entre as duas inteligências */}
        {/* <ValueProposition /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;