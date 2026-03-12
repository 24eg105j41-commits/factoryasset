import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { messages as initialMessages, employees } from "@/data/mockData";
import { Message } from "@/types/factory";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Send, MessageSquare, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function CommunicationPage() {
  const [msgList, setMsgList] = useState<Message[]>(initialMessages);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ to: "", subject: "", body: "", priority: "medium" as "high" | "medium" | "low" });

  const filtered = msgList.filter(m =>
    m.subject.toLowerCase().includes(search.toLowerCase()) || m.from.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: Message = {
      id: `MSG-${String(msgList.length + 1).padStart(3, "0")}`,
      from: "Admin",
      to: form.to,
      department: "Admin",
      subject: form.subject,
      body: form.body,
      timestamp: new Date().toLocaleString(),
      read: false,
      priority: form.priority,
    };
    setMsgList([newMsg, ...msgList]);
    setForm({ to: "", subject: "", body: "", priority: "medium" });
    setDialogOpen(false);
    toast.success("Message sent successfully");
  };

  return (
    <>
      <AppHeader title="Communication" subtitle="Internal messaging and department communication" />
      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 bg-card" />
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle className="font-display">Send Message</DialogTitle></DialogHeader>
              <form onSubmit={handleSend} className="space-y-3 mt-2">
                <Select value={form.to} onValueChange={v => setForm({ ...form, to: v })}>
                  <SelectTrigger><SelectValue placeholder="Send To" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Departments">All Departments</SelectItem>
                    {employees.map(e => <SelectItem key={e.id} value={e.name}>{e.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Subject" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                <Textarea placeholder="Message body..." required value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={4} />
                <Select value={form.priority} onValueChange={v => setForm({ ...form, priority: v as "high" | "medium" | "low" })}>
                  <SelectTrigger><SelectValue placeholder="Priority" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-lg">Send Message</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {filtered.map(msg => (
            <div key={msg.id} className={`kpi-card ${!msg.read ? "border-l-4 border-l-accent" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MessageSquare className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-foreground">{msg.subject}</span>
                      <StatusBadge status={msg.priority} />
                      {!msg.read && <Circle className="w-2 h-2 fill-accent text-accent" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{msg.body}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span>From: <span className="font-medium text-foreground">{msg.from}</span></span>
                      <span>To: {msg.to}</span>
                      <span>{msg.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
}
