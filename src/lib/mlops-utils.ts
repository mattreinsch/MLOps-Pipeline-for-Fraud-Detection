export function getStatusBadgeClass(status: 'completed' | 'running' | 'failed' | 'pending' | 'legitimate' | 'fraudulent' | string) {
  switch (status) {
    case 'completed':
    case 'legitimate':
      return 'bg-green-400/10 text-green-400 border-green-400/20';
    case 'running':
      return 'bg-blue-400/10 text-blue-400 border-blue-400/20';
    case 'failed':
    case 'fraudulent':
      return 'bg-red-400/10 text-red-400 border-red-400/20';
    default:
      return 'bg-slate-400/10 text-slate-400 border-slate-400/20';
  }
}
