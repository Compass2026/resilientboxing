"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  Clock,
  Info,
  Smartphone,
  Download,
  Shield,
  Zap,
  Activity,
  Heart,
  BookOpen,
  Filter,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Lock,
  Moon,
  Sun
} from "lucide-react";

// ─── CLASS DETAILS & ICONS ──────────────────────────────────────────────────
const COLOR_MAP: Record<string, {
  glass: string;
  glow: string;
  text: string;
  hoverText: string;
  iconBg: string;
  note: string;
  progress: string;
  borderHover: string;
  gradient: string;
  modalGradient: string;
  modalScripture: string;
  badge: string;
}> = {
  gold: {
    glass: "glass-gold border-[#C5A059]/25 hover:border-[#C5A059]/70",
    glow: "bg-[#C5A059]",
    text: "text-[#C5A059]",
    hoverText: "group-hover:text-[#C5A059]",
    iconBg: "bg-[#C5A059]/10 border-[#C5A059]/20 text-[#C5A059]",
    note: "text-[#C5A059] bg-[#C5A059]/10 border-[#C5A059]/20",
    progress: "bg-[#C5A059]",
    borderHover: "hover:border-[#C5A059]/30",
    gradient: "from-[#C5A059] to-transparent",
    modalGradient: "from-[#C5A059] to-zinc-950",
    modalScripture: "border-[#C5A059]/50",
    badge: "text-[#C5A059] border-[#C5A059]/20"
  },
  purple: {
    glass: "glass-purple border-[#a855f7]/25 hover:border-[#a855f7]/70 shadow-[0_0_15px_rgba(168,85,247,0.05)] hover:shadow-[0_0_25px_rgba(168,85,247,0.22)]",
    glow: "bg-[#a855f7]",
    text: "text-[#a855f7]",
    hoverText: "group-hover:text-[#a855f7]",
    iconBg: "bg-[#a855f7]/10 border-[#a855f7]/20 text-[#a855f7]",
    note: "text-zinc-100 bg-[#a855f7]/15 border-[#a855f7]/30 shadow-[0_0_8px_rgba(168,85,247,0.05)]",
    progress: "bg-[#a855f7]",
    borderHover: "hover:border-[#a855f7]/30 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]",
    gradient: "from-[#a855f7] via-[#c084fc] to-transparent",
    modalGradient: "from-[#a855f7] to-zinc-950",
    modalScripture: "border-[#a855f7]/50",
    badge: "text-zinc-100 border-[#a855f7]/30"
  },
  orange: {
    glass: "glass-orange border-[#f97316]/25 hover:border-[#f97316]/70",
    glow: "bg-[#f97316]",
    text: "text-[#f97316]",
    hoverText: "group-hover:text-[#f97316]",
    iconBg: "bg-[#f97316]/10 border-[#f97316]/20 text-[#f97316]",
    note: "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20",
    progress: "bg-[#f97316]",
    borderHover: "hover:border-[#f97316]/30",
    gradient: "from-[#f97316] to-transparent",
    modalGradient: "from-[#f97316] to-zinc-950",
    modalScripture: "border-[#f97316]/50",
    badge: "text-[#f97316] border-[#f97316]/20"
  },
  green: {
    glass: "glass-green border-[#84cc16]/25 hover:border-[#84cc16]/70",
    glow: "bg-[#84cc16]",
    text: "text-[#84cc16]",
    hoverText: "group-hover:text-[#84cc16]",
    iconBg: "bg-[#84cc16]/10 border-[#84cc16]/20 text-[#84cc16]",
    note: "text-[#84cc16] bg-[#84cc16]/10 border-[#84cc16]/20",
    progress: "bg-[#84cc16]",
    borderHover: "hover:border-[#84cc16]/30",
    gradient: "from-[#84cc16] to-transparent",
    modalGradient: "from-[#84cc16] to-zinc-950",
    modalScripture: "border-[#84cc16]/50",
    badge: "text-[#84cc16] border-[#84cc16]/20"
  },
  silver: {
    glass: "glass-silver border-zinc-500/25 hover:border-zinc-200/90 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.22)]",
    glow: "bg-zinc-200",
    text: "text-zinc-200",
    hoverText: "group-hover:text-white",
    iconBg: "bg-white/10 border-white/20 text-white shadow-[inset_0_0_8px_rgba(255,255,255,0.08)]",
    note: "text-zinc-100 bg-white/5 border-zinc-500/30 shadow-[0_0_8px_rgba(255,255,255,0.05)]",
    progress: "bg-zinc-200",
    borderHover: "hover:border-zinc-300/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]",
    gradient: "from-zinc-200 via-zinc-400 to-transparent",
    modalGradient: "from-zinc-200 via-zinc-400 to-zinc-950",
    modalScripture: "border-zinc-400/60",
    badge: "text-zinc-100 border-zinc-500/30"
  },
  white: {
    glass: "glass border-white/5 hover:border-white/20",
    glow: "bg-white",
    text: "text-zinc-200",
    hoverText: "group-hover:text-zinc-200",
    iconBg: "bg-white/10 border-white/20 text-zinc-200",
    note: "text-zinc-300 bg-white/5 border-white/10",
    progress: "bg-white",
    borderHover: "hover:border-white/10",
    gradient: "from-white to-transparent",
    modalGradient: "from-white to-zinc-950",
    modalScripture: "border-white/50",
    badge: "text-zinc-300 border-white/10"
  },
  red: {
    glass: "glass border-white/5 hover:border-[#F43F5E]/30",
    glow: "bg-[#F43F5E]",
    text: "text-[#F43F5E]",
    hoverText: "group-hover:text-[#F43F5E]",
    iconBg: "bg-[#F43F5E]/10 border-[#F43F5E]/20 text-[#F43F5E]",
    note: "text-[#F43F5E] bg-[#F43F5E]/10 border-[#F43F5E]/20",
    progress: "bg-[#F43F5E]",
    borderHover: "hover:border-[#F43F5E]/30",
    gradient: "from-[#F43F5E] to-transparent",
    modalGradient: "from-[#F43F5E] to-zinc-950",
    modalScripture: "border-[#F43F5E]/50",
    badge: "text-[#F43F5E] border-[#F43F5E]/20"
  }
};

