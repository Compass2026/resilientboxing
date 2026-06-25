"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, Zap, Sparkles, Check, ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Ticker from "../../components/Ticker";
import BookingModal from "../../components/BookingModal";
import { CLASSES } from "../../data/classes";

export default function KickClassPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cls = CLASSES.find((c) => c.slug === "kick") || CLASSES[1];

  const faqs = [
    {
      q: "Do we kick each other in this class?",
      a: "No. Kick 60 is a non-contact, bag-work and pad-work class. You will be hitting specialized heavy bags and focus mitts, ensuring a high-yield workout without the risk of sparring contact.",
    },
    {
      q: "Is it suitable for complete beginners?",
      a: "Absolutely. Most of our members start with zero martial arts experience. Our instructors are trained to show you step-by-step stances, hip rotations for kicks, and proper alignment for punches.",
    },
    {
      q: "What equipment do I need?",
      a: "You will need hand wraps and boxing gloves. For your first session, we provide gloves for free, and wraps can be bought at the desk. You do not need shin guards since it is bag-only.",
    },
    {
      q: "How many calories does Kick 60 burn?",
      a: "Because kickboxing utilizes both upper and lower body muscle groups continuously, it is an extremely high-calorie burn class. Members typically burn between 800 to 1,000 calories per 60-minute session.",
    },
  ];

  return (
    <div className="noise bg-[#080808] min-h-screen text-white relative">
      {/* ── BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] glow-gold opacity-45 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] glow-red opacity-30 rounded-full blur-3xl" />
      </div>

      <Header onBookClick={() => setBookingOpen(true)} />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden z-10 pt-20">
        <div className="absolute inset-0">
          <Image
            src={cls.image}
            alt={cls.name}
            fill
            className="object-cover object-center scale-105 filter brightness-50"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10 w-full flex flex-col justify-end h-full pb-16">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C5A059] mb-6 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} /> Back to Homepage
            </Link>
            <p className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C5A059] mb-4">
              Program {cls.num} — {cls.tagline}
            </p>
            <h1 className="font-bebas text-[clamp(56px,8vw,120px)] uppercase italic leading-none tracking-tight mb-4">
              {cls.name}
            </h1>
            <p className="text-zinc-300 text-base md:text-lg font-light leading-relaxed max-w-2xl">
              High-velocity Dutch combinations weaving punches, knees, and kicks. Destroy calories and build explosive reflexes.
            </p>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <Ticker />

      {/* ═══════════════════════════════════════════════════════
          SCRIPTURE SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="glass-gold rounded-2xl p-8 md:p-12 relative overflow-hidden text-center max-w-4xl mx-auto border border-[#C5A059]/20 shadow-xl shadow-black/30">
            <div className="absolute top-0 left-0 w-full h-full glow-gold opacity-20 pointer-events-none" />
            <span className="text-[#C5A059] inline-block mb-4">
              <Sparkles size={24} />
            </span>
            <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed italic mb-5">
              "{cls.scripture.text}"
            </blockquote>
            <cite className="block text-[10px] font-mono not-italic uppercase tracking-[0.3em] text-[#C5A059]">
              — {cls.scripture.reference}
            </cite>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CORE SPECIFICATIONS & DETAILS
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-12">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Class details and description */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h2 className="font-bebas text-3xl md:text-4xl uppercase italic tracking-wider text-white mb-5">
                  About the Class
                </h2>
                <p className="text-zinc-300 text-sm leading-loose font-light mb-6">
                  Kick 60 is our signature Dutch-style kickboxing class. It integrates quick, heavy combinations of punches, elbows, knees, and kicks, demanding maximum output from your body.
                </p>
                <p className="text-zinc-300 text-sm leading-loose font-light">
                  Dutch kickboxing is famous for its boxing-heavy setups that flow seamlessly into devastating low-kicks and knee strikes. You will work on specialized heavy bags, focus mitts, and dynamic partner drills to build coordination and agility.
                </p>
              </div>

              {/* Intensity Scale */}
              <div className="glass-card rounded-2xl p-6 border border-white/8">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-3">
                  <span>Intensity & Output Level</span>
                  <span className="text-[#C5A059] font-bold">{cls.intensity}%</span>
                </div>
                <div className="h-2 w-full glass rounded-full overflow-hidden border border-white/6">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#C5A059] to-[#e8c87a]"
                    initial={{ width: 0 }}
                    animate={{ width: `${cls.intensity}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Target Area", val: "Full Body, Legs & Hips" },
                  { label: "Calorie Burn", val: "800 - 1000 Calories" },
                  { label: "Skill Level", val: "All Levels (Beginner Friendly)" },
                  { label: "Gear Required", val: "Gloves & Wraps" },
                ].map((spec, i) => (
                  <div key={i} className="glass rounded-xl p-5 border border-white/6">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
                      {spec.label}
                    </p>
                    <p className="text-sm font-semibold text-white uppercase tracking-wide">
                      {spec.val}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Schedule & Booking Card */}
            <div className="lg:col-span-5">
              <div className="glass-heavy rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/80 relative">
                <div className="absolute top-0 right-0 w-48 h-48 glow-gold opacity-20 rounded-full pointer-events-none" />
                
                <h3 className="font-bebas text-2xl uppercase italic tracking-wide text-white mb-6 border-b border-white/8 pb-4">
                  Weekly Class Times
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                    { day: "Tuesday", times: ["6:00 PM"] },
                    { day: "Thursday", times: ["6:00 PM"] },
                    { day: "Saturday", times: ["9:00 AM"] },
                  ].map((sched, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                        {sched.day}
                      </span>
                      <div className="flex gap-2">
                        {sched.times.map((t, tIdx) => (
                          <span key={tIdx} className="glass-gold text-[9px] font-mono uppercase tracking-widest text-[#C5A059] px-2.5 py-1 rounded-md border border-[#C5A059]/20">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass rounded-xl p-4 border border-white/6 mb-6">
                  <div className="flex items-start gap-3">
                    <Check size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      First class is free for all Missouri local residents. No contract required.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setBookingOpen(true)}
                  className="w-full py-4.5 bg-[#C5A059] hover:bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-black/40 cursor-pointer flex items-center justify-center gap-2"
                >
                  Book Free Session <MoveRight size={13} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          WHAT TO EXPECT SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="text-center mb-16">
            <p className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C5A059] mb-4">
              02 — Overview
            </p>
            <h2 className="font-bebas text-[clamp(44px,5vw,76px)] uppercase italic leading-none tracking-tight">
              What You'll Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cls.highlights.map((hl, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 border border-white/8 relative">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] mb-6">
                  <Zap size={20} />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider mb-3">
                  {hl.title}
                </h3>
                <p className="text-zinc-400 text-xs font-light leading-relaxed">
                  {hl.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-[10px] font-mono uppercase tracking-[0.45em] text-[#C5A059] mb-4">
              Got Questions?
            </p>
            <h2 className="font-bebas text-[clamp(40px,4vw,64px)] uppercase italic leading-none tracking-tight">
              Class FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const active = activeFaq === i;
              return (
                <div
                  key={i}
                  className="glass rounded-2xl border border-white/8 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(active ? null : i)}
                    className="w-full text-left p-6 flex justify-between items-center focus:outline-none cursor-pointer"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-white">
                      {faq.q}
                    </span>
                    <span className={`text-[#C5A059] transition-transform duration-300 ${active ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: active ? "auto" : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-xs text-zinc-400 font-light leading-relaxed border-t border-white/5 pt-4 bg-white/2">
                      {faq.a}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer onBookClick={() => setBookingOpen(true)} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultProgramId="kick"
      />
    </div>
  );
}
