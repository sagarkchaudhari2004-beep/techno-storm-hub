import { AlertTriangle, ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-80" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[120px] animate-float" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Postponed notice */}
        <div className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 mb-8 animate-fade-in border border-destructive/30">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <span className="text-sm font-semibold text-destructive">
            POSTPONED: 24 March → 6 April 2026
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <span className="gradient-text">TECHNO-STORM</span>
          <br />
          <span className="text-foreground text-3xl md:text-5xl lg:text-6xl font-bold">2K26</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-2 animate-fade-in font-body" style={{ animationDelay: "0.2s" }}>
          National Level Technical Event
        </p>
        <p className="text-sm text-muted-foreground mb-8 animate-fade-in font-body" style={{ animationDelay: "0.3s" }}>
          Department of CSE (Data Science) &bull; KCES COEM, Jalgaon
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <a
            href="#register"
            className="btn-gradient px-8 py-3 rounded-lg font-display text-sm font-bold tracking-wider text-primary-foreground neon-glow hover:scale-105 transition-transform flex items-center gap-2"
          >
            Register Now <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#events"
            className="px-8 py-3 rounded-lg font-display text-sm font-bold tracking-wider border border-border text-foreground hover:bg-muted/30 transition-colors"
          >
            Explore Events
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div>
            <p className="font-display text-2xl md:text-3xl font-bold text-neon-cyan">₹50K+</p>
            <p className="text-xs text-muted-foreground">In Rewards</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="font-display text-2xl md:text-3xl font-bold text-neon-blue">7+</p>
            <p className="text-xs text-muted-foreground">Events</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="font-display text-2xl md:text-3xl font-bold text-neon-purple">1 Day</p>
            <p className="text-xs text-muted-foreground">Of Innovation</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
