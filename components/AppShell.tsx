"use client";

import { useState, useCallback, createContext } from "react";
import SplashScreen from "@/components/SplashScreen";
import IntroPage1 from "@/components/IntroPage1";
import BottomNav from "@/components/layout/BottomNav";
import AccessibilityPanel from "@/components/accessibility/AccessibilityPanel";

export type AppPhase = "splash" | "intro" | "app";

export const AppPhaseContext = createContext<AppPhase>("splash");

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<AppPhase>("splash");

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
          <main className="flex-1 pb-28">{children}</main>
          <AccessibilityPanel />
          <BottomNav />
        </div>
      </AppPhaseContext.Provider>
    </>
  );
}
