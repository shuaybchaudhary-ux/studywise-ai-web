'use server';

import { generateDiagram } from '@/ai/flows/generate-diagrams-from-topics';

export async function getDiagram(topic: string) {
  try {
    const response = await generateDiagram({ topic });
    return response;
  } catch (error) {
    console.error(error);
    return { diagramCode: 'graph TD; A[Error] --> B(Could not generate diagram);' };
  }
}
