import { Asset, Employee, MovementLog, Message, Alert, KPIMetric } from "@/types/factory";

export const assets: Asset[] = [
  { id: "AST-001", name: "CNC Milling Machine", type: "Machinery", serialNumber: "CNC-2024-001", location: "Floor A - Bay 3", status: "Active", assignedTo: "John Carter", lastMoved: "2026-03-10", value: 125000 },
  { id: "AST-002", name: "Industrial Robot Arm", type: "Robotics", serialNumber: "ROB-2024-015", location: "Floor B - Assembly", status: "Active", assignedTo: "Sarah Kim", lastMoved: "2026-03-08", value: 89000 },
  { id: "AST-003", name: "Conveyor Belt Unit", type: "Transport", serialNumber: "CBU-2023-044", location: "Floor A - Line 2", status: "Maintenance", assignedTo: "Mike Torres", lastMoved: "2026-03-05", value: 34000 },
  { id: "AST-004", name: "Welding Station", type: "Machinery", serialNumber: "WLD-2024-008", location: "Floor C - Bay 1", status: "Idle", assignedTo: "Unassigned", lastMoved: "2026-02-28", value: 56000 },
  { id: "AST-005", name: "Forklift #12", type: "Vehicle", serialNumber: "FLK-2022-012", location: "Warehouse B", status: "Active", assignedTo: "David Chen", lastMoved: "2026-03-11", value: 42000 },
  { id: "AST-006", name: "Laser Cutter Pro", type: "Machinery", serialNumber: "LCP-2025-002", location: "Floor A - Bay 5", status: "Active", assignedTo: "Lisa Wang", lastMoved: "2026-03-09", value: 178000 },
  { id: "AST-007", name: "Pallet Jack #7", type: "Transport", serialNumber: "PJK-2021-007", location: "Unknown", status: "Missing", assignedTo: "Unassigned", lastMoved: "2026-02-15", value: 8500 },
  { id: "AST-008", name: "3D Printer Industrial", type: "Machinery", serialNumber: "3DP-2025-001", location: "R&D Lab", status: "Active", assignedTo: "Amy Patel", lastMoved: "2026-03-11", value: 67000 },
];

export const employees: Employee[] = [
  { id: "EMP-001", name: "John Carter", department: "Production", role: "Machine Operator", email: "j.carter@factory.com", phone: "+1-555-0101", assignedAssets: 3 },
  { id: "EMP-002", name: "Sarah Kim", department: "Assembly", role: "Robotics Engineer", email: "s.kim@factory.com", phone: "+1-555-0102", assignedAssets: 2 },
  { id: "EMP-003", name: "Mike Torres", department: "Maintenance", role: "Maintenance Lead", email: "m.torres@factory.com", phone: "+1-555-0103", assignedAssets: 5 },
  { id: "EMP-004", name: "David Chen", department: "Logistics", role: "Warehouse Operator", email: "d.chen@factory.com", phone: "+1-555-0104", assignedAssets: 2 },
  { id: "EMP-005", name: "Lisa Wang", department: "Production", role: "Senior Technician", email: "l.wang@factory.com", phone: "+1-555-0105", assignedAssets: 4 },
  { id: "EMP-006", name: "Amy Patel", department: "R&D", role: "Research Engineer", email: "a.patel@factory.com", phone: "+1-555-0106", assignedAssets: 1 },
];

export const movementLogs: MovementLog[] = [
  { id: "MOV-001", assetId: "AST-005", assetName: "Forklift #12", fromLocation: "Warehouse A", toLocation: "Warehouse B", movedBy: "David Chen", timestamp: "2026-03-11 14:32", reason: "Inventory transfer" },
  { id: "MOV-002", assetId: "AST-001", assetName: "CNC Milling Machine", fromLocation: "Floor A - Bay 1", toLocation: "Floor A - Bay 3", movedBy: "John Carter", timestamp: "2026-03-10 09:15", reason: "Line reconfiguration" },
  { id: "MOV-003", assetId: "AST-006", assetName: "Laser Cutter Pro", fromLocation: "Storage", toLocation: "Floor A - Bay 5", movedBy: "Lisa Wang", timestamp: "2026-03-09 11:00", reason: "New installation" },
  { id: "MOV-004", assetId: "AST-002", assetName: "Industrial Robot Arm", fromLocation: "Floor B - Testing", toLocation: "Floor B - Assembly", movedBy: "Sarah Kim", timestamp: "2026-03-08 16:45", reason: "Testing complete" },
  { id: "MOV-005", assetId: "AST-003", assetName: "Conveyor Belt Unit", fromLocation: "Floor A - Line 1", toLocation: "Floor A - Line 2", movedBy: "Mike Torres", timestamp: "2026-03-05 08:30", reason: "Maintenance swap" },
];

