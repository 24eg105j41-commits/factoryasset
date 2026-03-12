import { AppHeader } from "@/components/AppHeader";
import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { kpiMetrics } from "@/data/mockData";
import { evaluateKPIRules } from "@/lib/ruleEngine";
import { Activity, Package, MessageSquare, Wrench, Users, Truck, AlertTriangle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const iconMap: Record<string, typeof Activity> = {
  "Asset Utilization": Activity,
  "Active Assets": Package,
  "Missing Assets": AlertTriangle,
  "Avg Response Time": MessageSquare,
  "Maintenance Compliance": Wrench,
  "Employee Productivity": Users,
  "Asset Movements Today": Truck,
  "Open Alerts": AlertTriangle,
};

export default function KPIPage() {
  const ruleResults = evaluateKPIRules(kpiMetrics);
  const triggeredAlerts = ruleResults.filter(r => r.triggered);

  return (
    <>
      <AppHeader title="KPI Monitor" subtitle="Rule-based performance monitoring engine" />
      <div className="p-6 space-y-6">
        {/* Rule Engine Alerts */}
        {triggeredAlerts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h3 className="font-display font-semibold text-sm text-foreground">Rule Engine Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {triggeredAlerts.map((result, i) => (
                <div key={i} className={`kpi-card border-l-4 ${
                  result.alert?.severity === "critical" ? "border-l-destructive" :
                  result.alert?.severity === "warning" ? "border-l-warning" : "border-l-info"
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      result.alert?.severity === "critical" ? "bg-destructive/10" :
                      result.alert?.severity === "warning" ? "bg-warning/10" : "bg-info/10"
                    }`}>
                      <AlertTriangle className={`w-4 h-4 ${
                        result.alert?.severity === "critical" ? "text-destructive" :
                        result.alert?.severity === "warning" ? "text-warning" : "text-info"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{result.alert?.title}</p>
                        <StatusBadge status={result.alert?.severity || "info"} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{result.alert?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* KPI Grid */}
        <div>
          <h3 className="font-display font-semibold text-sm text-foreground mb-4">All KPI Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiMetrics.map((kpi, i) => (
              <motion.div key={kpi.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <KPICard
                  title={kpi.name}
                  value={kpi.value}
                  unit={kpi.unit}
                  status={kpi.status}
                  trend={kpi.trend}
                  icon={iconMap[kpi.name] || CheckCircle}
                  target={kpi.target}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
