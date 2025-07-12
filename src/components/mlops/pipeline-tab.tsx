import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Zap } from "lucide-react";
import type { PipelineStage } from "@/types/mlops";
import { getStatusBadgeClass } from "@/lib/mlops-utils";
import { cn } from "@/lib/utils";

interface PipelineTabProps {
  stages: PipelineStage[];
  onRun: () => void;
  onReset: () => void;
  isRunning: boolean;
}

export function PipelineTab({ stages, onRun, onReset, isRunning }: PipelineTabProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          CI/CD Pipeline Execution
        </CardTitle>
        <CardDescription className="text-gray-300">
          Automated model training and deployment pipeline.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Button 
            onClick={onRun} 
            disabled={isRunning}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <Zap className="h-4 w-4 mr-2" />
            {isRunning ? 'Pipeline Running...' : 'Trigger Pipeline'}
          </Button>
          <Button 
            onClick={onReset} 
            variant="outline"
            className="bg-transparent hover:bg-slate-700/50 border-slate-600"
            disabled={isRunning}
          >
            Reset
          </Button>
        </div>

        <div className="space-y-2">
          {stages.map((stage) => (
            <div key={stage.id} className="flex items-center gap-4 p-3 bg-slate-700/40 rounded-lg border border-slate-700 transition-all">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-slate-600 rounded-lg text-indigo-300">
                  {stage.icon}
                </div>
                <div>
                  <h3 className="font-medium text-white">{stage.name}</h3>
                  {stage.duration && (
                    <p className="text-sm text-gray-400">Completed in {stage.duration}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 w-40 justify-end">
                {stage.status === 'running' && (
                  <div className="w-24">
                    <Progress value={stage.progress} className="h-2" />
                  </div>
                )}
                <Badge className={cn("capitalize w-[90px] text-center justify-center", getStatusBadgeClass(stage.status))}>
                  {stage.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
