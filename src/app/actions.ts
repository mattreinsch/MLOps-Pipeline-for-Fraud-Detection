'use server';

import { analyzeTransactionFeatures } from '@/ai/flows/analyze-transaction-features';
import { assessDataDrift } from '@/ai/flows/assess-data-drift';
import type { Transaction } from '@/types/mlops';

export async function analyzeTransactionFeaturesAction(transaction: Transaction) {
  try {
    const result = await analyzeTransactionFeatures({
      transactionId: transaction.id,
      amount: transaction.amount,
      merchant: transaction.merchant,
      location: transaction.location,
      riskScore: transaction.riskScore,
      features: transaction.features,
    });
    return result;
  } catch (error) {
    console.error('Error analyzing transaction features:', error);
    return { explanation: 'An error occurred while analyzing the transaction. Please try again.' };
  }
}

export async function assessDataDriftAction(driftScore: number) {
  try {
    const result = await assessDataDrift({
      driftScore,
      // Hardcoded summaries for demo purposes
      currentDataSummary: 'Mean transaction amount increased by 5%, with a higher frequency of transactions from new locations.',
      referenceDataSummary: 'Stable transaction patterns with consistent geographical distribution.',
    });
    return result;
  } catch (error) {
    console.error('Error assessing data drift:', error);
    return { 
      explanation: 'An error occurred during drift assessment. Please try again.', 
      suggestedStrategies: 'Unable to generate strategies due to an error.' 
    };
  }
}
