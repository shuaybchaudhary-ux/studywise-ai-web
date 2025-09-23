// Represents a message in the UI
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
}

// Represents the history sent to the Gemini API
export type ChatHistory = {
  role: 'user' | 'model';
  parts: { text: string }[];
}[];
