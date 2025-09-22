'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating practice questions based on a given topic.
 *
 * It includes:
 * - `generatePracticeQuestions`: An async function that takes a topic string as input and returns a list of practice questions.
 * - `GeneratePracticeQuestionsInput`: The input type for the `generatePracticeQuestions` function (a string).
 * - `GeneratePracticeQuestionsOutput`: The output type for the `generatePracticeQuestions` function (an array of strings).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticeQuestionsInputSchema = z.string().describe('The topic for which to generate practice questions.');
export type GeneratePracticeQuestionsInput = z.infer<typeof GeneratePracticeQuestionsInputSchema>;

const GeneratePracticeQuestionsOutputSchema = z.array(z.string()).describe('An array of practice questions related to the topic.');
export type GeneratePracticeQuestionsOutput = z.infer<typeof GeneratePracticeQuestionsOutputSchema>;

export async function generatePracticeQuestions(topic: GeneratePracticeQuestionsInput): Promise<GeneratePracticeQuestionsOutput> {
  return generatePracticeQuestionsFlow(topic);
}

const prompt = ai.definePrompt({
  name: 'generatePracticeQuestionsPrompt',
  input: {schema: GeneratePracticeQuestionsInputSchema},
  output: {schema: GeneratePracticeQuestionsOutputSchema},
  prompt: `You are an expert educator. Generate 5 practice questions about the following topic:\n\n{{topic}}\n\nFormat each question as a string in a JSON array.`,
});

const generatePracticeQuestionsFlow = ai.defineFlow(
  {
    name: 'generatePracticeQuestionsFlow',
    inputSchema: GeneratePracticeQuestionsInputSchema,
    outputSchema: GeneratePracticeQuestionsOutputSchema,
  },
  async topic => {
    const {output} = await prompt(topic);
    return output!;
  }
);
