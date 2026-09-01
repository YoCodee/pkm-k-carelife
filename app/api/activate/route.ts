import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { isValidActivationCode } from "@/lib/activation";

// Gunakan Edge Runtime — lebih ringan, tidak ada batas bundle size seperti serverless
export const runtime = "edge";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code: string = (body.code ?? "").toString().toUpperCase().trim();

    // 1. Validasi format & checksum lokal (cepat, tanpa hit DB)
    if (!isValidActivationCode(code)) {
      return NextResponse.json(
        {
          error:
            "Kode tidak valid! Pastikan format benar (contoh: CL-1234) dan sesuai dengan buku.",
        },
        { status: 400 }
      );
    }

    const key = `activation:${code}`;

    // 2. Cek apakah kode sudah pernah dipakai
    const isUsed = await redis.get(key);

    if (isUsed) {
      return NextResponse.json(
        {
          error:
            "Kode sudah pernah digunakan! Setiap kode hanya dapat dipakai satu kali.",
        },
        { status: 409 }
      );
    }

    // 3. Tandai kode sebagai sudah dipakai (permanent, tidak expire)
    await redis.set(key, "used");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[activate] Unexpected error:", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
