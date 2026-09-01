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


export interface QuizOption {
  emoji: string;
  label: string;
  isCorrect: boolean;
}

export interface ActivityContent {
  type: "scrub" | "tap_correct" | "drag_match" | "catch_stars";
  question: string;
  audioPrompt?: string;
  targetEmoji?: string;
  backgroundEmoji?: string;
  options?: {
    emoji: string;
    label: string;
    isCorrect: boolean;
  }[];
  dragItem?: { emoji: string; label: string };
  targetItem?: { emoji: string; label: string };
  starCount?: number;
}

export interface LessonStep {
  id: string;
  order: number;
  emoji: string;
  textSimple: string;
  textCaption: string;
  audioNarration: string;
  audioFileUrl?: string; // Berkas audio rekaman asli (opsional)
  tactileGuidance?: string; 
  videoClipUrl?: string;
  jbiVideoUrl?: string;
  quiz?: {
    question: string;
    options: QuizOption[];
  };
  activity?: ActivityContent;
}

export interface LessonContent {
  id: string;
  tema: Tema;
  mode: Mode;
  title: string;
  description: string;
  steps: LessonStep[];
}



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

export const LESSON_CONTENT: LessonContent[] = [

  {
    id: "lesson-perawatan-1-ceria",
    tema: "perawatan-diri",
    mode: "ceria",
    title: "Keterampilan Merawat Diri (Tunarungu)",
    description: "Mengenal pubertas, menjaga kebersihan diri, organ reproduksi, serta kesehatan fisik & mental.",
    steps: [
      {
        id: "tr-pd-1",
        order: 1,
        emoji: "🧑‍🦱",
        textSimple: "Masa Pubertas & Perubahan Diri",
        textCaption: "Remaja mengalami pubertas: perubahan tubuh (jakun, mimpi basah, menstruasi, payudara) dan perasaan yang sering berubah-ubah.",
        audioNarration: "Masa remaja adalah masa transisi ke dewasa yang disebut pubertas. Tubuh mengalami perubahan fisik and emosi karena hormon. Ini adalah proses normal.",
        audioFileUrl: "/Sound/tunarunggu/perawatan-diri/Masa Pubertas & Perubahan Diri.mp3",
        videoClipUrl: "/videos/tunarunggu/perawatan-diri/Keterampilan Merawat Diri.mp4",
        jbiVideoUrl: "/videos/tunarunggu/perawatan-diri/jbi-1.mp4",
      },
      {
        id: "tr-pd-2",
        order: 2,
        emoji: "🧼",
        textSimple: "Pentingnya Menjaga Kebersihan Diri",
        textCaption: "Mandi minimal 2 kali sehari memakai sabun, ganti pakaian bersih setiap hari, sikat gigi, keramas, potong kuku, dan cuci tangan.",
        audioNarration: "Menjaga kebersihan diri membuat penampilan rapi, badan segar, dan mencegah bau badan atau jerawat akibat keringat pubertas.",
        audioFileUrl: "/Sound/tunarunggu/perawatan-diri/Pentingnya Menjaga Kebersihan Diri.mp3",
        videoClipUrl: "/videos/tunarunggu/perawatan-diri/Keterampilan Merawat Diri(2).mp4",
        jbiVideoUrl: "/videos/tunarunggu/perawatan-diri/jbi-2.mp4",
      },
      {
        id: "tr-pd-3",
        order: 3,
        emoji: "🩸",
        textSimple: "Menjaga Kebersihan Organ Reproduksi",
        textCaption: "Perempuan: ganti pembalut teratur saat menstruasi. Laki-laki: mandi/bersihkan diri setelah mimpi basah. Ganti pakaian dalam setiap hari.",
        audioNarration: "Kebersihan organ reproduksi sangat penting untuk mencegah infeksi. Menstruasi dan mimpi basah adalah proses alami yang normal.",
        audioFileUrl: "/Sound/tunarunggu/perawatan-diri/Menjaga Kebersihan Organ Reproduksi.mp3",
        videoClipUrl: "/videos/tunarunggu/perawatan-diri/Keterampilan Merawat Diri(3).mp4",
        jbiVideoUrl: "/videos/tunarunggu/perawatan-diri/jbi-3.mp4",
      },
      {
        id: "tr-pd-4",
        order: 4,
        emoji: "🧠",
        textSimple: "Menjaga Kesehatan Fisik dan Mental",
        textCaption: "Makan bergizi, olahraga rutin, tidur 8 jam, kelola emosi dengan bercerita ke orang terpercaya, dan lakukan kegiatan positif.",
        audioNarration: "Kesehatan fisik dijaga dengan makanan sehat, olahraga, tidur cukup. Kesehatan mental dijaga dengan bercerita kepada orang yang dipercaya.",
        audioFileUrl: "/Sound/tunarunggu/perawatan-diri/Menjaga Kesehatan Fisik dan Mental.mp3",
        videoClipUrl: "/videos/tunarunggu/perawatan-diri/Keterampilan Merawat Diri(4).mp4",
        jbiVideoUrl: "/videos/tunarunggu/perawatan-diri/jbi-4.mp4",
      }
    ]
  },
  {
    id: "lesson-perlindungan-1-ceria",
    tema: "perlindungan-diri",
    mode: "ceria",
    title: "Keterampilan Perlindungan Diri (Tunarungu)",
    description: "Memahami hak keamanan, membedakan sentuhan aman/tidak aman, berani menolak, dan mencari bantuan.",
    steps: [
      {
        id: "tr-pld-1",
        order: 1,
        emoji: "🛡️",
        textSimple: "Mengenal Hak Keamanan Diri",
        textCaption: "Setiap anak berhak hidup aman and dilindungi dari kekerasan. Kamu berhak dilindungi dan mencari bantuan jika merasa terancam.",
        audioNarration: "Setiap anak berhak aman and dilindungi. Sebagai anak tunarungu, kamu harus tahu situasi yang aman dan tidak aman.",
        audioFileUrl: "/Sound/tunarunggu/perlindungan-diri/Mengenal Hak Keamanan Diri.mp3",
        videoClipUrl: "/videos/tunarunggu/perlindungan-diri/Perlindungan-diri(1).mp4",
        jbiVideoUrl: "/videos/tunarunggu/perlindungan-diri/jbi-1.mp4",
      },
      {
        id: "tr-pld-2",
        order: 2,
        emoji: "🙅‍♀️",
        textSimple: "Sentuhan Aman & Tidak Aman",
        textCaption: "Sentuhan aman: bersalaman, pelukan orang tua. Sentuhan tidak aman: menyentuh area pribadi (dada, mulut, kemaluan, pantat) tanpa izin.",
        audioNarration: "Tubuhmu adalah milikmu. Ketahuilah perbedaan sentuhan yang aman dan tidak aman. Bagian pribadi tidak boleh disentuh orang lain.",
        audioFileUrl: "/Sound/tunarunggu/perlindungan-diri/Sentuhan Aman & Tidak Aman.mp3",
        videoClipUrl: "/videos/tunarunggu/perlindungan-diri/Perlindungan-diri(2).mp4",
        jbiVideoUrl: "/videos/tunarunggu/perlindungan-diri/jbi-2.mp4",
      },
      {
        id: "tr-pld-3",
        order: 3,
        emoji: "🗣️",
        textSimple: "Berani Berkata Tidak & Cari Bantuan",
        textCaption: "Katakan 'TIDAK' atau 'Jangan lakukan itu' jika tidak nyaman. Segera menjauh dan ceritakan kepada orang tua atau guru.",
        audioNarration: "Jangan takut menolak hal yang membuat tidak nyaman. Katakan TIDAK dengan tegas, lalu segera lari dan cari bantuan orang dewasa yang dipercaya.",
        audioFileUrl: "/Sound/tunarunggu/perlindungan-diri/Berani Berkata Tidak & Cari Bantuan.mp3",
        videoClipUrl: "/videos/tunarunggu/perlindungan-diri/Perlindungan-diri(3).mp4",
        jbiVideoUrl: "/videos/tunarunggu/perlindungan-diri/jbi-3.mp4",
      }
    ]
  },
  {
    id: "lesson-sosial-1-ceria",
    tema: "keterampilan-sosial",
    mode: "ceria",
    title: "Keterampilan Sosial (Tunarungu)",
    description: "Komunikasi menggunakan bahasa isyarat/tulisan, membangun pertemanan, kerja sama, dan mengelola emosi.",
    steps: [
      {
        id: "tr-ks-1",
        order: 1,
        emoji: "🤝",
        textSimple: "Pentingnya Keterampilan Sosial",
        textCaption: "Keterampilan sosial membantu berteman dan berkomunikasi dengan bahasa isyarat, tulisan, gambar, atau ekspresi tubuh.",
        audioNarration: "Keterampilan sosial membantu kita bergaul. Latihlah berkomunikasi dengan cara yang paling nyaman bagimu.",
        audioFileUrl: "/Sound/tunarunggu/keterampilan-sosial/Pentingnya Keterampilan Sosial.mp3",
        videoClipUrl: "/videos/tunarunggu/keterampilan-sosial/ketrampilan(1).mp4",
        jbiVideoUrl: "/videos/tunarunggu/keterampilan-sosial/jbi-1.mp4",
      },
      {
        id: "tr-ks-2",
        order: 2,
        emoji: "👋",
        textSimple: "Membangun Hubungan dengan Sesama",
        textCaption: "Menyapa teman/guru dengan ramah, perkenalkan diri, dan perhatikan ekspresi atau gerakan bibir lawan bicara saat mengobrol.",
        audioNarration: "Sapa orang lain dengan ramah. Perhatikan bahasa isyarat atau gerakan tubuh mereka untuk mengurangi kesalahpahaman.",
        audioFileUrl: "/Sound/tunarunggu/keterampilan-sosial/Membangun Hubungan dengan Sesama.mp3",
        videoClipUrl: "/videos/tunarunggu/keterampilan-sosial/ketrampilan(2).mp4",
        jbiVideoUrl: "/videos/tunarunggu/keterampilan-sosial/jbi-2.mp4",
      },
      {
        id: "tr-ks-3",
        order: 3,
        emoji: "🎨",
        textSimple: "Bekerja Sama & Memahami Perbedaan",
        textCaption: "Kerja kelompok saling membantu, menghargai perbedaan kemampuan/sifat teman, serta selesaikan masalah dengan tenang.",
        audioNarration: "Bekerja sama membuat tugas lebih mudah. Hargai perbedaan kemampuan dan pendapat teman dengan sikap saling menghormati.",
        audioFileUrl: "/Sound/tunarunggu/keterampilan-sosial/Bekerja Sama & Memahami Perbedaan.mp3",
        videoClipUrl: "/videos/tunarunggu/keterampilan-sosial/ketrampilan(3).mp4",
        jbiVideoUrl: "/videos/tunarunggu/keterampilan-sosial/jbi-3.mp4",
      },
      {
        id: "tr-ks-4",
        order: 4,
        emoji: "🧘‍♂️",
        textSimple: "Mengelola Emosi dalam Pergaulan",
        textCaption: "Saat marah/sedih, tenangkan diri (tarik napas/menjauh), lalu ceritakan perasaan ke orang tua, guru, atau teman dekat.",
        audioNarration: "Perubahan emosi saat remaja adalah wajar. Kelola emosi dengan menenangkan diri dan bercerita kepada orang yang dipercaya.",
        audioFileUrl: "/Sound/tunarunggu/keterampilan-sosial/Mengelola Emosi dalam Pergaulan.mp3",
        videoClipUrl: "/videos/tunarunggu/keterampilan-sosial/ketrampilan(4).mp4",
        jbiVideoUrl: "/videos/tunarunggu/keterampilan-sosial/jbi-4.mp4",
      }
    ]
  },
  {
    id: "lesson-karir-1-ceria",
    tema: "kesiapan-karir",
    mode: "ceria",
    title: "Kesiapan Karir (Tunarungu)",
    description: "Mengenali potensi diri, membiasakan sikap disiplin/mandiri, dan menyiapkan masa depan dengan percaya diri.",
    steps: [
      {
        id: "tr-kk-1",
        order: 1,
        emoji: "💻",
        textSimple: "Mengenali Potensi Diri & Minat",
        textCaption: "Setiap orang punya kelebihan (menggambar, komputer, memasak, dll). Kenali minat dari kegiatan yang paling kamu sukai.",
        audioNarration: "Temukan minatmu sejak remaja. Perhatikan kelebihanmu dan cobalah berbagai hal baru untuk mengenali cita-citamu.",
        audioFileUrl: "/Sound/tunarunggu/kesiapan-karir/Mengenali Potensi Diri & Minat.mp3",
        videoClipUrl: "/videos/tunarunggu/kesiapan-karir/karir(1).mp4",
        jbiVideoUrl: "/videos/tunarunggu/kesiapan-karir/jbi-1.mp4",
      },
      {
        id: "tr-kk-2",
        order: 2,
        emoji: "⏰",
        textSimple: "Sikap Kerja dalam Kehidupan Sehari-hari",
        textCaption: "Latih disiplin waktu, kerja sama kelompok, kemandirian (siapkan alat sekolah sendiri), dan tanggung jawab atas tugas.",
        audioNarration: "Bekal dunia kerja dimulai dari kebiasaan sehari-hari seperti disiplin tepat waktu, mandiri, dan bertanggung jawab atas tugas.",
        audioFileUrl: "/Sound/tunarunggu/kesiapan-karir/Sikap Kerja dalam Kehidupan Sehari-hari.mp3",
        videoClipUrl: "/videos/tunarunggu/kesiapan-karir/karir(2).mp4",
        jbiVideoUrl: "/videos/tunarunggu/kesiapan-karir/jbi-2.mp4",
      },
      {
        id: "tr-kk-3",
        order: 3,
        emoji: "🌟",
        textSimple: "Menyiapkan Masa Depan dengan Percaya Diri",
        textCaption: "Hambatan pendengaran bukan penghalang. Banyak tunarungu sukses jadi desainer, fotografer, programmer. Percayalah pada diri sendiri!",
        audioNarration: "Percayalah pada kemampuanmu. Terus latih keahlian yang kamu sukai dan bersiaplah meraih cita-citamu dengan percaya diri.",
        audioFileUrl: "/Sound/tunarunggu/kesiapan-karir/Menyiapkan Masa Depan dengan Percaya Diri.mp3",
        videoClipUrl: "/videos/tunarunggu/kesiapan-karir/karir(3).mp4",
        jbiVideoUrl: "/videos/tunarunggu/kesiapan-karir/jbi-3.mp4",
      }
    ]
  },


  {
    id: "lesson-perawatan-1-visual",
    tema: "perawatan-diri",
    mode: "visual",
    title: "Keterampilan Merawat Diri (Tunagrahita)",
    description: "Belajar mandiri merawat tubuh: sikat gigi, bangun tidur, mandi, berpakaian, cuci tangan, dan makan.",
    steps: [
      {
        id: "tg-pd-1",
        order: 1,
        emoji: "🪥",
        textSimple: "Gosok Gigi Sendiri",
        textCaption: "Ambil sikat gigi ➡️ beri pasta gigi ➡️ gosok gigi atas & bawah ➡️ kumur air ➡️ bersihkan sikat gigi.",
        audioNarration: "Ayo gosok gigi agar bersih! Ambil sikat, beri pasta gigi secukupnya, gosok gigi atas dan bawah secara perlahan, lalu kumur-kumur dengan air bersih sampai busanya hilang.",
        videoClipUrl: "/videos/tunagrahita/perawatan-diri/gosokgiginew.mp4",
        activity: {
          type: "scrub",
          question: "Ayo gosok gigi kotor sampai bersih!",
          targetEmoji: "🦠",
          backgroundEmoji: "🪥"
        }
      },
      {
        id: "tg-pd-2",
        order: 2,
        emoji: "🛌",
        textSimple: "Merapikan Tempat Tidur",
        textCaption: "Setelah bangun tidur: lipat selimut ➡️ rapikan bantal & guling ➡️ berdoa bersyukur.",
        audioNarration: "Setelah bangun tidur, jangan lupa melipat selimut dan merapikan bantal guling ya. Setelah itu, berdoalah mengucap syukur.",
        videoClipUrl: "/videos/tunagrahita/perawatan-diri/Merapikan tempat tidur.mp4",
      },
      {
        id: "tg-pd-3",
        order: 3,
        emoji: "🚿",
        textSimple: "Mandi Sendiri",
        textCaption: "Basahi tubuh ➡️ pakai sabun ➡️ gosok seluruh badan ➡️ bilas air ➡️ keringkan dengan handuk.",
        audioNarration: "Mandi membuat badan segar. Basahi badan dengan air, gosokkan sabun ke seluruh tubuh, bilas sampai bersih, lalu keringkan badanmu memakai handuk lembut.",
        videoClipUrl: "/videos/tunagrahita/perawatan-diri/Mandi Sendiri.mp4",
        activity: {
          type: "scrub",
          question: "Bilas busa sabun di seluruh badan!",
          targetEmoji: "🫧",
          backgroundEmoji: "🚶‍♂️"
        }
      },
      {
        id: "tg-pd-4",
        order: 4,
        emoji: "👕",
        textSimple: "Memakai Pakaian Sendiri",
        textCaption: "Belajar pakai pakaian mandiri: pakai baju ➡️ pakai celana ➡️ rapikan pakaian.",
        audioNarration: "Belajar memakai pakaian sendiri. Pasang bajumu, gunakan celana dengan rapi, lalu berkacalah untuk memastikan pakaianmu sudah rapi.",
        videoClipUrl: "/videos/tunagrahita/perawatan-diri/Memakai pakaian sendiri.mp4",
      },
      {
        id: "tg-pd-5",
        order: 5,
        emoji: "🧼",
        textSimple: "Mencuci Tangan Pakai Sabun",
        textCaption: "Basahi tangan ➡️ pakai sabun ➡️ gosok telapak & punggung tangan ➡️ bilas air ➡️ keringkan.",
        audioNarration: "Gosok telapak tangan dan sela jari dengan sabun, bilas dengan air bersih, lalu lap tanganmu sampai kering.",
        videoClipUrl: "/videos/tunagrahita/perawatan-diri/Mencuci Tangan Pakai Sabun.mp4",
        activity: {
          type: "tap_correct",
          question: "Mana yang dipakai untuk mencuci tangan?",
          options: [
            { emoji: "🧼", label: "Sabun", isCorrect: true },
            { emoji: "✏️", label: "Pensil", isCorrect: false },
          ]
        }
      },
      {
        id: "tg-pd-6",
        order: 6,
        emoji: "🍽️",
        textSimple: "Makan Mandiri",
        textCaption: "Cuci tangan sebelum makan ➡️ duduk rapi ➡️ gunakan sendok ➡️ habiskan makanan.",
        audioNarration: "Cuci tangan dulu sebelum makan. Duduklah yang rapi di kursi, gunakan sendok dengan tangan kanan, dan habiskan makananmu dengan bersih.",
        videoClipUrl: "/videos/tunagrahita/perawatan-diri/Makan Mandiri.mp4",
      }
    ]
  },
  {
    id: "lesson-perlindungan-1-visual",
    tema: "perlindungan-diri",
    mode: "visual",
    title: "Perlindungan Diri (Tunagrahita)",
    description: "Mengenal bagian tubuh, sentuhan baik/tidak baik, berani berkata TIDAK, mencari bantuan, dan aturan keselamatan.",
    steps: [
      {
        id: "tg-pld-1",
        order: 1,
        emoji: "🧑",
        textSimple: "Mengenal Bagian Tubuh",
        textCaption: "Boleh disentuh: telinga, hidung, tangan, kaki. TIDAK BOLEH disentuh: dada, mulut, mata, kemaluan, pantat.",
        audioNarration: "Tubuhmu sangat berharga. Ada bagian yang boleh disentuh seperti tangan dan kaki. Tapi ingat, bagian dada, mulut, kemaluan, dan pantat tidak boleh disentuh oleh orang lain.",
        videoClipUrl: "/videos/tunagrahita/perlindungan-diri/Grahita_perlindungan_Tubuhsentuh.mp4",
      },
      {
        id: "tg-pld-2",
        order: 2,
        emoji: "🤝",
        textSimple: "Sentuhan Baik vs Sentuhan Tidak Baik",
        textCaption: "Sentuhan baik: jabat tangan, tos, pelukan orang tua. Sentuhan tidak baik: memegang tubuh tanpa izin, memaksa memeluk/mencium.",
        audioNarration: "Sentuhan baik membuat kita senang, seperti bersalaman atau tos. Sentuhan tidak baik adalah ketika seseorang memegang tubuhmu tanpa izin.",
        videoClipUrl: "/videos/tunagrahita/perlindungan-diri/Grahita_perlindungan_sentuhan.mp4",
        activity: {
          type: "tap_correct",
          question: "Ada orang memegangmu tanpa izin? Ayo ketuk gambar untuk menolak!",
          options: [
            { emoji: "🙅‍♂️", label: "Bilang TIDAK", isCorrect: true },
            { emoji: "😶", label: "Diam saja", isCorrect: false },
          ]
        }
      },
      {
        id: "tg-pld-3",
        order: 3,
        emoji: "🙅‍♂️",
        textSimple: "Belajar Berkata 'TIDAK'",
        textCaption: "Katakan dengan tegas: 'TIDAK!', 'JANGAN SENTUH AKU!', atau 'AKU TIDAK MAU!' jika merasa tidak nyaman.",
        audioNarration: "Jika ada orang membuatmu tidak nyaman atau menyentuh sembarangan, berteriaklah: TIDAK! JANGAN SENTUH AKU! Jangan takut untuk menolak.",
        videoClipUrl: "/videos/tunagrahita/perlindungan-diri/Grahita_perlindungan_JanganSentuh.mp4",
      },
      {
        id: "tg-pld-4",
        order: 4,
        emoji: "👨",
        textSimple: "Orang Yang Bisa Membantu",
        textCaption: "Kamu bisa katakan 'Bantu Aku' dan cerita kepada: Ayah, Ibu, Nenek, Kakek, Guru, atau Polisi.",
        audioNarration: "Jika kamu takut atau bingung, segera lari dan temui orang dewasa yang kamu kenal seperti Ayah, Ibu, Guru, atau Polisi untuk meminta pertolongan.",
        videoClipUrl: "/videos/tunagrahita/perlindungan-diri/Grahita_perlindungan_Ketakutan.mp4",
      },
      {
        id: "tg-pld-5",
        order: 5,
        emoji: "🛑",
        textSimple: "Aturan Keselamatan Diri",
        textCaption: "Harus: main di tempat aman & minta izin. Tidak boleh: ikut orang asing, terima hadiah orang asing, pergi sendiri.",
        audioNarration: "Selalu bermain bersama keluarga atau teman di tempat yang aman. Ingat, jangan pernah ikut atau menerima hadiah dari orang asing yang tidak dikenal.",
        videoClipUrl: "/videos/tunagrahita/perlindungan-diri/Grahita_perlindungan_Aturankeselamatan.mp4",
      }
    ]
  },
  {
    id: "lesson-sosial-1-visual",
    tema: "keterampilan-sosial",
    mode: "visual",
    title: "Keterampilan Sosial (Tunagrahita)",
    description: "Belajar menyapa, mendengarkan, bermain bersama, mengucap tolong/maaf/terima kasih, dan menolong teman.",
    steps: [
      {
        id: "tg-ks-1",
        order: 1,
        emoji: "😊",
        textSimple: "Ketika Bertemu Orang Lain",
        textCaption: "Saat bertemu orang: tersenyum, melihat wajah teman, dan mengucapkan salam.",
        audioNarration: "Tersenyum lah saat bertemu teman. Lihat matanya dan ucapkan salam seperti halo atau selamat pagi.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_Salam.mp4",
      },
      {
        id: "tg-ks-2",
        order: 2,
        emoji: "👂",
        textSimple: "Mendengarkan Saat Orang Lain Berbicara",
        textCaption: "Mendengarkan dengan baik: tenang, mengangguk, tidak menyela orang bicara.",
        audioNarration: "Saat orang lain bicara, dengarkan dengan tenang and mengangguklah. Jangan memotong atau berteriak ya.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_Mendengar.mp4",
      },
      {
        id: "tg-ks-3",
        order: 3,
        emoji: "🧸",
        textSimple: "Bermain Bersama Teman",
        textCaption: "Belajar bersosialisasi: main bergantian, berbagi mainan, dan ikuti arahan guru.",
        audioNarration: "Bermain bersama sangat seru! Gantian menggunakan mainan, jangan berebut, dan bagilah mainanmu dengan teman.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_Bermain.mp4",
        activity: {
          type: "drag_match",
          question: "Ayo bagikan mainan beruang kepada temanmu!",
          dragItem: { emoji: "🧸", label: "Mainan" },
          targetItem: { emoji: "👧", label: "Teman" }
        }
      },
      {
        id: "tg-ks-4",
        order: 4,
        emoji: "🙏",
        textSimple: "Mengucap Kata 'Tolong'",
        textCaption: "Saat butuh bantuan, katakan dengan sopan: 'Tolong', atau 'Tolong bantu saya'.",
        audioNarration: "Jika kamu kesulitan, mintalah bantuan dengan sopan. Ucapkan kata tolong di awal kalimatmu.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_Tolong.mp4",
      },
      {
        id: "tg-ks-5",
        order: 5,
        emoji: "💖",
        textSimple: "Mengucapkan 'Terima Kasih'",
        textCaption: "Ucapkan 'Terima kasih' or 'Terima kasih sudah membantu' setelah ditolong orang lain.",
        audioNarration: "Setelah ditolong atau diberi sesuatu, jangan lupa tersenyum dan katakan terima kasih.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_Terima kasih.mp4",
      },
      {
        id: "tg-ks-6",
        order: 6,
        emoji: "🥺",
        textSimple: "Mengucapkan 'Maaf'",
        textCaption: "Jika melakukan kesalahan: katakan 'Maaf' atau 'Maaf, saya tidak sengaja'.",
        audioNarration: "Jika kamu tidak sengaja menjatuhkan barang teman atau berbuat salah, segeralah meminta maaf dengan tulus.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_Minta maaf.mp4",
      },
      {
        id: "tg-ks-7",
        order: 7,
        emoji: "🤝",
        textSimple: "Saling Menolong Teman",
        textCaption: "Bantu teman mengambil barang, bantu membereskan kelas, dan temani teman yang sedih.",
        audioNarration: "Anak baik suka menolong. Bantulah teman yang kesulitan mengambil barang atau temani teman yang sedang bersedih.",
        videoClipUrl: "/videos/tunagrahita/keterampilan-sosial/Grahita_Ketrampilan_Sosial_tologn teman.mp4",
      }
    ]
  },
  {
    id: "lesson-karir-1-visual",
    tema: "kesiapan-karir",
    mode: "visual",
    title: "Kesiapan Karir (Tunagrahita)",
    description: "Belajar mengenal minat diri, profesi, sikap bertanggung jawab, bekerja sama, dan berani mencoba.",
    steps: [
      {
        id: "tg-kk-1",
        order: 1,
        emoji: "🎨",
        textSimple: "Aku Mengenal Diri & Minatku",
        textCaption: "Apa yang aku sukai? Menggambar, bernyanyi, berkebun, memasak, atau membersihkan ruangan.",
        audioNarration: "Ayo kenali dirimu! Apakah kamu suka menggambar, bernyanyi, berkebun, atau merapikan barang? Semua kesukaanmu itu hebat!",
        videoClipUrl: "/videos/tunagrahita/kesiapan-diri/Grahita_Ketrampilan_Sosial_kenalidirimu.mp4",
      },
      {
        id: "tg-kk-2",
        order: 2,
        emoji: "👩‍🍳",
        textSimple: "Aku Mengenal Pekerjaan",
        textCaption: "Pekerjaan di sekitar kita: Koki memasak makanan, petani menanam, perajin membuat kerajinan.",
        audioNarration: "Ada banyak pekerjaan bagus: koki membuat makanan lezat, petani menanam padi, dan perajin membuat barang-barang indah.",
        videoClipUrl: "/videos/tunagrahita/kesiapan-diri/Grahita_Ketrampilan_Sosial_Profesi.mp4",
      },
      {
        id: "tg-kk-3",
        order: 3,
        emoji: "⏰",
        textSimple: "Belajar Bertanggung Jawab & Tepat Waktu",
        textCaption: "Latih tanggung jawab: merapikan tempat tidur, bangun pagi, mengikuti jadwal, datang tepat waktu.",
        audioNarration: "Orang hebat selalu tepat waktu dan bertanggung jawab. Mari rapikan tempat tidurmu sendiri dan simpan barang-barangmu dengan rapi.",
        videoClipUrl: "/videos/tunagrahita/kesiapan-diri/Grahita_Ketrampilan_Sosial_bertanggung jawab.mp4",
      },
      {
        id: "tg-kk-4",
        order: 4,
        emoji: "🗣️",
        textSimple: "Berkomunikasi & Bekerja Sama",
        textCaption: "Bicara dengan sopan, mendengarkan, bekerja bersama teman, dan saling membantu.",
        audioNarration: "Saat bekerja kelompok, gunakan kata-kata yang sopan, dengarkan temanmu, dan saling membantu agar pekerjaan terasa ringan.",
        videoClipUrl: "/videos/tunagrahita/kesiapan-diri/Grahita_Ketrampilan_Sosial_bekerja kelompok.mp4",
      },
      {
        id: "tg-kk-5",
        order: 5,
        emoji: "✂️",
        textSimple: "Belajar Keterampilan & Berani Mencoba",
        textCaption: "Belajar keterampilan baru (menggunting, mewarnai, mengemas). Jangan takut salah, coba lagi!",
        audioNarration: "Ayo belajar memotong, mewarnai, menanam bunga, dan mengemas barang. Jika melakukan kesalahan, tidak apa-apa! Coba lagi dan jangan menyerah!",
        videoClipUrl: "/videos/tunagrahita/kesiapan-diri/Grahita_Ketrampilan_Sosial_Janganmenyerah.mp4",
        activity: {
          type: "catch_stars",
          question: "Ayo tangkap bintang cita-citamu!",
          starCount: 3
        }
      }
    ]
  },

  {
    id: "lesson-perawatan-1-suara",
    tema: "perawatan-diri",
    mode: "suara",
    title: "Keterampilan Merawat Diri (Tunanetra)",
    description: "Menjaga kebersihan tubuh, gigi, rambut, kuku, tangan, pakaian, dan belajar mandiri.",
    steps: [
      {
        id: "tn-pd-1",
        order: 1,
        emoji: "🛀",
        textSimple: "Mengenal Merawat Diri",
        textCaption: "Menjaga kebersihan, kesehatan, dan kerapian diri secara teratur sebagai bentuk rasa sayang kepada diri sendiri.",
        audioNarration: "Merawat diri adalah kegiatan menjaga kebersihan dan kesehatan tubuh kita. Tubuh bersih membuat kita sehat, nyaman, dan percaya diri.",
        audioFileUrl: "/Sound/tunanetra/perawatan-diri/Mengenal Merawat Diri.mp3",
        tactileGuidance: "Buka halaman 1 buku fisik CareLife. Raba bentuk hati timbul di tengah halaman sebagai simbol rasa sayang kepada diri sendiri.",
      },
      {
        id: "tn-pd-2",
        order: 2,
        emoji: "🚿",
        textSimple: "Langkah Mandi yang Benar",
        textCaption: "Basahi seluruh tubuh ➡️ gunakan sabun merata ➡️ bilas air mengalir ➡️ keringkan tubuh dengan handuk.",
        audioNarration: "Mandilah secara teratur pagi dan sore. Basahi tubuh, gosok seluruh badan dengan sabun, bilas sampai bersih, lalu lap dengan handuk kering.",
        audioFileUrl: "/Sound/tunanetra/perawatan-diri/Langkah Mandi yang Benar.mp3",
        tactileGuidance: "Di halaman 2, raba garis-garis halus vertikal di sisi kiri yang melambangkan air mengalir dari shower.",
      },
      {
        id: "tn-pd-3",
        order: 3,
        emoji: "🪥",
        textSimple: "Menyikat Gigi Teratur",
        textCaption: "Menyikat gigi dua kali sehari (setelah sarapan & sebelum tidur) agar gigi sehat dan mulut segar.",
        audioNarration: "Sikat gigimu setelah makan pagi and sebelum tidur. Sikat bagian depan, samping, belakang gigi, dan bersihkan lidah, lalu berkumurlah.",
        audioFileUrl: "/Sound/tunanetra/perawatan-diri/Menyikat Gigi Teratur.mp3",
        tactileGuidance: "Di halaman 3, temukan bentuk sikat gigi timbul dengan bulu sikat bertekstur kasar.",
      },
      {
        id: "tn-pd-4",
        order: 4,
        emoji: "🧼",
        textSimple: "Menjaga Kebersihan Rambut",
        textCaption: "Keramas teratur menggunakan sampo, pijat kulit kepala lembut, bilas bersih, dan rapikan rambut.",
        audioNarration: "Cucilah rambutmu dengan sampo secara teratur. Pijat kulit kepala secara lembut, bilas bersih, lalu lap dengan handuk.",
        audioFileUrl: "/Sound/tunanetra/perawatan-diri/Menjaga Kebersihan Rambut.mp3",
        tactileGuidance: "Di halaman 4, raba bentuk gelembung-gelembung timbul kecil di bagian atas yang melambangkan busa sampo.",
      },
      {
        id: "tn-pd-5",
        order: 5,
        emoji: "🤲",
        textSimple: "Kebersihan Tangan dan Kuku",
        textCaption: "Cuci tangan pakai sabun sebelum makan/dari toilet. Potong kuku secara teratur agar terhindar kuman.",
        audioNarration: "Tangan mudah kotor. Basahi tangan, gunakan sabun, gosok telapak tangan, punggung tangan, sela jari, bilas dan keringkan. Potong kuku secara teratur.",
        audioFileUrl: "/Sound/tunanetra/perawatan-diri/Kebersihan Tangan dan Kuku.mp3",
        tactileGuidance: "Di halaman 5, temukan bentuk dua telapak tangan timbul yang saling berhadapan.",
      },
      {
        id: "tn-pd-6",
        order: 6,
        emoji: "👕",
        textSimple: "Memakai Pakaian Bersih & Rapi",
        textCaption: "Ganti pakaian bersih setiap hari, letakkan baju kotor di tempatnya, dan simpan pakaian rapi di lemari.",
        audioNarration: "Pakailah pakaian bersih setiap selesai mandi agar nyaman. Letakkan baju kotor di keranjang dan simpan baju bersih di lemari.",
        audioFileUrl: "/Sound/tunanetra/perawatan-diri/Memakai Pakaian Bersih & Rapi.mp3",
        tactileGuidance: "Di halaman 6, raba bentuk kerah baju timbul di bagian tengah halaman.",
      }
    ]
  },
  {
    id: "lesson-perlindungan-1-suara",
    tema: "perlindungan-diri",
    mode: "suara",
    title: "Perlindungan Diri (Tunanetra)",
    description: "Mengenali hak keamanan, perbedaan sentuhan aman/tidak aman, berani menolak, dan mencari bantuan.",
    steps: [
      {
        id: "tn-pld-1",
        order: 1,
        emoji: "🛡️",
        textSimple: "Mengenal Hak Keamanan & Tubuh Berharga",
        textCaption: "Setiap anak berhak aman. Bagian tubuh pribadi (ditutup pakaian dalam) tidak boleh disentuh orang lain.",
        audioNarration: "Tubuhmu berharga dan kamu berhak hidup aman. Bagian tubuh yang ditutup pakaian dalam adalah area pribadi yang tidak boleh dilihat atau disentuh orang lain.",
        audioFileUrl: "/Sound/tunanetra/perlindungan-diri/Mengenal Hak Keamanan & Tubuh Berharga.mp3",
        tactileGuidance: "Raba halaman 7 buku fisik CareLife. Temukan garis tepi tebal yang melambangkan batas pelindung tubuhmu.",
      },
      {
        id: "tn-pld-2",
        order: 2,
        emoji: "🙅‍♂️",
        textSimple: "Mengenal Sentuhan Aman & Tidak Aman",
        textCaption: "Sentuhan aman: membantu menjaga. Sentuhan tidak aman: membuat takut, malu, atau menyentuh area pribadi.",
        audioNarration: "Sentuhan aman adalah sentuhan baik yang membantu kita. Sentuhan tidak aman membuat kita tidak nyaman. Ingat, kamu berhak menolak sentuhan tidak aman.",
        audioFileUrl: "/Sound/tunanetra/perlindungan-diri/Mengenal Sentuhan Aman & Tidak Aman.mp3",
        tactileGuidance: "Di halaman 8, temukan simbol lingkaran timbul halus untuk sentuhan aman, dan simbol silang (X) kasar untuk tidak aman.",
      },
      {
        id: "tn-pld-3",
        order: 3,
        emoji: "🗣️",
        textSimple: "Berani Mengatakan Tidak",
        textCaption: "Katakan 'TIDAK' atau 'Tidak, saya tidak mau' jika ada orang asing memaksa atau mengajak pergi tanpa izin.",
        audioNarration: "Mengatakan tidak adalah cara menjaga diri. Katakan dengan tegas: Tidak, saya tidak mau! jika merasa terancam, lalu segera menjauh.",
        audioFileUrl: "/Sound/tunanetra/perlindungan-diri/Berani Mengatakan Tidak.mp3",
        tactileGuidance: "Di halaman 9, temukan bentuk tanda seru (!) besar yang menonjol tegas di tengah halaman.",
      },
      {
        id: "tn-pld-4",
        order: 4,
        emoji: "👨‍👩‍👧‍👦",
        textSimple: "Langkah Penyelamatan Diri",
        textCaption: "Saat terancam: BERHENTI ➡️ MENJAUH ke tempat aman ➡️ BERSUARA panggil bantuan ➡️ BERCERITA ke Ayah/Ibu/Guru.",
        audioNarration: "Jika merasa terancam, lakukan empat langkah: Berhenti, Menjauh ke dekat orang dewasa, Bersuara panggil bantuan, dan Bercerita sejujurnya kepada Ayah, Ibu, atau Guru.",
        audioFileUrl: "/Sound/tunanetra/perlindungan-diri/Langkah Penyelamatan Diri.mp3",
        tactileGuidance: "Di halaman 10, raba bentuk timbul menyerupai rumah hangat yang melambangkan tempat perlindungan aman.",
      }
    ]
  },
  {
    id: "lesson-sosial-1-suara",
    tema: "keterampilan-sosial",
    mode: "suara",
    title: "Keterampilan Sosial (Tunanetra)",
    description: "Belajar menyapa ramah, mendengarkan, memperkenalkan diri, berteman, kerja sama, dan meminta tolong.",
    steps: [
      {
        id: "tn-ks-1",
        order: 1,
        emoji: "👋",
        textSimple: "Menyapa Orang Lain dengan Ramah",
        textCaption: "Katakan salam seperti 'Selamat pagi' dengan sopan untuk memulai interaksi dan berteman.",
        audioNarration: "Menyapa adalah cara memulai pertemanan yang ramah. Ucapkan salam dengan suara sopan saat bertemu guru atau teman.",
        audioFileUrl: "/Sound/tunanetra/keterampilan-sosial/Menyapa Orang Lain dengan Ramah.mp3",
        tactileGuidance: "Buka halaman 11. Raba bentuk tangan timbul melambangkan lambaian sapaan ramah.",
      },
      {
        id: "tn-ks-2",
        order: 2,
        emoji: "👂",
        textSimple: "Mendengarkan Saat Orang Lain Berbicara",
        textCaption: "Hargai teman: tidak memotong pembicaraan, dengarkan isi obrolan, dan berikan tanggapan sesuai.",
        audioNarration: "Menjadi pendengar yang baik adalah bentuk rasa hormat. Tunggu teman selesai bicara sebelum kamu menanggapinya.",
        audioFileUrl: "/Sound/tunanetra/keterampilan-sosial/Mendengarkan Saat Orang Lain Berbicara.mp3",
        tactileGuidance: "Di halaman 12, temukan bentuk daun telinga timbul di sisi kanan halaman.",
      },
      {
        id: "tn-ks-3",
        order: 3,
        emoji: "😊",
        textSimple: "Memperkenalkan Diri & Berteman",
        textCaption: "Sebutkan namamu dengan ramah. Berteman dengan jujur, sopan, mau berbagi, dan peduli.",
        audioNarration: "Perkenalkan namamu dengan ramah agar teman mengenalmu. Jadilah teman yang baik dengan jujur dan peduli.",
        audioFileUrl: "/Sound/tunanetra/keterampilan-sosial/Memperkenalkan Diri & Berteman.mp3",
        tactileGuidance: "Di halaman 13, temukan bentuk kotak timbul mulus di tengah tempat menempelkan kartu nama.",
      },
      {
        id: "tn-ks-4",
        order: 4,
        emoji: "🤝",
        textSimple: "Bekerja Sama & Meminta Tolong",
        textCaption: "Saling membantu, bekerja sama dalam kelompok. Ucapkan 'Tolong' saat butuh dan 'Terima kasih' setelahnya.",
        audioNarration: "Bekerja sama membuat pekerjaan lebih mudah. Mintalah tolong dengan sopan, dan jangan lupa ucapkan terima kasih setelah dibantu.",
        audioFileUrl: "/Sound/tunanetra/keterampilan-sosial/Bekerja Sama & Meminta Tolong.mp3",
        tactileGuidance: "Di halaman 14, raba dua bentuk tangan timbul yang saling menggenggam atau menjabat erat.",
      }
    ]
  },
  {
    id: "lesson-karir-1-suara",
    tema: "kesiapan-karir",
    mode: "suara",
    title: "Kesiapan Karir (Tunanetra)",
    description: "Mempersiapkan masa depan, mengenal minat bakat, disiplin bertanggung jawab, dan percaya diri.",
    steps: [
      {
        id: "tn-kk-1",
        order: 1,
        emoji: "🌟",
        textSimple: "Mengenal Minat dan Bakat",
        textCaption: "Cari tahu hal yang disukai (bicara, musik, kerajinan) untuk dikembangkan menjadi potensi masa depan.",
        audioNarration: "Masa depan indah dimulai dengan mengenal dirimu. Temukan apa yang kamu sukai, seperti musik atau wirausaha, lalu latih bakatmu.",
        audioFileUrl: "/Sound/tunanetra/kesiapan-karir/Mengenal Minat dan Bakat.mp3",
        tactileGuidance: "Buka halaman 15. Raba bentuk bintang bersudut lima yang timbul melambangkan cita-cita.",
      },
      {
        id: "tn-kk-2",
        order: 2,
        emoji: "💼",
        textSimple: "Mengenal Dunia Kerja",
        textCaption: "Ada banyak profesi: Pendidikan (guru/dosen), Seni (musisi/pengisi suara), Wirausaha (usaha kerajinan/kuliner).",
        audioNarration: "Ada banyak pekerjaan hebat: guru yang mengajar, musisi yang menghibur, atau wirausaha mandiri. Semua bisa diraih.",
        audioFileUrl: "/Sound/tunanetra/kesiapan-karir/Mengenal Dunia Kerja.mp3",
        tactileGuidance: "Di halaman 16, raba bentuk timbul menyerupai tas koper kerja di bagian bawah halaman.",
      },
      {
        id: "tn-kk-3",
        order: 3,
        emoji: "⏰",
        textSimple: "Belajar Bertanggung Jawab & Disiplin",
        textCaption: "Biasakan datang tepat waktu, menyelesaikan tugas, menjaga kerapian, dan tidak mudah menyerah.",
        audioNarration: "Disiplin dan tanggung jawab adalah bekal kerja yang penting. Datanglah tepat waktu dan selesaikan tugasmu dengan baik.",
        audioFileUrl: "/Sound/tunanetra/kesiapan-karir/Belajar Bertanggung Jawab & Disiplin.mp3",
        tactileGuidance: "Di halaman 17, temukan bentuk lingkaran jam dinding timbul dengan jarum jam menunjuk angka 12.",
      },
      {
        id: "tn-kk-4",
        order: 4,
        emoji: "🗣️",
        textSimple: "Komunikasi & Percaya Diri",
        textCaption: "Berani mencoba hal baru, berkomunikasi dengan santun, dan hargai pencapaian kecil diri sendiri.",
        audioNarration: "Berkomunikasilah dengan sopan. Percayalah pada dirimu sendiri bahwa kamu mampu belajar dan berani mencoba hal baru.",
        audioFileUrl: "/Sound/tunanetra/kesiapan-karir/Komunikasi & Percaya Diri.mp3",
        tactileGuidance: "Di halaman 18, raba tekstur garis melengkung bergelombang timbul melambangkan suara yang terpancar.",
      }
    ]
  }
];



export function getLessonByTema(tema: Tema, mode: Mode): LessonContent | undefined {
  return LESSON_CONTENT.find((l) => l.tema === tema && l.mode === mode);
}

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
