import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { employees as initialEmployees } from "@/data/mockData";
import { Employee } from "@/types/factory";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Plus, Users, Mail, Phone, Edit } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function EmployeesPage() {
  const [empList, setEmpList] = useState<Employee[]>(initialEmployees);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", department: "", role: "", email: "", phone: "" });

  const filtered = empList.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) || e.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: `EMP-${String(empList.length + 1).padStart(3, "0")}`,
      ...form,
      assignedAssets: 0,
    };
    setEmpList([...empList, newEmp]);
    setForm({ name: "", department: "", role: "", email: "", phone: "" });
    setDialogOpen(false);
    toast.success("Employee registered successfully");
  };

  return (
    <>
      <AppHeader title="Employee Management" subtitle="Manage factory personnel and assignments" />
      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search employees..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">
                <Plus className="w-4 h-4 mr-2" /> Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">Register New Employee</DialogTitle></DialogHeader>
              <form onSubmit={handleAdd} className="space-y-3 mt-2">
                <Input placeholder="Full Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Department" required value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} />
                <Input placeholder="Role" required value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                <Input placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">Register Employee</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(emp => (
            <div key={emp.id} className="kpi-card">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-3.5 h-3.5" /></Button>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="inline-flex px-2 py-0.5 rounded-md bg-secondary text-xs font-medium text-secondary-foreground">{emp.department}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" /> {emp.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-3.5 h-3.5" /> {emp.phone}
                </div>
                <p className="text-xs text-muted-foreground">Assigned Assets: <span className="font-semibold text-foreground">{emp.assignedAssets}</span></p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
