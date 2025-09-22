'use server';

import { generateConciseSummary } from '@/ai/flows/generate-concise-summaries';

export async function getSummary(content: string) {
  try {
    const response = await generateConciseSummary({ content });
    return response;
  } catch (error) {
    console.error(error);
    return { summary: 'Sorry, I encountered an error while summarizing. Please try again.' };
  }
}