export const messages: Message[] = [
  { id: "MSG-001", from: "Mike Torres", to: "All Departments", department: "Maintenance", subject: "Scheduled Maintenance - Line 2", body: "Conveyor belt maintenance scheduled for March 12. Line 2 will be offline 6AM-2PM.", timestamp: "2026-03-11 16:00", read: false, priority: "high" },
  { id: "MSG-002", from: "Sarah Kim", to: "Production Team", department: "Assembly", subject: "Robot Arm Calibration Complete", body: "Industrial robot arm has been recalibrated. Assembly line B is back at full capacity.", timestamp: "2026-03-11 10:30", read: true, priority: "medium" },
  { id: "MSG-003", from: "Admin", to: "David Chen", department: "Logistics", subject: "Missing Pallet Jack Report", body: "Please provide an update on the missing pallet jack #7. Last seen in Warehouse A.", timestamp: "2026-03-10 14:00", read: false, priority: "high" },
  { id: "MSG-004", from: "Lisa Wang", to: "R&D Team", department: "Production", subject: "New Laser Cutter Performance", body: "Initial tests show 15% improvement in cutting precision. Full report coming Friday.", timestamp: "2026-03-09 17:20", read: true, priority: "low" },
];

export const alerts: Alert[] = [
  { id: "ALT-001", title: "Missing Asset Detected", description: "Pallet Jack #7 has not been scanned in 24 days. Last known location: Warehouse A.", severity: "critical", timestamp: "2026-03-11 08:00", acknowledged: false, module: "Assets" },
  { id: "ALT-002", title: "Low Asset Utilization", description: "Welding Station (AST-004) has been idle for 11 days. Consider reassignment.", severity: "warning", timestamp: "2026-03-11 06:00", acknowledged: false, module: "KPI" },
  { id: "ALT-003", title: "Maintenance Overdue", description: "Conveyor Belt Unit (AST-003) maintenance window has exceeded 5 days.", severity: "warning", timestamp: "2026-03-10 12:00", acknowledged: true, module: "Maintenance" },
  { id: "ALT-004", title: "Response Time Exceeded", description: "Average message response time is 4.2 hours, exceeding 3-hour threshold.", severity: "info", timestamp: "2026-03-10 09:00", acknowledged: false, module: "Communication" },
];

export const kpiMetrics: KPIMetric[] = [
  { id: "KPI-001", name: "Asset Utilization", value: 73, target: 85, unit: "%", status: "warning", trend: "down", category: "Operations" },
  { id: "KPI-002", name: "Active Assets", value: 5, target: 8, unit: "units", status: "warning", trend: "stable", category: "Assets" },
  { id: "KPI-003", name: "Missing Assets", value: 1, target: 0, unit: "units", status: "critical", trend: "up", category: "Assets" },
  { id: "KPI-004", name: "Avg Response Time", value: 4.2, target: 3, unit: "hours", status: "critical", trend: "up", category: "Communication" },
  { id: "KPI-005", name: "Maintenance Compliance", value: 88, target: 95, unit: "%", status: "warning", trend: "down", category: "Maintenance" },
  { id: "KPI-006", name: "Employee Productivity", value: 92, target: 90, unit: "%", status: "healthy", trend: "up", category: "HR" },
  { id: "KPI-007", name: "Asset Movements Today", value: 12, target: 15, unit: "moves", status: "healthy", trend: "stable", category: "Logistics" },
  { id: "KPI-008", name: "Open Alerts", value: 3, target: 0, unit: "alerts", status: "warning", trend: "up", category: "System" },
];
