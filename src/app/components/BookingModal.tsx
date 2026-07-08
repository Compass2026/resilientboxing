"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CLASSES } from "../data/classes";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramId?: string;
}

export default function BookingModal({ isOpen, onClose, defaultProgramId = "elevate" }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: defaultProgramId,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      window.open("https://www.wellnessliving.com/signup/resilient_boxing", "_blank");
      onClose();
      setSubmitted(false);
      setForm({ name: "", email: "", phone: "", program: defaultProgramId });
    }, 2600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-md glass-heavy rounded-2xl overflow-hidden border border-white/12 shadow-2xl shadow-black/70 z-10"
          >
            {/* Gold top accent bar */}
            <div className="h-0.5 w-full bg-gradient-to-r from-[#C5A059]/80 via-[#C5A059] to-[#C5A059]/30" />

            {/* Inset glow */}
            <div className="absolute top-0 left-0 w-full h-48 glow-gold opacity-30 pointer-events-none rounded-t-2xl" />

            <div className="relative z-10 p-7">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-7 h-7 glass rounded-lg flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none"
              >
                <X size={14} />
              </button>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 glass-gold rounded-2xl border border-[#C5A059]/30 flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#C5A059] text-2xl">✓</span>
                  </div>
                  <h3 className="font-bebas text-3xl uppercase italic mb-3">You're In.</h3>
                  <p className="text-zinc-400 text-sm font-light mb-6">
                    Redirecting you to WellnessLiving to pick your time...
                  </p>
                  <div className="flex justify-center">
                    <div className="w-5 h-5 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                  </div>
                </div>
              ) : (
                <>
                  {/* Logo + Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-24 h-14 shrink-0">
                      <Image
                        src="/resilient_boxing_gym_logo_transparent_high_def.png"
                        alt="Resilient Boxing Logo"
                        fill
                        className="object-contain animate-pulse"
                        sizes="96px"
                      />
                    </div>
                    <div>
                      <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A059]">
                        Resilient Boxing
                      </p>
                      <h3 className="font-bebas text-2xl uppercase italic leading-tight text-white">
                        Your First Round Free
                      </h3>
                    </div>
                  </div>

                  <p className="text-zinc-500 text-xs font-light mb-7 leading-relaxed">
                    Drop your info below. We'll get you set up in WellnessLiving to choose your class time.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
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
                          id={id}
                          type={type}
                          required
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
                      <div className="relative">
                        <select
                          id="program"
                          value={form.program}
                          onChange={(e) => setForm({ ...form, program: e.target.value })}
                          className="w-full glass rounded-xl px-4 py-3 text-sm text-zinc-300 border border-white/8 focus:border-[#C5A059]/40 focus:outline-none transition-colors bg-[#111] appearance-none cursor-pointer"
                        >
                          {CLASSES.map((c) => (
                            <option key={c.id} value={c.id} className="bg-[#111] text-white">
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                          ▼
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-[#C5A059] hover:bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
                    >
                      Sign Up & Book Now
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
