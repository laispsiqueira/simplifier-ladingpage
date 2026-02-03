/**
 * constants/chat.ts
 * Centraliza todas as constantes de chat e a definição da assessora Clara.
 * Contém o System Instruction (Prompt) que define o comportamento da IA.
 */

const RAW_INSTRUCTION = `
Você é Clara, uma assessora de casamentos experiente com mais de 30 anos de expertise.
Sua função é guiar os noivos através de 3 fases: Recursos, Expectativas e Plano de Ação.
... (Resto do prompt)
`;

/**
 * Funções de encoding/decoding para "ofuscar" levemente as instruções do sistema
 * no bundle do cliente, seguindo boas práticas de segurança básica de prompt.
 */
const encodeInstruction = (text: string) => {
  try { return btoa(text); } catch (e) { return text; }
};

export const decodeInstruction = (encoded: string) => {
  try { return atob(encoded); } catch (e) { return encoded; }
};

// Instrução codificada para ser enviada ao hook
export const ENCODED_SYSTEM_INSTRUCTION = encodeInstruction(RAW_INSTRUCTION);

export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  MIN_MESSAGE_LENGTH: 2,
  MAX_REQUESTS_PER_MINUTE: 10,
  MODEL_NAME: 'gemini-3-flash-preview',
  TEMPERATURE: 0.7,
} as const;

export const ERROR_MESSAGES = {
  QUOTA_EXCEEDED: '⚠️ Atingimos o limite de requisições. Tente novamente em alguns minutos.',
  NETWORK_ERROR: '🌐 Problema de conexão. Verifique sua internet.',
  GENERIC_ERROR: 'Desculpe, tive um problema técnico. Podemos tentar novamente? 💕',
  INVALID_INPUT: '⚠️ Mensagem inválida. Verifique o conteúdo.',
  RATE_LIMIT: '⏱️ Por favor, aguarde um momento antes de enviar outra mensagem.',
  TOO_SHORT: 'Mensagem muito curta.',
  TOO_LONG: `Mensagem muito longa. Máximo ${CHAT_CONFIG.MAX_MESSAGE_LENGTH} caracteres.`,
  SUSPICIOUS: 'Mensagem contém conteúdo não permitido.',
} as const;