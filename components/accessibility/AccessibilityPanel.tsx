"use client";

import { useState, useEffect } from "react";
import { Accessibility, X, Type, Download, CheckCircle2, Share, PlusSquare, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playSFX, triggerHaptic } from "@/lib/sfx";

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [textSize, setTextSize] = useState<"md" | "lg" | "xl">("md");

  // PWA States
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // Reduced Motion State
  const [reducedMotion, setReducedMotion] = useState(false);

  // Load settings on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedContrast =
      localStorage.getItem("carelife-high-contrast") === "true";
    const savedDyslexic =
      localStorage.getItem("carelife-dyslexic-font") === "true";
    const savedTextSize = (localStorage.getItem("carelife-text-size") ||
      "md") as "md" | "lg" | "xl";
    const savedReduced =
      localStorage.getItem("carelife-reduced-motion") === "true";

    setHighContrast(savedContrast);
    setDyslexicFont(savedDyslexic);
    setTextSize(savedTextSize);
    setReducedMotion(savedReduced);

    // Apply classes to body
    const body = document.body;
    if (savedContrast) body.classList.add("high-contrast");
    if (savedDyslexic) body.classList.add("dyslexic-font");

    body.classList.remove("text-size-lg", "text-size-xl");
    if (savedTextSize === "lg") body.classList.add("text-size-lg");
    if (savedTextSize === "xl") body.classList.add("text-size-xl");
  }, []);

  // PWA event listeners & status check on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect if running in standalone mode (installed PWA)
    const checkIsInstalled = () => {
      const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone || isIOSStandalone);
    };

    checkIsInstalled();

    // Detect if platform is iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Listen to beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen to appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
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

  const handleToggleReducedMotion = () => {
    const newVal = !reducedMotion;
    setReducedMotion(newVal);
    localStorage.setItem("carelife-reduced-motion", String(newVal));

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("carelife-reduced-motion-changed"));
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

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    playSFX("click");
    triggerHaptic("click");

    deferredPrompt.prompt();

    try {
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to install prompt: ${outcome}`);
    } catch (error) {
      console.error("Error presenting PWA install prompt:", error);
    }

    setDeferredPrompt(null);
    setIsInstallable(false);
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
                  <Accessibility
                    className="text-[#66B2B2]"
                    size={22}
                    strokeWidth={2.5}
                  />
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
                    <h4 className="font-black text-sm text-[#1A1A1A]">
                      Kontras Tinggi
                    </h4>
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
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="w-4 h-4 rounded-full bg-[#1A1A1A] absolute top-0.5"
                    />
                  </button>
                </div>

                {/* 2. Dyslexic Font */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">
                      Font Disleksia
                    </h4>
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
                       transition={{
                         type: "spring",
                         stiffness: 500,
                         damping: 30,
                       }}
                       className="w-4 h-4 rounded-full bg-[#1A1A1A] absolute top-0.5"
                    />
                  </button>
                </div>

                {/* 3. Reduced Motion */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">
                      Reduksi Gerakan
                    </h4>
                    <p className="text-xs font-bold text-[#6B7280]">
                      Kurangi animasi untuk kenyamanan kognitif & mata
                    </p>
                  </div>
                  <button
                    onClick={handleToggleReducedMotion}
                    className={`w-12 h-6 rounded-full border-2 border-[#1A1A1A] relative transition-colors duration-200 cursor-pointer ${
                      reducedMotion ? "bg-[#A8E6CF]" : "bg-gray-200"
                    }`}
                  >
                    <motion.div
                      animate={{ x: reducedMotion ? 24 : 2 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                      className="w-4 h-4 rounded-full bg-[#1A1A1A] absolute top-0.5"
                    />
                  </button>
                </div>

                {/* 3. Text Sizing */}
                <div className="space-y-2.5">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">
                      Ukuran Teks
                    </h4>
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
                        {size === "md"
                          ? "Normal"
                          : size === "lg"
                            ? "Besar"
                            : "Sangat"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. PWA Installation */}
                <div className="space-y-2.5 pt-4 border-t-2 border-[#1A1A1A]/10">
                  <div>
                    <h4 className="font-black text-sm text-[#1A1A1A]">Aplikasi CareLife</h4>
                    <p className="text-xs font-bold text-[#6B7280]">
                      Instal CareLife di layar utama perangkat Anda agar lebih cepat dibuka
                    </p>
                  </div>

                  {isInstalled ? (
                    <div className="flex items-center gap-2 py-2 px-3 bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-xl text-[#2E7D32] text-xs font-black">
                      <CheckCircle2 size={16} />
                      <span>Aplikasi Sudah Terpasang</span>
                    </div>
                  ) : isInstallable ? (
                    <button
                      onClick={handleInstallClick}
                      className="w-full py-2.5 px-4 bg-[#66B2B2] hover:bg-[#4d9999] text-white border-2 border-[#1A1A1A] rounded-xl text-xs font-black shadow-[3px_3px_0_#1A1A1A] transition-all active:translate-y-0.5 active:shadow-[1px_1px_0_#1A1A1A] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download size={16} strokeWidth={2.5} />
                      <span>Instal CareLife</span>
                    </button>
                  ) : isIOS ? (
                    <div className="p-3 bg-[#F3F4F6] border-2 border-[#1A1A1A]/10 rounded-xl space-y-2 text-xs text-[#1A1A1A]">
                      <p className="font-bold">Untuk menginstal di iOS (Safari):</p>
                      <ol className="list-decimal list-inside space-y-1.5 font-medium text-[#4B5563]">
                        <li>
                          Ketuk tombol <span className="inline-flex items-center align-middle font-bold bg-white px-1.5 py-0.5 border border-gray-300 rounded"><Share size={12} className="inline mr-1" /> Bagikan</span> di bagian bawah Safari.
                        </li>
                        <li>
                          Gulir ke bawah dan ketuk <span className="inline-flex items-center align-middle font-bold bg-white px-1.5 py-0.5 border border-gray-300 rounded"><PlusSquare size={12} className="inline mr-1" /> Tambah ke Layar Utama</span>.
                        </li>
                      </ol>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          playSFX("click");
                          triggerHaptic("click");
                          setShowGuide(!showGuide);
                        }}
                        className="w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 text-[#1A1A1A] border-2 border-[#1A1A1A]/20 hover:border-[#1A1A1A] rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <HelpCircle size={16} />
                        <span>Cara Instal Aplikasi</span>
                      </button>
                      
                      {showGuide && (
                        <div className="p-3 bg-[#FFF9C4] border-2 border-[#FBC02D] rounded-xl space-y-1.5 text-[11px] font-bold text-[#5D4037] leading-relaxed">
                          <p>Jika tombol instal tidak muncul, Anda bisa:</p>
                          <ul className="list-disc list-inside space-y-1 font-medium">
                            <li>Buka menu browser Anda (ikon titik tiga di kanan atas)</li>
                            <li>Pilih menu <strong className="text-[#1A1A1A]">"Instal Aplikasi"</strong> atau <strong className="text-[#1A1A1A]">"Tambahkan ke Layar Utama"</strong></li>
                            <li>Gunakan browser seperti <strong className="text-[#1A1A1A]">Google Chrome</strong> atau <strong className="text-[#1A1A1A]">Microsoft Edge</strong></li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
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
