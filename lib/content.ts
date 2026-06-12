export type Mode = "visual" | "suara" | "ceria";
export type Tema =
  | "perawatan-diri"
  | "perlindungan-diri"
  | "keterampilan-sosial"
  | "kesiapan-karir";

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  tema: Tema;
  mode: Mode;
  videoUrl: string;
  audioUrl?: string;
  jbiLottieUrl?: string;
  thumbnail: string;
  duration: number;
  subtitles?: string;
}

// ── New Step-by-Step Lesson Data ──

export interface QuizOption {
  emoji: string;
  label: string;
  isCorrect: boolean;
}

export interface LessonStep {
  id: string;
  order: number;
  emoji: string;
  textSimple: string;
  textCaption: string;
  audioNarration: string;
  tactileGuidance?: string; // Panduan raba buku fisik untuk tunanetra
  videoClipUrl?: string;
  quiz?: {
    question: string;
    options: QuizOption[];
  };
}

export interface LessonContent {
  id: string;
  tema: Tema;
  title: string;
  description: string;
  steps: LessonStep[];
}

// ── Static Lists ──

export const TEMA_LIST = [
  {
    id: "perawatan-diri",
    label: "Keterampilan Merawat Diri",
    emoji: "🛁",
    description:
      "Kebersihan diri, kesehatan tubuh, dan kemandirian sehari-hari",
    color: "bg-blue-100 border-blue-300",
  },
  {
    id: "perlindungan-diri",
    label: "Perlindungan Diri",
    emoji: "🛡️",
    description: "Mengenali bullying, menjaga keselamatan dan privasi",
    color: "bg-green-100 border-green-300",
  },
  {
    id: "keterampilan-sosial",
    label: "Keterampilan Sosial",
    emoji: "🤝",
    description: "Komunikasi, kerja sama, dan ekspresi emosi",
    color: "bg-yellow-100 border-yellow-300",
  },
  {
    id: "kesiapan-karir",
    label: "Kesiapan Karir",
    emoji: "💼",
    description: "Mengenal minat, bakat, dan dunia kerja sejak dini",
    color: "bg-purple-100 border-purple-300",
  },
];

export const MODE_LIST = [
  {
    id: "visual",
    label: "Tunagrahita",
    icon: "👁️",
    description:
      "Visual jelas, kecepatan dapat diatur",
    color: "bg-orange-100",
  },
  {
    id: "suara",
    label: "Tunanetra",
    icon: "🔊",
    description: "Narasi audio, panduan suara",
    color: "bg-blue-100",
  },
  {
    id: "ceria",
    label: "Tunarungu",
    icon: "🤟",
    description: "Animasi bahasa isyarat (JBI)",
    color: "bg-pink-100",
  },
];

// ── Step-by-step Lesson Data (shared across modes, rendered differently) ──

