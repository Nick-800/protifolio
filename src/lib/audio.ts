import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "portfolio-audio";
const EVENT_NAME = "portfolio-audio-toggle";

let audioCtx: AudioContext | null = null;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
};

export const isAudioEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === "true";
  } catch {
    return true;
  }
};

export const setAudioEnabled = (enabled: boolean): void => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, String(enabled));
  } catch {
    // Ignore storage errors
  }
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { enabled } })
  );
};

export const toggleAudio = (): boolean => {
  const next = !isAudioEnabled();
  setAudioEnabled(next);
  return next;
};

/**
 * Realistic mechanical switch click sound (short filtered pulse/noise transient).
 */
export const playKeyClick = (): void => {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Noise transient for switch tactile feel
    const bufferSize = Math.floor(ctx.sampleRate * 0.006); // 6ms
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.setValueAtTime(3200, now);
    noiseFilter.Q.setValueAtTime(2.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.09, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.006);

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noiseSource.start(now);
    noiseSource.stop(now + 0.006);

    // 2. Bottom-out mechanical thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.012);

    oscGain.gain.setValueAtTime(0.06, now);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.012);
  } catch {
    // Audio playback fallback
  }
};

/**
 * Crisp retro 8-bit confirmation beep (920Hz pulse).
 */
export const playTerminalBeep = (): void => {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(920, now);

    // Subtle lowpass to take off harsh digital edge
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2400, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  } catch {
    // Audio playback fallback
  }
};

/**
 * Dual-tone vintage error buzz (dissonant square wave beat).
 */
export const playErrorBeep = (): void => {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const duration = 0.18;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, now);

    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(185, now);

    osc2.type = "square";
    osc2.frequency.setValueAtTime(196, now); // Detuned dissonant minor interval

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.008);
    gain.gain.setValueAtTime(0.14, now + duration - 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  } catch {
    // Audio playback fallback
  }
};

/**
 * CRT monitor power-up frequency sweep (degauss hum + high-frequency sweep).
 */
export const playBootSound = (): void => {
  if (!isAudioEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    // 1. Degauss sub coil thump
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(35, now + 0.35);

    subGain.gain.setValueAtTime(0.15, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    subOsc.connect(subGain);
    subGain.connect(ctx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.35);

    // 2. High-voltage flyback transformer frequency sweep
    const sweepOsc = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    const sweepFilter = ctx.createBiquadFilter();

    sweepOsc.type = "sine";
    sweepOsc.frequency.setValueAtTime(320, now + 0.05);
    sweepOsc.frequency.exponentialRampToValueAtTime(11500, now + 0.65);

    sweepFilter.type = "bandpass";
    sweepFilter.frequency.setValueAtTime(1200, now + 0.05);
    sweepFilter.frequency.exponentialRampToValueAtTime(10000, now + 0.65);
    sweepFilter.Q.setValueAtTime(2, now);

    sweepGain.gain.setValueAtTime(0.0001, now);
    sweepGain.gain.linearRampToValueAtTime(0.09, now + 0.2);
    sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

    sweepOsc.connect(sweepFilter);
    sweepFilter.connect(sweepGain);
    sweepGain.connect(ctx.destination);

    sweepOsc.start(now + 0.05);
    sweepOsc.stop(now + 0.75);
  } catch {
    // Audio playback fallback
  }
};

/**
 * React hook to observe and control audio synthesis state.
 */
export const useAudio = () => {
  const [enabled, setEnabled] = useState<boolean>(() => isAudioEnabled());

  useEffect(() => {
    const handleAudioToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.enabled === "boolean") {
        setEnabled(customEvent.detail.enabled);
      } else {
        setEnabled(isAudioEnabled());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setEnabled(e.newValue !== "false");
      }
    };

    window.addEventListener(EVENT_NAME, handleAudioToggle);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(EVENT_NAME, handleAudioToggle);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggle = useCallback(() => {
    const next = toggleAudio();
    setEnabled(next);
    if (next) {
      playTerminalBeep();
    }
    return next;
  }, []);

  return {
    isAudioEnabled: enabled,
    toggleAudio: toggle,
    playKeyClick,
    playTerminalBeep,
    playErrorBeep,
    playBootSound,
  };
};
