"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TAGLINE = "FAITH  ·  OVER  ·  FEAR";
const LOGO = "/resilient-boxing-logo.webp";

/** Photos of the gym community, one shown at random behind each load. */
const PHOTOS = [
  "/loading-heavy-bags.webp",
  "/loading-fists-up.webp",
  "/loading-outdoor-group.webp",
  "/loading-kids-class.webp",
  "/form-foundation-class.webp",
];

/** Paired at random with the photo, so the screen reads differently each visit. */
const VERSES = [
  {
    reference: "2 Timothy 1:7",
    text: "For God has not given us a spirit of fear — but of power, love, and a sound mind.",
  },
  {
    reference: "2 Timothy 4:7",
    text: "I have fought the good fight, I have finished the race, I have kept the faith.",
  },
  {
    reference: "1 Corinthians 9:26",
    text: "Therefore I do not run like someone running aimlessly; I do not fight like a boxer beating the air.",
  },
  {
    reference: "Isaiah 40:31",
    text: "Those who hope in the Lord will renew their strength; they will run and not grow weary.",
  },
  {
    reference: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid, for the Lord your God will be with you wherever you go.",
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ who strengthens me.",
  },
  {
    reference: "Proverbs 27:17",
    text: "As iron sharpens iron, so one person sharpens another.",
  },
  {
    reference: "1 Timothy 6:12",
    text: "Fight the good fight of faith, lay hold on eternal life, whereunto thou art also called.",
  },
];

/**
 * Intro video, played once per visit on the first loading screen a visitor
 * sees. Every load after that shows a photo and verse instead.
 *
 * Set this to the video's path in /public to switch it on; leave it null and
 * every load shows the photo screen. The file must be muted-autoplay friendly
 * (browsers block autoplay with sound) and ideally an MP4 under a few MB.
 */
const INTRO_VIDEO: string | null = "/loading-intro.mp4";

/** Matches the video's 7.77s runtime, so it plays out before the fade ends. */
const INTRO_DURATION_MS = 7800;

