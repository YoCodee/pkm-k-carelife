"use client";

import Link from "next/link";
import {
  ShoppingCart,
  Truck,
  Shield,
  Book,
  Type,
  Ear,
  Smartphone,
  MessageCircle,
  BarChart3,
  HelpCircle,
  ArrowLeft,
  Sparkles,
  Check,
  Tag,
  Package,
} from "lucide-react";

const BOOKS = [
  {
    id: "tunarunggu",
    title: "Buku Bahasa Isyarat",
    subtitle: "Tunarunggu",
    desc: "Panduan visual kaya ilustrasi bahasa isyarat untuk komunikasi inklusif sehari-hari.",
    price: "59.900",
    icon: Ear,
    color: "#FFB6B6",
    textColor: "#1A1A1A",
    tag: "Komunikasi Visual",
    features: [
      "Panduan SIBI & BISINDO",
      "100+ ilustrasi isyarat",
      "Latihan interaktif via QR",
    ],
  },
  {
    id: "tunagrahita",
    title: "Buku Visual Bergambar",
    subtitle: "Tunagrahita",
    desc: "Modul bergambar penuh warna untuk stimulasi kognitif dan pembelajaran bertahap.",
    price: "59.900",
    icon: Book,
    color: "#A8E6CF",
    textColor: "#1A1A1A",
    tag: "Kognitif & Motorik",
    features: [
      "Aktivitas step-by-step",
      "Gambar berwarna cerah",
      "Panduan orang tua & guru",
    ],
  },
  {
    id: "tunanetra",
    title: "Buku Braille Digital",
    subtitle: "Tunanetra",
    desc: "Buku premium dual-layer: teks Braille cetak + audio interaktif lewat QR code.",
    price: "199.900",
    icon: Type,
    color: "#66B2B2",
    textColor: "#fff",
    tag: "Premium · Dual Layer",
    features: [
      "Teks Braille tercetak",
      "Audio QR setiap halaman",
      "Kertas taktil premium",
    ],
    isPremium: true,
  },
] as const;

