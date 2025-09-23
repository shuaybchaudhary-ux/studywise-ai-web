'use server';

import { provideAiTutoring } from '@/ai/flows/provide-ai-tutoring';
import type { ChatHistory } from '@/lib/types';

export async function getAnswer(question: string, studentProfile: string, history: ChatHistory) {
  try {
    const response = await provideAiTutoring({ question, studentProfile, history });
    return response;
  } catch (error: any) {
    console.error('[getAnswer Error]', error);
    // Return the actual error message to the client for debugging
    const errorMessage = error.message || 'An unknown error occurred.';
    return { answer: `Sorry, I encountered an error. Please try again.\n\n**Error:** ${errorMessage}` };
  }
}
