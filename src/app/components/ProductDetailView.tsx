"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import ProductCard from "./ProductCard";
import { Product } from "../data/products";
import { ArrowLeft, ShoppingBag, Info, Heart, Minus, Plus } from "lucide-react";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showValidationError, setShowValidationError] = useState(false);

  const hasColors = product.colors.length > 0;
  const hasSizes = product.sizes.length > 0;

  const handleQuantityChange = (val: number) => {
    if (val < 1) return;
    setQuantity(val);
  };

  const handlePurchase = (e: React.MouseEvent) => {
    const isColorValid = !hasColors || selectedColor !== "";
    const isSizeValid = !hasSizes || selectedSize !== "";

    if (!isColorValid || !isSizeValid) {
      e.preventDefault();
      setShowValidationError(true);
    } else {
      setShowValidationError(false);
      // Wix Purchase Flow
      // Open wixProductUrl in the same tab as requested
      window.open(product.wixProductUrl, "_self");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-5 md:px-12 pt-[180px] md:pt-[220px] pb-24 relative z-10">
      
      {/* ── BREADCRUMB NAVIGATION ── */}
      <nav className="flex items-center gap-2 text-[10px] md:text-xs font-mono uppercase tracking-wider text-zinc-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-white transition-colors">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${encodeURIComponent(product.category)}`}
          className="hover:text-white transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#C5A059] font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* ── TWO-COLUMN DETAILS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-24">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Column: Detail & Selection Panel */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Main Info */}
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                {product.category}
              </span>
              {product.charityProduct && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-[#b22222]/90 border border-red-500/10 text-[8px] font-bold uppercase tracking-wider text-white shadow-lg">
                  <Heart size={8} className="fill-white" /> Supports a Cause
                </span>
              )}
            </div>
            <h1 className="font-bebas text-[clamp(36px,5vw,56px)] uppercase italic leading-none tracking-tight text-white mt-2 mb-3">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-zinc-200">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Sizing / Shipping Notices */}
          {product.notice && (
            <div className="flex gap-3 p-4 bg-zinc-900/50 border border-white/8 rounded-2xl">
              <Info size={16} className="text-[#C5A059] shrink-0 mt-0.5" />
              <p className="text-zinc-400 text-xs font-light leading-relaxed">
                {product.notice}
              </p>
            </div>
          )}

          {/* Option Selectors */}
          {product.rawOptions && product.rawOptions.length > 0 && (
            <div className="border-t border-b border-white/5 py-6">
              <ProductOptions
                options={product.rawOptions}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                onSelectColor={(c) => {
                  setSelectedColor(c);
                  setShowValidationError(false);
                }}
                onSelectSize={(s) => {
                  setSelectedSize(s);
                  setShowValidationError(false);
                }}
                showValidationError={showValidationError}
              />
            </div>
          )}

          {/* Quantity Selector & Purchase Button */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity Adjuster */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  QTY
                </span>
                <div className="flex items-center h-12 glass rounded-xl border border-white/8">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="w-10 h-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-10 text-center text-xs font-semibold text-zinc-200">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="w-10 h-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              {/* Primary Buy Button */}
              <div className="flex-1 pt-[18px]">
                <button
                  onClick={handlePurchase}
                  className="w-full h-12 bg-[#C5A059] hover:bg-white text-black transition-all duration-300 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-black/40 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 cursor-pointer"
                >
                  <ShoppingBag size={14} /> Select Options & Purchase
                </button>
              </div>
            </div>

            {/* Reassurance text */}
            <p className="text-center text-[10px] text-zinc-500 font-light">
              Secure checkout is completed through our current Resilient Boxing store.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3 border-t border-white/5 pt-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Product Description
            </span>
            <div
              className="text-zinc-400 text-xs md:text-sm font-light leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>

          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-zinc-500 hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft size={12} /> Back to Shop
            </Link>
          </div>
        </div>
      </div>

      {/* ── RELATED PRODUCTS SECTION ── */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-white/8 pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A059] mb-2">
                COMPLETE THE LOOK
              </p>
              <h2 className="font-bebas text-3xl md:text-4xl uppercase italic tracking-wide text-white leading-tight">
                Related Products
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono uppercase tracking-wider text-[#C5A059] hover:text-white transition-colors"
            >
              View All Apparel →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
