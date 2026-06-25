"use client";

import { useState, useCallback, createContext, useEffect } from "react";
import SplashScreen from "@/components/SplashScreen";
import IntroPage1 from "@/components/IntroPage1";
import BottomNav from "@/components/layout/BottomNav";
import AccessibilityPanel from "@/components/accessibility/AccessibilityPanel";
import { useFocusOnNavigation } from "@/lib/hooks/useFocusOnNavigation";

export type AppPhase = "splash" | "intro" | "app";

export const AppPhaseContext = createContext<AppPhase>("splash");

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>("splash");

  // Reset focus on navigation
  useFocusOnNavigation();

  useEffect(() => {
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

  const handleSplashFinish = useCallback(() => {
    setPhase("intro");
  }, []);

  const handleIntroContinue = useCallback(() => {
    setPhase("app");
  }, []);

  const handleIntroSkip = useCallback(() => {
    setPhase("app");
  }, []);

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
