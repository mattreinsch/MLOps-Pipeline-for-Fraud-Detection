"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MLOpsHeader } from "@/components/mlops/mlops-header";
import { PipelineTab } from "@/components/mlops/pipeline-tab";
import { MonitoringTab } from "@/components/mlops/monitoring-tab";
import { PredictionsTab } from "@/components/mlops/predictions-tab";
import { MetricsTab } from "@/components/mlops/metrics-tab";
import { ArchitectureOverview } from "@/components/mlops/architecture-overview";
import type { PipelineStage } from "@/types/mlops";
import { INITIAL_PIPELINE_STAGES } from "@/lib/mlops-data";

export default function MLOpsObservatoryPage() {
  const [pipelineStages, setPipelineStages] = useState<PipelineStage[]>(INITIAL_PIPELINE_STAGES);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState("pipeline");

  const runPipeline = async () => {
    setIsRunning(true);
    
    // Reset to initial state before running
    setPipelineStages(INITIAL_PIPELINE_STAGES.map(s => ({...s, status: 'pending', progress: 0, duration: undefined})));

    const stageDurations = [2000, 3000, 5000, 2000, 3000, 2000];

    for (let i = 0; i < INITIAL_PIPELINE_STAGES.length; i++) {
      // Update stage to running
      setPipelineStages(prev => prev.map((stage, idx) => 
        idx === i ? { ...stage, status: 'running', progress: 0 } : stage
      ));
      
      const progressInterval = setInterval(() => {
        setPipelineStages(prev => prev.map((stage, idx) => {
          if (idx === i && stage.progress < 100) {
            return { ...stage, progress: Math.min(stage.progress + 5, 100) };
          }
          return stage;
        }));
      }, stageDurations[i] / 20);
      
      await new Promise(resolve => setTimeout(resolve, stageDurations[i]));
      
      clearInterval(progressInterval);
      
      // Mark stage as completed
      setPipelineStages(prev => prev.map((stage, idx) => 
        idx === i ? { ...stage, status: 'completed', progress: 100, duration: `${stageDurations[i]/1000}s` } : stage
      ));
    }
    
    setIsRunning(false);
  };

  const resetPipeline = () => {
    setPipelineStages(INITIAL_PIPELINE_STAGES);
    setIsRunning(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-gray-300">
      <MLOpsHeader />
      <main className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-2 md:p-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-slate-800/80">
              <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
            </TabsList>

            <TabsContent value="pipeline" className="mt-6">
              <PipelineTab 
                stages={pipelineStages}
                onRun={runPipeline}
                onReset={resetPipeline}
                isRunning={isRunning}
              />
            </TabsContent>
            <TabsContent value="monitoring" className="mt-6">
              <MonitoringTab />
            </TabsContent>
            <TabsContent value="predictions" className="mt-6">
              <PredictionsTab />
            </TabsContent>
            <TabsContent value="metrics" className="mt-6">
              <MetricsTab />
            </TabsContent>
          </Tabs>

          <ArchitectureOverview />
        </div>
      </main>
    </div>
  );
}
