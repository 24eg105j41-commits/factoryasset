import { cn } from "@/lib/utils";
import { AssetStatus } from "@/types/factory";

interface StatusBadgeProps {
  status: AssetStatus | string;
  className?: string;
}

const statusConfig: Record<string, string> = {
  Active: "status-green",
  Idle: "status-yellow",
  Maintenance: "status-yellow",
  Missing: "status-red",
  critical: "status-red",
  warning: "status-yellow",
  info: "bg-info/10 text-info border border-info/20",
  high: "status-red",
  medium: "status-yellow",
  low: "bg-muted text-muted-foreground border border-border",
  healthy: "status-green",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      statusConfig[status] || "bg-muted text-muted-foreground",
      className
    )}>
      {status}
    </span>
  );
}
