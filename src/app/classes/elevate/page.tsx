"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, Shield, Sparkles, Check, ArrowLeft } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Ticker from "../../components/Ticker";
import BookingModal from "../../components/BookingModal";
import { CLASSES } from "../../data/classes";
const BoxingGloveIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 122.88 118.71"
    fill="currentColor"
    className={className}
    style={{ display: "inline-block", verticalAlign: "middle" }}
  >
    <path d="M51.31,31.23c2.55-4.65,5.15-8.64,7.79-12c0.1-0.13,0.2-0.25,0.3-0.38c3.19-5.52,5.43-11.01,2.84-12.81l0,0 c-1.68-1.16-4.12-1.2-6.67-0.64c-3.81,0.83-7.67,2.93-9.99,4.82c-3.04,2.47-5.75,5.62-8.07,8.98c-2.76,4.01-4.93,8.28-6.38,12.04 c-1.48,3.85-2.54,7.96-3.15,12.36c-0.59,4.29-0.75,8.85-0.44,13.69c2.83,7.42,6.63,14,11.44,19.69c0.36,0.41,0.72,0.81,1.09,1.21 c5.54,5.96,12.31,10.72,20.21,14.36l0,0c0.09,0.04,0.18,0.09,0.27,0.15c0.95-0.07,1.92-0.16,2.9-0.28c1.7-0.21,3.35-0.48,4.96-0.81 c5.3-1.09,9.78-2.69,14.01-4.83c4.28-2.16,8.34-4.88,12.77-8.15c2.16-1.6,4.31-3.32,6.44-5.17c2.12-1.84,4.14-3.75,6.05-5.74l0,0 c4.16-4.7,7.01-9.24,8.61-13.63c1.55-4.26,1.91-8.38,1.11-12.38c-0.74-3.73-3.16-8.11-6.22-12.32c-3.91-5.38-8.82-10.38-12.66-13.4 c-1.65-1.3-3.28-2.39-4.88-3.27c-5.18-2.83-10.31-3.58-15.3-2.11c-5.09,1.5-10.16,5.29-15.11,11.53c-2.06,3.59-4.37,6.95-6.13,9.51 c-0.48,0.7-0.9,1.31-1.55,2.3c-0.77,1.16-2.34,1.48-3.5,0.71C50.93,33.91,50.6,32.38,51.31,31.23L51.31,31.23z M19.5,66.5 c-0.17,6.41,0.83,9.06,5.6,15.25c1.68,2.18,3.51,4.36,5.5,6.54c3.73,2.86,4.32,5.71,1.4,8.57l-1.4,1.56 c-2.52,1.56-5.31,1.85-9.04-2.34l-5.54-7.03c-2.49-3.16-5.72-6.19-5.96-10.43c-0.04-0.79-0.01-1.6,0.09-2.44l-2.43,2.51 c-0.79,1-1.43,2.03-1.88,3.1C5.39,82.82,5.12,83.89,5.06,85c-0.21,3.71,3.45,9.41,8.27,14.78c5.86,6.53,13.25,12.32,17.65,13.58 c6.96,2.01,14.64-6.88,21.08-14.32c0.88-1.02,1.74-2.01,2.58-2.96c-7.18-3.96-13.31-8.84-18.42-14.59 c-0.42-0.47-0.83-0.94-1.23-1.42c-4.53-5.21-8.26-11.21-11.14-18.04L19.5,66.5L19.5,66.5z M59.89,97.79 c-1.27,1.37-2.62,2.93-4.03,4.56c-7.4,8.56-16.22,18.76-26.28,15.87c-5.24-1.51-13.61-7.92-20.02-15.07 C3.96,96.9-0.28,89.91,0.01,84.72c0.1-1.74,0.51-3.39,1.18-4.95c0.65-1.51,1.54-2.95,2.64-4.32l0,0c0.05-0.06,0.1-0.12,0.16-0.18 l18.43-19.06c-0.22-4.66-0.02-9.1,0.56-13.31c0.66-4.75,1.82-9.23,3.44-13.46c1.59-4.12,3.95-8.78,6.93-13.11 c2.57-3.72,5.61-7.24,9.04-10.03c2.82-2.29,7.5-4.84,12.11-5.84c3.79-0.83,7.62-0.64,10.61,1.44l0.01,0l0,0 c2.78,1.93,3.45,4.96,2.9,8.44c2.92-2.16,5.89-3.68,8.91-4.56c6.33-1.86,12.74-0.96,19.13,2.53c1.89,1.03,3.76,2.27,5.59,3.72 c4.15,3.27,9.43,8.64,13.63,14.41c3.44,4.73,6.19,9.79,7.09,14.31c0.97,4.89,0.55,9.91-1.33,15.06c-1.82,5-5.02,10.11-9.65,15.33 c-0.02,0.03-0.05,0.05-0.07,0.08l0,0c-2.09,2.16-4.21,4.17-6.37,6.05c-2.15,1.87-4.4,3.67-6.75,5.41c-4.65,3.44-8.94,6.3-13.5,8.6 c-4.61,2.33-9.49,4.08-15.27,5.27c-1.83,0.38-3.63,0.67-5.37,0.89C62.7,97.59,61.31,97.71,59.89,97.79L59.89,97.79z" />
  </svg>
);

