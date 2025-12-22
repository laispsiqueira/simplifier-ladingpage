import { CHAT_CONFIG, ERROR_MESSAGES } from '../constants/chat';
import { ValidationResult } from '../types/chat';

export const validateInput = (text: string): ValidationResult => {
  const trimmed = text.trim();

  if (trimmed.length < CHAT_CONFIG.MIN_MESSAGE_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.TOO_SHORT };
  }

  if (trimmed.length > CHAT_CONFIG.MAX_MESSAGE_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.TOO_LONG };
  }

  // Basic suspicious pattern check (preventing simple script injection)
  // DOMPurify would be ideal here if we had the dependency, but regex helps for now.
  const suspiciousPattern = /<script|javascript:|onerror=/i;
  if (suspiciousPattern.test(trimmed)) {
    return { valid: false, error: ERROR_MESSAGES.SUSPICIOUS };
  }

  // Basic sanitization: remove HTML tags
  const sanitized = trimmed.replace(/[<>]/g, '');

  return { valid: true, sanitized };
};
