"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MODE_LIST } from "@/lib/content";
import { motion } from "framer-motion";
import { Suspense } from "react";

const BOOK_COLORS = ["#A8E6CF", "#66B2B2", "#FFB6B6"];

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
            const bgColor = BOOK_COLORS[index % BOOK_COLORS.length];

            return (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => handleSelectMode(mode.id)}
              >
                {/* Book Cover */}
                <div 
                  className="relative w-[220px] h-[310px] md:w-[240px] md:h-[340px] rounded-r-[16px] rounded-l-[4px] border-2 border-[#1A1A1A] shadow-[6px_6px_0_#1A1A1A] transition-transform duration-500 group-hover:-translate-y-4 group-hover:rotate-y-[-10deg] preserve-3d"
                >
                  <div 
                    className="absolute inset-0 rounded-r-[16px] rounded-l-[4px] flex flex-col p-6"
                    style={{ background: bgColor }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/30 rounded-l-[4px]"></div>
                    <div className="absolute left-1.5 top-0 bottom-0 w-[1px] bg-[#1A1A1A]/10"></div>

                    <div className="flex-1 border-2 border-[#1A1A1A]/20 rounded-[12px] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                      
                      <span className="text-[56px] md:text-[64px] drop-shadow-md mb-6 relative z-10">
                        {mode.icon}
                      </span>
                      <h2 className="text-xl font-black text-[#1A1A1A] leading-tight relative z-10">
                        {mode.label}
                      </h2>
                      <p className="text-[10px] font-bold text-[#1A1A1A]/60 mt-2 uppercase tracking-widest relative z-10">
                        Edisi Khusus
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute top-[5px] right-[-10px] bottom-[5px] w-[10px] bg-[#F8F9FA] transform skew-y-[45deg] origin-left rounded-r-[2px] hidden group-hover:block transition-all shadow-inner border-y border-r border-[#1A1A1A]/20"></div>
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
                ? "Buku ini akan langsung membawamu ke materi yang baru saja kamu scan." 
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
