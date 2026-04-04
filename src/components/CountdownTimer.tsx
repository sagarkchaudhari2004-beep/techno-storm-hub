import { useState, useEffect } from "react";

const TARGET = new Date("2026-04-06T09:00:00+05:30").getTime();

const CountdownTimer = () => {
  const [diff, setDiff] = useState(TARGET - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(TARGET - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const isOver = diff <= 0;
  const d = isOver ? 0 : Math.floor(diff / 86400000);
  const h = isOver ? 0 : Math.floor((diff % 86400000) / 3600000);
  const m = isOver ? 0 : Math.floor((diff % 3600000) / 60000);
  const s = isOver ? 0 : Math.floor((diff % 60000) / 1000);

  const blocks = [
    { label: "Days", value: d },
    { label: "Hours", value: h },
    { label: "Minutes", value: m },
    { label: "Seconds", value: s },
  ];

  return (
    <section className="section-padding bg-storm-dark">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 gradient-text">
          {isOver ? "Event Has Started!" : "Countdown to Techno-Storm"}
        </h2>
        <p className="text-sm text-muted-foreground mb-8 font-body">6 April 2026 &bull; 9:00 AM IST</p>

        <div className="flex justify-center gap-4 md:gap-6">
          {blocks.map((b) => (
            <div key={b.label} className="glass-card rounded-xl px-4 py-5 md:px-6 md:py-6 min-w-[70px] neon-glow-sm">
              <p className="font-display text-3xl md:text-5xl font-black text-foreground">
                {String(b.value).padStart(2, "0")}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-body">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;
