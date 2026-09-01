"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MODE_LIST } from "@/lib/content";
import { motion } from "framer-motion";
import { Suspense } from "react";

const BOOK_DESIGNS = [
  {
    bg: "#22C55E", // Tunagrahita (Bright Grass Green)
    sticker: "1st",
    tagline: "Dunia Visual",
    tagColor: "text-[#22C55E] bg-[#22C55E]/10 border-[#22C55E]/30",
    badgeText: "BELAJAR VISUAL",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[3px_3px_0_#1A1A1A]">
        {/* Sparkles around */}
        <path d="M15 25 L18 20 L21 25 L18 30 Z" fill="#FFD700" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M80 70 L83 65 L86 70 L83 75 Z" fill="#FFD700" stroke="#1A1A1A" strokeWidth="1.5" />
        {/* Magnified Golden Star */}
        <path d="M50 20 L57 38 L76 38 L61 49 L67 67 L50 56 L33 67 L39 49 L24 38 L43 38 Z" fill="#FFD700" stroke="#1A1A1A" strokeWidth="3" />
        {/* Handle */}
        <rect x="20" y="65" width="10" height="28" rx="4" transform="rotate(-45 25 79)" fill="#D2691E" stroke="#1A1A1A" strokeWidth="3.5" />
        <rect x="20" y="65" width="10" height="8" rx="1" transform="rotate(-45 25 79)" fill="#FFD700" stroke="#1A1A1A" strokeWidth="3.5" />
        {/* Glass Ring */}
        <circle cx="55" cy="45" r="24" fill="#E0F7FA" fillOpacity="0.6" stroke="#1A1A1A" strokeWidth="4.5" />
        {/* Glare */}
        <path d="M43 31 A 18 18 0 0 1 67 31" fill="none" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    bg: "#3B82F6", // Tunanetra (Bright Royal Blue)
    sticker: "2nd",
    tagline: "Dunia Suara",
    tagColor: "text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30",
    badgeText: "PANDUAN AUDIO",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[3px_3px_0_#1A1A1A]">
        {/* Soundwaves */}
        <path d="M12 50 Q5 45 12 40" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M88 50 Q95 45 88 40" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
        <path d="M16 55 Q2 45 16 35" fill="none" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
        <path d="M84 55 Q98 45 84 35" fill="none" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
        {/* Headband */}
        <path d="M26 50 A 24 24 0 0 1 74 50" fill="none" stroke="#1A1A1A" strokeWidth="7" strokeLinecap="round" />
        <path d="M26 50 A 24 24 0 0 1 74 50" fill="none" stroke="#FFD700" strokeWidth="3.5" strokeLinecap="round" />
        {/* Earcup connectors */}
        <rect x="22" y="46" width="6" height="12" rx="2" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1" />
        <rect x="72" y="46" width="6" height="12" rx="2" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1" />
        {/* Earcups */}
        <rect x="15" y="48" width="16" height="26" rx="8" fill="#FF8B8B" stroke="#1A1A1A" strokeWidth="4" />
        <rect x="69" y="48" width="16" height="26" rx="8" fill="#FF8B8B" stroke="#1A1A1A" strokeWidth="4" />
        {/* Inner cushions */}
        <rect x="23" y="53" width="5" height="16" rx="2" fill="#1A1A1A" />
        <rect x="72" y="53" width="5" height="16" rx="2" fill="#1A1A1A" />
      </svg>
    )
  },
  {
    bg: "#FF6B6B", // Tunarungu (Bright Coral Red)
    sticker: "3rd",
    tagline: "Dunia Ceria",
    tagColor: "text-[#FF6B6B] bg-[#FF6B6B]/10 border-[#FF6B6B]/30",
    badgeText: "BAHASA ISYARAT",
    svg: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-[3px_3px_0_#1A1A1A]">
        {/* Palette Body */}
        <path d="M20 50 C20 30, 45 20, 75 25 C85 27, 85 45, 75 60 C65 75, 45 85, 25 80 C15 78, 20 62, 20 50 Z" fill="#FFF" stroke="#1A1A1A" strokeWidth="4.5" />
        {/* Thumb hole */}
        <circle cx="32" cy="62" r="5" fill="#F8F9FA" stroke="#1A1A1A" strokeWidth="3" />
        {/* Paint Blobs */}
        <circle cx="35" cy="38" r="6" fill="#FF4757" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="52" cy="33" r="6" fill="#3B82F6" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="68" cy="42" r="6" fill="#2D5F4E" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="58" cy="68" r="6" fill="#FFD700" stroke="#1A1A1A" strokeWidth="3" />
        {/* Paint Brush */}
        <g transform="rotate(-25 50 50)">
          {/* Brush Handle */}
          <rect x="47" y="10" width="6" height="65" rx="3" fill="#D2691E" stroke="#1A1A1A" strokeWidth="3" />
          {/* Ferrule */}
          <rect x="46" y="70" width="8" height="8" fill="#B0C4DE" stroke="#1A1A1A" strokeWidth="2.5" />
          {/* Bristles */}
          <path d="M46 78 C46 86, 54 86, 54 78 Z" fill="#FFD700" stroke="#1A1A1A" strokeWidth="2.5" />
          {/* Wet paint tip */}
          <path d="M48 83 C48 88, 52 88, 52 83 Z" fill="#FF4757" />
        </g>
      </svg>
    )
  }
];

function MenuPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tema = searchParams.get("tema");

  const handleSelectMode = (mode: string) => {
    if (tema) {
      router.push(`/learn/${tema}/${mode}`);
    } else {
      router.push(`/learn?mode=${mode}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA] relative overflow-hidden">

      {/* Decorative blobs */}
      <div className="absolute top-[5%] left-[-5%] w-40 h-40 bg-[#A8E6CF] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-[30%] right-[-8%] w-48 h-48 bg-[#FFD700] rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Header */}
      <header className="bg-white pt-12 pb-6 px-6 md:px-10 lg:px-16 rounded-b-[32px] border-b-2 border-[#1A1A1A] shadow-[0_4px_0_#1A1A1A] relative z-10">
        <div className="max-w-[900px] mx-auto text-center md:text-left">
          <h1 className="text-[28px] md:text-[34px] font-black text-[#1A1A1A] tracking-tight">
            Koleksi <span className="text-[#66B2B2]">Buku</span>
          </h1>
          <p className="text-sm font-bold text-[#6B7280] mt-1">
            {tema 
              ? "Pilih versi buku untuk mulai belajar materi ini" 
              : "Pilih versi buku yang paling nyaman untukmu"}
          </p>
        </div>
      </header>

      {/* Bookshelf Area */}
      <div className="flex-1 px-6 py-8 md:px-10 lg:px-16 max-w-[1000px] mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 perspective-1000">
          {MODE_LIST.map((mode, index) => {
            const design = BOOK_DESIGNS[index % BOOK_DESIGNS.length];

            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center group cursor-pointer relative"
                onClick={() => handleSelectMode(mode.id)}
              >
                {/* Book Cover */}
                <div 
                  className="relative w-[220px] h-[310px] md:w-[240px] md:h-[340px] rounded-r-[24px] rounded-l-[8px] border-4 border-[#1A1A1A] shadow-[8px_8px_0_#1A1A1A] transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-y-[-10deg] group-hover:shadow-[14px_14px_0_#1A1A1A] preserve-3d"
                >
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-between pl-8 pr-4 py-6 rounded-r-[20px] rounded-l-[4px] overflow-hidden"
                    style={{ backgroundColor: design.bg }}
                  >
                    {/* Dark Binding Spine (Left Side) */}
                    <div className="absolute left-0 top-0 bottom-0 w-[22px] bg-[#1A1A1A] rounded-l-[4px] border-r-4 border-white/20 flex flex-col justify-between py-6 z-20">
                      <div className="h-3 w-full border-y border-white/10 bg-gradient-to-r from-transparent to-white/10"></div>
                      <div className="h-3 w-full border-y border-white/10 bg-gradient-to-r from-transparent to-white/10"></div>
                      <div className="h-3 w-full border-y border-white/10 bg-gradient-to-r from-transparent to-white/10"></div>
                    </div>

                    {/* Playful Doodles Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none z-0">
                      <div className="absolute top-[20%] left-[25%] w-2 h-2 rounded-full bg-white"></div>
                      <div className="absolute top-[15%] right-[20%] w-3 h-0.5 bg-white rotate-45"></div>
                      <div className="absolute top-[15%] right-[20%] w-0.5 h-3 bg-white rotate-45"></div>
                      <div className="absolute bottom-[30%] left-[30%] w-3 h-0.5 bg-white -rotate-12"></div>
                      <div className="absolute bottom-[45%] right-[15%] w-2 h-2 rounded-full bg-white"></div>
                    </div>

                    {/* Tilted Sticker/Badge (Top Right) */}
                    <div className="absolute -top-1 -right-1 bg-[#FFD700] border-4 border-[#1A1A1A] w-11 h-11 rounded-full flex items-center justify-center font-black text-[#1A1A1A] text-xs rotate-12 shadow-[2px_2px_0_#1A1A1A] z-20 select-none">
                      {design.sticker}
                    </div>

                    {/* Central Speech Bubble / Cloud Card */}
                    <div className="w-full bg-white border-4 border-[#1A1A1A] rounded-[24px] px-2 py-3 shadow-[4px_4px_0_#1A1A1A] relative z-10 flex flex-col items-center justify-center mt-2">
                      {/* Speech Bubble Tail */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[8px] border-x-transparent border-t-[12px] border-t-[#1A1A1A]"></div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[10px] border-t-white"></div>

                      <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A] leading-none tracking-tight">
                        {mode.label}
                      </h2>
                      <span className={`text-[9px] font-black tracking-wide border px-2 py-0.5 rounded-full mt-1.5 ${design.tagColor}`}>
                        {design.tagline}
                      </span>
                    </div>

                    {/* Main Illustration (Bottom Half) */}
                    <div className="relative z-10 flex items-center justify-center my-auto">
                      {design.svg}
                    </div>

                    {/* Bottom Label Badge */}
                    <div className="bg-white border-2 border-[#1A1A1A] rounded-full px-3 py-1 shadow-[2px_2px_0_#1A1A1A] z-10">
                      <span className="text-[8px] font-black tracking-[0.1em] text-[#1A1A1A] uppercase">
                        {design.badgeText}
                      </span>
                    </div>
                  </div>

                  {/* 3D Pages Thickness (Hidden by default, shown on hover) */}
                  <div className="absolute top-[6px] right-[-10px] bottom-[6px] w-[10px] bg-[#F8F9FA] transform skew-y-[45deg] origin-left rounded-r-[4px] hidden group-hover:block transition-all shadow-inner border-y border-r border-[#1A1A1A]/20 z-0"></div>
                </div>

                <div className="w-[180px] h-3 bg-[#1A1A1A]/10 rounded-full blur-md mt-6 transition-all group-hover:w-[200px] group-hover:opacity-60"></div>

                <div className="mt-4 text-center px-4">
                  <h3 className="text-lg font-black text-[#1A1A1A]">{mode.label}</h3>
                  <p className="text-xs font-bold text-[#6B7280] mt-1">{mode.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Banner at bottom */}
      <div className="px-6 md:px-10 lg:px-16 pb-12 w-full max-w-[1000px] mx-auto relative z-10">
        <div className="bg-white rounded-[24px] p-5 flex items-center gap-4 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]">
          <div className="bg-[#FFD700] p-3 rounded-[14px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
            <span className="text-xl">💡</span>
          </div>
          <div>
            <h4 className="font-black text-[#1A1A1A] text-sm">Tahukah Kamu?</h4>
            <p className="text-xs font-bold text-[#6B7280]">
              {tema 
                ? "Silakan pilih mode belajar untuk mulai mempelajari materi." 
                : "Setiap buku disesuaikan dengan kebutuhan belajar spesifik anak untuk pengalaman maksimal."}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] font-bold text-[#1A1A1A]">Memuat...</div>}>
      <MenuPageContent />
    </Suspense>
  );
}
