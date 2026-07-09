"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TAGLINE = "FAITH  ·  OVER  ·  FEAR";
const LOGO = "/resilient_boxing_gym_logo_transparent_high_def.png";
const VIDEO_SRC = "/download (2).mp4";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  const [lettersDone, setLettersDone] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Master timeline
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setIsExiting(true), 3400),
      setTimeout(() => { setIsDone(true); onComplete(); }, 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Letter-by-letter typewriter
  useEffect(() => {
    if (phase < 3 || lettersDone >= TAGLINE.length) return;
    const t = setTimeout(() => setLettersDone((n) => n + 1), 40);
    return () => clearTimeout(t);
  }, [phase, lettersDone]);

  if (isDone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      {/* ── VIDEO — plays from the very start, full screen ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* ── DARK OVERLAY ── */}
      <div className="absolute inset-0 z-[1] bg-black/80" />

      {/* ── CONTENT LAYER ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-[2]">

        {/* Ambient gold radiance bloom */}
        <motion.div
          className="absolute w-[850px] h-[850px] rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.14) 0%, rgba(197,160,89,0.06) 35%, transparent 65%)",
          }}
        />

        {/* Outer pulse ring */}
        <motion.div
          className="absolute w-[620px] h-[620px] rounded-full border border-[#C5A059]/12"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={phase >= 1 ? { opacity: [0, 0.5, 0], scale: [0.7, 1.2, 1.7] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
        />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute w-[480px] h-[480px] rounded-full border border-[#C5A059]/18"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 1 ? { opacity: [0, 0.7, 0], scale: [0.8, 1.2, 1.5] } : { opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
        />

        {/* Center gold core glow */}
        <motion.div
          className="absolute w-[260px] h-[260px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.22) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        {/* ── LOGO ── */}
        <motion.div
          className="relative z-10 drop-shadow-2xl"
          style={{ width: 450, height: 450 }}
          initial={{ opacity: 0, scale: 0.55, y: 28 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.55, y: 28 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={LOGO}
            alt="Resilient Boxing Gym"
            fill
            className="object-contain"
            sizes="450px"
            priority
          />
        </motion.div>

        {/* Gold separator rule */}
        <motion.div
          className="relative z-10 mt-4 h-px bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={phase >= 2 ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
          style={{ width: 240 }}
        />

        {/* ── TAGLINE ── */}
        <div className="relative z-10 mt-5 h-8 flex items-center">
          {TAGLINE.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: i < lettersDone ? 1 : 0,
                y: i < lettersDone ? 0 : 10,
              }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`font-mono text-[15px] font-medium uppercase ${
                char === "·" ? "text-[#C5A059]/70 mx-2" : "text-white/85"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Location */}
        <motion.p
          className="relative z-10 mt-4 text-[11px] font-mono uppercase tracking-[0.55em] text-zinc-400"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          O&apos;Fallon, Missouri
        </motion.p>

        {/* ── PROGRESS BAR ── */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2.5 z-10"
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C5A059]/60 via-[#C5A059] to-[#C5A059]/60"
              initial={{ width: "0%" }}
              animate={phase >= 4 ? { width: "100%" } : {}}
              transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            />
            <motion.div
              className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ left: "-20%" }}
              animate={phase >= 4 ? { left: "110%" } : {}}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
          </div>
          <p className="text-[8px] font-mono uppercase tracking-[0.5em] text-zinc-400">
            Entering the gym
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