const CLASS_DETAILS = {
  elevate: {
    id: "elevate",
    name: "ELEVATE 60",
    tagline: "Foundation and Fire",
    desc: "The core of our system. 60 minutes of authentic boxing combinations, heavy bag work, and athletic conditioning that rewires how you move and how you think under pressure.",
    intensity: 90,
    duration: "60 mins",
    image: "/6831DF2B-018E-403B-899E-943DD2558B32.webp",
    glowColor: "green" as const,
    icon: Shield,
    scripture: {
      reference: "2 Timothy 1:7",
      text: "For God has not given us a spirit of fear — but of power, love, and a sound mind."
    }
  },
  form: {
    id: "form",
    name: "FORM AND FOUNDATION",
    tagline: "Learn the Basics",
    desc: "Perfect for beginners* or anyone looking to improve their technique.",
    intensity: 65,
    duration: "60 mins",
    image: "/gym-photo.png",
    glowColor: "gold" as const,
    icon: BookOpen,
    scripture: {
      reference: "1 Corinthians 9:26",
      text: "Therefore I do not run like someone running aimlessly; I do not fight like a boxer beating the air."
    }
  },
  faithoverfear: {
    id: "faithoverfear",
    name: "FAITH OVER FEAR",
    tagline: "Gloves on, God leads",
    desc: "Every Thursday at 5:30 PM – Grow in faith, build community, and strengthen your body and spirit.",
    intensity: 50,
    duration: "75 mins",
    image: "/faith-gloves-cross-massive.png",
    glowColor: "purple" as const,
    icon: Zap,
    scripture: {
      reference: "2 Timothy 1:7",
      text: "For God has not given us a spirit of fear — but of power, love, and a sound mind."
    }
  },
  fightcamp: {
    id: "fightcamp",
    name: "FIGHT CAMP",
    tagline: "Beyond the Basics and Sparring",
    desc: "Controlled sparring, counter-punching, advanced footwork, and tactical ring generalship. Designed to teach you to think like a seasoned fighter. Requires coach invite.",
    intensity: 100,
    duration: "60-90 mins",
    image: "/2FBE893A-8F4F-4CD5-B529-3CD041E7496F.webp",
    glowColor: "orange" as const,
    icon: Heart,
    scripture: {
      reference: "1 Timothy 6:12",
      text: "Fight the good fight of faith, lay hold on eternal life, whereunto thou art also called."
    }
  }
};

