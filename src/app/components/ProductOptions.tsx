import React from "react";
import { ProductOption } from "../data/products";
import { Check } from "lucide-react";

interface ProductOptionsProps {
  options: ProductOption[];
  selectedColor: string;
  selectedSize: string;
  onSelectColor: (color: string) => void;
  onSelectSize: (size: string) => void;
  showValidationError: boolean;
}

export default function ProductOptions({
  options,
  selectedColor,
  selectedSize,
  onSelectColor,
  onSelectSize,
  showValidationError,
}: ProductOptionsProps) {
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
    return "#555555";
  };

  const hasColors = options.some((opt) => opt.title.toLowerCase().includes("color"));
  const hasSizes = options.some((opt) => opt.title.toLowerCase().includes("size"));

  return (
    <div className="space-y-6">
      {/* Options Loop */}
      {options.map((opt) => {
        const isColor = opt.title.toLowerCase().includes("color");
        const isSize = opt.title.toLowerCase().includes("size");

        if (isColor) {
          return (
            <div key={opt.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Select Color <span className="text-red-500">*</span>
                </span>
                {selectedColor && (
                  <span className="text-xs text-[#C5A059] font-medium capitalize">
                    {selectedColor}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {opt.selections.map((sel) => {
                  const isSelected = selectedColor === sel.value;
                  const swatch = getSwatchColor(sel.value);
                  return (
                    <button
                      key={sel.id}
                      type="button"
                      onClick={() => onSelectColor(sel.value)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none ${
                        isSelected
                          ? "bg-[#C5A059] text-black border-[#C5A059] shadow-lg shadow-[#C5A059]/10"
                          : "border-white/8 text-zinc-300 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: swatch }}
                      />
                      <span>{sel.value}</span>
                      {isSelected && <Check size={11} className="stroke-[3px]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        if (isSize) {
          return (
            <div key={opt.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
                  Select Size <span className="text-red-500">*</span>
                </span>
                {selectedSize && (
                  <span className="text-xs text-[#C5A059] font-medium uppercase">
                    {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {opt.selections.map((sel) => {
                  const isSelected = selectedSize === sel.value;
                  return (
                    <button
                      key={sel.id}
                      type="button"
                      onClick={() => onSelectSize(sel.value)}
                      className={`min-w-12 h-11 flex items-center justify-center px-3 rounded-xl border text-xs font-bold uppercase transition-all duration-200 focus:outline-none ${
                        isSelected
                          ? "bg-[#C5A059] text-black border-[#C5A059] shadow-lg shadow-[#C5A059]/10"
                          : "border-white/8 text-zinc-300 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      {sel.value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        // Generic selector for any other potential Wix option types
        return (
          <div key={opt.id} className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-500">
              Select {opt.title} <span className="text-red-500">*</span>
            </span>
            <select
              onChange={(e) => {
                if (opt.title.toLowerCase().includes("color")) onSelectColor(e.target.value);
                else onSelectSize(e.target.value);
              }}
              className="w-full glass rounded-xl px-4 py-3 text-sm text-zinc-300 border border-white/8 focus:border-[#C5A059]/40 focus:outline-none transition-colors bg-[#080808]"
            >
              <option value="">-- Choose {opt.title} --</option>
              {opt.selections.map((sel) => (
                <option key={sel.id} value={sel.value}>
                  {sel.value}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {/* Validation warning block */}
      {showValidationError && (
        <div className="p-3.5 bg-red-950/20 border border-red-500/30 rounded-xl">
          <p className="text-red-400 text-xs font-medium">
            ⚠️ Please select all required options (
            {[
              hasColors && !selectedColor ? "Color" : "",
              hasSizes && !selectedSize ? "Size" : "",
            ]
              .filter(Boolean)
              .join(" and ")}
            ) before adding to purchase.
          </p>
        </div>
      )}
    </div>
  );
}
