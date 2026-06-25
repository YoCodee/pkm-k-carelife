"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSFX, triggerHaptic } from "@/lib/sfx";
import AudioNarrator from "@/components/accessibility/AudioNarrator";
import type { ActivityContent } from "@/lib/content";

interface InteractiveActivityProps {
  activity: ActivityContent;
  onCorrect: () => void;
}

export default function InteractiveActivity({ activity, onCorrect }: InteractiveActivityProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Play success sound and trigger completion
  const handleSuccess = () => {
    setIsCompleted(true);
    playSFX("success");
    triggerHaptic("success");
    // Beri sedikit jeda agar anak melihat animasi sukses sebelum lanjut ke langkah berikutnya
    setTimeout(() => {
      onCorrect();
      setIsCompleted(false);
    }, 1500);
  };

  return (
    <div 
      ref={containerRef}
      className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-6 md:p-8 shadow-[4px_4px_0_#1A1A1A] relative overflow-hidden select-none"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-4xl animate-bounce">🎮</span>
        <h3 className="text-2xl font-black text-[#1A1A1A]">Main Game Yuk!</h3>
      </div>

      <p className="text-xl md:text-2xl font-black text-[#1A1A1A] text-center mb-6 leading-tight">
        {activity.question}
      </p>

      {/* RENDER SESUAI TYPE AKTIVITAS */}
      <div className="min-h-[240px] flex items-center justify-center mb-6">
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.div
              key="success-overlay"
              initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 text-center"
            >
              <span className="text-8xl">🎉</span>
              <h4 className="text-3xl font-black text-[#55A630]">HEBAT!</h4>
              <p className="text-lg font-bold text-[#6B7280]">Kamu Pintar Sekali!</p>
            </motion.div>
          ) : (
            <motion.div
              key={activity.type}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full flex justify-center"
            >
              {activity.type === "scrub" && (
                <ScrubActivity activity={activity} onComplete={handleSuccess} parentRef={containerRef} />
              )}
              {activity.type === "tap_correct" && (
                <TapCorrectActivity activity={activity} onComplete={handleSuccess} />
              )}
              {activity.type === "drag_match" && (
                <DragMatchActivity activity={activity} onComplete={handleSuccess} parentRef={containerRef} />
              )}
              {activity.type === "catch_stars" && (
                <CatchStarsActivity activity={activity} onComplete={handleSuccess} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {activity.audioPrompt && !isCompleted && (
        <div className="mt-4">
          <AudioNarrator text={activity.audioPrompt} autoPlay />
        </div>
      )}
    </div>
  );
}

/* ==========================================================================
   1. SCRUB ACTIVITY (Gosok kuman/busa di layar)
   ========================================================================== */
interface ScrubItem {
  id: number;
  x: number; // persentase
  y: number; // persentase
  cleaned: boolean;
  scale: number;
}

function ScrubActivity({ activity, onComplete, parentRef }: { 
  activity: ActivityContent; 
  onComplete: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [items, setItems] = useState<ScrubItem[]>([]);
  const areaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate 8 kotoran/kuman acak pada layout
    const newItems: ScrubItem[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 15 + Math.random() * 70, // Hindari pinggir area
      y: 15 + Math.random() * 65,
      cleaned: false,
      scale: 0.8 + Math.random() * 0.4
    }));
    setItems(newItems);
  }, [activity]);

  // Synthesize sound pop untuk sensasi memuaskan
  const playPopSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {
      console.error("Pop Sound Error", e);
    }
  };

  const handlePointerClear = (id: number) => {
    setItems((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id && !item.cleaned) {
          playPopSound();
          triggerHaptic("click");
          return { ...item, cleaned: true };
        }
        return item;
      });

      // Periksa apakah semua kuman sudah bersih
      if (updated.every((item) => item.cleaned)) {
        setTimeout(onComplete, 300);
      }
      return updated;
    });
  };

  // Mendeteksi sapuan mouse atau jari (dragging)
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!areaRef.current) return;
    
    // Untuk touch/mouse, cari kuman yang dekat dengan koordinat
    const clientX = e.clientX;
    const clientY = e.clientY;

    items.forEach((item) => {
      if (item.cleaned) return;
      const element = document.getElementById(`scrub-item-${item.id}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const padding = 25; // Rentang deteksi sapuan jari
        if (
          clientX >= rect.left - padding &&
          clientX <= rect.right + padding &&
          clientY >= rect.top - padding &&
          clientY <= rect.bottom + padding
        ) {
          handlePointerClear(item.id);
        }
      }
    });
  };

  const remaining = items.filter((i) => !i.cleaned).length;

  return (
    <div className="w-full flex flex-col items-center">
      <div 
        ref={areaRef}
        onPointerMove={handlePointerMove}
        className="w-full max-w-[320px] aspect-square bg-[#E0F2F1] rounded-[24px] border-4 border-dashed border-[#1A1A1A] relative flex items-center justify-center cursor-pointer overflow-hidden touch-none"
      >
        {/* Background Tangan/Elemen Utama */}
        <span className="text-9xl opacity-80 pointer-events-none select-none">
          {activity.backgroundEmoji || "🤲"}
        </span>

        {/* Kotoran/Kuman yang menempel */}
        {items.map((item) => (
          <motion.div
            id={`scrub-item-${item.id}`}
            key={item.id}
            onPointerOver={() => handlePointerClear(item.id)}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(-50%, -50%) scale(${item.scale})`,
            }}
            animate={item.cleaned ? { scale: 0, opacity: 0 } : { scale: item.scale }}
            className="text-5xl pointer-events-auto select-none p-2"
          >
            {activity.targetEmoji || "🦠"}
          </motion.div>
        ))}
      </div>

      <p className="text-sm font-black text-[#6B7280] mt-3">
        {remaining > 0 ? `Sisa kuman: ${remaining} 🦠` : "Bersih sekali! ✨"}
      </p>
    </div>
  );
}

