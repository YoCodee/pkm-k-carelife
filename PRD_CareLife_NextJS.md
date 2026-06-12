# PRD — CareLife Web Application
**Product Requirements Document**
Version 1.0 | Juni 2026

---

## 1. Overview

**CareLife** adalah aplikasi web berbasis Next.js yang merupakan platform digital pendamping dari produk buku interaktif fisik CareLife — buku 4-in-1 untuk Anak Berkebutuhan Khusus (ABK) penyandang tunanetra, tunarungu, dan tunagrahita usia 10–15 tahun.

Aplikasi ini diakses via QR Code yang tercetak di buku fisik, menyajikan konten video edukasi multisensorial, dan dilengkapi AI Chat berbasis **Gemini Flash 2.5** untuk membantu orang tua, guru, dan terapis dalam mendampingi proses belajar ABK.

---

## 2. Tujuan Produk

- Menyediakan konten video edukasi digital yang dapat diakses via QR Code dari buku fisik CareLife
- Menampilkan konten yang dapat disesuaikan berdasarkan jenis kebutuhan khusus (tunanetra, tunarungu, tunagrahita)
- Menyediakan AI Chat (Gemini Flash 2.5) sebagai asisten virtual untuk orang tua, guru, dan terapis
- Mendukung aksesibilitas: mode audio untuk tunanetra, animasi bahasa isyarat (JBI) untuk tunarungu, kontrol kecepatan video untuk tunagrahita
- Mendukung pemasaran dan penjualan produk buku fisik CareLife

---

## 3. Target Pengguna

| Pengguna | Kebutuhan Utama |
|---|---|
| Orang tua ABK | Panduan mendampingi anak belajar di rumah |
| Guru SLB / Sekolah Inklusif | Materi ajar digital yang siap pakai |
| Terapis anak | Referensi media terapi berbasis tema |
| ABK (tunagrahita ringan) | Konten video interaktif yang simpel |

---

## 4. Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| AI Chat | Google Gemini Flash 2.5 API (`@google/generative-ai`) |
| Video Player | Native HTML5 / react-player |
| Animasi | Framer Motion |
| State Management | Zustand atau React Context |
| Database (opsional) | Supabase (untuk log chat, statistik akses) |
| Deployment | Vercel |
| Domain | `.my.id` (sesuai proposal) |

---

## 5. Struktur Halaman (Sitemap)

```
/                        → Landing Page (Homepage)
/menu                    → Menu Utama (pilih mode pengguna)
/learn                   → Halaman Pemilihan Tema & Jenis ABK
/learn/[tema]/[mode]     → Halaman Video Player + Konten
  tema: perawatan-diri | perlindungan-diri | keterampilan-sosial | kesiapan-karir
  mode: visual | suara | ceria (tunanetra | tunarungu | tunagrahita)
/chat                    → AI Chat dengan Gemini Flash 2.5
/about                   → Tentang CareLife
/beli                    → Halaman Pembelian / CTA Produk Fisik
```

---

## 6. Detail Halaman

### 6.1 Landing Page (`/`)

**Tujuan:** Memperkenalkan CareLife, mendorong akses konten dan pembelian buku.

**Komponen:**
- Hero section dengan logo CareLife, tagline *"Dunia Bermain dan Belajar yang Ramah, Aman, dan Seru"*
- Tombol CTA: **"Mulai Belajar"** → `/menu` dan **"Beli Buku"** → `/beli`
- Section fitur unggulan (4 kartu): Perawatan Diri, Perlindungan Diri, Keterampilan Sosial, Kesiapan Karir
- Section "Kenapa CareLife?" — highlight aksesibilitas (Braille, JBI, kontrol kecepatan)
- Section survei/testimoni singkat (76% responden berminat)
- Footer dengan link media sosial (Instagram: `carelife.official`, TikTok: `@carelife_officia`)

---

### 6.2 Menu Utama (`/menu`)

**Tujuan:** Pengguna memilih mode akses sesuai jenis kebutuhan anak.

