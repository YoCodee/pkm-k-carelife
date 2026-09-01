"use client";

import { useState, useCallback, createContext, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import IntroPage1 from "@/components/IntroPage1";
import BottomNav from "@/components/layout/BottomNav";
import AccessibilityPanel from "@/components/accessibility/AccessibilityPanel";
import { useFocusOnNavigation } from "@/lib/hooks/useFocusOnNavigation";

export type AppPhase = "splash" | "intro" | "app";

export const AppPhaseContext = createContext<AppPhase>("splash");

type ActivationStatus = "loading" | "unactivated" | "activated";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>("splash");
  const [isClient, setIsClient] = useState(false);
  const [activationStatus, setActivationStatus] = useState<ActivationStatus>("loading");
  const [activationCode, setActivationCode] = useState("");
  const [activationError, setActivationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset focus on navigation
  useFocusOnNavigation();

  // Auto-migration: jika user sudah aktivasi sebelum Supabase dipasang,
  // kirim kode mereka ke Supabase di background (tanpa ganggu UX)
  useEffect(() => {
    const activated = localStorage.getItem("carelife_activated");
    const alreadyMigrated = localStorage.getItem("carelife_migrated");

    if (activated === "true" && !alreadyMigrated) {
      const usedCodesRaw = localStorage.getItem("carelife_used_codes");
      const usedCodes: string[] = usedCodesRaw ? JSON.parse(usedCodesRaw) : [];
      const lastCode = usedCodes[0];

      if (lastCode) {
        // Fire-and-forget: tidak perlu await, tidak perlu handle error
        fetch("/api/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: lastCode }),
        })
          .catch(() => {/* silent fail — akan dicoba lagi kali berikutnya */})
          .finally(() => {
            localStorage.setItem("carelife_migrated", "true");
          });
      } else {
        // Tidak ada kode tersimpan, tandai migrasi selesai
        localStorage.setItem("carelife_migrated", "true");
      }
    }
  }, []);

  useEffect(() => {
    setIsClient(true);

    // Check if app is already activated in localStorage
    const activated = localStorage.getItem("carelife_activated");
    if (activated === "true") {
      setActivationStatus("activated");
    } else {
      setActivationStatus("unactivated");
    }

    // Bypass splash and intro if on subpage or if intro completed
    const cleanPath = window.location.pathname.replace(/\/$/, "");
    const isSubpage = cleanPath !== "" && cleanPath !== "/index.html" && cleanPath !== "/index";
    const introCompleted = localStorage.getItem("carelife_intro_completed") === "true";

    if (isSubpage || introCompleted) {
      setPhase("app");
    }

    if (process.env.NODE_ENV === "production") {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) =>
            console.log("Service Worker registered scope:", reg.scope),
          )
          .catch((err) =>
            console.error("Service Worker registration failed:", err),
          );
      }
    } else {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister().then((success) => {
              if (success) {
                console.log("[Service Worker] Unregistered active worker for development mode");
              }
            });
          }
        });
      }
    }
  }, []);

  // Protect source code by disabling contextmenu and key shortcuts in production
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12
      if (e.key === "F12") {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+I / Ctrl+Shift+J (Inspect Element / Console)
      if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j")) {
        e.preventDefault();
      }
      // Disable Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
      }
      // Disable Ctrl+Shift+C (Inspect Element selector)
      if (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "c")) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSplashFinish = useCallback(() => {
    setPhase("intro");
  }, []);

  const handleIntroContinue = useCallback(() => {
    localStorage.setItem("carelife_intro_completed", "true");
    setPhase("app");
  }, []);

  const handleIntroSkip = useCallback(() => {
    localStorage.setItem("carelife_intro_completed", "true");
    setPhase("app");
  }, []);

  const handleActivationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = activationCode.toUpperCase().trim();
    setActivationError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: cleanCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Error dari server (kode salah, sudah dipakai, dll)
        setActivationError(data.error ?? "Terjadi kesalahan. Silakan coba lagi.");
        return;
      }

      // Sukses — simpan ke localStorage sebagai cache agar tidak perlu hit API tiap buka app
      const usedCodesRaw = localStorage.getItem("carelife_used_codes");
      const usedCodes: string[] = usedCodesRaw ? JSON.parse(usedCodesRaw) : [];
      localStorage.setItem("carelife_used_codes", JSON.stringify([...usedCodes, cleanCode]));
      localStorage.setItem("carelife_activated", "true");
      localStorage.setItem("carelife_migrated", "true");
      setActivationStatus("activated");
    } catch {
      // Network error / server down
      setActivationError("Gagal terhubung ke server. Periksa koneksi internet kamu dan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // GATE 1: Jika belum client-side atau sedang mengecek memori, kembalikan layar kosong
  if (!isClient || activationStatus === "loading") {
    return <div className="min-h-screen bg-[#F8F9FA]" />;
  }

  // GATE 2: Jika belum diaktivasi, HANYA TAMPILKAN layar aktivasi (konten utama TIDAK DI-RENDER)
  if (activationStatus === "unactivated") {
    return (
      <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F8F9FA] px-6 py-12">
        {/* Decorative blobs */}
        <div className="absolute top-[10%] left-[-10%] w-48 h-48 bg-[#A8E6CF] rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-48 h-48 bg-[#FFB6B6] rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-[400px] bg-white rounded-[32px] p-6 md:p-8 border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] flex flex-col items-center text-center">
           {/* Logo/Icon */}
           <div className="w-16 h-16 bg-[#FFD700] rounded-[24px] border-2 border-[#1A1A1A] flex items-center justify-center shadow-[3px_3px_0_#1A1A1A] mb-6">
              <span className="text-3xl">📖</span>
           </div>

           <h2 className="text-2xl font-black text-[#1A1A1A] mb-3">Aktivasi Buku</h2>
           <p className="text-xs font-bold text-[#6B7280] mb-6 leading-relaxed">
              Silakan masukkan kode aktivasi unik yang tercetak di halaman buku fisik CareLife Anda untuk membuka materi belajar.
           </p>

           <form onSubmit={handleActivationSubmit} className="w-full flex flex-col gap-4">
              <div className="relative w-full">
                 <input
                    type="text"
                    placeholder="CL-XXXX"
                    value={activationCode}
                    onChange={(e) => {
                       setActivationCode(e.target.value.toUpperCase());
                       setActivationError(null);
                    }}
                    className="w-full text-center text-lg font-bold placeholder-[#9CA3AF] py-3.5 px-4 bg-[#F8F9FA] border-2 border-[#1A1A1A] rounded-[16px] outline-none focus:ring-2 focus:ring-[#66B2B2] uppercase"
                 />
              </div>
              {activationError && (
                 <p className="text-red-500 font-bold text-xs text-center">{activationError}</p>
              )}
               <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#66B2B2] hover:bg-[#5AA3A3] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black text-sm rounded-[16px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#1A1A1A] transition-all"
               >
                  {isSubmitting ? "Mengaktifkan..." : "Aktifkan Sekarang"}
               </button>
           </form>

           <div className="mt-6 flex flex-col gap-2">
              <p className="text-[10px] font-bold text-[#9CA3AF]">
                 Format kode: CL- diikuti 4 angka (contoh: CL-4819)
              </p>
           </div>
        </div>
      </div>
    );
  }

  // GATE 3: Jika SUDAH DIAKTIVASI, render aplikasi sepenuhnya
  return (
    <>
      {phase === "splash" && <SplashScreen onFinish={handleSplashFinish} />}
      {phase === "intro" && (
        <IntroPage1 onContinue={handleIntroContinue} onSkip={handleIntroSkip} />
      )}
      
      <AppPhaseContext.Provider value={phase}>
        <div
          className={`
            max-w-[480px] md:max-w-none
            mx-auto min-h-screen bg-[#F8F9FA]
            relative flex flex-col overflow-x-hidden 
            transition-opacity duration-500
            ${phase !== "app" ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
        >
          <main id="main-content" className="flex-1 pb-28">{children}</main>
          <AccessibilityPanel />
          <BottomNav />
        </div>
      </AppPhaseContext.Provider>  
    </>
  );
}
