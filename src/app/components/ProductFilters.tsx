import React from "react";
import { Search, X, Check } from "lucide-react";

interface ProductFiltersProps {
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

export default function ProductFilters({
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
}: ProductFiltersProps) {
  const hasActiveFilters =
    selectedCategory ||
    selectedSize ||
    selectedColor ||
    minPrice > 0 ||
    maxPrice < 100 ||
    searchQuery;

  // Map color names to hex codes for swatches
  const colorMap: Record<string, string> = {
    black: "#000000",
    white: "#ffffff",
    grey: "#808080",
    gray: "#808080",
    red: "#b22222",
    blue: "#1e90ff",
    green: "#2e8b57",
    purple: "#800080",
    pink: "#ffc0cb",
    navy: "#000080",
    orange: "#ffa500",
    yellow: "#ffd700",
    gold: "#C5A059",
    charcoal: "#36454f",
    olive: "#808000",
    cream: "#fffdd0",
    cyan: "#00ffff",
    heather: "#7a7a7a",
  };

  const getSwatchColor = (colorName: string) => {
    const name = colorName.toLowerCase();
    for (const key in colorMap) {
      if (name.includes(key)) return colorMap[key];
    }
    return "#555555"; // Default fallback swatch
  };

  return (
    <div className="space-y-7">
      {/* Active Filters Header */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            Active Filters
          </span>
          <button
            onClick={onClearFilters}
            className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] hover:text-white transition-colors flex items-center gap-1 focus:outline-none"
          >
            Clear All <X size={10} />
          </button>
        </div>
      )}

      {/* Category Section */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3.5">
          Categories
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onFilterChange("category", "")}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 focus:outline-none ${
              !selectedCategory
                ? "bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20"
                : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilterChange("category", cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 focus:outline-none ${
                selectedCategory === cat
                  ? "bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Size Section */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3.5">
          Filter by Size
        </h4>
        <div className="grid grid-cols-4 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => onFilterChange("size", selectedSize === size ? "" : size)}
              className={`h-9 flex items-center justify-center rounded-xl text-[10px] font-bold uppercase border transition-all duration-200 focus:outline-none ${
                selectedSize === size
                  ? "bg-[#C5A059] text-black border-[#C5A059]"
                  : "border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Section */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3.5">
          Filter by Color
        </h4>
        <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-2">
          {colors.map((color) => {
            const isSelected = selectedColor === color;
            const swatch = getSwatchColor(color);
            return (
              <button
                key={color}
                onClick={() => onFilterChange("color", isSelected ? "" : color)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-xs font-medium transition-all duration-200 focus:outline-none ${
                  isSelected
                    ? "bg-[#C5A059]/10 border-[#C5A059]/30 text-[#C5A059]"
                    : "border-transparent text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full border border-white/15 shadow-inner shrink-0"
                    style={{ backgroundColor: swatch }}
                  />
                  <span className="capitalize">{color}</span>
                </div>
                {isSelected && <Check size={12} className="text-[#C5A059]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Section */}
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3.5">
          Price Range ($)
        </h4>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <span className="text-[9px] font-mono text-zinc-600 block mb-1">MIN</span>
            <input
              type="number"
              value={minPrice || ""}
              onChange={(e) =>
                onFilterChange("minPrice", Number(e.target.value) || 0)
              }
              placeholder="0"
              className="w-full glass rounded-xl px-3 py-2.5 text-xs text-white border border-white/8 bg-transparent focus:border-[#C5A059]/40 focus:outline-none transition-colors"
            />
          </div>
          <span className="text-zinc-600 pt-5">—</span>
          <div className="flex-1">
            <span className="text-[9px] font-mono text-zinc-600 block mb-1">MAX</span>
            <input
              type="number"
              value={maxPrice === 100 ? "" : maxPrice}
              onChange={(e) =>
                onFilterChange(
                  "maxPrice",
                  e.target.value === "" ? 100 : Number(e.target.value)
                )
              }
              placeholder="100"
              className="w-full glass rounded-xl px-3 py-2.5 text-xs text-white border border-white/8 bg-transparent focus:border-[#C5A059]/40 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
