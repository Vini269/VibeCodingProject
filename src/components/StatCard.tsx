import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary/5 stat-glow",
  success: "bg-success/5",
  warning: "bg-warning/5",
  destructive: "bg-destructive/5",
};

const iconVariants = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  destructive: "bg-destructive/10 text-destructive",
};

const StatCard = ({ icon: Icon, label, value, change, trend, variant = "default" }: StatCardProps) => {
  return (
    <div className={cn("rounded-xl border border-border/50 p-5 transition-shadow hover:shadow-md animate-slide-in", variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconVariants[variant])}>
          <Icon className="h-5 w-5" />
        </div>
        {change && (
          <span className={cn("text-xs font-medium rounded-full px-2 py-0.5",
            trend === "up" ? "bg-success/10 text-success" :
            trend === "down" ? "bg-destructive/10 text-destructive" :
            "bg-muted text-muted-foreground"
          )}>
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;
