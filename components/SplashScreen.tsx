"use client";

import { useState, useEffect } from "react";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [textVisible, setTextVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => {
      setTextVisible(true);
    }, 300); // Wait 300ms before starting text fade-in

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2200); // Show for ~2 seconds total, then start fade-out

    const removeTimer = setTimeout(() => {
      onFinish();
    }, 2800); // Complete fade-out (600ms) then finish splash screen

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-[600ms] ease-out ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "#F8F9FA" }}
    >
      {/* Mint blob — top left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-5%",
          left: "-10%",
          width: "60%",
          height: "40%",
          background: "radial-gradient(ellipse at 30% 30%, rgba(168,230,207,0.7) 0%, rgba(168,230,207,0.3) 50%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      {/* Pink blob — bottom right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          right: "-10%",
          width: "90%",
          height: "45%",
          background: "radial-gradient(ellipse at 70% 80%, rgba(255,182,182,0.7) 0%, rgba(255,182,182,0.3) 50%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />
      {/* Yellow blob — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-5%",
          left: "-10%",
          width: "65%",
          height: "40%",
          background: "radial-gradient(ellipse at center, rgba(255,215,0,0.4) 0%, transparent 100%)",
          filter: "blur(40px)",
        }}
      />

      <h1
        className={`relative z-10 text-[40px] font-black tracking-tight transition-all duration-700 ease-out ${
          fadeOut
            ? "scale-110 opacity-0"
            : textVisible
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-95 opacity-0 translate-y-3"
        }`}
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <span className="text-[#1A1A1A]">Care</span>
        <span className="text-[#66B2B2]">Life</span>
      </h1>
    </div>
  );
}
