import { useEffect, useState } from "react";
import { Clock, Video, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { format, isToday, isTomorrow } from "date-fns";

interface Appointment {
  id: string;
  doctor_name: string;
  specialty: string;
  appointment_date: string;
  type: string;
  status: string;
}

interface Props {
  refreshKey?: number;
}

const AppointmentsList = ({ refreshKey }: Props) => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("appointments" as any)
        .select("*")
        .eq("user_id", user.id)
        .gte("appointment_date", new Date().toISOString())
        .order("appointment_date", { ascending: true })
        .limit(5);
      setAppointments((data as any as Appointment[]) || []);
      setLoading(false);
    };
    fetch();
  }, [user, refreshKey]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isToday(d)) return "Today";
    if (isTomorrow(d)) return "Tomorrow";
    return format(d, "MMM d");
  };

  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">Upcoming Appointments</h3>
      </div>
      <div className="space-y-3">
        {loading ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No upcoming appointments</p>
        ) : (
          appointments.map((apt, i) => (
            <div
              key={apt.id}
              className="flex items-center gap-4 rounded-lg border border-border/30 p-3.5 transition-colors hover:bg-muted/50 animate-slide-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
                apt.type === "video" ? "bg-info/10 text-info" : "bg-primary/10 text-primary"
              )}>
                {apt.type === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground truncate">{apt.doctor_name}</p>
                <p className="text-xs text-muted-foreground">{apt.specialty}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-medium text-card-foreground">{format(new Date(apt.appointment_date), "h:mm a")}</p>
                <div className="flex items-center gap-1 justify-end">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">{formatDate(apt.appointment_date)}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentsList;
