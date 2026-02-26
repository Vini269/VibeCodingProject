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

const AddPrescriptionDialog = ({ open, onClose, onCreated }: Props) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    medication_name: "", dosage: "", frequency: "", prescriber: "", pharmacy_name: "", notes: "",
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("prescriptions" as any).insert({
        user_id: user.id,
        medication_name: form.medication_name,
        dosage: form.dosage,
        frequency: form.frequency,
        prescriber: form.prescriber,
        pharmacy_name: form.pharmacy_name || null,
        notes: form.notes || null,
      } as any);
      if (error) throw error;
      toast({ title: "Prescription added!" });
      onCreated();
      onClose();
      setForm({ medication_name: "", dosage: "", frequency: "", prescriber: "", pharmacy_name: "", notes: "" });
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
          <h2 className="text-lg font-bold text-card-foreground">Add Prescription</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required placeholder="Medication name" value={form.medication_name} onChange={e => setForm(f => ({ ...f, medication_name: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          <div className="grid grid-cols-2 gap-2">
            <input required placeholder="Dosage (e.g. 500mg)" value={form.dosage} onChange={e => setForm(f => ({ ...f, dosage: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
            <input required placeholder="Frequency (e.g. 2x/day)" value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          </div>
          <input required placeholder="Prescriber (doctor name)" value={form.prescriber} onChange={e => setForm(f => ({ ...f, prescriber: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          <input placeholder="Pharmacy (optional)" value={form.pharmacy_name} onChange={e => setForm(f => ({ ...f, pharmacy_name: e.target.value }))} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20" />
          <button type="submit" disabled={loading} className="flex h-10 w-full items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Prescription"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPrescriptionDialog;
