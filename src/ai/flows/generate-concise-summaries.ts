'use server';

/**
 * @fileOverview A document summarization AI agent.
 *
 * - generateConciseSummary - A function that handles the document summarization process.
 * - GenerateConciseSummaryInput - The input type for the generateConciseSummary function.
 * - GenerateConciseSummaryOutput - The return type for the generateConciseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConciseSummaryInputSchema = z.object({
  content: z
    .string()
    .describe("The content to summarize, either a document or the text content of a URL."),
});
export type GenerateConciseSummaryInput = z.infer<typeof GenerateConciseSummaryInputSchema>;

const GenerateConciseSummaryOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the provided content."),
});
export type GenerateConciseSummaryOutput = z.infer<typeof GenerateConciseSummaryOutputSchema>;

export async function generateConciseSummary(input: GenerateConciseSummaryInput): Promise<GenerateConciseSummaryOutput> {
  return generateConciseSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateConciseSummaryPrompt',
  input: {schema: GenerateConciseSummaryInputSchema},
  output: {schema: GenerateConciseSummaryOutputSchema},
  prompt: `You are an expert summarizer. Please provide a concise and informative summary of the following content:

Content: {{{content}}}`,
});

const generateConciseSummaryFlow = ai.defineFlow(
  {
    name: 'generateConciseSummaryFlow',
    inputSchema: GenerateConciseSummaryInputSchema,
    outputSchema: GenerateConciseSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      ...output,
    };
  }
);