**Komponen:**
- 3 kartu pilihan mode besar dengan ikon:
  - 🎨 **Dunia Visual** — untuk tunagrahita (teks + visual sederhana)
  - 🔊 **Dunia Suara** — untuk tunanetra (audio narasi utama)
  - 🤟 **Dunia Ceria** — untuk tunarungu (animasi JBI / bahasa isyarat)
- Setelah memilih mode, diarahkan ke `/learn` dengan query param `?mode=visual|suara|ceria`

---

### 6.3 Halaman Belajar - Pilih Tema (`/learn`)

**Tujuan:** Pengguna memilih tema materi yang ingin dipelajari.

**Komponen:**
- Header menampilkan mode yang dipilih (misal: "Mode Dunia Visual")
- 4 kartu tema:
  1. 🛁 **Keterampilan Merawat Diri** — kebersihan, kesehatan tubuh
  2. 🛡️ **Perlindungan Diri** — bullying, keselamatan
  3. 🤝 **Keterampilan Sosial** — komunikasi, kerja sama
  4. 💼 **Kesiapan Karir** — minat, bakat, dunia kerja
- Klik kartu → navigasi ke `/learn/[tema]/[mode]`

---

### 6.4 Halaman Video Player (`/learn/[tema]/[mode]`)

**Tujuan:** Menampilkan konten video edukasi sesuai tema dan mode pengguna.

**Komponen:**

**Video Player Area:**
- Pemutar video HTML5 responsif
- Tombol Play / Pause / Next / Previous
- **Khusus mode `suara` (tunanetra):** autoplay audio, deskripsi teks tersembunyi, narasi audio aktif
- **Khusus mode `ceria` (tunarungu):** tampilkan overlay animasi JBI (LottieFiles) di pojok video
- **Khusus mode `visual` (tunagrahita):** tombol kontrol kecepatan video (0.5x / 0.75x / 1x / 1.25x) + tombol Pause besar

**Sidebar / Panel Info:**
- Judul video & deskripsi singkat
- Navigasi antar sub-topik dalam tema
- Progress indikator

**Tombol AI Chat:**
- Floating button `💬 Tanya AI` di pojok kanan bawah → membuka drawer/modal AI Chat

---

### 6.5 AI Chat — Gemini Flash 2.5 (`/chat`)

**Tujuan:** Membantu orang tua, guru, terapis bertanya seputar cara mendampingi ABK, materi dalam buku, atau pertanyaan umum tentang pendidikan inklusif.

**Spesifikasi Teknis:**

