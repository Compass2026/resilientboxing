"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LoadingScreen from "./components/LoadingScreen";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  MoveRight, MapPin, Phone, ArrowUpRight,
  ChevronDown, Calendar, Clock, Smartphone, Download, Lock, Coffee, Info
} from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Ticker from "./components/Ticker";
import BookingModal from "./components/BookingModal";
import { CLASSES } from "./data/classes";



const STATS = [
  { val: "300+", label: "Lives Transformed" },
  { val: "5", label: "Elite Programs" },
  { val: "100%", label: "Faith Driven" },
  { val: "FREE", label: "First Class" },
];

const FAQS = [
  {
    question: "Do I have to be a Christian to work out here?",
    answer: "No. Everyone is welcome. We simply ask that you respect our faith-based environment. Our goal is to love people well and meet you wherever you are."
  },
  {
    question: "Is this gym beginner friendly?",
    answer: "Absolutely! Most of our members started with no boxing experience. We’ll teach you everything from the ground up."
  },
  {
    question: "Do you accept kids and adults?",
    answer: "Yes! We welcome kids, teens, adults, and seniors. Our workouts can be modified for all fitness levels."
  },
  {
    question: "What if I’m out of shape?",
    answer: "Perfect! You don’t need to be in shape to start—you get in shape by showing up. Everyone begins somewhere."
  },
  {
    question: "Do I have to spar?",
    answer: "No. Sparring is completely optional and only available in Fight Camp under the supervision of our experienced coaches."
  }
];

