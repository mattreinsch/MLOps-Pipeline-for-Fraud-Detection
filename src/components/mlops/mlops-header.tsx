import { GitBranch } from "lucide-react";

export function MLOpsHeader() {
  return (
    <header className="pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-3 bg-indigo-600/20 rounded-xl border border-indigo-500/30">
            <GitBranch className="h-8 w-8 text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">
            MLOps Observatory
          </h1>
        </div>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          End-to-end MLOps system for fraud detection with automated training, deployment, and monitoring.
        </p>
      </div>
    </header>
  );
}
