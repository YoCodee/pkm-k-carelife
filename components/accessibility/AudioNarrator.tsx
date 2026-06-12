"use client";

import { useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface AudioNarratorProps {
  text: string;
  autoPlay?: boolean;
  onEnd?: () => void;
  shouldStop?: boolean; // Menghentikan narasi jika kondisi tertentu terpenuhi di luar (misalnya video diputar)
}

export default function AudioNarrator({ text, autoPlay = false, onEnd, shouldStop = false }: AudioNarratorProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = useCallback((content: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "id-ID";

    // Cari daftar suara Bahasa Indonesia yang tersedia di browser/perangkat
    const voices = speechSynthesis.getVoices();
    const idVoices = voices.filter(
      (v) => v.lang.toLowerCase().startsWith("id") || v.lang.toLowerCase() === "id-id"
    );

    // Prioritaskan suara "Natural/Online" (Edge/Chrome), lalu suara MacOS (Damayanti), 
    // lalu Google TTS, lalu fallback ke suara Indonesia pertama yang tersedia
    const bestVoice = idVoices.find((v) => 
      v.name.toLowerCase().includes("natural") || 
      v.name.toLowerCase().includes("online") || 
      v.name.toLowerCase().includes("neural")
    ) || idVoices.find((v) => 
      v.name.toLowerCase().includes("damayanti")
    ) || idVoices.find((v) => 
      v.name.toLowerCase().includes("google")
    ) || idVoices[0];

    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [onEnd]);

  const stop = useCallback(() => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Hentikan suara jika shouldStop bernilai true
  useEffect(() => {
    if (shouldStop && isSpeaking) {
      stop();
    }
  }, [shouldStop, isSpeaking, stop]);

  useEffect(() => {
    if (autoPlay && text && !shouldStop) {
      const timeout = setTimeout(() => speak(text), 600);
      return () => {
        clearTimeout(timeout);
        stop();
      };
    }
    return () => stop();
  }, [text, autoPlay, speak, stop, shouldStop]);

  const handleToggle = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full flex items-center gap-4 p-5 rounded-[20px] border-2 transition-all duration-300
        ${isSpeaking
          ? "bg-[#66B2B2] border-[#1A1A1A] text-white shadow-[4px_4px_0_#1A1A1A]"
          : "bg-[#A8E6CF] border-[#1A1A1A] text-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A]"
        }
      `}
      aria-label={isSpeaking ? "Hentikan narasi" : "Putar narasi audio"}
    >
      <div className={`
        w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#1A1A1A]
        ${isSpeaking ? "bg-white/20" : "bg-[#FFD700] text-[#1A1A1A]"}
      `}>
        {isSpeaking ? (
          <VolumeX size={28} className="text-white" />
        ) : (
          <Volume2 size={28} />
        )}
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm font-black">
          {isSpeaking ? "🔊 Sedang memutar narasi..." : "🔊 Dengarkan Narasi"}
        </p>
        <p className={`text-xs font-bold mt-0.5 ${isSpeaking ? "text-white/70" : "text-[#6B7280]"}`}>
          {isSpeaking ? "Ketuk untuk berhenti" : "Ketuk untuk mendengarkan"}
        </p>
      </div>

      {isSpeaking && (
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
              className="w-1 h-6 bg-white/80 rounded-full"
            />
          ))}
        </div>
      )}
    </motion.button>
  );
}
