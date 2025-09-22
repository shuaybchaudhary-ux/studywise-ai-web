'use server';

import { generatePracticeQuestions } from '@/ai/flows/generate-practice-questions';

export async function generateQuestions(topic: string) {
  try {
    const response = await generatePracticeQuestions(topic);
    return response;
  } catch (error) {
    console.error(error);
    return ['Sorry, I encountered an error while generating questions. Please try again.'];
  }
}