```javascript
// Model yang digunakan
model: "gemini-2.5-flash"

// System prompt
const systemPrompt = `
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
```

**Komponen UI:**
- Header: "Tanya CareLife AI 🤖"
- Area pesan (scroll, bubble chat)
- Input teks + tombol Kirim
- Indikator loading (typing animation)
- Tombol "Pertanyaan Cepat" (suggested questions):
  - *"Bagaimana cara mengajarkan kebersihan diri pada anak tunagrahita?"*
  - *"Apa saja tanda-tanda bullying pada anak tunarungu?"*
  - *"Bagaimana memperkenalkan konsep karir pada ABK?"*
  - *"Cara menggunakan buku CareLife di rumah?"*
- Tombol Clear Chat
- Disclaimer kecil: *"AI ini bukan pengganti dokter atau psikolog profesional."*

**Implementasi API:**
```javascript
// /app/api/chat/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const chat = model.startChat({
    history: messages.slice(0, -1).map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
  });

  const result = await chat.sendMessage(messages.at(-1).content);
  return Response.json({ reply: result.response.text() });
}
```

---

### 6.6 Halaman Tentang (`/about`)

**Konten:**
- Tentang produk CareLife dan misi inklusif
- Tim pengembang (Universitas Teknologi Yogyakarta)
- Informasi PKM-K 2026
- Link ke media sosial

---

### 6.7 Halaman Beli (`/beli`)

**Tujuan:** Mendorong pembelian buku fisik CareLife.

**Komponen:**
- Foto produk box set CareLife
- Harga: **Rp 199.900**
- Deskripsi isi: buku visual + buku Braille + QR Code website
- Tombol beli ke marketplace (Tokopedia / Shopee — placeholder)
- Kontak via WhatsApp
- Testimoni / hasil survei (76% berminat)

---

## 7. Aksesibilitas (A11y)

| Fitur | Implementasi |
|---|---|
| Mode Tunanetra | `aria-label` pada semua elemen, narasi audio autoplay, keyboard navigation |
| Mode Tunarungu | Overlay animasi JBI (LottieFiles), subtitle/caption pada video |
| Mode Tunagrahita | Font besar, warna kontras tinggi, tombol besar, kontrol kecepatan video |
| Umum | `lang="id"` pada HTML, semantic HTML5, focus indicators |

---

## 8. Struktur Folder Project

```
carelife-web/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── menu/
│   │   └── page.tsx              # Menu utama (pilih mode)
│   ├── learn/
│   │   ├── page.tsx              # Pilih tema
│   │   └── [tema]/
│   │       └── [mode]/
│   │           └── page.tsx      # Video player
│   ├── chat/
│   │   └── page.tsx              # AI Chat
│   ├── about/
│   │   └── page.tsx
│   ├── beli/
│   │   └── page.tsx
│   └── api/
│       └── chat/
│           └── route.ts          # Gemini API endpoint
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── TestimonialSection.tsx
│   ├── learn/
│   │   ├── ModeSelector.tsx
│   │   ├── ThemeCard.tsx
│   │   └── VideoPlayer.tsx
│   ├── chat/
│   │   ├── ChatWindow.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── ChatInput.tsx
│   │   └── SuggestedQuestions.tsx
│   └── accessibility/
│       ├── JBIOverlay.tsx        # Animasi bahasa isyarat
│       ├── AudioNarrator.tsx     # Narasi untuk tunanetra
│       └── SpeedControl.tsx     # Kontrol kecepatan video
├── lib/
│   ├── gemini.ts                 # Konfigurasi Gemini client
│   ├── content.ts                # Data konten video & tema
│   └── utils.ts
├── public/
│   ├── videos/                   # Video konten (atau URL eksternal)
│   ├── images/
│   │   ├── logo-carelife.png
│   │   └── product/
│   └── lottie/                   # File animasi JBI
├── styles/
│   └── globals.css
├── .env.local                    # GEMINI_API_KEY
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 9. Konten — Data Structure

```typescript
// lib/content.ts

export type Mode = "visual" | "suara" | "ceria";
export type Tema = "perawatan-diri" | "perlindungan-diri" | "keterampilan-sosial" | "kesiapan-karir";

export interface VideoContent {
  id: string;
  title: string;
  description: string;
  tema: Tema;
  mode: Mode;
  videoUrl: string;         // URL video (lokal atau CDN)
  audioUrl?: string;        // Khusus mode suara (tunanetra)
  jbiLottieUrl?: string;    // Khusus mode ceria (tunarungu)
  thumbnail: string;
  duration: number;         // detik
  subtitles?: string;       // URL file .vtt
}

export const TEMA_LIST = [
  {
    id: "perawatan-diri",
    label: "Keterampilan Merawat Diri",
    emoji: "🛁",
    description: "Kebersihan diri, kesehatan tubuh, dan kemandirian sehari-hari",
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
    label: "Dunia Visual",
    icon: "👁️",
    description: "Untuk anak tunagrahita — visual jelas, kecepatan dapat diatur",
    color: "bg-orange-100",
  },
  {
    id: "suara",
    label: "Dunia Suara",
    icon: "🔊",
    description: "Untuk anak tunanetra — narasi audio, panduan suara",
    color: "bg-blue-100",
  },
  {
    id: "ceria",
    label: "Dunia Ceria",
    icon: "🤟",
    description: "Untuk anak tunarungu — animasi bahasa isyarat (JBI)",
    color: "bg-pink-100",
  },
];
```

---

## 10. Environment Variables

```env
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_SITE_URL=https://carelife.my.id
NEXT_PUBLIC_APP_NAME=CareLife
```

---

## 11. Dependencies (package.json)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "@google/generative-ai": "^0.21.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "react-player": "^2.16.0",
    "lottie-react": "^2.4.0",
    "zustand": "^4.5.0",
    "lucide-react": "^0.400.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/react": "^18.3.0",
    "@types/node": "^20.12.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
