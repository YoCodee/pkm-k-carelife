"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function useSpeechSynthesisSSR() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
      
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices());
      };
      
      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
      setIsSpeaking(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, rate = 0.85, pitch = 1.1, onEnd?: () => void) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();

      const utterance = new window.SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance; // Prevent garbage collection
      utterance.lang = "id-ID";
      utterance.rate = rate;
      utterance.pitch = pitch;

      // Find available Indonesian voice
      const currentVoices = voices.length > 0 ? voices : window.speechSynthesis.getVoices();
      const idVoices = currentVoices.filter(
        (v) =>
          v.lang.toLowerCase().startsWith("id") ||
          v.lang.toLowerCase() === "id-id"
      );

      const bestVoice =
        idVoices.find(
          (v) =>
            v.name.toLowerCase().includes("natural") ||
            v.name.toLowerCase().includes("online") ||
            v.name.toLowerCase().includes("neural")
        ) ||
        idVoices.find((v) => v.name.toLowerCase().includes("damayanti")) ||
        idVoices.find((v) => v.name.toLowerCase().includes("google")) ||
        idVoices[0];

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        utteranceRef.current = null;
        onEnd?.();
      };
      utterance.onerror = (e) => {
        // "interrupted" and "canceled" are standard events fired when speechSynthesis.cancel() is called
        // to stop or transition speech, and are not actual runtime errors.
        if (e.error !== "interrupted" && e.error !== "canceled") {
          console.error("SpeechSynthesis error:", e);
        }
        setIsSpeaking(false);
        utteranceRef.current = null;
        onEnd?.(); // Ensure fallback is called to prevent layout hang!
      };

      window.speechSynthesis.speak(utterance);
    },
    [voices]
  );

  // Auto clean up when hook unmounts
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return { isSupported, isSpeaking, speak, stop };
}
