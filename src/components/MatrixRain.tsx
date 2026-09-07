/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useCrtTheme, CrtTheme } from "@/context/ThemeContext";
import { playTerminalBeep } from "@/lib/audio";
import { X, Sparkles } from "lucide-react";

export const MATRIX_TOGGLE_EVENT = "portfolio-matrix-toggle";

export const toggleMatrixRain = (forceState?: boolean): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(MATRIX_TOGGLE_EVENT, {
      detail: typeof forceState === "boolean" ? { open: forceState } : undefined,
    })
  );
};

interface MatrixRainProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const THEME_COLORS: Record<
  CrtTheme,
  {
    primary: string;
    head: string;
    tail: string;
    glow: string;
    hudBorder: string;
    hudText: string;
  }
> = {
  green: {
    primary: "#22c55e",
    head: "#f0fdf4",
    tail: "rgba(34, 197, 94, 0.85)",
    glow: "rgba(34, 197, 94, 0.5)",
    hudBorder: "border-green-500/60",
    hudText: "text-green-400",
  },
  amber: {
    primary: "#f59e0b",
    head: "#fffbeb",
    tail: "rgba(245, 158, 11, 0.85)",
    glow: "rgba(245, 158, 11, 0.5)",
    hudBorder: "border-amber-500/60",
    hudText: "text-amber-400",
  },
  cyan: {
    primary: "#06b6d4",
    head: "#ecfeff",
    tail: "rgba(6, 182, 212, 0.85)",
    glow: "rgba(6, 182, 212, 0.5)",
    hudBorder: "border-cyan-500/60",
    hudText: "text-cyan-400",
  },
  rose: {
    primary: "#f43f5e",
    head: "#fff1f2",
    tail: "rgba(244, 63, 94, 0.85)",
    glow: "rgba(244, 63, 94, 0.5)",
    hudBorder: "border-rose-500/60",
    hudText: "text-rose-400",
  },
};

const MATRIX_CHARS =
  "0123456789ABCDEF$#@*+=-~<>{}[]/\\|;:" +
  "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";

export const MatrixRain: React.FC<MatrixRainProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const { theme } = useCrtTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const isControlled = typeof propIsOpen === "boolean";
  const isVisible = isControlled ? propIsOpen : internalOpen;

  const handleClose = useCallback(() => {
    if (propOnClose) {
      propOnClose();
    }
    if (!isControlled) {
      setInternalOpen(false);
    }
    playTerminalBeep();
  }, [propOnClose, isControlled]);

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ open?: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.open === "boolean") {
        setInternalOpen(customEvent.detail.open);
      } else {
        setInternalOpen((prev) => !prev);
      }
    };

    window.addEventListener(MATRIX_TOGGLE_EVENT, handleToggle);
    return () => {
      window.removeEventListener(MATRIX_TOGGLE_EVENT, handleToggle);
    };
  }, []);

  // Escape key handler
  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, handleClose]);

  // Canvas Matrix Animation
  useEffect(() => {
    if (!isVisible) {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * -50));
    };

    window.addEventListener("resize", handleResize);

    const activeColors = THEME_COLORS[theme] || THEME_COLORS.green;
    const charLen = MATRIX_CHARS.length;

    let lastFrameTime = performance.now();
    const fpsInterval = 1000 / 30; // 30-33 FPS classic cinematic feel

    const render = (currentTime: number) => {
      animationFrameId.current = requestAnimationFrame(render);

      const elapsed = currentTime - lastFrameTime;
      if (elapsed < fpsInterval) return;
      lastFrameTime = currentTime - (elapsed % fpsInterval);

      // Semi-transparent fade effect for matrix trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "IBM Plex Mono", "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = MATRIX_CHARS.charAt(Math.floor(Math.random() * charLen));
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (y > 0 && y <= height + fontSize) {
          // Render head with bright lead glow
          ctx.fillStyle = activeColors.head;
          ctx.shadowBlur = 8;
          ctx.shadowColor = activeColors.primary;
          ctx.fillText(char, x, y);

          // Render secondary trail character slightly higher
          if (drops[i] > 1) {
            const prevChar = MATRIX_CHARS.charAt(Math.floor(Math.random() * charLen));
            ctx.fillStyle = activeColors.tail;
            ctx.shadowBlur = 4;
            ctx.fillText(prevChar, x, y - fontSize);
          }
        }

        // Reset drop to top with random delay after reaching bottom
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    };

    // Initial clear
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    animationFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [isVisible, theme]);

  if (!isVisible) return null;

  const currentColors = THEME_COLORS[theme] || THEME_COLORS.green;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 select-none overflow-hidden animate-in fade-in duration-300"
      aria-modal="true"
      role="dialog"
      aria-label="Matrix Rain Overlay"
    >
      {/* Matrix Canvas */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-pointer"
        onClick={handleClose}
        title="Click to exit Matrix mode"
      />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div
          className={`font-mono text-xs md:text-sm px-3 py-1.5 bg-black/80 border ${currentColors.hudBorder} ${currentColors.hudText} backdrop-blur shadow-lg flex items-center gap-2`}
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>[SYSTEM: MATRIX STREAM // THEME: {theme.toUpperCase()}]</span>
        </div>

        {/* Exit Button */}
        <button
          onClick={handleClose}
          type="button"
          className={`pointer-events-auto font-mono text-xs md:text-sm px-4 py-1.5 bg-black/80 border ${currentColors.hudBorder} ${currentColors.hudText} hover:bg-white/10 transition-colors shadow-lg flex items-center gap-2 cursor-pointer`}
          aria-label="Exit Matrix Mode"
        >
          <span className="hidden sm:inline">[PRESS ESC TO EXIT MATRIX]</span>
          <span className="sm:hidden">[EXIT MATRIX]</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom CRT Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 scanline opacity-40" />

      {/* Bottom Floating Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <div
          className={`font-mono text-[11px] md:text-xs px-3 py-1 bg-black/70 border ${currentColors.hudBorder} ${currentColors.hudText} opacity-75 backdrop-blur`}
        >
          CLICK ANYWHERE OR PRESS ESC TO RETURN
        </div>
      </div>
    </div>
  );
};

export default MatrixRain;
