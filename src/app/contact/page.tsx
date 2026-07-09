"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookingModal from "../components/BookingModal";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Activity,
  Shield,
  BookOpen,
  Zap,
  Heart
} from "lucide-react";

// ─── GLASS PANEL ───────────────────────────────────────────────────────────────
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

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [showLoading, setShowLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "elevate",
    message: "",
    website: "", // Honeypot input
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Name is required.";
      } else if (value.trim().length < 2) {
        error = "Name must be at least 2 characters.";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email address is required.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address.";
      }
    } else if (name === "phone") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(value.replace(/\s+/g, ""))) {
        error = "Please enter a valid phone number.";
      }
    } else if (name === "message") {
      if (!value.trim()) {
        error = "Please enter your message.";
      } else if (value.trim().length < 10) {
        error = "Message must be at least 10 characters.";
      }
    }
    return error;
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Real-time clearance of validation warning upon user editing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (form.website) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);
      return;
    }

    const fields = ["name", "email", "phone", "message"];
    const newErrors: FormErrors = {};
    let hasError = false;

    fields.forEach((field) => {
      const error = validateField(field, form[field as keyof typeof form]);
      if (error) {
        newErrors[field as keyof FormErrors] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });

    if (hasError) {
      const firstInvalidField = fields.find((f) => newErrors[f as keyof FormErrors]);
      if (firstInvalidField) {
        document.getElementById(firstInvalidField)?.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate server action submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        program: "elevate",
        message: "",
        website: "",
      });
      setTouched({});
      setErrors({});
    }, 2000);
  };

  const programList = [
    { id: "elevate", name: "Elevate 60 (Foundation & Fire)" },
    { id: "form", name: "Form & Foundation (Technique)" },
    { id: "weight", name: "Iron & Strength (Conditioning)" },
    { id: "faithoverfear", name: "Faith Over Fear (Gloves & Scripture)" },
    { id: "fightcamp", name: "Fight Camp (Advanced)" }
  ];

  return (
    <div className="noise relative bg-[#080808] min-h-screen overflow-x-hidden text-white font-inter">
      {/* ── LOADING SCREEN ── */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* ── AMBIENT GLOW BLOBS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] glow-red opacity-40 rounded-full blur-3xl" />
        <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] glow-gold opacity-30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] glow-white opacity-20 rounded-full blur-3xl" />
      </div>

      <GlowSpotlight />

      <Header onBookClick={() => setBookingOpen(true)} />

      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 pt-40 pb-12 md:pt-48 md:pb-16 max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="max-w-3xl">
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-4">
            Get In The Ring
          </p>
          <h1 className="font-bebas text-[clamp(56px,8vw,120px)] uppercase italic leading-[0.85] tracking-tight text-white mb-6">
            Contact <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(197,160,89,0.8)" }}>Resilient.</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xl">
            Have questions about our classes, training schedules, or booking your first free session? Drop us a line. We are here to answer your call and guide you to your corner.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          CONTACT SPLIT CONTAINER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 pb-28 max-w-[1400px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT: DETAILS & MAP */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GlassPanel className="p-6 border border-white/5 bg-[#0A0A0A]/40 backdrop-blur-sm">
                <Phone className="text-[#C5A059] w-5 h-5 mb-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Call or Text</h3>
                <a href="tel:+13143155046" className="text-sm font-semibold text-white hover:text-[#C5A059] transition-colors">
                  (314) 315-5046
                </a>
              </GlassPanel>

              <GlassPanel className="p-6 border border-white/5 bg-[#0A0A0A]/40 backdrop-blur-sm">
                <Mail className="text-[#C5A059] w-5 h-5 mb-4" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1.5">Email Us</h3>
                <a href="mailto:info@resilientboxing.com" className="text-sm font-semibold text-white hover:text-[#C5A059] transition-colors truncate block">
                  info@resilientboxing.com
                </a>
              </GlassPanel>
            </div>

            {/* Hours Panel */}
            <GlassPanel className="p-6 border border-white/5 bg-[#0A0A0A]/40 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-5 border-b border-white/5 pb-4">
                <Clock className="text-[#C5A059] w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Operational Hours</h3>
              </div>
              <div className="space-y-3 text-xs">
                {[
                  { days: "Monday & Wednesday", time: "9:00 AM – 8:00 PM" },
                  { days: "Tuesday & Thursday", time: "9:00 AM – 7:30 PM" },
                  { days: "Friday", time: "9:00 AM – 5:00 PM" },
                  { days: "Saturday", time: "9:00 AM – 11:30 AM" },
                  { days: "Sunday", time: "Closed (Rest Day)" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-1">
                    <span className="text-zinc-400 font-medium">{item.days}</span>
                    <span className="text-white font-mono">{item.time}</span>
                  </div>
                ))}
              </div>
            </GlassPanel>

            {/* Map Preview Panel */}
            <GlassPanel className="border border-white/5 bg-[#0A0A0A]/40 backdrop-blur-sm overflow-hidden flex flex-col">
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">Our Location</h3>
                    <p className="text-sm font-semibold text-white">51 Elaine Drive</p>
                    <p className="text-xs text-zinc-500">O'Fallon, MO 63366</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=51+Elaine+Dr,+O'Fallon,+MO+63366"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#C5A059] hover:text-white transition-colors bg-[#C5A059]/10 border border-[#C5A059]/20 rounded-lg px-3 py-2 shrink-0"
                  >
                    Directions <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>

              {/* Styled Google Maps Embed */}
              <div className="relative w-full h-[240px] bg-zinc-950 overflow-hidden">
                <iframe
                  title="Resilient Boxing Gym Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.384661750275!2d-90.71638848465176!3d38.823611079582696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87df2fdfa3bb6e9b%3A0xc3c54fb233b8a1c9!2s51%20Elaine%20Dr%2C%20O'Fallon%2C%20MO%2063366!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: "grayscale(1) invert(0.9) contrast(1.2) opacity(0.85)"
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </GlassPanel>

          </div>

          {/* RIGHT: ACCESSIBLE CONTACT FORM */}
          <div className="lg:col-span-7">
            <GlassPanel className="p-8 md:p-10 border border-white/5 bg-[#0A0A0A]/40 backdrop-blur-sm relative">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="contact-form"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="font-bebas text-3xl md:text-4xl uppercase tracking-wider text-white mb-2">
                      Send a Message
                    </h2>
                    <p className="text-xs text-zinc-500 mb-8">
                      Required fields are marked with an asterisk (*).
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="space-y-6">
                      
                      {/* Honeypot Input (Visually Hidden, Accessibility Safe) */}
                      <div className="absolute" style={{ clipPath: "inset(50%)", width: "1px", height: "1px", overflow: "hidden", margin: "-1px", padding: 0, border: 0, whiteSpace: "nowrap" }}>
                        <label htmlFor="website">Leave this field blank</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          tabIndex={-1}
                          value={form.website}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>

                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          maxLength={80}
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                          className={`w-full border bg-[#0E0E0E] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                            touched.name && errors.name
                              ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                              : "border-white/10 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30"
                          }`}
                          placeholder="Fighter Name"
                        />
                        {touched.name && errors.name && (
                          <div id="name-error" className="flex items-center gap-1.5 text-red-400 text-xs mt-2 font-medium" aria-live="polite">
                            <AlertCircle size={12} />
                            {errors.name}
                          </div>
                        )}
                      </div>

                      {/* Contact Info Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        
                        {/* Email Field */}
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            maxLength={100}
                            autoComplete="email"
                            inputMode="email"
                            value={form.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                            className={`w-full border bg-[#0E0E0E] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                              touched.email && errors.email
                                ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                                : "border-white/10 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30"
                            }`}
                            placeholder="boxer@gmail.com"
                          />
                          {touched.email && errors.email && (
                            <div id="email-error" className="flex items-center gap-1.5 text-red-400 text-xs mt-2 font-medium" aria-live="polite">
                              <AlertCircle size={12} />
                              {errors.email}
                            </div>
                          )}
                        </div>

                        {/* Phone Field */}
                        <div>
                          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            maxLength={25}
                            autoComplete="tel"
                            inputMode="tel"
                            value={form.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
                            className={`w-full border bg-[#0E0E0E] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                              touched.phone && errors.phone
                                ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                                : "border-white/10 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30"
                            }`}
                            placeholder="(314) 000-0000"
                          />
                          {touched.phone && errors.phone && (
                            <div id="phone-error" className="flex items-center gap-1.5 text-red-400 text-xs mt-2 font-medium" aria-live="polite">
                              <AlertCircle size={12} />
                              {errors.phone}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Class Interest */}
                      <div>
                        <label htmlFor="program" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                          Program of Interest
                        </label>
                        <div className="relative">
                          <select
                            id="program"
                            name="program"
                            value={form.program}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full border border-white/10 bg-[#0E0E0E] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30 transition-all duration-300 appearance-none cursor-pointer"
                          >
                            {programList.map((prog) => (
                              <option key={prog.id} value={prog.id} className="bg-[#0E0E0E]">
                                {prog.name}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                            ▼
                          </div>
                        </div>
                      </div>

                      {/* Message Field */}
                      <div>
                        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
                          Your Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          maxLength={1000}
                          value={form.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                          className={`w-full border bg-[#0E0E0E] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 resize-y min-h-[120px] ${
                            touched.message && errors.message
                              ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/50"
                              : "border-white/10 focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/30"
                          }`}
                          placeholder="How can we help you step up?"
                        />
                        {touched.message && errors.message && (
                          <div id="message-error" className="flex items-center gap-1.5 text-red-400 text-xs mt-2 font-medium" aria-live="polite">
                            <AlertCircle size={12} />
                            {errors.message}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-3 px-8 py-5 border border-[#C5A059]/30 text-[#C5A059] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 focus:outline-none cursor-pointer ${
                          isSubmitting
                            ? "bg-[#C5A059]/10 border-[#C5A059]/20 cursor-wait opacity-80"
                            : "glass-gold hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059]"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={13} />
                          </>
                        )}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="relative mb-8">
                      <div className="absolute inset-0 bg-[#C5A059] opacity-20 rounded-full blur-xl animate-pulse" />
                      <CheckCircle2 size={64} className="text-[#C5A059] relative z-10" />
                    </div>
                    <h2 className="font-bebas text-4xl md:text-5xl uppercase italic tracking-wider text-white mb-4">
                      Message Received!
                    </h2>
                    <p className="text-zinc-400 text-sm font-light max-w-sm leading-relaxed mb-8">
                      Thank you for reaching out. We will get back to you shortly. Get ready to train, fight, and win.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-6 py-3 border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-white hover:border-white/20 transition-all duration-300 focus:outline-none"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </GlassPanel>
          </div>

        </div>
      </section>

      <Footer onBookClick={() => setBookingOpen(true)} />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultProgramId="elevate"
      />
    </div>
  );
}
