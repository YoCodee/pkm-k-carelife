"use client";
import Link from "next/link";
import { Search, Grid3X3, BookOpen, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppPhaseContext } from "@/components/AppShell";

export default function Home() {
  const phase = useContext(AppPhaseContext);
  const isReady = phase === "app";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA] relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[8%] right-[-5%] w-36 h-36 bg-[#A8E6CF] rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute top-[40%] left-[-8%] w-44 h-44 bg-[#FFB6B6] rounded-full blur-3xl opacity-35 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-32 h-32 bg-[#FFD700] rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* ─── Top Bar ─── */}
      <header className="bg-[#F8F9FA] pt-12 pb-4 px-6 md:px-10 lg:px-16 relative z-10">
        <div className="max-w-[900px] mx-auto">
          <div className="flex justify-between items-center">
            <button className="w-11 h-11 bg-white rounded-[14px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all">
              <Grid3X3 size={20} className="text-[#1A1A1A]" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-11 h-11 bg-[#66B2B2] rounded-[14px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all">
                <Search size={18} className="text-white" />
              </button>
              <Link
                href="/about"
                className="w-11 h-11 bg-[#FFB6B6] rounded-[14px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all overflow-hidden"
              >
                <img
                  src="https://api.dicebear.com/7.x/notionists/svg?seed=CareLife&backgroundColor=ffdfbf"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-[12px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 md:px-10 lg:px-16 py-6 flex flex-col gap-6 max-w-[900px] mx-auto w-full relative z-10">
        {/* ─── Welcome Text ─── */}
        <div className="mt-2">
          <p className="text-sm font-bold text-[#6B7280]">Selamat Datang,</p>
          <h1 className="text-[28px] md:text-[34px] font-black text-[#1A1A1A] leading-tight tracking-tight">
            Care<span className="text-[#66B2B2]">Life</span> Kamu
          </h1>
        </div>

        {/* ─── Stacked Cards Visual ─── */}
        <div className="flex items-center justify-center py-6 md:py-10">
          <div className="relative w-[260px] h-[200px] md:w-[320px] md:h-[240px] flex justify-center items-center">
            {/* Back card — left (mint) */}
            <motion.div
              initial={false}
              animate={
                isReady
                  ? { rotate: -12, x: -60, y: 10, opacity: 1 }
                  : { rotate: 0, x: 0, y: 20, opacity: 0 }
              }
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
                delay: 0.1,
              }}
              className="absolute w-[130px] h-[170px] md:w-[160px] md:h-[200px] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]"
              style={{ background: "#A8E6CF", zIndex: 1 }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <span className="text-[36px] md:text-[44px] mb-1">👁️</span>
                <p className="text-[#1A1A1A] font-black text-xs text-center">
                  Dunia Visual
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={false}
              animate={
                isReady
                  ? { rotate: 10, x: 60, y: 5, opacity: 1 }
                  : { rotate: 0, x: 0, y: 20, opacity: 0 }
              }
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.4,
                delay: 0.2,
              }}
              className="absolute w-[130px] h-[170px] md:w-[160px] md:h-[200px] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]"
              style={{ background: "#FFB6B6", zIndex: 2 }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-4">
                <span className="text-[36px] md:text-[44px] mb-1">🤟</span>
                <p className="text-[#1A1A1A] font-black text-xs text-center">
                  Dunia Ceria
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={false}
              animate={
                isReady
                  ? { y: 0, opacity: 1, scale: 1 }
                  : { y: 30, opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="absolute w-[140px] h-[180px] md:w-[170px] md:h-[215px] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]"
              style={{ background: "#66B2B2", zIndex: 3 }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-5 cursor-pointer">
                <span className="text-[44px] md:text-[52px] mb-2">🎧</span>
                <p className="text-white font-black text-sm text-center">
                  Dunia Suara
                </p>
                <p className="text-white/70 font-bold text-[10px] text-center mt-1">
                  CareLife
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="text-center mb-2">
          <h2 className="text-lg font-black text-[#1A1A1A]">
            Kategori Belajar
          </h2>
          <p className="text-xs font-bold text-[#6B7280]">4 Tema Tersedia</p>
        </div>

        <Link
          href="/menu"
          className="w-full bg-[#FFD700] hover:bg-[#F5C800] text-[#1A1A1A] font-black text-sm py-4 rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all flex items-center justify-center gap-2"
        >
          <BookOpen size={18} />
          Mulai Belajar
          <ChevronRight size={16} />
        </Link>

   
        <div className="mt-4 mb-8 bg-white rounded-[24px] p-6 md:p-8 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#A8E6CF] rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10 md:flex md:items-center md:gap-6">
            <div className="flex-1">
              <span className="cl-tag cl-tag-pink mb-3">Aksesibilitas</span>
              <h3 className="text-lg md:text-xl font-black mb-2 leading-tight text-[#1A1A1A]">
                3 Mode Belajar
                <br />
                Untuk Semua ABK
              </h3>
              <p className="text-[#6B7280] font-bold text-xs leading-relaxed">
                Visual, Audio, dan Bahasa Isyarat — disesuaikan untuk tunanetra,
                tunarungu & tunagrahita.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <div className="bg-[#A8E6CF] p-3 rounded-[16px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
                <span className="text-xl">👁️</span>
              </div>
              <div className="bg-[#66B2B2] p-3 rounded-[16px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
                <span className="text-xl">🎧</span>
              </div>
              <div className="bg-[#FFB6B6] p-3 rounded-[16px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
                <span className="text-xl">🤟</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
