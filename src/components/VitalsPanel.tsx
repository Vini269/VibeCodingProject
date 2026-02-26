import { useEffect, useState } from "react";
import { Activity, Droplets, Thermometer, Wind } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface VitalRecord {
  heart_rate: number | null;
  blood_pressure_systolic: number | null;
  blood_pressure_diastolic: number | null;
  temperature: number | null;
  spo2: number | null;
  recorded_at: string;
}

interface Props {
  refreshKey?: number;
}

const VitalsPanel = ({ refreshKey }: Props) => {
  const { user } = useAuth();
  const [latest, setLatest] = useState<VitalRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("vitals" as any)
        .select("*")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      setLatest(data as any as VitalRecord | null);
      setLoading(false);
    };
    fetch();
  }, [user, refreshKey]);

  const vitals = latest ? [
    { icon: Activity, label: "Heart Rate", value: latest.heart_rate?.toString() ?? "--", unit: "bpm", status: "normal" as const },
    { icon: Droplets, label: "Blood Pressure", value: latest.blood_pressure_systolic && latest.blood_pressure_diastolic ? `${latest.blood_pressure_systolic}/${latest.blood_pressure_diastolic}` : "--", unit: "mmHg", status: "normal" as const },
    { icon: Thermometer, label: "Temperature", value: latest.temperature?.toString() ?? "--", unit: "°F", status: "normal" as const },
    { icon: Wind, label: "SpO2", value: latest.spo2?.toString() ?? "--", unit: "%", status: "normal" as const },
  ] : [
    { icon: Activity, label: "Heart Rate", value: "--", unit: "bpm", status: "normal" as const },
    { icon: Droplets, label: "Blood Pressure", value: "--", unit: "mmHg", status: "normal" as const },
    { icon: Thermometer, label: "Temperature", value: "--", unit: "°F", status: "normal" as const },
    { icon: Wind, label: "SpO2", value: "--", unit: "%", status: "normal" as const },
  ];

  const statusColors = { normal: "text-success", warning: "text-warning", critical: "text-destructive" };

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">Latest Vitals</h3>
        <span className="text-xs text-muted-foreground">
          {latest ? `Updated ${formatDistanceToNow(new Date(latest.recorded_at))} ago` : "No data yet"}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {vitals.map((vital, i) => (
          <div key={vital.label} className="rounded-lg border border-border/30 p-3 animate-slide-in" style={{ animationDelay: `${i * 80}ms` }}>
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
