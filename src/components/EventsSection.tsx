import { Code, Palette, HelpCircle, FileText, Presentation, Gamepad2, CircuitBoard } from "lucide-react";

const events = [
  { icon: Code, name: "Software Build", sub: "Mini Model Challenge", fee: "₹100/team", desc: "Build a working software prototype within the given time." },
  { icon: Palette, name: "Web UI/UX Design", sub: "", fee: "₹50/person", desc: "Design stunning, responsive web interfaces from scratch." },
  { icon: HelpCircle, name: "Technical Quiz", sub: "Rapid Questions", fee: "₹50/person", desc: "Test your tech knowledge in a fast-paced quiz showdown." },
  { icon: FileText, name: "Poster Presentation", sub: "", fee: "₹100/team", desc: "Present innovative ideas through visually compelling posters." },
  { icon: Presentation, name: "Paper Presentation", sub: "", fee: "₹100/team", desc: "Present your research papers before an expert panel." },
  { icon: Gamepad2, name: "Blind Cricket", sub: "Games", fee: "₹150/team", desc: "A fun twist on cricket — play blindfolded and trust your team!" },
  { icon: CircuitBoard, name: "Circuit Hunt", sub: "", fee: "₹100/team", desc: "Solve clues and hunt down circuit components across campus." },
];

const EventsSection = () => (
  <section id="events" className="section-padding">
    <div className="container mx-auto max-w-6xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">Events</h2>
      <p className="text-center text-muted-foreground mb-12 font-body">Compete. Create. Conquer.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {events.map((e) => (
          <div
            key={e.name}
            className="glass-card rounded-xl p-5 group hover:scale-[1.03] hover:neon-glow transition-all duration-300 flex flex-col"
          >
            <div className="w-12 h-12 rounded-lg btn-gradient flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
              <e.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground mb-1">{e.name}</h3>
            {e.sub && <p className="text-xs text-neon-cyan font-medium mb-2">{e.sub}</p>}
            <p className="text-sm text-muted-foreground font-body flex-1 mb-3">{e.desc}</p>
            <span className="inline-block text-xs font-bold font-display text-neon-purple bg-neon-purple/10 rounded-full px-3 py-1 self-start">
              {e.fee}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EventsSection;
