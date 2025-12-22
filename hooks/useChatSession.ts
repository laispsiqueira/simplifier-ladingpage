import { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { UseChatSessionOptions } from '../types/chat';

export const useChatSession = (options: UseChatSessionOptions) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initChat = async () => {
      try {
        // NOTE: In this specific environment, we must use process.env.API_KEY.
        // In a Vite environment, this should be import.meta.env.VITE_GEMINI_API_KEY
        // We added a check to ensure it exists.
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
          throw new Error('API Key não configurada. Verifique as variáveis de ambiente.');
        }

        const ai = new GoogleGenAI({ apiKey });
        const chat = ai.chats.create({
          model: options.model || 'gemini-2.5-flash',
          config: {
            systemInstruction: options.systemInstruction,
            temperature: options.temperature || 0.7,
          },
          history: [
            {
              role: 'model',
              parts: [{ text: "Olá, que alegria! 💖 Meu nome é Clara, e é um prazer enorme fazer parte deste momento tão especial. Eu sou sua assessora de casamento e quero te ajudar a criar esse dia tão especial. Para começarmos, preciso entender alguns detalhes importantes: Você já tem uma data ideal para o casamento?" }],
            },
          ],
        });

        if (mounted) {
          setChatSession(chat);
          setError(null);
        }
      } catch (err) {
        console.error("Error initializing chat:", err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (mounted) {
          setIsInitializing(false);
        }
      }
    };

    initChat();

    return () => {
      mounted = false;
    };
  }, [options.systemInstruction, options.model, options.temperature]);

  return { chatSession, error, isInitializing };
};
