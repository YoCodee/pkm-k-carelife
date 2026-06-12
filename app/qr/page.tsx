"use client";

import { QRCodeCanvas } from "qrcode.react";
import { TEMA_LIST } from "@/lib/content";
import { useEffect, useState } from "react";
import { Copy, Download, Check } from "lucide-react";

export default function DummyQRPage() {
  const [baseUrl, setBaseUrl] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Prioritaskan URL Vercel/Produksi agar saat diunduh selalu mengarah ke web asli
    const targetUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin || "https://pkm-k-carelife.vercel.app";
    setBaseUrl(targetUrl);
  }, []);

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleDownload = (id: string, label: string) => {
    const canvas = document.getElementById(`qr-${id}`) as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `QR_CareLife_${label.replace(/\s+/g, "_")}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-12 px-6 md:px-10 font-sans relative">
      <div className="max-w-[1000px] mx-auto">
        
        <div className="mb-12 text-center">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#1A1A1A] mb-3">Koleksi <span className="text-[#66B2B2]">QR Code</span> Buku</h1>
          <p className="text-sm font-bold text-[#6B7280] max-w-lg mx-auto">
            Gunakan QR Code dummy ini untuk mensimulasikan proses scan dari buku fisik CareLife.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {TEMA_LIST.map((tema) => {
            const redirectUrl = `${baseUrl}/menu?tema=${tema.id}`;
            return (
              <div key={tema.id} className="bg-white rounded-[24px] p-6 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] flex flex-col items-center text-center group hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#1A1A1A] transition-all duration-300">
                <div className="text-4xl mb-3">{tema.emoji}</div>
                <h3 className="font-bold text-[#1A1A1A] text-sm mb-6 h-10 flex items-center justify-center">{tema.label}</h3>
                
                <div className="bg-white p-4 rounded-2xl border-2 border-[#1A1A1A] mb-4 transition-transform group-hover:scale-105">
                  {baseUrl && (
                    <QRCodeCanvas 
                      id={`qr-${tema.id}`}
                      value={redirectUrl} 
                      size={150}
                      level="H"
                      fgColor="#1A1A1A"
                    />
                  )}
                </div>

                <div className="flex gap-2 w-full mt-2">
                  <button 
                    onClick={() => handleCopy(redirectUrl, tema.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#F8F9FA] hover:bg-[#FFD700]/30 text-[#1A1A1A] rounded-xl text-xs font-bold border-2 border-[#1A1A1A] transition-colors"
                  >
                    {copiedId === tema.id ? <Check size={14} className="text-[#66B2B2]" /> : <Copy size={14} />}
                    {copiedId === tema.id ? "Disalin!" : "Copy URL"}
                  </button>
                  <button 
                    onClick={() => handleDownload(tema.id, tema.label)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#66B2B2] hover:bg-[#5AA3A3] text-white rounded-xl text-xs font-bold border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] transition-all"
                  >
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-[24px] p-6 md:p-8 border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] text-center">
           <h3 className="text-xl font-black text-[#1A1A1A] mb-2">Cara Menguji Fitur</h3>
           <ol className="text-sm font-medium text-[#6B7280] text-left list-decimal pl-5 space-y-2 inline-block">
             <li>Buka tab browser baru ke halaman <code>/scan</code>.</li>
             <li>Arahkan kamera ke salah satu QR code di halaman ini (jika menggunakan HP dan laptop) ATAU test dengan dua monitor.</li>
             <li>Sistem akan otomatis mendeteksi dan membawa Anda ke halaman <code>/menu</code> dengan parameter spesifik.</li>
             <li>Pilih buku (misal: Tunanetra), dan Anda akan langsung diarahkan ke materi yang sesuai!</li>
           </ol>
        </div>

      </div>
    </div>
  );
}
