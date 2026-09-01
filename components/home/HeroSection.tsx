"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-20 px-4 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-5xl md:text-7xl font-bold mb-6 flex justify-center items-center space-x-4">
          <span>💚</span>
          <span>CareLife Updated</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Dunia Bermain dan Belajar yang Ramah, Aman, dan Seru
        </h1>

        <p className="text-lg md:text-xl mb-10 opacity-90">
          Platform digital pendamping buku CareLife untuk Anak Berkebutuhan
          Khusus. Konten interaktif dengan aksesibilitas penuh untuk tunanetra,
          tunarungu, dan tunagrahita.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:shadow-lg transition-shadow text-lg"
          >
            Mulai Belajar
            <ChevronRight className="ml-2" size={24} />
          </Link>

          <Link
            href="/beli"
            className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:bg-opacity-10 transition-all text-lg"
          >
            Beli Buku
            <ChevronRight className="ml-2" size={24} />
          </Link>
        </div>
      </div>
    </section>
  );
}
