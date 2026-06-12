"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  getLessonByTema,
  type Mode,
  type Tema,
  type LessonStep,
} from "@/lib/content";
import { getTemaLabel, getModeLabel } from "@/lib/utils";
import ChatButton from "@/components/chat/ChatButton";
import { ArrowLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mode-specific layout components
import TunanetraLayout from "./TunanetraLayout";
import TunarunguLayout from "./TunarunguLayout";
import TunagrahitaLayout from "./TunagrahitaLayout";

interface PageProps {
  params: Promise<{
    tema: string;
    mode: string;
  }>;
}

export default function LearnDetailPage({ params }: PageProps) {
  const [tema, setTema] = useState<Tema | null>(null);
  const [mode, setMode] = useState<Mode | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{
    tema: string;
    mode: string;
  } | null>(null);

  useEffect(() => {
    params.then((p) => {
      setTema(p.tema as Tema);
      setMode(p.mode as Mode);
      setResolvedParams(p);
    });
  }, [params]);

  if (!resolvedParams || !tema || !mode) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-[#A8E6CF] border-t-[#66B2B2] rounded-full"
        />
      </div>
    );
  }

  const lesson = getLessonByTema(tema);

  if (!lesson) {
    return (
      <div className="min-h-screen py-12 px-6 md:px-10 lg:px-16 bg-[#F8F9FA]">
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/learn"
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
              href="/learn"
              className="inline-block bg-[#FFD700] text-[#1A1A1A] px-6 py-3 rounded-[16px] font-black text-sm border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all"
            >
              Kembali ke halaman tema
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Render different layouts per mode ──
  return (
    <div className="min-h-screen pb-24">
      {mode === "suara" && (
        <TunanetraLayout lesson={lesson} tema={tema} mode={mode} />
      )}
      {mode === "ceria" && (
        <TunarunguLayout lesson={lesson} tema={tema} mode={mode} />
      )}
      {mode === "visual" && (
        <TunagrahitaLayout lesson={lesson} tema={tema} mode={mode} />
      )}
      <ChatButton />
    </div>
  );
}
