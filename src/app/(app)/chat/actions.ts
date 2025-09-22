'use server';

import { provideAiTutoring } from '@/ai/flows/provide-ai-tutoring';

export async function getAnswer(question: string, studentProfile: string) {
  try {
    const response = await provideAiTutoring({ question, studentProfile });
    return response;
  } catch (error) {
    console.error(error);
    return { answer: 'Sorry, I encountered an error. Please try again.' };
  }
}
