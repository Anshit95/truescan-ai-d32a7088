import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";

interface WatchDemoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WatchDemoModal({ open, onClose }: WatchDemoModalProps) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-4xl rounded-2xl overflow-hidden"
          style={{
            background: "rgba(15, 8, 4, 0.95)",
            border: "1px solid rgba(255, 120, 50, 0.2)",
            backdropFilter: "blur(20px)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-primary/10">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-primary" />
              <h2 className="font-heading font-semibold text-foreground">DeepGuard AI — Product Demo</h2>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative aspect-video bg-black/50">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0"
              title="DeepGuard AI Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="p-4 border-t border-primary/10">
            <p className="text-xs text-muted-foreground text-center">
              See how DeepGuard AI detects deepfakes, AI-generated images, and manipulated media in seconds.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
