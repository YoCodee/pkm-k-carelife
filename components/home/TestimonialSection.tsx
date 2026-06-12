"use client";

const TESTIMONIALS = [
  {
    quote:
      "CareLife sangat membantu saya dalam mendampingi anak tunagrahita di rumah. Kontennya jelas dan mudah dipahami.",
    author: "Ibu Siti",
    role: "Orang tua ABK",
  },
  {
    quote:
      "Sebagai guru SLB, saya merekomendasikan CareLife kepada semua siswa. Fitur aksesibilitasnya luar biasa.",
    author: "Pak Budi",
    role: "Guru SLB",
  },
  {
    quote:
      "Platform ini membuat pekerjaan saya sebagai terapis lebih efektif. Anak-anak sangat tertarik dengan kontennya.",
    author: "Dr. Fatimah",
    role: "Terapis Anak",
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Kepercayaan dari Para Pengguna
          </h2>
          <p className="text-gray-600 text-lg">
            76% responden survei menyatakan sangat tertarik dengan platform
            CareLife
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t pt-4">
                <p className="font-bold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
