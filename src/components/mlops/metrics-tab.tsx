import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MODEL_PERFORMANCE } from "@/lib/mlops-data";

export function MetricsTab() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Model Performance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <MetricRow label="Precision" value={`${MODEL_PERFORMANCE.precision}%`} />
          <MetricRow label="Recall" value={`${MODEL_PERFORMANCE.recall}%`} />
          <MetricRow label="F1 Score" value={`${MODEL_PERFORMANCE.f1Score}%`} />
          <MetricRow label="AUC-ROC" value={`${MODEL_PERFORMANCE.auc}%`} />
          <MetricRow label="False Positive Rate" value={`${MODEL_PERFORMANCE.falsePositiveRate}%`} />
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Business Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ImpactMetric 
            value="67%" 
            label="Fraud Loss Reduction" 
            className="bg-green-600/20 border-green-500/30 text-green-300" 
            valueColor="text-green-400"
          />
          <ImpactMetric 
            value="45%" 
            label="False Positive Reduction"
            className="bg-blue-600/20 border-blue-500/30 text-blue-200"
            valueColor="text-blue-400"
          />
          <ImpactMetric 
            value="85%" 
            label="Manual Intervention Reduction"
            className="bg-purple-600/20 border-purple-500/30 text-purple-200"
            valueColor="text-purple-400"
          />
        </CardContent>
      </Card>
    </div>
  );
}

const MetricRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-slate-700/30">
    <span className="text-gray-400">{label}</span>
    <span className="font-bold text-white">{value}</span>
  </div>
);

const ImpactMetric = ({ value, label, className, valueColor }: { value: string; label: string; className: string; valueColor: string }) => (
  <div className={`p-4 rounded-lg border ${className}`}>
    <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
    <div className="text-sm font-medium">{label}</div>
  </div>
);