/** Marks the intro as played for this browser tab. */
const INTRO_FLAG = "rb_intro_played";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState(0);
  const [lettersDone, setLettersDone] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Chosen after mount rather than during render: picking at render time would
  // make the server and client markup disagree and break hydration. Null until
  // then, so nothing flashes before the choice is made.
  const [pick, setPick] = useState<{ photo: string; verse: typeof VERSES[number] } | null>(null);

  /** null until decided after mount, for the same hydration reason. */
  const [showIntro, setShowIntro] = useState<boolean | null>(null);

  useEffect(() => {
    // sessionStorage is per tab and clears when the tab closes, so the intro
    // greets each visit once rather than once forever.
    let alreadyPlayed = true;
    try {
      alreadyPlayed = sessionStorage.getItem(INTRO_FLAG) === "1";
      if (!alreadyPlayed) sessionStorage.setItem(INTRO_FLAG, "1");
    } catch {
      // Private browsing can throw on storage access; fall back to the photo.
      alreadyPlayed = true;
    }

    const intro = Boolean(INTRO_VIDEO) && !alreadyPlayed;
    setShowIntro(intro);

    if (!intro) {
      setPick({
        photo: PHOTOS[Math.floor(Math.random() * PHOTOS.length)],
        verse: VERSES[Math.floor(Math.random() * VERSES.length)],
      });
    }
  }, []);

  // Held in a ref so the timeline below doesn't depend on the callback's
  // identity. Parents pass an inline arrow, so a parent re-render would
  // otherwise tear down and restart the timers — and any parent that
  // re-renders faster than the timeline would keep the screen up forever.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Master timeline. Waits for the intro decision so the screen isn't dismissed
  // partway through the video. 4.4s for the photo screen, the video's length
  // for the intro.
  useEffect(() => {
    if (showIntro === null) return;

    const total = showIntro ? INTRO_DURATION_MS : 4400;
    const timers = [
      setTimeout(() => setPhase(1), 150),
      setTimeout(() => setPhase(2), 500),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 2400),
      setTimeout(() => setIsExiting(true), total - 1000),
      setTimeout(() => { setIsDone(true); onCompleteRef.current(); }, total),
    ];
    return () => timers.forEach(clearTimeout);
  }, [showIntro]);

  // Letter-by-letter typewriter
  useEffect(() => {
    if (phase < 3 || lettersDone >= TAGLINE.length) return;
    const t = setTimeout(() => setLettersDone((n) => n + 1), 40);
    return () => clearTimeout(t);
  }, [phase, lettersDone]);

  if (isDone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-[#080808]"
      animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      {/* ── INTRO VIDEO (first load of a visit only) ── */}
      {showIntro && INTRO_VIDEO && (
        <motion.video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <source src={INTRO_VIDEO} type="video/mp4" />
        </motion.video>
      )}

      {/* ── PHOTO BACKGROUND (drifts slowly so it doesn't read as a still) ── */}
      {pick && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1.14 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeOut" },
            scale: { duration: 6, ease: "linear" },
          }}
        >
          <Image
            src={pick.photo}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </motion.div>
      )}

      {/* ── DARK OVERLAY — lighter over the intro, so the video stays the feature ── */}
      <div className={`absolute inset-0 z-[1] ${showIntro ? "bg-black/45" : "bg-black/80"}`} />

      {/* ── CONTENT LAYER ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center select-none z-[2]">

        {/* Ambient gold radiance bloom */}
        <motion.div
          className="absolute w-[300px] h-[300px] md:w-[850px] md:h-[850px] rounded-full pointer-events-none"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ duration: 2.0, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.14) 0%, rgba(197,160,89,0.06) 35%, transparent 65%)",
          }}
        />

        {/* Outer pulse ring */}
        <motion.div
          className="absolute w-[290px] h-[290px] md:w-[620px] md:h-[620px] rounded-full border border-[#C5A059]/12"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={phase >= 1 ? { opacity: [0, 0.5, 0], scale: [0.7, 1.2, 1.7] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.3 }}
        />

        {/* Inner pulse ring */}
        <motion.div
          className="absolute w-[240px] h-[240px] md:w-[480px] md:h-[480px] rounded-full border border-[#C5A059]/18"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 1 ? { opacity: [0, 0.7, 0], scale: [0.8, 1.2, 1.5] } : { opacity: 0 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
        />

        {/* Center gold core glow */}
        <motion.div
          className="absolute w-[180px] h-[180px] md:w-[260px] md:h-[260px] rounded-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5 }}
          style={{
            background: "radial-gradient(circle, rgba(197,160,89,0.22) 0%, transparent 70%)",
            filter: "blur(28px)",
          }}
        />

        {/* ── LOGO (Responsive size to prevent clipping on mobile) ── */}
        <motion.div
          className="relative z-10 drop-shadow-2xl w-[260px] h-[260px] md:w-[450px] md:h-[450px]"
          initial={{ opacity: 0, scale: 0.55, y: 28 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.55, y: 28 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={LOGO}
            alt="Resilient Boxing Gym"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 260px, 450px"
            priority
          />
        </motion.div>

        {/* Gold separator rule */}
        <motion.div
          className="relative z-10 mt-4 h-px bg-gradient-to-r from-transparent via-[#C5A059]/70 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={phase >= 2 ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeInOut" }}
          style={{ width: 200 }}
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
              className={`font-mono text-[13px] md:text-[15px] font-medium uppercase ${
                char === "·" ? "text-[#C5A059]/70 mx-2" : "text-white/85"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>

        {/* Location */}
        <motion.p
          className="relative z-10 mt-4 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.55em] text-zinc-400"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          O&apos;Fallon, Missouri
        </motion.p>

        {/* ── SCRIPTURE ── */}
        {pick && (
          <motion.figure
            className="relative z-10 mt-7 px-8 max-w-[min(34rem,88vw)] text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
          >
            <blockquote className="text-[13px] md:text-[15px] leading-relaxed italic text-white/75 text-balance">
              &ldquo;{pick.verse.text}&rdquo;
            </blockquote>
            <figcaption className="mt-3 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[#C5A059]/80">
              {pick.verse.reference}
            </figcaption>
          </motion.figure>
        )}

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