```

---

## 12. Desain Visual

### Palet Warna (sesuai identitas CareLife)
```css
:root {
  --carelife-primary: #FF6B35;     /* Oranye hangat — warna utama */
  --carelife-secondary: #4ECDC4;   /* Teal — aksen */
  --carelife-accent: #FFE66D;      /* Kuning cerah — highlight */
  --carelife-dark: #2C3E50;        /* Teks gelap */
  --carelife-light: #F8F9FA;       /* Background terang */
  --carelife-green: #55A630;       /* Hijau — positif/sukses */
}
```

### Tipografi
- **Heading:** `Nunito` (Google Fonts) — ramah, bulat, cocok untuk anak
- **Body:** `Inter` atau `Plus Jakarta Sans`
- **Ukuran minimum body:** 16px (aksesibilitas)

### Prinsip Desain
- Warna kontras tinggi (WCAG AA minimum)
- Tombol besar (min. 44x44px touch target)
- Ikon + label teks (tidak hanya ikon saja)
- Animasi halus, tidak berkedip berlebihan (ramah epilepsi)
- Gambar karakter anak inklusif dan beragam

---

## 13. Fitur Aksesibilitas per Mode

### Mode Visual (Tunagrahita)
- [ ] Kontrol kecepatan video: 0.5x, 0.75x, 1x, 1.25x
- [ ] Tombol Pause ekstra besar di tengah layar
- [ ] Font size lebih besar (18px minimum)
- [ ] Instruksi teks simpel dan pendek
- [ ] Progress bar visual yang jelas

### Mode Suara (Tunanetra)
- [ ] Screen reader friendly (semua elemen ada `aria-label`)
- [ ] Keyboard navigation penuh (Tab, Enter, Arrow keys)
- [ ] Audio narasi otomatis saat halaman dimuat
- [ ] Deskripsi audio untuk setiap konten visual
- [ ] Skip navigation link

### Mode Ceria (Tunarungu)
- [ ] Overlay animasi JBI (Juru Bahasa Isyarat) via LottieFiles
- [ ] Subtitle/caption otomatis pada video
- [ ] Visual-first interface
- [ ] Tombol toggle animasi JBI (on/off)

---

## 14. Halaman 404 Custom

Tampilkan karakter CareLife yang lucu dengan pesan ramah:
*"Ups! Halaman ini tidak ditemukan. Yuk kembali ke halaman utama!"*

---

## 15. Milestone Development

| Fase | Fitur | Estimasi |
|---|---|---|
| **Fase 1** | Setup project, Landing page, Menu utama | Week 1 |
| **Fase 2** | Halaman Learn (pilih tema + video player) | Week 2 |
| **Fase 3** | AI Chat Gemini Flash 2.5 | Week 2-3 |
| **Fase 4** | Fitur aksesibilitas (3 mode) | Week 3-4 |
| **Fase 5** | Halaman About, Beli, Polish UI | Week 4 |
| **Fase 6** | Testing, deployment ke Vercel + domain `.my.id` | Week 4-5 |

---

## 16. Catatan Tambahan

- Video konten bisa dihost di YouTube (unlisted) atau Cloudflare R2 untuk hemat biaya
- Animasi JBI menggunakan LottieFiles (sesuai anggaran proposal Rp 100.000)
- API Gemini Flash 2.5 menggunakan free tier dulu, kemudian upgrade jika diperlukan
- Gunakan `next/image` untuk semua gambar (optimasi otomatis)
- Aktifkan `next/font` untuk Google Fonts (performa lebih baik)
- Gunakan `generateMetadata` di setiap halaman untuk SEO

---

*Dokumen ini dibuat berdasarkan Proposal PKM-K CareLife — Universitas Teknologi Yogyakarta, 2026.*
*Tim: Didik Risky Nugraha (Ketua), Haura Dzii Fadhlin Effendi, Farezal Rifky, Mukhtar Fadhlurrahman*
*Dosen Pendamping: Yanies Novira Soedarmadi, S.Psi., M.Psi., Psikolog*