// ─── SCHEDULE DATA ──────────────────────────────────────────────────────────
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WEEK_GRID_ROWS = [
  "9:00 AM",
  "10:00 AM",
  "4:00 PM",
  "4:15 PM",
  "5:30 PM",
  "6:30 PM",
  "7:00 PM"
];

const SCHEDULE_DATA: Record<string, Array<{
  time: string;
  classId: keyof typeof CLASS_DETAILS;
  duration: string;
  intensity: number;
  note?: string;
}>> = {
  Monday: [
    { time: "9:00 AM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "4:15 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "5:30 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "7:00 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
  ],
  Tuesday: [
    { time: "9:00 AM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "4:15 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "5:30 PM", classId: "form", duration: "60 mins", intensity: 65 },
    { time: "6:30 PM", classId: "fightcamp", duration: "60 mins", intensity: 100 },
  ],
  Wednesday: [
    { time: "9:00 AM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "4:15 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "5:30 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "7:00 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
  ],
  Thursday: [
    { time: "5:30 PM", classId: "faithoverfear", duration: "75 mins", intensity: 50, note: "5:30 - 6:45 PM" },
    { time: "7:00 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
  ],
  Friday: [
    { time: "9:00 AM", classId: "elevate", duration: "60 mins", intensity: 90 },
    { time: "4:00 PM", classId: "elevate", duration: "60 mins", intensity: 90 },
  ],
  Saturday: [
    { time: "9:00 AM", classId: "form", duration: "60 mins", intensity: 65 },
    { time: "10:00 AM", classId: "fightcamp", duration: "90 mins", intensity: 100 },
  ],
  Sunday: []
};

// ─── AMBIENT SPOTLIGHT ──────────────────────────────────────────────────────
function GlowSpotlight() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [x, y]);

  return (
    <motion.div
      className="fixed inset-0 z-[2] pointer-events-none"
      style={{
        background: useTransform(
          [springX, springY],
          ([mx, my]: number[]) =>
            `radial-gradient(600px circle at ${mx}px ${my}px, rgba(197,160,89,0.06) 0%, transparent 70%)`
        ),
      }}
    />
  );
}

// ─── GLASS CARD component ───────────────────────────────────────────────────
function GlassPanel({ children, className = "", gold = false }: {
  children: React.ReactNode; className?: string; gold?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${gold ? "glass-gold" : "glass-card"} ${className}`}>
      {children}
    </div>
  );
}

export default function SchedulePage() {
  const [showLoading, setShowLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeDay, setActiveDay] = useState("Monday");
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [selectedClass, setSelectedClass] = useState<keyof typeof CLASS_DETAILS | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [timeFilter, setTimeFilter] = useState<"all" | "morning" | "evening">("all");

  // Determine current day for automatic highilghts (fallback to Monday)
  useEffect(() => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = weekday[new Date().getDay()];
    if (DAYS.includes(currentDay)) {
      setActiveDay(currentDay);
    }
  }, []);

  const handleBookClick = () => {
    window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank');
  };

  // Filter slots check
  const matchesFilters = (slot: { time: string; classId: string }) => {
    if (categoryFilter !== "all" && slot.classId !== categoryFilter) return false;
    
    if (timeFilter === "morning") {
      return slot.time.includes("AM");
    }
    if (timeFilter === "evening") {
      return slot.time.includes("PM");
    }
    return true;
  };

  return (
    <div className="noise relative bg-[#080808] min-h-screen overflow-x-hidden text-white">
      {/* ── LOADING SCREEN ── */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* ── AMBIENT GLOWS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] glow-red opacity-55 rounded-full blur-3xl" />
        <div className="absolute top-[25%] right-[-10%] w-[600px] h-[600px] glow-gold opacity-45 rounded-full blur-3xl" />
        <div className="absolute bottom-[15%] left-[20%] w-[500px] h-[500px] glow-white opacity-35 rounded-full blur-3xl" />
      </div>

      {/* ── MOUSE SPOTLIGHT ── */}
      <GlowSpotlight />

      {/* ── HEADER ── */}
      <Header onBookClick={handleBookClick} />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-[220px] md:pt-[280px] pb-12 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C5A059] mb-4"
          >
            Faith & Boxing Schedule
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-[clamp(44px,7vw,90px)] uppercase italic leading-[0.95] tracking-tight text-white mb-6"
          >
            Weekly <span className="text-transparent" style={{ WebkitTextStroke: "2px #C5A059" }}>Class Schedule</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed"
          >
            Find your round. We structure our days to help you build physical resilience and spiritual grit. Select a class to view details or filter to find your perfect time.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          INTERACTIVE SCHEDULE CONTROLS & VIEWS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-8 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12">
          
          {/* Controls Bar: Toggles + Filters */}
          <div className="glass-card rounded-2xl p-5 border border-white/6 mb-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            
            {/* Left: Layout View Toggle */}
            <div className="flex items-center gap-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-2 flex items-center gap-1.5">
                <Filter size={11} className="text-[#C5A059]" /> View Mode:
              </div>
              <div className="glass rounded-xl p-1 inline-flex border border-white/5">
                <button
                  onClick={() => setActiveView("grid")}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeView === "grid"
                      ? "bg-[#C5A059] text-black shadow-lg"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Weekly Calendar
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    activeView === "list"
                      ? "bg-[#C5A059] text-black shadow-lg"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Daily Timeline
                </button>
              </div>
            </div>

            {/* Middle: Class Filter pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-2">Filter Class:</span>
              {[
                { id: "all", label: "All" },
                { id: "elevate", label: "Elevate 60" },
                { id: "form", label: "Form & Foundation" },
                { id: "faithoverfear", label: "Faith Over Fear" },
                { id: "fightcamp", label: "Fight Camp" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-200 border cursor-pointer ${
                    categoryFilter === cat.id
                      ? "bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059]"
                      : "bg-transparent border-white/5 text-zinc-400 hover:text-white hover:border-white/15"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Right: Time Filter pills */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-2">Time:</span>
              <div className="glass rounded-xl p-1 inline-flex border border-white/5">
                {[
                  { id: "all", label: "All", icon: CheckCircle2 },
                  { id: "morning", label: "Morning", icon: Sun },
                  { id: "evening", label: "Evening", icon: Moon },
                ].map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTimeFilter(t.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        timeFilter === t.id
                          ? "bg-[#C5A059]/20 text-[#C5A059]"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Icon size={11} /> {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Render View */}
          <AnimatePresence mode="wait">
            {activeView === "grid" ? (
              
              /* ── WEEKLY CALENDAR GRID VIEW ── */
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="overflow-x-auto pb-4"
              >
                <div className="min-w-[950px] relative">
                  
                  {/* Decorative background watermark */}
                  <div className="absolute inset-0 pointer-events-none opacity-2 flex items-center justify-center">
                    <Image
                      src="/resilient_boxing_gym_logo_transparent_high_def.png"
                      alt="Watermark"
                      width={650}
                      height={400}
                      className="object-contain"
                    />
                  </div>

                  <table className="w-full border-collapse table-fixed text-center relative z-10">
                    
                    {/* Header Columns */}
                    <thead>
                      <tr>
                        <th className="w-[110px] py-6 px-3 bg-zinc-950/80 rounded-tl-2xl border-b-2 border-[#C5A059]/40 text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] font-bold">
                          Time
                        </th>
                        {DAYS.map((day, idx) => (
                          <th
                            key={day}
                            className={`py-6 px-3 border-b-2 border-white/10 text-xs font-bebas uppercase italic tracking-[0.15em] text-white/90 ${
                              idx === DAYS.length - 1 ? "rounded-tr-2xl" : ""
                            }`}
                          >
                            <span className="block text-sm text-[#C5A059] font-black">{day}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    {/* Table Body rows */}
                    <tbody className="divide-y divide-white/5">
                      {WEEK_GRID_ROWS.map((timeRow) => {
                        return (
                          <tr key={timeRow} className="hover:bg-white/[0.01] transition-colors">
                            {/* Time label column */}
                            <td className="py-6 px-2 font-mono text-[11px] text-zinc-400 font-bold border-r border-white/5 bg-zinc-950/40">
                              {timeRow}
                            </td>

                            {/* Day columns */}
                            {DAYS.map((day) => {
                              // Special case: Thursday 5:30 PM Faith Over Fear spans 75 mins (effectively occupies 5:30 PM row, and we rowSpan or hide the 6:30 PM slot for Thursday).
                              if (day === "Thursday" && timeRow === "6:30 PM") {
                                return null; // Hid this cell since Thursday 5:30 spans it.
                              }

                              // Special case: Friday 4:00 PM Elevate 60 spans 90 mins (effectively occupies 4:00 PM row, and we hide 4:15 PM slot for Friday).
                              if (day === "Friday" && timeRow === "4:15 PM") {
                                return null;
                              }

                              const slot = SCHEDULE_DATA[day]?.find((s) => s.time === timeRow);

                              // If Thursday 5:30 PM or Friday 4:00 PM, add rowSpan={2}
                              const isSpecialThursdayRow = day === "Thursday" && timeRow === "5:30 PM";
                              const isSpecialFridayRow = day === "Friday" && timeRow === "4:00 PM";

                              if (slot) {
                                const details = CLASS_DETAILS[slot.classId];
                                const isMatched = matchesFilters(slot);
                                
                                return (
                                  <td
                                    key={`${day}-${timeRow}`}
                                    rowSpan={isSpecialThursdayRow ? 2 : 1}
                                    className={`p-2 transition-all duration-300 ${
                                      isMatched ? "opacity-100" : "opacity-15 pointer-events-none scale-[0.98]"
                                    }`}
                                  >
                                    <button
                                      onClick={() => setSelectedClass(slot.classId)}
                                      className={`w-full text-left p-4 rounded-xl relative overflow-hidden transition-all duration-300 group focus:outline-none border hover:scale-[1.02] cursor-pointer ${
                                        (COLOR_MAP[details.glowColor] || COLOR_MAP.red).glass
                                      }`}
                                    >
                                      {/* Glowing indicator inside card */}
                                      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity pointer-events-none -translate-y-1/2 translate-x-1/2 ${
                                        (COLOR_MAP[details.glowColor] || COLOR_MAP.red).glow
                                      }`} />
 
                                      {/* Class Name */}
                                      <h4 className="font-bebas text-[17px] italic uppercase tracking-wider text-white leading-tight flex items-center justify-between gap-1">
                                        {details.name}
                                        <Maximize2 size={10} className={`text-zinc-500 transition-colors shrink-0 ${
                                          (COLOR_MAP[details.glowColor] || COLOR_MAP.red).hoverText
                                        }`} />
                                      </h4>
 
                                      {/* Time & Duration */}
                                      <div className="flex items-center gap-1.5 mt-2">
                                        <Clock size={9} className="text-zinc-500" />
                                        <span className="text-[9px] font-mono text-zinc-400">
                                          {slot.time} <span className="text-zinc-600">({slot.duration})</span>
                                        </span>
                                      </div>
 
                                      {/* Custom indicator details */}
                                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5">
                                        <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Intensity</span>
                                        <span className={`text-[8px] font-mono font-bold ${
                                          (COLOR_MAP[details.glowColor] || COLOR_MAP.red).text
                                        }`}>{slot.intensity}%</span>
                                      </div>
 
                                      {slot.note && (
                                        <span className={`absolute bottom-2.5 right-2 px-1.5 py-0.5 rounded text-[7px] font-mono font-bold bg-zinc-900 border uppercase tracking-widest ${
                                          (COLOR_MAP[details.glowColor] || COLOR_MAP.red).note
                                        }`}>
                                          {slot.note}
                                        </span>
                                      )}
                                    </button>
                                  </td>
                                );
                              }

                              return (
                                <td
                                  key={`${day}-${timeRow}`}
                                  className="p-1 border border-white/[0.02]"
                                >
                                  <div className="h-[92px] w-full rounded-xl bg-transparent opacity-[0.02] border border-dashed border-white/20" />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>

                  </table>

                </div>
              </motion.div>

            ) : (

              /* ── DAILY TIMELINE VIEW ── */
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side: Day selectors */}
                <div className="lg:col-span-3 flex overflow-x-auto lg:flex-col gap-2 pb-4 lg:pb-0 scrollbar-none">
                  {DAYS.map((day) => {
                    const isActive = activeDay === day;
                    const daySlots = SCHEDULE_DATA[day] || [];
                    const activeCount = daySlots.filter(matchesFilters).length;

                    return (
                      <button
                        key={day}
                        onClick={() => setActiveDay(day)}
                        className={`px-5 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-left transition-all duration-300 focus:outline-none shrink-0 border flex items-center justify-between gap-4 cursor-pointer ${
                          isActive
                            ? "glass-gold border-[#C5A059]/40 text-[#C5A059] bg-[#C5A059]/5"
                            : "glass border-white/5 text-zinc-400 hover:text-white hover:border-white/10"
                        }`}
                      >
                        <span>{day}</span>
                        {daySlots.length > 0 && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono ${
                            isActive ? "bg-[#C5A059] text-black font-black" : "bg-white/5 text-zinc-500"
                          }`}>
                            {activeCount} / {daySlots.length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right side: Daily List timeline */}
                <div className="lg:col-span-9 space-y-4">
                  {SCHEDULE_DATA[activeDay]?.filter(matchesFilters).length > 0 ? (
                    SCHEDULE_DATA[activeDay].filter(matchesFilters).map((slot, idx) => {
                      const details = CLASS_DETAILS[slot.classId];
                      const Icon = details.icon;
                      
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`glass-card rounded-2xl p-6 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden ${
                            (COLOR_MAP[details.glowColor] || COLOR_MAP.red).borderHover
                          }`}
                        >
                          {/* Accent highlight strip */}
                          <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b ${
                            (COLOR_MAP[details.glowColor] || COLOR_MAP.red).gradient
                          }`} />

                          {/* Left: Class Time and Name */}
                          <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                              (COLOR_MAP[details.glowColor] || COLOR_MAP.red).iconBg
                            }`}>
                              <Clock size={20} />
                            </div>
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-mono text-lg font-bold text-white leading-none">{slot.time}</span>
                                <span className="glass rounded px-2.5 py-0.5 text-[8px] font-mono uppercase tracking-widest text-zinc-500 border border-white/6">
                                  {slot.duration}
                                </span>
                                {slot.note && (
                                  <span className={`flex items-center gap-1 text-[8px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded border ${
                                    (COLOR_MAP[details.glowColor] || COLOR_MAP.red).note
                                  }`}>
                                    <Lock size={8} /> {slot.note}
                                  </span>
                                )}
                              </div>

                              <h4 className="font-bebas text-2xl uppercase italic tracking-wide text-white mt-1.5 flex items-center gap-2">
                                {details.name}
                                <span className="text-zinc-500 font-mono text-[10px] not-italic lowercase">({details.tagline})</span>
                              </h4>
                              <p className="text-zinc-400 text-xs font-light max-w-lg mt-1.5 leading-relaxed">
                                {details.desc}
                              </p>
                            </div>
                          </div>

                          {/* Right: Info and Book action */}
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0 shrink-0">
                            <div className="text-left sm:text-right">
                              <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">Intensity Level</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs font-mono font-bold ${
                                  (COLOR_MAP[details.glowColor] || COLOR_MAP.red).text
                                }`}>{slot.intensity}%</span>
                                <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/6 inline-block">
                                  <div className={`h-full rounded-full ${
                                    (COLOR_MAP[details.glowColor] || COLOR_MAP.red).progress
                                  }`} style={{ width: `${slot.intensity}%` }} />
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedClass(slot.classId)}
                                className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/8 transition-colors cursor-pointer"
                              >
                                Info
                              </button>
                              <button
                                onClick={handleBookClick}
                                className="px-4 py-2.5 bg-[#C5A059] hover:bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
                              >
                                Book Spot
                              </button>
                            </div>
                          </div>

                        </motion.div>
                      );
                    })
                  ) : (
                    // Rest / Recovery Card
                    <div className="glass-card rounded-2xl p-10 border border-white/8 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[340px]">
                      <div className="absolute inset-0 glow-gold opacity-15 pointer-events-none" />
                      <div className="w-16 h-16 rounded-2xl glass border border-white/10 flex items-center justify-center mb-6">
                        <Moon size={28} className="text-[#C5A059]" />
                      </div>
                      <h4 className="font-bebas text-3xl uppercase italic tracking-wider text-white mb-2">Rest & Recharge</h4>
                      <p className="text-zinc-400 text-xs font-light max-w-sm leading-relaxed mb-6">
                        There are no classes scheduled that match your selected filters. Enjoy rest, fuel your body, and get ready for the next round.
                      </p>
                      <div className="flex gap-2">
                        {["Sleep Well", "Hydrate", "Refuel"].map((item, i) => (
                          <span key={i} className="glass rounded-full px-4 py-1.5 text-[8px] font-mono uppercase tracking-widest text-zinc-500 border border-white/6">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SCRIPTURE WATERMARK / VERSE DISPLAY (Jeremiah 29:11)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-12 pb-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <GlassPanel className="py-16 px-8 md:px-16 border border-[#C5A059]/20 relative overflow-hidden">
            
            {/* Background watermarked Cross & Gloves styling */}
            <div className="absolute inset-0 bg-[#0c0c0c]/80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-5">
              <Image
                src="/resilient_boxing_gym_logo_transparent_high_def.png"
                alt="Gym Crest"
                fill
                className="object-contain"
              />
            </div>
            
            {/* Custom ambient glows */}
            <div className="absolute -top-20 right-0 w-[400px] h-[400px] glow-gold opacity-30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] glow-red opacity-20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">
              {/* Gym Gloves/Cross watermark badge */}
              <div className="w-14 h-14 rounded-full border border-[#C5A059]/30 bg-zinc-950 flex items-center justify-center mb-8 relative">
                <div className="absolute inset-0 rounded-full glow-gold opacity-20 animate-pulse" />
                <span className="text-[#C5A059] font-serif text-lg font-black">†</span>
              </div>

              {/* Jeremiah 29:11 Verse text */}
              <blockquote className="text-[clamp(18px,2.5vw,30px)] font-light leading-relaxed italic text-white/95 mb-6">
                "For I know the plans I have for you," <span className="text-zinc-500 font-mono text-sm not-italic uppercase tracking-widest">declares the Lord</span>, "plans to prosper you and not to harm you, plans to give you hope and a future."
              </blockquote>
              
              <cite className="block text-[11px] font-mono not-italic uppercase tracking-[0.3em] text-[#C5A059]">
                — Jeremiah 29:11
              </cite>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          APP DOWNLOAD PROMO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-10 bg-[#090909]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <GlassPanel className="p-8 md:p-12 border border-white/5 relative">
            <div className="absolute inset-0 glow-gold opacity-15 pointer-events-none rounded-2xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded bg-[#C5A059]/10 border border-[#C5A059]/20 text-[8px] font-mono uppercase tracking-widest text-[#C5A059]">
                    WellnessLiving app
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Live Schedule Booking</span>
                </div>
                
                <h3 className="font-bebas text-3xl md:text-5xl uppercase italic tracking-wide text-white mb-4">
                  Manage Your Schedule On The Go
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-2xl">
                  Resilient Boxing is fully integrated with WellnessLiving. Download the app to book bags, check active schedules, track punch details, and manage check-ins directly from your phone.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 justify-end">
                <a
                  href="https://apps.apple.com"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-white/8 hover:border-white/20 transition-all duration-300 group"
                >
                  <Smartphone size={18} className="text-[#C5A059]" />
                  <div className="text-left">
                    <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Download for</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C5A059] transition-colors">Apple iOS</p>
                  </div>
                </a>
                <a
                  href="https://play.google.com"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-white/8 hover:border-white/20 transition-all duration-300 group"
                >
                  <Download size={18} className="text-[#C5A059]" />
                  <div className="text-left">
                    <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Download for</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#C5A059] transition-colors">Android Store</p>
                  </div>
                </a>
              </div>

            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer onBookClick={handleBookClick} />

      {/* ═══════════════════════════════════════════════════════
          CLASS DETAIL OVERLAY DRAWER / MODAL
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedClass && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedClass(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-lg glass-heavy rounded-2xl overflow-hidden border border-white/12 shadow-2xl z-10"
            >
              {/* Highlight accent bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${
                (COLOR_MAP[CLASS_DETAILS[selectedClass].glowColor] || COLOR_MAP.red).modalGradient
              }`} />

              <div className="relative p-8">
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedClass(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-lg glass flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/15 transition-all focus:outline-none cursor-pointer"
                >
                  ✕
                </button>

                {/* Header Section */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center border shrink-0 ${
                    (COLOR_MAP[CLASS_DETAILS[selectedClass].glowColor] || COLOR_MAP.red).iconBg
                  }`}>
                    {React.createElement(CLASS_DETAILS[selectedClass].icon, { size: 24 })}
                  </div>
                  <div>
                    <span className={`text-[9px] font-mono uppercase tracking-[0.25em] block mb-0.5 ${
                      (COLOR_MAP[CLASS_DETAILS[selectedClass].glowColor] || COLOR_MAP.red).text
                    }`}>
                      Class Details
                    </span>
                    <h3 className="font-bebas text-3xl uppercase italic leading-none text-white tracking-wide">
                      {CLASS_DETAILS[selectedClass].name}
                    </h3>
                  </div>
                </div>

                {/* Main Image Banner */}
                <div className="relative w-full h-[220px] rounded-xl overflow-hidden mb-6 border border-white/8 bg-zinc-950">
                  <Image
                    src={CLASS_DETAILS[selectedClass].image}
                    alt={CLASS_DETAILS[selectedClass].name}
                    fill
                    className="object-cover"
                    sizes="480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="glass px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest text-zinc-300 border border-white/10">
                      Duration: {CLASS_DETAILS[selectedClass].duration}
                    </span>
                    <span className={`glass px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-widest border ${
                      (COLOR_MAP[CLASS_DETAILS[selectedClass].glowColor] || COLOR_MAP.red).badge
                    }`}>
                      Intensity: {CLASS_DETAILS[selectedClass].intensity}%
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-zinc-300 text-xs font-light leading-relaxed mb-6">
                  {CLASS_DETAILS[selectedClass].desc}
                </p>

                {/* Scripture Panel */}
                <div className={`glass rounded-xl p-4 border-l-2 mb-6 bg-zinc-950/20 ${
                  (COLOR_MAP[CLASS_DETAILS[selectedClass].glowColor] || COLOR_MAP.red).modalScripture
                }`}>
                  <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                    "{CLASS_DETAILS[selectedClass].scripture.text}"
                  </p>
                  <p className={`text-[9px] font-mono uppercase tracking-widest mt-2 ${
                    (COLOR_MAP[CLASS_DETAILS[selectedClass].glowColor] || COLOR_MAP.red).text
                  }`}>
                    {CLASS_DETAILS[selectedClass].scripture.reference}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedClass(null)}
                    className="flex-1 py-3.5 glass rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/8 hover:border-white/20 transition-all focus:outline-none cursor-pointer"
                  >
                    Back to Schedule
                  </button>
                  <button
                    onClick={() => {
                      setSelectedClass(null);
                      handleBookClick();
                    }}
                    className="flex-1 py-3.5 bg-[#C5A059] hover:bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all focus:outline-none cursor-pointer"
                  >
                    Book Class
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BOOKING MODAL ── */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultProgramId="elevate"
      />
    </div>
  );
}
