"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-6 md:px-10 lg:px-16 bg-[#F8F9FA]">
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[32px] md:text-[40px] font-black text-[#1A1A1A] mb-2 tracking-tight">Tentang <span className="text-[#66B2B2]">CareLife</span></h1>
          <p className="text-sm md:text-base font-bold text-[#6B7280]">Kenali lebih dekat platform edukasi kami</p>
        </div>

        <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-6 md:p-8 mb-6 shadow-[4px_4px_0_#1A1A1A]">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl bg-[#FFD700] w-14 h-14 rounded-[20px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">📖</div>
            <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">Apa itu CareLife?</h2>
          </div>
          <p className="text-[#1A1A1A] mb-4 leading-relaxed font-bold text-sm md:text-base">
            CareLife adalah platform digital pendamping dari produk buku
            interaktif fisik CareLife — buku 4-in-1 untuk Anak Berkebutuhan
            Khusus (ABK) penyandang tunanetra, tunarungu, dan tunagrahita usia
            10–15 tahun.
          </p>
          <p className="text-[#1A1A1A] leading-relaxed font-bold text-sm md:text-base">
            Aplikasi ini diakses via QR Code yang tercetak di buku fisik,
            menyajikan konten video edukasi multisensorial, dan dilengkapi AI
            Chat berbasis Gemini Flash 2.5 untuk membantu orang tua, guru, dan
            terapis dalam mendampingi proses belajar ABK.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-6 md:p-8 shadow-[4px_4px_0_#1A1A1A]">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl bg-[#A8E6CF] w-14 h-14 rounded-[20px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">🎯</div>
              <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">Misi Kami</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start bg-[#F8F9FA] p-3 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-xl mt-0.5">✅</span>
                <span className="text-sm font-bold text-[#1A1A1A]">
                  Menyediakan konten video edukasi digital yang dapat diakses
                  via QR Code dari buku fisik CareLife
                </span>
              </li>
              <li className="flex gap-3 items-start bg-[#F8F9FA] p-3 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-xl mt-0.5">✅</span>
                <span className="text-sm font-bold text-[#1A1A1A]">
                  Menampilkan konten yang dapat disesuaikan berdasarkan jenis
                  kebutuhan khusus
                </span>
              </li>
              <li className="flex gap-3 items-start bg-[#F8F9FA] p-3 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-xl mt-0.5">✅</span>
                <span className="text-sm font-bold text-[#1A1A1A]">
                  Menyediakan AI Chat sebagai asisten virtual untuk orang tua,
                  guru, dan terapis
                </span>
              </li>
              <li className="flex gap-3 items-start bg-[#F8F9FA] p-3 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-xl mt-0.5">✅</span>
                <span className="text-sm font-bold text-[#1A1A1A]">Mendukung aksesibilitas penuh untuk semua jenis ABK</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] p-6 md:p-8 shadow-[4px_4px_0_#1A1A1A]">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl bg-[#FFB6B6] w-14 h-14 rounded-[20px] flex items-center justify-center border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]">👥</div>
              <h2 className="text-xl md:text-2xl font-black text-[#1A1A1A]">Target Pengguna</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3 items-center bg-[#F8F9FA] p-4 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-2xl ml-1 flex-shrink-0">👨‍👩‍👧</span>
                <div>
                  <p className="font-black text-sm text-[#1A1A1A]">Orang tua ABK</p>
                  <p className="text-xs text-[#6B7280] font-bold">
                    Panduan mendampingi anak belajar di rumah
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-center bg-[#F8F9FA] p-4 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-2xl ml-1 flex-shrink-0">👨‍🏫</span>
                <div>
                  <p className="font-black text-sm text-[#1A1A1A]">Guru SLB / Sekolah Inklusif</p>
                  <p className="text-xs text-[#6B7280] font-bold">
                    Materi ajar digital yang siap pakai
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-center bg-[#F8F9FA] p-4 rounded-[16px] border-2 border-[#1A1A1A]/10">
                <span className="text-2xl ml-1 flex-shrink-0">👨‍⚕️</span>
                <div>
                  <p className="font-black text-sm text-[#1A1A1A]">Terapis anak</p>
                  <p className="text-xs text-[#6B7280] font-bold">
                    Referensi media terapi berbasis tema
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-[#66B2B2] rounded-[32px] p-6 md:p-10 text-white relative overflow-hidden border-2 border-[#1A1A1A] shadow-[4px_4px_0_#1A1A1A] mb-6">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#A8E6CF] rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#FFB6B6] rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative z-10">
            <span className="cl-tag cl-tag-yellow mb-3 -rotate-3 inline-block">Pengembang</span>
            <h2 className="text-xl md:text-2xl font-black mb-3 leading-tight">Tentang Pengembang</h2>
            <p className="text-white/80 font-bold text-[13px] md:text-sm mb-3 leading-relaxed">
              CareLife dikembangkan melalui Program Kreativitas Mahasiswa -
              Kewirausahaan (PKM-K) tahun 2026 oleh mahasiswa Universitas
              Teknologi Yogyakarta.
            </p>
            <p className="text-white/80 font-bold text-[13px] md:text-sm leading-relaxed">
              Proyek ini bertujuan untuk mendukung pendidikan inklusif dan
              memberikan solusi teknologi yang dapat membantu Anak Berkebutuhan
              Khusus belajar dengan lebih efektif dan menyenangkan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
