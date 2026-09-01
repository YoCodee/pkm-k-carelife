"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, X } from "lucide-react";

interface JBIOverlayProps {
  caption?: string;
  jbiVideoUrl?: string;
  primaryVideoRef?: React.RefObject<HTMLVideoElement | null>;
}

interface FingerConfig {
  angle: number; // Angle in degrees (0 is right, -90 is straight up, -180 is left)
  length: number; // Length in pixels
}

const getFingerCoords = (
  baseX: number,
  baseY: number,
  angleDegrees: number,
  length: number,
) => {
  const angleRad = (angleDegrees * Math.PI) / 180;
  return {
    x2: baseX + Math.cos(angleRad) * length,
    y2: baseY + Math.sin(angleRad) * length,
  };
};

const fold = { angle: 90, length: 14 };
const foldThumb = { angle: 0, length: 18 };

const letterConfigs: Record<string, FingerConfig[]> = {
  A: [
    { angle: -90, length: 22 }, // Thumb straight up
    fold, fold, fold, fold
  ],
  B: [
    foldThumb,
    { angle: -90, length: 28 }, // Index
    { angle: -90, length: 30 }, // Middle
    { angle: -90, length: 28 }, // Ring
    { angle: -90, length: 24 }, // Pinky
  ],
  C: [
    { angle: -135, length: 20 }, // Thumb curved
    { angle: -135, length: 22 }, // Index curved
    { angle: -135, length: 22 }, // Middle curved
    { angle: -135, length: 22 }, // Ring curved
    { angle: -135, length: 20 }, // Pinky curved
  ],
  D: [
    { angle: -45, length: 15 }, // Thumb UP-RIGHT
    { angle: -90, length: 28 }, // Index UP
    { angle: 135, length: 15 }, // Middle touches thumb
    { angle: 135, length: 15 }, // Ring touches thumb
    { angle: 135, length: 15 }, // Pinky touches thumb
  ],
  E: [
    foldThumb,
    { angle: 120, length: 16 }, // Curled tight
    { angle: 120, length: 16 },
    { angle: 120, length: 16 },
    { angle: 120, length: 16 },
  ],
  F: [
    { angle: -45, length: 15 }, // Thumb UP-RIGHT
    { angle: 135, length: 15 }, // Index DOWN-LEFT
    { angle: -90, length: 30 }, // Middle UP
    { angle: -90, length: 28 }, // Ring UP
    { angle: -90, length: 24 }, // Pinky UP
  ],
  G: [
    { angle: -180, length: 24 }, // Thumb LEFT
    { angle: -180, length: 26 }, // Index LEFT
    fold, fold, fold
  ],
  H: [
    foldThumb,
    { angle: -180, length: 26 }, // Index LEFT
    { angle: -180, length: 26 }, // Middle LEFT
    fold, fold
  ],
  I: [
    foldThumb,
    fold, fold, fold,
    { angle: -90, length: 24 } // Pinky UP
  ],
  J: [
    foldThumb,
    fold, fold, fold,
    { angle: -60, length: 24 } // Pinky curve UP-RIGHT
  ],
  K: [
    { angle: -90, length: 22 }, // Thumb UP
    { angle: -100, length: 28 }, // Index UP-LEFT
    { angle: -70, length: 30 }, // Middle UP-RIGHT
    fold, fold
  ],
  L: [
    { angle: -180, length: 24 }, // Thumb LEFT
    { angle: -90, length: 28 }, // Index UP
    fold, fold, fold
  ],
  M: [
    { angle: 0, length: 24 }, // Thumb FAR RIGHT
    { angle: 90, length: 16 }, // Index OVER thumb
    { angle: 90, length: 16 }, // Middle OVER thumb
    { angle: 90, length: 16 }, // Ring OVER thumb
    fold
  ],
  N: [
    { angle: 0, length: 20 }, // Thumb RIGHT
    { angle: 90, length: 16 }, // Index OVER
    { angle: 90, length: 16 }, // Middle OVER
    fold, fold
  ],
  O: [
    { angle: -60, length: 18 }, // Thumb
    { angle: 135, length: 18 }, // Index
    { angle: 135, length: 18 }, // Middle
    { angle: 135, length: 18 }, // Ring
    { angle: 135, length: 18 }, // Pinky
  ],
  P: [
    { angle: -180, length: 20 }, // Thumb LEFT
    { angle: 135, length: 26 }, // Index DOWN-LEFT
    { angle: 90, length: 28 }, // Middle DOWN
    fold, fold
  ],
  Q: [
    { angle: 135, length: 22 }, // Thumb DOWN-LEFT
    { angle: 90, length: 26 }, // Index DOWN
    fold, fold, fold
  ],
  R: [
    foldThumb,
    { angle: -70, length: 28 }, // Index UP-RIGHT
    { angle: -110, length: 30 }, // Middle UP-LEFT (crossed)
    fold, fold
  ],
  S: [
    { angle: 0, length: 26 }, // Thumb wraps FRONT
    fold, fold, fold, fold
  ],
  T: [
    { angle: -45, length: 20 }, // Thumb tucked
    fold, fold, fold, fold
  ],
  U: [
    foldThumb,
    { angle: -95, length: 28 }, // Index UP
    { angle: -85, length: 30 }, // Middle UP
    fold, fold
  ],
  V: [
    foldThumb,
    { angle: -110, length: 28 }, // Index UP-LEFT
    { angle: -70, length: 30 }, // Middle UP-RIGHT
    fold, fold
  ],
  W: [
    foldThumb,
    { angle: -115, length: 28 },
    { angle: -90, length: 30 },
    { angle: -65, length: 28 },
    fold
  ],
  X: [
    foldThumb,
    { angle: -135, length: 18 }, // Index hooked
    fold, fold, fold
  ],
  Y: [
    { angle: -180, length: 24 }, // Thumb LEFT
    fold, fold, fold,
    { angle: -30, length: 24 } // Pinky RIGHT
  ],
  Z: [
    foldThumb,
    { angle: -120, length: 28 }, // Index UP-LEFT
    fold, fold, fold
  ],
};

