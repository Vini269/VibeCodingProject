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

const BookAppointmentDialog = ({ open, onClose, onCreated }: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    doctor_name: "",
    specialty: "",
    appointment_date: "",
    appointment_time: "",
    type: "in-person" as "video" | "in-person",
    notes: "",
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const dateTime = new Date(`${form.appointment_date}T${form.appointment_time}`).toISOString();
      const { error } = await supabase.from("appointments" as any).insert({
        user_id: user.id,
        doctor_name: form.doctor_name,
        specialty: form.specialty,
        appointment_date: dateTime,
        type: form.type,
        notes: form.notes || null,
      } as any);
      if (error) throw error;
      toast({ title: "Appointment booked!" });
      onCreated();
      onClose();
      setForm({ doctor_name: "", specialty: "", appointment_date: "", appointment_time: "", type: "in-person", notes: "" });
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
          <h2 className="text-lg font-bold text-card-foreground">Book Appointment</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required placeholder="Doctor name" value={form.doctor_name} onChange={e => setForm(f => ({ ...f, doctor_name: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          <input required placeholder="Specialty" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          <div className="grid grid-cols-2 gap-2">
            <input required type="date" value={form.appointment_date} onChange={e => setForm(f => ({ ...f, appointment_date: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
            <input required type="time" value={form.appointment_time} onChange={e => setForm(f => ({ ...f, appointment_time: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          </div>
          <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as any }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/20">
            <option value="in-person">In-Person</option>
            <option value="video">Video Call</option>
          </select>
          <textarea placeholder="Notes (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 min-h-[60px]" />
          <button type="submit" disabled={loading} className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointmentDialog;
