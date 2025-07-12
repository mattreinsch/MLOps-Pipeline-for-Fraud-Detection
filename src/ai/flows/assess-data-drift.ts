'use server';

/**
 * @fileOverview Assesses data drift using GenAI, identifies contributing features, and suggests retraining strategies.
 *
 * - assessDataDrift - A function that handles the data drift assessment process.
 * - AssessDataDriftInput - The input type for the assessDataDrift function.
 * - AssessDataDriftOutput - The return type for the assessDataDrift function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessDataDriftInputSchema = z.object({
  currentDataSummary: z
    .string()
    .describe('A summary of the current data distribution.'),
  referenceDataSummary: z
    .string()
    .describe('A summary of the reference data distribution.'),
  driftScore: z.number().describe('The overall data drift score.'),
});
export type AssessDataDriftInput = z.infer<typeof AssessDataDriftInputSchema>;

const AssessDataDriftOutputSchema = z.object({
  explanation: z
    .string()
    .describe('An explanation of which features are contributing to the data drift.'),
  suggestedStrategies: z
    .string()
    .describe('Suggested retraining strategies based on the data drift assessment.'),
});
export type AssessDataDriftOutput = z.infer<typeof AssessDataDriftOutputSchema>;

export async function assessDataDrift(input: AssessDataDriftInput): Promise<AssessDataDriftOutput> {
  return assessDataDriftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessDataDriftPrompt',
  input: {schema: AssessDataDriftInputSchema},
  output: {schema: AssessDataDriftOutputSchema},
  prompt: `You are an expert data scientist specializing in assessing data drift in machine learning models.

You are provided with summaries of the current and reference data distributions, as well as an overall drift score.

Your task is to:
1. Explain which features are contributing the most to the drift score.
2. Suggest potential retraining strategies based on the data drift assessment.

Current Data Summary: {{{currentDataSummary}}}
Reference Data Summary: {{{referenceDataSummary}}}
Overall Drift Score: {{{driftScore}}}

Explanation:
Suggested Retraining Strategies:`,
});

const assessDataDriftFlow = ai.defineFlow(
  {
    name: 'assessDataDriftFlow',
    inputSchema: AssessDataDriftInputSchema,
    outputSchema: AssessDataDriftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

