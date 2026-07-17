import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "../data/products";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div
            key={idx}
            className="glass-card flex flex-col h-full rounded-2xl overflow-hidden animate-pulse"
          >
            {/* Image Skeleton */}
            <div className="aspect-square w-full bg-zinc-900/80 border-b border-white/5" />
            {/* Info Skeleton */}
            <div className="p-5 flex-1 flex flex-col gap-3">
              <div className="h-2 w-16 bg-zinc-800 rounded" />
              <div className="h-6 w-3/4 bg-zinc-800 rounded" />
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                <div className="h-4 w-12 bg-zinc-800 rounded" />
                <div className="h-3 w-20 bg-zinc-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