const defaultHand: FingerConfig[] = [
  { angle: -140, length: 16 },
  { angle: -95, length: 22 },
  { angle: -90, length: 24 },
  { angle: -85, length: 22 },
  { angle: -80, length: 18 },
];

export default function JBIOverlay({
  caption,
  jbiVideoUrl,
  primaryVideoRef,
}: JBIOverlayProps) {
  const [expanded, setExpanded] = useState(false);
  const [letterIndex, setLetterIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(800);
  const jbiVideoRef = useRef<HTMLVideoElement>(null);

  // Sync JBI video AND hand animation with primary video
  useEffect(() => {
    if (!primaryVideoRef?.current) return;

    let animationFrameId: number;

    const syncAll = () => {
      const primary = primaryVideoRef.current;
      const jbi = jbiVideoRef.current;

      if (primary) {
        // --- Sync JBI video ---
        if (jbi) {
          if (primary.paused && !jbi.paused) {
            jbi.pause();
          } else if (!primary.paused && jbi.paused) {
            jbi
              .play()
              .catch((err) => console.log("Failed to play JBI video:", err));
          }
          if (primary.playbackRate !== jbi.playbackRate) {
            jbi.playbackRate = primary.playbackRate;
          }
          const timeDiff = Math.abs(primary.currentTime - jbi.currentTime);
          if (timeDiff > 0.1 && jbi.readyState >= 2) {
            jbi.currentTime = primary.currentTime;
          }
        }

        // --- Sync hand animation play/pause ---
        setIsPlaying(!primary.paused);

        // --- Sync hand animation speed to playbackRate ---
        // base speed 800ms at 1x, faster at higher rates
        const baseSpeed = 800;
        const syncedSpeed = Math.round(baseSpeed / (primary.playbackRate || 1));
        setSpeed(syncedSpeed);
      }

      animationFrameId = requestAnimationFrame(syncAll);
    };

    animationFrameId = requestAnimationFrame(syncAll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [jbiVideoUrl, primaryVideoRef]);

  const cleanCaption = (caption || "")
    .toUpperCase()
    .replace(/[^A-Z ]/g, "")
    .replace(/\s+/g, " ");

  const letters = cleanCaption.split("");
  const currentLetter = letters[letterIndex] || "";
  const activeConfig =
    currentLetter === " " || !currentLetter
      ? defaultHand
      : letterConfigs[currentLetter] || defaultHand;

  // Group letters into words with absolute start/end indices for rich visual rendering
  const wordsWithIndices = cleanCaption
    .split(" ")
    .map((word, wIdx, arr) => {
      const prevWords = arr.slice(0, wIdx);
      const startIndex = prevWords.join(" ").length + (wIdx > 0 ? 1 : 0);
      return {
        word,
        startIndex,
        endIndex: startIndex + word.length,
      };
    })
    .filter((item) => item.word.length > 0);

  // Find the word that contains the current letter index
  const activeWordObj = wordsWithIndices.find(
    (w) => letterIndex >= w.startIndex && letterIndex < w.endIndex,
  );
  const currentWord = activeWordObj ? activeWordObj.word : "";

  // Reset spelling sequence back to 0 when caption changes
  useEffect(() => {
    setLetterIndex(0);
    setIsPlaying(true);
  }, [caption]);

  // Autoplay intervals to advance spelling character-by-character continuously
  useEffect(() => {
    if (!isPlaying) return;
    if (letters.length === 0) return;

    const timer = setInterval(() => {
      setLetterIndex((prev) => {
        if (prev < letters.length - 1) {
          return prev + 1;
        } else {
          // Loop back to the beginning of the sentence
          return 0;
        }
      });
    }, speed);

    return () => clearInterval(timer);
  }, [isPlaying, letters, speed]);

  const renderHand = (sizeClass = "w-28 h-28") => {
    return (
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClass} mx-auto drop-shadow-md`}
      >
        {/* Palm base shape */}
        <path
          d="M 28,68 C 26,82 40,88 52,88 C 68,88 74,78 74,62 C 74,56 71,55 69,55 L 61,50 L 52,47 L 43,50 L 35,62 Z"
          fill="#FFF1F2" // very light pink/rose
          stroke="#FDA4AF" // rose-300
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Fingers */}
        {activeConfig.map((finger, i) => {
          // Base points on 100x100 grid
          const bases = [
            { x: 35, y: 62 }, // Thumb
            { x: 43, y: 50 }, // Index
            { x: 52, y: 47 }, // Middle
            { x: 61, y: 50 }, // Ring
            { x: 69, y: 55 }, // Pinky
          ];
          const base = bases[i];
          const coords = getFingerCoords(
            base.x,
            base.y,
            finger.angle,
            finger.length,
          );

          return (
            <motion.line
              key={i}
              x1={base.x}
              y1={base.y}
              animate={{
                x2: coords.x2,
                y2: coords.y2,
              }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              stroke="#DB2777" // pink-600
              strokeWidth="7"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    );
  };

  const jbiVideoBox = jbiVideoUrl ? (
    <div className="absolute bottom-4 left-4 z-20 w-32 md:w-48 aspect-video bg-[#1A1A1A] rounded-xl border-2 border-pink-400 overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
      <video
        ref={jbiVideoRef}
        key={jbiVideoUrl}
        className="w-full h-full object-cover"
        muted
        playsInline
        loop
      >
        <source src={jbiVideoUrl} type="video/mp4" />
      </video>
    </div>
  ) : null;

  if (!expanded) {
    return (
      <>
        {jbiVideoBox}
        {/* Mobile: gesture tangan mini di atas JBI video (kanan bawah JBI area) */}
        {/* Desktop: gesture tangan di kanan bawah seperti biasa */}
        <motion.div
          layout
          onClick={() => setExpanded(true)}
          className="absolute bottom-4 right-4 z-20 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Mobile: compact pill — hanya icon tangan kecil + huruf */}
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-2xl border-2 border-pink-300 shadow-lg shadow-pink-200/30 p-1.5 flex items-center gap-1.5">
            <div className="relative w-9 h-9 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 border border-pink-200">
              {renderHand("w-8 h-8")}
              {currentLetter && currentLetter !== " " && (
                <div className="absolute -top-1.5 -right-1.5 bg-pink-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shadow shadow-pink-300">
                  {currentLetter}
                </div>
              )}
            </div>
            <div className="pr-1">
              <p className="font-black text-pink-900 text-[9px] uppercase tracking-wide leading-tight">
                Isyarat
              </p>
              <p className="font-bold text-pink-600 text-[9px] font-extrabold leading-tight">
                {currentWord || "..."}
              </p>
            </div>
          </div>

          {/* Desktop: full card seperti biasa */}
          <div className="hidden md:flex bg-white/95 backdrop-blur-md rounded-[22px] border-2 border-pink-300 shadow-xl shadow-pink-200/30 p-3 items-center gap-3">
            <div className="relative w-16 h-16 bg-gradient-to-br from-pink-50 to-pink-100 rounded-[16px] flex items-center justify-center flex-shrink-0 border border-pink-200">
              {renderHand("w-14 h-14")}
              {currentLetter && currentLetter !== " " && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-md shadow-pink-300">
                  {currentLetter}
                </div>
              )}
            </div>
            <div className="pr-2">
              <p className="font-black text-pink-900 text-[11px] uppercase tracking-wider">
                Bahasa Isyarat
              </p>
              <p className="font-bold text-[#6B7280] text-[10px] mt-0.5">
                Mengeja:{" "}
                <span className="text-pink-600 font-extrabold">
                  {currentWord || "..."}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      {jbiVideoBox}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute inset-0 z-30 bg-white/95 backdrop-blur-md p-4 flex flex-col justify-between rounded-[26px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-100 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">🤟</span>
            <div>
              <h3 className="font-black text-pink-900 text-sm">
                Ejaan Isyarat Jari (BISINDO)
              </h3>
              <p className="text-[10px] text-pink-600 font-bold">
                Belajar mengeja kata dengan isyarat tangan
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(false);
            }}
            className="p-1 rounded-full hover:bg-pink-100 text-pink-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Row */}
        <div className="flex-1 flex gap-4 items-center min-h-0 py-3">
          {/* Left Column: Visualizer */}
          <div className="w-1/3 flex flex-col items-center justify-center bg-gradient-to-b from-pink-50/50 to-pink-100/30 rounded-2xl p-2 border border-pink-100 relative">
            <div className="relative w-full flex justify-center">
              {renderHand()}
              {currentLetter && currentLetter !== " " && (
                <div className="absolute top-0 right-2 bg-pink-500 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg font-black shadow-lg shadow-pink-300 animate-bounce">
                  {currentLetter}
                </div>
              )}
            </div>
            <p className="text-[10px] font-black text-pink-700 mt-1 uppercase tracking-widest">
              {currentLetter === " " ? "Jeda Spasi" : `Huruf: ${currentLetter}`}
            </p>
          </div>

          {/* Right Column: Controls & Words list */}
          <div className="flex-1 flex flex-col justify-between h-full min-w-0">
            <div>
              <p className="text-[10px] font-black text-pink-800/60 uppercase tracking-wider mb-2">
                Kalimat Mengeja:
              </p>
              {/* Words list and letter bubbles */}
              <div className="flex flex-wrap gap-x-3 gap-y-2 max-h-[110px] overflow-y-auto pr-1">
                {wordsWithIndices.map((wordObj, wIdx) => {
                  const isWordActive =
                    letterIndex >= wordObj.startIndex &&
                    letterIndex < wordObj.endIndex;
                  return (
                    <div
                      key={wIdx}
                      className={`
                      flex items-center gap-1 p-1 rounded-2xl border transition-all
                      ${
                        isWordActive
                          ? "bg-pink-50 border-pink-300 shadow-sm shadow-pink-100"
                          : "border-transparent bg-white/40"
                      }
                    `}
                    >
                      {wordObj.word.split("").map((letChar, charOffset) => {
                        const globalIndex = wordObj.startIndex + charOffset;
                        const isLetterActive = globalIndex === letterIndex;
                        return (
                          <button
                            key={charOffset}
                            onClick={(e) => {
                              e.stopPropagation();
                              setLetterIndex(globalIndex);
                              setIsPlaying(false);
                            }}
                            className={`
                            w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all border
                            ${
                              isLetterActive
                                ? "bg-pink-600 text-white border-pink-600 scale-110 shadow-md shadow-pink-200"
                                : "bg-white text-pink-700 border-pink-200 hover:bg-pink-50"
                            }
                          `}
                          >
                            {letChar}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Controls bar */}
            <div className="flex items-center gap-3 border-t border-pink-100/50 pt-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-black transition-colors shadow-md shadow-pink-200"
              >
                {isPlaying ? (
                  <>
                    <Pause size={12} fill="white" /> Pause
                  </>
                ) : (
                  <>
                    <Play size={12} fill="white" /> Play
                  </>
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLetterIndex(0);
                  setIsPlaying(true);
                }}
                className="p-1.5 hover:bg-pink-100 text-pink-600 rounded-xl transition-colors"
                title="Ulangi dari Awal"
              >
                <RotateCcw size={14} />
              </button>

              {/* Speed buttons */}
              <div className="ml-auto flex items-center gap-1">
                <span className="text-[9px] font-bold text-pink-700 mr-1">
                  Kecepatan:
                </span>
                {[
                  { label: "Lambat", val: 1200 },
                  { label: "Sedang", val: 800 },
                  { label: "Cepat", val: 450 },
                ].map((sp) => (
                  <button
                    key={sp.val}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSpeed(sp.val);
                    }}
                    className={`
                    px-2 py-0.5 rounded text-[8px] font-black transition-all
                    ${
                      speed === sp.val
                        ? "bg-pink-200 text-pink-800"
                        : "bg-pink-50 text-pink-600 hover:bg-pink-100"
                    }
                  `}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text description */}
        <div className="bg-pink-50/50 border border-pink-100/60 rounded-xl px-3 py-1.5 mt-1">
          <p className="text-[11px] font-bold text-pink-800 line-clamp-1">
            💬 "{caption}"
          </p>
        </div>
      </motion.div>
    </>
  );
}
