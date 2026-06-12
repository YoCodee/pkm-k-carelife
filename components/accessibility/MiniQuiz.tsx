"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MiniQuizProps {
  question: string;
  options: { emoji: string; label: string; isCorrect: boolean }[];
  onCorrect: () => void;
}

export default function MiniQuiz({ question, options, onCorrect }: MiniQuizProps) {
  const [wrongIndex, setWrongIndex] = useState<number | null>(null);

  const handleOptionClick = (isCorrect: boolean, index: number) => {
    if (isCorrect) {
      onCorrect();
    } else {
      setWrongIndex(index);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
      setTimeout(() => setWrongIndex(null), 800);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border-2 border-[#1A1A1A] p-6 md:p-8 shadow-[4px_4px_0_#1A1A1A]">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-4xl">🎮</span>
        <h3 className="text-2xl font-black text-[#1A1A1A]">Kuis Seru!</h3>
      </div>
      
      <p className="text-xl md:text-2xl font-black text-[#1A1A1A] text-center mb-8 leading-tight">
        {question}
      </p>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={wrongIndex === i ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            onClick={() => handleOptionClick(opt.isCorrect, i)}
            className={`
              flex flex-col items-center justify-center gap-4 p-6 rounded-[24px] border-2
              ${wrongIndex === i 
                ? "bg-red-50 border-red-400 shadow-[2px_2px_0_#EF4444]" 
                : "bg-[#F8F9FA] hover:bg-[#FFD700]/30 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A]"
              }
              transition-all
            `}
          >
            <span className="text-6xl md:text-7xl">{opt.emoji}</span>
            <span className={`
              text-lg font-black 
              ${wrongIndex === i ? "text-red-600" : "text-[#1A1A1A]"}
            `}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
