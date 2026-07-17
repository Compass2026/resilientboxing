import React from "react";
import { Inbox, RefreshCw } from "lucide-react";

interface EmptyProductsStateProps {
  onClearFilters: () => void;
}

export default function EmptyProductsState({ onClearFilters }: EmptyProductsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 glass rounded-2xl border border-white/5 bg-zinc-900/10">
      <div className="w-16 h-16 rounded-2xl glass border border-white/8 flex items-center justify-center text-zinc-500 mb-6 animate-bounce">
        <Inbox size={28} />
      </div>
      <h3 className="font-bebas text-2xl md:text-3xl uppercase italic tracking-wide text-white mb-2">
        No Products Found
      </h3>
      <p className="text-zinc-500 text-xs md:text-sm font-light max-w-sm mb-6 leading-relaxed">
        No products match those filters. Try adjusting your search query, size, color, or price filters to find what you are looking for.
      </p>
      <button
        onClick={onClearFilters}
        className="flex items-center gap-2 px-6 py-3.5 bg-[#C5A059] hover:bg-white text-black transition-all duration-300 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/40 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
      >
        <RefreshCw size={13} /> Clear Filters
      </button>
    </div>
  );
}
