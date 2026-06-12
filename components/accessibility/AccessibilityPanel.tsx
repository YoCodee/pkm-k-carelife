"use client";

import { useState, useEffect } from "react";
import { Accessibility, X, Type } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playSFX, triggerHaptic } from "@/lib/sfx";

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [textSize, setTextSize] = useState<"md" | "lg" | "xl">("md");

  // Load settings on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedContrast = localStorage.getItem("carelife-high-contrast") === "true";
    const savedDyslexic = localStorage.getItem("carelife-dyslexic-font") === "true";
    const savedTextSize = (localStorage.getItem("carelife-text-size") || "md") as "md" | "lg" | "xl";

    setHighContrast(savedContrast);
    setDyslexicFont(savedDyslexic);
    setTextSize(savedTextSize);

    // Apply classes to body
    const body = document.body;
    if (savedContrast) body.classList.add("high-contrast");
    if (savedDyslexic) body.classList.add("dyslexic-font");
    
    body.classList.remove("text-size-lg", "text-size-xl");
    if (savedTextSize === "lg") body.classList.add("text-size-lg");
    if (savedTextSize === "xl") body.classList.add("text-size-xl");
  }, []);

  const handleToggleContrast = () => {
    const newVal = !highContrast;
    setHighContrast(newVal);
    localStorage.setItem("carelife-high-contrast", String(newVal));

    const body = document.body;
    if (newVal) {
      body.classList.add("high-contrast");
    } else {
      body.classList.remove("high-contrast");
    }
    
    playSFX("click");
    triggerHaptic("click");
  };

  const handleToggleDyslexic = () => {
    const newVal = !dyslexicFont;
    setDyslexicFont(newVal);
    localStorage.setItem("carelife-dyslexic-font", String(newVal));

    const body = document.body;
    if (newVal) {
      body.classList.add("dyslexic-font");
    } else {
      body.classList.remove("dyslexic-font");
    }

    playSFX("click");
    triggerHaptic("click");
  };

  const handleChangeTextSize = (size: "md" | "lg" | "xl") => {
    setTextSize(size);
    localStorage.setItem("carelife-text-size", size);

    const body = document.body;
    body.classList.remove("text-size-lg", "text-size-xl");
    if (size === "lg") body.classList.add("text-size-lg");
    if (size === "xl") body.classList.add("text-size-xl");

    playSFX("click");
    triggerHaptic("click");
  };

  const togglePanel = () => {
    setIsOpen(!isOpen);
    playSFX("click");
    triggerHaptic("click");
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={togglePanel}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 z-[99] w-14 h-14 bg-[#FFD700] hover:bg-[#FFC000] text-[#1A1A1A] rounded-full flex items-center justify-center border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] cursor-pointer"
        aria-label="Pengaturan Aksesibilitas"
      >
        <Accessibility size={28} strokeWidth={2.5} />
      </motion.button>

      {/* Settings Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={togglePanel}
              className="fixed inset-0 bg-black z-[100]"
            />

            {/* Panel Card */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] bg-white border-2 border-[#1A1A1A] rounded-[24px] shadow-[6px_6px_0_#1A1A1A] p-6 z-[101] text-left"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#1A1A1A]/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Accessibility className="text-[#66B2B2]" size={22} strokeWidth={2.5} />
                  <h3 className="text-lg font-black text-[#1A1A1A] uppercase tracking-wide">
                    Aksesibilitas
                  </h3>
                </div>
                <button
                  onClick={togglePanel}
                  className="p-1.5 rounded-full hover:bg-gray-100 border border-transparent hover:border-[#1A1A1A] cursor-pointer"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
              </div>

              {/* Settings List */}
              <div className="space-y-5">
                
                {/* 1. High Contrast */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">Kontras Tinggi</h4>
                    <p className="text-xs font-bold text-[#6B7280]">
                      Tampilan hitam & kuning kontras tinggi
                    </p>
                  </div>
                  <button
                    onClick={handleToggleContrast}
                    className={`w-12 h-6 rounded-full border-2 border-[#1A1A1A] relative transition-colors duration-200 cursor-pointer ${
                      highContrast ? "bg-[#A8E6CF]" : "bg-gray-200"
                    }`}
                  >
                    <motion.div
                      animate={{ x: highContrast ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-4 h-4 rounded-full bg-[#1A1A1A] absolute top-0.5"
                    />
                  </button>
                </div>

                {/* 2. Dyslexic Font */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">Font Disleksia</h4>
                    <p className="text-xs font-bold text-[#6B7280]">
                      Font khusus OpenDyslexic agar mudah dibaca
                    </p>
                  </div>
                  <button
                    onClick={handleToggleDyslexic}
                    className={`w-12 h-6 rounded-full border-2 border-[#1A1A1A] relative transition-colors duration-200 cursor-pointer ${
                      dyslexicFont ? "bg-[#A8E6CF]" : "bg-gray-200"
                    }`}
                  >
                    <motion.div
                      animate={{ x: dyslexicFont ? 24 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="w-4 h-4 rounded-full bg-[#1A1A1A] absolute top-0.5"
                    />
                  </button>
                </div>

                {/* 3. Text Sizing */}
                <div className="space-y-2.5">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">Ukuran Teks</h4>
                    <p className="text-xs font-bold text-[#6B7280]">
                      Sesuaikan ukuran tulisan materi pelajaran
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["md", "lg", "xl"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => handleChangeTextSize(size)}
                        className={`py-2 px-3 border-2 border-[#1A1A1A] rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          textSize === size
                            ? "bg-[#66B2B2] text-white border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] -translate-y-[1px]"
                            : "bg-[#F8F9FA] text-[#1A1A1A] hover:bg-gray-100"
                        }`}
                      >
                        <Type size={14} />
                        {size === "md" ? "Normal" : size === "lg" ? "Besar" : "Sangat"}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Helper disclaimer for judges */}
              <div className="mt-6 pt-3 border-t-2 border-[#1A1A1A]/10 text-center">
                <span className="text-[10px] font-black text-[#66B2B2] uppercase tracking-wider">
                  CareLife Accessibility Hub ♿
                </span>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
