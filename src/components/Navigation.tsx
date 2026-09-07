import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Terminal, Volume2, VolumeX, Sparkles, Command as CommandIcon } from "lucide-react";
import { useAudio } from "@/lib/audio";
import { toggleMatrixRain } from "@/components/MatrixRain";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const { isAudioEnabled, toggleAudio, playKeyClick, playTerminalBeep } = useAudio();

  const navItems: NavItem[] = [
    { label: "HOME", href: "#home", id: "home" },
    { label: "ABOUT", href: "#about", id: "about" },
    { label: "PROJECTS", href: "#projects", id: "projects" },
    { label: "SKILLS", href: "#skills", id: "skills" },
    { label: "TIMELINE", href: "#timeline", id: "timeline" },
    { label: "CONTACT", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sectionIds = ["home", "about", "projects", "skills", "timeline", "contact"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }

      if (window.scrollY < 200) {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    playKeyClick();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled
          ? "bg-background/95 backdrop-blur-sm border-b-2 border-primary/50 glow-terminal"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#home");
            }}
            className="flex items-center gap-2 text-primary hover:glow-terminal transition-all"
          >
            <Terminal className="h-5 w-5" />
            <span className="text-sm sm:text-lg font-bold">&gt; SOHAIB_KAMASH.SH</span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 border border-primary/30 p-1 bg-black/60">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`font-mono text-xs px-2.5 h-8 transition-all border ${
                    isActive
                      ? "text-primary bg-primary/15 border-primary shadow-[0_0_10px_hsl(var(--primary)/0.4)] font-bold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent hover:border-primary/50"
                  }`}
                >
                  <span className="text-primary mr-1">{isActive ? ">" : ""}</span>
                  [{idx + 1}] {item.label}
                </Button>
              );
            })}
          </div>

          {/* Medium Screen Nav (Tablets) */}
          <div className="hidden md:flex lg:hidden items-center gap-1 border border-primary/30 p-1 bg-black/60">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`font-mono text-[11px] px-2 h-7 transition-all border ${
                    isActive
                      ? "text-primary bg-primary/15 border-primary shadow-[0_0_10px_hsl(var(--primary)/0.4)] font-bold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent hover:border-primary/50"
                  }`}
                >
                  {isActive && <span className="text-primary mr-0.5">&gt;</span>}
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Desktop Audio & Matrix Controls */}
          <div className="hidden md:flex items-center gap-1.5 border border-primary/30 p-1 bg-black/60">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                playTerminalBeep();
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              className="font-mono text-xs px-2.5 h-8 border border-primary/40 hover:border-primary text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5 shadow-[0_0_8px_hsl(var(--primary)/0.2)]"
              title="Open Command Palette (Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <CommandIcon className="h-3.5 w-3.5 text-primary" />
              <span>[CMD+K]</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                toggleAudio();
              }}
              className="font-mono text-xs px-2.5 h-8 border border-transparent hover:border-primary/50 text-foreground hover:text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
              title={isAudioEnabled ? "Mute Web Audio SFX" : "Enable Web Audio SFX"}
              aria-label="Toggle SFX"
            >
              {isAudioEnabled ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 text-primary" />
                  <span>[SFX: ON]</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground">[SFX: OFF]</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                playTerminalBeep();
                toggleMatrixRain(true);
              }}
              className="font-mono text-xs px-2.5 h-8 border border-transparent hover:border-primary/50 text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
              title="Launch Matrix Rain Stream"
              aria-label="Toggle Matrix Rain"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>[MATRIX]</span>
            </Button>
          </div>

          {/* Mobile Bar Controls */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                playTerminalBeep();
                window.dispatchEvent(new CustomEvent("open-command-palette"));
              }}
              className="h-9 px-2 border border-primary/40 font-mono text-xs text-primary hover:bg-primary/10 flex items-center gap-1"
              title="Open Command Palette (Cmd+K)"
              aria-label="Open Command Palette"
            >
              <CommandIcon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] font-bold">[K]</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAudio}
              className="h-9 px-2 border border-primary/40 font-mono text-xs text-foreground hover:text-primary hover:bg-primary/10"
              title="Toggle Audio SFX"
              aria-label="Toggle Audio SFX"
            >
              {isAudioEnabled ? (
                <Volume2 className="h-4 w-4 text-primary" />
              ) : (
                <VolumeX className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                playTerminalBeep();
                toggleMatrixRain(true);
              }}
              className="h-9 px-2 border border-primary/40 font-mono text-xs text-primary hover:bg-primary/10"
              title="Launch Matrix Rain"
              aria-label="Launch Matrix Rain"
            >
              <Sparkles className="h-4 w-4 text-primary" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="border-2 border-primary/50 hover:bg-primary/10 h-9 w-9"
              onClick={() => {
                playKeyClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-1.5 border-t-2 border-primary/30 bg-black/95 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-1 text-[11px] text-muted-foreground border-b border-primary/20 mb-2">
              SELECT_DESTINATION:
            </div>
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={() => scrollToSection(item.href)}
                  className={`w-full justify-start font-mono text-sm border ${
                    isActive
                      ? "text-primary bg-primary/15 border-primary shadow-[0_0_8px_hsl(var(--primary)/0.4)] font-bold"
                      : "text-foreground hover:text-primary hover:bg-primary/10 border-transparent hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`mr-2 ${
                      isActive ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {isActive ? "&gt;&gt;" : "&gt;"}
                  </span>
                  [{idx + 1}] {item.label}
                </Button>
              );
            })}

            {/* Mobile Drawer Command Palette Action */}
            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  playTerminalBeep();
                  setIsMobileMenuOpen(false);
                  window.dispatchEvent(new CustomEvent("open-command-palette"));
                }}
                className="w-full justify-center font-mono text-xs border border-primary/50 text-primary hover:bg-primary/20 bg-black/60 flex items-center gap-2 py-2"
              >
                <CommandIcon className="h-4 w-4 text-primary" />
                <span>[COMMAND PALETTE // CMD+K]</span>
              </Button>
            </div>

            {/* Mobile Drawer System Controls */}
            <div className="pt-3 mt-2 border-t border-primary/20 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  toggleAudio();
                }}
                className="font-mono text-xs border border-primary/40 text-foreground hover:text-primary bg-black/50"
              >
                {isAudioEnabled ? (
                  <span className="flex items-center gap-1.5 text-primary">
                    <Volume2 className="h-3.5 w-3.5" />
                    [SFX: ON]
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-muted-foreground">
                    <VolumeX className="h-3.5 w-3.5" />
                    [SFX: OFF]
                  </span>
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  playTerminalBeep();
                  setIsMobileMenuOpen(false);
                  toggleMatrixRain(true);
                }}
                className="font-mono text-xs border border-primary/40 text-primary hover:bg-primary/20 bg-black/50 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                [MATRIX RAIN]
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Status Indicator Bar */}
      {isScrolled && (
        <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
    </nav>
  );
};

export default Navigation;
