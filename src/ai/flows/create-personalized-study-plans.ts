'use server';

/**
 * @fileOverview A personalized study plan generator AI agent.
 *
 * - createPersonalizedStudyPlan - A function that handles the study plan generation process.
 * - CreatePersonalizedStudyPlanInput - The input type for the createPersonalizedStudyPlan function.
 * - CreatePersonalizedStudyPlanOutput - The return type for the createPersonalizedStudyPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreatePersonalizedStudyPlanInputSchema = z.object({
  learningPreferences: z
    .string()
    .describe('The student\'s preferred learning methods (e.g., visual, auditory, kinesthetic).'),
  timeConstraints: z
    .string()
    .describe('The amount of time the student has available for studying per day/week.'),
  examDates: z.string().describe('The dates of the upcoming exams.'),
  topics: z.string().describe('The topics that the student needs to study.'),
});

export type CreatePersonalizedStudyPlanInput = z.infer<
  typeof CreatePersonalizedStudyPlanInputSchema
>;

const CreatePersonalizedStudyPlanOutputSchema = z.object({
  studyPlan: z.string().describe('A personalized study plan for the student.'),
});

export type CreatePersonalizedStudyPlanOutput = z.infer<
  typeof CreatePersonalizedStudyPlanOutputSchema
>;

export async function createPersonalizedStudyPlan(
  input: CreatePersonalizedStudyPlanInput
): Promise<CreatePersonalizedStudyPlanOutput> {
  return createPersonalizedStudyPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createPersonalizedStudyPlanPrompt',
  input: {schema: CreatePersonalizedStudyPlanInputSchema},
  output: {schema: CreatePersonalizedStudyPlanOutputSchema},
  prompt: `You are an AI study assistant that specializes in creating personalized study plans for students.

  Based on the student's learning preferences, time constraints, exam dates, and topics, create a study plan that will help the student effectively manage their study time and focus on relevant material.

  Learning Preferences: {{{learningPreferences}}}
  Time Constraints: {{{timeConstraints}}}
  Exam Dates: {{{examDates}}}
  Topics: {{{topics}}}

  Study Plan:`,
});

const createPersonalizedStudyPlanFlow = ai.defineFlow(
  {
    name: 'createPersonalizedStudyPlanFlow',
    inputSchema: CreatePersonalizedStudyPlanInputSchema,
    outputSchema: CreatePersonalizedStudyPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
