import { Button } from "@/components/ui/button";
import { Terminal, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "$ FULL_STACK_DEVELOPER";
  
  useEffect(() => {
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
      
      <div className="container relative z-10 px-4 mx-auto">
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
              <div className="space-y-4 font-mono">
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
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    [VIEW_PROJECTS]
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
                
                <div className="pt-4 flex items-center">
                  <span className="text-primary">root@portfolio:~$</span>
                  <span className="cursor-blink ml-2">_</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Terminal Status Bar */}
          <div className="border border-primary/30 p-2 bg-black/50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">[ONLINE]</span>
              <span className="text-primary">●</span>
              <span className="text-muted-foreground">UPTIME: ∞</span>
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
