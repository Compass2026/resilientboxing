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
  { id: "elevate", name: "ELEVATE 60" },
  { id: "form", name: "FORM AND FOUNDATION" },
  { id: "faithoverfear", name: "FAITH OVER FEAR" },
  { id: "fightcamp", name: "FIGHT CAMP" },
];

const FAQS = [
  {
    q: "How do I book my first free class?",
    a: "Simply click any 'Book Free Class' button on this page, enter your contact details, and you will be redirected to our WellnessLiving signup portal to schedule your class. You can also download our dedicated mobile app."
  },
  {
    q: "Do I need to buy my own boxing gloves and wraps?",
    a: "We do not charge for your first class if you have your own equipment. If you need equipment, you can rent or buy from us (hand wraps are $14.99 and glove rental is $4.99). Additionally, if you choose to pay your membership in full, you will receive brand new, high-quality boxing gloves for free to keep!"
  },
  {
    q: "Do you offer any discounts for paying in full?",
    a: "Yes! If you choose to pay your membership in full, you will get 2 FREE months of membership and a pair of professional boxing gloves for free."
  },
  {
    q: "Are classes beginner-friendly?",
    a: "Absolutely. The first 15 minutes of Elevate 60 is spent teaching you the basics. If you want a deeper dive, our Form & Foundation class spends the first 30 minutes breaking down how and why we throw correct punches to get the most out of your workout. Both classes welcome complete beginners and build confidence from day one."
  },
  {
    q: "Do you have agreements or signup fees?",
    a: "No high-pressure sales pitches or hidden fees. We believe in building a faith-driven community based on trust. Check our WellnessLiving options or call/text us to find the membership plan that best fits your lifestyle."
  },
  {
    q: "Do I need to be religious to join?",
    a: "No, we welcome everyone with open arms, just like Jesus Christ welcomes us. Everyone is welcome! It doesn't matter what you look like or what you believe, just know we believe in you."
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
    } else if (id === "contact") {
      window.location.href = "/contact";
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
                ["Our Belief", "mission"],
                ["Schedule", "schedule"],
                ["Pricing", "pricing"],
                ["Contact", "contact"],
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
              onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
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
                  ["Our Belief", "mission"],
                  ["Schedule", "schedule"],
                  ["Pricing", "pricing"],
                  ["Contact", "contact"]
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
                  onClick={() => { setMenuOpen(false); window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank'); }}
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
          <div className="flex flex-col gap-8">

            {/* TIER 1: Punch Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#A3E635]/20 bg-black/40 backdrop-blur-xl p-8 md:p-10 transition-all duration-300 hover:border-[#A3E635]/40 hover:shadow-[0_0_30px_rgba(163,230,53,0.15)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col gap-6 items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl border-2 border-[#A3E635] flex items-center justify-center font-bebas text-4xl text-[#A3E635] shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.2)]">
                        1
                      </div>
                      <div>
                        <h3 className="font-bebas text-3xl md:text-4xl italic uppercase text-white tracking-wide leading-none">
                          Punch Cards
                        </h3>
                        <p className="text-xs text-[#A3E635] font-medium tracking-wide mt-1">Flexible class-based entry</p>
                      </div>
                    </div>
                    <div className="space-y-3 w-full border-t border-white/5 pt-4">
                      <div className="flex items-start gap-3">
                        <Check size={14} className="text-[#A3E635] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">Gives you unlimited access to the gym, unlimited classes</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={14} className="text-[#A3E635] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">Expires after three months</span>
                      </div>
                      <div className="flex items-start gap-3 bg-red-500/5 border border-red-500/10 rounded-xl p-3.5 mt-2 w-full">
                        <X size={14} className="text-red-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="text-xs font-semibold text-zinc-400">No Impact Wrap Integration</span>
                          <p className="text-[11px] text-zinc-500 mt-1 font-light leading-relaxed">
                            Does not measure punch power, track punches live, or show live screen leaderboards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing Options */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Option 10 Classes */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-6 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#A3E635]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Option A</p>
                          <h4 className="font-bebas text-2xl uppercase italic text-white mt-1 group-hover:text-[#A3E635] transition-colors">10 Classes</h4>
                        </div>
                        <div className="mt-8 flex items-baseline gap-2">
                          <span className="font-bebas text-4xl italic text-[#A3E635]">$200</span>
                          <span className="text-[9px] font-mono uppercase text-zinc-500">One-Time</span>
                        </div>
                      </button>

                      {/* Option 20 Classes */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-6 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#A3E635]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">Option B</p>
                          <h4 className="font-bebas text-2xl uppercase italic text-white mt-1 group-hover:text-[#A3E635] transition-colors">20 Classes</h4>
                        </div>
                        <div className="mt-8 flex items-baseline gap-2">
                          <span className="font-bebas text-4xl italic text-[#A3E635]">$350</span>
                          <span className="text-[9px] font-mono uppercase text-zinc-500">One-Time</span>
                        </div>
                      </button>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mt-2">
                        * Both expire after three months.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TIER 2: Month-to-Month Memberships */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#A855F7]/20 bg-black/40 backdrop-blur-xl p-8 md:p-10 transition-all duration-300 hover:border-[#A855F7]/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col gap-6 items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl border-2 border-[#A855F7] flex items-center justify-center font-bebas text-4xl text-[#A855F7] shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        2
                      </div>
                      <div>
                        <h3 className="font-bebas text-3xl md:text-4xl italic uppercase text-white tracking-wide leading-none">
                          Month-to-Month
                        </h3>
                        <p className="text-xs text-[#A855F7] font-medium tracking-wide mt-1">Flexible monthly memberships</p>
                      </div>
                    </div>
                    <div className="space-y-3 w-full border-t border-white/5 pt-4">
                      <div className="flex items-start gap-3">
                        <Check size={14} className="text-[#A855F7] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">Unlimited access to the gym</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={14} className="text-[#A855F7] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">Unlimited classes</span>
                      </div>
                      <div className="flex flex-col gap-1.5 bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-xl p-3.5 mt-2 w-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
                        <div className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#A855F7] mt-0.5 shrink-0" />
                          <span className="text-xs font-semibold text-zinc-200">Impact Wrap App Integration</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 pl-6 font-light leading-relaxed">
                          Measure punch power and track your punches live on our screens with a total score for each class.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing Options */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Option: Individual */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#A855F7]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">Individual</p>
                          <h4 className="font-bebas text-xl uppercase italic text-white mt-1 group-hover:text-[#A855F7] transition-colors">Individual</h4>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-3xl italic text-[#A855F7]">$100</span>
                            <span className="text-[9px] font-mono uppercase text-zinc-500">/mo</span>
                          </div>
                          <p className="text-[9px] text-zinc-400 font-light mt-2">+ $100 Cancellation Fee</p>
                        </div>
                      </button>

                      {/* Option: Family */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#A855F7]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">Family</p>
                          <h4 className="font-bebas text-xl uppercase italic text-white mt-1 group-hover:text-[#A855F7] transition-colors leading-tight">Family Membership</h4>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-3xl italic text-[#A855F7]">$180</span>
                            <span className="text-[9px] font-mono uppercase text-zinc-500">/mo</span>
                          </div>
                          <p className="text-[9px] text-zinc-400 font-light mt-2">+ $75 Cancellation Fee Per Person</p>
                        </div>
                      </button>

                      {/* Option: Additional People */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#A855F7]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">Add-On</p>
                          <h4 className="font-bebas text-xl uppercase italic text-white mt-1 group-hover:text-[#A855F7] transition-colors">Additional People</h4>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-3xl italic text-[#A855F7]">$80</span>
                            <span className="text-[9px] font-mono uppercase text-zinc-500">/mo</span>
                          </div>
                          <p className="text-[9px] text-zinc-400 font-light mt-2">Per additional person</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TIER 3: Annual Memberships */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#F97316]/20 bg-black/40 backdrop-blur-xl p-8 md:p-10 transition-all duration-300 hover:border-[#F97316]/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details */}
                  <div className="lg:col-span-5 flex flex-col md:flex-row lg:flex-col gap-6 items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl border-2 border-[#F97316] flex items-center justify-center font-bebas text-4xl text-[#F97316] shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                        3
                      </div>
                      <div>
                        <h3 className="font-bebas text-3xl md:text-4xl italic uppercase text-white tracking-wide leading-none">
                          Annual Membership
                        </h3>
                        <p className="text-xs text-[#F97316] font-medium tracking-wide mt-1">Value-focused yearly commitment</p>
                      </div>
                    </div>
                    <div className="space-y-3 w-full border-t border-white/5 pt-4">
                      <div className="flex items-start gap-3">
                        <Check size={14} className="text-[#F97316] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">Unlimited access to the gym</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check size={14} className="text-[#F97316] mt-0.5 shrink-0" />
                        <span className="text-xs font-light text-zinc-300">Unlimited classes</span>
                      </div>
                      <div className="flex flex-col gap-1.5 bg-[#F97316]/5 border border-[#F97316]/15 rounded-xl p-3.5 mt-2 w-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
                        <div className="flex items-start gap-2.5">
                          <Check size={14} className="text-[#F97316] mt-0.5 shrink-0" />
                          <span className="text-xs font-semibold text-zinc-200">Impact Wrap App Integration</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 pl-6 font-light leading-relaxed">
                          Measure punch power and track your punches live on our screens with a total score for each class.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Pricing Options */}
                  <div className="lg:col-span-7 flex flex-col gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Option: 1 Person */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#F97316]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">Annual</p>
                          <h4 className="font-bebas text-xl uppercase italic text-white mt-1 group-hover:text-[#F97316] transition-colors">1 Person</h4>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-3xl italic text-[#F97316]">$86</span>
                            <span className="text-[9px] font-mono uppercase text-zinc-500">/mo</span>
                          </div>
                          <p className="text-[9px] text-zinc-400 font-light mt-2">Billed monthly</p>
                        </div>
                      </button>

                      {/* Option: 2 People */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#F97316]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">Annual</p>
                          <h4 className="font-bebas text-xl uppercase italic text-white mt-1 group-hover:text-[#F97316] transition-colors">2 People</h4>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-3xl italic text-[#F97316]">$160</span>
                            <span className="text-[9px] font-mono uppercase text-zinc-500">/mo</span>
                          </div>
                          <p className="text-[9px] text-zinc-400 font-light mt-2">Billed monthly</p>
                        </div>
                      </button>

                      {/* Option: Additional Person */}
                      <button
                        onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                        className="group relative flex flex-col justify-between p-5 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 text-left transition-all duration-300 hover:border-[#F97316]/30 hover:scale-[1.02]"
                      >
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">Add-On</p>
                          <h4 className="font-bebas text-xl uppercase italic text-white mt-1 group-hover:text-[#F97316] transition-colors">Additional Person</h4>
                        </div>
                        <div className="mt-6">
                          <div className="flex items-baseline gap-1">
                            <span className="font-bebas text-3xl italic text-[#F97316]">$75</span>
                            <span className="text-[9px] font-mono uppercase text-zinc-500">/mo</span>
                          </div>
                          <p className="text-[9px] text-zinc-400 font-light mt-2">Per additional person billed monthly</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* TIER 4: Want to Pay in Full Promo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#C5A059]/30 bg-gradient-to-r from-black/60 to-zinc-900/60 p-8 md:p-12 shadow-2xl shadow-black/80">
                {/* Accent glows */}
                <div className="absolute inset-0 glow-gold opacity-15 pointer-events-none rounded-2xl" />
                <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="text-center lg:text-left flex-1">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-mono uppercase tracking-widest mb-4">
                      Special Offer
                    </span>
                    <h3 className="font-bebas text-3xl md:text-5xl uppercase italic tracking-wide text-white mb-3">
                      Want to pay in full?
                    </h3>
                    <p className="text-zinc-200 text-sm md:text-base font-medium leading-relaxed max-w-2xl">
                      Get <span className="text-[#C5A059] font-bold">2 FREE MONTHS</span> for paying it in full and a pair of <span className="text-[#C5A059] font-bold">FREE BOXING GLOVES</span>!
                    </p>
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-zinc-500 font-mono text-[10px] tracking-wider uppercase">
                      <span>Show Up</span>
                      <span>•</span>
                      <span>Put In The Work</span>
                      <span>•</span>
                      <span>See The Results</span>
                    </div>
                  </div>
                  <div className="shrink-0 flex flex-col items-center sm:items-stretch gap-4 w-full sm:w-auto">
                    <button
                      onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                      className="w-full sm:w-auto text-center px-8 py-4 bg-[#C5A059] hover:bg-white text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-[#C5A059]/20"
                    >
                      Pay in Full Offer
                    </button>
                    <a
                      href="tel:+13143155046"
                      className="w-full sm:w-auto text-center px-8 py-4 border border-white/10 hover:border-white/30 text-white font-bold text-xs uppercase tracking-widest rounded-xl bg-white/2 hover:bg-white/5 transition-all duration-300"
                    >
                      Call (314) 315-5046
                    </a>
                  </div>
                </div>
              </div>
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
                onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
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
