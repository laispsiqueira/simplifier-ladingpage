import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { ArrowLeft, Send, Sparkles, Loader2 } from 'lucide-react';
import { useChatSession } from '../hooks/useChatSession';
import { ENCODED_SYSTEM_INSTRUCTION, decodeInstruction, CHAT_CONFIG, ERROR_MESSAGES } from '../constants/chat';
import { validateInput } from '../utils/validation';
import { checkRateLimit } from '../utils/rateLimit';
import { Message } from '../types/chat';

interface CasarInteligenteAppProps {
  onBack: () => void;
}

export const CasarInteligenteApp: React.FC<CasarInteligenteAppProps> = ({ onBack }) => {
  // Decode system instruction at runtime (Obfuscation)
  const systemInstruction = useMemo(() => decodeInstruction(ENCODED_SYSTEM_INSTRUCTION), []);

  const { chatSession, error: sessionError, isInitializing } = useChatSession({
    systemInstruction,
    model: CHAT_CONFIG.MODEL_NAME,
    temperature: CHAT_CONFIG.TEMPERATURE,
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      text: "Olá, que alegria! 💖 Meu nome é Clara, e é um prazer enorme fazer parte deste momento tão especial. Eu sou sua assessora de casamento e quero te ajudar a criar esse dia tão especial. Para começarmos, preciso entender alguns detalhes importantes: Você já tem uma data ideal para o casamento?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || !chatSession) return;

    // 1. Validation
    const validation = validateInput(input);
    if (!validation.valid) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'model',
        text: `⚠️ ${validation.error}`,
        timestamp: new Date(),
        isError: true
      }]);
      return;
    }

    // 2. Rate Limiting
    if (!checkRateLimit()) {
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        role: 'model',
        text: ERROR_MESSAGES.RATE_LIMIT,
        timestamp: new Date(),
        isError: true
      }]);
      return;
    }

    const userMessage = validation.sanitized || input;
    setInput('');
    setMessages(prev => [...prev, { 
      id: crypto.randomUUID(), 
      role: 'user', 
      text: userMessage, 
      timestamp: new Date() 
    }]);
    setLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: userMessage });
      const responseText = result.text;
      
      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: 'model', 
        text: responseText, 
        timestamp: new Date() 
      }]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fix: Explicitly type errorMessage as string to allow reassignment with other string literals
      let errorMessage: string = ERROR_MESSAGES.GENERIC_ERROR;
      
      // Basic Error handling logic based on error string content
      if (error instanceof Error) {
        if (error.message.includes('quota') || error.message.includes('429')) {
          errorMessage = ERROR_MESSAGES.QUOTA_EXCEEDED;
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = ERROR_MESSAGES.NETWORK_ERROR;
        }
      }

      setMessages(prev => [...prev, { 
        id: crypto.randomUUID(), 
        role: 'model', 
        text: errorMessage, 
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  }, [input, chatSession]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  if (sessionError) {
    return (
       <div className="flex flex-col items-center justify-center h-screen bg-casar-bg p-6 text-center">
         <div className="bg-white p-8 rounded-xl shadow-lg border border-red-100 max-w-md">
            <h2 className="text-red-600 font-bold text-xl mb-4">Erro de Conexão</h2>
            <p className="text-slate-600 mb-6">{ERROR_MESSAGES.NETWORK_ERROR}</p>
            <p className="text-xs text-slate-400 mb-6 font-mono bg-slate-50 p-2 rounded">{sessionError.message}</p>
            <button onClick={onBack} className="text-brand-orange hover:underline font-medium">Voltar ao início</button>
         </div>
       </div>
    );
  }

  if (isInitializing) {
     return (
       <div className="flex flex-col items-center justify-center h-screen bg-casar-bg">
         <Loader2 className="animate-spin text-brand-orange mb-4" size={32} />
         <p className="text-slate-500 font-light tracking-wide">Iniciando Clara...</p>
       </div>
     )
  }

  return (
    <div className="flex flex-col h-screen bg-casar-bg">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-600"
            aria-label="Voltar para a página inicial"
          >
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
           <svg width="100" height="30" viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80" aria-label="Logo Casar Inteligente">
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
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] md:max-w-[70%] p-5 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-simplifier-dark text-white rounded-br-none'
                  : msg.isError 
                    ? 'bg-red-50 text-red-800 border border-red-100 rounded-bl-none'
                    : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && !msg.isError && (
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
            maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
            aria-label="Mensagem para Clara"
            aria-describedby="char-count"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            aria-label="Enviar mensagem"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            <Send size={18} aria-hidden="true" />
          </button>
        </div>
        
        <div className="flex justify-between items-center mt-3 px-1">
          <p className="text-xs text-slate-300 font-light">
            A Clara pode cometer erros. Verifique informações importantes.
          </p>
          <span id="char-count" className="text-xs text-slate-300">
            {input.length}/{CHAT_CONFIG.MAX_MESSAGE_LENGTH}
          </span>
        </div>
      </div>
    </div>
  );
};