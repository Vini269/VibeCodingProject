import { AlertTriangle, Pill, Heart, Plus, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const actions = [
  { icon: AlertTriangle, label: "Emergency Rx", description: "Request urgent prescription", color: "bg-destructive/10 text-destructive hover:bg-destructive/15" },
  { icon: Pill, label: "Find Pharmacy", description: "Locate nearby pharmacies", color: "bg-primary/10 text-primary hover:bg-primary/15" },
  { icon: Heart, label: "Log Vitals", description: "Update your vital signs", color: "bg-success/10 text-success hover:bg-success/15" },
  { icon: Plus, label: "Book Appointment", description: "Schedule a new visit", color: "bg-info/10 text-info hover:bg-info/15" },
  { icon: Phone, label: "Telehealth", description: "Start a video call", color: "bg-warning/10 text-warning hover:bg-warning/15" },
];

const QuickActions = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <h3 className="text-base font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-2">
        {actions.map((action, i) => (
          <button
            key={action.label}
            className={cn(
              "flex items-center gap-3 rounded-lg p-3 transition-all text-left animate-slide-in",
              action.color
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <action.icon className="h-5 w-5 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{action.label}</p>
              <p className="text-xs opacity-70">{action.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
