import { ShieldCheck, AlertCircle } from "lucide-react";

const rules = [
  "No copying from templates, themes, or live websites.",
  "Plagiarism will result in instant disqualification.",
  "Allowed technologies: HTML, CSS, JavaScript only.",
  "Use proper color contrast and readable fonts.",
  "Time limit: 1 hour. No extensions.",
  "No late submissions will be accepted.",
  "Participants must present and explain their work to judges.",
];

const RulesSection = () => (
  <section id="rules" className="section-padding bg-storm-dark">
    <div className="container mx-auto max-w-3xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-2 gradient-text">Rules</h2>
      <p className="text-center text-muted-foreground mb-10 font-body">Web UI/UX Design Competition</p>

      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="h-6 w-6 text-neon-cyan" />
          <span className="font-display text-sm font-semibold tracking-wider text-foreground">COMPETITION GUIDELINES</span>
        </div>

        <ul className="space-y-4">
          {rules.map((r, i) => (
            <li key={i} className="flex items-start gap-3">
              <AlertCircle className="h-4 w-4 mt-0.5 text-neon-purple shrink-0" />
              <span className="text-sm text-muted-foreground font-body">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default RulesSection;
