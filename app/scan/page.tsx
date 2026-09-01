"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ScanPage() {
  return (
    <div className="min-h-screen py-12 px-6 bg-[#F8F9FA] flex flex-col items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 text-center shadow-[4px_4px_0_#1A1A1A]">
        <div className="text-6xl mb-4">🔒</div>
        <h1 className="text-2xl font-black text-[#1A1A1A] mb-2">Fitur Dinonaktifkan</h1>
        <p className="text-sm font-bold text-[#6B7280] mb-6">
          Fitur Scan QR Code saat ini sedang dinonaktifkan sementara.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#FFD700] text-[#1A1A1A] px-6 py-3 rounded-[16px] font-black text-sm border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
