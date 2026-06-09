import { Button } from "@/components/ui/button";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

interface CommandHistory {
  command: string;
  output: string;
}

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTheme, setCurrentTheme] = useState("green");
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [inputValue, setInputValue] = useState("");
  const fullText = "$ FULL_STACK_DEVELOPER";

  useEffect(() => {
    // Read and set theme
    const savedTheme = localStorage.getItem("portfolio-theme") || "green";
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);

    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const applyTheme = (themeName: string) => {
    const root = document.documentElement;
    root.classList.remove("theme-amber", "theme-cyan", "theme-rose");
    if (themeName !== "green") {
      root.classList.add(`theme-${themeName}`);
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = inputValue.trim();
    if (!cleanCmd) return;

    const lowerCmd = cleanCmd.toLowerCase();
    const args = lowerCmd.split(" ");
    const primaryCmd = args[0];

    let output = "";

    switch (primaryCmd) {
      case "help":
        output = `Available commands:
  help              - List all available terminal commands
  about             - Learn more about Sohaib Kamash
  skills            - List developer skills and stack
  contact           - Display contact information
  theme [color]     - Change CRT color (green, amber, cyan, rose)
  clear             - Clear the screen history
  sudo [command]    - Execute command with administrator privileges`;
        break;
      case "clear":
        setHistory([]);
        setInputValue("");
        return;
      case "about":
        output = "Opening system profile: About Me...";
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "skills":
        output = "Scanning skill configuration modules...";
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "contact":
        output = "Initializing contact protocol...";
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        break;
      case "theme": {
        const selectedColor = args[1];
        if (["green", "amber", "cyan", "rose"].includes(selectedColor)) {
          localStorage.setItem("portfolio-theme", selectedColor);
          setCurrentTheme(selectedColor);
          applyTheme(selectedColor);
          output = `System theme updated to: ${selectedColor.toUpperCase()} CRT Mode.`;
        } else {
          output = `Error: Unknown theme option "${selectedColor || ""}".
Available themes: green, amber, cyan, rose.
Usage: theme amber`;
        }
        break;
      }
      case "sudo": {
        const subCmd = args.slice(1).join(" ");
        if (subCmd === "react") {
          output = "root: Installing hooks... Done.\nStatus: You are now a Senior Developer.";
        } else if (subCmd === "make me a sandwich") {
          output = "sudo: What? Make it yourself.";
        } else {
          output = "root: Access granted. You are now the system administrator.";
        }
        break;
      }
      default:
        output = `bash: command not found: ${primaryCmd}. Type 'help' for instructions.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cleanCmd, output }]);
    setInputValue("");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scanline">
      {/* Terminal Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container relative z-10 px-4 mx-auto py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Terminal Header */}
          <div className="border-2 border-primary p-1 bg-background/95">
            <div className="border border-primary/50 p-4 bg-black/50">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-primary/30">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">~/portfolio/main.sh</span>
                <div className="ml-auto flex gap-2">
                  <span className="text-xs">◼</span>
                  <span className="text-xs">◻</span>
                  <span className="text-xs">✕</span>
                </div>
              </div>

              {/* Terminal Content */}
              <div className="space-y-4 font-mono text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-primary">root@portfolio:~$</span>
                  <span className="text-foreground">whoami</span>
                </div>

                <div className="pl-4 space-y-2">
                  <h1 className="text-3xl md:text-5xl font-bold text-primary glow-terminal">
                    &gt; SOHAIB_KAMASH
                  </h1>
                  <p className="text-xl md:text-2xl text-foreground">
                    {displayedText}<span className="cursor-blink">_</span>
                  </p>
                </div>

                <div className="flex items-start gap-2 pt-4">
                  <span className="text-primary">root@portfolio:~$</span>
                  <span className="text-foreground">cat bio.txt</span>
                </div>

                <div className="pl-4 space-y-2 text-muted-foreground border-l-2 border-primary/30">
                  <p className="leading-relaxed">
                    [INFO] Crafting exceptional digital experiences with modern technologies.
                  </p>
                  <p className="leading-relaxed">
                    [STACK] React | Flutter | Node.js | Laravel | TailwindCSS
                  </p>
                  <p className="leading-relaxed text-primary">
                    [STATUS] Available for new opportunities ✓
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <span className="text-primary">root@portfolio:~$</span>
                  <span className="text-foreground">./execute</span>
                </div>

                {/* CTA Buttons */}
                <div className="pl-4 flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    size="lg"
                    className="group border-2 border-primary bg-transparent hover:bg-primary hover:text-black text-primary font-mono terminal-text"
                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    [VIEW_ABOUT]
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary/50 bg-transparent hover:bg-primary/10 text-foreground font-mono"
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    [CONTACT_ME]
                  </Button>
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <span className="text-primary">root@portfolio:~$</span>
                  <span className="text-foreground">ls connections/</span>
                </div>

                {/* Social Links */}
                <div className="pl-4 flex gap-3">
                  <a
                    href="https://github.com/Nick-800"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-border hover:border-primary transition-all hover:glow-terminal"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-border hover:border-primary transition-all hover:glow-terminal"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="mailto:sohaibkamash@gmail.com"
                    className="p-2 border border-border hover:border-primary transition-all hover:glow-terminal"
                    aria-label="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                </div>

                {/* Custom Command History */}
                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-primary">root@portfolio:~$</span>
                      <span className="text-foreground">{item.command}</span>
                    </div>
                    <div className="pl-4 text-muted-foreground whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {item.output}
                    </div>
                  </div>
                ))}

                {/* Interactive Command Prompt */}
                <form onSubmit={handleCommand} className="flex items-center gap-2 pt-4">
                  <span className="text-primary">root@portfolio:~$</span>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm caret-primary focus:ring-0 p-0"
                    placeholder="Type 'help' for commands..."
                    aria-label="Interactive Terminal Command Input"
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Terminal Status Bar */}
          <div className="border border-primary/30 p-2 bg-black/50 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">[ONLINE]</span>
              <span className="text-primary">●</span>
              <span className="text-muted-foreground">THEME: {currentTheme.toUpperCase()}</span>
            </div>
            <div className="text-muted-foreground">
              SCROLL ↓ FOR MORE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
