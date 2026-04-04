import { Zap, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-8 px-4">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Zap className="h-5 w-5 text-neon-blue" />
        <span className="font-display text-sm font-bold gradient-text">TECHNO-STORM 2K26</span>
      </div>

      <p className="text-xs text-muted-foreground text-center font-body">
        © 2026 KCES College of Engineering & Management, Jalgaon. All rights reserved.
      </p>

      <div className="flex items-center gap-4">
        {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
          <a key={i} href="#" className="text-muted-foreground hover:text-foreground transition-colors">
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