// ─── GLASS CARD ────────────────────────────────────────────────────────────────
function GlassPanel({ children, className = "", gold = false }: {
  children: React.ReactNode; className?: string; gold?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${gold ? "glass-gold" : "glass-card"} ${className}`}>
      {children}
    </div>
  );
}

// ─── MOUSE-TRACKED SPOTLIGHT ───────────────────────────────────────────────────
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
            `radial-gradient(500px circle at ${mx}px ${my}px, rgba(197,160,89,0.055) 0%, transparent 70%)`
        ),
      }}
    />
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeClass, setActiveClass] = useState(0);
  const [showLoading, setShowLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const ActiveIcon = CLASSES[activeClass].icon;

  return (
    <div className="noise relative bg-[#080808] min-h-screen overflow-x-hidden">

      {/* ── LOADING SCREEN ── */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* ── AMBIENT BACKGROUND GLOWS (fixed, always visible) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] glow-red opacity-60 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-15%] w-[600px] h-[600px] glow-gold opacity-50 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-[500px] h-[500px] glow-white opacity-40 rounded-full blur-3xl" />
      </div>

      {/* ── MOUSE SPOTLIGHT ── */}
      <GlowSpotlight />

      {/* ═══════════════════════════════════════════════════════
          NAV
      ═══════════════════════════════════════════════════════ */}
      <Header onBookClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')} />

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Parallax BG video */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroImgY, scale: heroScale }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero.png"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="/EmilsPromo.MOV" type="video/mp4" />
            <source src="/EmilsPromo.MOV" type="video/quicktime" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-[#080808]/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/75 via-transparent to-[#080808]/30" />
        </motion.div>

        {/* Hero glass content card */}
        <motion.div
          style={{ opacity: heroFade }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 pb-16 pt-[160px] md:pt-72"
        >
          {/* Left: Headline + logo lockup */}
          <div className="flex-1">


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C5A059] mb-5"
            >
              O'Fallon, Missouri — Faith & Boxing
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-bebas text-[clamp(68px,11vw,160px)] uppercase italic leading-[0.82] tracking-tight text-white mb-6"
            >
              Your<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #C5A059" }}>
                Come&shy;back
              </span>
              <br />Starts<br />Here.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 glass-gold rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all duration-300 focus:outline-none shadow-xl shadow-black/40"
              >
                <span className="relative z-10 flex items-center gap-3">
                  First Class Free
                  <MoveRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
              <button
                onClick={() => scrollTo("classes")}
                className="flex items-center gap-2 px-6 py-4 glass rounded-xl text-[11px] font-semibold uppercase tracking-widest text-zinc-300 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-300 focus:outline-none"
              >
                View Programs <ChevronDown size={13} />
              </button>
            </motion.div>
          </div>

          {/* Right: Glass stats panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-80 glass-heavy rounded-2xl p-6 border border-white/10 shadow-2xl shadow-black/60 shrink-0"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A059] mb-5 pb-4 border-b border-white/8">
              By The Numbers
            </p>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="glass rounded-xl p-4 text-center">
                  <div className="font-bebas text-3xl italic text-white leading-none">{s.val}</div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/8 flex items-center gap-3">
              <MapPin size={13} className="text-[#C5A059] shrink-0" />
              <span className="text-[10px] font-mono text-zinc-400">51 Elaine Dr · O'Fallon MO 63366</span>
            </div>
            <a href="tel:+13143155046" className="flex items-center gap-3 mt-2">
              <Phone size={13} className="text-[#C5A059] shrink-0" />
              <span className="text-[10px] font-mono text-zinc-400 hover:text-white transition-colors">(314) 315-5046</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="text-zinc-500" />
          </motion.div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ═══════════════════════════════════════════════════════
          INTRO QUOTE
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <GlassPanel className="p-10 md:p-16">
            {/* Inset glow */}
            <div className="absolute inset-0 glow-gold opacity-30 pointer-events-none rounded-2xl" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Logo badge */}
              <div className="lg:col-span-2 flex justify-center lg:justify-start">
                <div className="relative w-40 h-24">
                  <Image src="/resilient_boxing_gym_logo_transparent_high_def.png" alt="Resilient Boxing" fill className="object-contain object-center" sizes="144px" />
                </div>
              </div>

              {/* Quote */}
              <div className="lg:col-span-7">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-5">Our Mission</p>
                <blockquote className="text-[clamp(18px,2.2vw,28px)] font-light leading-[1.4] text-white/95 mb-4">
                  "At Resilient Boxing, our mission is to elevate lives through the power of boxing and faith."
                </blockquote>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  We believe a pair of boxing gloves can become more than just training equipment—they can be a tool for building confidence, discipline, resilience, and hope. Our purpose is to create an environment where people of all ages and fitness levels can grow stronger physically, mentally, and spiritually, discovering the best version of themselves one round at a time.
                </p>
              </div>

              {/* Verse */}
              <div className="lg:col-span-3">
                <div className="glass rounded-xl p-5 border-l-2 border-[#C5A059]/50">
                  <p className="text-xs font-light text-zinc-300 italic leading-relaxed">
                    "For God has not given us a spirit of fear — but of power, love, and a sound mind."
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-widest text-[#C5A059] mt-3">2 Timothy 1:7</p>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          COMMUNITY / TEAM PHOTO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-0">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="relative rounded-3xl overflow-hidden min-h-[520px] md:min-h-[620px]">

            {/* Full-bleed team photo */}
            <Image
              src="/C99D7191-430F-409D-B6AA-D5EE35736886.avif"
              alt="Resilient Boxing Gym Team — O'Fallon MO"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 via-transparent to-transparent" />

            {/* Content overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">

                {/* Left: section header + copy */}
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">Our Community</p>
                  <h2 className="font-bebas text-[clamp(44px,6vw,88px)] uppercase italic leading-none tracking-tight text-white mb-5">
                    More Than<br />
                    <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(197,160,89,0.85)" }}>A Gym.</span>
                  </h2>
                  <p className="text-zinc-300 text-sm font-light leading-loose max-w-md mb-6">
                    We're a family. When you walk through our doors in O'Fallon, you're not just joining a gym — you're joining a community of people who show up for each other, push each other, and believe in each other.
                  </p>
                  <button
                    onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                    className="flex items-center gap-3 px-7 py-3.5 bg-[#C5A059] rounded-xl text-[11px] font-bold uppercase tracking-widest text-black hover:bg-white transition-all duration-300 focus:outline-none"
                  >
                    Join the Family <MoveRight size={13} />
                  </button>
                </div>

                {/* Right: floating glass stat cards */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "500+", label: "Members", sub: "and counting" },
                    { val: "#1", label: "Rated Gym", sub: "in O'Fallon MO" },
                    { val: "5★", label: "Google Reviews", sub: "across 100+ reviews" },
                    { val: "Free", label: "First Class", sub: "no commitment" },
                  ].map((s, i) => (
                    <div key={i} className="glass-heavy rounded-2xl p-5 border border-white/10 backdrop-blur-2xl">
                      <div className="font-bebas text-4xl italic text-white leading-none">{s.val}</div>
                      <div className="text-xs font-bold text-[#C5A059] uppercase tracking-widest mt-1">{s.label}</div>
                      <div className="text-[9px] font-mono text-zinc-500 mt-0.5">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="classes" className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">02 — Disciplines</p>
              <h2 className="font-bebas text-[clamp(52px,7vw,100px)] uppercase italic leading-none tracking-tight">
                Choose Your<br />Round
              </h2>
            </div>
            <button
              onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
              className="self-start md:self-end flex items-center gap-2 px-6 py-3 glass rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white border border-white/8 hover:border-[#C5A059]/30 transition-all duration-300 focus:outline-none"
            >
              Book Any Class <ArrowUpRight size={12} />
            </button>
          </div>

          {/* Classes grid layout: accordion left + detail right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: accordion list */}
            <div className="lg:col-span-5 space-y-3">
              {CLASSES.map((cls, i) => {
                const Icon = cls.icon;
                const isActive = activeClass === i;
                return (
                  <motion.button
                    key={cls.id}
                    onClick={() => setActiveClass(i)}
                    className={`w-full text-left rounded-2xl p-5 transition-all duration-400 focus:outline-none relative overflow-hidden ${
                      isActive
                        ? "glass-gold border border-[#C5A059]/30 shadow-lg shadow-black/40"
                        : "glass border border-white/6 hover:border-white/15"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 glow-gold opacity-40 rounded-2xl pointer-events-none" />
                    )}
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive ? "bg-[#C5A059] text-black" : "glass border border-white/10 text-zinc-500"
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3">
                          <span className="font-bebas text-xl uppercase italic text-white tracking-wide">{cls.name}</span>
                          <span className={`text-[9px] font-mono uppercase tracking-widest ${isActive ? "text-[#C5A059]" : "text-zinc-600"}`}>
                            {cls.num}
                          </span>
                        </div>
                        <p className={`text-[10px] font-semibold uppercase tracking-widest mt-0.5 ${isActive ? "text-[#C5A059]/80" : "text-zinc-500"}`}>
                          {cls.tagline}
                        </p>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-zinc-500 shrink-0 transition-transform duration-300 ${isActive ? "-rotate-180 text-[#C5A059]" : ""}`}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right: class detail glass panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClass}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="glass-card rounded-2xl overflow-hidden h-full"
                >
                  {/* Top accent bar */}
                  <div className="h-px w-full bg-gradient-to-r from-[#C5A059]/80 via-[#C5A059]/20 to-transparent" />

                  <div className="p-8 md:p-10 relative">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 glow-gold opacity-30 rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 relative z-10">
                      {/* Left: Text & Details */}
                      <div className="md:col-span-7 flex flex-col justify-between">
                        <div>
                          {/* Icon + title */}
                          <div className="flex items-start gap-5 mb-8">
                            <div className="w-16 h-16 rounded-2xl glass-gold border border-[#C5A059]/30 flex items-center justify-center shrink-0">
                              <ActiveIcon size={28} className="text-[#C5A059]" />
                            </div>
                            <div>
                              <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-1">{CLASSES[activeClass].num} — {CLASSES[activeClass].tagline}</p>
                              <h3 className="font-bebas text-4xl md:text-5xl uppercase italic tracking-tight text-white leading-none">
                                {CLASSES[activeClass].name}
                              </h3>
                            </div>
                          </div>

                          <p className="text-zinc-300 text-sm leading-relaxed font-light mb-8">
                            {CLASSES[activeClass].desc}
                          </p>

                          {/* Schedule glass pill */}
                          <div className="glass rounded-xl px-5 py-3 mb-8 inline-flex items-center gap-3 border border-white/8">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse shrink-0" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">{CLASSES[activeClass].time}</span>
                          </div>
                        </div>

                        <div>
                          {/* Intensity bar */}
                          <div className="mb-8">
                            <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
                              <span>Intensity Level</span>
                              <span className="text-[#C5A059]">{CLASSES[activeClass].intensity}%</span>
                            </div>
                            <div className="h-1.5 w-full glass rounded-full overflow-hidden border border-white/6">
                              <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-[#C5A059] to-[#e8c87a]"
                                initial={{ width: 0 }}
                                animate={{ width: `${CLASSES[activeClass].intensity}%` }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                            className="flex items-center gap-3 px-7 py-3.5 glass-gold rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/25 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all duration-300 focus:outline-none"
                          >
                            Book This Class <MoveRight size={13} />
                          </button>
                        </div>
                      </div>

                      {/* Right: Image */}
                      <div className="md:col-span-5 flex items-center justify-center">
                        <div className="relative w-full aspect-[3/4] md:h-full md:aspect-auto min-h-[350px] md:min-h-[420px] rounded-2xl overflow-hidden border border-white/10 group/img shadow-2xl bg-black">
                          <Image
                            src={CLASSES[activeClass].image}
                            alt={CLASSES[activeClass].name}
                            fill
                            className="object-contain transition-transform duration-500 group-hover/img:scale-102"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 25vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAITH / MISSION SPLIT
      ═══════════════════════════════════════════════════════ */}
      <section id="mission" className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <GlassPanel className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[580px]">

              {/* Image side */}
              <div className="relative min-h-[320px] overflow-hidden">
                <Image
                  src="/faith.png"
                  alt="Faith Over Fear"
                  fill
                  className="object-cover object-center grayscale"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent lg:to-[#0D0D0D]/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent lg:hidden" />

                {/* Floating glass badge over image */}
                <div className="absolute bottom-6 left-6">
                  <div className="glass-heavy rounded-xl px-4 py-2.5 border border-white/10">
                    <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A059]">Faith Over Fear</p>
                    <p className="text-[10px] font-mono text-zinc-400">2 Timothy 1:7</p>
                  </div>
                </div>
              </div>

              {/* Copy side */}
              <div className="relative flex flex-col justify-center px-8 md:px-12 py-12">
                <div className="absolute inset-0 glow-gold opacity-20 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-6">03 — Our Belief</p>

                  {/* Logo in mission */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="relative w-28 h-16 shrink-0">
                      <Image src="/resilient_boxing_gym_logo_transparent_high_def.png" alt="Resilient Boxing" fill className="object-contain" sizes="112px" />
                    </div>
                    <div>
                      <p className="font-bebas text-2xl italic uppercase text-white leading-none">Resilient Boxing Gym</p>
                      <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">O'Fallon, MO</p>
                    </div>
                  </div>

                  <blockquote className="text-base md:text-lg font-light text-white/90 leading-relaxed italic border-l-2 border-[#C5A059]/50 pl-5 mb-8">
                    "At Resilient Boxing, we believe the best version of yourself is found in a relationship with Jesus Christ."
                  </blockquote>

                  <div className="space-y-5 text-zinc-400 text-sm leading-loose font-light mb-8">
                    <p>
                      Life often feels like a fight. We put on our boxing gloves and try to battle fear, anxiety, temptation, pain, and hardship in our own strength. Eventually, we all discover that fighting alone leaves us exhausted and knocked down.
                    </p>
                    <p>
                      Our greatest victory begins when we hang our gloves on the Cross, surrender our lives to Christ, and trust Him as our Savior. It is through His strength—not our own—that we are able to stand, overcome, and find lasting peace. As followers of Jesus, we lay down the ways of the world, pick up our cross daily, and walk in the victory He has already won for us.
                    </p>
                    <p>
                      Resilient Boxing exists to be a catalyst for that transformation. We use boxing as a tool to build discipline, confidence, perseverance, and community, but our ultimate purpose is to point people to Christ. We believe true resilience isn’t found in how hard you can punch—it’s found in knowing who fights beside you.
                    </p>
                    <p>
                      Our prayer is that every person who walks through our doors leaves stronger than when they arrived—not only physically, but mentally, emotionally, and spiritually—discovering that lasting strength is found in Christ alone.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {["Faith-anchored coaching & community", "Strength for life outside the gym", "Zero tolerance for quitting on yourself"].map((item, i) => (
                      <div key={i} className="glass rounded-lg px-4 py-3 flex items-center gap-3 border border-white/6">
                        <div className={`w-1 h-4 rounded-full shrink-0 ${i === 0 ? "bg-[#C5A059]" : "bg-white/20"}`} />
                        <span className="text-xs font-medium text-zinc-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">

          <div className="text-center mb-16">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">Member Stories</p>
            <h2 className="font-bebas text-[clamp(48px,6vw,88px)] uppercase italic leading-none tracking-tight">
              Real People.<br />Real Results.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Sarah M.",
                member: "Member since 2022",
                quote: "I came in nervous, not knowing what to expect. Within a week I felt like I'd been here forever. The coaches push you just enough, and the community picks you up when you can't push yourself.",
                program: "Elevate 60",
                rating: 5,
              },
              {
                name: "Marcus T.",
                member: "Member since 2021",
                quote: "Fight Camp changed everything for me. I've done other gyms my whole life — this is different. The faith piece grounds everything. You leave every session feeling stronger in every way.",
                program: "Fight Camp",
                rating: 5,
              },
              {
                name: "Linda R.",
                member: "Member since 2023",
                quote: "I was 52 years old and thought boxing wasn't for me. I was completely wrong. Best decision I've ever made. I've lost 30 lbs and gained more confidence than I've had in decades.",
                program: "Kick 60",
                rating: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-7 flex flex-col gap-5 border border-white/8 hover:border-[#C5A059]/25 transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#C5A059]/60 via-[#C5A059]/20 to-transparent" />

                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <span key={s} className="text-[#C5A059] text-sm">★</span>
                  ))}
                </div>

                <p className="text-zinc-300 text-sm font-light leading-relaxed flex-1 italic">
                  "{t.quote}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/6">
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{t.member}</p>
                  </div>
                  <div className="glass-gold rounded-lg px-3 py-1.5 border border-[#C5A059]/20">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-[#C5A059]">{t.program}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Schedule CTA strip */}
          <div className="mt-12 glass-heavy rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 glow-gold opacity-20 rounded-2xl pointer-events-none" />
            <div className="relative z-10">
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-2">Ready to Start?</p>
              <h3 className="font-bebas text-3xl md:text-4xl uppercase italic text-white leading-none">Your First Class Is On Us.</h3>
              <p className="text-zinc-400 text-sm font-light mt-2">No contract. No commitment. Just show up.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0">
              <button
                onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                className="flex items-center gap-2 px-8 py-4 bg-[#C5A059] rounded-xl text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all duration-300 focus:outline-none"
              >
                Book Free Class <MoveRight size={13} />
              </button>
              <a
                href="tel:+13143155046"
                className="flex items-center gap-2 px-8 py-4 glass rounded-xl text-xs font-bold uppercase tracking-widest text-white border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <Phone size={13} /> (314) 315-5046
              </a>
            </div>
          </div>

        </div>
      </section>


      <section id="schedule" className="relative z-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <GlassPanel className="p-8 md:p-14 relative overflow-hidden border border-white/5">
            <div className="absolute inset-0 glow-gold opacity-15 pointer-events-none rounded-2xl" />
            <div className="absolute -right-20 -top-20 w-80 h-80 glow-red opacity-30 rounded-full blur-3xl" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left: Text Content */}
              <div className="lg:col-span-7">
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">04 — Class Times</p>
                <h2 className="font-bebas text-[clamp(44px,6vw,80px)] uppercase italic leading-none tracking-tight text-white mb-6">
                  Ready to Step<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #C5A059" }}>Into The Ring?</span>
                </h2>
                <p className="text-zinc-300 text-sm font-light leading-relaxed max-w-xl mb-8">
                  We run structured training sessions from Monday through Saturday, offering morning and evening times to fit your lifestyle. From our core Elevate 60 conditioning to technical Form focus and advanced Fight Camp, there is a round designed for your goals.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                  {[
                    { days: "Mon · Wed", name: "Elevate 60", times: "5:30 AM & 5:30 PM" },
                    { days: "Tues · Sat", name: "Form & Foundation", times: "5:30 PM & 9:00 AM" },
                    { days: "Tues · Sat", name: "Fight Camp", times: "6:30 PM & 10:00 AM" },
                    { days: "Thursday", name: "Faith Over Fear", times: "5:30 PM - 6:45 PM" },
                    { days: "Mon · Wed · Thurs", name: "Evening Elevate", times: "7:00 PM" },
                    { days: "Friday", name: "Elevate 60", times: "4:00 PM" },
                  ].map((preview, i) => (
                    <div key={i} className="glass rounded-xl p-3 border border-white/5">
                      <p className="text-[8px] font-mono uppercase tracking-widest text-[#C5A059]">{preview.days}</p>
                      <p className="text-xs font-bold text-white uppercase tracking-wide mt-1 leading-none">{preview.name}</p>
                      <p className="text-[9px] font-mono text-zinc-500 mt-1.5 leading-none">{preview.times}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="/schedule"
                    className="group relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-[#C5A059] rounded-xl text-[11px] font-bold uppercase tracking-widest text-black hover:bg-white transition-all duration-300 focus:outline-none shadow-xl shadow-black/40"
                  >
                    View Interactive Schedule
                    <MoveRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                  <button
                    onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                    className="flex items-center gap-2 px-6 py-4 glass rounded-xl text-[11px] font-semibold uppercase tracking-widest text-zinc-300 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-300 focus:outline-none"
                  >
                    Book A Free Class
                  </button>
                </div>
              </div>

              {/* Right: Premium schedule image/graphic visual */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl bg-zinc-950/80">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <div className="absolute top-0 right-0 w-32 h-32 glow-gold opacity-20 rounded-full blur-2xl z-0" />
                  
                  {/* Floating glass overlay detailing the 2026 Schedule */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-20">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-1 rounded bg-[#C5A059]/10 border border-[#C5A059]/25 text-[8px] font-mono uppercase tracking-widest text-[#C5A059]">
                        2026 Schedule
                      </span>
                      <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-zinc-400">
                        <Calendar size={14} />
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-1 block">Faith & Boxing</span>
                      <h4 className="font-bebas text-3xl uppercase italic leading-none tracking-wide text-white mb-3">
                        6 Days of Power,<br />Love & Focus.
                      </h4>
                      <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest mb-4">
                        Jeremiah 29:11 · 2 Timothy 1:7
                      </p>
                      
                      {/* Mini checklist of features */}
                      <div className="space-y-2 border-t border-white/8 pt-4">
                        {["Filter by discipline", "Detailed class summaries", "Direct sign-up & booking", "WellnessLiving sync"].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-300">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* watermarked background visual */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                    <Image
                      src="/resilient_boxing_gym_logo_transparent_high_def.png"
                      alt="Gym Crest watermark"
                      width={300}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════ */}
      <section id="faq" className="relative z-10 py-24 md:py-32">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Title */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">05 — FAQ</p>
                <h2 className="font-bebas text-[clamp(44px,6vw,80px)] uppercase italic leading-none tracking-tight text-white mb-6">
                  Frequently<br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "2px #C5A059" }}>Asked Questions</span>
                </h2>
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-md">
                  Got questions about training at Resilient Boxing? We've got answers. If you don't find what you need, feel free to reach out to us directly.
                </p>
              </div>

              <div className="mt-8 lg:mt-0 pt-6 border-t border-white/5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">Still have questions?</p>
                <a
                  href="tel:+13143155046"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors duration-300"
                >
                  Call or Text (314) 315-5046
                  <MoveRight size={12} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Right Column: Accordion */}
            <div className="lg:col-span-7 space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    onClick={() => toggleFaq(index)}
                    className="glass-card rounded-2xl p-6 cursor-pointer select-none transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-bold text-white text-base md:text-lg leading-snug">
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#C5A059]/10 border-[#C5A059]/30 text-[#C5A059]" : ""}`}>
                        <ChevronDown size={16} />
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0, marginTop: 0 }}
                          animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                          exit={{ height: 0, opacity: 0, marginTop: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="text-zinc-400 text-sm font-light leading-relaxed border-t border-white/5 pt-4">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-32 md:py-48">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-0 glow-gold opacity-40" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10">
          <GlassPanel gold className="py-20 px-8 md:px-16 text-center">
            <div className="absolute inset-0 glow-gold opacity-50 rounded-2xl pointer-events-none" />

            {/* Big logo watermark */}
            <div className="relative w-56 h-32 mx-auto mb-8">
              <Image src="/resilient_boxing_gym_logo_transparent_high_def.png" alt="Resilient Boxing" fill className="object-contain" sizes="96px" />
            </div>

            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-6 relative z-10">06 — Your Move</p>
            <h2 className="font-bebas text-[clamp(56px,9vw,130px)] uppercase italic leading-[0.85] tracking-tight text-white mb-4 relative z-10">
              Next Round<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(197,160,89,0.8)" }}>On Us.</span>
            </h2>
            <p className="text-zinc-400 text-sm font-light max-w-md mx-auto mb-10 relative z-10">
              Your first class is completely free. Show up. We'll handle the rest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button
                onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                className="group flex items-center gap-3 px-10 py-5 glass-gold rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all duration-300 focus:outline-none shadow-xl shadow-black/30"
              >
                Claim Free Class
                <MoveRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <a
                href="tel:+13143155046"
                className="flex items-center gap-3 px-8 py-5 glass rounded-xl text-[11px] font-bold uppercase tracking-widest text-zinc-300 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-300"
              >
                <Phone size={13} /> (314) 315-5046
              </a>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          LOCATION
      ═══════════════════════════════════════════════════════ */}
      <Footer onBookClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')} />

      {/* ═══════════════════════════════════════════════════════
          MOBILE STICKY CTA
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed bottom-0 left-0 w-full z-40 md:hidden px-4 pb-5 pt-3 bg-gradient-to-t from-[#080808] to-transparent"
          >
            <button
              onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
              className="w-full py-4 glass-gold rounded-xl text-xs font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 focus:outline-none backdrop-blur-2xl cursor-pointer"
            >
              Book Free Class — First Class On Us
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultProgramId="elevate"
      />
    </div>
  );
}
