import React from 'react';
import { Layers, Zap, Shield } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium text-simplifier-dark mb-6">
            O DNA Compartilhado
          </h2>
          <p className="text-lg text-slate-600 font-light">
            Mesmo em universos diferentes, nossa regra é única: o laranja representa o ponto de inteligência. Onde ele aparece, existe método e clareza.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-simplifier-teal/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
              <Layers className="text-simplifier-teal group-hover:text-brand-orange transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-simplifier-dark mb-3">Unidade Visual</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              O branco puro e o azul teal trazem a segurança tecnológica, enquanto o laranja destaca o que realmente importa: a ação inteligente.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-simplifier-teal/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
              <Zap className="text-simplifier-teal group-hover:text-brand-orange transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-simplifier-dark mb-3">Clareza Radical</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Eliminamos o ruído. Tipografia moderna, espaços em branco (respiro) e grids organizados para que sua mente descanse enquanto resolvemos o complexo.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="w-12 h-12 bg-simplifier-teal/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-orange/10 transition-colors">
              <Shield className="text-simplifier-teal group-hover:text-brand-orange transition-colors" />
            </div>
            <h3 className="text-xl font-medium text-simplifier-dark mb-3">Segurança e Empatia</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              A tecnologia da Simplifier garante a execução. A elegância do Casar Inteligente garante o acolhimento. Uma arquitetura de marca feita para servir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};