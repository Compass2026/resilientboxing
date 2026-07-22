"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Battery,
  FileText,
  Search,
  Power,
  ExternalLink,
  ChevronDown,
  Check,
  Copy,
  Info,
  Hammer,
  Shield,
  Layers,
  Cpu,
  Sun,
  X,
  Download,
  MessageSquare
} from "lucide-react";

interface AdderItem {
  id: string;
  name: string;
  price: string;
  note?: string;
}

interface CategoryGroup {
  id: string;
  title: string;
  icon: React.ElementType;
  items: AdderItem[];
}

interface EquipmentSpec {
  type: "Modules" | "Inverters";
  model: string;
  specSheetName: string;
  specSheetUrl: string;
  specsSummary: {
    powerOutput?: string;
    efficiency?: string;
    warranty?: string;
    type?: string;
  };
}

interface EquipmentStackCategory {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  items: EquipmentSpec[];
}

const EQUIPMENT_STACKS: EquipmentStackCategory[] = [
  {
    id: "standard",
    name: "Standard Equipment",
    badge: "STANDARD TIER",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
    items: [
      {
        type: "Modules",
        model: "JA 455",
        specSheetName: "JA Solar JAM72S30 455W Datasheet",
        specSheetUrl: "https://www.jasolar.com",
        specsSummary: {
          powerOutput: "455 Watt",
          efficiency: "20.9%",
          warranty: "12-Yr Product / 25-Yr Linear",
          type: "Monocrystalline Half-Cell",
        },
      },
      {
        type: "Inverters",
        model: "IQ8MC",
        specSheetName: "Enphase IQ8MC Microinverter Datasheet",
        specSheetUrl: "https://enphase.com",
        specsSummary: {
          powerOutput: "330 VA Peak AC",
          efficiency: "97.4% CEC",
          warranty: "25-Year Limited",
          type: "Grid-Agile Microinverter",
        },
      },
    ],
  },
  {
    id: "feoc",
    name: "FEOC Equipment",
    badge: "FEOC COMPLIANT",
    badgeColor: "bg-[#0F232A]/10 text-[#0F232A] border-[#0F232A]/20 font-bold",
    items: [
      {
        type: "Modules",
        model: "Mission 435",
        specSheetName: "Mission Solar MSE 435W Datasheet",
        specSheetUrl: "https://www.missionsolar.com",
        specsSummary: {
          powerOutput: "435 Watt",
          efficiency: "20.4%",
          warranty: "25-Year Premium Warranty",
          type: "FEOC Compliant Monocrystalline",
        },
      },
      {
        type: "Inverters",
        model: "IQ8MC",
        specSheetName: "Enphase IQ8MC Microinverter Datasheet",
        specSheetUrl: "https://enphase.com",
        specsSummary: {
          powerOutput: "330 VA Peak AC",
          efficiency: "97.4% CEC",
          warranty: "25-Year Limited",
          type: "Grid-Agile Microinverter",
        },
      },
    ],
  },
  {
    id: "domestic",
    name: "Domestic Equipment",
    badge: "100% DOMESTIC CONTENT",
    badgeColor: "bg-[#FACC15]/20 text-[#0F232A] border-[#FACC15]/60 font-black",
    items: [
      {
        type: "Modules",
        model: "Sirius 450",
        specSheetName: "Sirius PV 450W Domestic Datasheet",
        specSheetUrl: "https://siriuspv.com",
        specsSummary: {
          powerOutput: "450 Watt",
          efficiency: "21.3%",
          warranty: "30-Year Complete Protection",
          type: "US-Assembled Premium PV",
        },
      },
      {
        type: "Inverters",
        model: "IQ8HC",
        specSheetName: "Enphase IQ8HC High-Cap Microinverter",
        specSheetUrl: "https://enphase.com",
        specsSummary: {
          powerOutput: "384 VA Peak AC",
          efficiency: "97.6% CEC",
          warranty: "25-Year Limited",
          type: "High Output Microinverter",
        },
      },
    ],
  },
];

