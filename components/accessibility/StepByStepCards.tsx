"use client";

import { motion } from "framer-motion";
import type { LessonStep } from "@/lib/content";

interface StepByStepCardsProps {
  steps: LessonStep[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export default function StepByStepCards({ steps, currentStep, onStepClick }: StepByStepCardsProps) {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">📸</span>
        <h3 className="text-base font-black text-[#1A1A1A]">Langkah-Langkah</h3>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide">
        {steps.map((step, i) => {
          const isActive = i === currentStep;
          const isDone = i < currentStep;

          return (
            <motion.button
              key={step.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onStepClick(i)}
              className={`
                snap-center flex-shrink-0 w-[110px] md:w-[130px] rounded-[20px] p-4 
                flex flex-col items-center text-center transition-all duration-300
                border-2
                ${isActive
                  ? "bg-[#FFD700] border-[#1A1A1A] shadow-[3px_3px_0_#1A1A1A]"
                  : isDone
                    ? "bg-[#A8E6CF] border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]"
                    : "bg-white border-[#1A1A1A]/30 opacity-60"
                }
              `}
            >
              <div
                className={`
                  w-7 h-7 rounded-full flex items-center justify-center text-xs font-black mb-2 border-2
                  ${isActive
                    ? "bg-[#66B2B2] text-white border-[#1A1A1A]"
                    : isDone
                      ? "bg-[#66B2B2] text-white border-[#1A1A1A]"
                      : "bg-[#F8F9FA] text-[#6B7280] border-[#1A1A1A]/20"
                  }
                `}
              >
                {isDone ? "✓" : step.order}
              </div>

              <span className="text-3xl mb-2">{step.emoji}</span>

              <p className={`
                text-[11px] font-bold leading-tight
                ${isActive ? "text-[#1A1A1A]" : isDone ? "text-[#1A1A1A]" : "text-[#6B7280]"}
              `}>
                {step.textSimple}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
