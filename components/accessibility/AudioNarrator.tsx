"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useSpeechSynthesisSSR } from "@/lib/hooks/useSpeechSynthesisSSR";

interface AudioNarratorProps {
  text: string;
  audioUrl?: string; // Berkas audio rekaman asli (opsional)
  autoPlay?: boolean;
  onEnd?: () => void;
  shouldStop?: boolean; // Menghentikan narasi jika kondisi tertentu terpenuhi di luar (misalnya video diputar)
}

export default function AudioNarrator({
  text,
  audioUrl,
  autoPlay = false,
  onEnd,
  shouldStop = false,
}: AudioNarratorProps) {
  const { isSpeaking: isSpeakingTTS, speak: speakTTS, stop: stopTTS } = useSpeechSynthesisSSR();
  const [isFileSpeaking, setIsFileSpeaking] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inisialisasi dan bersihkan objek audio saat audioUrl berubah
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsFileSpeaking(true);
      audio.onpause = () => setIsFileSpeaking(false);
      audio.onended = () => {
        setIsFileSpeaking(false);
        onEnd?.();
      };
      audio.onerror = () => {
        setIsFileSpeaking(false);
      };

      return () => {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
        setIsFileSpeaking(false);
      };
    }
  }, [audioUrl, onEnd]);

  const isSpeaking = audioUrl ? isFileSpeaking : isSpeakingTTS;

  const stopAll = useCallback(() => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsFileSpeaking(false);
    } else {
      stopTTS();
    }
  }, [audioUrl, stopTTS]);

  const speakAll = useCallback(() => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }
    } else {
      speakTTS(text, 0.9, 1.1, onEnd);
    }
  }, [audioUrl, text, onEnd, speakTTS]);

  // Hentikan suara jika shouldStop bernilai true
  useEffect(() => {
    if (shouldStop && isSpeaking) {
      stopAll();
    }
  }, [shouldStop, isSpeaking, stopAll]);

  useEffect(() => {
    if (autoPlay && (audioUrl || text) && !shouldStop) {
      const playAudio = () => {
        if (audioUrl) {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
              console.error("AutoPlay failed:", err);
            });
          }
        } else {
          speakTTS(text, 0.9, 1.1, onEnd);
        }
      };

      const timeout = setTimeout(playAudio, 100);
      return () => {
        clearTimeout(timeout);
        stopAll();
      };
    }
    return () => stopAll();
  }, [text, audioUrl, autoPlay, speakTTS, stopAll, shouldStop, onEnd]);

  const handleToggle = () => {
    if (isSpeaking) {
      stopAll();
    } else {
      speakAll();
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
