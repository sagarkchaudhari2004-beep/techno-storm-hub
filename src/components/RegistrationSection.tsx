import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const eventOptions = [
  "Software Build",
  "Web UI/UX Design",
  "Technical Quiz",
  "Poster Presentation",
  "Paper Presentation",
  "Blind Cricket",
  "Circuit Hunt",
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().regex(/^\d{10}$/, "Enter a valid 10-digit number"),
  college: z.string().trim().min(1, "College name is required").max(200),
  event: z.string().min(1, "Select an event"),
});

type FormData = z.infer<typeof schema>;

const RegistrationSection = () => {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", college: "", event: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof FormData;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    // Store temporarily
    const existing = JSON.parse(localStorage.getItem("ts_registrations") || "[]");
    existing.push(result.data);
    localStorage.setItem("ts_registrations", JSON.stringify(existing));
    toast.success("Registration successful! 🎉");
    setForm({ name: "", email: "", phone: "", college: "", event: "" });
    setErrors({});
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-muted/40 border ${errors[field] ? "border-destructive" : "border-border"} rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body`;

  return (
    <section id="register" className="section-padding">
      <div className="container mx-auto max-w-lg">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">Register</h2>
        <p className="text-center text-muted-foreground mb-10 font-body">Grab your spot now!</p>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-5">
          {(["name", "email", "phone", "college"] as const).map((field) => (
            <div key={field}>
              <input
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={{ name: "Full Name", email: "Email Address", phone: "Phone Number", college: "College Name" }[field]}
                className={inputClass(field)}
              />
              {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div>
            <select name="event" value={form.event} onChange={handleChange} className={inputClass("event")}>
              <option value="">Select Event</option>
              {eventOptions.map((ev) => (
                <option key={ev} value={ev}>{ev}</option>
              ))}
            </select>
            {errors.event && <p className="text-xs text-destructive mt-1">{errors.event}</p>}
          </div>

          <button
            type="submit"
            className="w-full btn-gradient py-3 rounded-lg font-display text-sm font-bold tracking-wider text-primary-foreground neon-glow hover:scale-[1.02] transition-transform"
          >
            Submit Registration
          </button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationSection;
