import {
  LESSON_CONTENT,
  type Mode,
  type Tema,
} from "@/lib/content";
import LearnDetailClient from "./LearnDetailClient";

interface PageProps {
  params: Promise<{
    tema: string;
    mode: string;
  }>;
}

import { Suspense } from "react";

export default async function LearnDetailPage({ params }: PageProps) {
  const { tema, mode } = await params;
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-[#1A1A1A] font-bold">Memuat...</div>}>
      <LearnDetailClient tema={tema as Tema} mode={mode as Mode} />
    </Suspense>
  );
}

export function generateStaticParams() {
  return LESSON_CONTENT.map((lesson) => ({
    tema: lesson.tema,
    mode: lesson.mode,
  }));
}
