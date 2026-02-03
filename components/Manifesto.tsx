
import React from 'react';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifesto" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header do Manifesto */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-kyiv font-light text-simplifier-dark mb-4">
            Manifesto
          </h2>
          <div className="w-12 h-1 bg-brand-orange mb-12"></div>
          
          <div className="space-y-8 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
            <p>
              Vivemos em um mundo que ficou complexo demais sem necessidade.
              Decisões que deveriam ser claras se transformaram em labirintos de opções, informações desencontradas e desgaste emocional.
            </p>
            <p>
              Nós acreditamos que tecnologia não existe para confundir, ocupar ou cansar.
              Ela existe para devolver tempo, clareza e segurança.
            </p>
            <p className="text-simplifier-teal font-medium">
              A Simplifier nasce desse princípio.
            </p>
            <p>
              Criamos soluções que automatizam o que pode — e devem — ser automatizado, e preservam o que precisa continuar humano. Não acreditamos em atalhos milagrosos, nem em sistemas genéricos que ignoram a realidade de quem está do outro lado.
            </p>
            
            <div className="py-4">
              <p className="mb-4">Somos bons no que fazemos porque entendemos limites:</p>
              <ul className="space-y-1 border-l-2 border-slate-100 pl-6 italic">
                <li>Limite de tempo.</li>
                <li>Limite de orçamento.</li>
                <li>Limite emocional.</li>
                <li>Limite operacional.</li>
              </ul>
            </div>

            <p>
              É a partir desses limites que desenhamos soluções simples, inteligentes e sustentáveis.
            </p>
            <p>
              Unimos tecnologia, método e curadoria especializada para transformar cenários complexos em decisões claras, organizadas e seguras — sem ruído, sem pressão, sem promessas vazias.
            </p>
          </div>
        </div>

        {/* Linha Divisória Superior */}
        <div className="w-full h-[1px] bg-slate-100 my-16"></div>

        {/* Seção Nossos Princípios em Grid 2x2 */}
        <div className="mb-16">
          <span className="text-brand-orange font-semibold tracking-widest text-xs uppercase mb-10 block">
            Nossos Princípios
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Simplicidade com inteligência</h4>
              <p className="text-slate-500 font-light leading-relaxed">
                Reduzimos a complexidade sem empobrecer o processo.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Empatia operacional</h4>
              <p className="text-slate-500 font-light leading-relaxed">
                Cada solução respeita o contexto, o ritmo e a realidade de quem usa.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Curadoria especializada</h4>
              <p className="text-slate-500 font-light leading-relaxed">
                Automação com critério. Decisões melhores, com verificação humana.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-2">Transparência total</h4>
              <p className="text-slate-500 font-light leading-relaxed">
                Sem surpresas, sem letras miúdas. O que você vê é exatamente o que você tem.
              </p>
            </div>
          </div>
        </div>

        {/* Linha Divisória Inferior */}
        <div className="w-full h-[1px] bg-slate-100 my-16"></div>

        {/* Conclusão e Assinatura */}
        <div className="space-y-12">
          <div className="space-y-6 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
            <p>
              Começamos pelo casamento porque ele expõe, como poucos momentos, o impacto da desorganização, do excesso de informação e das decisões mal orientadas.
            </p>
            <p>
              Mas nossa visão vai além.
            </p>
            <p>
              Queremos simplificar grandes decisões, processos e rotinas — pessoais e profissionais — para que as pessoas possam focar no que realmente importa.
            </p>
          </div>
          
          <div className="pt-12 text-center">
            <div className="inline-block text-2xl md:text-3xl font-kyiv font-light text-slate-700 tracking-tight leading-tight">
              <p>Menos complexidade.</p>
              <p>Mais clareza.</p>
              <p>Decisões melhores.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
