import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Smartphone, Mail, QrCode } from "lucide-react";
import LavaBackground from "@/components/LavaBackground";
import { toast } from "sonner";

export default function SetupMfaPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"totp" | "email" | null>(null);

  const handleEnable = () => {
    if (!selected) { toast.error("Please select an MFA method"); return; }
    toast.success("MFA enabled successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <LavaBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg mx-4 relative z-10">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
              className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl font-heading font-bold mb-1">Secure Your Account</h1>
            <p className="text-sm text-muted-foreground">Choose a two-factor authentication method</p>
          </div>

          <div className="grid gap-4 mb-6">
            {[
              { id: "totp" as const, icon: Smartphone, title: "Authenticator App", desc: "Use Google Authenticator, Authy, or similar" },
              { id: "email" as const, icon: Mail, title: "Email OTP", desc: "Receive a code via email each login" },
            ].map((opt) => (
              <motion.button key={opt.id} whileHover={{ scale: 1.02 }}
                onClick={() => setSelected(opt.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  selected === opt.id ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,106,0,0.15)]" : "border-border/50 bg-muted/20 hover:border-primary/30"
                }`}>
                <div className={`p-3 rounded-xl ${selected === opt.id ? "bg-primary/20" : "bg-muted/30"}`}>
                  <opt.icon className={`h-5 w-5 ${selected === opt.id ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{opt.title}</p>
                  <p className="text-xs text-muted-foreground">{opt.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          {selected === "totp" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              className="glass-card p-4 rounded-xl mb-6 text-center">
              <div className="w-32 h-32 bg-muted/30 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground">Scan this QR code with your authenticator app</p>
              <p className="text-[10px] font-mono-score text-muted-foreground/50 mt-2 select-all">JBSWY3DPEHPK3PXP</p>
            </motion.div>
          )}

          <div className="space-y-3">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={handleEnable}
              className="w-full btn-primary py-3">Enable MFA</motion.button>
            <button onClick={() => { toast.info("You can set up MFA later in Settings"); navigate("/dashboard"); }}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2">Skip for now</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
