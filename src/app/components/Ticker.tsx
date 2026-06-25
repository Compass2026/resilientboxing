"use client";

import React from "react";

const TICKER_ITEMS = [
  "FAITH OVER FEAR", "51 ELAINE DR · O'FALLON MO", "RESILIENT BOXING GYM",
  "(314) 315-5046", "YOUR COMEBACK STARTS HERE", "FIRST CLASS FREE",
  "FAITH OVER FEAR", "51 ELAINE DR · O'FALLON MO", "RESILIENT BOXING GYM",
  "(314) 315-5046", "YOUR COMEBACK STARTS HERE", "FIRST CLASS FREE",
];

export default function Ticker() {
  return (
    <div className="glass border-y border-white/8 py-3.5 overflow-hidden relative z-10">
      <div className="ticker-inner">
        {TICKER_ITEMS.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 px-8 text-[10px] font-bold uppercase tracking-[0.35em] text-zinc-400 whitespace-nowrap"
          >
            {item}
            <span className="w-1 h-1 rounded-full bg-[#C5A059] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