export default function BeliPage() {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-[#F8F9FA] py-12 px-6 md:px-10 lg:px-16 flex justify-center">
      {/* blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A8E6CF] rounded-full blur-[120px] pointer-events-none opacity-40" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFB6B6] rounded-full blur-[100px] pointer-events-none opacity-35" />

      <div className="max-w-[1040px] w-full relative z-10">
        {/* ── Header ── */}
        <div className="text-center mb-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-6"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Kembali
          </Link>
          <h1 className="text-[32px] md:text-[44px] font-black text-[#1A1A1A] mb-3 tracking-tight">
            Pilih <span className="text-[#66B2B2]">CareLife</span> Untuk Kamu
          </h1>
          <p className="text-base md:text-lg font-medium text-[#6B7280] px-4 max-w-2xl mx-auto">
            Tersedia satuan per kebutuhan, atau hemat lebih banyak dengan Bundle
            3-in-1 eksklusif.
          </p>
        </div>

        {/* ── Individual Book Pricing Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {BOOKS.map((book) => {
            const Icon = book.icon;
            return (
              <div
                key={book.id}
                className={`relative bg-white border-2 border-[#1A1A1A] rounded-[28px] p-7 flex flex-col shadow-[4px_4px_0_#1A1A1A] ${
                  book.isPremium ? "ring-2 ring-[#66B2B2] ring-offset-2" : ""
                }`}
              >
                {book.isPremium && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#66B2B2] text-white text-[11px] font-black px-4 py-1.5 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] whitespace-nowrap">
                    <Sparkles size={11} />
                    PREMIUM
                  </div>
                )}

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-[18px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] mb-5"
                  style={{ background: book.color }}
                >
                  <Icon size={24} style={{ color: book.textColor }} />
                </div>

                {/* Tag */}
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-[#6B7280] bg-[#F8F9FA] border border-[#1A1A1A]/10 rounded-full px-3 py-1 mb-3 w-fit">
                  <Tag size={9} />
                  {book.tag}
                </span>

                {/* Title */}
                <h2 className="text-lg font-black text-[#1A1A1A] leading-tight mb-1">
                  {book.title}
                </h2>
                <p className="text-xs font-bold text-[#6B7280] mb-3">
                  untuk {book.subtitle}
                </p>
                <p className="text-sm font-medium text-[#6B7280] leading-relaxed mb-6 flex-1">
                  {book.desc}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-2 mb-6">
                  {book.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1A1A1A] shrink-0"
                        style={{ background: book.color }}
                      >
                        <Check
                          size={11}
                          strokeWidth={3}
                          style={{ color: book.textColor }}
                        />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="border-t-2 border-[#1A1A1A]/10 pt-5 mt-auto">
                  <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-1">
                    Harga
                  </p>
                  <p className="text-3xl font-black text-[#1A1A1A] mb-4">
                    Rp {book.price}
                  </p>
                  <a
                    href={`https://wa.me/62895352977785?text=Halo%20CareLife%2C%20saya%20ingin%20memesan%20Buku%20${book.subtitle}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] hover:bg-[#333] text-white px-5 py-3.5 rounded-[16px] font-bold text-sm border-2 border-[#1A1A1A] shadow-[3px_3px_0_#66B2B2] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#66B2B2] transition-all"
                  >
                    <MessageCircle size={16} />
                    Pesan Sekarang
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bundle Card ── */}
        <div className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-[32px] p-8 md:p-10 shadow-[6px_6px_0_#66B2B2] mb-8 relative overflow-hidden">
          <div className="absolute top-[-30%] right-[-10%] w-64 h-64 bg-[#66B2B2] rounded-full blur-[80px] opacity-20 pointer-events-none" />
          <div className="absolute bottom-[-30%] left-[-5%] w-56 h-56 bg-[#FFB6B6] rounded-full blur-[70px] opacity-15 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center lg:items-end">
            {/* Left info */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#FFD700] w-8 h-8 rounded-full flex items-center justify-center border-2 border-white/20">
                  <Package size={16} className="text-[#1A1A1A]" />
                </div>
                <span className="text-[#FFD700] text-xs font-black uppercase tracking-widest">
                  Bundle Terbaik · Hemat Rp 19.900
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
                CareLife Bundle 3-in-1
              </h2>
              <p className="text-sm font-medium text-white/60 mb-6 max-w-md leading-relaxed">
                Dapatkan ketiga buku sekaligus — Tunarunggu, Tunagrahita, dan
                Tunanetra — dalam satu paket eksklusif dengan harga spesial.
              </p>

              {/* what's inside chips */}
              <div className="flex flex-wrap gap-3">
                {BOOKS.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.id}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: b.color }}
                      >
                        <Icon size={11} color={b.textColor} />
                      </div>
                      <span className="text-xs font-bold text-white/80">
                        {b.subtitle}
                      </span>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#FFD700]">
                    <Smartphone size={11} color="#1A1A1A" />
                  </div>
                  <span className="text-xs font-bold text-white/80">
                    Akses Digital
                  </span>
                </div>
              </div>
            </div>

            {/* Right price + CTA */}
            <div className="w-full lg:w-auto shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-sm text-center lg:text-right mb-5">
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">
                  Normal Rp 319.700
                </p>
                <p className="text-4xl md:text-5xl font-black text-white">
                  Rp 299.900
                </p>
                <p className="text-[#A8E6CF] text-xs font-bold mt-1">
                  ✦ Hemat Rp 19.900
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/62895352977785?text=Halo%20CareLife%2C%20saya%20ingin%20memesan%20Bundle%203-in-1%20CareLife."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#66B2B2] hover:bg-[#5AA3A3] text-white px-8 py-4 rounded-[20px] font-bold text-sm border-2 border-white/20 shadow-[0_0_20px_#66B2B240] hover:shadow-[0_0_30px_#66B2B260] transition-all"
                >
                  <MessageCircle size={18} />
                  Pesan Bundle via WhatsApp
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://tokopedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-[16px] border border-white/20 font-bold text-xs transition-all"
                  >
                    <ShoppingCart size={14} />
                    Tokopedia
                  </a>
                  <a
                    href="https://shopee.co.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-[16px] border border-white/20 font-bold text-xs transition-all"
                  >
                    <ShoppingCart size={14} />
                    Shopee
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Benefits ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 flex gap-5 items-center shadow-[4px_4px_0_#1A1A1A]">
            <div className="bg-[#A8E6CF] w-14 h-14 rounded-[16px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] shrink-0">
              <Truck size={24} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="font-black text-lg text-[#1A1A1A] mb-1">
                Pengiriman Gratis
              </p>
              <p className="text-sm font-medium text-[#6B7280]">
                Berlaku untuk seluruh wilayah Indonesia tanpa minimal pembelian.
              </p>
            </div>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 flex gap-5 items-center shadow-[4px_4px_0_#1A1A1A]">
            <div className="bg-[#FFB6B6] w-14 h-14 rounded-[16px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] shrink-0">
              <Shield size={24} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="font-black text-lg text-[#1A1A1A] mb-1">
                Garansi Kualitas
              </p>
              <p className="text-sm font-medium text-[#6B7280]">
                Jaminan 100% uang kembali jika produk diterima dalam keadaan
                cacat.
              </p>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 md:p-10 mb-8 shadow-[4px_4px_0_#1A1A1A]">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#FFD700] p-2 rounded-[12px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <BarChart3 className="text-[#1A1A1A]" size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">
              Tingkat Kepuasan Pengguna
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10">
            <div className="text-center pt-4 md:pt-0 md:px-6 first:pt-0">
              <p className="text-4xl md:text-5xl font-black text-[#66B2B2] mb-2 tracking-tighter">
                76%
              </p>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                Responden Sangat Tertarik
              </p>
            </div>
            <div className="text-center pt-6 md:pt-0 md:px-6">
              <p className="text-4xl md:text-5xl font-black text-[#66B2B2] mb-2 tracking-tighter">
                92%
              </p>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                Konten Sangat Membantu
              </p>
            </div>
            <div className="text-center pt-6 md:pt-0 md:px-6">
              <p className="text-4xl md:text-5xl font-black text-[#66B2B2] mb-2 tracking-tighter">
                4.8
              </p>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                Rating Rata-rata Uji Coba
              </p>
            </div>
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 md:p-10 shadow-[4px_4px_0_#1A1A1A] mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#A8E6CF] p-2 rounded-[12px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <HelpCircle className="text-[#1A1A1A]" size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">
              Pertanyaan Umum (FAQ)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">
                Bisa beli per buku saja?
              </h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Ya! Kamu bisa memilih buku sesuai kebutuhan secara satuan, atau
                hemat lebih banyak dengan paket Bundle 3-in-1.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">
                Berapa lama waktu pengiriman?
              </h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Pengiriman reguler memakan waktu 2-3 hari kerja untuk
                Jabodetabek, dan 3-7 hari kerja untuk luar daerah.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">
                Apakah ada layanan pelanggan?
              </h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Ya, tim kami siap membantu melalui WhatsApp setiap hari kerja
                (09:00–17:00 WIB) untuk pertanyaan seputar platform digital
                maupun produk fisik.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">
                Mengapa harga Tunanetra lebih tinggi?
              </h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Buku Tunanetra menggunakan kertas taktil Braille khusus
                berkualitas tinggi dan dilengkapi audio interaktif per halaman,
                sehingga biaya produksi lebih besar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
