import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Lock, Mail, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const ADMIN_EMAIL = "tilakmahajan1610@gmail.com";
const ADMIN_PASS = "Waghod@123";

interface AdminLoginModalProps {
  onClose: () => void;
}

const AdminLoginModal = ({ onClose }: AdminLoginModalProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Small artificial delay for UX polish
    await new Promise((r) => setTimeout(r, 700));

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS) {
      sessionStorage.setItem("ts_admin_auth", "true");
      toast.success("Welcome, Admin! 🛡️");
      onClose();
      navigate("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
      toast.error("Authentication failed.");
    }

    setLoading(false);
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5, 7, 20, 0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-md rounded-2xl p-8 animate-in"
        style={{
          background: "hsla(230, 25%, 10%, 0.95)",
          border: "1px solid hsla(200, 100%, 60%, 0.2)",
          boxShadow: "0 0 60px hsla(250, 85%, 65%, 0.15), 0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "var(--gradient-accent)", boxShadow: "0 0 25px hsla(250, 85%, 65%, 0.4)" }}
          >
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold gradient-text tracking-wide">Admin Portal</h2>
          <p className="text-muted-foreground text-sm mt-1 font-body">Techno-Storm 2K26 Dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="Admin Email"
              required
              className="w-full bg-muted/40 border border-border rounded-lg pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              id="admin-password"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              placeholder="Password"
              required
              className="w-full bg-muted/40 border border-border rounded-lg pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition font-body"
            />
            <button
              type="button"
              onClick={() => setShowPass((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            id="admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full btn-gradient py-3 rounded-lg font-display text-sm font-bold tracking-wider text-primary-foreground neon-glow hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Authenticating…
              </>
            ) : (
              "Login to Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
