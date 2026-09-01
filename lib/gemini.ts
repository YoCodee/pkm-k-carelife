export const SYSTEM_PROMPT = `
Kamu adalah asisten virtual CareLife, sebuah platform edukasi untuk 
Anak Berkebutuhan Khusus (ABK) di Indonesia.

Kamu membantu:
- Orang tua ABK (tunanetra, tunarungu, tunagrahita usia 10-15 tahun)
- Guru SLB dan sekolah inklusif
- Terapis anak

Topik yang kamu kuasai:
1. Keterampilan merawat diri (kebersihan, kesehatan, pubertas)
2. Perlindungan diri (mengenali bullying, keselamatan, privasi tubuh)
3. Keterampilan sosial (komunikasi, kerja sama, empati)
4. Kesiapan karir (minat, bakat, pengenalan dunia kerja)
5. Pendidikan inklusif dan cara mendampingi ABK
6. Cara menggunakan buku dan platform CareLife

Gunakan bahasa Indonesia yang ramah, hangat, dan mudah dipahami.
Jika ditanya di luar topik tersebut, arahkan kembali ke topik CareLife.
Jangan pernah memberikan informasi medis yang bersifat diagnosis.
`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const SUGGESTED_QUESTIONS = [
  "Bagaimana cara mengajarkan kebersihan diri pada anak tunagrahita?",
  "Apa saja tanda-tanda bullying pada anak tunarungu?",
  "Bagaimana memperkenalkan konsep karir pada ABK?",
  "Cara menggunakan buku CareLife di rumah?",
];

