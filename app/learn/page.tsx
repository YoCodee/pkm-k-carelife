"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense, useState, useEffect } from "react";
import { TEMA_LIST, MODE_LIST, getLessonByTema, Tema } from "@/lib/content";
import { getModeLabel } from "@/lib/utils";
import { ArrowLeft, BookOpen, Bookmark } from "lucide-react";
import { playSFX, triggerHaptic } from "@/lib/sfx";

function LearnPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = (searchParams.get("mode") || "visual") as
    | "visual"
    | "suara"
    | "ceria";

  const modeInfo = MODE_LIST.find((m) => m.id === mode);
  
  const [totalStars, setTotalStars] = useState(0);
  const [starsMap, setStarsMap] = useState<Record<string, number>>({});
  const [completedList, setCompletedList] = useState<string[]>([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedStars = JSON.parse(localStorage.getItem("carelife-stars") || "{}");
      const savedCompleted = JSON.parse(localStorage.getItem("carelife-completed") || "[]");
      
      setStarsMap(savedStars);
      setCompletedList(savedCompleted);
      
      const sum = Object.values(savedStars).reduce((a: any, b: any) => a + Number(b), 0) as number;
      setTotalStars(sum);
    } catch (e) {
      console.error("Failed to load local progress:", e);
    }
  }, []);

  const handleSelectTema = (tema: string) => {
    playSFX("click");
    triggerHaptic("click");
    router.push(`/learn/${tema}/${mode}`);
  };

  return (
    <div className="min-h-screen font-sans bg-[#F8F9FA] py-6 px-4 md:px-10 lg:px-16">
      
      <div className="max-w-[1000px] w-full mx-auto bg-white rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] flex flex-col md:flex-row relative overflow-hidden md:overflow-visible min-h-[600px]">
        
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#1A1A1A]/10 z-20"></div>

        {/* --- LEFT PAGE (Mode Info) --- */}
        <div className="flex-1 p-8 md:p-14 relative flex flex-col justify-between bg-white z-0">
          <div>
            <Link
              href="/menu"
              onClick={() => {
                playSFX("back");
                triggerHaptic("back");
              }}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-[#F8F9FA] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-12"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              Tutup Buku (Kembali)
            </Link>

            <div className="space-y-6 mt-4">
              <span className="cl-tag cl-tag-teal">Mode Pembelajaran</span>
              
              <div className="flex flex-col gap-4">
                <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] tracking-tight">
                  {getModeLabel(mode)}
                </h1>
              </div>

              <p className="text-base md:text-lg font-medium text-[#6B7280] leading-relaxed mt-4 max-w-sm">
                {modeInfo?.description}
              </p>

              {/* Progress Board */}
              <div className="bg-[#FFD700]/10 border-2 border-[#1A1A1A] rounded-[20px] p-5 shadow-[4px_4px_0_#1A1A1A] mt-8 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-[#6B7280] uppercase tracking-wider">
                    Peta Bintang CareLife
                  </p>
                  <p className="text-xl font-black text-[#1A1A1A] mt-1">
                    ⭐ {totalStars} Bintang
                  </p>
                </div>
                <div className="text-3xl">🏆</div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t-2 border-[#1A1A1A]/10 flex items-center justify-between text-[#6B7280]">
            <BookOpen size={24} className="opacity-50" />
            <span className="font-serif italic text-sm">Pustaka CareLife</span>
          </div>

          <div className="hidden md:block absolute bottom-6 left-8 text-sm font-bold text-[#6B7280]">
            1
          </div>
        </div>

        {/* --- RIGHT PAGE (Table of Contents) --- */}
        <div className="flex-1 p-8 md:p-14 relative bg-[#F8F9FA] flex flex-col border-t-2 md:border-t-0 border-[#1A1A1A]/10 z-0">
          
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-[#FFD700] p-2 rounded-[12px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <Bookmark className="text-[#1A1A1A]" size={20} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-wide">
              Daftar Isi
            </h2>
          </div>

          <div className="flex flex-col gap-4 flex-1 mt-4">
            {TEMA_LIST.map((tema, index) => {
              const lesson = getLessonByTema(tema.id as Tema);
              const lessonStars = lesson ? starsMap[lesson.id] || 0 : 0;
              const isCompleted = lesson ? completedList.includes(lesson.id) : false;

              return (
                <div
                  key={tema.id}
                  onClick={() => handleSelectTema(tema.id)}
                  className="group cursor-pointer flex flex-col justify-center py-3.5 px-4 rounded-[16px] border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] hover:bg-[#FFD700]/10 transition-all relative"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-baseline gap-3">
                      <div className="text-xl md:text-2xl font-black text-[#66B2B2] group-hover:text-[#1A1A1A] transition-colors w-6 text-right font-mono">
                        {index + 1}.
                      </div>
                      
                      <h3 className="text-base md:text-lg font-bold text-[#1A1A1A] group-hover:text-[#66B2B2] transition-colors">
                        {tema.label}
                      </h3>
                    </div>

                    {isCompleted && (
                      <div className="bg-[#A8E6CF] text-[#1A1A1A] px-2.5 py-0.5 rounded-full border border-[#1A1A1A] text-[9px] font-black flex items-center gap-1 shadow-[1px_1px_0_#1A1A1A]">
                        <span>{lessonStars > 0 ? "⭐".repeat(lessonStars) : "Selesai"}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs font-medium text-[#6B7280] mt-1.5 ml-10 line-clamp-1 pr-16">
                    {tema.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="hidden md:block absolute bottom-6 right-8 text-sm font-bold text-[#6B7280]">
            2
          </div>
        </div>

      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-[#1A1A1A] font-bold">Membuka buku...</div>}>
      <LearnPageContent />
    </Suspense>
  );
}
