"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function ChatButton() {
  return (
    <Link
      href="/chat"
      className="fixed bottom-8 right-8 bg-[#66B2B2] hover:bg-[#5AA3A3] text-white rounded-full p-4 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all flex items-center gap-2 group z-40"
      title="Tanya CareLife AI"
    >
      <MessageCircle size={28} />
      <span className="hidden group-hover:inline-block text-sm font-bold whitespace-nowrap">
        Tanya AI
      </span>
    </Link>
  );
}
