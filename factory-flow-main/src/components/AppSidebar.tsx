import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Package, Users, ArrowRightLeft, MessageSquare, 
  Activity, BarChart3, Bell, Settings, Factory, ChevronLeft, ChevronRight 
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Assets", path: "/assets", icon: Package },
  { label: "Employees", path: "/employees", icon: Users },
  { label: "Movement", path: "/movement", icon: ArrowRightLeft },
  { label: "Communication", path: "/communication", icon: MessageSquare },
  { label: "KPI Monitor", path: "/kpi", icon: Activity },
  { label: "Reports", path: "/reports", icon: BarChart3 },
  { label: "Alerts", path: "/alerts", icon: Bell },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside className={cn(
      "h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300 sticky top-0",
      collapsed ? "w-[68px]" : "w-[240px]"
    )}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
          <Factory className="w-4 h-4 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-sidebar-accent-foreground text-sm tracking-wide">
            FactoryOS
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn("nav-item", isActive && "nav-item-active")}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item w-full justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
