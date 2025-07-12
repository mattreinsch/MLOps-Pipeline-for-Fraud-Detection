"use client";
import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, Brain, Loader2 } from "lucide-react";
import { SAMPLE_TRANSACTIONS } from "@/lib/mlops-data";
import type { Transaction } from "@/types/mlops";
import { getStatusBadgeClass } from "@/lib/mlops-utils";
import { analyzeTransactionFeaturesAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export function PredictionsTab() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setAnalysis(null);
  };

  const handleAnalyzeFeatures = () => {
    if (!selectedTransaction) return;

    startTransition(async () => {
      try {
        const result = await analyzeTransactionFeaturesAction(selectedTransaction);
        if (result && result.explanation) {
          setAnalysis(result.explanation);
        } else {
           toast({
            variant: "destructive",
            title: "Analysis Failed",
            description: "Could not get a response from the AI model.",
          });
          setAnalysis("Failed to get analysis from the AI model.");
        }
      } catch (error) {
         toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred during analysis.",
        });
        setAnalysis("An unexpected error occurred.");
      }
    });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Real-time Fraud Detection
        </CardTitle>
        <CardDescription className="text-gray-300">
          Live transaction analysis and risk scoring. Click a transaction to analyze.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {SAMPLE_TRANSACTIONS.map((transaction) => (
            <div 
              key={transaction.id}
              className={cn(
                "p-4 bg-slate-700/40 rounded-lg cursor-pointer hover:bg-slate-700/70 transition-colors border",
                selectedTransaction?.id === transaction.id ? "border-indigo-500" : "border-slate-700"
              )}
              onClick={() => handleSelectTransaction(transaction)}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-white">{transaction.id}</span>
                    <Badge className={cn("capitalize", getStatusBadgeClass(transaction.prediction))}>
                      {transaction.prediction}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    ${transaction.amount.toFixed(2)} • {transaction.merchant} • {transaction.location}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-lg font-bold text-white">
                    {(transaction.riskScore * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-400">Risk Score</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedTransaction && (
          <div className="mt-6 p-4 bg-slate-600/30 rounded-lg border border-slate-600">
            <h3 className="font-medium text-white mb-3">Feature Analysis - {selectedTransaction.id}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(selectedTransaction.features).map(([feature, value]) => (
                <div key={feature} className="p-3 bg-slate-700/50 rounded">
                  <div className="text-xs font-medium text-gray-400 capitalize">
                    {feature.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </div>
                  <div className="text-lg font-bold text-white">
                    {(value as number).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <Button onClick={handleAnalyzeFeatures} disabled={isAnalyzing}>
                {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Brain className="mr-2 h-4 w-4" />}
                {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
              </Button>
               <div className="text-sm text-gray-400">
                Model Confidence: <span className="font-bold text-white">{(selectedTransaction.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>

            {analysis && (
              <Alert className="mt-4 bg-slate-700/50 border-slate-600">
                <Brain className="h-4 w-4 text-indigo-400" />
                <AlertTitle className="text-white">AI-Powered Explanation</AlertTitle>
                <AlertDescription className="text-gray-300">
                  {analysis}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
