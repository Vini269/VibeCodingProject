import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

const LogVitalsDialog = ({ open, onClose, onCreated }: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    heart_rate: "",
    bp_systolic: "",
    bp_diastolic: "",
    temperature: "",
    spo2: "",
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("vitals" as any).insert({
        user_id: user.id,
        heart_rate: form.heart_rate ? parseInt(form.heart_rate) : null,
        blood_pressure_systolic: form.bp_systolic ? parseInt(form.bp_systolic) : null,
        blood_pressure_diastolic: form.bp_diastolic ? parseInt(form.bp_diastolic) : null,
        temperature: form.temperature ? parseFloat(form.temperature) : null,
        spo2: form.spo2 ? parseInt(form.spo2) : null,
      } as any);
      if (error) throw error;
      toast({ title: "Vitals logged!" });
      onCreated();
      onClose();
      setForm({ heart_rate: "", bp_systolic: "", bp_diastolic: "", temperature: "", spo2: "" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-card border border-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-card-foreground">Log Vitals</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="Heart rate (bpm)" value={form.heart_rate} onChange={e => setForm(f => ({ ...f, heart_rate: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
            <input type="number" placeholder="SpO2 (%)" value={form.spo2} onChange={e => setForm(f => ({ ...f, spo2: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input type="number" placeholder="BP Systolic" value={form.bp_systolic} onChange={e => setForm(f => ({ ...f, bp_systolic: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
            <input type="number" placeholder="BP Diastolic" value={form.bp_diastolic} onChange={e => setForm(f => ({ ...f, bp_diastolic: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          </div>
          <input type="number" step="0.1" placeholder="Temperature (°F)" value={form.temperature} onChange={e => setForm(f => ({ ...f, temperature: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          <button type="submit" disabled={loading} className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log Vitals"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogVitalsDialog;
