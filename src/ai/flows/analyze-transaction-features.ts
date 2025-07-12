'use server';

/**
 * @fileOverview A flow to analyze fraudulent transactions and explain feature importance.
 *
 * - analyzeTransactionFeatures - A function that analyzes transaction features and explains their impact on the risk score.
 * - AnalyzeTransactionFeaturesInput - The input type for the analyzeTransactionFeatures function.
 * - AnalyzeTransactionFeaturesOutput - The return type for the analyzeTransactionFeatures function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTransactionFeaturesInputSchema = z.object({
  transactionId: z.string().describe('The ID of the transaction to analyze.'),
  amount: z.number().describe('The transaction amount.'),
  merchant: z.string().describe('The merchant involved in the transaction.'),
  location: z.string().describe('The location of the transaction.'),
  riskScore: z.number().describe('The risk score assigned to the transaction.'),
  features: z
    .record(z.number())
    .describe(
      'A map of feature names to their corresponding values. Example: {amountZScore: 1.2, velocityScore: 0.3}'
    ),
});
export type AnalyzeTransactionFeaturesInput = z.infer<typeof AnalyzeTransactionFeaturesInputSchema>;

const AnalyzeTransactionFeaturesOutputSchema = z.object({
  explanation: z.string().describe('An explanation of why the transaction was flagged as fraudulent, highlighting the most important features and their impact on the risk score.'),
});
export type AnalyzeTransactionFeaturesOutput = z.infer<typeof AnalyzeTransactionFeaturesOutputSchema>;

export async function analyzeTransactionFeatures(
  input: AnalyzeTransactionFeaturesInput
): Promise<AnalyzeTransactionFeaturesOutput> {
  return analyzeTransactionFeaturesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeTransactionFeaturesPrompt',
  input: {schema: AnalyzeTransactionFeaturesInputSchema},
  output: {schema: AnalyzeTransactionFeaturesOutputSchema},
  prompt: `You are an expert fraud analyst. Given the details of a transaction, you will explain why it was flagged as fraudulent.

Transaction ID: {{{transactionId}}}
Amount: {{{amount}}}
Merchant: {{{merchant}}}
Location: {{{location}}}
Risk Score: {{{riskScore}}}
Features: {{#each (Object.entries features)}}{{{@key}}}: {{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Explain the most important factors contributing to the risk score, and how these features influenced the decision. Focus on the features with the highest values, and explain how they indicate fraudulent activity.
`,
});

const analyzeTransactionFeaturesFlow = ai.defineFlow(
  {
    name: 'analyzeTransactionFeaturesFlow',
    inputSchema: AnalyzeTransactionFeaturesInputSchema,
    outputSchema: AnalyzeTransactionFeaturesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