const ADDER_CATEGORIES: CategoryGroup[] = [
  {
    id: "electrical",
    title: "ELECTRICAL & UPGRADES",
    icon: Zap,
    items: [
      { id: "e1", name: "Main Panel Upgrade", price: "$3,500" },
      { id: "e2", name: "Full Service Upgrade", price: "$5,000" },
      { id: "e3", name: "Manual Transfer Switch", price: "$1,500" },
      { id: "e4", name: "Meter Combination", price: "$3,000" },
      { id: "e5", name: "Meter Relocation", price: "$1,500" },
      { id: "e6", name: "Meter Upgrade", price: "$3,000" },
      { id: "e7", name: "Meter Riser Upgrade", price: "$1,500" },
      { id: "e8", name: "Multi-Meter Installation", price: "$0.40/watt" },
    ],
  },
  {
    id: "battery",
    title: "BATTERY & STORAGE OPTIONS",
    icon: Battery,
    items: [
      { id: "b1", name: "Tesla Powerwall 3", price: "$13,500", note: "+$1,500 if battery only" },
      { id: "b2", name: "Enphase Encharge IQ 10", price: "$13,500", note: "+$1,500 if battery only" },
      { id: "b3", name: "Enphase Encharge IQ 5", price: "$9,000", note: "+$1,500 if battery only" },
      { id: "b4", name: "Franklin aPower 2 Battery", price: "$14,500", note: "+$1,500 if battery only" },
      { id: "b5", name: "Generac 24KW Generator", price: "$14,500", note: "Excludes gas line & hookup" },
    ],
  },
  {
    id: "roof",
    title: "ROOF & STRUCTURAL ADDERS",
    icon: Hammer,
    items: [
      { id: "r1", name: "Steep Pitch Roof (>30°)", price: "$0.25/watt" },
      { id: "r2", name: "Spanish / Clay Tile Roof Adder", price: "$0.35/watt" },
      { id: "r3", name: "Ground Mount System", price: "$0.50/watt", note: "Includes standard soil excavation" },
      { id: "r4", name: "Trenching (>50 ft)", price: "$25/linear ft" },
      { id: "r5", name: "Rafter Sistering / Reinforcement", price: "$1,200", note: "Per roof section" },
    ],
  },
];