export default function ElevateClassPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const cls = CLASSES.find((c) => c.slug === "elevate") || CLASSES[1];

  const faqs = [
    {
      q: "I have never boxed before. Can I take this class?",
      a: "Yes, 100%. Elevate 60 is built so that anyone can participate. The first 15 minutes of class is spent teaching you the basics. If you want a deeper dive, our Form & Foundation class spends the first 30 minutes breaking down how and why we throw correct punches to get the most out of your workout.",
    },
    {
      q: "Do I need to bring my own gloves and wraps?",
      a: "We do not charge for your first class if you have your own equipment. If you need equipment, you can rent or buy from us (hand wraps are $14.99 and glove rental is $4.99).",
    },
    {
      q: "What is a typical class format?",
      a: "We start with a dynamic warm-up to prep your joints. Then, we move to shadowboxing and stance work, followed by 6–8 rounds of structured combinations on the heavy bags. We close with core work and group conditioning.",
    },
    {
      q: "Is there sparring in Elevate 60?",
      a: "No. Elevate 60 is a non-contact class focused on bag work, conditioning, and authentic mechanics. If you are interested in sparring, check out our Fight Camp class.",
    },
  ];

  return (
    <div className="noise bg-[#080808] min-h-screen text-white relative">
      {/* ── BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] glow-green opacity-40 rounded-full blur-3xl" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] glow-green opacity-30 rounded-full blur-3xl" />
      </div>

      <Header onBookClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')} />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 min-h-[600px] flex items-center justify-center overflow-hidden z-10 pt-[180px] lg:pt-[240px]">
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

        <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Headline & Tagline */}
            <div className="lg:col-span-7">
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
                Authentic boxing fundamentals meet elite athletic conditioning. Forge a sound mind, power, and discipline on the heavy bags.
              </p>
            </div>

            {/* Right: Schedule & Booking Card */}
            <div className="lg:col-span-5 w-full">
              <div className="glass-heavy rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl shadow-black/80 relative">
                <div className="absolute top-0 right-0 w-48 h-48 glow-green opacity-20 rounded-full pointer-events-none" />
                
                <h3 className="font-bebas text-2xl uppercase italic tracking-wide text-white mb-6 border-b border-white/8 pb-4">
                  Weekly Class Times
                </h3>

                <div className="space-y-4 mb-8">
                  {[
                    { day: "Monday", times: ["5:30 AM", "6:00 PM"] },
                    { day: "Wednesday", times: ["5:30 AM", "6:00 PM"] },
                    { day: "Friday", times: ["4:00 PM"] },
                  ].map((sched, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                        {sched.day}
                      </span>
                      <div className="flex gap-2">
                        {sched.times.map((t, tIdx) => (
                          <span key={tIdx} className="glass-green text-[9px] font-mono uppercase tracking-widest text-[#C5A059] px-2.5 py-1 rounded-md border border-[#C5A059]/20">
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
                      First class is free for all Missouri local residents. No agreement required.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')}
                  className="w-full py-4.5 bg-[#C5A059] hover:bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-black/40 cursor-pointer flex items-center justify-center gap-2"
                >
                  Book Free Class <MoveRight size={13} />
                </button>
              </div>
            </div>

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
          <div className="glass-green rounded-2xl p-8 md:p-12 relative overflow-hidden text-center max-w-4xl mx-auto border border-[#C5A059]/20 shadow-xl shadow-black/30">
            <div className="absolute top-0 left-0 w-full h-full glow-green opacity-20 pointer-events-none" />
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
                  Elevate 60 is the signature program at Resilient Boxing. Designed to build functional strength, razor-sharp cardiovascular endurance, and authentic fight mechanics, this class forces you to leave everything on the bag.
                </p>
                <p className="text-zinc-300 text-sm leading-loose font-light">
                  We don't do aerobics boxing. You will learn real footwork, head movement, punching leverage, and defense. Each round is structured to challenge your physical endurance while forcing you to stay mentally calm and deliberate.
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
            </div>

            {/* Right: Technical Specifications Grid */}
            <div className="lg:col-span-5 w-full">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Target Area", val: "Full Body, Core & Cardio" },
                  { label: "Calorie Burn", val: "800 - 1,000 Calories" },
                  { label: "Skill Level", val: "All Levels (Beginner Friendly)" },
                  { label: "Gear Required", val: "Gloves & Hand Wraps" },
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
              01 — Overview
            </p>
            <h2 className="font-bebas text-[clamp(44px,5vw,76px)] uppercase italic leading-none tracking-tight">
              What You'll Experience
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <ul className="space-y-6">
              {cls.highlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-4 p-6 glass rounded-2xl border border-white/8 relative hover:border-[#C5A059]/30 transition-all duration-300">
                  <span className="text-[#C5A059] shrink-0 mt-0.5">
                    <BoxingGloveIcon className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">
                      {hl.title}
                    </h3>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed">
                      {hl.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
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

      <Footer onBookClick={() => window.open('https://www.wellnessliving.com/signup/resilient_boxing', '_blank')} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultProgramId="elevate"
      />
    </div>
  );
}
