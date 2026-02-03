
/**
 * Navbar.tsx
 * Barra de navegação responsiva.
 * Inclui o logo da Simplifier e lógica de scroll.
 */
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Simplifier com Outfit (Google Font) */}
        <div className="flex items-center gap-2">
           <svg width="160" height="32" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Simplifier Logo">
             <text x="0" y="24" fontFamily="Outfit, sans-serif" fontWeight="500" fontSize="28" letterSpacing="-0.03em" fill="#1C7C92">
               simplifier
             </text>
             <circle cx="140" cy="20" r="3.5" fill="#D58A1F" />
           </svg>
        </div>

        {/* Links de Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#manifesto" className="text-slate-600 hover:text-simplifier-teal transition-colors text-sm font-medium">Manifesto</a>
          <a href="#products" className="text-slate-600 hover:text-simplifier-teal transition-colors text-sm font-medium">Produtos</a>
          <a href="#about" className="text-slate-600 hover:text-simplifier-teal transition-colors text-sm font-medium">Sobre</a>
          <button className="bg-simplifier-teal text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-simplifier-dark transition-colors shadow-sm hover:shadow-md">
            Entrar
          </button>
        </div>

        {/* Botão do Menu Mobile */}
        <button 
          className="md:hidden text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-4 border-t border-slate-100">
          <a href="#manifesto" className="text-slate-600 text-lg">Manifesto</a>
          <a href="#products" className="text-slate-600 text-lg">Produtos</a>
          <a href="#about" className="text-slate-600 text-lg">Sobre</a>
          <button className="bg-simplifier-teal text-white px-6 py-3 rounded-lg font-medium text-center">
            Entrar
          </button>
        </div>
      )}
    </nav>
  );
};