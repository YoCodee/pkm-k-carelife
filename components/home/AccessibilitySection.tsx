"use client";

import { Check } from "lucide-react";

const ACCESSIBILITY_FEATURES = [
  {
    mode: "🎨 Dunia Visual",
    subtitle: "Untuk Anak Tunagrahita",
    features: [
      "Visual yang jelas dan mudah dipahami",
      "Tombol besar dan navigasi sederhana",
      "Kontrol kecepatan video (0.5x - 1.25x)",
      "Warna-warna kontras tinggi",
    ],
  },
  {
    mode: "🔊 Dunia Suara",
    subtitle: "Untuk Anak Tunanetra",
    features: [
      "Narasi audio otomatis untuk semua konten",
      "Panduan suara untuk navigasi",
      "Deskripsi audio untuk setiap gambar",
      "Keyboard navigation lengkap",
    ],
  },
  {
    mode: "🤟 Dunia Ceria",
    subtitle: "Untuk Anak Tunarungu",
    features: [
      "Animasi Bahasa Isyarat Indonesia (JBI)",
      "Subtitle lengkap untuk semua video",
      "Visualisasi musik dan suara penting",
      "Interface visual yang menarik",
    ],
  },
];

export default function AccessibilitySection() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aksesibilitas Lengkap
          </h2>
          <p className="text-gray-600 text-lg">
            Setiap anak memiliki kebutuhan unik. CareLife dirancang untuk semua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ACCESSIBILITY_FEATURES.map((item, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-2">{item.mode.split(" ")[0]}</div>
              <h3 className="text-xl font-bold mb-1">{item.mode}</h3>
              <p className="text-gray-600 text-sm mb-6">{item.subtitle}</p>

              <ul className="space-y-4">
                {item.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <Check
                      className="text-green-500 flex-shrink-0 mt-1"
                      size={20}
                    />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
