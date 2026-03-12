import { KPIMetric, Alert, AlertSeverity } from "@/types/factory";

interface RuleResult {
  triggered: boolean;
  alert: Omit<Alert, "id" | "timestamp" | "acknowledged"> | null;
}

export function evaluateKPIRules(metrics: KPIMetric[]): RuleResult[] {
  const results: RuleResult[] = [];

  const missingAssets = metrics.find(m => m.name === "Missing Assets");
  if (missingAssets && missingAssets.value > 0) {
    results.push({
      triggered: true,
      alert: {
        title: "Missing Assets Alert",
        description: `${missingAssets.value} asset(s) are currently missing. Threshold: 0.`,
        severity: "critical" as AlertSeverity,
        module: "Assets",
      },
    });
  }

  const utilization = metrics.find(m => m.name === "Asset Utilization");
  if (utilization && utilization.value < utilization.target) {
    results.push({
      triggered: true,
      alert: {
        title: "Low Asset Utilization",
        description: `Utilization at ${utilization.value}% (target: ${utilization.target}%).`,
        severity: "warning" as AlertSeverity,
        module: "KPI",
      },
    });
  }

  const responseTime = metrics.find(m => m.name === "Avg Response Time");
  if (responseTime && responseTime.value > responseTime.target) {
    results.push({
      triggered: true,
      alert: {
        title: "Response Time Exceeded",
        description: `Avg response: ${responseTime.value}h (limit: ${responseTime.target}h).`,
        severity: "info" as AlertSeverity,
        module: "Communication",
      },
    });
  }

  const maintenance = metrics.find(m => m.name === "Maintenance Compliance");
  if (maintenance && maintenance.value < maintenance.target) {
    results.push({
      triggered: true,
      alert: {
        title: "Maintenance Compliance Low",
        description: `Compliance at ${maintenance.value}% (target: ${maintenance.target}%).`,
        severity: "warning" as AlertSeverity,
        module: "Maintenance",
      },
    });
  }

  return results;
}
