import { Cpu, Lightbulb, Users } from "lucide-react";

const features = [
  { icon: Cpu, title: "Tech Competitions", desc: "Challenge your skills across 7+ technical and creative events." },
  { icon: Lightbulb, title: "Innovation Hub", desc: "Showcase your projects, ideas, and prototypes to expert panels." },
  { icon: Users, title: "National Talent", desc: "Compete with participants from colleges across the nation." },
];

const AboutSection = () => (
  <section id="about" className="section-padding bg-storm-dark">
    <div className="container mx-auto max-w-5xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">About The Event</h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 font-body">
        Techno-Storm 2K26 is a national-level technical extravaganza organized by the Department of Computer Science & Engineering (Data Science) at KCES College of Engineering and Management, Jalgaon. It's a platform where innovation meets competition — featuring coding challenges, design battles, quizzes, and more.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform group">
            <div className="w-14 h-14 mx-auto mb-4 rounded-xl btn-gradient flex items-center justify-center group-hover:neon-glow transition-shadow">
              <f.icon className="h-7 w-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
