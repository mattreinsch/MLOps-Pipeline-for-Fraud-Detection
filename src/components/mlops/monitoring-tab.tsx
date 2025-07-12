"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";
import { SYSTEM_METRICS } from "@/lib/mlops-data";
import { assessDataDriftAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

export function MonitoringTab() {
  const [driftAnalysis, setDriftAnalysis] = useState<{explanation: string, suggestedStrategies: string} | null>(null);
  const [isAnalyzingDrift, setIsAnalyzingDrift] = useState(false);
  const { toast } = useToast();

  const handleAssessDrift = async () => {
    setIsAnalyzingDrift(true);
    setDriftAnalysis(null);
    try {
      const result = await assessDataDriftAction(SYSTEM_METRICS.dataDriftScore);
      if (result) {
        setDriftAnalysis(result);
      } else {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "Could not get a response from the AI model.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred.",
      });
    } finally {
      setIsAnalyzingDrift(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <MetricDisplay value={SYSTEM_METRICS.uptime} label="Uptime" valueColor="text-green-400" />
          <MetricDisplay value={SYSTEM_METRICS.averageLatency} label="Avg Latency" valueColor="text-blue-400" />
          <MetricDisplay value={SYSTEM_METRICS.dailyPredictions} label="Daily Predictions" valueColor="text-purple-400" />
          <MetricDisplay value={SYSTEM_METRICS.modelsInProduction} label="Models in Prod" valueColor="text-yellow-400" />
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Data Drift Detection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Current Drift Score</span>
              <Badge className="bg-green-400/10 text-green-400 border-green-400/20">
                {SYSTEM_METRICS.dataDriftScore.toFixed(3)}
              </Badge>
            </div>
            <Progress value={SYSTEM_METRICS.dataDriftScore * 100} className="w-full h-2" />
            <p className="text-sm text-gray-400">
              Drift score below threshold (0.05). No retraining required.
            </p>
          </div>
          
          <Alert className="bg-slate-700/30 border-slate-600">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-gray-300">
              All feature distributions within expected ranges. Model performance stable.
            </AlertDescription>
          </Alert>

          <Button onClick={handleAssessDrift} disabled={isAnalyzingDrift} size="sm" variant="outline" className="bg-transparent hover:bg-slate-700/50 border-slate-600">
            {isAnalyzingDrift ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <AlertTriangle className="mr-2 h-4 w-4" />}
            {isAnalyzingDrift ? 'Analyzing...' : 'Assess Drift with AI'}
          </Button>

          {driftAnalysis && (
            <Alert className="bg-slate-700/30 border-slate-600">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertTitle className="text-white">AI Drift Assessment</AlertTitle>
              <AlertDescription className="text-gray-300 space-y-2">
                <p><strong>Explanation:</strong> {driftAnalysis.explanation}</p>
                <p><strong>Suggested Strategies:</strong> {driftAnalysis.suggestedStrategies}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const MetricDisplay = ({ value, label, valueColor }: { value: string | number; label: string, valueColor: string }) => (
  <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-700">
    <div className={`text-2xl font-bold ${valueColor}`}>{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);
