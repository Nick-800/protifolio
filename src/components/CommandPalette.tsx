/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Command } from "cmdk";
import {
  Terminal,
  X,
  Compass,
  Palette,
  Sparkles,
  Volume2,
  VolumeX,
  FileDown,
  Copy,
  Github,
  Gamepad2,
  Check,
  CornerDownLeft,
} from "lucide-react";
import { useCrtTheme, CrtTheme } from "@/context/ThemeContext";
import { useAudio } from "@/lib/audio";
import { toggleMatrixRain } from "@/components/MatrixRain";
import { downloadResume } from "@/lib/resume";
import { useToast } from "@/hooks/use-toast";

export const COMMAND_PALETTE_EVENT = "open-command-palette";

export const openCommandPalette = (): void => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
};

export const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { theme, setTheme, availableThemes } = useCrtTheme();
  const { isAudioEnabled, toggleAudio, playKeyClick, playTerminalBeep } = useAudio();
  const { toast } = useToast();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard shortcut Cmd+K or Ctrl+K toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => {
          const next = !prev;
          if (next) {
            playTerminalBeep();
          }
          return next;
        });
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        playTerminalBeep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, playTerminalBeep]);

  // Listen to custom window event
  useEffect(() => {
    const handleOpenEvent = () => {
      setOpen(true);
      playTerminalBeep();
    };

    window.addEventListener(COMMAND_PALETTE_EVENT, handleOpenEvent);
    return () => window.removeEventListener(COMMAND_PALETTE_EVENT, handleOpenEvent);
  }, [playTerminalBeep]);

  // Play subtle key clicks while navigating with arrows inside palette
  const handleContainerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      playKeyClick();
    }
  };

  const handleClose = useCallback(() => {
    setOpen(false);
    setSearch("");
    playTerminalBeep();
  }, [playTerminalBeep]);

  const executeAction = (action: () => void) => {
    playTerminalBeep();
    action();
    setOpen(false);
    setSearch("");
  };

  const jumpTo = (sectionId: string) => {
    executeAction(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    });
  };

  const handleCopyEmail = () => {
    executeAction(() => {
      navigator.clipboard.writeText("sohaibkamash@gmail.com");
      toast({
        title: "[SUCCESS] Email copied to clipboard",
        description: "sohaibkamash@gmail.com is ready to paste.",
      });
    });
  };

  const handleDownloadResume = () => {
    executeAction(() => {
      downloadResume();
      toast({
        title: "[TRANSMISSION_COMPLETE] CV Downloaded",
        description: "Sohaib_Kamash_CV.txt generated and saved.",
      });
    });
  };

  const handleStartCodebreaker = () => {
    executeAction(() => {
      window.dispatchEvent(new CustomEvent("portfolio-start-codebreaker"));
    });
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9990] bg-black/85 backdrop-blur-md flex items-start justify-center pt-[10vh] sm:pt-[14vh] px-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="System Command Palette"
    >
      <div
        ref={containerRef}
        onKeyDown={handleContainerKeyDown}
        className="w-full max-w-2xl bg-black/95 border-2 border-primary rounded-none shadow-[0_0_35px_hsl(var(--primary)/0.35)] overflow-hidden font-mono text-foreground relative scanline animate-in zoom-in-95 duration-150"
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-primary/15 border-b-2 border-primary/40 select-none">
          <div className="flex items-center gap-2 text-primary text-xs">
            <Terminal className="h-4 w-4 text-primary animate-pulse" />
            <span className="font-bold tracking-wider">[SYSTEM_COMMAND_PALETTE // CTRL+K]</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground hidden sm:inline">
              MODE: {theme.toUpperCase()}
            </span>
            <button
              onClick={handleClose}
              type="button"
              className="text-muted-foreground hover:text-primary transition-colors p-1"
              aria-label="Close Command Palette"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CMDk Root */}
        <Command
          label="System Command Palette"
          className="w-full flex flex-col focus:outline-none"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/30 bg-black/80">
            <span className="text-primary font-bold text-sm select-none">$</span>
            <Command.Input
              value={search}
              onValueChange={(val) => {
                setSearch(val);
                playKeyClick();
              }}
              placeholder="search commands (e.g. projects, theme, matrix, resume)..."
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs sm:text-sm placeholder:text-muted-foreground focus:ring-0 p-0 caret-primary"
              autoFocus
            />
            <span className="cursor-blink text-primary font-bold select-none">_</span>
          </div>

          {/* Command List View */}
          <Command.List className="max-h-[55vh] overflow-y-auto p-2 space-y-3 font-mono text-xs focus:outline-none">
            <Command.Empty className="py-8 text-center text-xs text-muted-foreground">
              <span className="text-destructive font-bold">[!]</span> NO_MATCHING_COMMANDS_FOUND
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="[NAVIGATION]"
              className="[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-primary/70 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:tracking-wider"
            >
              <Command.Item
                onSelect={() => jumpTo("home")}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span>Jump to: Home / Mainframe Terminal</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  #home
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => jumpTo("about")}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span>Jump to: About / Engineering Architecture</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  #about
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => jumpTo("projects")}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span>Jump to: Projects / Production Case Studies</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  #projects
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => jumpTo("skills")}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span>Jump to: Skills / Technical Diagnostics</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  #skills
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => jumpTo("timeline")}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span>Jump to: Timeline / System Evolution</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  #timeline
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => jumpTo("contact")}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span>Jump to: Contact / Transmission Protocol</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  #contact
                </span>
              </Command.Item>
            </Command.Group>

            {/* Themes Group */}
            <Command.Group
              heading="[THEMES]"
              className="[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-primary/70 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:tracking-wider"
            >
              {(
                [
                  { id: "green", name: "Green (Default CRT)", hex: "#22c55e" },
                  { id: "amber", name: "Amber (Phosphor CRT)", hex: "#f59e0b" },
                  { id: "cyan", name: "Cyan (Cyber Neon)", hex: "#06b6d4" },
                  { id: "rose", name: "Rose (Retro Synthwave)", hex: "#f43f5e" },
                ] as const
              ).map((t) => {
                const isActive = theme === t.id;
                return (
                  <Command.Item
                    key={t.id}
                    onSelect={() => {
                      executeAction(() => {
                        setTheme(t.id as CrtTheme);
                        toast({
                          title: `[THEME_SWITCH] CRT Phosphor: ${t.id.toUpperCase()}`,
                          description: `Display matrix recalibrated to ${t.name}.`,
                        });
                      });
                    }}
                    className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3 h-3 border border-white/30 inline-block"
                        style={{ backgroundColor: t.hex }}
                      />
                      <span>Switch Theme: {t.name}</span>
                    </div>
                    {isActive ? (
                      <span className="text-[10px] text-primary flex items-center gap-1 font-bold">
                        <Check className="h-3 w-3" /> [ACTIVE]
                      </span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground">[APPLY]</span>
                    )}
                  </Command.Item>
                );
              })}
            </Command.Group>

            {/* Actions Group */}
            <Command.Group
              heading="[ACTIONS]"
              className="[&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:text-primary/70 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1 [&_[cmdk-group-heading]]:tracking-wider"
            >
              <Command.Item
                onSelect={() => {
                  executeAction(() => {
                    toggleMatrixRain(true);
                  });
                }}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                  <span>Toggle Matrix Rain Stream</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  [STREAM]
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  executeAction(() => {
                    const next = toggleAudio();
                    toast({
                      title: `[AUDIO_ENGINE] ${next ? "SFX ONLINE" : "SFX MUTED"}`,
                      description: next
                        ? "Web Audio synthesized clicks and beeps enabled."
                        : "Audio feedback muted.",
                    });
                  });
                }}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  {isAudioEnabled ? (
                    <Volume2 className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                  <span>Toggle Retro Audio SFX</span>
                </div>
                <span
                  className={`text-[10px] px-1.5 py-0.5 border ${
                    isAudioEnabled
                      ? "text-primary border-primary/40 bg-primary/10"
                      : "text-muted-foreground border-border bg-black/40"
                  }`}
                >
                  {isAudioEnabled ? "[SFX: ON]" : "[SFX: OFF]"}
                </span>
              </Command.Item>

              <Command.Item
                onSelect={handleDownloadResume}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <FileDown className="h-3.5 w-3.5 text-primary" />
                  <span>View / Download Resume (CV)</span>
                </div>
                <span className="text-[10px] text-primary border border-primary/30 px-1.5 py-0.5 bg-black/40">
                  [.TXT / .MD]
                </span>
              </Command.Item>

              <Command.Item
                onSelect={handleCopyEmail}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Copy className="h-3.5 w-3.5 text-primary" />
                  <span>Copy Email to Clipboard (sohaibkamash@gmail.com)</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  [COPY]
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  executeAction(() => {
                    window.open("https://github.com/Nick-800", "_blank", "noopener,noreferrer");
                  });
                }}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="h-3.5 w-3.5 text-primary" />
                  <span>Open GitHub Profile (Nick-800)</span>
                </div>
                <span className="text-[10px] text-muted-foreground border border-primary/20 px-1.5 py-0.5 bg-black/40">
                  [EXTERNAL]
                </span>
              </Command.Item>

              <Command.Item
                onSelect={handleStartCodebreaker}
                className="px-3 py-2 text-xs flex items-center justify-between cursor-pointer border border-transparent rounded-none hover:border-primary/50 data-[selected=true]:border-primary data-[selected=true]:bg-primary/15 data-[selected=true]:text-primary transition-all select-none"
              >
                <div className="flex items-center gap-2.5">
                  <Gamepad2 className="h-3.5 w-3.5 text-primary" />
                  <span>Scroll to Terminal & Start Codebreaker Game</span>
                </div>
                <span className="text-[10px] text-primary border border-primary/40 px-1.5 py-0.5 bg-primary/10">
                  [PLAY GAME]
                </span>
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command>

        {/* Footer Shortcut Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-black/90 border-t border-primary/30 text-[11px] text-muted-foreground select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-primary/30 text-primary bg-black/60 text-[10px]">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-primary/30 text-primary bg-black/60 text-[10px]">
                <CornerDownLeft className="inline h-2.5 w-2.5" /> Enter
              </kbd>{" "}
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 border border-primary/30 text-primary bg-black/60 text-[10px]">
                ESC
              </kbd>{" "}
              Close
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-primary">
            <span>● PROT_HUD v2.4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