/* ==========================================================================
   2. TAP CORRECT ACTIVITY (Errorless Learning - Ketuk Pilihan Benar)
   ========================================================================== */
function TapCorrectActivity({ activity, onComplete }: { 
  activity: ActivityContent; 
  onComplete: () => void;
}) {
  const [wrongIndexes, setWrongIndexes] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const correctOption = activity.options?.find((o) => o.isCorrect);

  const handleOptionClick = (isCorrect: boolean, idx: number) => {
    if (isCorrect) {
      onComplete();
    } else {
      // Errorless learning: tidak menghukum anak dengan getar/shake salah.
      // Cukup nonaktifkan pilihan salah tersebut, berikan petunjuk berdenyut pada pilihan benar.
      setWrongIndexes((prev) => [...prev, idx]);
      setShowHint(true);
      playSFX("click");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="grid grid-cols-2 gap-4 w-full max-w-[440px]">
        {activity.options?.map((opt, i) => {
          const isWrong = wrongIndexes.includes(i);
          const shouldPulse = showHint && opt.isCorrect;

          return (
            <motion.button
              key={i}
              whileHover={isWrong ? {} : { scale: 1.05 }}
              whileTap={isWrong ? {} : { scale: 0.95 }}
              disabled={isWrong}
              onClick={() => handleOptionClick(opt.isCorrect, i)}
              animate={shouldPulse ? { scale: [1, 1.08, 1] } : {}}
              transition={shouldPulse ? { repeat: Infinity, duration: 1 } : {}}
              className={`
                flex flex-col items-center justify-center gap-3 p-6 rounded-[24px] border-2 text-center transition-all duration-300
                ${isWrong 
                  ? "opacity-30 bg-gray-100 border-gray-300 pointer-events-none cursor-default" 
                  : shouldPulse
                    ? "bg-[#FFF9C4] border-[#FFD700] ring-4 ring-[#FFD700]/30 shadow-[3px_3px_0_#FFD700]"
                    : "bg-[#F8F9FA] hover:bg-[#FFD700]/20 border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A] active:translate-y-[2px]"
                }
              `}
            >
              <span className="text-7xl">{opt.emoji}</span>
              <span className="text-lg font-black text-[#1A1A1A]">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
      
      {showHint && correctOption && (
        <p className="text-md font-bold text-[#FF6B35] animate-pulse">
          👉 Yuk ketuk {correctOption.label}!
        </p>
      )}
    </div>
  );
}

/* ==========================================================================
   3. DRAG MATCH ACTIVITY (Tarik & Cocokkan ke Target)
   ========================================================================== */
function DragMatchActivity({ activity, onComplete, parentRef }: { 
  activity: ActivityContent; 
  onComplete: () => void;
  parentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [resetKey, setResetKey] = useState(0);
  const [isNear, setIsNear] = useState(false);
  const dragItemRef = useRef<HTMLDivElement>(null);
  const targetItemRef = useRef<HTMLDivElement>(null);

  const handleDrag = () => {
    if (!dragItemRef.current || !targetItemRef.current) return;
    
    // Periksa jarak real-time antara barang seret & target
    const dragRect = dragItemRef.current.getBoundingClientRect();
    const targetRect = targetItemRef.current.getBoundingClientRect();

    const dragCenter = {
      x: dragRect.left + dragRect.width / 2,
      y: dragRect.top + dragRect.height / 2
    };
    const targetCenter = {
      x: targetRect.left + targetRect.width / 2,
      y: targetRect.top + targetRect.height / 2
    };

    const distance = Math.hypot(dragCenter.x - targetCenter.x, dragCenter.y - targetCenter.y);
    setIsNear(distance < 90); // true jika dekat dengan target
  };

  const handleDragEnd = () => {
    if (isNear) {
      onComplete();
    } else {
      // Jika dilepas di luar target, reset posisinya kembali ke awal secara otomatis
      setResetKey((k) => k + 1);
      playSFX("click");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      <div className="flex justify-between items-center gap-8 w-full max-w-[400px] relative px-4">
        {/* Item yang ditarik */}
        <div className="flex flex-col items-center">
          <motion.div
            key={resetKey}
            ref={dragItemRef}
            drag
            dragConstraints={parentRef}
            dragElastic={0.1}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.15, zIndex: 50 }}
            className="w-24 h-24 bg-[#FFF9C4] border-2 border-[#1A1A1A] rounded-[24px] flex items-center justify-center text-5xl shadow-[3px_3px_0_#1A1A1A] cursor-grab active:cursor-grabbing z-10 touch-none"
          >
            {activity.dragItem?.emoji}
          </motion.div>
          <span className="text-sm font-black text-[#1A1A1A] mt-2">{activity.dragItem?.label}</span>
        </div>

        {/* Panah Indikator Seret */}
        <div className="flex-1 flex flex-col items-center justify-center opacity-40 pointer-events-none select-none">
          <span className="text-3xl animate-pulse">👉</span>
          <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-wider">Geser</span>
        </div>

        {/* Tempat Target */}
        <div className="flex flex-col items-center">
          <div 
            ref={targetItemRef}
            className={`
              w-24 h-24 rounded-[24px] border-4 border-dashed flex items-center justify-center text-5xl transition-all duration-300
              ${isNear 
                ? "bg-[#A8E6CF]/50 border-[#55A630] scale-110" 
                : "bg-gray-50 border-gray-400"
              }
            `}
          >
            {activity.targetItem?.emoji}
          </div>
          <span className="text-sm font-black text-[#1A1A1A] mt-2">{activity.targetItem?.label}</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   4. CATCH STARS ACTIVITY (Tangkap Bintang Berterbangan)
   ========================================================================== */
interface StarItem {
  id: number;
  x: number; // persentase
  y: number; // persentase
  tapped: boolean;
  delay: number;
}

function CatchStarsActivity({ activity, onComplete }: { 
  activity: ActivityContent; 
  onComplete: () => void;
}) {
  const [stars, setStars] = useState<StarItem[]>([]);

  useEffect(() => {
    const count = activity.starCount || 3;
    const newStars: StarItem[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 10 + (i * 80) / (count - 1 || 1) + (Math.random() - 0.5) * 10, // sebar secara horizontal
      y: 20 + Math.random() * 50,
      tapped: false,
      delay: i * 0.2
    }));
    setStars(newStars);
  }, [activity]);

  // Synthesize sound cling untuk bintang
  const playClimeSound = () => {
    if (typeof window === "undefined") return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.1); // A6

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStarTap = (id: number) => {
    setStars((prev) => {
      const updated = prev.map((s) => {
        if (s.id === id && !s.tapped) {
          playClimeSound();
          triggerHaptic("click");
          return { ...s, tapped: true };
        }
        return s;
      });

      if (updated.every((s) => s.tapped)) {
        setTimeout(onComplete, 400);
      }
      return updated;
    });
  };

  return (
    <div className="w-full max-w-[320px] aspect-video bg-gradient-to-b from-[#111827] to-[#1F2937] rounded-[24px] border-4 border-[#1A1A1A] relative overflow-hidden">
      {stars.map((star) => (
        <motion.button
          key={star.id}
          onClick={() => handleStarTap(star.id)}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          animate={
            star.tapped 
              ? { scale: 0, rotate: 360, opacity: 0 } 
              : { y: [0, -10, 0], rotate: [0, 5, -5, 0] }
          }
          transition={
            star.tapped 
              ? { duration: 0.3 } 
              : { repeat: Infinity, duration: 2 + star.id, ease: "easeInOut" }
          }
          className="text-5xl focus:outline-none pointer-events-auto touch-none"
        >
          ⭐
        </motion.button>
      ))}
    </div>
  );
}
