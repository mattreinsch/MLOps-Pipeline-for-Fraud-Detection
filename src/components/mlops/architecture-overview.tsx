import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Brain, Server, Eye } from "lucide-react";

export function ArchitectureOverview() {
  return (
    <Card className="mt-8 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">MLOps Architecture</CardTitle>
        <CardDescription className="text-gray-300">
          Complete infrastructure for production machine learning.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <ArchPillar
            icon={<Database className="h-8 w-8 text-indigo-400 mx-auto" />}
            title="Data Pipeline"
            description="Real-time ingestion, validation, and feature store."
            className="bg-indigo-600/20 border-indigo-500/30"
          />
          <ArchPillar
            icon={<Brain className="h-8 w-8 text-blue-400 mx-auto" />}
            title="Model Training"
            description="Automated hyperparameter tuning and validation."
            className="bg-blue-600/20 border-blue-500/30"
          />
          <ArchPillar
            icon={<Server className="h-8 w-8 text-green-400 mx-auto" />}
            title="Deployment"
            description="Kubernetes orchestration with auto-scaling."
            className="bg-green-600/20 border-green-500/30"
          />
          <ArchPillar
            icon={<Eye className="h-8 w-8 text-yellow-400 mx-auto" />}
            title="Monitoring"
            description="Model drift detection and performance tracking."
            className="bg-yellow-600/20 border-yellow-500/30"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface ArchPillarProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className: string;
}

const ArchPillar = ({ icon, title, description, className }: ArchPillarProps) => (
  <div className="text-center">
    <div className={`p-4 rounded-xl border mb-4 ${className}`}>
      {icon}
    </div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);
