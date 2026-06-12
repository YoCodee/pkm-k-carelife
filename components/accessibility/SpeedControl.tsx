"use client";

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

export default function SpeedControl({
  speed,
  onSpeedChange,
}: SpeedControlProps) {
  const speeds = [0.5, 0.75, 1, 1.25];

  return (
    <div className="bg-[#F8F9FA] border-2 border-[#1A1A1A] rounded-[16px] p-4 shadow-[2px_2px_0_#1A1A1A]">
      <p className="text-sm font-bold text-[#1A1A1A] mb-3">
        ⚙️ Kontrol Kecepatan Video
      </p>
      <div className="flex gap-2 flex-wrap">
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => onSpeedChange(s)}
            className={`px-4 py-2 rounded-[12px] font-bold transition-all border-2 ${
              speed === s
                ? "bg-[#66B2B2] text-white border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]"
                : "bg-white text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#FFD700]/30"
            }`}
          >
            {s}x
          </button>
        ))}
      </div>
      <p className="text-xs text-[#6B7280] mt-3 font-bold">
        Kecepatan saat ini: <strong className="text-[#1A1A1A]">{speed}x</strong>
      </p>
    </div>
  );
}
