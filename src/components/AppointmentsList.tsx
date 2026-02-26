import { Clock, Video, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const appointments = [
  { id: 1, doctor: "Dr. Sarah Chen", specialty: "Cardiologist", time: "10:30 AM", date: "Today", type: "video" as const, status: "upcoming" as const },
  { id: 2, doctor: "Dr. James Okafor", specialty: "General Physician", time: "2:00 PM", date: "Today", type: "in-person" as const, status: "upcoming" as const },
  { id: 3, doctor: "Dr. Maria Lopez", specialty: "Dermatologist", time: "9:00 AM", date: "Tomorrow", type: "video" as const, status: "scheduled" as const },
  { id: 4, doctor: "Dr. Raj Patel", specialty: "Orthopedic", time: "11:30 AM", date: "Mar 1", type: "in-person" as const, status: "scheduled" as const },
];

const AppointmentsList = () => {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-card-foreground">Upcoming Appointments</h3>
        <button className="text-sm font-medium text-primary hover:underline">View all</button>
      </div>
      <div className="space-y-3">
        {appointments.map((apt, i) => (
          <div
            key={apt.id}
            className={cn(
              "flex items-center gap-4 rounded-lg border border-border/30 p-3.5 transition-colors hover:bg-muted/50 animate-slide-in",
            )}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg shrink-0",
              apt.type === "video" ? "bg-info/10 text-info" : "bg-primary/10 text-primary"
            )}>
              {apt.type === "video" ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-card-foreground truncate">{apt.doctor}</p>
              <p className="text-xs text-muted-foreground">{apt.specialty}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-medium text-card-foreground">{apt.time}</p>
              <div className="flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">{apt.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