// Pre-written answers for suggested questions (fallback when API is unavailable)
export const STATIC_QA: Record<string, string> = {
  "Bagaimana cara mengajarkan kebersihan diri pada anak tunagrahita?":
    "Hai! Berikut tips mengajarkan kebersihan diri pada anak tunagrahita:\n\n" +
    "1. **Gunakan Rutinitas Tetap** — Buat jadwal harian yang konsisten untuk mandi, sikat gigi, dan cuci tangan. Anak tunagrahita belajar lebih baik dengan pengulangan.\n\n" +
    "2. **Visual Step-by-Step** — Tempel poster langkah-langkah (misalnya: buka keran → basahi tangan → pakai sabun → gosok → bilas → keringkan) di dekat wastafel.\n\n" +
    "3. **Praktik Langsung** — Dampingi anak melakukan sendiri, bukan hanya menjelaskan. Gunakan metode 'hand-over-hand' (pegang tangan anak untuk membimbing gerakan).\n\n" +
    "4. **Pujian & Reward** — Berikan pujian setiap kali anak berhasil. Bisa juga pakai stiker reward chart untuk motivasi.\n\n" +
    "5. **Buku CareLife** — Di buku CareLife tema 'Merawat Diri', ada video visual langkah demi langkah yang bisa diakses via web portal. Sangat membantu!\n\n" +
    "Ingat, kesabaran adalah kunci. Setiap anak punya kecepatan belajar yang berbeda 💛",

  "Apa saja tanda-tanda bullying pada anak tunarungu?":
    "Pertanyaan yang sangat penting! Berikut tanda-tanda yang perlu diwaspadai:\n\n" +
    "🔴 **Perubahan Perilaku:**\n" +
    "- Anak tiba-tiba enggan pergi ke sekolah\n" +
    "- Menjadi lebih pendiam atau mudah marah dari biasanya\n" +
    "- Sering menangis tanpa alasan yang jelas\n\n" +
    "🔴 **Tanda Fisik:**\n" +
    "- Luka, memar, atau pakaian rusak yang tidak bisa dijelaskan\n" +
    "- Barang-barang hilang atau rusak\n" +
    "- Gangguan makan atau tidur\n\n" +
    "🔴 **Tanda Sosial:**\n" +
    "- Menghindari situasi sosial atau tempat tertentu\n" +
    "- Kehilangan teman atau tidak mau bermain\n" +
    "- Menunjukkan rasa takut terhadap orang tertentu melalui bahasa isyarat atau gestur\n\n" +
    "**Yang bisa dilakukan orang tua:**\n" +
    "- Bangun komunikasi terbuka menggunakan bahasa isyarat\n" +
    "- Ajari anak untuk melapor kepada orang dewasa yang dipercaya\n" +
    "- Koordinasi dengan guru dan pihak sekolah\n\n" +
    "Di buku CareLife tema 'Perlindungan Diri', ada materi khusus tentang ini dengan video bahasa isyarat 🤟",

  "Bagaimana memperkenalkan konsep karir pada ABK?":
    "Pertanyaan yang bagus! Memperkenalkan konsep karir pada ABK sangat penting untuk masa depan mereka. Berikut caranya:\n\n" +
    "🌟 **1. Kenali Minat & Bakat Anak**\n" +
    "Perhatikan apa yang disukai anak. Apakah suka menggambar, memasak, berkebun, atau merapikan barang? Semua bisa menjadi potensi karir.\n\n" +
    "🌟 **2. Gunakan Metode Experiential Learning**\n" +
    "Ajak anak mengunjungi tempat kerja nyata — toko roti, salon, bengkel sederhana. Pengalaman langsung lebih mudah dipahami daripada penjelasan abstrak.\n\n" +
    "🌟 **3. Simulasi & Role Play**\n" +
    "Buat permainan peran: jadi kasir, jadi tukang kebun, jadi pelayan. Ini melatih keterampilan dasar dunia kerja secara menyenangkan.\n\n" +
    "🌟 **4. Keterampilan Pendukung**\n" +
    "Ajarkan soft skills: datang tepat waktu, merapikan tempat kerja, menyapa orang, dan menyelesaikan tugas.\n\n" +
    "🌟 **5. Kolaborasi dengan Terapis**\n" +
    "Terapis okupasi bisa membantu mengidentifikasi pekerjaan yang sesuai dengan kemampuan motorik dan kognitif anak.\n\n" +
    "Di CareLife, tema 'Kesiapan Karir' menyajikan video inspirasi dari ABK yang sudah berhasil bekerja! 💪",

  "Cara menggunakan buku CareLife di rumah?":
    "Mudah sekali! Berikut panduan lengkapnya:\n\n" +
    "📖 **Langkah 1: Pilih Versi Buku**\n" +
    "Paket CareLife berisi 4 versi buku. Pilih yang sesuai kebutuhan anak:\n" +
    "- Buku Visual → untuk tunagrahita\n" +
    "- Buku Braille → untuk tunanetra\n" +
    "- Buku Bahasa Isyarat → untuk tunarungu\n\n" +
    "📱 **Langkah 2: Buka Portal Web**\n" +
    "Masuk ke menu 'Belajar' di platform digital CareLife untuk membuka konten digital yang sesuai dengan materi buku.\n\n" +
    "🎬 **Langkah 3: Pilih Mode Belajar**\n" +
    "Di platform digital, pilih mode yang sesuai:\n" +
    "- 👁️ Dunia Visual — teks besar & gambar jelas\n" +
    "- 🎧 Dunia Suara — narasi audio & deskripsi\n" +
    "- 🤟 Dunia Ceria — video bahasa isyarat & subtitle\n\n" +
    "👨‍👩‍👧 **Langkah 4: Dampingi Anak**\n" +
    "Duduk bersama anak saat belajar. Diskusikan materi, putar ulang video jika perlu, dan gunakan fitur kontrol kecepatan video.\n\n" +
    "🤖 **Langkah 5: Tanya AI**\n" +
    "Jika ada pertanyaan, gunakan fitur Tanya AI di platform ini untuk mendapat panduan tambahan.\n\n" +
    "Selamat belajar bersama CareLife! 🎉",
};
