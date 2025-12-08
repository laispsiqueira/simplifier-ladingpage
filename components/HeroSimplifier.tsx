import React from 'react';

export const HeroSimplifier: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      {/* Background Elements for "Respiro" */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 skew-x-12 translate-x-20 z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <span className="text-brand-orange font-semibold tracking-wider text-sm uppercase mb-4 block">
            Inteligência Operacional
          </span>
          <h1 className="text-5xl md:text-7xl font-sans font-medium text-slate-900 tracking-tight leading-tight mb-8">
            Tecnologia feita para simplificar<span className="text-brand-orange">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-light leading-relaxed mb-12 max-w-2xl">
            Menos complexidade, mais clareza para decidir melhor.
          </p>
          
          <div className="flex items-center gap-4 text-sm font-medium text-simplifier-teal">
            <span className="w-8 h-[1px] bg-brand-orange"></span>
            <span>Conheça nosso ecossistema</span>
          </div>
        </div>
      </div>
    </section>
  );
};