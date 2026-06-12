"use client";

import { motion } from "framer-motion";

interface StarProgressProps {
  current: number;
  total: number;
}

export default function StarProgress({ current, total }: StarProgressProps) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          initial={i < current ? { scale: 0, rotate: -180 } : { scale: 1 }}
          animate={i < current ? { scale: 1, rotate: 0 } : { scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
          className="text-2xl md:text-3xl"
        >
          {i < current ? "⭐" : "☆"}
        </motion.span>
      ))}
      <span className="ml-2 text-sm font-black text-[#6B7280]">
        {current}/{total}
      </span>
    </div>
  );
}
