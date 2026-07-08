"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, BookOpen, Sparkles, Check, ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Ticker from "../../components/Ticker";
import BookingModal from "../../components/BookingModal";
import { CLASSES } from "../../data/classes";

export default function FormClassPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cls = CLASSES.find((c) => c.slug === "form") || CLASSES[2];

  const faqs = [
    {
      q: "Is this class required before taking other classes?",
      a: "No, it's not strictly required, but it is highly recommended. Form and Foundation is designed to build the critical mechanics and confidence you need to get the most out of our higher-intensity classes like Elevate 60.",
    },
    {
      q: "What if I have zero boxing experience?",
      a: "This is the perfect place to start. We go slow, break down each movement, and ensure you understand the 'why' and 'how' behind stance, punches, and defense. There is zero pressure and no contact.",
    },
    {
      q: "Do I need wraps and gloves?",
      a: "Yes. Even though we focus on form, we still do light bag work to practice punch landing. We provide gloves for your first session, and hand wraps are available for purchase at the desk.",
    },
    {
      q: "Will I still get a good workout?",
      a: "Yes. While the focus is on technical instruction rather than non-stop conditioning, executing proper boxing form, footwork, and stance is an active, core-engaging workout that burns significant calories.",
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
              Polish your boxing mechanics. Learn the critical footwork, stance, and leverage that form the basis of the sweet science.
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
                  FORM AND FOUNDATION is dedicated entirely to the mechanics of boxing. Stance, balance, hip rotation, punching leverage, and basic defense are broken down in structured detail.
                </p>
                <p className="text-zinc-300 text-sm leading-loose font-light">
                  Whether you are preparing for your very first round or you are an experienced boxer looking to erase bad habits, this class provides the focused technical environment needed to refine your skills. Every session is designed to make you a smarter, safer, and more effective mover.
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
                  { label: "Target Area", val: "Boxing Mechanics & Footwork" },
                  { label: "Calorie Burn", val: "400 - 600 Calories" },
                  { label: "Skill Level", val: "All Levels (Highly Recommended for Beginners)" },
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
                    { day: "Tuesday", times: ["5:30 PM"] },
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
              03 — Overview
            </p>
            <h2 className="font-bebas text-[clamp(44px,5vw,76px)] uppercase italic leading-none tracking-tight">
              What You'll Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cls.highlights.map((hl, i) => (
              <div key={i} className="glass-card rounded-2xl p-7 border border-white/8 relative">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059] mb-6">
                  <BookOpen size={20} />
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
        defaultProgramId="form"
      />
    </div>
  );
}
