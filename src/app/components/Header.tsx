"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, ChevronDown, Shield, Zap, Activity, Heart, BookOpen } from "lucide-react";
import { CLASSES } from "../data/classes";

interface HeaderProps {
  onBookClick: () => void;
}

export default function Header({ onBookClick }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Map class IDs to their corresponding Lucide icons
  const iconMap = {
    weight: Activity,
    elevate: Shield,
    form: BookOpen,
    faithoverfear: Zap,
    fightcamp: Heart,
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/90 backdrop-blur-xl shadow-2xl shadow-black/70 border-b border-white/8"
          : "bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-sm"
      }`}
    >
      <div
        className={`max-w-[1400px] mx-auto px-5 md:px-12 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-[100px] md:h-[110px]" : "h-[160px] md:h-[200px]"
        }`}
      >
        {/* Left: Logo + Nav Links grouped together */}
        <div className="flex items-center gap-6 lg:gap-12">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center focus:outline-none group shrink-0"
          >
            <div
              className={`relative transition-all duration-500 group-hover:opacity-85 ${
                scrolled ? "w-[180px] h-[75px] md:w-[260px] md:h-[90px]" : "w-[240px] h-[100px] md:w-[420px] md:h-[150px]"
              }`}
            >
              <Image
                src="/resilient_boxing_gym_logo_transparent_high_def.png"
                alt="Resilient Boxing Gym"
                fill
                className="object-contain object-left"
                sizes="500px"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {/* Home */}
            <Link
              href="/"
              onClick={() => {
                if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none whitespace-nowrap"
            >
              Home
            </Link>

            {/* Classes Dropdown Parent */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <Link
                href={isHome ? "#classes" : "/#classes"}
                onClick={() => handleNavClick("classes")}
                className="px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none whitespace-nowrap flex items-center gap-1.5"
              >
                Classes <ChevronDown size={12} className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-[#C5A059]" : ""}`} />
              </Link>

              {/* Mega Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-1 w-[320px] glass-heavy rounded-2xl border border-white/10 p-4 shadow-2xl shadow-black/80 z-[100]"
                  >
                    <div className="absolute inset-0 glow-gold opacity-15 rounded-2xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col gap-1.5">
                      <p className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-1.5 px-3 border-b border-white/5 pb-2">
                        Training Disciplines
                      </p>
                      {CLASSES.map((cls) => {
                        const Icon = iconMap[cls.id as keyof typeof iconMap] || Shield;
                        return (
                          <Link
                            key={cls.id}
                            href={`/classes/${cls.slug}`}
                            className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-white/8 border border-transparent hover:border-white/5 transition-all duration-200 group/item"
                          >
                            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover/item:bg-[#C5A059]/10 group-hover/item:text-[#C5A059] group-hover/item:border-[#C5A059]/30 transition-colors shrink-0">
                              <Icon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white uppercase tracking-wide group-hover/item:text-[#C5A059] transition-colors leading-tight">
                                {cls.name}
                              </p>
                              <p className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider mt-0.5 leading-none">
                                {cls.tagline}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mission */}
            <Link
              href={isHome ? "#mission" : "/#mission"}
              onClick={() => handleNavClick("mission")}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none whitespace-nowrap"
            >
              Mission
            </Link>

            {/* Schedule */}
            <Link
              href="/schedule"
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] rounded-lg transition-all duration-200 focus:outline-none whitespace-nowrap ${
                pathname === "/schedule"
                  ? "text-[#C5A059] bg-[#C5A059]/10"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Schedule
            </Link>

            {/* Pricing */}
            <Link
              href="/pricing"
              className={`px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] rounded-lg transition-all duration-200 focus:outline-none whitespace-nowrap ${
                pathname === "/pricing"
                  ? "text-[#C5A059] bg-[#C5A059]/10"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Pricing
            </Link>

            {/* Find Us */}
            <Link
              href={isHome ? "#location" : "/#location"}
              onClick={() => handleNavClick("location")}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-white/90 hover:text-white rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none whitespace-nowrap"
            >
              Find Us
            </Link>
          </nav>
        </div>

        {/* Right: CTA + mobile hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onBookClick}
            className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#C5A059] rounded-xl text-xs font-bold uppercase tracking-widest text-black hover:bg-white transition-all duration-300 focus:outline-none shadow-lg shadow-black/40 cursor-pointer"
          >
            Book Free Class <ArrowUpRight size={13} />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 glass rounded-lg focus:outline-none cursor-pointer"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass-dark border-t border-white/5 overflow-hidden md:hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-zinc-300 text-left py-2 border-b border-white/5 focus:outline-none"
              >
                Home
              </Link>

              {/* Mobile Classes Submenu */}
              <div className="border-b border-white/5 pb-2">
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059] mb-2">
                  Classes
                </p>
                <div className="pl-3 space-y-3 mt-1.5">
                  {CLASSES.map((cls) => (
                    <Link
                      key={cls.id}
                      href={`/classes/${cls.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white"
                    >
                      {cls.name} <span className="text-[9px] font-mono text-zinc-600">— {cls.tagline}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href={isHome ? "#mission" : "/#mission"}
                onClick={() => handleNavClick("mission")}
                className="text-sm font-bold uppercase tracking-widest text-zinc-300 text-left py-2 border-b border-white/5 focus:outline-none"
              >
                Mission
              </Link>

              <Link
                href="/schedule"
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest text-left py-2 border-b border-white/5 focus:outline-none ${
                  pathname === "/schedule" ? "text-[#C5A059]" : "text-zinc-300"
                }`}
              >
                Schedule
              </Link>

              <Link
                href="/pricing"
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest text-left py-2 border-b border-white/5 focus:outline-none ${
                  pathname === "/pricing" ? "text-[#C5A059]" : "text-zinc-300"
                }`}
              >
                Pricing
              </Link>

              <Link
                href={isHome ? "#location" : "/#location"}
                onClick={() => handleNavClick("location")}
                className="text-sm font-bold uppercase tracking-widest text-zinc-300 text-left py-2 border-b border-white/5 focus:outline-none"
              >
                Find Us
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onBookClick();
                }}
                className="mt-2 w-full py-4 glass-gold rounded-xl text-xs font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/30 focus:outline-none cursor-pointer"
              >
                Book Free Class →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
