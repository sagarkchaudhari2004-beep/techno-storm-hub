import { Phone, Mail } from "lucide-react";

const coordinators = [
  { name: "Prof. Rahul Patil", role: "Faculty Coordinator", phone: "+91 98765 43210", email: "rahul.patil@kces.edu" },
  { name: "Sneha Deshmukh", role: "Student Coordinator", phone: "+91 87654 32109", email: "sneha.d@kces.edu" },
  { name: "Amit Joshi", role: "Student Coordinator", phone: "+91 76543 21098", email: "amit.j@kces.edu" },
];

const ContactSection = () => (
  <section id="contact" className="section-padding">
    <div className="container mx-auto max-w-4xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">Contact Us</h2>
      <p className="text-center text-muted-foreground mb-10 font-body">Reach out for queries or assistance</p>

      <div className="grid md:grid-cols-3 gap-5">
        {coordinators.map((c) => (
          <div key={c.name} className="glass-card rounded-xl p-5 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full btn-gradient flex items-center justify-center">
              <span className="font-display text-lg font-bold text-primary-foreground">{c.name[0]}</span>
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground">{c.name}</h3>
            <p className="text-xs text-neon-cyan mb-3">{c.role}</p>
            <div className="space-y-1 text-xs text-muted-foreground font-body">
              <p className="flex items-center justify-center gap-1"><Phone className="h-3 w-3" /> {c.phone}</p>
              <p className="flex items-center justify-center gap-1"><Mail className="h-3 w-3" /> {c.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ContactSection;
