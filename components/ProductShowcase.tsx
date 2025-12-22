import React from 'react';
import { Check, Heart, Brain } from 'lucide-react';

interface ProductShowcaseProps {
  onStartApp?: () => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onStartApp }) => {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-16">
           <h2 className="text-3xl font-medium text-simplifier-dark mb-4">
            Nossos Produtos
           </h2>
           <p className="text-slate-500 max-w-xl">
             Aplicamos nossa metodologia proprietária em verticais específicas para garantir resultados extraordinários.
           </p>
        </div>

        {/* Product Card - The main visual example from the brand book */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2 min-h-[600px]">
          
          {/* Visual Side (Emotional) */}
          <div className="bg-casar-chocolate relative p-12 flex flex-col justify-between text-white">
            {/* Background Texture/Image Overlay */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/800/1200')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-casar-chocolate via-casar-chocolate/80 to-transparent"></div>
            
            <div className="relative z-10">
              {/* Product Logo - Casar Inteligente */}
              <div className="mb-2">
                 <svg width="220" height="80" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Casar Inteligente Logo">
                   <text x="0" y="40" fontFamily="Inter, sans-serif" fontWeight="300" fontSize="48" letterSpacing="-0.02em" fill="#FFFFFF">
                     Casar
                   </text>
                   <text x="0" y="75" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="32" letterSpacing="-0.02em" fill="#FFFFFF">
                     Inteligente
                   </text>
                 </svg>
                <span className="text-xs font-light tracking-widest opacity-80 mt-3 block uppercase">by Simplifier</span>
              </div>
            </div>

            <div className="relative z-10 mt-12 md:mt-0">
               <div className="w-12 h-1 bg-brand-orange mb-6"></div>
               <p className="text-lg md:text-xl font-light text-white/90 leading-relaxed mb-8">
                 Tiramos o peso emocional e decisório do planejamento. Um casamento organizado com elegância, empatia e segurança.
               </p>
               
               <div className="flex flex-col gap-3">
                 <div className="flex items-center gap-3">
                   <div className="p-1 rounded-full border border-white/20">
                     <Heart size={14} className="text-brand-orange" />
                   </div>
                   <span className="text-sm font-light">Gestão emocional aplicada</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="p-1 rounded-full border border-white/20">
                     <Brain size={14} className="text-brand-orange" />
                   </div>
                   <span className="text-sm font-light">Método Simplifier de organização</span>
                 </div>
               </div>
            </div>
          </div>

          {/* Functional Side (Operational/White) */}
          <div className="bg-white p-12 flex flex-col justify-center border-y border-r border-slate-100">
            <div className="mb-8">
              <span className="text-brand-orange font-bold text-xs tracking-wider uppercase mb-2 block">
                O Casamento
              </span>
              <h4 className="text-3xl font-medium text-casar-medium mb-4">
                Inteligência para um dos dias mais importantes da vida.
              </h4>
              <p className="text-slate-600 font-light leading-relaxed">
                Você não precisa dar conta de tudo sozinha. O <strong>Casar Inteligente</strong> combina a tecnologia da Simplifier com uma curadoria humana especializada.
              </p>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Cronograma automatizado e inteligente",
                "Curadoria de fornecedores verificados",
                "Gestão financeira sem surpresas",
                "Suporte emocional durante a jornada"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check size={20} className="text-brand-orange shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={onStartApp}
              className="bg-brand-orange text-white text-lg font-medium py-4 px-8 rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl w-full md:w-auto self-start text-center"
            >
              Conhecer o Casar Inteligente
            </button>
            
            <p className="mt-4 text-xs text-slate-400">
              Parte do ecossistema Simplifier
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
