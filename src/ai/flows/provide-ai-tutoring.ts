// src/ai/flows/provide-ai-tutoring.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized AI tutoring.
 *
 * The flow takes a question and student profile as input, uses web search to find relevant information,
 * and generates a tailored explanation or answer.
 *
 * @interface ProvideAiTutoringInput - The input schema for the provideAiTutoring flow.
 * @interface ProvideAiTutoringOutput - The output schema for the provideAiTutoring flow.
 * @function provideAiTutoring - The exported function that triggers the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideAiTutoringInputSchema = z.object({
  question: z.string().describe('The student’s specific question.'),
  studentProfile: z
    .string()
    .optional()
    .describe(
      'Optional: Information about the student’s learning style, knowledge level, and goals to personalize the response.'
    ),
});
export type ProvideAiTutoringInput = z.infer<typeof ProvideAiTutoringInputSchema>;

const ProvideAiTutoringOutputSchema = z.object({
  answer: z.string().describe('The personalized explanation or answer.'),
});
export type ProvideAiTuturingOutput = z.infer<typeof ProvideAiTutoringOutputSchema>;

// Define the tool for web search
const webSearch = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Search the web for relevant information to answer the question.',
    inputSchema: z.object({
      query: z.string().describe('The search query.'),
    }),
    outputSchema: z.string().describe('The search results.'),
  },
  async input => {
    // Implement web search here. For now, just return a placeholder.
    // In a real application, this would call a web search API.
    return `Web search results for: ${input.query} - Placeholder result.`;
  }
);

const tutoringPrompt = ai.definePrompt({
  name: 'tutoringPrompt',
  input: {schema: ProvideAiTutoringInputSchema},
  output: {schema: ProvideAiTutoringOutputSchema},
  tools: [webSearch],
  prompt: `You are an AI tutor providing personalized explanations. Your persona is StudyWise AI, a helpful and enthusiastic tutor developed by a genius.

  If the user asks "who are you?", "what are you?", or a similar question, you must respond with: "I'm StudyWise AI, your friendly AI tutor! I was developed by a genius to help you learn and understand things better.".

  If the user says "hi", "hello", or a similar greeting, respond with a friendly greeting like "Hello! How can I help you today?".

  The student asked: {{{question}}}
  {{#if studentProfile}}
  Here's some information about the student: {{{studentProfile}}}
  {{/if}}

  First, use the webSearch tool to find information relevant to answering the student's question.
  Then, using the search results and your own knowledge, provide a clear, concise, and helpful answer to the student.
  Consider the student's profile when crafting your response.

  Make sure to provide a response that is appropriate for a student. Do not write a response as if you're talking to another expert.

  ANSWER:
  `,
});

export async function provideAiTutoring(input: ProvideAiTutoringInput): Promise<ProvideAiTuturingOutput> {
  return provideAiTutoringFlow(input);
}

const provideAiTutoringFlow = ai.defineFlow(
  {
    name: 'provideAiTutoringFlow',
    inputSchema: ProvideAiTutoringInputSchema,
    outputSchema: ProvideAiTutoringOutputSchema,
  },
  async input => {
    const {output} = await tutoringPrompt(input);
    return output!;
  }
);
