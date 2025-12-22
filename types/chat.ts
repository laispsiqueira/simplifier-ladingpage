export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface ChatConfig {
  model: string;
  temperature: number;
  maxTokens?: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: string;
}

export interface UseChatSessionOptions {
  systemInstruction: string;
  model?: string;
  temperature?: number;
}
