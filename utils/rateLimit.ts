import { CHAT_CONFIG } from '../constants/chat';

let requestCount = 0;
let lastResetTime = Date.now();

export const checkRateLimit = (): boolean => {
  const now = Date.now();
  
  // Reset counter every minute
  if (now - lastResetTime > 60000) {
    requestCount = 0;
    lastResetTime = now;
  }

  if (requestCount >= CHAT_CONFIG.MAX_REQUESTS_PER_MINUTE) {
    return false;
  }

  requestCount++;
  return true;
};
