"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { LessonContent, Mode, Tema } from "@/lib/content";
import { playSFX, triggerHaptic } from "@/lib/sfx";

interface Props {
  lesson: LessonContent;
  tema: Tema;
  mode: Mode;
}

/**
 * TUNANETRA LAYOUT — Fully Audio-Driven
 *
 * Design principle: the user CANNOT see the screen.
 * - Page auto-narrates immediately on load (no button press needed)
 * - Entire screen is ONE touch zone
 * - TAP anywhere = go to next step
 * - SWIPE LEFT = go back
 * - DOUBLE TAP = repeat current narration
 * - Visual elements exist only for the caretaker/teacher watching
 */
export default function TunanetraLayout({ lesson, tema, mode }: Props) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = intro
  const [isFinished, setIsFinished] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [gestureHint, setGestureHint] = useState("");
  const [isAudioUnlocked, setIsAudioUnlocked] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const totalSteps = lesson.steps.length;
  const step = currentStep >= 0 && currentStep < totalSteps ? lesson.steps[currentStep] : null;

  // Pointer tracking for gestures
  const pointerStartX = useRef(0);
  const pointerStartY = useRef(0);
  const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ── Core Speech Function ──
  const speak = useCallback((text: string, onDone?: () => void) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance; // Simpan di ref agar tidak di-garbage collect HP
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

    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      utteranceRef.current = null;
      onDone?.();
    };

    speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      utteranceRef.current = null;
      setIsSpeaking(false);
    }
  }, []);

  // ── Navigation ──
  const goNext = useCallback(() => {
    stopSpeaking();
    if (currentStep < totalSteps - 1) {
      playSFX("click");
      triggerHaptic("click");
      setCurrentStep((s) => s + 1);
    } else if (currentStep === totalSteps - 1) {
      setIsFinished(true);
      playSFX("finish");
      triggerHaptic("success");

      // Simpan progres ke localStorage secara offline
      try {
        const completed = JSON.parse(localStorage.getItem("carelife-completed") || "[]");
        if (!completed.includes(lesson.id)) {
          completed.push(lesson.id);
          localStorage.setItem("carelife-completed", JSON.stringify(completed));
        }
        const starsMap = JSON.parse(localStorage.getItem("carelife-stars") || "{}");
        starsMap[lesson.id] = 3; // Mode tunanetra otomatis 3 bintang setelah tamat
        localStorage.setItem("carelife-stars", JSON.stringify(starsMap));
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    } else {
      // Dari intro, lanjut ke langkah 0
      playSFX("click");
      triggerHaptic("click");
      setCurrentStep(0);
    }
  }, [currentStep, totalSteps, stopSpeaking, lesson.id]);

  const goPrev = useCallback(() => {
    stopSpeaking();
    playSFX("back");
    triggerHaptic("back");
    if (isFinished) {
      setIsFinished(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
    }
  }, [currentStep, totalSteps, isFinished, stopSpeaking]);

  const repeatCurrent = useCallback(() => {
    stopSpeaking();
    playSFX("click");
    triggerHaptic("click");
    // Paksa ulang dengan mentrigger perubahan state sementara
    const curr = currentStep;
    const fin = isFinished;
    setCurrentStep(-99);
    setTimeout(() => {
      setIsFinished(fin);
      setCurrentStep(curr);
    }, 100);
  }, [currentStep, isFinished, stopSpeaking]);

  // ── Auto-narrate on step change ──
  useEffect(() => {
    if (currentStep === -99) return; // skip re-trigger intermediate state

    if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);

    speakTimeoutRef.current = setTimeout(() => {
      if (currentStep === -1 && !isFinished) {
        // Hanya putar intro jika audio sudah aktif (di HP, intro akan berbunyi di ketukan pertama)
        if (isAudioUnlocked) {
          const introText = `Selamat datang di materi ${lesson.title}. ${lesson.description}. Ada ${totalSteps} langkah. Ketuk layar untuk mulai. Geser ke kiri untuk kembali. Ketuk dua kali untuk mengulang.`;
          speak(introText);
        }
      } else if (isFinished) {
        const finishText = `Selamat! Kamu sudah selesai belajar ${lesson.title}. Kamu hebat sekali! Ketuk layar untuk kembali ke menu, atau geser kiri untuk mengulang langkah terakhir.`;
        speak(finishText);
      } else if (step) {
        const tactileText = step.tactileGuidance ? ` Panduan meraba buku: ${step.tactileGuidance}.` : "";
        const stepText = `Langkah ${currentStep + 1} dari ${totalSteps}. ${step.audioNarration}.${tactileText} Ketuk layar untuk lanjut.`;
        speak(stepText);
      }
    }, 400);

    return () => {
      if (speakTimeoutRef.current) clearTimeout(speakTimeoutRef.current);
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      stopSpeaking();
    };
  }, [currentStep, isFinished, lesson.title, lesson.description, totalSteps, step, speak, stopSpeaking, isAudioUnlocked]); // added dependencies

  // ── Pointer Gesture Handling ──
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only handle primary button clicks (left click) or touch
    if (e.button !== 0) return;

    // Ignore if clicked on a link or button
    if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) {
      return;
    }

    pointerStartX.current = e.clientX;
    pointerStartY.current = e.clientY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) {
      return;
    }

    // Aktifkan audio pada ketukan pertama di HP
    if (!isAudioUnlocked) {
      setIsAudioUnlocked(true);
      if ("speechSynthesis" in window) {
        speechSynthesis.cancel();
        speechSynthesis.speak(new SpeechSynthesisUtterance(""));
      }
      playSFX("click");
      triggerHaptic("click");
      
      const introText = `Selamat datang di materi ${lesson.title}. ${lesson.description}. Ada ${totalSteps} langkah. Ketuk layar untuk mulai. Geser ke kiri untuk kembali. Ketuk dua kali untuk mengulang.`;
      speak(introText);
      return;
    }

    const deltaX = e.clientX - pointerStartX.current;
    const deltaY = e.clientY - pointerStartY.current;

    const isHorizontalSwipe = Math.abs(deltaX) > 60 && Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe) {
      if (deltaX > 0) {
        // Swipe RIGHT → next
        showGesture("Lanjut ➡️");
        if (isFinished) {
          window.location.href = "/learn";
        } else {
          goNext();
        }
      } else {
        // Swipe LEFT → previous
        showGesture("⬅️ Kembali");
        goPrev();
      }
      return;
    }

    // Tap/Click detection
    if (tapTimeoutRef.current) {
      // DOUBLE TAP/CLICK → repeat
      clearTimeout(tapTimeoutRef.current);
      tapTimeoutRef.current = null;
      showGesture("🔄 Mengulang");
      repeatCurrent();
    } else {
      // SINGLE TAP/CLICK → wait to see if it's a double tap
      tapTimeoutRef.current = setTimeout(() => {
        tapTimeoutRef.current = null;
        if (isFinished) {
          window.location.href = "/learn";
        } else {
          showGesture("Lanjut ➡️");
          goNext();
        }
      }, 300); // 300ms window for double tap
    }
  };

  // ── Keyboard Navigation ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
        case "Enter":
          e.preventDefault();
          if (isFinished) {
            window.location.href = "/learn";
          } else {
            goNext();
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          goPrev();
          break;
        case "r":
        case "R":
          e.preventDefault();
          repeatCurrent();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev, repeatCurrent, isFinished]);

  // Show gesture feedback briefly
  const showGesture = (text: string) => {
    setGestureHint(text);
    if (navigator.vibrate) navigator.vibrate(80);
    setTimeout(() => setGestureHint(""), 1000);
  };

  // ── Waveform bars for visual feedback (for caretaker) ──
  const WaveformBars = () => (
    <div className="flex items-end justify-center gap-1.5 h-16">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          animate={
            isSpeaking
              ? { height: [12, 40 + Math.random() * 24, 12] }
              : { height: 12 }
          }
          transition={{
            repeat: isSpeaking ? Infinity : 0,
            duration: 0.5 + Math.random() * 0.3,
            delay: i * 0.05,
          }}
          className="w-2.5 rounded-full bg-[#66B2B2] border border-[#1A1A1A]"
          style={{ minHeight: 12 }}
        />
      ))}
    </div>
  );

  return (
    <div
      className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] select-none flex flex-col"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      role="application"
      aria-label={`Materi ${lesson.title} mode audio. Ketuk untuk lanjut, geser kiri untuk kembali, ketuk dua kali untuk mengulang.`}
    >
      {/* Gesture feedback overlay */}
      <AnimatePresence>
        {gestureHint && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-[#1A1A1A] rounded-[32px] px-12 py-8 border-4 border-[#1A1A1A] shadow-[4px_4px_0_#FFD700]">
              <p className="text-3xl font-black text-white">{gestureHint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header — visible for caretaker */}
      <header className="px-6 pt-8 pb-4">
        <div className="max-w-[700px] mx-auto">
          <Link
            href={`/learn?mode=${mode}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-4"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            Kembali
          </Link>
          <div className="text-center">
            <span className="cl-tag cl-tag-blue mb-2">🎧 Mode Tunanetra — Suara</span>
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mt-2">{lesson.title}</h1>
          </div>
        </div>
      </header>

      {/* Main content — centered visual card */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 max-w-[700px] mx-auto w-full">
        <AnimatePresence mode="wait">

          {/* ── INTRO ── */}
          {currentStep === -1 && !isFinished && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A] space-y-6 max-w-[480px] w-full"
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="text-8xl"
              >
                🎧
              </motion.div>

              <div>
                <span className="cl-tag cl-tag-blue mb-2">Dunia Suara</span>
                <h2 className="text-2xl font-black text-[#1A1A1A] mt-2">{lesson.title}</h2>
                <p className="text-[#6B7280] text-sm font-bold mt-1">
                  {totalSteps} langkah pembelajaran
                </p>
              </div>

              {!isAudioUnlocked ? (
                <div className="bg-[#FFD700] border-2 border-[#1A1A1A] rounded-[20px] p-4 text-[#1A1A1A] font-black text-sm animate-pulse cursor-pointer shadow-[2px_2px_0_#1A1A1A]">
                  🔊 KETUK LAYAR UNTUK MENGAKTIFKAN SUARA
                </div>
              ) : (
                <WaveformBars />
              )}

              <div className="space-y-3 pt-2">
                <div className="bg-[#F8F9FA] rounded-[20px] px-6 py-3 border-2 border-[#1A1A1A]">
                  <p className="text-sm font-black text-[#1A1A1A]">
                    👆 Ketuk layar = Lanjut
                  </p>
                </div>
                <div className="bg-[#F8F9FA] rounded-[20px] px-6 py-3 border-2 border-[#1A1A1A]">
                  <p className="text-sm font-black text-[#1A1A1A]">
                    👆👆 Ketuk 2x = Ulangi
                  </p>
                </div>
                <div className="bg-[#F8F9FA] rounded-[20px] px-6 py-3 border-2 border-[#1A1A1A]">
                  <p className="text-sm font-black text-[#1A1A1A]">
                    👈 Geser kiri = Kembali
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP ── */}
          {step && !isFinished && currentStep >= 0 && (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A] space-y-6 max-w-[480px] w-full"
            >
              {/* Step dots */}
              <div className="flex items-center justify-center gap-2">
                {lesson.steps.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: i === currentStep ? 32 : 10,
                      backgroundColor: i === currentStep
                        ? "#FFD700"
                        : i < currentStep
                          ? "#66B2B2"
                          : "#FFFFFF",
                    }}
                    className="h-2.5 rounded-full border border-[#1A1A1A]"
                  />
                ))}
              </div>

              <p className="text-[#6B7280] text-sm font-bold">
                Langkah {currentStep + 1} dari {totalSteps}
              </p>

              {/* Big emoji */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="text-9xl"
              >
                {step.emoji}
              </motion.div>

              {/* Text */}
              <div>
                <h2 className="text-2xl font-black text-[#1A1A1A]">{step.textSimple}</h2>
                <p className="text-sm text-[#6B7280] font-bold mt-2 leading-relaxed">
                  {step.textCaption}
                </p>
              </div>

              {step.tactileGuidance && (
                <div className="bg-[#E6F3F3] border-2 border-[#66B2B2] rounded-[20px] p-4 text-[#1A1A1A] text-left">
                  <p className="text-xs font-black uppercase text-[#66B2B2] tracking-wider mb-1 flex items-center gap-1.5">
                    <span>📖</span> Panduan Raba Buku Fisik:
                  </p>
                  <p className="text-sm font-bold leading-relaxed text-[#2C5252]">
                    {step.tactileGuidance}
                  </p>
                </div>
              )}

              {/* Waveform */}
              <WaveformBars />

              {/* Subtle hint */}
              <p className="text-xs text-[#9CA3AF] font-bold">
                Ketuk layar untuk lanjut · Ketuk 2x untuk ulangi
              </p>
            </motion.div>
          )}

          {/* ── FINISHED ── */}
          {isFinished && (
            <motion.div
              key="finish"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A] space-y-6 max-w-[480px] w-full"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-9xl"
              >
                🎉
              </motion.div>

              <div>
                <h2 className="text-3xl font-black text-[#1A1A1A]">Selamat!</h2>
                <p className="text-[#6B7280] text-sm font-bold mt-2">
                  Semua {totalSteps} langkah selesai!
                </p>
              </div>

              <WaveformBars />

              <div className="flex flex-col gap-3 pt-2">
                <Link
                  href="/learn"
                  className="block w-full py-4 bg-[#66B2B2] text-white rounded-[20px] font-black text-base text-center border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all"
                >
                  📚 Pilih Tema Lain
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
