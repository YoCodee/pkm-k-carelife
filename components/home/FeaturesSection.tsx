"use client";

import { TEMA_LIST } from "@/lib/content";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Konten Pembelajaran
          </h2>
          <p className="text-gray-600 text-lg">
            Empat tema utama yang dirancang untuk mendukung perkembangan anak
            berkebutuhan khusus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMA_LIST.map((tema) => (
            <Link
              key={tema.id}
              href="/menu"
              className={`${tema.color} border-2 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
            >
              <div className="text-5xl mb-4">{tema.emoji}</div>
              <h3 className="text-lg font-bold mb-2 text-gray-800">
                {tema.label}
              </h3>
              <p className="text-sm text-gray-700">{tema.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
