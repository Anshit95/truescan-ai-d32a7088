import { useState } from "react";
import { motion } from "framer-motion";
import { User, Shield, Bell, Palette, Save } from "lucide-react";
import Navbar from "@/components/Navbar";
import LavaBackground from "@/components/LavaBackground";
import { toast } from "sonner";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [name, setName] = useState("Demo User");
  const [email, setEmail] = useState("demo@deepguard.ai");
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWeekly, setNotifWeekly] = useState(false);
  const [notifSecurity, setNotifSecurity] = useState(true);
  const [theme, setTheme] = useState("dark");

  return (
    <div className="min-h-screen relative">
      <LavaBackground />
      <Navbar />
      <div className="container mx-auto pt-24 pb-16 px-4 relative z-10">
        <h1 className="text-3xl font-heading font-bold mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-56 flex md:flex-col gap-1 overflow-x-auto">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  tab === t.id ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"
                }`}>
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 glass-card p-6 rounded-2xl">
            {tab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-heading font-semibold text-lg">Profile</h2>
                <div className="space-y-3 max-w-md">
                  <div>
                    <label className="text-xs text-muted-foreground">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full mt-1 px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => toast.success("Profile saved")}
                    className="btn-primary flex items-center gap-2"><Save className="h-4 w-4" /> Save Changes</motion.button>
                </div>
              </motion.div>
            )}

            {tab === "security" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <h2 className="font-heading font-semibold text-lg">Security</h2>
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${mfaEnabled ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                        {mfaEnabled ? "Enabled" : "Disabled"}
                      </span>
                      <button onClick={() => { setMfaEnabled(!mfaEnabled); toast.success(mfaEnabled ? "MFA disabled" : "MFA enabled"); }}
                        className={`w-10 h-5 rounded-full transition-colors relative ${mfaEnabled ? "bg-primary" : "bg-muted"}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-all ${mfaEnabled ? "left-5" : "left-0.5"}`} />
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-3">Change Password</h3>
                  <div className="space-y-3 max-w-md">
                    <input type="password" placeholder="Current password" className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    <input type="password" placeholder="New password" className="w-full px-4 py-2.5 rounded-xl bg-muted/30 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                    <motion.button whileHover={{ scale: 1.03 }} onClick={() => toast.success("Password updated")}
                      className="btn-primary">Update Password</motion.button>
                  </div>
                </div>
              </motion.div>
            )}

            {tab === "notifications" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-heading font-semibold text-lg">Notifications</h2>
                {[
                  { label: "Email on analysis complete", value: notifEmail, set: setNotifEmail },
                  { label: "Weekly summary report", value: notifWeekly, set: setNotifWeekly },
                  { label: "Security alerts", value: notifSecurity, set: setNotifSecurity },
                ].map((n) => (
                  <div key={n.label} className="flex items-center justify-between glass-card p-4 rounded-xl">
                    <span className="text-sm">{n.label}</span>
                    <button onClick={() => n.set(!n.value)}
                      className={`w-10 h-5 rounded-full transition-colors relative ${n.value ? "bg-primary" : "bg-muted"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-foreground transition-all ${n.value ? "left-5" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {tab === "appearance" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="font-heading font-semibold text-lg">Appearance</h2>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm font-medium mb-3">Theme</p>
                  <div className="flex gap-2">
                    {["dark", "light", "system"].map((t) => (
                      <button key={t} onClick={() => setTheme(t)}
                        className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
                          theme === t ? "bg-primary/20 text-primary border border-primary/30" : "bg-muted/20 text-muted-foreground hover:text-foreground border border-border/50"
                        }`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm font-medium mb-3">Accent Color</p>
                  <div className="flex gap-3">
                    {["#FF6A00", "#2563EB", "#8B5CF6", "#10B981", "#EF4444"].map((c) => (
                      <button key={c} className="w-8 h-8 rounded-full border-2 border-border/50 hover:scale-110 transition-transform"
                        style={{ backgroundColor: c }} onClick={() => toast.success(`Accent color updated`)} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
