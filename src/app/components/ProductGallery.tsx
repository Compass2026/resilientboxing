"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // If no images are available, render a placeholder
  const galleryImages = images.length > 0 ? images : ["/placeholder-product.png"];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only navigate if the gallery is focused or hover
      if (document.activeElement?.closest(".product-gallery-container")) {
        if (e.key === "ArrowRight") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrev();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryImages]);

  return (
    <div
      ref={containerRef}
      className="product-gallery-container flex flex-col gap-4 focus:outline-none"
      tabIndex={0}
      aria-label={`${productName} image gallery. Use left and right arrows to navigate.`}
    >
      {/* Primary Image Container */}
      <div className="relative aspect-square w-full bg-[#121212] rounded-2xl overflow-hidden border border-white/8 flex items-center justify-center p-8 group">
        <Image
          src={galleryImages[activeIndex]}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-2 transition-all duration-300"
          priority
        />

        {/* Carousel Arrow Controls (Only show if multiple images exist) */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails List */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {galleryImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative aspect-square w-20 shrink-0 bg-[#121212] rounded-xl overflow-hidden border focus:outline-none transition-all duration-200 ${
                  isActive
                    ? "border-[#C5A059] ring-1 ring-[#C5A059]"
                    : "border-white/8 hover:border-white/20"
                }`}
                aria-label={`View image ${idx + 1} of ${galleryImages.length}`}
              >
                <Image
                  src={img}
                  alt={`${productName} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
