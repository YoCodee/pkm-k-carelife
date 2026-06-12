import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
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

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages format" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process message" },
      { status: 500 },
    );
  }
}