export default function AddersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSpecSheet, setActiveSpecSheet] = useState<EquipmentSpec | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredCategories = ADDER_CATEGORIES.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.price.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <div className="min-h-screen bg-[#0F232A] text-slate-100 font-sans selection:bg-[#FACC15] selection:text-black">

      {/* ═══════════════════════════════════════════════════════
          HEADER / NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#0F232A]/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/adders" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-[#FACC15] flex items-center justify-center text-black font-black shadow-lg shadow-[#FACC15]/20 group-hover:scale-105 transition-transform">
              <Power className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
                LOGIC <span className="text-[#FACC15]">SOLAR</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                Pricing Portal
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden xl:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Link href="#" className="hover:text-[#FACC15] transition-colors">Home</Link>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">About</Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#FACC15] transition-colors">
              Services <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#FACC15] transition-colors">
              Service Areas <ChevronDown size={14} />
            </div>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">Financing</Link>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">FAQ</Link>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">Store</Link>
            <Link href="#" className="hover:text-[#FACC15] transition-colors">Contact</Link>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-700 bg-slate-800/60 text-xs font-bold uppercase tracking-wider text-slate-200 hover:bg-slate-800 hover:border-slate-600 transition-all">
              <Shield size={14} className="text-[#FACC15]" />
              Logic Portal
            </button>
            <button className="px-6 py-2.5 rounded-full bg-[#FACC15] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-lg shadow-[#FACC15]/25 hover:shadow-yellow-400/40 active:scale-95">
              Get My Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative pt-16 pb-32 px-4 sm:px-8 overflow-hidden text-center bg-gradient-to-b from-[#0F232A] via-[#122A33] to-[#15323D]">
        
        {/* Background glow effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FACC15]/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Internal badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FACC15]/10 border border-[#FACC15]/30 text-[#FACC15] text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-6 shadow-inner">
            <span className="text-yellow-400">✨</span> Internal Pricing Reference
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase italic leading-none mb-4">
            Solar Deal Adders &amp; Pricing Schedule
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
            Categorized pricing reference for Logic Solar sales representatives.
          </p>

          {/* Search bar */}
          <div className="mt-8 w-full max-w-md relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search adders or equipment (e.g. Main Panel, IQ8MC, Sirius)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FACC15] focus:ring-1 focus:ring-[#FACC15] transition-all shadow-xl"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER (WHITE CARD)
      ═══════════════════════════════════════════════════════ */}
      <section className="relative z-20 -mt-16 pb-24 px-4 sm:px-8">
        <div className="max-w-[1320px] mx-auto bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/50 text-slate-900 border border-slate-100">
          
          {/* Top Bar inside white card (Datasheet button) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-slate-900 flex items-center gap-2">
                Standard Equipment &amp; Deal Modifiers
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Updated Q3 2026 • Verified Rep Rates
              </p>
            </div>

            {/* Quick Datasheet Button */}
            <button
              onClick={() => setActiveSpecSheet(EQUIPMENT_STACKS[0].items[1])}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-all text-xs font-bold tracking-tight shadow-sm group"
            >
              <div className="w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-700 group-hover:scale-110 transition-transform">
                <FileText size={14} />
              </div>
              <span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block leading-none mb-0.5">
                  Datasheet
                </span>
                <span className="font-extrabold">Enphase IQ8MC</span>
              </span>
              <ExternalLink size={13} className="text-slate-400 group-hover:text-slate-700 ml-1" />
            </button>
          </div>

          {/* ═══════════════════════════════════════════════════════
              EQUIPMENT STACK SECTION
          ═══════════════════════════════════════════════════════ */}
          <div className="mt-8 pt-2 pb-10 border-b border-slate-100">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#0F232A] text-[#FACC15] flex items-center justify-center font-bold shadow-md">
                  <Layers size={20} className="stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-base font-black uppercase tracking-tight text-slate-900 flex items-center gap-2">
                    Equipment Stack
                  </h3>
                  <p className="text-xs text-slate-500">
                    Approved module and inverter tier configurations with accessible spec sheets
                  </p>
                </div>
              </div>
            </div>

            {/* 3 Subcategory Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EQUIPMENT_STACKS.map((stack) => (
                <div
                  key={stack.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    {/* Header + Badge */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-200/80">
                      <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">
                        {stack.name}
                      </h4>
                      <span className={`text-[9px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border ${stack.badgeColor}`}>
                        {stack.badge}
                      </span>
                    </div>

                    {/* Spec Items */}
                    <div className="mt-4 space-y-4">
                      {stack.items.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/60 shadow-2xs">
                          <div className="flex items-center gap-2.5">
                            {spec.type === "Modules" ? (
                              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                <Sun size={15} />
                              </div>
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <Cpu size={15} />
                              </div>
                            )}
                            <div>
                              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block leading-none">
                                {spec.type}
                              </span>
                              <span className="text-xs font-black text-slate-900 font-mono">
                                {spec.model}
                              </span>
                            </div>
                          </div>

                          {/* Spec Sheet Button */}
                          <button
                            onClick={() => setActiveSpecSheet(spec)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F232A] text-white hover:bg-[#FACC15] hover:text-black transition-all text-[11px] font-bold tracking-tight shrink-0 shadow-sm"
                          >
                            <FileText size={12} />
                            <span>Spec Sheet</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/50 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                    <span>Warranty: 25-Year Standard</span>
                    <span className="text-emerald-600 font-bold">Approved</span>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-slate-800 bg-[#16272E] text-white overflow-hidden shadow-lg shadow-black/10 flex flex-col"
                >
                  {/* Category Header Bar */}
                  <div className="px-6 py-4 bg-[#1B323B] border-b border-slate-700/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FACC15] text-black flex items-center justify-center font-bold">
                      <Icon size={18} className="stroke-[2.5]" />
                    </div>
                    <h3 className="font-extrabold text-sm tracking-wider uppercase text-white">
                      {category.title}
                    </h3>
                  </div>

                  {/* Items List */}
                  <div className="divide-y divide-slate-800/80 flex-1">
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-800/50 transition-colors group"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-100 group-hover:text-[#FACC15] transition-colors">
                            {item.name}
                          </span>
                          {item.note && (
                            <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                              {item.note}
                            </span>
                          )}
                        </div>

                        {/* Price + Copy Button */}
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-extrabold text-sm text-white font-mono tracking-tight">
                            {item.price}
                          </span>
                          <button
                            onClick={() => handleCopy(item.id, `${item.name}: ${item.price}`)}
                            title="Copy price to clipboard"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#FACC15] hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            {copiedId === item.id ? (
                              <Check size={14} className="text-emerald-400" />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="py-16 text-center text-slate-400">
              <Info className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">No adders found matching "{searchTerm}"</p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 text-xs font-bold text-[#0F232A] underline hover:text-black"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Footer note inside card */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <p className="flex items-center gap-2 font-medium">
              <Info size={14} className="text-slate-400" />
              Pricing subject to site inspection &amp; engineering approval.
            </p>
            <p className="font-mono text-[10px] uppercase text-slate-400">
              Logic Solar Operations © 2026
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SPEC SHEET MODAL
      ═══════════════════════════════════════════════════════ */}
      {activeSpecSheet && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-[#0F232A] border border-slate-700 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative">
            <button
              onClick={() => setActiveSpecSheet(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#FACC15] text-black flex items-center justify-center font-black">
                <FileText size={20} />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FACC15]">
                  Equipment Spec Sheet
                </span>
                <h3 className="text-lg font-black uppercase text-white leading-tight">
                  {activeSpecSheet.model} ({activeSpecSheet.type})
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-medium mb-6">
              {activeSpecSheet.specSheetName}
            </p>

            {/* Spec Details Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {Object.entries(activeSpecSheet.specsSummary).map(([key, val]) => (
                <div key={key} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-xs font-bold text-white">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={activeSpecSheet.specSheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#FACC15] text-black hover:bg-yellow-300 transition-colors rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <Download size={14} />
                Download PDF Datasheet
              </a>
              <button
                onClick={() => setActiveSpecSheet(null)}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          FLOATING CHAT WIDGET (BOTTOM RIGHT)
      ═══════════════════════════════════════════════════════ */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Callout Bubble */}
        <div className="hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200 text-xs font-semibold relative">
          <div className="w-7 h-7 rounded-full bg-[#FACC15] text-black flex items-center justify-center font-bold text-xs shrink-0">
            ⚡
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 leading-snug">Hi there, have a question?</p>
            <p className="text-[11px] text-slate-500 font-normal">Text us here.</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 text-xs ml-2">×</button>
        </div>

        {/* Floating Green Button */}
        <button className="w-14 h-14 rounded-full bg-[#009B77] text-white flex items-center justify-center shadow-2xl shadow-emerald-900/40 hover:scale-105 active:scale-95 transition-all">
          <MessageSquare className="w-6 h-6 fill-current stroke-[1.5]" />
        </button>
      </div>

    </div>
  );
}
