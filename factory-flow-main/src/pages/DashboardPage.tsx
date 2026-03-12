import { AppHeader } from "@/components/AppHeader";
import { KPICard } from "@/components/KPICard";
import { StatusBadge } from "@/components/StatusBadge";
import { assets, alerts, movementLogs, kpiMetrics, messages } from "@/data/mockData";
import { Package, Users, AlertTriangle, Activity, ArrowRightLeft, MessageSquare, CheckCircle, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion } from "framer-motion";

const assetStatusData = [
  { name: "Active", value: assets.filter(a => a.status === "Active").length, color: "hsl(142, 71%, 45%)" },
  { name: "Idle", value: assets.filter(a => a.status === "Idle").length, color: "hsl(38, 92%, 50%)" },
  { name: "Maintenance", value: assets.filter(a => a.status === "Maintenance").length, color: "hsl(199, 89%, 48%)" },
  { name: "Missing", value: assets.filter(a => a.status === "Missing").length, color: "hsl(0, 72%, 51%)" },
];

const movementData = [
  { day: "Mon", movements: 8 },
  { day: "Tue", movements: 12 },
  { day: "Wed", movements: 6 },
  { day: "Thu", movements: 15 },
  { day: "Fri", movements: 10 },
  { day: "Sat", movements: 4 },
  { day: "Sun", movements: 2 },
];

const fadeIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

export default function DashboardPage() {
  const unreadMessages = messages.filter(m => !m.read).length;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <>
      <AppHeader title="Dashboard" subtitle="Factory overview and real-time monitoring" />
      <div className="p-6 space-y-6 overflow-auto">
        {/* KPI Cards */}
        <motion.div {...fadeIn} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Total Assets" value={assets.length} icon={Package} status="healthy" trend="stable" />
          <KPICard title="Active Alerts" value={activeAlerts} icon={AlertTriangle} status={activeAlerts > 2 ? "critical" : "warning"} trend="up" />
          <KPICard title="Asset Utilization" value={kpiMetrics[0].value} unit="%" icon={Activity} status={kpiMetrics[0].status} trend={kpiMetrics[0].trend} target={kpiMetrics[0].target} />
          <KPICard title="Unread Messages" value={unreadMessages} icon={MessageSquare} status={unreadMessages > 1 ? "warning" : "healthy"} trend="stable" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Asset Status Chart */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="kpi-card lg:col-span-1">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Asset Status Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={assetStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {assetStatusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-2 justify-center">
              {assetStatusData.map(d => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  {d.name} ({d.value})
                </div>
              ))}
            </div>
          </motion.div>

          {/* Movement Chart */}
          <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="kpi-card lg:col-span-2">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Weekly Asset Movements</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={movementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                <YAxis tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                <Tooltip />
                <Bar dataKey="movements" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Movements */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm text-foreground">Recent Movements</h3>
              <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {movementLogs.slice(0, 4).map(log => (
                <div key={log.id} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRightLeft className="w-4 h-4 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground truncate">{log.assetName}</p>
                    <p className="text-xs text-muted-foreground">{log.fromLocation} → {log.toLocation}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{log.timestamp.split(" ")[1]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Alerts */}
          <motion.div {...fadeIn} transition={{ delay: 0.25 }} className="kpi-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-sm text-foreground">Active Alerts</h3>
              <AlertTriangle className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {alerts.filter(a => !a.acknowledged).map(alert => (
                <div key={alert.id} className="flex items-start gap-3 text-sm">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    alert.severity === "critical" ? "bg-destructive/10" : alert.severity === "warning" ? "bg-warning/10" : "bg-info/10"
                  }`}>
                    {alert.severity === "critical" ? <XCircle className="w-4 h-4 text-destructive" /> :
                     alert.severity === "warning" ? <AlertTriangle className="w-4 h-4 text-warning" /> :
                     <CheckCircle className="w-4 h-4 text-info" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{alert.description}</p>
                  </div>
                  <StatusBadge status={alert.severity} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
