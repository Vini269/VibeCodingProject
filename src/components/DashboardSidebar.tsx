import { LayoutDashboard, Calendar, FileText, Pill, Heart, AlertTriangle, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Patient Records" },
  { icon: Calendar, label: "Appointments" },
  { icon: AlertTriangle, label: "Emergency Rx" },
  { icon: Pill, label: "Pharmacy" },
  { icon: Heart, label: "Vitals" },
];

const bottomItems = [
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

const DashboardSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
          <Heart className="h-5 w-5 text-sidebar-primary-foreground" fill="currentColor" />
        </div>
        <span className="text-lg font-bold tracking-tight text-sidebar-primary-foreground">
          HealthSphere
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 pt-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              item.active
                ? "bg-sidebar-accent text-sidebar-primary"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="space-y-1 border-t border-sidebar-border px-3 py-4">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <item.icon className="h-[18px] w-[18px]" />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
