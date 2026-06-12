let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Memainkan Efek Suara (SFX) secara mandiri menggunakan Web Audio API (Sintetis)
 * Sangat cepat, offline, dan tanpa memerlukan file audio eksternal.
 */
export function playSFX(type: "click" | "back" | "success" | "finish") {
  if (typeof window === "undefined") return;
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    
    if (type === "click") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } 
    else if (type === "back") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } 
    else if (type === "success") {
      // Melodi arpeggio mayor naik
      const playNote = (freq: number, startOffset: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + startOffset);
        
        gain.gain.setValueAtTime(0.1, now + startOffset);
        gain.gain.exponentialRampToValueAtTime(0.01, now + startOffset + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + startOffset);
        osc.stop(now + startOffset + duration);
      };
      
      playNote(523.25, 0, 0.15);     // C5
      playNote(659.25, 0.06, 0.15);  // E5
      playNote(783.99, 0.12, 0.15);  // G5
      playNote(1046.50, 0.18, 0.25); // C6
    } 
    else if (type === "finish") {
      // Fanfare selebrasi
      const playChime = (freq: number, startOffset: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + startOffset);
        
        gain.gain.setValueAtTime(0.08, now + startOffset);
        gain.gain.exponentialRampToValueAtTime(0.005, now + startOffset + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + startOffset);
        osc.stop(now + startOffset + duration);
      };
      
      playChime(261.63, 0, 0.18);    // C4
      playChime(329.63, 0.04, 0.18);  // E4
      playChime(392.00, 0.08, 0.18);  // G4
      playChime(523.25, 0.12, 0.22);  // C5
      
      // Akord C Mayor penuh sebagai klimaks
      playChime(523.25, 0.25, 0.55);  // C5
      playChime(659.25, 0.25, 0.55);  // E5
      playChime(783.99, 0.25, 0.55);  // G5
      playChime(1046.50, 0.25, 0.65); // C6
    }
  } catch (err) {
    console.error("Audio SFX Error:", err);
  }
}

/**
 * Menggetarkan HP menggunakan Vibrate API (Haptic Feedback)
 */
export function triggerHaptic(type: "click" | "back" | "success" | "error") {
  if (typeof window === "undefined" || !("vibrate" in navigator)) return;
  try {
    if (type === "click") {
      navigator.vibrate(80);
    } 
    else if (type === "back") {
      navigator.vibrate([40, 40, 40]);
    } 
    else if (type === "success") {
      navigator.vibrate([80, 50, 80, 50, 250]);
    } 
    else if (type === "error") {
      navigator.vibrate(300);
    }
  } catch (err) {
    console.error("Haptic feedback error:", err);
  }
}
