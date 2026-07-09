"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TAGLINE = "FAITH  ·  OVER  ·  FEAR";
const LOGO = "/resilient_boxing_gym_logo_transparent_high_def.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Master timeline (1.6 seconds total forced load time instead of 4.4 seconds)
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 80),
      setTimeout(() => setPhase(2), 250),
      setTimeout(() => setPhase(3), 500),
      setTimeout(() => setIsExiting(true), 1100),
      setTimeout(() => { setIsDone(true); onComplete(); }, 1600),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  if (isDone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-[#080808] noise"
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* ── CONTENT LAYER ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-10">

        {/* Ambient gold radiance bloom */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.12) 0%, rgba(197,160,89,0.04) 45%, transparent 70%)",
          }}
        />

        {/* Center gold core glow */}
        <motion.div
          className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.2) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* ── LOGO (Responsive size to prevent clipping on mobile) ── */}
        <motion.div
          className="relative drop-shadow-2xl z-10 w-[240px] h-[240px] md:w-[400px] md:h-[400px]"
          initial={{ opacity: 0, scale: 0.65, y: 15 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.65, y: 15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={LOGO}
            alt="Resilient Boxing Gym"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 240px, 400px"
            priority
          />
        </motion.div>

        {/* Gold separator rule */}
        <motion.div
          className="relative z-10 mt-4 h-px bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={phase >= 2 ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          style={{ width: 180 }}
        />

        {/* ── TAGLINE ── */}
        <motion.div
          className="relative z-10 mt-5 flex items-center justify-center font-mono text-[11px] md:text-[13px] font-semibold uppercase tracking-[0.35em] text-white/90"
          initial={{ opacity: 0, y: 8 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          FAITH <span className="text-[#C5A059] mx-2">·</span> OVER <span className="text-[#C5A059] mx-2">·</span> FEAR
        </motion.div>

        {/* Location */}
        <motion.p
          className="relative z-10 mt-3.5 text-[9px] font-mono uppercase tracking-[0.45em] text-zinc-400"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          O&apos;Fallon, Missouri
        </motion.p>

      </div>
    </motion.div>
  );
}