export const LESSON_CONTENT: LessonContent[] = [
  // ═══════════════════ PERAWATAN DIRI ═══════════════════
  {
    id: "lesson-perawatan-1",
    tema: "perawatan-diri",
    title: "Cara Mencuci Tangan",
    description: "Pelajari langkah-langkah mencuci tangan yang benar dan sehat",
    steps: [
      {
        id: "pd-1",
        order: 1,
        emoji: "🚿",
        textSimple: "Buka keran air",
        textCaption: "Langkah pertama: buka keran air dan basahi kedua tanganmu dengan air mengalir",
        audioNarration: "Langkah pertama, buka keran air. Basahi kedua tanganmu dengan air yang mengalir sampai semua bagian tangan basah.",
        tactileGuidance: "Raba gambar timbul keran air di sudut kiri atas halaman 1 buku fisik CareLife.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "pd-2",
        order: 2,
        emoji: "🧼",
        textSimple: "Pakai sabun",
        textCaption: "Ambil sabun secukupnya dan ratakan ke seluruh telapak tangan",
        audioNarration: "Langkah kedua, ambil sabun secukupnya. Ratakan sabun ke seluruh telapak tanganmu.",
        tactileGuidance: "Raba bentuk botol sabun timbul yang bertekstur licin di bagian tengah halaman 2.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Mana yang dipakai untuk cuci tangan?",
          options: [
            { emoji: "🧼", label: "Sabun", isCorrect: true },
            { emoji: "🍎", label: "Apel", isCorrect: false },
          ],
        },
      },
      {
        id: "pd-3",
        order: 3,
        emoji: "🤲",
        textSimple: "Gosok 20 detik",
        textCaption: "Gosok kedua telapak tangan dan sela-sela jari selama 20 detik",
        audioNarration: "Langkah ketiga, gosok kedua telapak tanganmu. Jangan lupa gosok juga sela-sela jari selama dua puluh detik ya.",
        tactileGuidance: "Raba tekstur busa sabun yang terasa menonjol dan kasar di halaman 3.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "pd-4",
        order: 4,
        emoji: "💧",
        textSimple: "Bilas tangan",
        textCaption: "Bilas tanganmu dengan air bersih sampai sabun hilang",
        audioNarration: "Langkah keempat, bilas tanganmu dengan air bersih yang mengalir. Pastikan semua sabun sudah hilang.",
        tactileGuidance: "Temukan garis-garis halus vertikal di halaman 4 yang melambangkan aliran air bersih.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Apa yang dilakukan setelah gosok?",
          options: [
            { emoji: "💧", label: "Bilas air", isCorrect: true },
            { emoji: "🧼", label: "Sabun lagi", isCorrect: false },
          ],
        },
      },
      {
        id: "pd-5",
        order: 5,
        emoji: "🧻",
        textSimple: "Keringkan tangan",
        textCaption: "Keringkan tanganmu dengan handuk bersih atau tisu",
        audioNarration: "Langkah terakhir, keringkan tanganmu menggunakan handuk bersih atau tisu. Hebat! Tanganmu sekarang sudah bersih dan sehat!",
        tactileGuidance: "Rasakan tekstur lembut seperti handuk asli di bagian kanan halaman 5.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },

  // ═══════════════════ PERLINDUNGAN DIRI ═══════════════════
  {
    id: "lesson-perlindungan-1",
    tema: "perlindungan-diri",
    title: "Mengenali Tindakan Bahaya",
    description: "Belajar mengenali dan menghindari tindakan bullying",
    steps: [
      {
        id: "pld-1",
        order: 1,
        emoji: "👀",
        textSimple: "Kenali yang jahat",
        textCaption: "Belajar mengenali tindakan yang tidak baik dari orang lain",
        audioNarration: "Hai teman! Kali ini kita belajar mengenali tindakan yang tidak baik dari orang lain. Yuk kita mulai!",
        tactileGuidance: "Raba lambang mata besar yang timbul di halaman 6 untuk fokus memperhatikan sekitarmu.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "pld-2",
        order: 2,
        emoji: "🗣️",
        textSimple: "Berani bilang TIDAK",
        textCaption: "Katakan TIDAK dengan tegas jika ada yang membuatmu tidak nyaman",
        audioNarration: "Jika ada yang membuatmu tidak nyaman, katakan TIDAK dengan tegas. Kamu berhak merasa aman.",
        tactileGuidance: "Temukan simbol X besar yang menonjol dan bertekstur kasar di halaman 7.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Jika ada yang mengganggumu, apa yang harus dilakukan?",
          options: [
            { emoji: "🙅", label: "Bilang TIDAK", isCorrect: true },
            { emoji: "😶", label: "Diam saja", isCorrect: false },
          ],
        },
      },
      {
        id: "pld-3",
        order: 3,
        emoji: "🏃",
        textSimple: "Pergi dari bahaya",
        textCaption: "Segera pergi dan jauhi situasi yang membuatmu takut atau tidak nyaman",
        audioNarration: "Jika kamu merasa tidak aman, segera pergi dan jauhi situasi itu. Cari tempat yang aman.",
        tactileGuidance: "Ikuti jalur timbul berbentuk panah melengkung di halaman 8 untuk mengarahkan langkahmu pergi.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "pld-4",
        order: 4,
        emoji: "👨‍👩‍👧",
        textSimple: "Cerita ke orang tua",
        textCaption: "Ceritakan kepada orang tua, guru, atau orang dewasa yang kamu percaya",
        audioNarration: "Selalu ceritakan apa yang terjadi kepada orang tua, guru, atau orang dewasa yang kamu percaya. Mereka akan membantumu.",
        tactileGuidance: "Raba bentuk timbul menyerupai pelukan hangat keluarga di halaman 9.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Kepada siapa kamu harus cerita?",
          options: [
            { emoji: "👨‍👩‍👧", label: "Orang tua", isCorrect: true },
            { emoji: "👤", label: "Orang asing", isCorrect: false },
          ],
        },
      },
    ],
  },

  // ═══════════════════ KETERAMPILAN SOSIAL ═══════════════════
  {
    id: "lesson-sosial-1",
    tema: "keterampilan-sosial",
    title: "Cara Menyapa Teman",
    description: "Belajar menyapa dan berkomunikasi dengan teman",
    steps: [
      {
        id: "ks-1",
        order: 1,
        emoji: "👋",
        textSimple: "Lambaikan tangan",
        textCaption: "Lambaikan tanganmu dan tersenyum saat bertemu teman",
        audioNarration: "Saat bertemu teman, lambaikan tanganmu dan tersenyum. Itu cara menyapa yang ramah!",
        tactileGuidance: "Raba bentuk tangan timbul yang sedang menyapa di bagian atas halaman 10.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "ks-2",
        order: 2,
        emoji: "😊",
        textSimple: "Ucapkan halo",
        textCaption: "Ucapkan 'Halo!' atau 'Selamat pagi!' dengan ramah",
        audioNarration: "Ucapkan halo atau selamat pagi dengan suara yang ramah dan ceria.",
        tactileGuidance: "Raba bentuk melengkung senyum yang timbul dan mulus di halaman 11.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Bagaimana cara menyapa teman?",
          options: [
            { emoji: "👋", label: "Lambaikan tangan", isCorrect: true },
            { emoji: "😠", label: "Membentak", isCorrect: false },
          ],
        },
      },
      {
        id: "ks-3",
        order: 3,
        emoji: "🤝",
        textSimple: "Ajak bermain",
        textCaption: "Ajak temanmu bermain bersama dengan sopan",
        audioNarration: "Setelah menyapa, ajaklah temanmu bermain bersama. Katakan: Mau main bareng?",
        tactileGuidance: "Temukan bentuk dua tangan saling bersalaman yang timbul di tengah halaman 12.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "ks-4",
        order: 4,
        emoji: "🎭",
        textSimple: "Berbagi mainan",
        textCaption: "Berbagi mainan dengan teman itu menyenangkan",
        audioNarration: "Berbagi mainan dengan teman membuat permainan lebih menyenangkan. Kamu anak yang baik!",
        tactileGuidance: "Raba dua bentuk kotak mainan balok timbul di halaman 13.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Apa yang menyenangkan dengan teman?",
          options: [
            { emoji: "🤝", label: "Berbagi", isCorrect: true },
            { emoji: "😤", label: "Berebut", isCorrect: false },
          ],
        },
      },
    ],
  },

  // ═══════════════════ KESIAPAN KARIR ═══════════════════
  {
    id: "lesson-karir-1",
    tema: "kesiapan-karir",
    title: "Mengenal Pekerjaan",
    description: "Eksplorasi berbagai jenis pekerjaan di sekitar kita",
    steps: [
      {
        id: "kk-1",
        order: 1,
        emoji: "👨‍⚕️",
        textSimple: "Dokter menolong",
        textCaption: "Dokter adalah orang yang menolong orang sakit agar sembuh",
        audioNarration: "Tahukah kamu? Dokter adalah orang yang menolong orang sakit agar sembuh kembali. Dokter bekerja di rumah sakit.",
        tactileGuidance: "Raba simbol palang merah timbul yang khas di halaman 14.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "kk-2",
        order: 2,
        emoji: "👩‍🏫",
        textSimple: "Guru mengajar",
        textCaption: "Guru mengajarkan banyak hal baik kepada murid-muridnya",
        audioNarration: "Guru adalah orang yang mengajarkan banyak hal baik. Guru bekerja di sekolah dan sangat sayang dengan muridnya.",
        tactileGuidance: "Raba bingkai papan tulis persegi panjang yang menonjol di halaman 15.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Siapa yang mengajar di sekolah?",
          options: [
            { emoji: "👩‍🏫", label: "Guru", isCorrect: true },
            { emoji: "👨‍🍳", label: "Koki", isCorrect: false },
          ],
        },
      },
      {
        id: "kk-3",
        order: 3,
        emoji: "👨‍🍳",
        textSimple: "Koki memasak",
        textCaption: "Koki memasak makanan yang lezat untuk banyak orang",
        audioNarration: "Koki adalah orang yang memasak makanan lezat. Koki bekerja di restoran atau hotel.",
        tactileGuidance: "Temukan bentuk topi koki melengkung tinggi yang timbul di halaman 16.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        id: "kk-4",
        order: 4,
        emoji: "🌟",
        textSimple: "Kamu bisa jadi apa saja!",
        textCaption: "Kamu bisa menjadi apa saja yang kamu mau jika rajin belajar",
        audioNarration: "Kamu bisa menjadi apa saja yang kamu mau! Yang penting, rajin belajar dan jangan pernah menyerah. Kamu hebat!",
        tactileGuidance: "Raba bentuk bintang timbul yang bersudut lima di halaman 17.",
        videoClipUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        quiz: {
          question: "Apa yang penting supaya bisa jadi hebat?",
          options: [
            { emoji: "📚", label: "Rajin belajar", isCorrect: true },
            { emoji: "😴", label: "Malas-malasan", isCorrect: false },
          ],
        },
      },
    ],
  },
];

// ── Helper Functions ──

export function getLessonByTema(tema: Tema): LessonContent | undefined {
  return LESSON_CONTENT.find((l) => l.tema === tema);
}

// Legacy compat – keep VIDEO_CONTENT for any old references
export const VIDEO_CONTENT: VideoContent[] = [
  {
    id: "1",
    title: "Cara Mandi dengan Baik",
    description: "Pelajari langkah-langkah mandi yang benar dan sehat dengan visual yang lambat dan jelas.",
    tema: "perawatan-diri",
    mode: "visual",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://via.placeholder.com/320x180?text=Cara+Mandi",
    duration: 300,
  },
];

export function getVideosByTemaAndMode(tema: Tema, mode: Mode): VideoContent[] {
  return VIDEO_CONTENT.filter((v) => v.tema === tema && v.mode === mode);
}

export function getVideoById(id: string): VideoContent | undefined {
  return VIDEO_CONTENT.find((v) => v.id === id);
}
