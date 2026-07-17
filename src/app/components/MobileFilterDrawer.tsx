"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProductFilters from "./ProductFilters";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  sizes: string[];
  colors: string[];
  selectedCategory: string;
  selectedSize: string;
  selectedColor: string;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  sortBy: string;
  onFilterChange: (key: string, value: any) => void;
  onClearFilters: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  categories,
  sizes,
  colors,
  selectedCategory,
  selectedSize,
  selectedColor,
  minPrice,
  maxPrice,
  searchQuery,
  sortBy,
  onFilterChange,
  onClearFilters,
}: MobileFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Trap focus & Escape close key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer content panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            ref={drawerRef}
            aria-modal="true"
            role="dialog"
            className="relative w-full max-w-[320px] h-full bg-[#080808]/95 backdrop-blur-md border-l border-white/8 p-6 flex flex-col z-10 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <div>
                <h3 className="font-bebas text-2xl uppercase italic tracking-wide text-white">
                  Filter & Sort
                </h3>
                <p className="text-[9px] font-mono uppercase text-[#C5A059] tracking-wider mt-0.5">
                  Refine Resilient Gear
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg glass border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A059]/40"
                aria-label="Close filters"
              >
                <X size={16} />
              </button>
            </div>

            {/* Filters Content */}
            <div className="flex-1">
              <ProductFilters
                categories={categories}
                sizes={sizes}
                colors={colors}
                selectedCategory={selectedCategory}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                minPrice={minPrice}
                maxPrice={maxPrice}
                searchQuery={searchQuery}
                sortBy={sortBy}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
