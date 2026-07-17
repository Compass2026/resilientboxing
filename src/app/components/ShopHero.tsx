import React from "react";

export default function ShopHero() {
  return (
    <section className="relative min-h-[320px] md:min-h-[380px] flex items-center justify-center overflow-hidden z-10 pt-[180px] md:pt-[220px] pb-12">
      {/* ── BACKGROUND GLOWS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[20%] w-[500px] h-[300px] glow-gold opacity-25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[25%] w-[400px] h-[250px] glow-white opacity-10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-12 relative z-10 w-full text-center">
        <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-3">
          RESILIENT GEAR
        </p>
        <h1 className="font-bebas text-[clamp(48px,6vw,84px)] uppercase italic leading-none tracking-tight mb-4 text-white">
          Wear What You Fight For
        </h1>
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-2xl mx-auto">
          Faith, strength and purpose go beyond the gym. Shop Resilient Boxing apparel and support the people, programs and causes that make our community stronger.
        </p>
      </div>

      {/* Decorative subtle border line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
