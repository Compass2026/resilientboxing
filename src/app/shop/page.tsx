"use client";

import React, { Suspense, useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ShopHero from "../components/ShopHero";
import ProductFilters from "../components/ProductFilters";
import MobileFilterDrawer from "../components/MobileFilterDrawer";
import ProductGrid from "../components/ProductGrid";
import EmptyProductsState from "../components/EmptyProductsState";
import {
  products,
  queryProducts,
  getCategories,
  getAllSizes,
  getAllColors,
} from "../data/products";
import { Search, SlidersHorizontal } from "lucide-react";

function ShopContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get options lists
  const categories = useMemo(() => getCategories(), []);
  const sizes = useMemo(() => getAllSizes(), []);
  const colors = useMemo(() => getAllColors(), []);

  // Filter States synced to URL
  const searchQuery = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedSize = searchParams.get("size") || "";
  const selectedColor = searchParams.get("color") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100;
  const sortBy = searchParams.get("sort") || "featured";

  // Mobile Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper to update query parameters in URL
  const updateURL = (newParams: Record<string, string | number | null>) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, val]) => {
      if (val === "" || val === null || val === undefined || (key === "minPrice" && val === 0) || (key === "maxPrice" && val === 100)) {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Simulate minor transition loader for filters
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  };

  const handleFilterChange = (key: string, value: any) => {
    updateURL({ [key]: value });
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    router.push(pathname, { scroll: false });
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  // Memoized query calculation
  const filteredProducts = useMemo(() => {
    return queryProducts({
      search: searchQuery,
      category: selectedCategory,
      size: selectedSize,
      color: selectedColor,
      minPrice,
      maxPrice,
      sort: sortBy,
    });
  }, [searchQuery, selectedCategory, selectedSize, selectedColor, minPrice, maxPrice, sortBy]);

  const activeFiltersCount = [
    searchQuery,
    selectedCategory,
    selectedSize,
    selectedColor,
    minPrice > 0 ? "min" : "",
    maxPrice < 100 ? "max" : "",
  ].filter(Boolean).length;

  return (
    <div className="noise bg-[#080808] min-h-screen text-white relative flex flex-col justify-between">
      {/* ── BACKGROUND GLOWS ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] glow-white opacity-25 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] glow-gold opacity-20 rounded-full blur-3xl" />
      </div>

      <Header onBookClick={() => window.open("https://www.wellnessliving.com/signup/resilient_boxing", "_blank")} />

      <main className="relative z-10 flex-1">
        <ShopHero />

        {/* ═══════════════════════════════════════════════════════
            SHOP CONTENT WRAPPER
        ═══════════════════════════════════════════════════════ */}
        <section className="max-w-[1400px] mx-auto px-5 md:px-12 pb-24">
          
          {/* Top Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/8 pb-6 mb-8">
            {/* Search Field */}
            <div className="relative max-w-sm w-full">
              <Search size={14} className="absolute left-4 top-3.5 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                placeholder="Search Resilient gear..."
                className="w-full glass rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder:text-zinc-600 border border-white/8 bg-transparent focus:border-[#C5A059]/40 focus:outline-none transition-colors"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"}
              </span>

              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                  className="glass rounded-xl px-4 py-3 text-xs text-zinc-300 border border-white/8 bg-[#0b0a0a] focus:border-[#C5A059]/40 focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-3 bg-[#C5A059] hover:bg-white text-black transition-all duration-300 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none"
                >
                  <SlidersHorizontal size={12} />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </button>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Desktop Filter Sidebar */}
            <aside className="hidden md:block w-[260px] lg:w-[280px] shrink-0 sticky top-32">
              <div className="glass-heavy rounded-2xl border border-white/8 p-6 shadow-xl">
                <div className="border-b border-white/5 pb-4 mb-5">
                  <h3 className="font-bebas text-2xl uppercase italic tracking-wide text-white">
                    Filter Gear
                  </h3>
                  <p className="text-[9px] font-mono uppercase text-[#C5A059] tracking-wider mt-0.5">
                    Resilient Storefront
                  </p>
                </div>
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
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1 w-full">
              {filteredProducts.length === 0 ? (
                <EmptyProductsState onClearFilters={handleClearFilters} />
              ) : (
                <ProductGrid products={filteredProducts} isLoading={isLoading} />
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Drawer Overlay */}
      <MobileFilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <Footer onBookClick={() => window.open("https://www.wellnessliving.com/signup/resilient_boxing", "_blank")} />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-zinc-400">
          <div className="w-8 h-8 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-mono text-xs uppercase tracking-widest">Loading Resilient Shop...</p>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
