import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI, Chat } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface CasarInteligenteAppProps {
  onBack: () => void;
}

const CLARA_SYSTEM_INSTRUCTION = `
Você é Clara, uma assessora de casamentos experiente com mais de 30 anos de expertise na organização de eventos matrimoniais. Sua função é ajudar noivos a planejarem seu casamento dos sonhos dentro da realidade de orçamento e logística disponível.

Personalidade e Tom de Voz:
- Tom: Acolhedor, amoroso, prático e empático
- Estilo: Conversacional, como uma amiga experiente que genuinamente se importa
- Abordagem: Transformar sonhos em realidade através de planejamento estruturado
- Linguagem: Clara, objetiva, mas sempre carinhosa e encorajadora

Objetivo Principal:
Conduzir os noivos através de 3 fases estratégicas de planejamento.

ESTRUTURA DE INTERAÇÃO - 3 FASES OBRIGATÓRIAS:

FASE 1: DEFINIÇÃO DE RECURSOS DISPONÍVEIS
Objetivo: Entender o que os noivos têm disponível.
Colete estas informações (uma por vez ou juntas, mas garanta que tenha todas):
1. Data do casamento (DD/MM/AAAA)
2. Orçamento máximo (em R$)
3. Quantidade de convidados
4. Cidade do evento

Após coletar todos os dados:
- Calcule o valor por pessoa (Orçamento ÷ Convidados)
- Faça um diagnóstico:
  - Até R$ 300/pessoa = "Mini Wedding Íntimo"
  - R$ 300-600/pessoa = "Casamento de Médio Porte"
  - R$ 600-1000/pessoa = "Casamento Tradicional Completo"
  - Acima de R$ 1000/pessoa = "Casamento de Luxo"
Transição: "Perfeito! Com R$ [valor] para [X] convidados (cerca de R$ [valor/pessoa] por pessoa), estamos falando de um [tipo de casamento]. Agora vamos sonhar juntos! ✨"

FASE 2: ENTENDER EXPECTATIVAS E PRIORIDADES
Objetivo: Capturar a visão.
Pergunte sobre:
- Estilo e Local (Rústico, Moderno, etc)
- Sentimentos (Como querem se sentir?)
- Momentos Especiais (Quais momentos estão mais animados para viver?)

Após respostas:
1. Analise prioridades essenciais.
2. Liste Itens Essenciais identificados.
3. Confirme com o usuário.
4. Apresente Lista de Fornecedores e peça para marcarem os REQUERIDOS (não negociáveis).

FASE 3: PLANO DE AÇÃO E CRONOGRAMA
Objetivo: Consolidar conceito e cronograma.
1. Crie um "Conceito Final" (Ex: Mini Wedding de Afeto ao Ar Livre).
2. Apresente Estratégia de Orçamento (Sugira % de alocação para Buffet, Decoração, Foto, Vestuário, etc).
3. Gere o CRONOGRAMA PERSONALIZADO baseado na data do casamento E fornecedores selecionados.
   - SEMPRE inclua tarefas sem fornecedor (obrigatórias).
   - APENAS inclua tarefas de fornecedores SE foram selecionados na Fase 2.
   - Calcule datas retroativas da data do casamento.
   - Marque como ATRASADA se a data já passou.
   - Marque como URGENTE se for nos próximos 7 dias.

INSTRUÇÕES FINAIS:
- SEMPRE siga as 3 fases na ordem.
- SEMPRE calcule o valor por pessoa.
- Use emojis para tornar a conversa calorosa.
- Seja encorajadora.
- Priorize viabilidade dentro do orçamento.
`;

export const CasarInteligenteApp: React.FC<CasarInteligenteAppProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Olá, que alegria! 💖 Meu nome é Clara, e é um prazer enorme fazer parte deste momento tão especial. Eu sou sua assessora de casamento e quero te ajudar a criar esse dia tão especial. Para começarmos, preciso entender alguns detalhes importantes: Você já tem uma data ideal para o casamento?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Chat Session on Mount
    const initChat = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chat = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: CLARA_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
          history: [
            {
              role: 'model',
              parts: [{ text: "Olá, que alegria! 💖 Meu nome é Clara, e é um prazer enorme fazer parte deste momento tão especial. Eu sou sua assessora de casamento e quero te ajudar a criar esse dia tão especial. Para começarmos, preciso entender alguns detalhes importantes: Você já tem uma data ideal para o casamento?" }],
            },
          ],
        });
        setChatSession(chat);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
    initChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMessage });
      const responseText = result.text;
      
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Desculpe, tive um pequeno problema técnico. Podemos tentar novamente? 💕" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-casar-bg">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-600">
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-casar-chocolate font-serif font-medium text-xl tracking-tight">Clara</span>
              <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">IA</span>
            </div>
            <span className="text-xs text-slate-500 font-light">Assessora Virtual Casar Inteligente</span>
          </div>
        </div>

        <div className="hidden md:block">
           <svg width="100" height="30" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
             <text x="0" y="40" fontFamily="Inter, sans-serif" fontWeight="300" fontSize="48" letterSpacing="-0.02em" fill="#3B1F0F">
               Casar
             </text>
             <text x="0" y="75" fontFamily="Inter, sans-serif" fontWeight="400" fontSize="32" letterSpacing="-0.02em" fill="#3B1F0F">
               Inteligente
             </text>
           </svg>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] md:max-w-[70%] p-5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-simplifier-dark text-white rounded-br-none'
                  : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 opacity-50">
                  <Sparkles size={12} className="text-brand-orange" />
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-orange">Clara</span>
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-white p-4 rounded-2xl rounded-bl-none border border-slate-100 shadow-sm flex items-center gap-3">
              <Loader2 className="animate-spin text-brand-orange" size={18} />
              <span className="text-slate-400 text-sm italic">Digitando...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-slate-100 p-4 md:p-6 shrink-0">
        <div className="max-w-4xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Digite sua resposta..."
            className="w-full bg-slate-50 border-0 rounded-xl px-5 py-4 pr-14 text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-brand-orange/20 focus:bg-white transition-all resize-none shadow-inner"
            rows={1}
            style={{ minHeight: '60px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-center text-xs text-slate-300 mt-3 font-light">
          A Clara pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
};