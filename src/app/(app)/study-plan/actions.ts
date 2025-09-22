'use server';

import { createPersonalizedStudyPlan, CreatePersonalizedStudyPlanInput } from '@/ai/flows/create-personalized-study-plans';

export async function createPlan(input: CreatePersonalizedStudyPlanInput) {
  try {
    const response = await createPersonalizedStudyPlan(input);
    return response;
  } catch (error) {
    console.error(error);
    return { studyPlan: 'Sorry, I encountered an error while creating your study plan. Please try again.' };
  }
}
