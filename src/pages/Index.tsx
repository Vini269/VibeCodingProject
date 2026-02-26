import { useState, useEffect } from "react";
import { Bell, Search, ChevronDown, Users, Calendar, FileText, Activity, LogOut } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";
import AppointmentsList from "@/components/AppointmentsList";
import QuickActions from "@/components/QuickActions";
import VitalsPanel from "@/components/VitalsPanel";
import BookAppointmentDialog from "@/components/BookAppointmentDialog";
import LogVitalsDialog from "@/components/LogVitalsDialog";
import AddPrescriptionDialog from "@/components/AddPrescriptionDialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { user, signOut } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showBookAppt, setShowBookAppt] = useState(false);
  const [showLogVitals, setShowLogVitals] = useState(false);
  const [showAddRx, setShowAddRx] = useState(false);
  const [stats, setStats] = useState({ appointments: 0, records: 0, prescriptions: 0 });

  const refresh = () => setRefreshKey(k => k + 1);

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email?.split("@")[0] || "User";

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const [appts, records, rxs] = await Promise.all([
        supabase.from("appointments" as any).select("id", { count: "exact", head: true }).eq("user_id", user.id).gte("appointment_date", new Date().toISOString()),
        supabase.from("patient_records" as any).select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("prescriptions" as any).select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("is_active", true),
      ]);
      setStats({
        appointments: appts.count ?? 0,
        records: records.count ?? 0,
        prescriptions: rxs.count ?? 0,
      });
    };
    fetchStats();
  }, [user, refreshKey]);

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 flex-1 p-8">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning, {displayName}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Here's your health overview for today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search..." className="h-9 w-64 rounded-lg border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
            </div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:bg-muted">
              <Bell className="h-4 w-4" />
            </button>
            <button onClick={signOut} className="flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive" title="Sign out">
              <LogOut className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-foreground">{displayName}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard icon={Calendar} label="Upcoming Appointments" value={stats.appointments.toString()} variant="success" />
          <StatCard icon={FileText} label="Medical Records" value={stats.records.toString()} variant="warning" />
          <StatCard icon={Activity} label="Active Prescriptions" value={stats.prescriptions.toString()} variant="primary" />
          <StatCard icon={Users} label="Total Entries" value={(stats.appointments + stats.records + stats.prescriptions).toString()} variant="default" />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <AppointmentsList refreshKey={refreshKey} />
            <VitalsPanel refreshKey={refreshKey} />
          </div>
          <div>
            <QuickActions onBookAppointment={() => setShowBookAppt(true)} onLogVitals={() => setShowLogVitals(true)} onAddPrescription={() => setShowAddRx(true)} />
          </div>
        </div>
      </main>

      <BookAppointmentDialog open={showBookAppt} onClose={() => setShowBookAppt(false)} onCreated={refresh} />
      <LogVitalsDialog open={showLogVitals} onClose={() => setShowLogVitals(false)} onCreated={refresh} />
      <AddPrescriptionDialog open={showAddRx} onClose={() => setShowAddRx(false)} onCreated={refresh} />
    </div>
  );
};

export default Index;
