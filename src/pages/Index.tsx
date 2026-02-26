import { Bell, Search, ChevronDown, Users, Calendar, FileText, Activity } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatCard from "@/components/StatCard";
import AppointmentsList from "@/components/AppointmentsList";
import QuickActions from "@/components/QuickActions";
import VitalsPanel from "@/components/VitalsPanel";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Good morning, Alex</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Here's your health overview for today</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border border-input bg-card pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-input bg-card text-muted-foreground transition-colors hover:bg-muted">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">3</span>
            </button>
            <button className="flex items-center gap-2 rounded-lg border border-input bg-card px-3 py-1.5 transition-colors hover:bg-muted">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">A</div>
              <span className="text-sm font-medium text-foreground">Alex</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard icon={Users} label="Total Patients" value="1,284" change="+12%" trend="up" variant="primary" />
          <StatCard icon={Calendar} label="Appointments Today" value="8" change="+2" trend="up" variant="success" />
          <StatCard icon={FileText} label="Pending Records" value="23" change="-5" trend="down" variant="warning" />
          <StatCard icon={Activity} label="Active Prescriptions" value="156" variant="default" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <AppointmentsList />
            <VitalsPanel />
          </div>
          <div>
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
