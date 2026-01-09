// src/ai/flows/provide-ai-tutoring.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized AI tutoring.
 *
 * The flow takes a question, student profile, and chat history as input,
 * and generates a tailored explanation or answer using the Gemini API.
 *
 * @interface ProvideAiTutoringInput - The input schema for the provideAiTutoring flow.
 * @interface ProvideAiTutoringOutput - The output schema for the provideAiTutoring flow.
 * @function provideAiTutoring - The exported function that triggers the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatPartSchema = z.object({
  text: z.string(),
});

const ChatHistorySchema = z.object({
  role: z.enum(['user', 'model']),
  parts: z.array(ChatPartSchema),
});

const ProvideAiTutoringInputSchema = z.object({
  question: z.string().describe('The student’s specific question.'),
  studentProfile: z
    .string()
    .optional()
    .describe(
      'Optional: Information about the student’s learning style, knowledge level, and goals to personalize the response.'
    ),
  history: z.array(ChatHistorySchema).optional().describe('The conversation history.'),
});
export type ProvideAiTutoringInput = z.infer<typeof ProvideAiTutoringInputSchema>;

const ProvideAiTutoringOutputSchema = z.object({
  answer: z.string().describe('The personalized explanation or answer.'),
});
export type ProvideAiTutoringOutput = z.infer<typeof ProvideAiTutoringOutputSchema>;


const provideAiTutoringFlow = ai.defineFlow(
  {
    name: 'provideAiTutoringFlow',
    inputSchema: ProvideAiTutoringInputSchema,
    outputSchema: ProvideAiTutoringOutputSchema,
  },
  async (input) => {
    const { question, studentProfile, history } = input;

    const systemPrompt = `You are an AI tutor providing personalized explanations. Your persona is StudyWise AI, a helpful and enthusiastic tutor developed by shu'ayb chaudhary.

If the user asks "who are you?", "what are you?", or a similar question, you must respond with: "I'm StudyWise AI, your friendly AI tutor! I was developed by shu'ayb chaudhary to help you learn and understand things better.".

If the user says "hi", "hello", or a similar greeting, respond with a friendly greeting like "Hello! How can I help you today?".

${studentProfile ? `Here's some information about the student: ${studentProfile}. Keep this in mind when answering.` : ''}

Make sure to provide a response that is appropriate for a student. Do not write a response as if you're talking to another expert.
`;

    const response = await ai.generate({
    model: 'googleai/gemini-1.0-pro',
      system: systemPrompt,
      history: history || [],
      prompt: question,
    });

    return { answer: response.text };
  }
);


export async function provideAiTutoring(input: ProvideAiTutoringInput): Promise<ProvideAiTutoringOutput> {
  return provideAiTutoringFlow(input);
}
