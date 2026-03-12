export type AssetStatus = "Active" | "Idle" | "Maintenance" | "Missing";
export type AlertSeverity = "critical" | "warning" | "info";
export type KPIStatus = "healthy" | "warning" | "critical";

export interface Asset {
  id: string;
  name: string;
  type: string;
  serialNumber: string;
  location: string;
  status: AssetStatus;
  assignedTo: string;
  lastMoved: string;
  value: number;
}

export interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  assignedAssets: number;
}

export interface MovementLog {
  id: string;
  assetId: string;
  assetName: string;
  fromLocation: string;
  toLocation: string;
  movedBy: string;
  timestamp: string;
  reason: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  department: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  timestamp: string;
  acknowledged: boolean;
  module: string;
}

export interface KPIMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: KPIStatus;
  trend: "up" | "down" | "stable";
  category: string;
}
