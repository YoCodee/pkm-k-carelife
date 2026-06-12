"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, QrCode, ScanLine } from "lucide-react";
import Link from "next/link";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const router = useRouter();

  const handleScan = (result: any) => {
    if (!result) return;
    
    const decodedText = Array.isArray(result) ? result[0].rawValue : result.text || result;
    if (!decodedText || scanResult) return;

    setScanResult(decodedText);
    
    try {
      const url = new URL(decodedText);
      if (url.origin === window.location.origin) {
        setTimeout(() => router.push(url.pathname + url.search), 800);
      } else {
        setTimeout(() => { window.location.href = decodedText; }, 800);
      }
    } catch {
      if (decodedText.startsWith("/")) {
        setTimeout(() => router.push(decodedText), 800);
      } else {
        alert("QR Code tidak valid: " + decodedText);
        setScanResult(null); 
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A] flex flex-col font-sans z-[100] overflow-hidden">
      
      {/* Top Navigation Overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 pt-10 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <Link
          href="/menu"
          className="w-12 h-12 bg-[#FFB6B6] rounded-full flex items-center justify-center text-[#1A1A1A] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all"
        >
          <ArrowLeft size={24} />
        </Link>
        <div className="text-white font-bold tracking-wider text-sm flex items-center gap-2 bg-[#66B2B2] px-4 py-2 rounded-full border-2 border-white/20">
          <ScanLine size={18} />
          SCAN BUKU
        </div>
        <div className="w-12"></div>
      </div>

      {/* Main Scanner Area */}
      <div className="flex-1 w-full h-full relative flex items-center justify-center bg-[#111]">
        
        <div className="absolute inset-0 w-full h-full">
          <Scanner 
            onScan={handleScan}
            components={{
              onOff: false,
              finder: false, 
            }}
            styles={{
               container: { width: "100%", height: "100%", paddingTop: 0 },
               video: { objectFit: "cover", width: "100%", height: "100%" }
            }}
          />
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
          <div className="flex-1 bg-black/60 backdrop-blur-[2px]"></div>
          <div className="flex h-[280px]">
            <div className="flex-1 bg-black/60 backdrop-blur-[2px]"></div>
            <div className="w-[280px] relative border-2 border-[#FFD700] rounded-[32px] overflow-hidden">
               
               <div className="absolute top-[-2px] left-[-2px] w-12 h-12 border-t-4 border-l-4 border-[#66B2B2] rounded-tl-[32px]"></div>
               <div className="absolute top-[-2px] right-[-2px] w-12 h-12 border-t-4 border-r-4 border-[#66B2B2] rounded-tr-[32px]"></div>
               <div className="absolute bottom-[-2px] left-[-2px] w-12 h-12 border-b-4 border-l-4 border-[#66B2B2] rounded-bl-[32px]"></div>
               <div className="absolute bottom-[-2px] right-[-2px] w-12 h-12 border-b-4 border-r-4 border-[#66B2B2] rounded-br-[32px]"></div>

               <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFD700] shadow-[0_0_20px_4px_rgba(255,215,0,0.6)] animate-scan-laser"></div>
            </div>
            <div className="flex-1 bg-black/60 backdrop-blur-[2px]"></div>
          </div>
          <div className="flex-1 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-start pt-10">
            <p className="text-[#1A1A1A] font-bold text-sm text-center bg-[#FFD700] py-3 px-6 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              Arahkan kamera ke QR Code di buku CareLife
            </p>
          </div>
        </div>

        {scanResult && (
          <div className="absolute inset-0 z-50 bg-[#66B2B2]/90 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-300 pointer-events-auto">
             <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center mb-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] animate-bounce">
                <QrCode size={48} className="text-[#1A1A1A]" />
             </div>
             <h2 className="text-3xl font-black text-white mb-2 tracking-tight">QR Terdeteksi!</h2>
             <p className="text-white/80 font-medium">Membuka materi buku...</p>
          </div>
        )}

      </div>
    </div>
  );
}
