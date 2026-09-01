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
import InteractiveActivity from "@/components/accessibility/InteractiveActivity";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { playSFX, triggerHaptic } from "@/lib/sfx";

interface Props {
  lesson: LessonContent;
  tema: Tema;
  mode: Mode;
  isLocked?: boolean;
}

export default function TunagrahitaLayout({ lesson, tema, mode, isLocked = false }: Props) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [stars, setStars] = useState(0);
  const [videoSpeed, setVideoSpeed] = useState(0.75);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const totalSteps = lesson.steps.length;
  const step = lesson.steps[currentStep] || lesson.steps[0];
  const ENABLE_ACTIVITIES = false; // Ubah ke true untuk mengaktifkan game kembali jika diperlukan
  const hasActivity = ENABLE_ACTIVITIES && !!step?.activity;

  const playVideoForStep = (stepIndex: number) => {
    const targetStep = lesson.steps[stepIndex];
    if (targetStep && targetStep.videoClipUrl && videoRef.current) {
      videoRef.current.src = targetStep.videoClipUrl;
      videoRef.current.load();
      videoRef.current.playbackRate = videoSpeed;
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Autoplay was prevented by browser:", err);
          setIsPlaying(false);
        });
    } else {
      setIsPlaying(false);
    }
  };

  // Autoplay video clip on mount or lesson change
  useEffect(() => {
    playVideoForStep(0);
  }, [lesson]);

  // Apply playbackRate once metadata is loaded (safeguard for remounts)
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  };

  // Update playbackRate in real-time when videoSpeed changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    playSFX("click");
    triggerHaptic("click");
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => console.error("Error playing video:", err));
    }
  };

  const goNext = () => {
    if (hasActivity && !showActivity) {
      playSFX("click");
      triggerHaptic("click");
      setShowActivity(true);
      return;
    }

    setShowActivity(false);
    setIsPlaying(false);
    if (currentStep < totalSteps - 1) {
      playSFX("click");
      triggerHaptic("click");
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      playVideoForStep(nextStepIndex);
    } else {
      setIsFinished(true);
      playSFX("finish");
      triggerHaptic("success");

      // Simpan progres bintang ke localStorage secara offline
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
        const prevStars = starsMap[lesson.id] || 0;
        starsMap[lesson.id] = Math.max(prevStars, stars); // Simpan skor bintang tertinggi
        localStorage.setItem("carelife-stars", JSON.stringify(starsMap));
      } catch (err) {
        console.error("Failed to save progress:", err);
      }
    }
  };

  const handleActivityComplete = () => {
    setStars((s) => s + 1);
    goNext();
  };

  const restart = () => {
    playSFX("click");
    triggerHaptic("click");
    setCurrentStep(0);
    setStars(0);
    setShowActivity(false);
    setIsFinished(false);
    setIsPlaying(false);
    playVideoForStep(0);
  };

  const totalActivities = lesson.steps.filter((s) => s.activity).length;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#F8F9FA]">
        <header className="px-6 pt-8 pb-4">
          <div className="max-w-[600px] mx-auto">
            <Link
              href={`/learn?mode=${mode}${isLocked ? '&locked=true' : ''}`}
              className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-4"
            >
              <ArrowLeft size={18} strokeWidth={3} />
              Kembali
            </Link>
          </div>
        </header>
        <div className="px-6 py-8 max-w-[600px] mx-auto">
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }
            }
            animate={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }
            }
            className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-8 text-center shadow-[4px_4px_0_#1A1A1A]"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? {}
                  : { rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }
              }
              transition={
                prefersReducedMotion ? {} : { repeat: Infinity, duration: 2 }
              }
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

            {ENABLE_ACTIVITIES && (
              <div className="bg-[#FFD700]/30 rounded-[20px] p-5 mb-6 border-2 border-[#1A1A1A]">
                <p className="text-sm font-black text-[#1A1A1A] mb-3">
                  Bintang yang kamu dapat:
                </p>
                <StarProgress current={stars} total={totalActivities} />
              </div>
            )}

            <div className="flex flex-col gap-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={restart}
                className="w-full py-4 bg-white text-[#1A1A1A] rounded-[20px] font-black text-lg border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={22} /> Ulangi Lagi
              </motion.button>
              <Link
                href={`/learn${isLocked ? '?locked=true' : ''}`}
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
            href={`/learn?mode=${mode}${isLocked ? '&locked=true' : ''}`}
            className="inline-flex items-center gap-2 text-sm font-black text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-4"
          >
            <ArrowLeft size={18} strokeWidth={3} />
            Kembali
          </Link>
          <div className="text-center">
            <span className="cl-tag cl-tag-yellow mb-2">
              👁️ Mode Tunagrahita — Visual
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mt-2">
              {lesson.title}
            </h1>
          </div>
        </div>
      </header>

      {ENABLE_ACTIVITIES && (
        <div className="px-6 max-w-[600px] mx-auto mb-4">
          <div className="bg-white rounded-[20px] border-2 border-[#1A1A1A] p-4 shadow-[2px_2px_0_#1A1A1A]">
            <StarProgress current={stars} total={totalActivities} />
          </div>
        </div>
      )}

      <div className="px-6 py-2  max-w-[600px] mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black text-[#1A1A1A]">
            Langkah {currentStep + 1} dari {totalSteps}
          </p>
          <div className="flex-1 mx-4 h-4 bg-[#F8F9FA] rounded-full overflow-hidden border-2 border-[#1A1A1A]">
            <motion.div
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.1 }
                  : { type: "spring", stiffness: 100 }
              }
              className="h-full bg-[#FFD700] rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showActivity ? (
            <motion.div
              key="activity"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              {step.activity && (
                <InteractiveActivity
                  activity={step.activity}
                  onCorrect={handleActivityComplete}
                />
              )}
            </motion.div>
          ) : (
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
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { scale: 0, rotate: -180 }
                  }
                  animate={
                    prefersReducedMotion
                      ? { opacity: 1 }
                      : { scale: 1, rotate: 0 }
                  }
                  transition={
                    prefersReducedMotion
                      ? { duration: 0.1 }
                      : { type: "spring", stiffness: 200 }
                  }
                  className="text-8xl md:text-9xl mb-5"
                >
                  {step.emoji}
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] leading-tight">
                  {step.textSimple}
                </h2>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stable Video Player & Lanjut Button */}
        {!showActivity && (
          <div className="space-y-5">
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
                    onLoadedMetadata={handleVideoLoad}
                  />

                  <button
                    onClick={toggleVideo}
                    className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                      isPlaying
                        ? "bg-transparent"
                        : "bg-black/20 hover:bg-black/30"
                    }`}
                  >
                    <motion.div
                      whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
                      className={`w-20 h-20 md:w-24 md:h-24 bg-[#FFD700] rounded-full flex items-center justify-center border-2 border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A] transition-all duration-300 ${
                        isPlaying
                          ? "opacity-0 scale-75 pointer-events-none"
                          : prefersReducedMotion
                            ? "opacity-100"
                            : "opacity-100 scale-100"
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

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={goNext}
              className="w-full py-6 bg-[#FFD700] text-[#1A1A1A] rounded-[24px] font-black text-xl border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all flex items-center justify-center gap-3"
            >
              {hasActivity ? (
                <>🎮 Main Game!</>
              ) : currentStep === totalSteps - 1 ? (
                <>✅ Selesai!</>
              ) : (
                <>
                  Lanjut <ChevronRight size={28} />
                </>
              )}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
