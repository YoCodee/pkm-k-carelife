"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Send, Loader2, X } from "lucide-react";
import { SUGGESTED_QUESTIONS, STATIC_QA } from "@/lib/gemini";
import type { ChatMessage } from "@/lib/gemini";

function ChatContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getStaticAnswer = (question: string): string | null => {
    return STATIC_QA[question] || null;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    const staticAnswer = getStaticAnswer(currentInput);
    if (staticAnswer) {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 600));
      setMessages((prev) => [
        ...prev,
        { role: "assistant" as const, content: staticAnswer },
      ]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { role: "assistant" as const, content: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant" as const,
            content:
              "Maaf, layanan AI sedang tidak tersedia saat ini. Silakan coba pertanyaan yang sudah disediakan di atas ya! 😊",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content:
            "Maaf, layanan AI sedang tidak tersedia saat ini. Silakan coba pertanyaan yang sudah disediakan di atas ya! 😊",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedClick = (question: string) => {
    setInput(question);
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement;
      if (form) form.requestSubmit();
    }, 100);
  };

  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {i > 0 && <br />}
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="font-black">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={j}>{part}</span>;
          })}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-10 lg:px-16 bg-[#F8F9FA]">
      <div className="max-w-[900px] mx-auto h-[calc(100vh-200px)] md:h-[calc(100vh-160px)] flex flex-col">
        <div className="bg-white border-2 border-[#1A1A1A] rounded-[32px] shadow-[4px_4px_0_#1A1A1A] flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#66B2B2] text-white p-6 md:p-8 rounded-t-[30px] relative overflow-hidden border-b-2 border-[#1A1A1A]">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#A8E6CF] rounded-full blur-3xl opacity-40"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-[#FFB6B6] rounded-full blur-3xl opacity-30"></div>
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h1 className="text-2xl md:text-3xl font-black">🤖 Tanya CareLife AI</h1>
                <p className="text-white/80 font-bold text-sm mt-1">
                  Asisten virtual untuk pendidikan ABK
                </p>
              </div>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  className="bg-[#FFB6B6] p-2.5 rounded-[14px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all text-[#1A1A1A]"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-4 bg-[#F8F9FA]">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="text-[64px] mb-4">💬</div>
                <h2 className="text-xl md:text-2xl font-black mb-2 text-[#1A1A1A]">
                  Mulai Percakapan
                </h2>
                <p className="text-sm font-bold text-[#6B7280] mb-8">
                  Klik pertanyaan di bawah untuk mendapatkan jawaban
                </p>
                <div className="w-full max-w-xl">
                  <p className="text-xs font-black text-[#6B7280] mb-4 uppercase tracking-widest">
                    Pilih pertanyaan:
                  </p>
                  <div className="space-y-3 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedClick(q)}
                        className="w-full text-left p-4 bg-white border-2 border-[#1A1A1A] rounded-[16px] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] hover:bg-[#FFD700]/20 transition-all text-sm font-bold text-[#1A1A1A]"
                      >
                        &ldquo;{q}&rdquo;
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.length > 0 && messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 pb-2">
                {SUGGESTED_QUESTIONS.filter(
                  (q) => !messages.some((m) => m.content === q)
                ).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestedClick(q)}
                    className="text-xs font-bold text-[#1A1A1A] bg-[#A8E6CF] border-2 border-[#1A1A1A] px-3 py-1.5 rounded-full shadow-[1px_1px_0_#1A1A1A] hover:bg-[#FFD700] transition-colors"
                  >
                    {q.length > 40 ? q.slice(0, 40) + "..." : q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] px-5 py-3.5 rounded-[20px] border-2 border-[#1A1A1A] ${
                    msg.role === "user"
                      ? "bg-[#66B2B2] text-white shadow-[2px_2px_0_#1A1A1A] rounded-br-[8px]"
                      : "bg-white text-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] rounded-bl-[8px]"
                  }`}
                >
                  <div className="text-sm font-bold leading-relaxed">
                    {renderContent(msg.content)}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-[#1A1A1A] px-5 py-3.5 rounded-[20px] rounded-bl-[8px] flex items-center gap-2 shadow-[2px_2px_0_#1A1A1A]">
                  <Loader2 size={16} className="animate-spin text-[#66B2B2]" />
                  <span className="text-sm font-bold text-[#6B7280]">Berpikir...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form id="chat-form" onSubmit={handleSendMessage} className="p-4 md:p-6 border-t-2 border-[#1A1A1A]/10 bg-white">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan..."
                disabled={loading}
                className="flex-1 px-5 py-3.5 bg-[#F8F9FA] border-2 border-[#1A1A1A] rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#66B2B2]/30 font-bold text-sm text-[#1A1A1A] placeholder:text-[#6B7280] transition-all"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-[#FFD700] hover:bg-[#F5C800] disabled:bg-[#E5E7EB] text-[#1A1A1A] px-5 py-3.5 rounded-[20px] border-2 border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] disabled:shadow-none disabled:border-[#D1D5DB] transition-all"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </form>

          {/* Disclaimer */}
          <div className="bg-[#FFD700]/30 border-t-2 border-[#1A1A1A]/10 p-4 rounded-b-[30px]">
            <p className="text-xs font-bold text-[#1A1A1A] text-center">
              ⚠️ AI bukan pengganti profesional medis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
