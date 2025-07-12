import type { ReactNode } from 'react';

export interface PipelineStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  progress: number;
  duration?: string;
  icon: ReactNode;
}

export interface SystemMetrics {
  modelsInProduction: number;
  dailyPredictions: string;
  uptime: string;
  averageLatency: string;
  accuracy: string;
  dataDriftScore: number;
}

export interface ModelPerformance {
  precision: number;
  recall: number;
  f1Score: number;
  auc: number;
  falsePositiveRate: number;
}

export interface Transaction {
  id: string;
  amount: number;
  merchant: string;
  location: string;
  riskScore: number;
  prediction: "legitimate" | "fraudulent";
  confidence: number;
  features: Record<string, number>;
}
