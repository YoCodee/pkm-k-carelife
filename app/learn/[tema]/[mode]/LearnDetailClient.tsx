"use client";

import Link from "next/link";
import {
  getLessonByTema,
  type Mode,
  type Tema,
} from "@/lib/content";
import ChatButton from "@/components/chat/ChatButton";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

// Mode-specific layout components
import TunanetraLayout from "./TunanetraLayout";
import TunarunguLayout from "./TunarunguLayout";
import TunagrahitaLayout from "./TunagrahitaLayout";

interface LearnDetailClientProps {
  tema: Tema;
  mode: Mode;
}

export default function LearnDetailClient({ tema, mode }: LearnDetailClientProps) {
  const searchParams = useSearchParams();
  const isLocked = searchParams.get("locked") === "true";
  const lesson = getLessonByTema(tema, mode);

  if (!lesson) {
    return (
      <div className="min-h-screen py-12 px-6 md:px-10 lg:px-16 bg-[#F8F9FA]">
        <div className="max-w-[900px] mx-auto">
            <Link
              href={isLocked ? `/learn?mode=${mode}&locked=true` : `/learn?mode=${mode}`}
              className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-6"
            >
              <ArrowLeft size={18} strokeWidth={3} />
              Kembali ke Pilih Tema
            </Link>
          <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 text-center shadow-[4px_4px_0_#1A1A1A]">
            <div className="text-[64px] mb-4">🚧</div>
            <p className="text-xl font-black text-[#1A1A1A] mb-2">
              Konten Sedang Disiapkan
            </p>
            <p className="text-sm font-bold text-[#6B7280] mb-6">
              Konten untuk tema ini sedang dalam proses pembuatan.
            </p>
            <Link
              href={isLocked ? `/learn?mode=${mode}&locked=true` : `/learn?mode=${mode}`}
              className="inline-block bg-[#FFD700] text-[#1A1A1A] px-6 py-3 rounded-[16px] font-black text-sm border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all"
            >
              Kembali ke halaman tema
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {mode === "suara" && (
        <TunanetraLayout
          key={lesson.id}
          lesson={lesson}
          tema={tema}
          mode={mode}
          isLocked={isLocked}
        />
      )}
      {mode === "ceria" && (
        <TunarunguLayout
          key={lesson.id}
          lesson={lesson}
          tema={tema}
          mode={mode}
          isLocked={isLocked}
        />
      )}
      {mode === "visual" && (
        <TunagrahitaLayout
          key={lesson.id}
          lesson={lesson}
          tema={tema}
          mode={mode}
          isLocked={isLocked}
        />
      )}
      <ChatButton />
    </div>
  );
}
