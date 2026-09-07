import { Button } from "@/components/ui/button";
import { Terminal, Github, Linkedin, Mail, Volume2, VolumeX, Sparkles, Palette } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useCrtTheme, CrtTheme, AVAILABLE_CRT_THEMES } from "@/context/ThemeContext";
import { useAudio } from "@/lib/audio";
import { toggleMatrixRain } from "@/components/MatrixRain";

interface CommandHistory {
  command: string;
  output: string;
  isError?: boolean;
}

interface GameState {
  active: boolean;
  secret: string;
  attempts: number;
}

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const { theme: currentTheme, setTheme } = useCrtTheme();
  const {
    isAudioEnabled,
    toggleAudio,
    playKeyClick,
    playTerminalBeep,
    playErrorBeep,
    playBootSound,
  } = useAudio();

  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [historyList, setHistoryList] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Mini-game state (Cyber Codebreaker)
  const [gameState, setGameState] = useState<GameState>({
    active: false,
    secret: "",
    attempts: 0,
  });

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fullText = "$ FULL_STACK_ARCHITECT";

  // Typing header animation & initial CRT boot sweep
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 90);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll whenever terminal history changes
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [history]);

  // Listen to portfolio-start-codebreaker event from Command Palette
  useEffect(() => {
    const handleStartCodebreaker = () => {
      const el = document.getElementById("terminal-input") || inputRef.current;
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      const secretNum = Math.floor(100 + Math.random() * 900).toString();
      setGameState({
        active: true,
        secret: secretNum,
        attempts: 0,
      });
      const output = `╔═══════════════════════════════════════════════════════════╗
║            CYBER CODEBREAKER: DECRYPT THE PIN             ║
╚═══════════════════════════════════════════════════════════╝
[SECURITY ALERT] Mainframe locked! A 3-digit PIN (100 - 999) is required.

INSTRUCTIONS:
  Type: 'guess <number>' (e.g. 'guess 500' or simply '500')
  Hints will reveal if target PIN is HIGHER [▲] or LOWER [▼].
  Type 'exit' to abort decryption session.
=============================================================
Session initialized. Enter your first 3-digit guess:`;
      playTerminalBeep();
      setHistory((prev) => [...prev, { command: "game", output, isError: false }]);
    };

    window.addEventListener("portfolio-start-codebreaker", handleStartCodebreaker);
    return () => window.removeEventListener("portfolio-start-codebreaker", handleStartCodebreaker);
  }, [playTerminalBeep]);

  // Handle Input Typing with realistic keyboard click
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playKeyClick();
    setInputValue(e.target.value);
  };

  // Keyboard navigation for command history (ArrowUp / ArrowDown)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyList.length === 0) return;
      const nextIdx =
        historyIndex === -1
          ? historyList.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      const val = historyList[nextIdx] || "";
      setInputValue(val);
      playKeyClick();
      // Move cursor to end of input
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.selectionEnd = val.length;
        }
      }, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      if (historyIndex < historyList.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        const val = historyList[nextIdx] || "";
        setInputValue(val);
        playKeyClick();
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = inputRef.current.selectionEnd = val.length;
          }
        }, 0);
      } else {
        setHistoryIndex(-1);
        setInputValue("");
        playKeyClick();
      }
    }
  };

  // Cycle next theme helper
  const handleCycleTheme = () => {
    const currentIndex = AVAILABLE_CRT_THEMES.indexOf(currentTheme);
    const nextTheme = AVAILABLE_CRT_THEMES[(currentIndex + 1) % AVAILABLE_CRT_THEMES.length];
    setTheme(nextTheme);
    playTerminalBeep();
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputValue.trim();
    if (!cleanCmd) return;

    // Append to navigation history list
    setHistoryList((prev) => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const lowerCmd = cleanCmd.toLowerCase();
    const args = lowerCmd.split(/\s+/);
    const primaryCmd = args[0];
    const subCmd = args[1];

    let output = "";
    let isError = false;

    // Check if user is actively in Codebreaker game
    if (gameState.active) {
      if (primaryCmd === "exit" || (primaryCmd === "game" && subCmd === "exit") || primaryCmd === "quit") {
        setGameState({ active: false, secret: "", attempts: 0 });
        output = "[GAME] Codebreaker session terminated. Mainframe security restored.";
        playTerminalBeep();
        setHistory((prev) => [...prev, { command: cleanCmd, output, isError: false }]);
        setInputValue("");
        return;
      }

      // Check if command is a guess
      const guessValue = primaryCmd === "guess" ? args[1] : primaryCmd;
      const parsedGuess = parseInt(guessValue, 10);

      if (!isNaN(parsedGuess) && parsedGuess >= 100 && parsedGuess <= 999) {
        const newAttempts = gameState.attempts + 1;
        const secretNum = parseInt(gameState.secret, 10);

        if (parsedGuess === secretNum) {
          output = `╔═══════════════════════════════════════════════════════════╗
║           ACCESS GRANTED: MAINFRAME UNLOCKED!             ║
╚═══════════════════════════════════════════════════════════╝
[SUCCESS] Verified PIN: [ ${gameState.secret} ]
Attempts Required: ${newAttempts}
Status: Cyber Codebreaker Complete. Decryption token acquired!
Type 'game' to play another round.`;
          setGameState({ active: false, secret: "", attempts: 0 });
          playTerminalBeep();
          setTimeout(() => playTerminalBeep(), 120);
          setHistory((prev) => [...prev, { command: cleanCmd, output, isError: false }]);
          setInputValue("");
          return;
        } else if (parsedGuess < secretNum) {
          output = `[ANALYZE] Target PIN is HIGHER [▲] than ${parsedGuess}. (Attempts: ${newAttempts})
Try again: 'guess <num>' or just '<num>' (100 - 999).`;
          setGameState((prev) => ({ ...prev, attempts: newAttempts }));
          playKeyClick();
          setHistory((prev) => [...prev, { command: cleanCmd, output, isError: false }]);
          setInputValue("");
          return;
        } else {
          output = `[ANALYZE] Target PIN is LOWER [▼] than ${parsedGuess}. (Attempts: ${newAttempts})
Try again: 'guess <num>' or just '<num>' (100 - 999).`;
          setGameState((prev) => ({ ...prev, attempts: newAttempts }));
          playKeyClick();
          setHistory((prev) => [...prev, { command: cleanCmd, output, isError: false }]);
          setInputValue("");
          return;
        }
      } else {
        output = `[INVALID GUESS] Please provide a 3-digit PIN between 100 and 999.
Example: 'guess 420' or simply '420'.
Type 'exit' to quit the game.`;
        isError = true;
        playErrorBeep();
        setHistory((prev) => [...prev, { command: cleanCmd, output, isError: true }]);
        setInputValue("");
        return;
      }
    }

    // Standard Terminal Command Suite
    switch (primaryCmd) {
      case "help":
        output = `╔══════════════════════════════════════════════════════════════════════════╗
║                    CYBER_TERMINAL COMMAND REFERENCE                      ║
╚══════════════════════════════════════════════════════════════════════════╝

SYSTEM & NAVIGATION:
  help                     Display this formatted 2-column command reference
  neofetch / fastfetch     Show system hardware & software diagnostic spec
  about                    Jump to system profile & background summary
  projects                 List all software projects with direct details
  skills                   List tech stack & proficiency breakdown
  timeline                 Jump to career commits and milestone log
  contact                  Display transmission coordinates & channels
  resume                   Display professional resume summary & download

DISPLAY & AUDIO:
  matrix                   Toggle immersive Matrix digital rain stream
  audio [on|off|toggle]    Configure or inspect Web Audio synthesis engine
  theme [color]            Switch CRT phosphor (green, amber, cyan, rose)
  boot                     Re-initialize CRT system monitor boot sweep
  clear                    Purge active terminal session buffer

UTILITIES & MINIGAME:
  game [start|exit]        Launch Cyber Codebreaker (3-digit PIN decryptor)
  cat [file]               Read text files (e.g. cat bio.txt)
  whoami                   Display active system identity
  date                     Print current UTC system timestamp
  ls [path]                List directory nodes & filesystems
  sudo [command]           Execute command with root privileges

HINT: Use [↑] and [↓] arrow keys to navigate command history.`;
        playTerminalBeep();
        break;

      case "neofetch":
      case "fastfetch":
        output = `       .---.          root@Kamash-OS v2.4
      /     \\         --------------------
     | () () |        OS:       Kamash-OS v2.4 (x86_64 Linux kernel 6.8)
      \\  _  /         Host:     Full-Stack Architect & Systems Engineer
       || ||          Shell:    zsh 5.9 (xterm-256color)
      /     \\         Uptime:   5+ Years in Production
     |       |        Stack:    React 18 / TypeScript / Laravel 11 / Flutter
      \\_____/         Coffee:   100% [████████████████████]
                      Theme:    CRT-P1 Phosphor (${currentTheme.toUpperCase()})
                      Audio:    Web Audio API (${isAudioEnabled ? "ONLINE [SFX]" : "MUTED"})`;
        playTerminalBeep();
        break;

      case "projects":
        output = `[ACTIVE SYSTEM PROJECTS REPOSITORY]
-------------------------------------------------------------------------
[1] E-Commerce Microservices Platform
    Stack:  React | Node.js | PostgreSQL | Stripe | Redis | Docker
    Spec:   Distributed commerce system with event-driven order processing.
    Target: Section #projects (Item 01)

[2] Logistics & Fleet Tracking App
    Stack:  Flutter | Laravel Swoole | WebSockets | MariaDB | Redis
    Spec:   Real-time telemetry daemon handling 5,000+ driver updates.
    Target: Section #projects (Item 02)

[3] Enterprise CRM & Resource Portal
    Stack:  React | PHP Laravel | PostgreSQL | Docker | TailwindCSS
    Spec:   Multi-tenant enterprise CRM with role-based access control (RBAC).
    Target: Section #projects (Item 03)

[4] Smart Delivery Mobile App
    Stack:  Flutter | Provider | Firebase | Google Maps API
    Spec:   Customer-facing logistics app with routing optimization.
    Target: Section #projects (Item 04)

[5] Cyberpunk CRT Portfolio
    Stack:  React | TypeScript | TailwindCSS | Web Audio API
    Spec:   Interactive terminal HUD portfolio with CRT phosphor synthesis.
    Target: Section #projects (Item 05)

[6] AI Knowledge & Query Engine
    Stack:  FastAPI | LangChain | PostgreSQL pgvector | Python
    Spec:   Retrieval-Augmented Generation (RAG) assistant for corporate knowledge.
    Target: Section #projects (Item 06)
-------------------------------------------------------------------------
Type 'about projects' or click [VIEW_PROJECTS] below to inspect architecture.`;
        playTerminalBeep();
        break;

      case "matrix":
        output = "Initializing Matrix digital rain protocol... [PRESS ESC TO EXIT]";
        toggleMatrixRain(true);
        playTerminalBeep();
        break;

      case "resume":
        output = `=========================================================================
SOHAIB KAMASH - SENIOR FULL-STACK ARCHITECT & ENGINEER
=========================================================================
Profile Summary:
  • 5+ years crafting enterprise web platforms, APIs, and mobile systems.
  • Lead Architect: Distributed systems (1,800+ req/sec, sub-35ms p95).
  • Real-time telematics: Flutter & Laravel WebSockets for 5,000+ drivers.
  • Payment pipelines: PCI-compliant Stripe automation & financial audit.

Core Stack:
  React, TypeScript, Next.js, PHP Laravel, Flutter, PostgreSQL, Redis, Docker

Direct Contact:
  Email: sohaibkamash@gmail.com | Phone: +218 948890001
  GitHub: https://github.com/Nick-800
=========================================================================
[INFO] Opening contact channels and resume credentials...`;
        playTerminalBeep();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "skills":
        output = `[TECH_STACK.CONFIG]
-------------------------------------------------------------------------
FRONTEND:       React, TypeScript, Next.js, Tailwind CSS, Vue.js
BACKEND:        PHP Laravel, Node.js, MariaDB, MySQL, GraphQL
MOBILE/DEVOPS:  Flutter, Docker, AWS, Git, CI/CD pipelines
-------------------------------------------------------------------------
Status: All system modules operational. Type 'about' for profile details.`;
        playTerminalBeep();
        break;

      case "contact":
        output = `[COMMUNICATION_CHANNELS]
-------------------------------------------------------------------------
EMAIL:    sohaibkamash@gmail.com
PHONE:    +218 948890001
LOCATION: Benghazi, LIBYA
GITHUB:   https://github.com/Nick-800
LINKEDIN: https://linkedin.com/in/sohaib-kamash
-------------------------------------------------------------------------
Transmission channels ready. Form available at section #contact.`;
        playTerminalBeep();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "about":
        output = "Opening system profile: About Me...";
        playTerminalBeep();
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "timeline":
        output = "Accessing career history commits and milestone log...";
        playTerminalBeep();
        document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
        break;

      case "theme": {
        const selectedColor = subCmd;
        if (["green", "amber", "cyan", "rose"].includes(selectedColor)) {
          setTheme(selectedColor as CrtTheme);
          output = `System theme updated to: ${selectedColor.toUpperCase()} CRT Phosphor Mode.`;
          playTerminalBeep();
        } else {
          output = `Error: Unknown theme option "${selectedColor || ""}".
Available themes: green, amber, cyan, rose.
Usage: theme amber`;
          isError = true;
          playErrorBeep();
        }
        break;
      }

      case "audio": {
        if (subCmd === "on") {
          if (!isAudioEnabled) toggleAudio();
          output = "Audio synthesis engine: ENABLED [SFX ON]";
          playTerminalBeep();
        } else if (subCmd === "off") {
          if (isAudioEnabled) toggleAudio();
          output = "Audio synthesis engine: MUTED [SFX OFF]";
        } else if (subCmd === "toggle" || !subCmd) {
          const next = toggleAudio();
          output = `Audio synthesis engine: ${next ? "ENABLED [SFX ON]" : "MUTED [SFX OFF]"}`;
        } else {
          output = `Usage: audio [on|off|toggle]
Current status: ${isAudioEnabled ? "ENABLED" : "MUTED"}`;
          isError = true;
          playErrorBeep();
        }
        break;
      }

      case "boot":
        output = "Re-initializing CRT monitor and degauss coil sweep... OK";
        playBootSound();
        break;

      case "game": {
        const secretNum = Math.floor(100 + Math.random() * 900).toString();
        setGameState({
          active: true,
          secret: secretNum,
          attempts: 0,
        });
        output = `╔═══════════════════════════════════════════════════════════╗
║            CYBER CODEBREAKER: DECRYPT THE PIN             ║
╚═══════════════════════════════════════════════════════════╝
[SECURITY ALERT] Mainframe locked! A 3-digit PIN (100 - 999) is required.

INSTRUCTIONS:
  Type: 'guess <number>' (e.g. 'guess 500' or simply '500')
  Hints will reveal if target PIN is HIGHER [▲] or LOWER [▼].
  Type 'exit' to abort decryption session.
=============================================================
Session initialized. Enter your first 3-digit guess:`;
        playTerminalBeep();
        break;
      }

      case "clear":
        setHistory([]);
        setInputValue("");
        playTerminalBeep();
        return;

      case "whoami":
        output = "root (Full-Stack Architect & Engineer - Sohaib Kamash)";
        playTerminalBeep();
        break;

      case "date":
        output = new Date().toUTCString();
        playTerminalBeep();
        break;

      case "ls":
        output = `drwxr-xr-x  connections/
-rw-r--r--  bio.txt
-rw-r--r--  projects.sh
-rw-r--r--  skills.config
-rw-r--r--  resume.md
-rwxr-xr-x  game.bin`;
        playTerminalBeep();
        break;

      case "cat": {
        const fileName = args[1];
        if (!fileName || fileName === "bio.txt") {
          output = `[BIO.TXT]
Sohaib Kamash - Senior Full-Stack Architect & Systems Engineer.
Crafting enterprise web APIs, high-performance distributed backends,
and elegant cross-platform mobile experiences.
Stack: React | TypeScript | PHP Laravel | Flutter | Node.js | Redis | Docker`;
          playTerminalBeep();
        } else if (fileName === "skills.config") {
          output = `FRONTEND = [React, TypeScript, Next.js, TailwindCSS, Vue.js]
BACKEND  = [PHP Laravel, Node.js, MariaDB, MySQL, GraphQL]
DEVOPS   = [Docker, AWS, Git, CI/CD pipelines, Swoole]`;
          playTerminalBeep();
        } else if (fileName === "resume.md") {
          output = `Sohaib Kamash | Senior Full-Stack Engineer
5+ Years Production Experience | 1,800+ req/sec APIs | 5,000+ Driver Streams
Contact: sohaibkamash@gmail.com | +218 948890001`;
          playTerminalBeep();
        } else {
          output = `cat: ${fileName}: No such file or directory. Try 'cat bio.txt' or 'ls'.`;
          isError = true;
          playErrorBeep();
        }
        break;
      }

      case "sudo": {
        const sub = args.slice(1).join(" ");
        if (sub === "react") {
          output = "root: Installing hooks... Done.\nStatus: You are now a Senior Developer.";
          playTerminalBeep();
        } else if (sub === "make me a sandwich") {
          output = "sudo: What? Make it yourself.";
          playErrorBeep();
          isError = true;
        } else if (sub === "rm -rf /") {
          output = "sudo: Access denied. Protected system kernel.";
          playErrorBeep();
          isError = true;
        } else if (sub === "hire sohaib" || sub === "hire") {
          output = `root: Access granted! Initializing direct transmission protocol...
Transmission sent to sohaibkamash@gmail.com. Welcome to the team!`;
          playTerminalBeep();
        } else {
          output = "root: Access granted. You are now running with administrator privileges.";
          playTerminalBeep();
        }
        break;
      }

      default:
        output = `bash: command not found: "${primaryCmd}". Type 'help' for available commands.`;
        isError = true;
        playErrorBeep();
        break;
    }

    setHistory((prev) => [...prev, { command: cleanCmd, output, isError }]);
    setInputValue("");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden scanline"
    >
      {/* Terminal Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto py-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Terminal Main Window */}
          <div className="border-2 border-primary p-1 bg-background/95 shadow-2xl">
            <div className="border border-primary/50 p-4 bg-black/60">
              {/* Terminal Window Bar */}
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/30 text-xs font-mono">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground font-bold">
                  root@kamash-os: ~/portfolio/main.sh
                </span>
                <span className="hidden sm:inline text-primary/60">
                  (zsh 5.9 // {currentTheme.toUpperCase()})
                </span>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors px-1.5 py-0.5 border border-primary/30 bg-black/40"
                    title={isAudioEnabled ? "Mute sound effects" : "Enable sound effects"}
                    aria-label="Toggle Audio SFX"
                  >
                    {isAudioEnabled ? (
                      <>
                        <Volume2 className="h-3 w-3 text-primary" />
                        <span className="hidden sm:inline">SFX: ON</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="h-3 w-3 text-muted-foreground" />
                        <span className="hidden sm:inline">SFX: OFF</span>
                      </>
                    )}
                  </button>
                  <span className="text-xs">◼</span>
                  <span className="text-xs">◻</span>
                  <span className="text-xs">✕</span>
                </div>
              </div>

              {/* Terminal Content Stream */}
              <div className="space-y-4 font-mono text-sm md:text-base max-h-[62vh] overflow-y-auto pr-1">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">root@portfolio:~$</span>
                  <span className="text-foreground">whoami</span>
                </div>

                <div className="pl-4 space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold text-primary glow-terminal">
                    &gt; SOHAIB_KAMASH
                  </h1>
                  <p className="text-xl md:text-2xl text-foreground font-semibold">
                    {displayedText}
                    <span className="cursor-blink">_</span>
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <span className="text-primary font-bold">root@portfolio:~$</span>
                  <span className="text-foreground">cat bio.txt</span>
                </div>

                <div className="pl-4 space-y-2 text-muted-foreground border-l-2 border-primary/30 text-xs md:text-sm">
                  <p className="leading-relaxed">
                    [INFO] Architecting distributed cloud APIs, enterprise full-stack systems & real-time mobile apps.
                  </p>
                  <p className="leading-relaxed">
                    [STACK] React | TypeScript | PHP Laravel | Flutter | Node.js | PostgreSQL | Redis | Docker
                  </p>
                  <p className="leading-relaxed text-primary font-semibold">
                    [STATUS] Available for Full-Stack & Engineering Roles ✓
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-primary font-bold">root@portfolio:~$</span>
                  <span className="text-foreground">./execute</span>
                </div>

                {/* CTA Buttons */}
                <div className="pl-4 flex flex-wrap gap-3 pt-1">
                  <Button
                    size="sm"
                    className="border-2 border-primary bg-transparent hover:bg-primary hover:text-black text-primary font-mono terminal-text"
                    onClick={() => {
                      playTerminalBeep();
                      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    [VIEW_ABOUT]
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-primary/70 bg-transparent hover:bg-primary/20 text-primary font-mono"
                    onClick={() => {
                      playTerminalBeep();
                      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    [VIEW_PROJECTS]
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-2 border-primary/50 bg-transparent hover:bg-primary/10 text-foreground font-mono"
                    onClick={() => {
                      playTerminalBeep();
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    [CONTACT_ME]
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border border-primary/40 bg-transparent hover:bg-primary/10 text-primary font-mono hidden sm:inline-flex items-center gap-1"
                    onClick={() => {
                      playTerminalBeep();
                      toggleMatrixRain(true);
                    }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    [MATRIX_RAIN]
                  </Button>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <span className="text-primary font-bold">root@portfolio:~$</span>
                  <span className="text-foreground">ls connections/</span>
                </div>

                {/* Social Links */}
                <div className="pl-4 flex gap-3">
                  <a
                    href="https://github.com/Nick-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playKeyClick()}
                    className="p-2 border border-border hover:border-primary transition-all hover:glow-terminal"
                    aria-label="GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/sohaib-kamash"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playKeyClick()}
                    className="p-2 border border-border hover:border-primary transition-all hover:glow-terminal"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:sohaibkamash@gmail.com"
                    onClick={() => playKeyClick()}
                    className="p-2 border border-border hover:border-primary transition-all hover:glow-terminal"
                    aria-label="Transmit Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>

                {/* Command Output Stream */}
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-bold">root@portfolio:~$</span>
                      <span className="text-foreground font-semibold">{item.command}</span>
                    </div>
                    <div
                      className={`pl-4 whitespace-pre-wrap font-mono text-xs md:text-sm leading-relaxed ${
                        item.isError
                          ? "text-red-400 border-l-2 border-red-500/50 pl-3"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.output}
                    </div>
                  </div>
                ))}

                {/* Interactive Command Prompt Form */}
                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-3">
                  <span className="text-primary font-bold">
                    {gameState.active ? "codebreaker@guess:~$" : "root@portfolio:~$"}
                  </span>
                  <input
                    id="terminal-input"
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary focus:ring-0 p-0"
                    placeholder={
                      gameState.active
                        ? "Enter 3-digit guess (or 'exit')..."
                        : "Type 'help', 'projects', 'matrix', 'game'..."
                    }
                    aria-label="Interactive Terminal Command Input"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                </form>

                {/* Ref for auto-scrolling terminal bottom */}
                <div ref={terminalEndRef} />
              </div>
            </div>
          </div>

          {/* Terminal Supercharged Status Bar */}
          <div className="border border-primary/30 p-2.5 bg-black/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Left status controls */}
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span>[ONLINE]</span>
              </span>

              {/* Theme Cycle Button */}
              <button
                type="button"
                onClick={handleCycleTheme}
                className="flex items-center gap-1 px-2 py-0.5 border border-primary/40 hover:border-primary hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
                title="Click to cycle CRT Phosphor theme"
              >
                <Palette className="w-3 h-3 text-primary" />
                <span>THEME: {currentTheme.toUpperCase()}</span>
              </button>

              {/* Audio Toggle Button */}
              <button
                type="button"
                onClick={toggleAudio}
                className="flex items-center gap-1 px-2 py-0.5 border border-primary/40 hover:border-primary hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
                title="Click to toggle Web Audio sound effects"
              >
                {isAudioEnabled ? (
                  <>
                    <Volume2 className="w-3 h-3 text-primary" />
                    <span>AUDIO: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3 text-muted-foreground" />
                    <span>AUDIO: OFF</span>
                  </>
                )}
              </button>

              {/* Matrix Rain Button */}
              <button
                type="button"
                onClick={() => {
                  playTerminalBeep();
                  toggleMatrixRain(true);
                }}
                className="hidden sm:flex items-center gap-1 px-2 py-0.5 border border-primary/40 hover:border-primary hover:bg-primary/10 transition-colors text-muted-foreground hover:text-primary cursor-pointer"
                title="Launch Matrix Digital Rain"
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span>MATRIX</span>
              </button>
            </div>

            {/* Right hint & scroll prompt */}
            <div className="flex items-center gap-3 text-muted-foreground">
              <span className="hidden md:inline text-[11px] opacity-80">
                [↑/↓ HISTORY | 'help']
              </span>
              <button
                type="button"
                onClick={() => {
                  playTerminalBeep();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                SCROLL ↓ FOR MORE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
