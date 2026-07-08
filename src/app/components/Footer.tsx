"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

interface FooterProps {
  onBookClick: () => void;
}

export default function Footer({ onBookClick }: FooterProps) {
  return (
    <footer className="relative z-10">
      {/* Location / Info Section */}
      <section id="location" className="border-t border-white/5 py-16 bg-[#080808]/40 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            {/* Brand / Logo */}
            <div className="flex items-center gap-4">
              <div className="relative w-28 h-16 shrink-0">
                <Image
                  src="/resilient_boxing_gym_logo_transparent_high_def.png"
                  alt="Resilient Boxing Logo"
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
              <div>
                <p className="font-bebas text-xl uppercase italic text-white leading-none">Resilient Boxing</p>
                <p className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                  Faith & Boxing
                </p>
              </div>
            </div>

            {/* Location Address */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-4">Location</p>
              <a
                href="https://maps.google.com/?q=51+Elaine+Dr,+O'Fallon,+MO+63366"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group mb-4"
              >
                <MapPin size={13} className="text-[#C5A059] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    51 Elaine Drive
                  </p>
                  <p className="text-xs text-zinc-500">O'Fallon, MO 63366</p>
                </div>
              </a>
              <a href="tel:+13143155046" className="flex items-center gap-3 group">
                <Phone size={13} className="text-[#C5A059] shrink-0" />
                <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                  (314) 315-5046
                </span>
              </a>
            </div>

            {/* Booking Call To Action */}
            <div>
              <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mb-4">Book a Session</p>
              <p className="text-xs text-zinc-500 font-light leading-relaxed mb-5">
                Schedule through WellnessLiving. Your first session is always free.
              </p>
              <button
                onClick={onBookClick}
                className="px-6 py-3 glass-gold rounded-xl text-[11px] font-bold uppercase tracking-widest text-[#C5A059] border border-[#C5A059]/25 hover:bg-[#C5A059] hover:text-black transition-all duration-300 focus:outline-none cursor-pointer"
              >
                Book Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[9px] font-mono uppercase tracking-widest text-zinc-700">
            © 2026 Resilient Boxing · O'Fallon, MO · Faith Over Fear
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Instagram", url: "https://instagram.com" },
              { label: "Facebook", url: "https://facebook.com" },
              { label: "WellnessLiving", url: "https://www.wellnessliving.com/signup/resilient_boxing" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-mono uppercase tracking-widest text-zinc-700 hover:text-[#C5A059] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
