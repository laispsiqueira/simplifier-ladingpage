
import React from 'react';
import { Instagram, Mail, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-simplifier-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            {/* Logo Simplifier White Version com Outfit */}
            <div className="mb-6">
              <svg width="160" height="32" viewBox="0 0 160 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Simplifier Logo">
                 <text x="0" y="24" fontFamily="Outfit, sans-serif" fontWeight="500" fontSize="28" letterSpacing="-0.03em" fill="#FFFFFF">
                   simplifier
                 </text>
                 <circle cx="140" cy="20" r="3.5" fill="#D58A1F" />
               </svg>
            </div>
            
            <p className="text-simplifier-light/80 text-sm leading-relaxed mb-6">
              Automatizamos processos para devolver tempo às pessoas. Simplificando decisões complexas com inteligência prática.
            </p>
          </div>

          <div>
            <h4 className="text-brand-orange font-medium mb-6 text-sm uppercase tracking-wider">Produtos</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Casar Inteligente</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-orange font-medium mb-6 text-sm uppercase tracking-wider">Institucional</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Sobre a Simplifier</a></li>
              <li><a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-orange font-medium mb-6 text-sm uppercase tracking-wider">Contato</h4>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://www.instagram.com/simplifier.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="Instagram @simplifier.tech"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
               <a href="mailto:contato@simplifier.com.br" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-orange transition-colors" aria-label="E-mail">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm text-slate-400">
              contato@simplifier.com.br
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Simplifier Tecnologia. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};