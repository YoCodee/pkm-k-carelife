"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { LessonContent, Mode, Tema } from "@/lib/content";
import JBIOverlay from "@/components/accessibility/JBIOverlay";
import StepByStepCards from "@/components/accessibility/StepByStepCards";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { playSFX, triggerHaptic } from "@/lib/sfx";

interface Props {
  lesson: LessonContent;
  tema: Tema;
  mode: Mode;
}

export default function TunarunguLayout({ lesson, tema, mode }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = lesson.steps.length;
  const step = lesson.steps[currentStep] || lesson.steps[0];

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      playSFX("click");
      triggerHaptic("click");
      setCurrentStep((s) => s + 1);
    } else {
      setIsFinished(true);
      playSFX("finish");
      triggerHaptic("success");

      // Simpan progres ke localStorage secara offline
      try {
        const completed = JSON.parse(
          localStorage.getItem("carelife-completed") || "[]",
        );
        if (!completed.includes(lesson.id)) {
          completed.push(lesson.id);
          localStorage.setItem("carelife-completed", JSON.stringify(completed));
        }

        const starsMap = JSON.parse(
          localStorage.getItem("carelife-stars") || "{}",
        );
        starsMap[lesson.id] = 3; // Tunarungu default 3 bintang setelah tamat
        localStorage.setItem("carelife-stars", JSON.stringify(starsMap));
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }
  };

  const goPrev = () => {
    if (currentStep > 0) {
      playSFX("back");
      triggerHaptic("back");
      setCurrentStep((s) => s - 1);
    }
  };

  const restart = () => {
    playSFX("click");
    triggerHaptic("click");
    setCurrentStep(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] overflow-x-hidden w-full">
        <header className="px-6 pt-8 pb-4">
          <div className="max-w-[700px] mx-auto">
            <Link
              href={`/learn?mode=${mode}`}
              className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-4"
            >
              <ArrowLeft size={18} strokeWidth={3} />
              Kembali
            </Link>
          </div>
        </header>
        <div className="px-6 py-8 max-w-[700px] mx-auto">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A]"
          >
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
              transition={prefersReducedMotion ? {} : { repeat: Infinity, duration: 1.5 }}
              className="text-8xl mb-4"
            >
              🎉
            </motion.div>
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-2">
              Hebat Sekali!
            </h2>
            <p className="text-base font-bold text-[#6B7280] mb-6">
              Kamu sudah menyelesaikan semua {totalSteps} langkah materi{" "}
              {lesson.title}! 🤟
            </p>

            <div className="flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="w-full py-4 bg-white text-[#1A1A1A] rounded-[20px] font-black text-base border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all"
              >
                🔄 Ulangi dari Awal
              </motion.button>
              <Link
                href={`/learn?mode=${mode}`}
                className="block w-full py-4 bg-[#66B2B2] text-white rounded-[20px] font-black text-base text-center border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all"
              >
                📚 Pilih Tema Lain
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] overflow-x-hidden w-full">
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
            <span className="cl-tag cl-tag-pink mb-2">
              🤟 Mode Tunarungu — Visual
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mt-2">
              {lesson.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="px-6 py-4 max-w-[700px] mx-auto space-y-5">
        <div className="flex items-center justify-center gap-2">
          {lesson.steps.map((_, i) => (
            <div
              key={i}
              className={`h-3 rounded-full transition-all duration-300 border-2 border-[#1A1A1A] ${
                i === currentStep
                  ? "w-8 bg-[#FFD700]"
                  : i < currentStep
                    ? "w-3 bg-[#66B2B2]"
                    : "w-3 bg-[#F8F9FA]"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${currentStep}`}
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -30 }}
            className="space-y-5 w-full"
          >
            <div className="relative bg-[#1A2835] rounded-[28px] overflow-hidden aspect-video border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A]">
              {step.videoClipUrl && (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={step.videoClipUrl} type="video/mp4" />
                </video>
              )}

              <div className="absolute top-4 left-4 bg-[#FFB6B6] rounded-full p-2 flex items-center gap-2 border-2 border-[#1A1A1A]">
                <VolumeX size={16} className="text-[#1A1A1A]" />
                <span className="text-[10px] font-bold text-[#1A1A1A] pr-1">
                  Tanpa Suara
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-10">
                <motion.p
                  key={step.textCaption}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  className="text-white text-lg md:text-xl font-black text-center leading-relaxed"
                >
                  {step.textCaption}
                </motion.p>
              </div>

              <JBIOverlay caption={step.textCaption} jbiVideoUrl={step.jbiVideoUrl} primaryVideoRef={videoRef} />
            </div>

            <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-6 text-center shadow-[4px_4px_0_#1A1A1A]">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="w-10 h-10 bg-[#FFB6B6] rounded-full flex items-center justify-center text-[#1A1A1A] font-black text-sm border-2 border-[#1A1A1A]">
                  {step.order}
                </div>
                <span className="text-5xl">{step.emoji}</span>
              </div>
              <h2 className="text-xl font-black text-[#1A1A1A] mb-1">
                {step.textSimple}
              </h2>
              <p className="text-sm font-bold text-[#6B7280]">
                {step.textCaption}
              </p>
            </div>

            <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-5 shadow-[2px_2px_0_#1A1A1A]">
              <StepByStepCards
                steps={lesson.steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={goPrev}
            disabled={currentStep === 0}
            className="py-4 bg-white border-2 border-[#1A1A1A] rounded-[20px] font-black text-base text-[#1A1A1A] disabled:opacity-30 disabled:cursor-not-allowed shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={22} /> Sebelumnya
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={goNext}
            className="py-4 bg-[#66B2B2] text-white rounded-[20px] font-black text-base border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all flex items-center justify-center gap-2"
          >
            {currentStep === totalSteps - 1 ? "Selesai ✓" : "Lanjut"}{" "}
            {currentStep < totalSteps - 1 && <ChevronRight size={22} />}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
