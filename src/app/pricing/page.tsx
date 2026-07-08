"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingScreen from "../components/LoadingScreen";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MoveRight, MapPin, Phone, X, Menu, ArrowUpRight,
  ChevronDown, Activity, Zap, Shield, Heart, Info,
  Smartphone, Download, Check
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CLASSES = [
  { id: "elevate", name: "Elevate 60" },
  { id: "kick", name: "Kick 60" },
  { id: "weight", name: "Iron & Strength" },
  { id: "fightcamp", name: "Fight Camp" },
];

const FAQS = [
  {
    q: "How do I book my first free class?",
    a: "Simply click any 'Book Free Session' button on this page, enter your contact details, and you will be redirected to our WellnessLiving signup portal to schedule your session. You can also download our dedicated mobile app."
  },
  {
    q: "Do I need to buy my own boxing gloves and wraps?",
    a: "No! If you are just testing the waters with a free class, we will provide loaner gloves and wraps for you. If you choose our $119 Introductory Special, you will receive brand new, high-quality boxing gloves, professional hand wraps, and a gym T-shirt to keep."
  },
  {
    q: "What is your commitment incentive exactly?",
    a: "If you purchase our $119 intro package, you will have 30 days of unlimited classes. If you choose to commit to a regular ongoing membership before that 30-day period ends, your next full month is entirely free!"
  },
  {
    q: "Are classes beginner-friendly?",
    a: "Absolutely. Our Elevate 60 class is specifically structured as a 'Foundation & Fire' session. It is designed to welcome complete beginners, teach correct mechanics, and build confidence from day one. You work at your own pace."
  },
  {
    q: "Do you have contracts or signup fees?",
    a: "No high-pressure sales pitches or hidden fees. We believe in building a faith-driven community based on trust. Check our WellnessLiving options or call/text us to find the membership plan that best fits your lifestyle."
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

export default function PricingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", program: "elevate" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNavClick = (id: string | null) => {
    if (!id) {
      window.location.href = "/";
    } else if (id === "pricing") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "schedule") {
      window.location.href = "/schedule";
    } else {
      window.location.href = `/#${id}`;
    }
    setMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.open("https://www.wellnessliving.com/signup/resilient_boxing", "_blank");
      setBookingOpen(false);
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", program: "elevate" });
    }, 2600);
  };

  return (
    <div className="noise relative bg-[#080808] min-h-screen overflow-x-hidden text-white">

      {/* ── LOADING SCREEN ── */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* ── AMBIENT BACKGROUND GLOWS ── */}
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
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-xl shadow-2xl shadow-black/70 border-b border-white/8"
          : "bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm"
      }`}>
        <div className={`max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[120px]" : "h-[260px]"}`}>

          {/* Left Logo + Navigation */}
          <div className="flex items-center gap-8 md:gap-12">
            <button onClick={() => handleNavClick(null)} className="flex items-center focus:outline-none group shrink-0">
              <div className={`relative transition-all duration-500 group-hover:opacity-85 ${scrolled ? "w-[340px] h-[110px]" : "w-[650px] h-[240px]"}`}>
                <Image
                  src="/resilient_boxing_gym_logo_transparent_high_def.png"
                  alt="Resilient Boxing Gym"
                  fill
                  className="object-contain object-left"
                  sizes="700px"
                  priority
                />
              </div>
            </button>

            {/* Desktop Links */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                ["Home", null],
                ["Classes", "classes"],
                ["Mission", "mission"],
                ["Schedule", "schedule"],
                ["Pricing", "pricing"],
                ["Find Us", "location"],
              ].map(([label, id]) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(id)}
                  className={`px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] rounded-lg transition-all duration-200 focus:outline-none whitespace-nowrap ${
                    id === "pricing"
                      ? "text-[#C5A059] bg-[#C5A059]/10"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setBookingOpen(true)}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#C5A059] rounded-xl text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all duration-300 focus:outline-none shadow-lg shadow-black/40"
            >
              Book Free Class <ArrowUpRight size={13} />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 glass rounded-lg focus:outline-none">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="glass-dark border-t border-white/5 overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {[
                  ["Home", null],
                  ["Classes", "classes"],
                  ["Mission", "mission"],
                  ["Schedule", "schedule"],
                  ["Pricing", "pricing"],
                  ["Find Us", "location"]
                ].map(([label, id]) => (
                  <button
                    key={label}
                    onClick={() => handleNavClick(id)}
                    className={`text-sm font-bold uppercase tracking-widest text-left py-2 border-b border-white/5 focus:outline-none ${
                      id === "pricing" ? "text-[#C5A059]" : "text-zinc-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
                <button
                  onClick={() => { setMenuOpen(false); setBookingOpen(true); }}
                  className="mt-2 w-full py-4 glass-gold rounded-xl text-xs font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 focus:outline-none"
                >
                  Book Free Class →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-[280px] md:pt-[360px] pb-16 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-5 md:px-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C5A059] mb-4"
          >
            Invest In Yourself
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-bebas text-[clamp(50px,9vw,110px)] uppercase italic leading-[0.95] tracking-tight text-white mb-6"
          >
            Unleash <br className="xs:hidden" />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px #C5A059" }}>
              Your Power
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed"
          >
            Faith and boxing combined to shape your body and sharpen your mind. Choose your plan, jump in, and start your comeback.
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PRICING CARDS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">

            {/* CARD 1: Free Trial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex"
            >
              <GlassPanel className="p-8 md:p-10 flex flex-col justify-between w-full border border-white/6 hover:border-white/12 relative">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">First Steps</p>
                    <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-zinc-400">
                      <Shield size={16} />
                    </div>
                  </div>

                  <h3 className="font-bebas text-3xl md:text-4xl italic uppercase text-white tracking-wide leading-none mb-2">
                    First Round Free
                  </h3>
                  <p className="text-xs text-[#C5A059] font-medium tracking-wide mb-6">Test the waters. Find your fire.</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-bebas text-6xl md:text-7xl italic leading-none text-white">$0</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">No Commitment</span>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/6 mb-10">
                    {[
                      "1 free 60-minute boxing class",
                      "Full access to professional coaches",
                      "Complimentary glove & wrap loaners",
                      "Full tour of our O'Fallon gym facility",
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={14} className="text-[#C5A059] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-4 glass rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-200 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-300 focus:outline-none"
                >
                  Book Free Session
                </button>
              </GlassPanel>
            </motion.div>

            {/* CARD 2: Intro Pack (Highlighted) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex"
            >
              <GlassPanel gold className="p-8 md:p-10 flex flex-col justify-between w-full border border-[#C5A059]/30 relative shadow-2xl shadow-black/70">
                <div className="absolute top-0 right-0 bg-[#C5A059] text-black text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                  Best Value
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059]/80 font-semibold">Special Offer</p>
                    <div className="w-8 h-8 rounded-lg bg-[#C5A059] flex items-center justify-center text-black">
                      <Zap size={16} />
                    </div>
                  </div>

                  <h3 className="font-bebas text-3xl md:text-4xl italic uppercase text-white tracking-wide leading-none mb-2">
                    Contender Intro Pack
                  </h3>
                  <p className="text-xs text-[#C5A059] font-medium tracking-wide mb-6">Gear up with unlimited training.</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-bebas text-6xl md:text-7xl italic leading-none text-white">$119</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">One-Time Pay</span>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-[#C5A059]/20 mb-10">
                    {[
                      "30 Days of Unlimited sessions",
                      "Brand new boxing gloves (yours to keep)",
                      "Professional hand wraps (yours to keep)",
                      "Resilient Gym T-Shirt (yours to keep)",
                      "Full evaluation of stance & punches",
                      "Access to both boxing & strength classes",
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={14} className="text-[#C5A059] mt-0.5 shrink-0" />
                        <span className="text-xs font-semibold text-zinc-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-4 bg-[#C5A059] rounded-xl text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all duration-300 focus:outline-none shadow-xl shadow-[#C5A059]/10"
                >
                  Buy Intro Special
                </button>
              </GlassPanel>
            </motion.div>

            {/* CARD 3: Membership Commit */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex"
            >
              <GlassPanel className="p-8 md:p-10 flex flex-col justify-between w-full border border-white/6 hover:border-white/12 relative">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">Next Level</p>
                    <div className="w-8 h-8 rounded-lg glass border border-white/10 flex items-center justify-center text-zinc-400">
                      <Heart size={16} />
                    </div>
                  </div>

                  <h3 className="font-bebas text-3xl md:text-4xl italic uppercase text-white tracking-wide leading-none mb-2">
                    The Commitment
                  </h3>
                  <p className="text-xs text-[#C5A059] font-medium tracking-wide mb-6">Commit early, earn your reward.</p>

                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="font-bebas text-5xl md:text-6xl italic leading-none text-white">1 Month</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] font-bold">Entirely Free</span>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-white/6 mb-10">
                    {[
                      "Lock in regular monthly membership",
                      "Get your next full month 100% Free",
                      "Only valid if committed during intro period",
                      "Unlimited access to all scheduled hours",
                      "Priority mobile app class reservations",
                      "No long term locks or cancellation fees",
                    ].map((feat, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check size={14} className="text-[#C5A059] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="tel:+13143155046"
                  className="w-full py-4 glass rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-200 hover:text-white border border-white/8 hover:border-white/20 transition-all duration-300 focus:outline-none flex items-center justify-center gap-2"
                >
                  Call (314) 315-5046
                </a>
              </GlassPanel>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          APP PROMO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-8">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <GlassPanel className="p-8 md:p-12">
            <div className="absolute inset-0 glow-gold opacity-20 pointer-events-none rounded-2xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <p className="text-[9px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-3">Seamless Scheduling</p>
                <h3 className="font-bebas text-3xl md:text-5xl uppercase italic tracking-wide text-white mb-4">
                  Download the Resilient Boxing App
                </h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-2xl">
                  Sign up, book your bag, track your sessions, and make payments with ease. Search for "Resilient Boxing" on the App Store or Google Play Store. Both iOS and Android are fully supported.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row gap-4 justify-end">
                <a
                  href="https://apps.apple.com"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-white/8 hover:border-white/20 transition-all duration-300"
                >
                  <Smartphone size={18} className="text-[#C5A059]" />
                  <div className="text-left">
                    <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Download for</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-white">Apple iOS</p>
                  </div>
                </a>
                <a
                  href="https://play.google.com"
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-4 glass rounded-xl border border-white/8 hover:border-white/20 transition-all duration-300"
                >
                  <Download size={18} className="text-[#C5A059]" />
                  <div className="text-left">
                    <p className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">Download for</p>
                    <p className="text-xs font-bold uppercase tracking-wider text-white">Google Android</p>
                  </div>
                </a>
              </div>
            </div>
          </GlassPanel>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQS SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 md:py-24">
        <div className="max-w-[850px] mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">FAQ</p>
            <h2 className="font-bebas text-[clamp(36px,5vw,72px)] uppercase italic leading-none tracking-tight">
              Got Questions?<br />We've Got Answers.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="glass rounded-2xl overflow-hidden border border-white/6 transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-semibold text-sm md:text-base text-zinc-100 hover:text-white transition-colors">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#C5A059] shrink-0 transition-transform duration-300 ${
                        isOpen ? "-rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-white/4 text-xs md:text-sm font-light text-zinc-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER / FIND US
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 py-16 bg-[#090909]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Branding */}
            <div>
              <div className="relative w-36 h-20 mb-4">
                <Image
                  src="/resilient_boxing_gym_logo_transparent_high_def.png"
                  alt="Resilient Boxing Gym"
                  fill
                  className="object-contain object-left"
                  sizes="144px"
                />
              </div>
              <p className="text-zinc-400 text-xs font-light leading-relaxed max-w-xs">
                Resilient Boxing Gym combines the rigorous discipline of boxing with faith-driven support, helping you find strength in all areas of life.
              </p>
            </div>

            {/* Location & Contact */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-4">Location</p>
              <a
                href="https://maps.google.com/?q=51+Elaine+Dr,+O'Fallon,+MO+63366"
                target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-3 group mb-4"
              >
                <MapPin size={14} className="text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">51 Elaine Drive</p>
                  <p className="text-xs text-zinc-500">O'Fallon, MO 63366</p>
                </div>
              </a>
              <a href="tel:+13143155046" className="flex items-center gap-3 group">
                <Phone size={14} className="text-[#C5A059] shrink-0" />
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">(314) 315-5046</span>
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-4">Book Your Spot</p>
              <p className="text-xs text-zinc-500 font-light leading-relaxed mb-5">
                We manage all schedules and memberships through WellnessLiving. Join us and discover what you're capable of.
              </p>
              <button
                onClick={() => setBookingOpen(true)}
                className="px-6 py-3 bg-[#C5A059] text-black rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 focus:outline-none shadow-lg shadow-black/40"
              >
                Book Free Class Now
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer bar */}
      <div className="border-t border-white/5 py-6 bg-[#090909] relative z-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">
            © 2026 Resilient Boxing · O'Fallon, MO · Faith Over Fear
          </p>
          <div className="flex items-center gap-6">
            {["Instagram", "Facebook", "WellnessLiving"].map((s) => (
              <a key={s} href="#" className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 hover:text-[#C5A059] transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          BOOKING MODAL
      ═══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              onClick={() => setBookingOpen(false)}
            />

            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              className="relative w-full max-w-md glass-heavy rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-black/70 z-10"
            >
              <div className="h-0.5 w-full bg-gradient-to-r from-[#C5A059]/80 via-[#C5A059] to-[#C5A059]/30" />
              <div className="absolute top-0 left-0 w-full h-48 glow-gold opacity-30 pointer-events-none rounded-t-2xl" />

              <div className="relative z-10 p-7">
                <button onClick={() => setBookingOpen(false)} className="absolute top-5 right-5 w-7 h-7 glass rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none">
                  <X size={14} />
                </button>

                {submitted ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 glass-gold rounded-2xl border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-6">
                      <span className="text-[#C5A059] text-2xl">✓</span>
                    </div>
                    <h3 className="font-bebas text-3xl uppercase italic mb-3">You're In.</h3>
                    <p className="text-zinc-400 text-sm font-light mb-6">Redirecting you to WellnessLiving to pick your time...</p>
                    <div className="flex justify-center">
                      <div className="w-5 h-5 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-24 h-14 shrink-0">
                        <Image src="/resilient_boxing_gym_logo_transparent_high_def.png" alt="Resilient Boxing" fill className="object-contain" sizes="96px" />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A059]">Resilient Boxing</p>
                        <h3 className="font-bebas text-2xl uppercase italic leading-tight text-white">Your First Round Free</h3>
                      </div>
                    </div>

                    <p className="text-zinc-500 text-xs font-light mb-7 leading-relaxed">
                      Drop your info below. We'll get you set up in WellnessLiving to choose your class time.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      {[
                        { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", field: "name" as const },
                        { id: "email", label: "Email Address", type: "email", placeholder: "john@email.com", field: "email" as const },
                        { id: "phone", label: "Phone Number", type: "tel", placeholder: "(314) 555-0100", field: "phone" as const },
                      ].map(({ id, label, type, placeholder, field }) => (
                        <div key={id}>
                          <label htmlFor={id} className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 block mb-1.5">
                            {label}
                          </label>
                          <input
                            id={id} type={type} required
                            value={form[field]}
                            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                            placeholder={placeholder}
                            className="w-full glass rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 border border-white/8 focus:border-[#C5A059]/40 focus:outline-none transition-colors bg-transparent"
                          />
                        </div>
                      ))}

                      <div>
                        <label htmlFor="program" className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 block mb-1.5">
                          Preferred Program
                        </label>
                        <select
                          id="program"
                          value={form.program}
                          onChange={(e) => setForm({ ...form, program: e.target.value })}
                          className="w-full glass rounded-xl px-4 py-3 text-sm text-zinc-300 border border-white/8 focus:border-[#C5A059]/40 focus:outline-none transition-colors bg-[#111] appearance-none"
                        >
                          {CLASSES.map((c) => (
                            <option key={c.id} value={c.id} className="bg-[#111]">{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="mt-2 w-full py-4 glass-gold rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059] transition-all duration-300 focus:outline-none"
                      >
                        Reserve My Free Class →
                      </button>

                      <p className="text-center text-[9px] font-mono text-zinc-600 pt-1">
                        Or go directly to{" "}
                        <a href="https://www.wellnessliving.com/signup/resilient_boxing" target="_blank" rel="noopener noreferrer" className="text-zinc-400 underline underline-offset-2 hover:text-white">
                          WellnessLiving
                        </a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
