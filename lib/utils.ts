import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getEmoji(tema: string): string {
  const emojiMap: Record<string, string> = {
    "perawatan-diri": "🛁",
    "perlindungan-diri": "🛡️",
    "keterampilan-sosial": "🤝",
    "kesiapan-karir": "💼",
  };
  return emojiMap[tema] || "📚";
}

export function getModeLabel(mode: string): string {
  const modeMap: Record<string, string> = {
    visual: "Dunia Visual",
    suara: "Dunia Suara",
    ceria: "Dunia Ceria",
  };
  return modeMap[mode] || mode;
}

export function getTemaLabel(tema: string): string {
  const temaMap: Record<string, string> = {
    "perawatan-diri": "Keterampilan Merawat Diri",
    "perlindungan-diri": "Perlindungan Diri",
    "keterampilan-sosial": "Keterampilan Sosial",
    "kesiapan-karir": "Kesiapan Karir",
  };
  return temaMap[tema] || tema;
}
