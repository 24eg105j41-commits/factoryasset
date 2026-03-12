import { AppHeader } from "@/components/AppHeader";
import { assets, employees, movementLogs, messages } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const assetsByType = assets.reduce((acc, a) => {
  acc[a.type] = (acc[a.type] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const assetTypeData = Object.entries(assetsByType).map(([name, count]) => ({ name, count }));

const empByDept = employees.reduce((acc, e) => {
  acc[e.department] = (acc[e.department] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const deptData = Object.entries(empByDept).map(([name, count]) => ({ name, count }));

const movementTrend = [
  { date: "Mar 5", count: 3 }, { date: "Mar 6", count: 5 }, { date: "Mar 7", count: 4 },
  { date: "Mar 8", count: 7 }, { date: "Mar 9", count: 6 }, { date: "Mar 10", count: 8 },
  { date: "Mar 11", count: 12 },
];

type ReportTab = "assets" | "employees" | "movements" | "communication";

export default function ReportsPage() {
  const [tab, setTab] = useState<ReportTab>("assets");

  return (
    <>
      <AppHeader title="Reports & Analytics" subtitle="Data-driven insights and report generation" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Select value={tab} onValueChange={v => setTab(v as ReportTab)}>
            <SelectTrigger className="w-48 bg-card"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="assets">Asset Reports</SelectItem>
              <SelectItem value="employees">Employee Reports</SelectItem>
              <SelectItem value="movements">Movement History</SelectItem>
              <SelectItem value="communication">Communication Logs</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="rounded-lg">
            <FileText className="w-4 h-4 mr-2" /> Generate Report
          </Button>
        </div>

        {tab === "assets" && (
          <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="kpi-card">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Assets by Type</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={assetTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(199, 89%, 48%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="kpi-card">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Asset Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div><p className="text-2xl font-display font-bold text-foreground">{assets.length}</p><p className="text-xs text-muted-foreground">Total Assets</p></div>
                <div><p className="text-2xl font-display font-bold text-success">{assets.filter(a => a.status === "Active").length}</p><p className="text-xs text-muted-foreground">Active</p></div>
                <div><p className="text-2xl font-display font-bold text-warning">{assets.filter(a => a.status === "Maintenance").length}</p><p className="text-xs text-muted-foreground">Maintenance</p></div>
                <div><p className="text-2xl font-display font-bold text-destructive">{assets.filter(a => a.status === "Missing").length}</p><p className="text-xs text-muted-foreground">Missing</p></div>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "employees" && (
          <motion.div key="employees" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="kpi-card">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Employees by Department</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={deptData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(215, 50%, 18%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}

        {tab === "movements" && (
          <motion.div key="movements" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="kpi-card">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Movement Trend (Last 7 Days)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={movementTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 25%, 88%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(215, 15%, 50%)" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="hsl(199, 89%, 48%)" strokeWidth={2} dot={{ r: 4, fill: "hsl(199, 89%, 48%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="kpi-card">
              <h3 className="font-display font-semibold text-sm text-foreground mb-4">Recent Movement Log</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground font-medium">Asset</th>
                    <th className="text-left p-2 text-muted-foreground font-medium">From → To</th>
                    <th className="text-left p-2 text-muted-foreground font-medium">By</th>
                    <th className="text-left p-2 text-muted-foreground font-medium">Time</th>
                  </tr></thead>
                  <tbody>
                    {movementLogs.map(l => (
                      <tr key={l.id} className="data-table-row border-b border-border last:border-0">
                        <td className="p-2 font-medium text-foreground">{l.assetName}</td>
                        <td className="p-2 text-muted-foreground">{l.fromLocation} → {l.toLocation}</td>
                        <td className="p-2 text-muted-foreground">{l.movedBy}</td>
                        <td className="p-2 text-xs text-muted-foreground">{l.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {tab === "communication" && (
          <motion.div key="communication" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="kpi-card">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4">Communication Log</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border">
                  <th className="text-left p-2 text-muted-foreground font-medium">From</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">To</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Subject</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Priority</th>
                  <th className="text-left p-2 text-muted-foreground font-medium">Time</th>
                </tr></thead>
                <tbody>
                  {messages.map(m => (
                    <tr key={m.id} className="data-table-row border-b border-border last:border-0">
                      <td className="p-2 font-medium text-foreground">{m.from}</td>
                      <td className="p-2 text-muted-foreground">{m.to}</td>
                      <td className="p-2 text-muted-foreground">{m.subject}</td>
                      <td className="p-2"><span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${m.priority === "high" ? "status-red" : m.priority === "medium" ? "status-yellow" : "bg-muted text-muted-foreground"}`}>{m.priority}</span></td>
                      <td className="p-2 text-xs text-muted-foreground">{m.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
