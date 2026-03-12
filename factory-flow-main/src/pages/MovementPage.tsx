import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { movementLogs as initialLogs, assets, employees } from "@/data/mockData";
import { MovementLog } from "@/types/factory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function MovementPage() {
  const [logs, setLogs] = useState<MovementLog[]>(initialLogs);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ assetId: "", fromLocation: "", toLocation: "", movedBy: "", reason: "" });

  const filtered = logs.filter(l =>
    l.assetName.toLowerCase().includes(search.toLowerCase()) || l.movedBy.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const asset = assets.find(a => a.id === form.assetId);
    const newLog: MovementLog = {
      id: `MOV-${String(logs.length + 1).padStart(3, "0")}`,
      assetId: form.assetId,
      assetName: asset?.name || form.assetId,
      fromLocation: form.fromLocation,
      toLocation: form.toLocation,
      movedBy: form.movedBy,
      timestamp: new Date().toLocaleString(),
      reason: form.reason,
    };
    setLogs([newLog, ...logs]);
    setForm({ assetId: "", fromLocation: "", toLocation: "", movedBy: "", reason: "" });
    setDialogOpen(false);
    toast.success("Movement tracked successfully");
  };

  return (
    <>
      <AppHeader title="Movement Tracking" subtitle="Track asset movements across factory locations" />
      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search movements..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">
                <Plus className="w-4 h-4 mr-2" /> Track Movement
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">Track Asset Movement</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-3 mt-2">
                <Select value={form.assetId} onValueChange={v => setForm({ ...form, assetId: v })}>
                  <SelectTrigger><SelectValue placeholder="Select Asset" /></SelectTrigger>
                  <SelectContent>
                    {assets.map(a => <SelectItem key={a.id} value={a.id}>{a.name} ({a.id})</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="From Location" required value={form.fromLocation} onChange={e => setForm({ ...form, fromLocation: e.target.value })} />
                <Input placeholder="To Location" required value={form.toLocation} onChange={e => setForm({ ...form, toLocation: e.target.value })} />
                <Select value={form.movedBy} onValueChange={v => setForm({ ...form, movedBy: v })}>
                  <SelectTrigger><SelectValue placeholder="Moved By" /></SelectTrigger>
                  <SelectContent>
                    {employees.map(e => <SelectItem key={e.id} value={e.name}>{e.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Reason" required value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} />
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">Track Movement</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Asset</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">From</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">To</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Moved By</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Reason</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(log => (
                  <tr key={log.id} className="data-table-row border-b border-border last:border-0">
                    <td className="p-3 font-mono text-xs text-muted-foreground">{log.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <ArrowRightLeft className="w-4 h-4 text-accent" />
                        <span className="font-medium text-foreground">{log.assetName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{log.fromLocation}</td>
                    <td className="p-3 text-muted-foreground">{log.toLocation}</td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">{log.movedBy}</td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">{log.reason}</td>
                    <td className="p-3 text-xs text-muted-foreground">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
}
