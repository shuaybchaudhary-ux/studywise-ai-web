'use server';
/**
 * @fileOverview Generates diagrams (flowcharts, mindmaps, etc.) based on a topic input.
 *
 * - generateDiagram - A function that handles the diagram generation process.
 * - GenerateDiagramInput - The input type for the generateDiagram function.
 * - GenerateDiagramOutput - The return type for the generateDiagram function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDiagramInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate a diagram.'),
});
export type GenerateDiagramInput = z.infer<typeof GenerateDiagramInputSchema>;

const GenerateDiagramOutputSchema = z.object({
  diagramCode: z.string().describe('The Mermaid.js code for the generated diagram.'),
});
export type GenerateDiagramOutput = z.infer<typeof GenerateDiagramOutputSchema>;

export async function generateDiagram(input: GenerateDiagramInput): Promise<GenerateDiagramOutput> {
  return generateDiagramFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDiagramPrompt',
  input: {schema: GenerateDiagramInputSchema},
  output: {schema: GenerateDiagramOutputSchema},
  prompt: `You are an expert in creating Mermaid.js diagrams.

  Based on the topic provided, generate Mermaid.js code that visually represents the information as a diagram (flowchart, mindmap, etc.).

  Topic: {{{topic}}}

  RULES:
  - Ensure the generated code is valid Mermaid.js code.
  - The diagram must start with a title, for example: --- title: Your Diagram Title ---
  - CRITICAL: All text for nodes must be enclosed in double quotes. For example: A["This is a node text"]. This is to prevent syntax errors with special characters.
  - Do not include any explanation or markdown formatting, just the raw mermaid code.
  `,
});

const generateDiagramFlow = ai.defineFlow(
  {
    name: 'generateDiagramFlow',
    inputSchema: GenerateDiagramInputSchema,
    outputSchema: GenerateDiagramOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
