"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  RotateCcw,
  Home,
  Pause,
  Play,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { LessonContent, Mode, Tema } from "@/lib/content";
import SpeedControl from "@/components/accessibility/SpeedControl";
import StarProgress from "@/components/accessibility/StarProgress";
import MiniQuiz from "@/components/accessibility/MiniQuiz";
import AudioNarrator from "@/components/accessibility/AudioNarrator";
import { playSFX, triggerHaptic } from "@/lib/sfx";

interface Props {
  lesson: LessonContent;
  tema: Tema;
  mode: Mode;
}

export default function TunagrahitaLayout({ lesson, tema }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stars, setStars] = useState(0);
  const [videoSpeed, setVideoSpeed] = useState(0.75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = lesson.steps.length;
  const step = lesson.steps[currentStep];
  const hasQuiz = !!step.quiz;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed, currentStep]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    playSFX("click");
    triggerHaptic("click");
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const goNext = () => {
    if (hasQuiz && !showQuiz) {
      playSFX("click");
      triggerHaptic("click");
      setShowQuiz(true);
      return;
    }

    setShowQuiz(false);
    setIsPlaying(false);
    if (currentStep < totalSteps - 1) {
      playSFX("click");
      triggerHaptic("click");
      setCurrentStep((s) => s + 1);
    } else {
      setIsFinished(true);
      playSFX("finish");
      triggerHaptic("success");

      // Simpan progres bintang ke localStorage secara offline
      try {
        const completed = JSON.parse(localStorage.getItem("carelife-completed") || "[]");
        if (!completed.includes(lesson.id)) {
          completed.push(lesson.id);
          localStorage.setItem("carelife-completed", JSON.stringify(completed));
        }
        
        const starsMap = JSON.parse(localStorage.getItem("carelife-stars") || "{}");
        const prevStars = starsMap[lesson.id] || 0;
        starsMap[lesson.id] = Math.max(prevStars, stars); // Simpan skor bintang tertinggi
        localStorage.setItem("carelife-stars", JSON.stringify(starsMap));
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }
  };

  const handleQuizCorrect = () => {
    setStars((s) => s + 1);
    playSFX("success");
    triggerHaptic("success");
    setTimeout(() => goNext(), 800);
  };

  const restart = () => {
    playSFX("click");
    triggerHaptic("click");
    setCurrentStep(0);
    setStars(0);
    setShowQuiz(false);
    setIsFinished(false);
    setIsPlaying(false);
  };

  const totalQuizzes = lesson.steps.filter((s) => s.quiz).length;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <header className="px-6 pt-8 pb-4">
          <div className="max-w-[600px] mx-auto">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-4"
            >
              <ArrowLeft size={18} strokeWidth={3} />
              Kembali
            </Link>
          </div>
        </header>
        <div className="px-6 py-8 max-w-[600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A]"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-8xl mb-4"
            >
              🏆
            </motion.div>
            <h2 className="text-3xl font-black text-[#1A1A1A] mb-3">
              Kamu Hebat!
            </h2>
            <p className="text-lg font-bold text-[#6B7280] mb-6">
              Semua {totalSteps} langkah sudah selesai!
            </p>

            <div className="bg-[#FFD700]/30 rounded-[20px] p-5 mb-6 border-2 border-[#1A1A1A]">
              <p className="text-sm font-black text-[#1A1A1A] mb-3">
                Bintang yang kamu dapat:
              </p>
              <StarProgress current={stars} total={totalQuizzes} />
            </div>

            <div className="flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="w-full py-4 bg-white text-[#1A1A1A] rounded-[20px] font-black text-lg border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={22} /> Ulangi Lagi
              </motion.button>
              <Link
                href="/learn"
                className="block w-full py-4 bg-[#FFD700] text-[#1A1A1A] rounded-[20px] font-black text-lg text-center border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <Home size={22} /> Tema Lain
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="px-6 pt-8 pb-4">
        <div className="max-w-[600px] mx-auto">
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-4"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            Kembali
          </Link>
          <div className="text-center">
            <span className="cl-tag cl-tag-yellow mb-2">👁️ Mode Tunagrahita — Visual</span>
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mt-2">
              {lesson.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="px-6 max-w-[600px] mx-auto mb-4">
        <div className="bg-white rounded-[20px] border-2 border-[#1A1A1A] p-4 shadow-[2px_2px_0_#1A1A1A]">
          <StarProgress current={stars} total={totalQuizzes} />
        </div>
      </div>

      <div className="px-6 py-2 max-w-[600px] mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-[#1A1A1A]">
            Langkah {currentStep + 1} dari {totalSteps}
          </p>
          <div className="flex-1 mx-4 h-4 bg-[#F8F9FA] rounded-full overflow-hidden border-2 border-[#1A1A1A]">
            <motion.div
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ type: "spring", stiffness: 100 }}
              className="h-full bg-[#FFD700] rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showQuiz ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-5"
            >
              <div className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A]">
                <motion.div
                  key={step.emoji}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-8xl md:text-9xl mb-5"
                >
                  {step.emoji}
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight">
                  {step.textSimple}
                </h2>
              </div>

              {step.videoClipUrl && (
                <div className="bg-white rounded-[28px] border-2 border-[#1A1A1A] p-4 shadow-[2px_2px_0_#1A1A1A]">
                  <div className="relative bg-[#1A2835] rounded-[20px] overflow-hidden aspect-video border-2 border-[#1A1A1A]">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover cursor-pointer"
                      playsInline
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onClick={toggleVideo}
                    >
                      <source src={step.videoClipUrl} type="video/mp4" />
                    </video>

                    <button
                      onClick={toggleVideo}
                      className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                        isPlaying ? "bg-transparent" : "bg-black/20 hover:bg-black/30"
                      }`}
                    >
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className={`w-20 h-20 md:w-24 md:h-24 bg-[#FFD700] rounded-full flex items-center justify-center border-2 border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A] transition-all duration-300 ${
                          isPlaying ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
                        }`}
                      >
                        {isPlaying ? (
                          <Pause size={36} className="text-[#1A1A1A]" />
                        ) : (
                          <Play size={36} className="text-[#1A1A1A] ml-1" />
                        )}
                      </motion.div>
                    </button>
                  </div>

                  <div className="mt-4">
                    <SpeedControl
                      speed={videoSpeed}
                      onSpeedChange={setVideoSpeed}
                    />
                  </div>
                </div>
              )}

              <AudioNarrator text={step.audioNarration} autoPlay shouldStop={isPlaying} />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={goNext}
                className="w-full py-6 bg-[#FFD700] text-[#1A1A1A] rounded-[24px] font-black text-xl border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all flex items-center justify-center gap-3"
              >
                {hasQuiz ? (
                  <>🎮 Kuis Dulu!</>
                ) : currentStep === totalSteps - 1 ? (
                  <>✅ Selesai!</>
                ) : (
                  <>
                    Lanjut <ChevronRight size={28} />
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {step.quiz && (
                <MiniQuiz
                  question={step.quiz.question}
                  options={step.quiz.options}
                  onCorrect={handleQuizCorrect}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
