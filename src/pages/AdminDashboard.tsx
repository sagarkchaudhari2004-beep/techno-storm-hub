import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, Trophy, School, LogOut, Download, BarChart2,
  TrendingUp, Search, ChevronUp, ChevronDown, Zap,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

interface Registration {
  name: string;
  email: string;
  phone: string;
  college: string;
  event: string;
}

const EVENT_COLORS = [
  "#7c3aed", "#0ea5e9", "#a855f7", "#06b6d4",
  "#8b5cf6", "#22d3ee", "#6366f1", "#38bdf8",
];

type SortKey = keyof Registration;
type SortDir = "asc" | "desc";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [activeTab, setActiveTab] = useState<"overview" | "registrations">("overview");

  useEffect(() => {
    if (sessionStorage.getItem("ts_admin_auth") !== "true") {
      navigate("/");
      return;
    }
    const data: Registration[] = JSON.parse(
      localStorage.getItem("ts_registrations") || "[]"
    );
    setRegistrations(data);
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("ts_admin_auth");
    navigate("/");
  };

  // --- Derived statistics ---
  const eventStats = useMemo(() => {
    const counts: Record<string, number> = {};
    registrations.forEach((r) => {
      counts[r.event] = (counts[r.event] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([event, count]) => ({ event, count }))
      .sort((a, b) => b.count - a.count);
  }, [registrations]);

  const collegeStats = useMemo(() => {
    const counts: Record<string, number> = {};
    registrations.forEach((r) => {
      const key = r.college.trim() || "Unknown";
      counts[key] = (counts[key] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([college, count]) => ({ college, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [registrations]);

  const mostPopularEvent = eventStats[0]?.event ?? "—";
  const uniqueColleges = useMemo(
    () => new Set(registrations.map((r) => r.college.trim())).size,
    [registrations]
  );

  // --- Table ---
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return registrations.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.college.toLowerCase().includes(q) ||
        r.event.toLowerCase().includes(q)
    );
  }, [registrations, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const va = a[sortKey].toLowerCase();
      const vb = b[sortKey].toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [filtered, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey === k ? (
      sortDir === "asc" ? <ChevronUp className="h-3 w-3 inline ml-1" /> : <ChevronDown className="h-3 w-3 inline ml-1" />
    ) : null;

  // --- CSV Export ---
  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "College", "Event"];
    const rows = registrations.map((r) =>
      [r.name, r.email, r.phone, r.college, r.event]
        .map((v) => `"${v.replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `techno-storm-registrations-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statCards = [
    {
      icon: Users,
      label: "Total Registrations",
      value: registrations.length,
      color: "hsl(250, 85%, 65%)",
      glow: "hsla(250, 85%, 65%, 0.3)",
    },
    {
      icon: Trophy,
      label: "Most Popular Event",
      value: mostPopularEvent,
      color: "hsl(200, 90%, 50%)",
      glow: "hsla(200, 90%, 50%, 0.3)",
    },
    {
      icon: School,
      label: "Unique Colleges",
      value: uniqueColleges,
      color: "hsl(280, 80%, 60%)",
      glow: "hsla(280, 80%, 60%, 0.3)",
    },
    {
      icon: BarChart2,
      label: "Events Offered",
      value: eventStats.length,
      color: "hsl(185, 100%, 55%)",
      glow: "hsla(185, 100%, 55%, 0.3)",
    },
  ];

  return (
    <div className="min-h-screen" style={{ background: "hsl(230, 30%, 5%)" }}>
      {/* Top Nav */}
      <header
        className="sticky top-0 z-40 border-b px-6 py-4 flex items-center justify-between"
        style={{
          background: "hsla(230, 25%, 8%, 0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "hsla(200, 100%, 60%, 0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "var(--gradient-accent)" }}
          >
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-display text-xs text-muted-foreground tracking-widest uppercase">Admin Portal</p>
            <h1 className="font-display text-base font-bold gradient-text leading-tight">Techno-Storm 2K26</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="admin-export-csv"
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-bold tracking-wider transition-all hover:scale-105"
            style={{
              background: "hsla(200, 90%, 50%, 0.15)",
              border: "1px solid hsla(200, 90%, 50%, 0.3)",
              color: "hsl(200, 90%, 60%)",
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
          <button
            id="admin-logout"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-bold tracking-wider transition-all hover:scale-105"
            style={{
              background: "hsla(0, 84%, 60%, 0.15)",
              border: "1px solid hsla(0, 84%, 60%, 0.3)",
              color: "hsl(0, 84%, 65%)",
            }}
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ icon: Icon, label, value, color, glow }) => (
            <div
              key={label}
              className="rounded-2xl p-5 transition-transform hover:scale-[1.02]"
              style={{
                background: "hsla(230, 25%, 11%, 0.8)",
                border: `1px solid ${glow}`,
                boxShadow: `0 0 20px ${glow}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${color}22`, border: `1px solid ${color}55` }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <p className="text-xs text-muted-foreground font-body mb-1">{label}</p>
              <p
                className="font-display font-bold text-xl leading-tight truncate"
                style={{ color }}
                title={String(value)}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl p-1" style={{ background: "hsla(230, 25%, 11%, 0.8)", border: "1px solid hsla(200, 100%, 60%, 0.1)" }}>
          {(["overview", "registrations"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-lg text-xs font-display font-bold tracking-wider capitalize transition-all"
              style={
                activeTab === tab
                  ? { background: "var(--gradient-accent)", color: "white" }
                  : { color: "hsl(215,20%,60%)" }
              }
            >
              {tab === "overview" ? "📊 Overview" : "👥 All Registrations"}
            </button>
          ))}
        </div>

        {/* ========== OVERVIEW TAB ========== */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {registrations.length === 0 ? (
              <div className="rounded-2xl py-20 text-center" style={{ background: "hsla(230, 25%, 11%, 0.8)", border: "1px solid hsla(200, 100%, 60%, 0.1)" }}>
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-display text-lg text-muted-foreground">No registrations yet.</p>
                <p className="text-sm text-muted-foreground/60 mt-1 font-body">Charts will appear once participants register.</p>
              </div>
            ) : (
              <>
                {/* Event Bar Chart */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: "hsla(230, 25%, 11%, 0.8)", border: "1px solid hsla(200, 100%, 60%, 0.1)" }}
                >
                  <h2 className="font-display text-sm font-bold mb-5 gradient-text tracking-widest uppercase">Event-wise Registrations</h2>
                  <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={eventStats} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsla(230,20%,25%,0.5)" />
                      <XAxis
                        dataKey="event"
                        tick={{ fontSize: 10, fill: "hsl(215,20%,60%)", fontFamily: "Inter" }}
                        angle={-20}
                        textAnchor="end"
                        height={55}
                      />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(215,20%,60%)" }} allowDecimals={false} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(230,25%,11%)",
                          border: "1px solid hsla(200,100%,60%,0.2)",
                          borderRadius: "8px",
                          color: "hsl(210,40%,96%)",
                          fontFamily: "Inter",
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {eventStats.map((_, i) => (
                          <Cell key={i} fill={EVENT_COLORS[i % EVENT_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pie Chart */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: "hsla(230, 25%, 11%, 0.8)", border: "1px solid hsla(200, 100%, 60%, 0.1)" }}
                  >
                    <h2 className="font-display text-sm font-bold mb-5 gradient-text tracking-widest uppercase">Event Distribution</h2>
                    <ResponsiveContainer width="100%" height={240}>
                      <PieChart>
                        <Pie
                          data={eventStats}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="count"
                          nameKey="event"
                          label={({ event, percent }) =>
                            `${event.split(" ")[0]} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {eventStats.map((_, i) => (
                            <Cell key={i} fill={EVENT_COLORS[i % EVENT_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            background: "hsl(230,25%,11%)",
                            border: "1px solid hsla(200,100%,60%,0.2)",
                            borderRadius: "8px",
                            color: "hsl(210,40%,96%)",
                            fontFamily: "Inter",
                            fontSize: 12,
                          }}
                        />
                        <Legend
                          wrapperStyle={{ fontSize: "11px", fontFamily: "Inter", color: "hsl(215,20%,60%)" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Top Colleges */}
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: "hsla(230, 25%, 11%, 0.8)", border: "1px solid hsla(200, 100%, 60%, 0.1)" }}
                  >
                    <h2 className="font-display text-sm font-bold mb-5 gradient-text tracking-widest uppercase">Top Colleges</h2>
                    <div className="space-y-3">
                      {collegeStats.map(({ college, count }, i) => {
                        const maxCount = collegeStats[0].count;
                        const pct = Math.round((count / maxCount) * 100);
                        return (
                          <div key={college}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-foreground/80 font-body truncate max-w-[70%]">{college}</span>
                              <span className="font-display font-bold" style={{ color: EVENT_COLORS[i % EVENT_COLORS.length] }}>
                                {count}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted/40">
                              <div
                                className="h-full rounded-full transition-all"
                                style={{
                                  width: `${pct}%`,
                                  background: EVENT_COLORS[i % EVENT_COLORS.length],
                                  boxShadow: `0 0 6px ${EVENT_COLORS[i % EVENT_COLORS.length]}88`,
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========== REGISTRATIONS TAB ========== */}
        {activeTab === "registrations" && (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "hsla(230, 25%, 11%, 0.8)", border: "1px solid hsla(200, 100%, 60%, 0.1)" }}
          >
            {/* Search */}
            <div className="p-5 border-b" style={{ borderColor: "hsla(200, 100%, 60%, 0.1)" }}>
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="admin-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, college…"
                  className="w-full bg-muted/40 border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-body">
                Showing {sorted.length} of {registrations.length} registrations
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              {registrations.length === 0 ? (
                <div className="py-20 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="font-display text-muted-foreground">No registrations found.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "hsla(230, 20%, 15%, 0.6)" }}>
                      {(["name", "email", "phone", "college", "event"] as SortKey[]).map((col) => (
                        <th
                          key={col}
                          onClick={() => toggleSort(col)}
                          className="text-left px-4 py-3 font-display text-xs font-bold tracking-widest uppercase text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none whitespace-nowrap"
                        >
                          {col} <SortIcon k={col} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((r, i) => (
                      <tr
                        key={i}
                        style={{
                          borderTop: "1px solid hsla(230, 20%, 20%, 0.5)",
                          background: i % 2 === 0 ? "transparent" : "hsla(230, 25%, 13%, 0.4)",
                        }}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <td className="px-4 py-3 font-body text-foreground">{r.name}</td>
                        <td className="px-4 py-3 font-body text-muted-foreground text-xs">{r.email}</td>
                        <td className="px-4 py-3 font-body text-muted-foreground text-xs">{r.phone}</td>
                        <td className="px-4 py-3 font-body text-muted-foreground text-xs max-w-[180px] truncate" title={r.college}>{r.college}</td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-display font-bold"
                            style={{
                              background: `${EVENT_COLORS[eventStats.findIndex(e => e.event === r.event) % EVENT_COLORS.length]}22`,
                              color: EVENT_COLORS[eventStats.findIndex(e => e.event === r.event) % EVENT_COLORS.length],
                              border: `1px solid ${EVENT_COLORS[eventStats.findIndex(e => e.event === r.event) % EVENT_COLORS.length]}55`,
                            }}
                          >
                            {r.event}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
