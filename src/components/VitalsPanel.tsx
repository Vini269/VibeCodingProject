import { Activity, Droplets, Thermometer, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const vitals = [
  { icon: Activity, label: "Heart Rate", value: "72", unit: "bpm", status: "normal" as const },
  { icon: Droplets, label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "normal" as const },
  { icon: Thermometer, label: "Temperature", value: "98.6", unit: "°F", status: "normal" as const },
  { icon: Wind, label: "SpO2", value: "98", unit: "%", status: "normal" as const },
];

const statusColors = {
  normal: "text-success",
  warning: "text-warning",
  critical: "text-destructive",
};

const VitalsPanel = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">Latest Vitals</h3>
        <span className="text-xs text-muted-foreground">Updated 2h ago</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {vitals.map((vital, i) => (
          <div
            key={vital.label}
            className="rounded-lg border border-border/30 p-3 animate-slide-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <vital.icon className={cn("h-4 w-4", statusColors[vital.status])} />
              <span className="text-xs text-muted-foreground">{vital.label}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-card-foreground">{vital.value}</span>
              <span className="text-xs text-muted-foreground">{vital.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VitalsPanel;
