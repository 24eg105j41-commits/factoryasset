import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: "healthy" | "warning" | "critical";
  trend?: "up" | "down" | "stable";
  icon: LucideIcon;
  target?: number;
}

export function KPICard({ title, value, unit, status, trend, icon: Icon, target }: KPICardProps) {
  const statusColors = {
    healthy: "border-l-success",
    warning: "border-l-warning",
    critical: "border-l-destructive",
  };

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className={cn("kpi-card border-l-4", statusColors[status])}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-display font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {target !== undefined && (
            <p className="text-xs text-muted-foreground mt-1">Target: {target}{unit}</p>
          )}
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            status === "healthy" ? "bg-success/10" : status === "warning" ? "bg-warning/10" : "bg-destructive/10"
          )}>
            <Icon className={cn(
              "w-5 h-5",
              status === "healthy" ? "text-success" : status === "warning" ? "text-warning" : "text-destructive"
            )} />
          </div>
          {trend && (
            <TrendIcon className={cn(
              "w-4 h-4",
              trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"
            )} />
          )}
        </div>
      </div>
    </div>
  );
}
