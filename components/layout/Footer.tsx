"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
              <span className="text-2xl">💚</span>
              <span>CareLife</span>
            </h3>
            <p className="text-sm">
              Platform digital pendamping buku CareLife untuk ABK
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition">
                  Beranda
                </a>
              </li>
              <li>
                <a href="/menu" className="hover:text-white transition">
                  Belajar
                </a>
              </li>
              <li>
                <a href="/chat" className="hover:text-white transition">
                  Tanya AI
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  Tentang
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Produk</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/beli" className="hover:text-white transition">
                  Beli Buku
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Dokumentasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Ikuti Kami</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram: carelife.official
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  TikTok: @carelife_officia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  WhatsApp Business
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0">
              © 2026 CareLife - Platform Edukasi Anak Berkebutuhan Khusus
            </p>
            <p className="text-sm text-gray-400">
              Didukung oleh PKM-K 2026 | Universitas Teknologi Yogyakarta
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
