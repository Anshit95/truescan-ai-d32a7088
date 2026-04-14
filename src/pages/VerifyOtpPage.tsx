import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mail } from "lucide-react";
import LavaBackground from "@/components/LavaBackground";
import { toast } from "sonner";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = (location.state as any)?.email || "your@email.com";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    if (otp.some((d) => !d)) { toast.error("Please enter all 6 digits"); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success("Email verified!");
    navigate("/setup-mfa");
  };

  const handleResend = () => {
    setResendTimer(60);
    toast.success("New code sent!");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <LavaBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md mx-4 relative z-10">
        <div className="glass-card p-8 rounded-2xl text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-2xl font-heading font-bold mb-1">Verify Your Email</h1>
          <p className="text-sm text-muted-foreground mb-8">We sent a 6-digit code to <span className="text-foreground">{email}</span></p>

          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, i) => (
              <motion.input
                key={i}
                ref={(el) => { inputsRef.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`w-12 h-14 text-center text-xl font-mono-score font-bold rounded-xl bg-muted/30 border transition-all duration-300 focus:outline-none ${
                  digit ? "border-primary shadow-[0_0_12px_rgba(255,106,0,0.3)]" : "border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/30"
                }`}
              />
            ))}
          </div>

          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} onClick={handleVerify} disabled={loading}
            className="w-full btn-primary py-3 mb-4 disabled:opacity-50">
            {loading ? "Verifying..." : "Verify Email"}
          </motion.button>

          <button onClick={handleResend} disabled={resendTimer > 0}
            className="text-xs text-muted-foreground hover:text-primary disabled:opacity-40 transition-colors">
            {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Code"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
