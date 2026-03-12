import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { assets as initialAssets } from "@/data/mockData";
import { Asset, AssetStatus } from "@/types/factory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Package, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function AssetsPage() {
  const [assetList, setAssetList] = useState<Asset[]>(initialAssets);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "", serialNumber: "", location: "", assignedTo: "", value: "" });

  const filtered = assetList.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsset: Asset = {
      id: `AST-${String(assetList.length + 1).padStart(3, "0")}`,
      name: form.name,
      type: form.type,
      serialNumber: form.serialNumber,
      location: form.location,
      status: "Active",
      assignedTo: form.assignedTo || "Unassigned",
      lastMoved: new Date().toISOString().split("T")[0],
      value: Number(form.value) || 0,
    };
    setAssetList([...assetList, newAsset]);
    setForm({ name: "", type: "", serialNumber: "", location: "", assignedTo: "", value: "" });
    setDialogOpen(false);
    toast.success("Asset registered successfully");
  };

  return (
    <>
      <AppHeader title="Asset Management" subtitle="Register, track, and monitor all factory assets" />
      <div className="p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex gap-3 flex-1 w-full sm:w-auto">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search assets..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 bg-card"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Idle">Idle</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Missing">Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">
                <Plus className="w-4 h-4 mr-2" /> Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">Register New Asset</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-3 mt-2">
                <Input placeholder="Asset Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Type (Machinery, Vehicle...)" required value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
                <Input placeholder="Serial Number" required value={form.serialNumber} onChange={e => setForm({ ...form, serialNumber: e.target.value })} />
                <Input placeholder="Location" required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                <Input placeholder="Assigned To" value={form.assignedTo} onChange={e => setForm({ ...form, assignedTo: e.target.value })} />
                <Input placeholder="Value ($)" type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} />
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">Register Asset</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Type</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Location</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden lg:table-cell">Assigned To</th>
                  <th className="text-left p-3 font-medium text-muted-foreground hidden md:table-cell">Value</th>
                  <th className="text-left p-3 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(asset => (
                  <tr key={asset.id} className="data-table-row border-b border-border last:border-0">
                    <td className="p-3 font-mono text-xs text-muted-foreground">{asset.id}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-accent" />
                        <span className="font-medium text-foreground">{asset.name}</span>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">{asset.type}</td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">{asset.location}</td>
                    <td className="p-3"><StatusBadge status={asset.status} /></td>
                    <td className="p-3 hidden lg:table-cell text-muted-foreground">{asset.assignedTo}</td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground">${asset.value.toLocaleString()}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </td>
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
