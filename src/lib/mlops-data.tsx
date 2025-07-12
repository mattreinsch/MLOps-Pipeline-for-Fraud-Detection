import type { PipelineStage, SystemMetrics, ModelPerformance, Transaction } from "@/types/mlops";
import { 
  Database, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  Server,
  Eye,
} from "lucide-react";

export const INITIAL_PIPELINE_STAGES: PipelineStage[] = [
  { id: 'data', name: 'Data Ingestion', status: 'pending', progress: 0, icon: <Database className="h-4 w-4" /> },
  { id: 'feature', name: 'Feature Engineering', status: 'pending', progress: 0, icon: <Brain className="h-4 w-4" /> },
  { id: 'training', name: 'Model Training', status: 'pending', progress: 0, icon: <TrendingUp className="h-4 w-4" /> },
  { id: 'validation', name: 'Model Validation', status: 'pending', progress: 0, icon: <CheckCircle className="h-4 w-4" /> },
  { id: 'deployment', name: 'Deployment', status: 'pending', progress: 0, icon: <Server className="h-4 w-4" /> },
  { id: 'monitoring', name: 'Monitoring', status: 'pending', progress: 0, icon: <Eye className="h-4 w-4" /> }
];

export const SYSTEM_METRICS: SystemMetrics = {
  modelsInProduction: 3,
  dailyPredictions: "1.2M",
  uptime: "99.2%",
  averageLatency: "47ms",
  accuracy: "94.7%",
  dataDriftScore: 0.03
};

export const MODEL_PERFORMANCE: ModelPerformance = {
  precision: 94.7,
  recall: 92.3,
  f1Score: 93.5,
  auc: 96.8,
  falsePositiveRate: 0.8
};

export const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-001",
    amount: 2500.00,
    merchant: "Online Electronics Store",
    location: "New York, NY",
    riskScore: 0.23,
    prediction: "legitimate",
    confidence: 0.89,
    features: {
      amountZScore: 1.2,
      velocityScore: 0.3,
      merchantRisk: 0.1,
      locationAnomaly: 0.0,
      timeAnomaly: 0.2
    }
  },
  {
    id: "TXN-002", 
    amount: 50.00,
    merchant: "Gas Station",
    location: "Los Angeles, CA",
    riskScore: 0.87,
    prediction: "fraudulent",
    confidence: 0.94,
    features: {
      amountZScore: 0.1,
      velocityScore: 0.9,
      merchantRisk: 0.2,
      locationAnomaly: 0.8,
      timeAnomaly: 0.7
    }
  },
  {
    id: "TXN-003",
    amount: 150.75,
    merchant: "Restaurant",
    location: "Chicago, IL", 
    riskScore: 0.15,
    prediction: "legitimate",
    confidence: 0.92,
    features: {
      amountZScore: 0.2,
      velocityScore: 0.1,
      merchantRisk: 0.05,
      locationAnomaly: 0.0,
      timeAnomaly: 0.1
    }
  }
];
