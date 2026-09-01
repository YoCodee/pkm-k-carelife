"use client";

import { useState, useEffect } from "react";

export default function IntroPage1({ onContinue, onSkip }: { onContinue: () => void; onSkip: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9998] flex flex-col items-center bg-[#F8F9FA] transition-opacity duration-500 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-[15%] left-[-10%] w-40 h-40 bg-[#A8E6CF] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-48 h-48 bg-[#FFB6B6] rounded-full blur-3xl opacity-40 pointer-events-none" />

      {/* Skip button */}
      <div className="w-full max-w-[480px] flex justify-end px-6 pt-12">
        <button
          onClick={onSkip}
          className="text-sm font-bold text-[#6B7280] hover:text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A]"
        >
          Skip
        </button>
      </div>

      {/* Book illustrations — stacked/rotated cards */}
      <div className="flex-1 flex items-center justify-center relative w-full max-w-[320px]">
        {/* Back book — right, rotated */}
        <div
          className="absolute w-[140px] h-[190px] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] overflow-hidden"
          style={{
            transform: "rotate(12deg) translateX(40px) translateY(-10px)",
            zIndex: 1,
          }}
        >
          <div className="w-full h-full bg-[#FFB6B6] flex flex-col items-center justify-center p-4">
            <span className="text-[40px] mb-2">🤟</span>
            <p className="text-[#1A1A1A] font-black text-[11px] text-center leading-tight">Bahasa<br/>Isyarat</p>
          </div>
        </div>

        {/* Back book — left, rotated */}
        <div
          className="absolute w-[140px] h-[190px] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] overflow-hidden"
          style={{
            transform: "rotate(-8deg) translateX(-40px) translateY(-5px)",
            zIndex: 2,
          }}
        >
          <div className="w-full h-full bg-[#66B2B2] flex flex-col items-center justify-center p-4">
            <span className="text-[40px] mb-2">🎧</span>
            <p className="text-white font-black text-[11px] text-center leading-tight">Dunia<br/>Suara</p>
          </div>
        </div>

        {/* Front book — center, prominent */}
        <div
          className="relative w-[160px] h-[215px] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] overflow-hidden"
          style={{ zIndex: 3 }}
        >
          <div className="w-full h-full bg-[#FFD700] flex flex-col items-center justify-center p-5">
            <span className="text-[48px] mb-2">📖</span>
            <p className="text-[#1A1A1A] font-black text-xs text-center leading-tight">CareLife</p>
            <p className="text-[#1A1A1A]/70 font-bold text-[9px] text-center mt-1">Buku Interaktif<br/>4-in-1</p>
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className="text-center px-8 mb-6 flex flex-col items-center">
        <img
          src="/logo-carelife.png"
          alt="CareLife Logo"
          className="w-20 h-20 object-contain border-2 border-[#1A1A1A] p-2 rounded-[20px] bg-white shadow-[2px_2px_0_#1A1A1A] mb-4"
        />
        <h1 className="text-[28px] font-black text-[#1A1A1A] leading-tight mb-3">
          Welcome<br/>to the <span className="text-[#66B2B2]">CareLife</span>
        </h1>
        <p className="text-sm font-bold text-[#6B7280] leading-relaxed">
          Pendamping belajar interaktif untuk<br/>Anak Berkebutuhan Khusus.
        </p>
      </div>

      {/* Continue button */}
      <div className="w-full max-w-[480px] px-8 mb-4">
        <button
          onClick={onContinue}
          className="w-full bg-[#FFD700] hover:bg-[#F5C800] text-[#1A1A1A] font-black text-base py-4 rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all flex items-center justify-center gap-2"
        >
          Continue
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-[1px]">
            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Bottom text */}
      <div className="pb-10">
        <p className="text-xs font-bold text-[#6B7280]">
          Dikembangkan oleh <span className="text-[#1A1A1A] font-black underline underline-offset-2 decoration-[#FFD700]">Tim PKM-K UTY</span>
        </p>
      </div>
    </div>
  );
}
