import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Menu, X, Sun, Moon, Bell, User, Settings, LogOut, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useAnalysisStore } from "@/store/useAnalysisStore";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Analyze", path: "/analyze" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "History", path: "/history" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { history } = useAnalysisStore();

  const recentNotifs = history.slice(0, 3);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(10, 5, 3, 0.75)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 120, 50, 0.1)",
      }}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-lg">
            DeepGuard<span className="text-primary">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 8px 2px hsl(var(--primary) / 0.4)" }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="p-2 rounded-lg hover:bg-primary/10 transition-colors text-muted-foreground hover:text-foreground relative"
            >
              <Bell className="h-4 w-4" />
              {recentNotifs.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-primary text-[9px] font-bold flex items-center justify-center text-primary-foreground">
                  {recentNotifs.length}
                </span>
              )}
            </button>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-72 glass-card rounded-xl overflow-hidden shadow-xl"
              >
                <div className="p-3 border-b border-primary/10 flex justify-between items-center">
                  <span className="text-xs font-semibold text-foreground">Notifications</span>
                  <button className="text-[10px] text-primary">Mark all read</button>
                </div>
                {recentNotifs.length === 0 ? (
                  <p className="p-4 text-xs text-muted-foreground text-center">No notifications</p>
                ) : (
                  recentNotifs.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-primary/5 cursor-pointer border-b border-primary/5 last:border-0">
                      <p className="text-xs text-foreground">
                        <span className="font-medium">{n.imageName}</span> — {n.verdict === "real" ? "Real" : n.verdict === "ai_generated" ? "AI Generated" : "Manipulated"} ({n.confidence}%)
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{new Date(n.timestamp).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-lava-red flex items-center justify-center text-primary-foreground text-xs font-bold hover:scale-105 transition-transform"
            >
              DG
            </button>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-full mt-2 w-48 glass-card rounded-xl overflow-hidden shadow-xl"
              >
                <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 transition-colors text-foreground">
                  <Settings className="h-4 w-4 text-muted-foreground" /> Settings
                </Link>
                <Link to="/login" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-primary/5 transition-colors text-foreground border-t border-primary/10">
                  <LogOut className="h-4 w-4 text-muted-foreground" /> Sign Out
                </Link>
              </motion.div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden"
          style={{
            background: "rgba(10, 5, 3, 0.95)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255, 120, 50, 0.1)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
