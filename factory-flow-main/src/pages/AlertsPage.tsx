import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { alerts as initialAlerts } from "@/data/mockData";
import { Alert } from "@/types/factory";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AlertsPage() {
  const [alertList, setAlertList] = useState<Alert[]>(initialAlerts);

  const handleAcknowledge = (id: string) => {
    setAlertList(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    toast.success("Alert acknowledged");
  };

  const severityIcon = (s: string) => {
    if (s === "critical") return <XCircle className="w-5 h-5 text-destructive" />;
    if (s === "warning") return <AlertTriangle className="w-5 h-5 text-warning" />;
    return <Info className="w-5 h-5 text-info" />;
  };

  return (
    <>
      <AppHeader title="Alerts" subtitle="System alerts and notifications" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-muted-foreground">Active: <span className="font-semibold text-foreground">{alertList.filter(a => !a.acknowledged).length}</span></span>
          <span className="text-muted-foreground">Total: <span className="font-semibold text-foreground">{alertList.length}</span></span>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {alertList.map(alert => (
            <div key={alert.id} className={`kpi-card border-l-4 ${
              alert.severity === "critical" ? "border-l-destructive" :
              alert.severity === "warning" ? "border-l-warning" : "border-l-info"
            } ${alert.acknowledged ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    alert.severity === "critical" ? "bg-destructive/10" :
                    alert.severity === "warning" ? "bg-warning/10" : "bg-info/10"
                  }`}>
                    {severityIcon(alert.severity)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground">{alert.title}</span>
                      <StatusBadge status={alert.severity} />
                      <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{alert.module}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                  </div>
                </div>
                {!alert.acknowledged && (
                  <Button variant="outline" size="sm" className="rounded-lg flex-shrink-0" onClick={() => handleAcknowledge(alert.id)}>
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Acknowledge
                  </Button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
