"use client";

import Link from "next/link";
import { ShoppingCart, Truck, Shield, Book, Type, Ear, Smartphone, MessageCircle, BarChart3, HelpCircle, ArrowLeft } from "lucide-react";

export default function BeliPage() {
  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-[#F8F9FA] py-12 px-6 md:px-10 lg:px-16 flex justify-center">
      
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#A8E6CF] rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFB6B6] rounded-full blur-[100px] pointer-events-none opacity-35"></div>
      
      <div className="max-w-[1000px]  w-full relative z-10">
        
        <div className="text-center mb-12">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#1A1A1A] px-4 py-2 rounded-full border-2 border-[#1A1A1A] bg-white shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all mb-6"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Kembali
          </Link>
          <h1 className="text-[32px] md:text-[44px] font-black text-[#1A1A1A] mb-3 tracking-tight">
            Pesan <span className="text-[#66B2B2]">CareLife</span> Box Set
          </h1>
          <p className="text-base md:text-lg font-medium text-[#6B7280] px-4 max-w-2xl mx-auto">
            Dapatkan paket komplit buku interaktif untuk pendampingan Anak Berkebutuhan Khusus dalam satu kotak eksklusif.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
          
          <div className="lg:col-span-2 bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 flex flex-col items-center justify-center shadow-[4px_4px_0_#1A1A1A]">
            <div className="w-48 h-64 bg-[#A8E6CF] rounded-[24px] border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] flex items-center justify-center mb-6 relative">
               <Book size={64} strokeWidth={1.5} className="text-[#1A1A1A]/40" />
               <div className="absolute bottom-4 text-xs font-bold tracking-widest text-[#1A1A1A]/50 uppercase">CareLife</div>
            </div>
            <p className="text-sm font-bold text-[#6B7280] tracking-wider uppercase">Ilustrasi Box Set</p>
          </div>

          <div className="lg:col-span-3 bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 md:p-10 shadow-[4px_4px_0_#1A1A1A] flex flex-col justify-between">
            
            <div>
              <span className="cl-tag cl-tag-yellow mb-6">Edisi Terbatas</span>
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-6">
                CareLife 4-in-1 Box Set
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex gap-4 items-center p-3 rounded-[16px] border-2 border-[#1A1A1A]/10 bg-[#F8F9FA]">
                  <div className="bg-[#A8E6CF] w-10 h-10 rounded-[12px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[1px_1px_0_#1A1A1A] shrink-0">
                    <Book size={18} className="text-[#1A1A1A]" />
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">Buku Visual<br/><span className="text-xs font-medium text-[#6B7280]">Tunagrahita</span></span>
                </div>
                <div className="flex gap-4 items-center p-3 rounded-[16px] border-2 border-[#1A1A1A]/10 bg-[#F8F9FA]">
                  <div className="bg-[#66B2B2] w-10 h-10 rounded-[12px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[1px_1px_0_#1A1A1A] shrink-0">
                    <Type size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">Buku Braille<br/><span className="text-xs font-medium text-[#6B7280]">Tunanetra</span></span>
                </div>
                <div className="flex gap-4 items-center p-3 rounded-[16px] border-2 border-[#1A1A1A]/10 bg-[#F8F9FA]">
                  <div className="bg-[#FFB6B6] w-10 h-10 rounded-[12px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[1px_1px_0_#1A1A1A] shrink-0">
                    <Ear size={18} className="text-[#1A1A1A]" />
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">Bahasa Isyarat<br/><span className="text-xs font-medium text-[#6B7280]">Tunarungu</span></span>
                </div>
                <div className="flex gap-4 items-center p-3 rounded-[16px] border-2 border-[#1A1A1A]/10 bg-[#F8F9FA]">
                  <div className="bg-[#FFD700] w-10 h-10 rounded-[12px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[1px_1px_0_#1A1A1A] shrink-0">
                    <Smartphone size={18} className="text-[#1A1A1A]" />
                  </div>
                  <span className="text-sm font-bold text-[#1A1A1A]">Akses Digital<br/><span className="text-xs font-medium text-[#6B7280]">Web Portal</span></span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-end border-t-2 border-[#1A1A1A]/10 pt-6">
              <div className="flex-1 w-full">
                <p className="text-xs font-bold text-[#6B7280] mb-1 uppercase tracking-wider">Harga Penawaran</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl md:text-4xl font-black text-[#1A1A1A]">Rp 199.900</p>
                  <p className="text-sm font-bold text-[#6B7280] line-through">Rp 299.900</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <a
                  href="https://wa.me/62895352977785?text=Halo%20CareLife%2C%20saya%20tertarik%20untuk%20memesan%20buku%20fisik%20CareLife."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full md:w-auto bg-[#66B2B2] hover:bg-[#5AA3A3] text-white px-8 py-4 rounded-[20px] font-bold text-sm border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#1A1A1A] transition-all"
                >
                  <MessageCircle size={18} />
                  Pesan via WhatsApp
                </a>
                <div className="flex gap-3">
                  <a
                    href="https://tokopedia.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-[#FFD700]/20 text-[#1A1A1A] px-4 py-3 rounded-[16px] border-2 border-[#1A1A1A] font-bold text-xs shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all"
                  >
                    <ShoppingCart size={14} />
                    Tokopedia
                  </a>
                  <a
                    href="https://shopee.co.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-[#FFD700]/20 text-[#1A1A1A] px-4 py-3 rounded-[16px] border-2 border-[#1A1A1A] font-bold text-xs shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all"
                  >
                    <ShoppingCart size={14} />
                    Shopee
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 flex gap-5 items-center shadow-[4px_4px_0_#1A1A1A]">
            <div className="bg-[#A8E6CF] w-14 h-14 rounded-[16px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] shrink-0">
              <Truck size={24} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="font-black text-lg text-[#1A1A1A] mb-1">Pengiriman Gratis</p>
              <p className="text-sm font-medium text-[#6B7280]">Berlaku untuk seluruh wilayah Indonesia tanpa minimal pembelian.</p>
            </div>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-[24px] p-6 flex gap-5 items-center shadow-[4px_4px_0_#1A1A1A]">
            <div className="bg-[#FFB6B6] w-14 h-14 rounded-[16px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] shrink-0">
              <Shield size={24} className="text-[#1A1A1A]" />
            </div>
            <div>
              <p className="font-black text-lg text-[#1A1A1A] mb-1">Garansi Kualitas</p>
              <p className="text-sm font-medium text-[#6B7280]">Jaminan 100% uang kembali jika produk diterima dalam keadaan cacat.</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 md:p-10 mb-8 shadow-[4px_4px_0_#1A1A1A]">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#FFD700] p-2 rounded-[12px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <BarChart3 className="text-[#1A1A1A]" size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">Tingkat Kepuasan Pengguna</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#1A1A1A]/10">
            <div className="text-center pt-4 md:pt-0 md:px-6 first:pt-0">
              <p className="text-4xl md:text-5xl font-black text-[#66B2B2] mb-2 tracking-tighter">76%</p>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                Responden Sangat Tertarik
              </p>
            </div>
            <div className="text-center pt-6 md:pt-0 md:px-6">
              <p className="text-4xl md:text-5xl font-black text-[#66B2B2] mb-2 tracking-tighter">92%</p>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                Konten Sangat Membantu
              </p>
            </div>
            <div className="text-center pt-6 md:pt-0 md:px-6">
              <p className="text-4xl md:text-5xl font-black text-[#66B2B2] mb-2 tracking-tighter">4.8</p>
              <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wide leading-relaxed">
                Rating Rata-rata Uji Coba
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-8 md:p-10 shadow-[4px_4px_0_#1A1A1A] mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[#A8E6CF] p-2 rounded-[12px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <HelpCircle className="text-[#1A1A1A]" size={24} />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">Pertanyaan Umum (FAQ)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Apa saja isi dalam paket?</h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Paket CareLife 4-in-1 berisi 4 versi buku fisik dan modul digital untuk berbagai kebutuhan, lengkap dengan akses portal web.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Berapa lama waktu pengiriman?</h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Pengiriman reguler memakan waktu 2-3 hari kerja untuk Jabodetabek, dan 3-7 hari kerja untuk luar daerah.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Apakah ada layanan pelanggan?</h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Ya, tim kami siap membantu melalui WhatsApp setiap hari kerja (09:00 - 17:00 WIB) untuk pertanyaan seputar platform digital maupun produk fisik.
              </p>
            </div>
            <div className="bg-[#F8F9FA] p-6 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">
              <h3 className="font-bold text-base text-[#1A1A1A] mb-2">Bisa beli terpisah per buku?</h3>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                Saat ini kami hanya menyediakan penjualan dalam bentuk Box Set untuk memastikan pengalaman edukasi yang inklusif secara menyeluruh.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
