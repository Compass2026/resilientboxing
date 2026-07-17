import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../data/products";
import { Sparkles, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use first image or fallback
  const mainImage = product.images[0] || "/placeholder-product.png";

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="glass-card flex flex-col h-full rounded-2xl overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full bg-[#121212] flex items-center justify-center p-6 overflow-hidden border-b border-white/5">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.charityProduct && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#b22222]/95 border border-red-500/20 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg">
              <Heart size={10} className="fill-white" /> Supports a Cause
            </span>
          )}
          {product.featured && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#C5A059]/95 border border-yellow-500/20 text-[9px] font-bold uppercase tracking-wider text-black shadow-lg">
              <Sparkles size={10} className="fill-black" /> Featured
            </span>
          )}
        </div>

        {/* Product Image */}
        <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-105">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain"
            priority={product.featured}
            loading={product.featured ? "eager" : "lazy"}
          />
        </div>
      </div>

      {/* Info Block */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#C5A059]">
            {product.category}
          </span>
          {/* Title */}
          <h3 className="font-bebas text-xl md:text-2xl uppercase italic tracking-wide text-white group-hover:text-[#C5A059] transition-colors leading-tight mt-1 mb-2">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3">
          <span className="text-sm font-semibold text-zinc-300">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
